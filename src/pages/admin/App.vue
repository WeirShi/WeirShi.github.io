<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
// import moment from "moment";
// import "moment/locale/zh-cn";
// moment.locale("zh-cn");

@Component
export default class App extends Vue {
  private zh_CN = zh_CN;
}
</script>
<style lang="less">
#app {
  height: 100%;
}

.ant-select-dropdown {
  z-index: 1501 !important;
}
</style>
