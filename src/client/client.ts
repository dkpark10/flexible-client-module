import got, {
  type Got,
  type Response as GotResponse,
  type OptionsOfJSONResponseBody,
} from 'got';
import axios, {
  AxiosResponse,
  type AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import type { Method } from '../types';

const baseURL = 'https://example.com';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
});

const gotInstance = got.extend({
  url: baseURL,
});

export interface Request<Body> {
  url: URL;
  method: Method;
  body?: Body;
  headers?: Record<string, any>;
}

export interface Response<D> {
  status: number;
  data: D;
}

export type CommonConfig = AxiosRequestConfig;

export abstract class Client {
  protected baseURL = baseURL;

  protected instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstance;
  }

  // /** @desc got을 쓴다면 */
  // protected response<Data>(response: GotResponse<Data>): Response<Data> {
  //   const { statusCode, body } = response;
  //   // @ts-ignore
  //   return { status: statusCode, data: JSON.parse(body) };
  // }

  // protected transform<Body>({
  //   url,
  //   method,
  //   body,
  // }: Request<Body>): OptionsOfJSONResponseBody {
  //   return {
  //     url: url.href,
  //     method,
  //     json: body,
  //   };
  // }

  /** @desc axios를 쓴다면 */
  protected response<Data>(response: AxiosResponse<Data>): Response<Data> {
    const { status, data } = response;
    return { status, data };
  }

  protected transform<Body>({ url, method, body }: Request<Body>): AxiosRequestConfig {
    return {
      url: url.href,
      method,
      data: body,
    };
  }
}
  
