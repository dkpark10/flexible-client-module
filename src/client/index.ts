import { AxiosClient } from "./axios";

type UpperMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";
type LowerMethod = Lowercase<UpperMethod>;

type Method = UpperMethod | LowerMethod;

class HttpClient extends AxiosClient {
  private url: URL;
  
  private body: Record<string, any>;

  constructor(private method: Method = "get") {
    super();
  }

  public setUrl(url: string) {
    this.url = new URL(url);
    return this;
  }

  public setMethod<M extends Method = "get">(method: M) {
    this.method = method;
    return this;
  }

  public query(key: string, value: any) {
    this.url.searchParams.set(key, value);
    return this;
  }

  public setBody<B extends Record<string, any>>(body: B) {
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

export default new HttpClient();
