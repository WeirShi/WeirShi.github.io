declare module "element-ui/lib/transitions/collapse-transition";
declare module "ant-design-vue/lib/locale-provider/zh_CN";
declare module "nprogress";
interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

interface Dictionary<T> {
  [key: string]: T;
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Window {
  _hmt: [];
}

type Pagination = {
  pageSize: number;
  current: number;
  total: number;
};

type Article = {
  id: number;
  title: string;
  content: string;
  cover: string;
  watch_time: number;
  tags?: Array<Tag>;
  categories?: Array<Category>;
  is_drafts?: number;
  is_delete?: number;
  is_publish?: number;
  create_time?: string;
  update_time?: string | null;
  publish_time?: string | null;
};

type Category = {
  id: number;
  name: string;
  sort?: number;
  create_time?: string | null;
  update_time?: string | null;
  articles?: Article[];
};

type Tag = {
  id: number;
  name: string;
  sort?: number;
  color?: string;
  create_time?: string | null;
  update_time?: string | null;
  articles?: Article[];
};

// interface CacheInterface {
//   postfix: string;
//   storage: Storage | null;
//   set(
//     k: string,
//     v: string | Record<string, any> | Array<any> | number,
//     t?: number
//   ): void;
//   get(
//     k: string,
//     def?: string | Record<string, any> | Array<any> | number
//   ): string | Record<string, any> | Array<any> | number;
//   clear(): void;
//   remove(k: string): void;
// }
