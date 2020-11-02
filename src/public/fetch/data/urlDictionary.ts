const baseUrl = `${process.env.VUE_APP_API_URL}`;
const blogUrl = `${baseUrl}/blog`;

const urlDictionary: Dictionary<string> = {
  login: `${baseUrl}/login`, // 登录
  regist: `${baseUrl}/regist`, // 注册
  user: `${baseUrl}/user`, // 用户
  category: `${baseUrl}/category`, // 分类
  allCategory: `${baseUrl}/category/all`, // 所有分类
  tag: `${baseUrl}/tag`, // 标签
  allTag: `${baseUrl}/tag/all`, // 所有标签
  article: `${baseUrl}/article`, // 文章
  articleDetail: `${baseUrl}/article/detail`, // 文章详情
  articleToList: `${baseUrl}/article/list`, // 移动文章到列表
  publishArticle: `${baseUrl}/article/publish`, // 移动文章到列表
  articleToDrafts: `${baseUrl}/article/drafts`, // 移动文章到草稿箱

  blogArticleList: `${blogUrl}/article/list`, // 前台文章列表
  blogArticleDetail: `${blogUrl}/article/detail`, // 前台文章详情
  blogArticleLike: `${blogUrl}/article/like`, // 前台文章点赞
  blogArticleWatchTimesAdd: `${blogUrl}/article/times/add`, // 前台文章增加访问次数
  blogAllCategory: `${blogUrl}/category/all`, // 所有分类
  blogAllTag: `${blogUrl}/tag/all` // 所有标签
};

export default urlDictionary;
