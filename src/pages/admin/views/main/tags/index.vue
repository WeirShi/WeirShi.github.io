<template>
  <div id="tags">
    <a-button type="primary" @click="showTagModal">
      新增标签
    </a-button>

    <a-table
      style="margin-top: 8px"
      rowKey="id"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :data-source="tagList"
      @change="handleTableChange"
    >
      <template slot="articles" slot-scope="articles">
        <a>{{ articles.length }}</a>
      </template>

      <span slot="action" slot-scope="row">
        <a @click="showTagModal(row)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除该条数据吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteTag(row)"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <a-modal
      v-model="tagModal.visible"
      :title="tagModal.title"
      ok-text="保存"
      cancel-text="取消"
      @ok="saveTagModal"
    >
      <a-form-model
        ref="tagModalForm"
        :model="tagModal"
        :rules="tagModalFormRules"
      >
        <a-form-model-item ref="name" label="标签名称" prop="name">
          <a-input v-model="tagModal.name" />
        </a-form-model-item>
        <a-form-model-item ref="sort" label="标签排序" prop="sort">
          <a-input v-model="tagModal.sort" />
        </a-form-model-item>
        <a-form-model-item ref="color" label="标签颜色" prop="color">
          <a-input v-model="tagModal.color" />
          <el-color-picker
            v-model="tagModal.color"
            size="mini"
          ></el-color-picker>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FormModel } from "ant-design-vue";

@Component
export default class Tags extends Vue {
  private columns: Array<Dictionary<any>> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%"
    },
    {
      title: "标签名称",
      dataIndex: "name",
      width: "20%",
      ellipsis: true
    },
    {
      title: "标签色值",
      dataIndex: "color",
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
      dataIndex: "articles",
      scopedSlots: { customRender: "articles" },
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
      ellipsis: true
    },
    {
      title: "操作",
      key: "action",
      width: "20%",
      scopedSlots: { customRender: "action" }
    }
  ];
  private tagModalFormRules: object = {
    name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
    sort: [
      { required: true, message: "请输入标签称", trigger: "blur" },
      { pattern: /^[1-9]+\d*$/, message: "必须是大于0的整数" }
    ],
    color: [{ required: true, message: "请选择标签的颜色", trigger: "blur" }]
  };

  private loading = false;
  private pagination: Pagination = {
    pageSize: 10,
    current: 1,
    total: 0
  };
  private tagList: Tag[] = [];

  private tagModal = {
    visible: false,
    title: "新增标签",
    id: 0,
    name: "",
    color: "",
    sort: 1
  };

  private showTagModal(row: Tag): void {
    this.tagModal.visible = true;
    this.tagModal.title = !row ? "新增标签" : "编辑标签";
    this.tagModal.name = !row.name ? "" : row.name;
    this.tagModal.sort = !row.sort ? 1 : row.sort;
    this.tagModal.id = !row.id ? 0 : row.id;
    this.tagModal.color = !row.color ? "" : row.color;
  }
  private saveTagModal(): void {
    (this.$refs.tagModalForm as FormModel).validate(async valid => {
      if (valid) {
        type Params = {
          name: string;
          sort: number;
          id?: number;
          color: string;
        };
        const params: Params = {
          name: this.tagModal.name,
          sort: Number(this.tagModal.sort),
          color: this.tagModal.color
        };
        if (this.tagModal.id !== 0) {
          params.id = this.tagModal.id;
        }
        const { statusCode, message } =
          this.tagModal.id === 0
            ? await this.$api.FetchAddTag(params)
            : await this.$api.FetchUpdateTag(params);

        if (statusCode === 0) {
          this.tagModal.visible = false;
          this.$message.success(message);
          this.fetchData();
        } else {
          this.$message.error(message);
        }
      } else {
        return false;
      }
    });
  }

  private async deleteTag(row: Tag): Promise<void> {
    const { statusCode, message } = await this.$api.FetchDeleteTag({
      id: row.id
    });
    if (statusCode === 0) {
      this.$message.success(message);
      this.fetchData();
    } else {
      this.$message.error(message);
    }
  }

  private async handleTableChange(pagination: Pagination): Promise<void> {
    const { current } = pagination;
    this.pagination.current = current;
    this.fetchData();
  }

  private async fetchData(): Promise<void> {
    this.loading = true;
    const { statusCode, data, message } = await this.$api.FetchGetTagList({
      pageSize: this.pagination.pageSize,
      current: this.pagination.current
    });
    this.loading = false;
    if (statusCode === 0) {
      const { list, total } = data;
      this.pagination.total = total;
      this.tagList = list;
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
