import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes: Array<RouteConfig> = [
  {
    path: "/blog",
    redirect: "/blog/home"
  },
  {
    path: "/blog/home",
    component: () =>
      import(/* webpackChunkName: "home" */ "blog/views/home/index.vue")
  },
  {
    path: "/blog/categories",
    component: () =>
      import(
        /* webpackChunkName: "categories" */ "blog/views/categories/index.vue"
      )
  },
  {
    path: "/blog/archives",
    component: () =>
      import(/* webpackChunkName: "archives" */ "blog/views/archives/index.vue")
  },
  {
    path: "/blog/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "blog/views/about/index.vue")
  },
  {
    path: "/blog/search",
    component: () =>
      import(/* webpackChunkName: "search" */ "blog/views/search/index.vue")
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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
