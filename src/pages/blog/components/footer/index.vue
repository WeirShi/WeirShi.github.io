<template>
  <div id="m-footer">
    <div class="footer-wrap">
      <!-- <p>
        本博客已萌萌哒运行<span>{{ runningTime }}</span
        ><span class="time-jump">(●'◡'●)ﾉ♥</span>
      </p>
      <p>@{{ blogInfo.blogName || "博客" }} ———— {{ blogInfo.sign }}</p>
      <p>
        本站点采用
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh"
          target="_blank"
          >知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议</a
        >
      </p> -->
      <p>
        本站由 @Weir.Shi 创建 - © 2020.苏ICP备19022770号-1
      </p>
      <p>
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
          ><img
            alt="知识共享许可协议"
            style="border-width:0"
            src="./80x15.png"/></a
        ><br />本作品采用<a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
          >知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a
        >进行许可。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="less">
@import "~@/style/color.less";
#m-footer {
  position: fixed;
  bottom: 0;
  height: 120px;
  width: 100%;
  background-color: @color-main;
  .footer-wrap {
    position: relative;
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;
    height: 120px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #c1c1c1;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    & > p {
      margin: 4px 0;
    }
    a {
      color: rgba(59, 116, 241, 0.8);
    }
  }
}
</style>
