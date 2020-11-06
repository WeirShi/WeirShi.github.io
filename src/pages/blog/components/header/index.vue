<template>
  <div
    id="m-header"
    :class="[$store.state.blog.screen.width > 768 ? 'pc' : 'mobile']"
    :style="{
      width: $store.state.blog.showRightNav ? 'calc(100% - 320px)' : '100%'
    }"
  >
    <div
      class="header-wrap"
      :style="{
        height: $store.state.blog.screen.width > 768 ? '90px' : '60px'
      }"
    >
      <div class="header-logo" @click="toHomeFromLogo" :style="{}">
        <div
          v-if="$store.state.blog.screen.width > 768"
          data-text="Weir.Shi's Blog"
          class="blog-name btn btn-ghost btn-border-stroke  btn-text-float-up"
        >
          <div class="btn-borders">
            <div class="border-top"></div>
            <div class="border-right"></div>
            <div class="border-bottom"></div>
            <div class="border-left"></div>
          </div>
          <span class="btn-text">Weir.Shi's Blog</span>
        </div>

        <div v-else class="blog-name">
          <span class="btn-text">Weir.Shi's Blog</span>
        </div>
      </div>
      <HeaderTabView
        v-if="$store.state.blog.screen.width > 768"
        :tabs="tabs"
        :currentPath="currentPath"
        @tab-click="selectTab"
      />
      <div
        class="toggle"
        v-if="!($store.state.blog.screen.width > 768)"
        @click="toggle"
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
            transition: 'all .3s'
          }"
        >
        </span>
      </div>
    </div>
    <el-collapse-transition :bordered="false">
      <div
        class="mobile-tab-wrap"
        v-show="!($store.state.blog.screen.width > 768) && showMobileTabs"
      >
        <div
          :class="['tab', currentPath === tab.to ? 'active' : '']"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectTab(tab)"
        >
          <a-icon class="iconfont" :type="tab.icon" />
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HeaderTabView from "./headerTabView.vue";
import { TabItem } from "./type";
import { blogStoreModule } from "../../store/blog";
import { RouteConfig } from "vue-router";

@Component({
  components: {
    HeaderTabView
  }
})
export default class Header extends Vue {
  private currentPath = "";
  private tabs: TabItem[] = [
    {
      name: "首页",
      icon: "home",
      to: "/blog/home"
    },
    {
      name: "分类/标签",
      icon: "tags",
      to: "/blog/categories"
    },
    {
      name: "归档",
      icon: "profile",
      to: "/blog/archives"
    },
    {
      name: "关于",
      icon: "user",
      to: "/blog/about"
    }
    // {
    //   name: "友链",
    //   icon: "friends-link",
    //   to: "friends"
    // },
    // {
    //   name: "更多",
    //   icon: "appstore",
    //   to: "morefunc"
    // },
    // {
    //   name: "搜索",
    //   icon: "search",
    //   to: "/blog/search"
    // }
  ];

  private lineStyle = {
    normalLineData: [
      {
        width: "100%",
        top: "0px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "0px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      },
      {
        width: "100%",
        top: "0px",
        transform: "rotateZ(0deg)",
        opacity: "1"
      }
    ],
    closeLineData: [
      {
        width: "100%",
        top: "6px",
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
        top: "-6px",
        transform: "rotateZ(45deg)",
        opacity: "1"
      }
    ]
  };
  private toggleLineData: Array<{ [key: string]: string }> = [];
  private showMobileTabs = false;

  private toHomeFromLogo(): void {
    this.$router.push({ path: "/blog/home" });
  }
  private toggle() {
    this.showMobileTabs = !this.showMobileTabs;
    blogStoreModule.changeMobileTabs(this.showMobileTabs);
    this.toggleLineData = this.showMobileTabs
      ? this.lineStyle.closeLineData
      : this.lineStyle.normalLineData;
  }
  private selectTab(tab: TabItem): void {
    if (blogStoreModule.screen.width <= 768) {
      this.toggle();
    }
    if (this.currentPath === tab.to) {
      return;
    }
    this.currentPath = tab.to;
    this.$router.push({ path: tab.to });
  }

  @Watch("$route")
  routechange(to: RouteConfig) {
    const { path } = to;
    this.currentPath = path;
  }

  created() {
    this.toggleLineData = this.lineStyle.normalLineData;
    const { path } = this.$route;
    this.currentPath = path;
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
