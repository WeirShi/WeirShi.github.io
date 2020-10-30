<template>
  <div id="write">
    <a-form-model>
      <a-form-model-item label="文章标题">
        <a-input placeholder="请输入文章标题" v-model="title" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="文章简介">
        <a-textarea
          placeholder="请输入文章简介"
          v-model="description"
          allow-clear
        />
      </a-form-model-item>
      <a-form-model-item label="选择分类">
        <a-select
          :default-value="categories"
          mode="multiple"
          placeholder="请选择分类"
        >
          <a-select-option
            v-for="item in categortList"
            :key="item.id"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="选择标签">
        <a-select
          :default-value="tags"
          mode="multiple"
          placeholder="请选择标签"
        >
          <a-select-option
            v-for="item in tagList"
            :key="item.id"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="文章正文">
        <mavon-editor
          class="editor"
          ref="md"
          v-model="content"
          :boxShadow="true"
          defaultOpen="edit"
          :toolbars="{
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: false, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: false, // 展示html源码
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: false, // 保存（触发events中的save事件）
            navigation: false, // 导航目录
            alignleft: false, // 左对齐
            aligncenter: false, // 居中
            alignright: false, // 右对齐
            subfield: true, // 单双栏模式
            preview: true // 预览
          }"
        />
      </a-form-model-item>
    </a-form-model>

    <a-button type="primary" size="small" @click="saveArticle"
      >保存到列表</a-button
    >
    <a-divider type="vertical" />
    <a-button type="primary" size="small">保存到草稿箱</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { markdown } from "@/public/utils/markdown";

@Component
export default class ArticleWrite extends Vue {
  private categortList: Category[] = [];
  private tagList: Tag[] = [];
  private categories: Category[] = [];
  private tags: Tag[] = [];
  private title = "";
  private description = "";
  private content = "";

  private async getCategoryList(): Promise<void> {
    const { statusCode, data } = await this.$api.FetchGetCategoryList({
      pageSize: 100000,
      current: 1
    });
    if (statusCode === 0) {
      this.categortList = data.list;
    }
  }

  private async getTagList(): Promise<void> {
    const { statusCode, data } = await this.$api.FetchGetTagList({
      pageSize: 100000,
      current: 1
    });
    if (statusCode === 0) {
      this.tagList = data.list;
    }
  }

  private saveArticle(): void {
    console.log(markdown(this.content));
  }

  created() {
    this.getCategoryList();
    this.getTagList();
  }
}
</script>

<style scoped lang="less"></style>
