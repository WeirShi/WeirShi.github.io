<template>
  <div id="categories" class="g-layout">
    <a-spin v-if="loading" tip="加载中..." />
    <div class="content" v-if="!loading">
      <div class="categories-wrap" v-if="categories.length !== 0">
        <p class="title">分类</p>
        <div class="inner">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
          >
            {{ category.name }}
            <span>{{ category.count }}篇</span>
          </div>
        </div>
      </div>
      <div class="tags-wrap" v-if="tags.length !== 0">
        <p class="title">标签</p>
        <div class="inner">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="tag-item"
            :style="{}"
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

type categoryItem = {
  name: string;
  count: number;
};
type tagItem = {
  name: string;
  color?: string;
};

@Component({
  components: {
    NoData
  }
})
export default class Categories extends Vue {
  private loading = true;
  private categories: Array<categoryItem> = [
    {
      name: "前端",
      count: 1
    },
    {
      name: "Node",
      count: 10
    },
    {
      name: "JavaScript",
      count: 2
    }
  ];

  private tags: Array<tagItem> = [
    {
      name: "前端",
      color: "#87d068"
    },
    {
      name: "后端",
      color: "#87d068"
    }
  ];

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
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
    .inner {
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
    .inner {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .tag-item {
        cursor: pointer;
        margin: 5px;
      }
      // .tag-item {
      //   position: relative;
      //   padding: 5px 10px;
      //   margin: 5px;
      //   cursor: pointer;
      //   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      //   color: @color-main;
      //   &:after {
      //     content: "";
      //     position: absolute;
      //     bottom: 0px;
      //     left: 0;
      //     width: 100%;
      //     height: 2px;
      //     background-color: @color-main;
      //     visibility: hidden;
      //     transform: scaleX(0);
      //     transition-duration: 0.2s;
      //     transition-timing-function: ease;
      //     &:hover {
      //       &:after {
      //         visibility: visible;
      //         transform: scaleX(1);
      //         transition-duration: 0.2s;
      //         transition-timing-function: ease;
      //       }
      //     }
      //   }
      // }
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
