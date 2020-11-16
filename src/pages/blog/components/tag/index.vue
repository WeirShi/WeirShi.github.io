<template>
  <div class="tag">
    <a-icon class="iconfont" type="tag" />
    {{ tag.name }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Tag extends Vue {
  @Prop()
  tag: Tag | undefined;
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
.tag {
  color: @color-white;
  padding-top: 5px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 10px;
  background-color: @color-main;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 5px;
  transition: all 0.3s;
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: lighten(@color-main, 20%);
    &:before {
      border-right: 12px solid lighten(@color-main, 20%);
    }
  }
  &:before {
    position: absolute;
    left: -9px;
    top: 0;
    width: 0;
    height: 0;
    content: "";
    border-top: 11px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 12px solid @color-main;
    transition: all 0.3s;
    .iconfont {
      font-size: 12px;
    }
  }
}
</style>
