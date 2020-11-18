<template>
  <div id="home" class="g-layout">
    <div class="home-wrapper">
      <div class="loading" v-if="loading">
        <a-spin tip="加载中..." />
      </div>
      <div class="content" v-else>
        <div class="article-list" v-if="articleList.length !== 0">
          <ArticleCard
            v-for="article in articleList"
            :key="article.id"
            :article="article"
          />

          <a-pagination
            size="small"
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
import { Component, Mixins } from "vue-property-decorator";
import { Scroll } from "@/mixins/scroll";
import NoData from "../../components/noData/noData.vue";
import ArticleCard from "../../components/article/article-card.vue";

@Component({
  components: {
    NoData,
    ArticleCard
  }
})
export default class Home extends Mixins(Scroll) {
  private loading = false;
  private page: Pagination = {
    pageSize: 10,
    current: 1,
    total: 0
  };
  private articleList: Array<Article> = [];

  private pageChange(page: number, pageSize: number): void {
    console.log(page, pageSize);
    this.scrollToTop(0, false);
    this.page.pageSize = page;
  }

  private async fetchData(): Promise<void> {
    this.loading = true;
    const { statusCode, data, message } = await this.$bapi.FetchGetArticleList({
      pageSize: this.page.pageSize,
      current: this.page.current
    });
    this.loading = false;
    if (statusCode === 0) {
      this.page.total = data.total;
      this.articleList = data.list;
    } else {
      this.$message.error(message);
    }
  }

  created() {
    this.fetchData();
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
