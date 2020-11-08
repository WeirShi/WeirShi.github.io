<template>
  <div id="article-detail">
    <div class="loading" v-if="loading">
      <a-spin tip="数据加载中..." />
    </div>

    <div class="content" v-else-if="article && !loading">
      <div class="article-message">
        <p class="article-title">
          {{ article.title }}
        </p>
        <div class="article-info">
          <p class="time">
            <a-icon class="iconfont" type="calendar" />发表于{{
              article.publish_time
            }}
          </p>
          •
          <p class="category">
            <a-icon class="iconfont" type="folder" />
            <span class="classify">{{ article.categories[0].name }}</span>
          </p>
          •
          <p class="watch">
            <a-icon class="iconfont" type="eye" />{{
              article.watch_times
            }}次围观
          </p>
        </div>
        <div class="article-description">{{ article.description }}</div>
      </div>
      <MdPreview :content="article.html_content" />

      <div class="tags">
        <div
          v-for="(tag, index) in article.tags"
          :key="index"
          class="tag-wrapper"
        >
          <Tag :tag="tag" />
        </div>
      </div>
    </div>

    <NoData
      v-else
      text="Oops, 文章丢了~"
      :imgUrl="require('@/assets/images/no-article.svg')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoData from "../../components/noData/noData.vue";
import MdPreview from "@/public/components/md-preview/index.vue";
import Tag from "../../components/tag/index.vue";

@Component({
  components: {
    NoData,
    MdPreview,
    Tag
  }
})
export default class ArticleDetail extends Vue {
  private loading = false;
  private id = 0;
  private article: Article | null = null;

  private async fetchData(): Promise<void> {
    if (this.id === 0) {
      return;
    }
    this.loading = true;
    const { statusCode, data } = await this.$bapi.FetchArticleDetail({
      id: this.id
    });
    this.loading = false;
    if (statusCode === 0) {
      this.article = data;
    }
  }

  created() {
    this.id = this.$route.params.id ? Number(this.$route.params.id) : 0;
    this.fetchData();
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#article-detail {
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

  .content {
    position: relative;
    padding: 30px;
    width: 100%;
    background-color: @color-white;
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, 0.1);
    @media (max-width: 768px) {
      padding: 30px 15px;
    }
    .article-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .article-title {
        font-size: 26px;
        font-weight: bold;
        @media (max-width: 768px) {
          font-size: 22px;
        }
      }
      .article-info {
        font-size: 14px;
        margin: 20px 0px;
        color: #666;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        @media (max-width: 768px) {
          font-size: 12px;
        }
        .classify {
          color: #444;
          border-bottom: 1px solid @color-main;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin-right: 5px;
          &:hover {
            color: @color-main;
          }
        }
        .iconfont {
          font-size: 14px;
          margin: 0 5px;
          @media (max-width: 768px) {
            font-size: 12px;
          }
        }
        .time,
        .category,
        .watch {
          margin: 0 6px;
          .iconfont {
            margin-right: 6px;
          }
        }
      }
      .article-description {
        font-size: 14px;
        color: #999;
        margin-bottom: 20px;
      }
    }
    .tags {
      .tag-wrapper {
        display: inline-block;
      }
    }
  }
}
</style>
