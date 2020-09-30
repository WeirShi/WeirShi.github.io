# 博客 + 博客内容管理系统
## Vue2 + ts 多页面应用

### 项目结构
    |-- src
    |   |-- global.d.ts
    |   |-- images.d.ts
    |   |-- ui.ts
    |   |-- api
    |   |-- assets
    |   |   |-- images
    |   |-- mixins
    |   |   |-- scroll.ts
    |   |-- pages
    |   |   |-- admin
    |   |   |   |-- App.vue
    |   |   |   |-- main.ts
    |   |       |-- components
    |   |   |   |-- router
    |   |   |   |   |-- index.ts
    |   |   |   |-- store
    |   |   |       |-- index.ts
    |   |       |-- views
    |   |   |-- blog
    |   |       |-- App.vue
    |   |       |-- main.ts
    |   |       |-- components
    |   |       |-- router
    |   |       |   |-- index.ts
    |   |       |-- store
    |   |       |   |-- index.ts
    |   |       |-- views
    |   |-- public
    |   |   |-- utils
    |   |       |-- cache.ts
    |   |       |-- debounce.ts
    |   |       |-- throttle.ts
    |   |-- style
    |       |-- base.less
    |       |-- color.less
    |       |-- grid.less
    |       |-- main.less
    |       |-- markdown.less
    

## 参考 
- [CodeBear](https://github.com/CB-ysx)的前端博客项目
- 按照大佬的项目，加上了自己的一些想法，使用Vue + ts写了一个多页面应用
- blog目录为博客前端页面
- admin目录为博客后台管理系统前端页面

## LICENSE

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present WeirShi
