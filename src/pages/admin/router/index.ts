import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "admin/views/login/index.vue")
  },
  {
    path: "/regist",
    name: "regist",
    component: () =>
      import(/* webpackChunkName: "regist" */ "admin/views/regist/index.vue")
  },
  {
    path: "/404",
    name: "error",
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ "admin/views/error/not-found.vue"
      )
  },
  {
    path: "/main",
    name: "main",
    redirect: "/main/home",
    component: () =>
      import(/* webpackChunkName: "main" */ "admin/views/main/index.vue"),
    children: [
      {
        path: "/main/home",
        name: "home",
        meta: {
          title: "首页"
        },
        component: () =>
          import(
            /* webpackChunkName: "home" */ "admin/views/main/home/index.vue"
          )
      },
      {
        path: "/main/tags",
        name: "tags",
        meta: {
          title: "标签"
        },
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "admin/views/main/tags/index.vue"
          )
      },
      {
        path: "/main/categories",
        name: "categories",
        meta: {
          title: "分类"
        },
        component: () =>
          import(
            /* webpackChunkName: "categories" */ "admin/views/main/categories/index.vue"
          )
      },
      {
        path: "/main/articlewrite",
        name: "articleWrite",
        meta: {
          title: "编写文章",
          parent: "article"
        },
        component: () =>
          import(
            /* webpackChunkName: "articleWrite" */ "admin/views/main/article/write.vue"
          )
      },
      {
        path: "/main/articlelist",
        name: "articleList",
        meta: {
          title: "文章列表",
          parent: "article"
        },
        component: () =>
          import(
            /* webpackChunkName: "articleList" */ "admin/views/main/article/list.vue"
          )
      },
      {
        path: "/main/articledrafts",
        name: "articleDrafts",
        meta: {
          title: "文章草稿箱",
          parent: "article"
        },
        component: () =>
          import(
            /* webpackChunkName: "articleDrafts" */ "admin/views/main/article/drafts.vue"
          )
      },
      {
        path: "/main/articlerecycle",
        name: "articleRecycle",
        meta: {
          title: "文章回收站",
          parent: "article"
        },
        component: () =>
          import(
            /* webpackChunkName: "articleRecycle" */ "admin/views/main/article/recycle.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/admin",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!to.name) {
    // 没有该路由
    next({
      name: "error"
    });
    return;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
