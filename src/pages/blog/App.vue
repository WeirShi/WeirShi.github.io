<template>
  <div id="app">
    <Header />
    <div
      :class="[
        'app-wrapper',
        $store.state.blog.screen.width > 768 ? 'pc' : 'mobile',
        $store.state.blog.showMobileTabs ? 'show-tabs' : ''
      ]"
    >
      <router-view />
    </div>

    <!-- 返回顶部 -->
    <transition name="slide-fade">
      <div class="to-top" @click="scrollToTop(0)" v-show="showScrollToTop">
        <span
          class="to-top-line"
          v-for="(line, index) in lineData"
          :key="index"
          :style="{
            height: line.height,
            left: line.left,
            transform: line.transform
          }"
        >
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Scroll } from "../../mixins/scroll";
import Header from "blog/components/header/index.vue";
import debounce from "@/public/utils/debounce";
import { blogStoreModule } from "./store/blog";

@Component({
  components: {
    Header
  }
})
export default class App extends Mixins(Scroll) {
  private lineData: Array<{ [key: string]: string }> = [
    {
      height: "50%",
      left: "3px",
      transform: "rotateZ(45deg)"
    },
    {
      height: "100%",
      top: "0px",
      transform: "rotateZ(0deg)"
    },
    {
      height: "50%",
      left: "-3px",
      transform: "rotateZ(-45deg)"
    }
  ];

  private showScrollToTop = false;

  private debounceScroll = () => debounce(this.scrollListener, 100);

  private scrollListener(): void {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 60) {
      this.showScrollToTop = true;
    } else {
      this.showScrollToTop = false;
    }
    // if (this.articleMenu) {
    //   for (let i = 0, len = this.articleMenuSource.length; i < len; ++i) {
    //     const item = this.articleMenuSource[i];
    //     let top = document.getElementById(item.id).getBoundingClientRect().top;
    //     top += document.body.scrollTop || document.documentElement.scrollTop;
    //     if (scrollTop <= top + 20) {
    //       this.setArticleMenuTag(item.tag);
    //       break;
    //     }
    //   }
    // }
  }

  private updateScreen() {
    blogStoreModule.setScreen(window.innerWidth, window.innerHeight);
  }

  mounted() {
    // console.log(this.debounceScroll);
    this.updateScreen();
    window.addEventListener("scroll", debounce(this.scrollListener));
    window.addEventListener("resize", debounce(this.updateScreen));
  }

  beforeDestroy() {
    window.removeEventListener("scroll", debounce(this.scrollListener), false);
    window.removeEventListener("resize", debounce(this.updateScreen), false);
  }
}
</script>

<style lang="less">
@import url("~@/style/main.less");
.app-wrapper {
  position: relative;
  transition: all 0.3s;
  &.pc {
    top: 90px;
  }
  &.mobile {
    top: 60px;
    &.show-tabs {
      top: 232px;
    }
  }
}

.to-top {
  position: fixed;
  width: 24px;
  height: 24px;
  background-color: @color-main;
  right: 10px;
  bottom: 15px;
  padding: 5px;
  z-index: 1050;
  cursor: pointer;
  line-height: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .to-top-line {
    position: relative;
    width: 2px;
    height: 100%;
    margin-left: 4px;
    background-color: @color-white;
    &:first-child {
      margin-left: 0px;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
