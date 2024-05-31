import { Client, type Response, type CommonConfig } from './client';
import type { Method, QueryParams, EndPoint, RequestBody } from '../types';

class ApiClient extends Client {
  private url: URL;

  private body: any;

  private method: Method = 'get';

  private config: CommonConfig;

  constructor() {
    super();
  }

  public setRequestInfo<
    Url extends EndPoint,
    QueryStringKey extends keyof QueryParams[Url],
    BodyKey extends keyof RequestBody[Url]
  >({
    url,
    queryParams,
    body,
  }: {
    url: Url;
    queryParams?: {
      [K in QueryStringKey]: QueryParams[Url][QueryStringKey];
    };
    body?: {
      [K in BodyKey]: RequestBody[Url][BodyKey];
    };
  }) {
    try {
      this.url = new URL(`${this.baseURL}/${url}`);

      Object.entries(queryParams).forEach(([key, value]) => {
        this.url.searchParams.set(String(key), String(value));
      });

      this.body = body;
      return this;
    } catch (error) {
      console.error('URL error', error);
    }
  }

  public setMethod<M extends Method = 'get'>(method: M) {
    this.method = method;
    return this;
  }

  public setConfig(config: CommonConfig) {
    this.config = config;
    return this;
  }

  public async retrieve<Data>(): Promise<Response<Data>> {
    const reqData = this.transform<Body>({
      url: this.url,
      method: this.method,
      body: this.body,
      headers: this.config,
    });
    return await this.instance<Data>(reqData).then((res) => this.response(res));
  }
}

export const client = new ApiClient();
