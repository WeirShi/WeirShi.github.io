<template>
  <!-- $store.state.blog.screen.width > 768 ? 'pc' : 'mobile' -->
  <div
    :class="['not-found center']"
    :style="{ height: '100%', overflow: 'hidden' }"
  >
    <img :src="errorImg" alt="404" class="error-img animated swing" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { blogStoreModule } from "../../store/blog";
@Component
export default class NotFound extends Vue {
  private errorImg = require("@/assets/images/404.svg");

  created() {
    console.log(this.$store);
  }
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
  .error-img {
    width: 440px;
  }
}
</style>
