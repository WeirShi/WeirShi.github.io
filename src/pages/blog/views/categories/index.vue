<template>
  <div id="categories" class="g-layout">
    <a-spin v-if="loading" tip="加载中..." />
    <div class="content" v-if="!loading">
      <div class="categories-wrap" v-if="categories.length !== 0">
        <p class="title">分类</p>
        <div class="category">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            @click="toPage(category.id, 'category')"
          >
            {{ category.name }}
            <span>{{ category.article_count }}篇</span>
          </div>
        </div>
      </div>
      <div class="tags-wrap" v-if="tags.length !== 0">
        <p class="title">标签</p>
        <div class="tag">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="tag-item"
            @click="toPage(tag.id, 'tag')"
          >
            <a-tag :color="tag.color">{{ tag.name }}</a-tag>
          </div>
        </div>
      </div>
    </div>

    <NoData
      v-else-if="!loading && categories.length === 0 && tags.length === 0"
      text="暂无分类/标签"
    />
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
export default class Categories extends Vue {
  private loading = false;
  private categories: Array<Category> = [];

  private tags: Array<Tag> = [];

  private async fetchData() {
    const promises = [
      this.$bapi.FetchGetAllCategory(),
      this.$bapi.FetchGetAllTag()
    ];
    this.loading = true;
    Promise.all(promises)
      .then(reses => {
        this.loading = false;
        if (reses.length !== 2) {
          this.$message.error("请求失败");
        } else {
          const [categoryRes, tagRes] = reses;
          this.categories = categoryRes.data;
          this.tags = tagRes.data;
        }
      })
      .catch(() => {
        this.loading = false;
        this.$message.error("请求失败");
      });
  }

  private toPage(id: number, type: string): void {
    this.$router.push({
      name: "ArticleListByCategory",
      params: {
        id: String(id),
        type
      }
    });
  }

  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: show 0.8s;

  .title {
    font-size: 22px;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 18px;
      font-weight: blod;
      margin-bottom: 20px;
    }
  }
  .categories-wrap {
    margin-bottom: 60px;
    .category {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .category-item {
        padding: 5px 10px;
        margin: 5px;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: @color-main;
        transition: all 0.3s;
        font-size: 16px;
        > span {
          font-size: 12px;
          color: #999999;
        }
        &:hover {
          background-color: @color-main;
          color: @color-white;
        }
        @media (max-width: 768px) {
          font-size: 14px;
        }
      }
    }
  }
  .tags-wrap {
    .tag {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .tag-item {
        cursor: pointer;
        margin: 5px;
      }
    }
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
