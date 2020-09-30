<template>
  <div id="home" class="g-layout">
    <NoData text="作者太懒了，还没有写一篇文章~" />
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
export default class Home extends Vue {
  private loading = false;
  private articleList = [];
}
</script>

<style scoped lang="less">
#home {
  // height: 1000px;
}
</style>
