import { Client, type Response } from './client';
import type { Method, QueryParams, EndPoint } from '../types';

class ApiClient extends Client {
  private url: URL;

  private body: any;

  private method: Method = 'get';

  private headers: Record<string, any> = {};

  constructor() {
    super();
  }

  public setUrl<Url extends EndPoint, Key extends keyof QueryParams[Url]>(
    url: Url,
    queryParams?: {
      [K in Key]: QueryParams[Url][Key];
    }
  ) {
    try {
      this.url = new URL(`${this.baseURL}/${url}`);

      Object.entries(queryParams).forEach(([key, value]) => {
        this.url.searchParams.set(String(key), String(value));
      });

      return this;
    } catch (error) {
      console.error('URL error', error);
    }
  }

  public setMethod<M extends Method = 'get'>(method: M) {
    this.method = method;
    return this;
  }

  public setBody<Body>(body: Body) {
    this.body = body;
    return this;
  }

  public async retrieve<Data>(): Promise<Response<Data>> {
    const reqData = this.transform<Body>({
      url: this.url,
      method: this.method,
      body: this.body,
      headers: this.headers,
    });
    return await this.instance<Data>(reqData).then((res) => this.response(res));
  }
}

export const client = new ApiClient();