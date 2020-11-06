import { VueConstructor } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

export default {
  install: function(Vue: VueConstructor) {
    Vue.directive("highlight", {
      bind: (el: HTMLElement) => {
        const blocks = el.querySelectorAll("pre code");
        blocks.forEach(block => {
          const b = block as HTMLElement;
          hljs.highlightBlock(b);
        });
      }
    });
  }
};
