<template>
  <div id="search" class="g-layout">
    <a-input-search
      v-model="searchValue"
      placeholder="请输入关键词，按下回车键搜索"
      @pressEnter="searchAction"
    />

    <div class="search-content">
      <a-spin v-if="loading" tip="加载中..." />
      <div class="content" v-else>
        <div class="article-list" v-if="searchResult.length !== 0"></div>
        <NoData v-else :imgUrl="require('@/assets/images/no-data.svg')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoData from "blog/components/noData/noData.vue";

@Component({
  components: {
    NoData
  }
})
export default class Search extends Vue {
  private loading = false;
  private searchResult: Array<Dictionary<string>> = [
    // {
    //   articleName: "JavaScript"
    // },
    // {
    //   articleName: "JavaScript"
    // }
  ];

  private searchValue = "";
  private searchAction(): void {
    console.log("search something", this.searchValue);
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#search {
  .search-content {
    position: relative;
    width: 100%;
    padding: 10px 30px;
    -webkit-animation: show-data 0.8s;
    animation: show-data 0.8s;
  }
}

@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
