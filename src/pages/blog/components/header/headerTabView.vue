<template>
  <div id="header-tab-view">
    <div
      :class="['tab', currentPath === tab.to ? 'active' : '']"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectTab(tab)"
    >
      <a-icon class="iconfont" :type="tab.icon" />
      <!-- <a-icon class="iconfont" type="search" theme="filled" /> -->
      <span>{{ tab.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { TabItem } from "./type";
@Component
export default class HeaderTabView extends Vue {
  @Prop({
    type: Array,
    default(): Array<TabItem> {
      return [];
    }
  })
  tabs: TabItem[] | undefined;

  @Prop({
    type: String,
    default: "home"
  })
  currentPath: string | undefined;

  @Emit("tab-click")
  private selectTab(tab: TabItem) {
    return tab;
  }
}
</script>

<style lang="less" scoped>
@import "~@/style/color.less";
#header-tab-view {
  position: relative;
  font-size: 14px;
  cursor: default;
  animation: show 0.5s;
  .tab {
    padding: 5px 8px;
    display: inline-block;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: @color-main;
    background-color: #f9f9f9;
    transition: all 0.5s;
    border-radius: 5px;
    margin-right: 5px;
    &:last-child {
      margin-right: 0px;
    }
    &:hover,
    &.active {
      color: @color-white;
      background-color: @color-main;
    }
    .iconfont {
      font-size: 12px;
      margin-right: 4px;
    }
    .name {
      margin-left: 8px;
    }
  }
}
</style>
