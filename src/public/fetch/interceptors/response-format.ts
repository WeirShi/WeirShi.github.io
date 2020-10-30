import { AxiosResponse } from "../type";

export function responseInterceptor(response: AxiosResponse) {
  return response.data;
}
