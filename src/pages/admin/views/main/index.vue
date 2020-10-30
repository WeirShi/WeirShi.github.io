<template>
  <div id="main">
    <a-layout id="layout">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">
          {{ !collapsed ? "博客管理系统" : "Blog" }}
        </div>
        <side-bar-menu v-model="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0 24px;">
          <!-- <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          /> -->
          <div class="breadcrumb">
            <breadcrumb-nav />
          </div>
          <div class="avator-con">
            <div class="userInfo" style="cursor: pointer;">
              <img
                class="avator"
                :src="require('@/assets/images/default-avatar.png')"
                alt="avator"
              />
              <a-dropdown>
                <span class="el-dropdown-link">
                  <!-- {{userInfo.mobile}}<i class="el-icon-arrow-down el-icon--right"></i> -->
                  {{ userMobile }}<a-icon type="down" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="changePassWord">修改密码</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="logout">退出</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
            overflow: 'auto'
          }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
          Blog System ©2020 Created by Weir.Shi
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbNav from "./components/breadcrumbNav.vue";
import SideBarMenu from "./components/sidebarMenu.vue";
import { handleMobile } from "@/public/utils";
import cookies from "@/public/utils/cookies";
@Component({
  components: {
    SideBarMenu,
    BreadcrumbNav
  }
})
export default class Main extends Vue {
  private collapsed = false;

  get userMobile() {
    console.log(this.$cache.get("userInfo"));
    const mobile = this.$cache.get("userInfo").mobile;
    return handleMobile(mobile);
  }

  private logout(): void {
    this.$cache.clear();
    cookies.remove("token");
    this.$router.push({ name: "login" });
  }

  private changePassWord(): void {
    console.log("changePassWord");
    this.$router.push({ name: "changePassword" });
  }
}
</script>

<style scoped lang="less">
#main,
#layout {
  height: 100%;
}
#layout {
  .trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    line-height: 32px;
    text-align: center;
    color: #fff;
  }

  /deep/.ant-layout-header {
    display: flex;
    align-items: center;
  }

  .avator-con {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    .userInfo {
      .avator {
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
