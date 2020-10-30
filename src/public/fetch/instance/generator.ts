import axios from "axios";
import { AxiosRequestConfig, AxiosInstance, AxiosError } from "../type";
// import * as frmInterceptor from "../interceptors/frm-set";
// import * as loadingInterceptor from '../interceptors/loading';
import * as loginInterceptor from "../interceptors/login";
import * as urlInterceptor from "../interceptors/urlMapping";
import * as responseFormatInterceptor from "../interceptors/response-format";
import { message } from "ant-design-vue";

const defaultConfig: AxiosRequestConfig = {
  timeout: 1000 * 60 // 请求超时时间
};

/**
 * axios工厂方法
 *
 * @export
 * @param {AxiosRequestConfig} [config={}]
 * @returns
 */
export function generator(config: AxiosRequestConfig = {}) {
  const instance = axios.create(
    Object.assign(defaultConfig, config)
  ) as AxiosInstance;

  // instance.interceptors.request.use(loadingInterceptor.requestInterceptor, loadingInterceptor.requestErrorInterceptor);
  //   instance.interceptors.request.use(frmInterceptor.requestInterceptor);
  instance.interceptors.request.use(loginInterceptor.requestInterceptor);
  instance.interceptors.request.use(urlInterceptor.requestInterceptor);

  // instance.interceptors.response.use(loadingInterceptor.responseInterceptor, loadingInterceptor.responseErrorInterceptor);
  instance.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.message.indexOf("timeout") > -1) {
      message.error("请求超时");
    } else {
      message.error("请求异常，请重试");
    }
  });
  instance.interceptors.response.use(loginInterceptor.responseInterceptor);
  instance.interceptors.response.use(
    responseFormatInterceptor.responseInterceptor
  );
  return instance;
}
