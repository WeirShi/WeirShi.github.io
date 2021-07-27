(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{384:function(t,e,s){"use strict";s.r(e);var a=s(45),o=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"github配置webhooks-项目自动部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github配置webhooks-项目自动部署"}},[t._v("#")]),t._v(" Github配置WebHooks,项目自动部署")]),t._v(" "),s("h2",{attrs:{id:"webhooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webhooks"}},[t._v("#")]),t._v(" WebHooks")]),t._v(" "),s("p",[t._v("Github的WebHooks可以监测到github上的各种事件，我们可以通过定制它来监测一个push事件，每当我们提交代码时WebHooks会被触发，通过配置一个POST请求到你的接口地址，再根据你的自动化脚本进行"),s("code",[t._v("git pull")]),t._v("拉取github最新代码并执行"),s("code",[t._v("npm run build")]),t._v("进行打包编译")]),t._v(" "),s("h2",{attrs:{id:"配置webhooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置webhooks"}},[t._v("#")]),t._v(" 配置WebHooks")]),t._v(" "),s("p",[s("code",[t._v("Github")]),t._v("项目"),s("code",[t._v("setting")]),t._v("中找到"),s("code",[t._v("Webhooks")]),t._v("选项，新增一个"),s("code",[t._v("Webhooks")]),t._v("配置")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Payload "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("URL")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 填写你的服务器接口地址")]),t._v("\n\nContent type "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 接口ContentType格式 可选json和form， 我选用的是`application/json`")]),t._v("\n\nSecret "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 秘钥，自己生成一个，后面要在部署脚本中用到，我随机生成的字符串")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 剩下的都是默认配置")]),t._v("\n")])])]),s("p",[t._v("然后保存，添加就可以了")]),t._v(" "),s("h2",{attrs:{id:"部署脚本编写"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#部署脚本编写"}},[t._v("#")]),t._v(" 部署脚本编写")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/WeirShi/vuepress-blog/blob/main/deploy.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("deploy.js"),s("OutboundLink")],1),t._v(": API 接口代码"),s("br"),t._v(" "),s("a",{attrs:{href:"https://github.com/WeirShi/vuepress-blog/blob/main/deploy.sh",target:"_blank",rel:"noopener noreferrer"}},[t._v("deploy.sh"),s("OutboundLink")],1),t._v(": 部署脚本"),s("br"),t._v(" "),s("a",{attrs:{href:"https://github.com/WeirShi/vuepress-blog/blob/main/pm2.json",target:"_blank",rel:"noopener noreferrer"}},[t._v("pm2.json"),s("OutboundLink")],1),t._v(": node服务端进程管理")]),t._v(" "),s("h2",{attrs:{id:"配置nginx接口地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置nginx接口地址"}},[t._v("#")]),t._v(" 配置nginx接口地址")]),t._v(" "),s("p",[t._v("配置API接口访问的地址")]),t._v(" "),s("h2",{attrs:{id:"最后"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[t._v("#")]),t._v(" 最后")]),t._v(" "),s("p",[t._v("进程启动后，就是尝试一下push代码进行测试了")])])}),[],!1,null,null,null);e.default=o.exports}}]);