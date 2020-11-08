<template>
  <div id="main">
    <Header />
    <div
      :class="[
        'app-wrapper',
        $store.state.blog.screen.width > 768 ? 'pc' : 'mobile',
        $store.state.blog.showMobileTabs ? 'show-tabs' : '',
        $store.state.blog.showRightNav ? 'show-right-nav' : ''
      ]"
    >
      <div class="inner">
        <router-view />
      </div>
      <Footer />
    </div>

    <RightNav />

    <!-- 返回顶部 -->
    <transition name="slide-fade">
      <div class="to-top" @click="scrollToTop(0)" v-show="showScrollToTop">
        <div class="top-icon"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Scroll } from "../../../../mixins/scroll";
import Header from "blog/components/header/index.vue";
import Footer from "../../components/footer/index.vue";
import RightNav from "../../components/rightNav/index.vue";

import debounce from "@/public/utils/debounce";
import { blogStoreModule } from "../../store/blog";

@Component({
  components: {
    Header,
    Footer,
    RightNav
  }
})
export default class App extends Mixins(Scroll) {
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
    console.log(this.$store);
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
  position: absolute;
  width: 100%;
  transition: all 0.1s;
  &.show-right-nav {
    width: calc(100% - 320px);
  }

  .inner {
    max-width: 1000px;
    min-width: 320px;
    margin: 0 auto;
    padding: 0 10px;
    // min-height: calc(100vh - 120px);
    -webkit-transition: width 0.3s;
    transition: width 0.3s;
  }
  &.pc {
    top: 90px;
  }
  &.mobile {
    top: 60px;
    &.show-tabs {
      top: 232px;
    }
    .inner {
      width: 100%;
    }
  }
}

.to-top {
  width: 40px;
  height: 40px;
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  position: fixed;
  right: 20px;
  bottom: 135px;
  z-index: 1050;
  cursor: pointer;
  line-height: 0;
  border-radius: 50%;
  .top-icon {
    width: 14px;
    height: 16px;
    margin: 12px auto;
    background: url("~@/assets/images/to-top.png") 100%/100% no-repeat;
    background-size: cover;
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
