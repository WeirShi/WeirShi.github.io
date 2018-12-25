//Anonymous sely-executing function
(function (root, factory) {
  factory(root.jQuery);
}(this, function ($) {

  var CanvasRenderer = function (element, options) {
    var cachedBackground;
    var canvas = document.createElement('canvas');

    element.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    canvas.width = canvas.height = options.size;

    // move 0,0 coordinates to the center
    ctx.translate(options.size / 2, options.size / 2);

    // rotate canvas -90deg
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;

    Date.now = Date.now || function () {

          //convert to milliseconds
          return +(new Date());
        };

    var drawCircle = function (color, lineWidth, percent) {
      percent = Math.min(Math.max(-1, percent || 0), 1);
      var isNegative = percent 