<template>
  <div id="about" class="g-layout">
    <NoData text="抱歉，还没写简历呢~" />
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
export default class About extends Vue {}
</script>

<style scoped lang="less"></style>
