<template>
  <a-icon :component="components[type]" />
</template>

<script lang="ts">
import { VueConstructor } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import ArticleSVG from "./templates/article.vue";
import CategorySVG from "./templates/category.vue";
import UserInfoSVG from "./templates/userInfo.vue";
@Component
export default class CustomIcon extends Vue {
  private components: Dictionary<VueConstructor> = {
    article: ArticleSVG,
    category: CategorySVG,
    userInfo: UserInfoSVG
  };
  @Prop({
    type: String,
    default: ""
  })
  type: string | undefined;
}
</script>

<style scoped lang="less"></style>
