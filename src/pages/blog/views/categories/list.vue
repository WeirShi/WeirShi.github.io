<template>
  <div id="article-list">
    <div class="loading" v-if="loading">
      <a-spin tip="数据加载中..." />
    </div>

    <div class="content" v-else>
      <div class="article-list" v-if="articleList.length !== 0">
        <ArticleCard
          v-for="article in articleList"
          :key="article.id"
          :article="article"
        />
      </div>

      <NoData v-else text="作者太懒了，还没有写一篇文章~" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ArticleCard from "../../components/article/card.vue";
import NoData from "../../components/noData/noData.vue";

@Component({
  components: {
    ArticleCard,
    NoData
  }
})
export default class CategoryList extends Vue {
  private type = "";
  private id = 0;
  private loading = false;
  private articleList: Array<Article> = [];

  private initData(): void {
    const { id, type } = this.$route.params;
    this.type = type || "";
    this.id = id ? Number(id) : 0;
    this.fetchData();
  }

  private async fetchData(): Promise<void> {
    this.loading = true;
    const {
      statusCode,
      data,
      message
    } = await this.$bapi.FetchArticleListByCategory({
      type: this.type,
      id: this.id
    });
    this.loading = false;
    if (statusCode === 0) {
      const { articles } = data;
      this.articleList = articles;
      //   if (this.type === "category") {
      //     this.category = {
      //       ...others
      //     };
      //   } else {
      //     this.tag = {
      //       ...others
      //     };
      //   }
      //   console.log("articleList", this.articleList);
    } else {
      this.$message.error(message);
    }
  }

  @Watch("$route")
  routerChange() {
    this.initData();
  }

  created() {
    this.initData();
  }
}
</script>

<style scoped lang="less">
#article-list {
  min-height: 800px;
  position: relative;
  padding: 30px 10px;
  width: 100%;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
