// admin API
import { AxiosRequestConfig } from "@/public/fetch/type.d.ts";
import * as Model from "@/model/api";
import { cryptoInstance, URL_DIC } from "../public/fetch";

/**
 * 登录
 *
 */
export const FetchRegist = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.regist, params, config);
/**
 * 注册
 *
 */
export const FetchLogin = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<Model.UserInfo>>(
    URL_DIC.login,
    params,
    config
  );

/**
 * 用户
 *
 */
export const FetchGetUser = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Model.UserInfo>>(URL_DIC.user, {
    params,
    isNeedLogin: true,
    ...config
  });

// 分类列表
export const FetchGetCategoryList = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Category[] }>>(
    URL_DIC.category,
    { params, isNeedLogin: true, ...config }
  );

// 新增分类
export const FetchAddCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.category, params, {
    isNeedLogin: true,
    ...config
  });

// 更新分类
export const FetchUpdateCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.category, params, {
    isNeedLogin: true,
    ...config
  });

// 删除分类
export const FetchDeleteCategory = (params: any) =>
  cryptoInstance.delete(URL_DIC.category, { params, isNeedLogin: true });

// 标签列表
export const FetchGetTagList = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Tag[] }>>(URL_DIC.tag, {
    params,
    isNeedLogin: true,
    ...config
  });

// 新增标签
export const FetchAddTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.tag, params, {
    isNeedLogin: true,
    ...config
  });

// 更新标签
export const FetchUpdateTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.tag, params, {
    isNeedLogin: true,
    ...config
  });

// 删除标签
export const FetchDeleteTag = (params: any) =>
  cryptoInstance.delete(URL_DIC.tag, { params, isNeedLogin: true });

// 文章列表
export const FetchGetArticleList = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Article[] }>>(
    URL_DIC.article,
    {
      params,
      isNeedLogin: true,
      ...config
    }
  );

// 新增文章
export const FetchAddArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.article, params, {
    ...config,
    isNeedLogin: true
  });

// 更新文章
export const FetchUpdateArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.article, params, {
    ...config,
    isNeedLogin: true
  });

// 删除文章
export const FetchDeleteArticle = (params: any) =>
  cryptoInstance.delete(URL_DIC.article, { params, isNeedLogin: true });

// 文章详情
export const FetchGetArticleDetail = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<Article>>(URL_DIC.articleDetail, {
    params,
    isNeedLogin: true,
    ...config
  });

// 移动到列表
export const FetchMoveArticleToList = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.articleToList, params, {
    ...config,
    isNeedLogin: true
  });

// 移动到草稿箱
export const FetchMoveArticleToDrafts = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.articleToDrafts, params, {
    ...config,
    isNeedLogin: true
  });

// 发布，取消发布文章
export const FetchPublishArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.publishArticle, params, {
    ...config,
    isNeedLogin: true
  });
