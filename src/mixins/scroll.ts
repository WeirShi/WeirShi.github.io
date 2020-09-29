import { Vue, Component } from "vue-property-decorator";

@Component
export class Scroll extends Vue {
  private timer: null | number = null;

  public scrollToTop(target: number, animation = true): void {
    if (!animation) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      return;
    }
    let currentNum =
      document.body.scrollTop || document.documentElement.scrollTop;
    let t = 0;
    this.timer && clearInterval(this.timer);
    let dir = 1;
    if (target > currentNum) {
      dir = -1;
    }
    this.timer = setInterval(() => {
      // 匀加速运动
      t++;
      currentNum -= 2 * t * dir;
      document.body.scrollTop = document.documentElement.scrollTop = currentNum;
      if (
        (dir === 1 && currentNum <= target) ||
        (dir === -1 && currentNum >= target)
      ) {
        document.body.scrollTop = document.documentElement.scrollTop = target;
        this.timer && clearInterval(this.timer);
      }
    }, 16.7);
  }
}
