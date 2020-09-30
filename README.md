# 博客 + 博客内容管理系统
## Vue2 + ts 多页面应用

### 项目结构
|-- src
|   |-- global.d.ts             全局的声明文件
|   |-- images.d.ts             图片的全局声明文件
|   |-- ui.ts                   按需加载的UI框架 用了element和Ant-design-vue
|   |-- api                     API接口
|   |-- assets                  静态图片
|   |   |-- images
|   |-- mixins                  mixin的页面滑动事件
|   |   |-- scroll.ts
|   |-- pages                   前端页面
|   |   |-- admin               后台管理页面
|   |   |   |-- App.vue
|   |   |   |-- main.ts
|   |   |   |-- components
|   |   |   |-- router
|   |   |   |   |-- index.ts
|   |   |   |-- store
|   |   |   |   |-- index.ts
|   |   |   |-- views
|   |   |-- blog                博客页面
|   |   |   |-- App.vue
|   |   |   |-- main.ts
|   |   |   |-- components
|   |   |   |-- router
|   |   |   |   |-- index.ts
|   |   |   |-- store
|   |   |   |   |-- index.ts
|   |   |   |-- views
|-- public                      公共帮助函数方法
|   |-- utils
|       |-- cache.ts
|       |-- debounce.ts
|       |-- throttle.ts
|-- style                       公共样式文件
    |-- base.less
    |-- color.less
    |-- grid.less
    |-- main.less
    |-- markdown.less

## 参考 
- ![CodeBear](https://github.com/CB-ysx)的前端博客项目
- 按照大佬的项目，加上了自己的一些想法，使用Vue + ts写了一个多页面应用
- blog目录为博客前端页面
- admin目录为博客后台管理系统前端页面

## LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present WeirShi
