<template>
  <div id="categories">
    <a-button type="primary" @click="showCategoryModal">
      新增分类
    </a-button>

    <a-table
      style="margin-top: 8px"
      rowKey="id"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :data-source="categoryList"
      @change="handleTableChange"
    >
      <template slot="articleCount" slot-scope="articleCount">
        <a>{{ articleCount }}</a>
      </template>

      <template slot="updateTime" slot-scope="updateTime">
        <span>{{ updateTime || "-- --" }}</span>
      </template>

      <span slot="action" slot-scope="row">
        <a @click="showCategoryModal(row)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除该条数据吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteCategory(row)"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <a-modal
      v-model="categoryModal.visible"
      :title="categoryModal.title"
      ok-text="保存"
      cancel-text="取消"
      @ok="saveCategoryModal"
    >
      <a-form-model
        ref="categoryModalForm"
        :model="categoryModal"
        :rules="categoryModalFormRules"
      >
        <a-form-model-item ref="name" label="分类名称" prop="name">
          <a-input v-model="categoryModal.name" />
        </a-form-model-item>
        <a-form-model-item ref="sort" label="分类排序" prop="sort">
          <a-input v-model="categoryModal.sort" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { FormModel } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Categories extends Vue {
  private columns: Array<Dictionary<any>> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%"
    },
    {
      title: "分类名称",
      dataIndex: "name",
      width: "20%",
      ellipsis: true
    },
    {
      title: "排序",
      dataIndex: "sort",
      width: "20%"
    },
    {
      title: "文章数量",
      dataIndex: "article_count",
      scopedSlots: { customRender: "articleCount" },
      width: "20%"
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      width: "20%",
      ellipsis: true
    },
    {
      title: "更新时间",
      dataIndex: "update_time",
      width: "20%",
      scopedSlots: { customRender: "updateTime" },
      ellipsis: true
    },
    {
      title: "操作",
      key: "action",
      width: "20%",
      scopedSlots: { customRender: "action" }
    }
  ];
  private categoryModalFormRules: object = {
    name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    sort: [
      { required: true, message: "请输入分类名称", trigger: "blur" },
      { pattern: /^[1-9]+\d*$/, message: "必须是大于0的整数" }
    ]
  };

  private loading = false;
  private pagination: Pagination = {
    pageSize: 10,
    current: 1,
    total: 0
  };
  private categoryList: Category[] = [];

  private categoryModal = {
    visible: false,
    title: "新增分类",
    id: 0,
    name: "",
    sort: 1
  };

  private showCategoryModal(row: Category): void {
    this.categoryModal.visible = true;
    this.categoryModal.title = !row ? "新增分类" : "编辑分类";
    this.categoryModal.name = !row.name ? "" : row.name;
    this.categoryModal.sort = !row.sort ? 1 : row.sort;
    this.categoryModal.id = !row.id ? 0 : row.id;
  }
  private saveCategoryModal(): void {
    (this.$refs.categoryModalForm as FormModel).validate(async valid => {
      if (valid) {
        type Params = {
          name: string;
          sort: number;
          id?: number;
        };
        const params: Params = {
          name: this.categoryModal.name,
          sort: Number(this.categoryModal.sort)
        };
        if (this.categoryModal.id !== 0) {
          params.id = this.categoryModal.id;
        }
        const { statusCode, message } =
          this.categoryModal.id === 0
            ? await this.$api.FetchAddCategory(params)
            : await this.$api.FetchUpdateCategory(params);

        if (statusCode === 0) {
          this.$message.success(message);
          this.categoryModal.visible = false;
          this.fetchData();
        } else {
          this.$message.error(message);
        }
      } else {
        return false;
      }
    });
  }

  private async deleteCategory(row: Category): Promise<void> {
    const { statusCode, message } = await this.$api.FetchDeleteCategory({
      id: row.id
    });
    if (statusCode === 0) {
      this.$message.success(message);
      this.fetchData();
    } else {
      this.$message.error(message);
    }
  }

  private handleTableChange(pagination: Pagination): void {
    const { current } = pagination;
    this.pagination.current = current;
    this.fetchData();
  }

  private async fetchData(): Promise<void> {
    this.loading = true;
    const { statusCode, data, message } = await this.$api.FetchGetCategoryList({
      pageSize: this.pagination.pageSize,
      current: this.pagination.current
    });
    this.loading = false;
    if (statusCode === 0) {
      const { list, total } = data;
      this.pagination.total = total;
      this.categoryList = list;
    } else {
      this.$message.error(message);
    }
  }

  created() {
    this.fetchData();
  }
}
</script>

<style scoped lang="less"></style>
