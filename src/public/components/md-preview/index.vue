<template>
  <div id="md-preview">
    <link
      href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css"
      rel="stylesheet"
    />
    <!-- <v-md-preivew :text="content"></v-md-preivew> -->
    <section
      id="markdown-preview-body"
      class="preview markdown-body"
      v-html="content"
      v-highlight
    ></section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MdPreview extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  content: string | undefined;
}
</script>

<style scoped lang="less"></style>
