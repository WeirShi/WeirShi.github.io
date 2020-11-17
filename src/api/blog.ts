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

/**
 * @file blog apis
 * @description 文章详情
 * @author WeirShi
 * @date 2010-11-08
 */
export const FetchArticleDetail = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Article>>(URL_DIC.blogArticleDetail, {
    params,
    ...config
  });

/**
 * @file blog apis
 * @description 文章增加观看次数
 * @author WeirShi
 * @date 2010-11-08
 */
export const FetchAddWatchTimes = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<Article>>(
    URL_DIC.blogArticleWatchTimesAdd,
    params,
    config
  );

/**
 * @file blog apis
 * @description 前一篇、后一篇文章
 * @author WeirShi
 * @date 2010-11-16
 */
export const FetchArticlePreOrNext = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<Article>>(URL_DIC.blogArticleNext, {
    params,
    ...config
  });

/**
 * @file blog apis
 * @description 文章增加点赞次数
 * @author WeirShi
 * @date 2010-11-16
 */
export const FetchAddLikeTimes = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<Article>>(
    URL_DIC.blogArticleLike,
    params,
    config
  );

/**
 * @file blog apis
 * @description 根据标签获取文章列表
 * @author WeirShi
 * @date 2010-11-17
 */
export const FetchArticleListByCategory = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<Article>>(
    `${URL_DIC.blogArticleListByCategory}/${params.type}/articles`,
    { params, ...config }
  );
