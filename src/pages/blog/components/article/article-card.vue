<template>
  <div id="article-card">
    <div class="article-card-wrap">
      <div
        class="article-cover"
        :style="{
          backgroundImage: 'url(' + article.cover + ')'
        }"
      >
        <div class="article-title" @click="readMore(article.id)">
          <span>{{ article.title }}</span>
        </div>
      </div>
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
          <a-icon class="iconfont" type="eye" />{{ article.watch_times }}次围观
        </p>
      </div>
      <div class="article-description">{{ article.description }}</div>
      <div class="tags" v-if="article.tags.length > 0">
        <div
          v-for="(tag, index) in article.tags"
          :key="index"
          class="tag-wrapper"
        >
          <Tag :tag="tag" />
        </div>
      </div>
      <div class="read-more" @click="readMore(article.id)">阅读全文 >></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Tag from "../tag/index.vue";

@Component({
  components: {
    Tag
  }
})
export default class ArticleCard extends Vue {
  @Prop()
  article: object | undefined;

  private readMore(id: number): void {
    this.$router.push({
      name: "ArticleDetail",
      params: {
        id: String(id)
      }
    });
  }

  created() {
    console.log(this.article);
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#article-card {
  position: relative;
  background-color: @color-white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, 0.1);
  min-height: 603px;
  line-height: 1.2;
  animation: show 0.8s;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 768px) {
    min-height: 285.5px;
    padding: 10px;
  }
  .article-card-wrap {
    position: relative;
    text-align: left;
  }
  .article-cover {
    position: relative;
    width: 100%;
    background-position: center;
    background-size: cover;
    &:before {
      top: 0;
      left: 0;
      width: 100%;
      padding-top: 50%;
      content: " ";
      background: rgba(0, 0, 0, 0.3);
      display: block;
    }
    .article-title {
      position: absolute;
      font-size: 24px;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      font-weight: bold;
      color: @color-white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      @media (max-width: 768px) {
        font-size: 18px;
      }
      span {
        position: relative;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &:after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: @color-white;
          visibility: hidden;
          transform: scaleX(0);
          transition-duration: 0.2s;
          transition-timing-function: ease;
        }
        &:hover {
          &:after {
            visibility: visible;
            transform: scaleX(1);
            transition-duration: 0.2s;
            transition-timing-function: ease;
          }
        }
      }
    }
  }
  .article-info {
    font-size: 14px;
    margin: 20px 0px;
    color: #666666;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    .time,
    .category,
    .watch {
      margin: 0 6px;
      .iconfont {
        margin-right: 6px;
      }
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
      .iconfont {
        font-size: 14px;
        @media (max-width: 768px) {
          font-size: 12px;
        }
        margin: 0 5px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
  .article-description {
    color: #666;
    border-left: 2px solid #666;
    padding-left: 5px;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  .read-more {
    position: relative;
    display: inline-block;
    font-size: 14px;
    margin-top: 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    @media (max-width: 768px) {
      font-size: 12px;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: @color-main;
      visibility: hidden;
      transform: scaleX(0);
      transition-duration: 0.2s;
      transition-timing-function: ease;
    }
    &:hover {
      &:after {
        visibility: visible;
        transform: scaleX(1);
        transition-duration: 0.2s;
        transition-timing-function: ease;
      }
    }
  }
  .tag-wrapper {
    display: inline-block;
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
