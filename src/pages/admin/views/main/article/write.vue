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
            :value="articleForm.categories"
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
            :value="articleForm.tags"
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
          <v-md-editor
            v-model="articleForm.content"
            height="400px"
          ></v-md-editor>
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
import { FormModel } from "ant-design-vue";

import VueMarkdownEditor from "@kangc/v-md-editor";

type ArticleFrom = {
  categories: string[];
  tags: string[];
  title: string;
  description: string;
  content: string;
  cover: string;
};

const validate = (rule: any, value: string[], callback: Function) => {
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

  private editId = 0;

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [{ articles, ...others }] = this.categoryList.filter(c => {
        return c.name === category;
      });
      selectedCategories.push({ ...others });
    });

    return selectedCategories;
  }

  private handleTags(value: string[]) {
    this.articleForm.tags = value;
  }

  private handleSelectData(list: string[], type: number): Tag[] | Category[] {
    const selectdData: Tag[] | Category[] = [];
    const listData = type === 0 ? this.tagList : this.categoryList;
    list.forEach(item => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [{ articles, ...others }] = listData.filter(c => {
        return c.name === item;
      });
      selectdData.push({ ...others });
    });

    return selectdData;
  }

  private saveArticle(type: number): void {
    const articleForm = this.$refs.articleForm as FormModel;
    articleForm.validate(async valid => {
      if (valid) {
        const tags = this.handleSelectData(this.articleForm.tags, 0);
        const categories = this.handleSelectData(
          this.articleForm.categories,
          1
        );
        // 调用方法将 markdown 转换成 html 并使用 xss 过滤
        const html = VueMarkdownEditor.xss.process(
          VueMarkdownEditor.themeConfig.markdownParser.render(
            this.articleForm.content
          )
        );
        const params = {
          id: 0,
          title: this.articleForm.title,
          content: this.articleForm.content,
          html_content: html,
          description: this.articleForm.description,
          cover: this.articleForm.cover,
          tags,
          categories,
          is_drafts: type === 0 ? 0 : 1
        };
        if (this.editId) {
          params.id = this.editId;
        }
        this.loading = true;
        const { statusCode, message } =
          this.editId === 0
            ? await this.$api.FetchAddArticle(params)
            : await this.$api.FetchUpdateArticle(params);
        this.loading = false;
        if (statusCode === 0) {
          this.$router.push({
            name: "articleList"
          });
          this.$message.success(message);
        } else {
          this.$message.error(message);
        }
      }
    });
  }

  private async fetchArticleDetail(): Promise<void> {
    if (this.editId === 0) {
      return;
    }
    const {
      statusCode,
      data,
      message
    } = await this.$api.FetchGetArticleDetail({ id: this.editId });
    if (statusCode === 0) {
      const { categories, tags, content, title, cover, description } = data;
      this.articleForm.categories = categories.map((category: Category) => {
        return category.name;
      });
      this.articleForm.tags = tags.map((tag: Tag) => {
        return tag.name;
      });
      this.articleForm.content = content;
      this.articleForm.title = title;
      this.articleForm.cover = cover;
      this.articleForm.description = description;
    } else {
      this.$message.error(message);
    }
  }

  created() {
    this.getAllCategory();
    this.getAllTag();

    this.editId = this.$route.query.id ? Number(this.$route.query.id) : 0;
    this.fetchArticleDetail();
  }
}
</script>

<style scoped lang="less"></style>
