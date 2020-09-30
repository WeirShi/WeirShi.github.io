<template>
  <div class="no-data">
    <img class="default-img" :src="imgUrl" />
    <p v-if="text">{{ text }}</p>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NoData extends Vue {
  @Prop({
    type: String,
    default: "暂无数据"
  })
  text: string | undefined;

  @Prop({
    type: String,
    default: require("./no-data.svg")
  })
  imgUrl: string | undefined;
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
.no-data {
  width: 100%;
  height: 100%;
  background-color: @color-white;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 450px;
  position: relative;
  & > p {
    margin-top: 20px;
    color: @color-light-grey;
    position: absolute;
    bottom: 0;
    font-weight: bold;
  }
  .default-img {
    width: 420px;
  }
  @media (max-width: 450px) {
    min-height: 280px;
    .default-img {
      width: 280px;
    }
  }
}
</style>
