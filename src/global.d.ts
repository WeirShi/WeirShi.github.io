declare module "element-ui/lib/transitions/collapse-transition";
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
