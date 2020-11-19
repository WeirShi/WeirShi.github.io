<template>
  <div class="sidebar-menu">
    <a-menu
      theme="dark"
      mode="inline"
      :open-keys="openKeys"
      :selected-keys="[current]"
      @openChange="openSubMenu"
      @select="selectMenu"
    >
      <a-menu-item key="home">
        <a-icon type="home" />
        <span>首页</span>
      </a-menu-item>
      <a-sub-menu key="article">
        <span slot="title">
          <CustomIcon type="article" />
          <span>文章管理</span>
        </span>
        <a-menu-item key="articleWrite">
          写文章
        </a-menu-item>
        <a-menu-item key="articleList">
          列表
        </a-menu-item>
        <a-menu-item key="articleDrafts">
          草稿箱
        </a-menu-item>
        <a-menu-item key="articleRecycle">
          回收站
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="categories">
        <CustomIcon type="category" />
        <span>分类</span>
      </a-menu-item>
      <a-menu-item key="tags">
        <a-icon type="tags" />
        <span>标签</span>
      </a-menu-item>

      <a-sub-menu key="userInfo">
        <span slot="title">
          <CustomIcon type="userInfo" />
          <span>个人中心</span>
        </span>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import CustomIcon from "@/public/components/custom-icons/index.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: {
    CustomIcon
  }
})
export default class SideBarMenu extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  value: boolean | undefined;

  private current: string | null | undefined = "home";
  private openKeys: string[] = [""];

  private selectMenu({ key }: any): void {
    if (this.$route.name === key) {
      return;
    }
    this.current = key;
    this.$router.push({ name: key });
  }

  private openSubMenu(openKeys: string[]): void {
    this.openKeys = openKeys;
  }

  private currentConfig(route: Route): void {
    this.current = route.name;
    if (route.meta.parent) {
      this.openKeys = ["", this.$route.meta.parent];
    }
  }

  @Watch("$route")
  routeChange(to: Route) {
    this.currentConfig(to);
  }

  mounted() {
    this.currentConfig(this.$route);
  }
}
</script>

<style scoped lang="less"></style>
