import axios, { AxiosResponse, type AxiosInstance } from "axios";

const baseURL = 'https://example.com';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
});

export abstract class AxiosClient {
  protected baseURL = baseURL;

  protected instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstance;
  }

  protected response(response: AxiosResponse) {
    const { status, data } = response;
    return { status, data };
  }
}
