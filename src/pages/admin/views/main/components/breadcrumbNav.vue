<template>
  <div class="breadcrumb-nav">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>后台系统</a-breadcrumb-item>
      <a-breadcrumb-item>{{ current }}</a-breadcrumb-item>
      <!-- <a-breadcrumb-item
                v-for="(item,index) in $store.state.routerStore.breadcrumbList"
                :key="index"
                :to="{name: item.name}"
            >{{item.title}}</a-breadcrumb-item> -->
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class BreadcrumbNav extends Vue {
  private current = "";

  @Watch("$route")
  routeChange(to: Route) {
    this.current = to.meta.title;
  }

  mounted() {
    this.current = this.$route.meta.title;
  }
}
</script>
<style lang="less" scoped></style>
