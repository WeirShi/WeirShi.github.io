<template>
  <div class="article-card" @click="readMore(article.id)">
    <div class="article-card-wrap">
      <div class="article-title">
        <span>{{ article.title }}</span>
      </div>
      <div class="article-info">
        <p class="time">
          <a-icon class="iconfont" type="calendar" />发表于{{
            article.publish_time
          }}
        </p>
        •
        <p
          class="category"
          v-if="article.categories && article.categories.length > 0"
        >
          <a-icon class="iconfont" type="folder" />
          <span
            class="classify"
            v-for="(category, index) in article.categories"
            :key="index"
            @click="toPage(category.id, 'category')"
          >
            {{ category.name }}
          </span>
        </p>
        •
        <p class="watch">
          <a-icon class="iconfont" type="eye" />{{ article.watch_times }}次围观
        </p>
        •
        <p class="heart">
          <a-icon class="iconfont" type="heart" />{{ article.like_times }}次点赞
        </p>
      </div>
      <div class="article-description">{{ article.description }}</div>
      <div class="tags" v-if="article.tags && article.tags.length > 0">
        <div
          v-for="(tag, index) in article.tags"
          :key="index"
          class="tag-wrapper"
          @click="toPage(tag.id, 'tag')"
        >
          <Tag :tag="tag" />
        </div>
      </div>
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
export default class Card extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  article: object | undefined;

  @Prop()
  category: object | undefined | null;

  @Prop()
  tag: object | undefined | null;

  private readMore(id: number): void {
    this.$router.push({
      name: "ArticleDetail",
      params: {
        id: String(id)
      }
    });
  }
}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
.article-card {
  position: relative;
  background-color: @color-white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, 0.1);
  min-height: 183px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 768px) {
    min-height: 151px;
    padding: 10px;
  }
  .article-card-wrap {
    position: relative;
    animation: show 0.8s;
  }
  .article-title {
    position: relative;
    display: inline-block;
    font-size: 22px;
    color: @color-main;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  }
  .article-info {
    font-size: 14px;
    margin: 20px 0px;
    color: #666;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    .time,
    .category,
    .watch,
    .heart {
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
