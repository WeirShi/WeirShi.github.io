<template>
  <div id="archives" class="g-layout">
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
export default class Archives extends Vue {
  private fetchData() {
    // try {
    //   setTimeout(() => {
    //     console.log(b);
    //   }, 1000)
    // } catch (error) {
    //   console.log('error', error);
    // }
  }

  created() {
    this.fetchData();
  }
}
</script>

<style scoped lang="less"></style>
