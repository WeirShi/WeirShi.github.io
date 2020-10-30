<template>
  <div id="article-table">
    <a-table
      :columns="columns"
      row-key="id"
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ x: 1300 }"
      @change="handleTableChange"
    >
      <template slot="cover" slot-scope="cover">
        <img style="width: 100px;" :src="cover" alt="封面图片" />
      </template>

      <template slot="tags" slot-scope="tags">
        <span v-if="!tags.length">-- --</span>
        <span v-else>
          <a-tag :color="tag.color" v-for="tag in tags" :key="tag.id">{{
            tag.name
          }}</a-tag>
        </span>
      </template>
      <template slot="categories" slot-scope="categories">
        <span v-if="!categories.length">-- --</span>
        <span v-else>
          <a-tag v-for="category in categories" :key="category.id">{{
            category.name
          }}</a-tag>
        </span>
      </template>

      <template slot="createTime" slot-scope="createTime">
        <span>{{ createTime || "-- --" }}</span>
      </template>

      <template slot="publishTime" slot-scope="publishTime">
        <span>{{ publishTime || "-- --" }}</span>
      </template>

      <template slot="updateTime" slot-scope="updateTime">
        <span>{{ updateTime || "-- --" }}</span>
      </template>
      <template slot="action" slot-scope="action">
        <span v-if="type === 'list'">
          <a @click="previewArticle(action)">预览</a>
          <a-divider type="vertical" />
        </span>
        <span v-if="type === 'list'">
          <a @click="editArticle(action)">编辑</a>
          <a-divider type="vertical" />
        </span>

        <span v-if="type === 'list' && action.is_publish === 0">
          <a @click="publishArticle(action)">
            发布
          </a>
          <a-divider type="vertical" />
        </span>

        <span v-if="type === 'list' && action.is_publish === 1">
          <a @click="publishArticle(action)">下架</a>
          <a-divider type="vertical" />
        </span>

        <span v-if="type !== 'list'">
          <a @click="moveToList(action)">移动到列表</a>
          <a-divider type="vertical" />
        </span>
        <a v-if="type === 'recycle'" @click="moveToDrafts(action)">
          移动到草稿箱
        </a>

        <a-popconfirm
          v-if="type !== 'recycle'"
          title="确定删除该条数据吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteArticle(action)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class ArticleTable extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  list: Array<Article> | undefined;

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  pagination: Pagination | undefined;

  @Prop({
    type: Boolean,
    default: false
  })
  loading: boolean | undefined;

  // type 0 正常列表 1 草稿列表 2 已删除列表
  @Prop({
    type: String,
    default: "list",
    validator(value) {
      return ["list", "recycle", "drafts"].includes(value);
    }
  })
  type: string | undefined;

  private columns: Array<Dictionary<any>> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%"
    },
    {
      title: "标题",
      dataIndex: "title",
      width: "20%",
      ellipsis: true
    },
    {
      title: "封面图片",
      dataIndex: "cover",
      scopedSlots: { customRender: "cover" },
      width: "20%"
    },
    {
      title: "标签",
      dataIndex: "tags",
      scopedSlots: { customRender: "tags" },
      width: "20%"
    },
    {
      title: "分类",
      dataIndex: "categories",
      scopedSlots: { customRender: "categories" },
      width: "20%"
    },
    {
      title: "发布时间",
      dataIndex: "publish_time",
      scopedSlots: { customRender: "publishTime" },
      width: "20%"
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      scopedSlots: { customRender: "createTime" },
      width: "20%"
    },
    {
      title: "更新时间",
      dataIndex: "update_time",
      scopedSlots: { customRender: "updateTime" },
      width: "20%"
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 220,
      scopedSlots: { customRender: "action" }
    }
  ];

  @Emit("table-change")
  private handleTableChange(pagination: Pagination): Pagination {
    return pagination;
  }

  // 移动到草稿箱
  private async moveToDrafts(item: Article): Promise<void> {
    const { statusCode, message } = await this.$api.FetchMoveArticleToDrafts({
      id: item.id
    });
    if (statusCode === 0) {
      this.$message.success(message);
      this.handleTableChange({
        pageSize: 10,
        current: (this.pagination && this.pagination.current) || 1,
        total: 0
      });
    } else {
      this.$message.error(message);
    }
  }

  // 移动到列表
  private async moveToList(item: Article): Promise<void> {
    const { statusCode, message } = await this.$api.FetchMoveArticleToList({
      id: item.id
    });
    if (statusCode === 0) {
      this.handleTableChange({
        pageSize: 10,
        current: (this.pagination && this.pagination.current) || 1,
        total: 0
      });
      this.$message.success(message);
    } else {
      this.$message.error(message);
    }
  }

  // 发布，下架文章
  private async publishArticle(item: Article): Promise<void> {
    console.log(item);
    const { statusCode, message } = await this.$api.FetchPublishArticle({
      id: item.id,
      is_publish: item.is_publish ? 0 : 1
    });
    if (statusCode === 0) {
      this.handleTableChange({
        pageSize: 10,
        current: (this.pagination && this.pagination.current) || 1,
        total: 0
      });
      this.$message.success(message);
    } else {
      this.$message.error(message);
    }
  }

  // 删除文章
  private async deleteArticle(item: Article): Promise<void> {
    const { statusCode, message } = await this.$api.FetchDeleteArticle({
      id: item.id
    });
    if (statusCode === 0) {
      this.handleTableChange({
        pageSize: 10,
        current: (this.pagination && this.pagination.current) || 1,
        total: 0
      });
      this.$message.success(message);
    } else {
      this.$message.error(message);
    }
  }

  private editArticle() {
    console.log("editArticle");
  }

  private previewArticle() {
    console.log("previewArticle");
  }
}
</script>

<style scoped lang="less"></style>
