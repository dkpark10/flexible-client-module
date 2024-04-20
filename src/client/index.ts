import { AxiosClient } from './axios';
import type { Method, QueryParams } from '../types';

export default class HttpClient<
  U extends keyof QueryParams,
  B extends Record<string, any> = any
> extends AxiosClient {
  private url: URL;

  private body: Record<string, any>;

  private method: Method = 'get';

  constructor() {
    super();
  }

  public setUrl(url: U) {
    try {
      this.url = new URL(`${this.baseURL}/${url}`);
      return this;
    } catch (error) {
      console.error('URL error', error);
    }
  }

  public setMethod<M extends Method = 'get'>(method: M) {
    this.method = method;
    return this;
  }

  public setQuery(
    key: keyof QueryParams[U],
    value: QueryParams[U][typeof key]
  ) {
    if (!this.url) throw new Error('url이 설정되어 있지 않습니다.');

    this.url.searchParams.set(String(key), String(value));
    return this;
  }

  public setBody(body: B) {
    this.body = body;
    return this;
  }

  public async retrieve<T>(): Promise<{ status: number; data: T }> {
    return await this.instance<T>({
      method: this.method,
      url: this.url.href,
      data: this.body,
    }).then((res) => this.response(res));
  }
}
