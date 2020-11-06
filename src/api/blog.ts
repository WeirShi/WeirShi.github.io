// blog API
import { AxiosRequestConfig } from "@/public/fetch/type.d.ts";
import { cryptoInstance, URL_DIC } from "../public/fetch";

/**
 * @file blog apis
 * @description 获取所有分类
 * @author WeirShi
 * @date 2010-11-02
 */

export const FetchGetAllCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Category[]>>(URL_DIC.blogAllCategory, {
    params,
    ...config
  });

/**
 * @file blog apis
 * @description 获取所有标签
 * @author WeirShi
 * @date 2010-11-02
 */
export const FetchGetAllTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Tag[]>>(URL_DIC.blogAllTag, {
    params,
    ...config
  });

/**
 * @file blog apis
 * @description 文章列表 分页
 * @author WeirShi
 * @date 2010-11-02
 */

export const FetchGetArticleList = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Article[] }>>(
    URL_DIC.blogArticleList,
    {
      params,
      ...config
    }
  );
