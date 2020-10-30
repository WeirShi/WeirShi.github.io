import { AxiosRequestConfig, AxiosResponse, AxiosError } from "../type";
import { Loading } from "element-ui";
import * as conf from "../data/config";

const loadingInstance = Loading.service({});
loadingInstance.close();

let ajaxNumber = 0;
const loadingDelay = conf.LOADING_DELAY;
let loadingTimmer: any;

/**
 * 关闭loading
 *
 */
function closeLoading() {
  if (ajaxNumber > 0) ajaxNumber--;
  clearTimeout(loadingTimmer);
  loadingTimmer = setTimeout(() => {
    if (ajaxNumber === 0) {
      console.log("ajaxNumber", ajaxNumber);
      loadingInstance.close();
    }
  }, loadingDelay);
}

/**
 * 请求拦截器
 *
 * @export
 * @param {AxiosRequestConfig} config
 * @returns
 */
export function requestInterceptor(config: AxiosRequestConfig) {
  if (!config.isNotLoading) {
    ajaxNumber++;
    Loading.service({});
  }
  console.log("request config", config);
  return config;
}

/**
 * 响应拦截器
 *
 * @export
 * @param {AxiosResponse} response
 * @returns
 */
export function responseInterceptor(response: AxiosResponse) {
  if (!response.config.isNotLoading) {
    closeLoading();
  }
  console.log("response", response);
  return response;
}

/**
 * 请求异常拦截器
 *
 * @export
 * @param {*} error
 */
export function requestErrorInterceptor(error: AxiosError) {
  closeLoading();
  throw error;
}

/**
 * 响应异常拦截器
 *
 * @export
 * @param {*} error
 */
export function responseErrorInterceptor(error: AxiosError) {
  closeLoading();
  throw error;
}
