<template>
  <a-spin class="login" :spinning="loading" tip="数据推送中...">
    <div id="write">
      <a-form-model
        ref="articleForm"
        :model="articleForm"
        :rules="articleFormRules"
      >
        <a-form-model-item label="文章标题" prop="title">
          <a-input
            placeholder="请输入文章标题"
            v-model="articleForm.title"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item label="文章简介" prop="description">
          <a-textarea
            placeholder="请输入文章简介"
            v-model="articleForm.description"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item label="文章封面图链接" prop="cover">
          <a-textarea
            placeholder="请输入文章封面图链接"
            v-model="articleForm.cover"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item label="选择分类" prop="categories">
          <a-select
            :default-value="articleForm.categories"
            mode="multiple"
            placeholder="请选择分类"
            @change="handleCategories"
          >
            <a-select-option
              v-for="item in categoryList"
              :key="item.id"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="选择标签" prop="tags">
          <a-select
            :default-value="articleForm.tags"
            mode="multiple"
            placeholder="请选择标签"
            @change="handleTags"
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
        <a-form-model-item label="文章正文" prop="content">
          <mavon-editor
            class="editor"
            ref="md"
            v-model="articleForm.content"
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

      <a-button type="primary" @click="saveArticle(0)">保存到列表</a-button>
      <a-divider type="vertical" />
      <a-button type="primary" @click="saveArticle(1)">
        保存到草稿箱
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { markdown } from "@/public/utils/markdown";
import { FormModel } from "ant-design-vue";

type ArticleFrom = {
  categories: string[];
  tags: string[];
  title: string;
  description: string;
  content: string;
  cover: string;
};

const validate = (rule: any, value: string[], callback: Function) => {
  console.log("value", value);
  if (value.length === 0) {
    callback(new Error("请选择文章标签/分类！"));
  } else {
    callback();
  }
};

@Component
export default class ArticleWrite extends Vue {
  private categoryList: Category[] = [];
  private tagList: Tag[] = [];
  private loading = false;

  private articleForm: ArticleFrom = {
    categories: [], // 关联的分类
    tags: [], // 关联的标签
    title: "", // 标题
    description: "", // 简介
    content: "", // 文章正文
    cover: "" // 封面图
  };

  private articleFormRules: object = {
    title: [{ required: true, message: "请输入文章标题!", trigger: "blur" }],
    description: [
      { required: true, message: "请输入文章简介!", trigger: "blur" }
    ],
    cover: [
      { required: true, message: "请输入文章封面图链接!", trigger: "blur" }
    ],
    content: [{ required: true, message: "请输入文章正文!", trigger: "blur" }],
    categories: [{ required: true, validator: validate, trigger: "change" }],
    tags: [{ required: true, validator: validate, trigger: "change" }]
  };

  private async getAllCategory(): Promise<void> {
    const { statusCode, data } = await this.$api.FetchGetAllCategory();
    if (statusCode === 0) {
      this.categoryList = data;
    }
  }

  private async getAllTag(): Promise<void> {
    const { statusCode, data } = await this.$api.FetchGetAllTag();
    if (statusCode === 0) {
      this.tagList = data;
    }
  }

  private handleCategories(value: string[]) {
    this.articleForm.categories = value;
  }

  private handleSelectCategory(categories: string[]): Category[] {
    const selectedCategories: Category[] = [];
    categories.forEach(category => {
      const [{ articles, ...others }] = this.categoryList.filter(c => {
        console.log("articles", articles);
        return c.name === category;
      });
      selectedCategories.push({ ...others });
    });

    return selectedCategories;
  }

  private handleTags(value: string[]) {
    this.articleForm.tags = value;
  }

  private handleSelectTag(tags: string[]): Tag[] {
    const selectedTags: Tag[] = [];
    tags.forEach(tag => {
      const [{ articles, ...others }] = this.tagList.filter(c => {
        console.log("articles", articles);
        return c.name === tag;
      });
      selectedTags.push({ ...others });
    });

    return selectedTags;
  }

  private saveArticle(type: number): void {
    // if (this.articleForm.tags.length === 0) {
    //   this.$message.warning("请选择标签");
    //   return;
    // }
    // if (this.articleForm.categories.length === 0) {
    //   this.$message.warning("请选择分类");
    //   return;
    // }
    const articleForm = this.$refs.articleForm as FormModel;
    articleForm.validate(async valid => {
      if (valid) {
        const tags = this.handleSelectTag(this.articleForm.tags);
        const categories = this.handleSelectCategory(
          this.articleForm.categories
        );
        const params = {
          title: this.articleForm.title,
          content: markdown(this.articleForm.content),
          description: this.articleForm.description,
          cover: this.articleForm.cover,
          tags,
          categories,
          is_drafts: type === 0 ? 0 : 1
        };
        this.loading = true;
        const { statusCode, message } = await this.$api.FetchAddArticle(params);
        this.loading = false;
        if (statusCode === 0) {
          articleForm.resetFields();
          this.articleForm.tags = [];
          this.articleForm.categories = [];
          this.$message.success(message);
        } else {
          this.$message.error(message);
        }
      }
    });
  }

  created() {
    this.getAllCategory();
    this.getAllTag();
  }
}
</script>

<style scoped lang="less"></style>
