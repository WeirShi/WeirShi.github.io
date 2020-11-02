import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $api: any;
    $bapi: any;
    $cache: any;
  }
}
