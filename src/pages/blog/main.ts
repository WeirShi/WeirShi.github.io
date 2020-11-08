import Vue from "vue";
import App from "./App.vue";
import "../../registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/antd-ui";
import "@/ele-ui";

import * as api from "../../api/blog";
Vue.prototype.$bapi = api;

import highlight from "@/public/plugin/highlight";
Vue.use(highlight);

import cache from "@/public/utils/cache";
const { storage } = cache;
storage
  ? (Vue.prototype.$cache = storage)
  : Vue.prototype.$notification.warn({
      message: "警告",
      description: "您当前的浏览器不支持Storage缓存处理，请升级或更换浏览器"
    });

// import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/preview.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
// import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
// VMdEditor.use(githubTheme);
Vue.use(VMdPreview);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
