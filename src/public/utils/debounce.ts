/* eslint-disable */
/**
 * 防抖 防止事件频繁触发，针对最后一次触发才执行函数 定时器
 * @param {function} fn
 * @param {Number} interval
 * @return {function}
 */
const debounce = function(fn: Function, interval?: number) {
  let timer: number | null; // 定时器实例
  const gapTime = interval || 300; // 间隔时间
  return function() {
    timer && clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(function() {
      fn.call(context, args);
    }, gapTime);
  };
};

export default debounce;
