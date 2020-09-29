<template>
  <div id="categories" class="g-layout">
    <NoData text="暂无分类" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoData from "../../components/noData/noData.vue";

@Component({
  components: {
    NoData
  }
})
export default class Categories extends Vue {}
</script>

<style scoped lang="less"></style>
