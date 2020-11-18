<template>
  <a-spin
    id="archives"
    class="g-layout"
    :spinning="loading"
    tip="数据加载中..."
  >
    <div class="content" v-if="articles">
      <div class="archives-wrap">
        <div class="time-line"></div>
        <div class="list-content">
          <p class="normal-node">目前共计 {{ page.total }} 篇文章~</p>
          <div
            class="bold-node"
            v-for="(year, key, index) in articles"
            :key="index"
          >
            <p>{{ key }}年</p>
            <div
              class="bold-node month"
              v-for="(month, key, index) in year"
              :key="index"
            >
              <p>{{ key }}月</p>
              <ArticleCard
                v-for="(article, index) in month"
                :key="index"
                :article="article"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <a-pagination
          size="small"
          :current="page.current"
          :total="page.total"
          @change="pageChange"
        />
      </div>
    </div>
    <NoData v-else text="作者太懒了，还没有写一篇文章~" />
  </a-spin>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Scroll } from "@/mixins/scroll";
import NoData from "../../components/noData/noData.vue";
import ArticleCard from "../../components/article/card.vue";

@Component({
  components: {
    NoData,
    ArticleCard
  }
})
export default class Archives extends Mixins(Scroll) {
  private loading = false;
  private page: Pagination = {
    pageSize: 10,
    current: 1,
    total: 0
  };
  private articles: Dictionary<Dictionary<Article[]>> | null = null;

  private pageChange(page: number, pageSize: number): void {
    console.log(page, pageSize);
    this.scrollToTop(0, false);
    this.page.pageSize = page;
    this.fetchData();
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

      const articles: Dictionary<Dictionary<Article[]>> = {};
      data.list.forEach((article: Article) => {
        const [year, month] = (article.publish_time &&
          article.publish_time.split("/")) as string[];
        if (articles[year] === undefined) {
          articles[year] = {};
        }
        if (articles[year][month] === undefined) {
          articles[year][month] = [];
        }
        articles[year][month].push(article);
      });
      console.log("articles", articles);
      this.articles = articles;
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
@import "~@/style/color.less";
#archives {
  position: relative;
  padding: 30px 10px;
  .pagination {
    width: 100%;
    padding: 10px 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    background-color: @color-white;
  }
  .archives-wrap {
    position: relative;
    width: 100%;
    padding: 10px 30px;
    animation: show 0.8s;
    @media (max-width: 768px) {
      padding: 5px;
    }
    .time-line {
      position: absolute;
      left: 30px;
      top: 15px;
      bottom: 0;
      width: 2px;
      background-color: #eee;
      @media (max-width: 768px) {
        left: 5px;
      }
    }
    .list-content {
      .normal-node {
        position: relative;
        color: #555;
        padding: 0 15px;
        font-size: 16px;
        margin-bottom: 20px;
        @media (max-width: 768px) {
          font-size: 14px;
        }
        &:before {
          position: absolute;
          left: -4px;
          top: 5px;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: #999;
          @media (max-width: 768px) {
            left: -3px;
            top: 4px;
            width: 8px;
            height: 8px;
            border-radius: 8px;
          }
        }
      }
      .bold-node {
        position: relative;
        color: #555;
        padding: 0 15px;
        font-size: 28px;
        margin-bottom: 20px;
        @media (max-width: 768px) {
          font-size: 22px;
        }
        &:before {
          position: absolute;
          left: -4px;
          top: 10px;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: #999;
          @media (max-width: 768px) {
            left: -3px;
            top: 8px;
            width: 8px;
            height: 8px;
            border-radius: 8px;
          }
        }
        > p {
          margin-bottom: 20px;
        }
        .month {
          color: #666;
          font-size: 26px;
          @media (max-width: 768px) {
            font-size: 20px;
          }
          &:before {
            left: -19px;
            @media (max-width: 768px) {
              left: -18px;
            }
          }
        }
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
