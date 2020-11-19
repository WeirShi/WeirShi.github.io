import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/blog/404",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "blog/views/notFound/index.vue")
  },
  {
    path: "/blog",
    name: "Blog",
    redirect: "/blog/home",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "blog/views/main/index.vue"),
    children: [
      {
        path: "/blog/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "blog/views/home/index.vue")
      },
      {
        path: "/blog/categories",
        name: "Category",
        component: () =>
          import(
            /* webpackChunkName: "categories" */ "blog/views/categories/index.vue"
          )
      },
      {
        path: "/blog/archives",
        name: "Archives",
        component: () =>
          import(
            /* webpackChunkName: "archives" */ "blog/views/archives/index.vue"
          )
      },
      {
        path: "/blog/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "blog/views/about/index.vue")
      },
      {
        path: "/blog/search",
        name: "Search",
        component: () =>
          import(/* webpackChunkName: "search" */ "blog/views/search/index.vue")
      },
      {
        path: "/blog/article/deital/:id",
        name: "ArticleDetail",
        component: () =>
          import(
            /* webpackChunkName: "articleDetail" */ "blog/views/article/detail.vue"
          )
      },
      {
        path: "/blog/article/:type/:id",
        name: "ArticleListByCategory",
        component: () =>
          import(
            /* webpackChunkName: "articleListByCategory" */ "blog/views/categories/list.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
      path: "/blog/404"
    });
    return;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
