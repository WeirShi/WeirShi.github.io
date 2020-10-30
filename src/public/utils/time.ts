/**
 * time format
 * @date 2020-06-24
 * @param {DateTime} date DateTime
 * @param {String} format eg: 'yyyy-MM-ddhh:mm:ss'
 * @returns {String}
 */
export const dateFmt = (date: Date, format = "yyyy-MM-dd hh:mm:ss"): string => {
  const o: Dictionary<number> = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  Object.keys(o).forEach(k => {
    if (new RegExp("(" + k + ")").test(format)) {
      const v = o[k].toString();
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length)
      );
    }
  });
  return format;
};
