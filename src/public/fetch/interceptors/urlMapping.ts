import urlDictionary from "../data/urlDictionary";
import { AxiosRequestConfig } from "../type";

export function requestInterceptor(config: AxiosRequestConfig) {
  const url = urlDictionary[config.url as string];
  config.url = url || config.url;
  return config;
}
