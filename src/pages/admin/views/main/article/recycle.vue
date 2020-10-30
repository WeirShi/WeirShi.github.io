<template>
  <div>
    <article-table
      type="recycle"
      :list="list"
      :loading="loading"
      :pagination="pagination"
      @table-change="fetchList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleTable from "./components/table.vue";

@Component({
  components: {
    ArticleTable
  }
})
export default class ArticleRecycle extends Vue {
  private list: Article[] = [];
  private loading = false;
  private pagination: Pagination = {
    pageSize: 10,
    current: 1,
    total: 20
  };

  private async fetchList(pagination: Pagination): Promise<void> {
    this.pagination.pageSize = pagination.pageSize;
    this.pagination.current = pagination.current;
    this.loading = true;
    const { statusCode, data, message } = await this.$api.FetchGetArticleList({
      pageSize: pagination.pageSize,
      current: pagination.current,
      type: 2
    });
    this.loading = false;
    if (statusCode === 0) {
      this.$message.success(message);
      this.list = data.list;
      this.pagination.total = data.total;
    } else {
      this.$message.error(message);
    }
  }

  created() {
    this.fetchList(this.pagination);
  }
}
</script>

<style scoped lang="less"></style>
