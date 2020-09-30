<template>
  <div id="right-nav" v-if="$store.state.blog.screen.width > 990">
    <div
      class="right-nav-wrapper"
      :style="{
        width: showRightNav ? '320px' : '0px'
      }"
    ></div>
    <div
      :class="['toggle', showRightNav ? 'show-nav' : '']"
      @click="toggle"
      @mouseover="setLineData"
      @mouseout="setLineData"
    >
      <span
        class="toggle-line"
        v-for="(line, index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity,
          transition: 'all .1s'
        }"
      >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { blogStoreModule } from "../../store/blog";

@Component
export default class RightNav extends Vue {
  private show = true;
  private showRightNav = false;
  private lineStyle: Dictionary<Array<Dictionary<string>>> = {
    normalLineData: [
      {
        width: "100%",
        top: "1px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "3px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "5px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      }
    ],
    closeLineData: [
      {
        width: "100%",
        top: "9px",
        transform: "rotateZ(-45deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "0px",
        transform: "rotateZ(0deg)",
        opacity: "0"
      },
      {
        width: "100%",
        top: "-3px",
        transform: "rotateZ(45deg)",
        opacity: "1"
      }
    ],
    arrowLineData: [
      {
        width: "50%",
        top: "5px",
        transform: "rotateZ(-45deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "3px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      },
      {
        width: "50%",
        top: "1px",
        transform: "rotateZ(45deg)",
        opacity: "1"
      }
    ]
  };
  private toggleLineData: Array<Dictionary<string>> = [];

  private setLineData(e: MouseEvent): void {
    if (this.showRightNav) {
      return;
    }
    if (e.type === "mouseover") {
      this.toggleLineData = this.lineStyle.arrowLineData;
    } else {
      this.toggleLineData = this.lineStyle.normalLineData;
    }
  }

  private toggle(): void {
    this.showRightNav = !this.showRightNav;
    this.toggleLineData = this.showRightNav
      ? this.lineStyle.closeLineData
      : this.lineStyle.normalLineData;

    blogStoreModule.changeRightNav(this.showRightNav);
  }

  created() {
    this.toggleLineData = this.lineStyle.normalLineData;
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#right-nav {
  position: relative;
  transition: all 0.3s;
  .right-nav-wrapper {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    background-color: @color-main;
    color: @color-white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    overflow: hidden;
    transition: all 0.1s;
  }
  .toggle {
    position: fixed;
    width: 30px;
    height: 30px;
    background-color: @color-main;
    right: 25px;
    bottom: 190px;
    padding: 5px;
    z-index: 1050;
    cursor: pointer;
    line-height: 0;
    border-radius: 3px;
    .toggle-line {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 2px;
      margin-top: 4px;
      background-color: @color-white;
      &:first-child {
        margin-top: 0px;
      }
    }
  }
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
