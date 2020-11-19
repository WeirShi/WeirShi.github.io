const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("blog", resolve("src/pages/blog"))
      .set("admin", resolve("src/pages/admin"))
      .set("public", resolve("src/public"));
  },
  pages: {
    blog: {
      entry: "src/pages/blog/main.ts",
      template: "public/blog.html",
      filename: "blog.html",
      title: "Weir.Shi's Blog",
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "blog"]
    },
    admin: {
      entry: "src/pages/admin/main.ts",
      template: "public/admin.html",
      filename: "admin.html",
      title: "Admin",
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "admin"]
    }
  }
};
