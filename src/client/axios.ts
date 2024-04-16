import axios, { AxiosResponse, type AxiosInstance } from "axios";

export abstract class AxiosClient {
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://example.com",
      timeout: 10_000,
    });
  }

  protected response(response: AxiosResponse) {
    const { status, data } = response;
    return { status, data };
  }
}
