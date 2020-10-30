import { getParamsCode } from "@/public/utils/getParamsCode";
import cookies from "@/public/utils/cookies";
import { AxiosRequestConfig } from "../type";

/**
 * 渠道号存入cookies
 *
 * @export
 * @param {AxiosRequestConfig} config
 */
export function requestInterceptor(config: AxiosRequestConfig) {
  if (getParamsCode("frm")) {
    cookies.set("from", getParamsCode("frm"));
  }
  return config;
}
