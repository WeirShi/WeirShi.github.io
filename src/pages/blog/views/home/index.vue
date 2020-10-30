<template>
  <div id="home" class="g-layout">
    <div class="home-wrapper">
      <div class="loading" v-if="loading">
        <a-spin tip="加载中..." />
      </div>
      <div class="content" v-else>
        <div class="article-list" v-if="articleList.length !== 0">
          <a-pagination
            :current="page.current"
            :total="page.total"
            @change="pageChange"
          />
        </div>
        <NoData v-else text="作者太懒了，还没有写一篇文章~" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoData from "../../components/noData/noData.vue";

@Component({
  components: {
    NoData
  }
})
export default class Home extends Vue {
  private loading = false;
  private page: Pagination = {
    pageSize: 10,
    current: 1,
    total: 0
  };
  private articleList: Array<Article> = [];

  private pageChange(page: number, pageSize: number): void {
    console.log(page, pageSize);
    this.page.pageSize = page;
  }

  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.articleList = [
        {
          id: 1,
          title: "JavaScript",
          watch_time: 1000,
          content: "",
          cover: ""
        }
      ];
    }, 2000);
  }
}
</script>

<style scoped lang="less">
#home {
  .loading {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    text-align: center;
  }
}
</style>
