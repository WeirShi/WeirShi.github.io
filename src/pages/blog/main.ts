import Vue from "vue";
import App from "./App.vue";
import "../../registerServiceWorker";
import router from "./router";
import store from "./store";

import "../../ui";
// import { Scroll } from "../../mixins/scroll";
// Vue.mixin(Scroll);

import cache from "@/public/utils/cache";
const { storage } = cache;
storage
  ? (Vue.prototype.$cache = storage)
  : Vue.prototype.$notification.warn({
      message: "警告",
      description: "您当前的浏览器不支持Storage缓存处理，请升级或更换浏览器"
    });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
