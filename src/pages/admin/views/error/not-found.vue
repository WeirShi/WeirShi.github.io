<template>
  <div
    class="not-found center"
    :style="{ height: '100%', background: '#ececec', overflow: 'hidden' }"
  >
    <img :src="errorImg" alt="404" class="animated swing" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {
  private errorImg = require("@/assets/images/404.png");
}
</script>

<style scoped lang="less">
@import "~@/style/animate.less";
.not-found {
  &.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
