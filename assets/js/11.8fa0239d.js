(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{366:function(t,s,a){"use strict";a.r(s);var n=a(45),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"闭包问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#闭包问题"}},[t._v("#")]),t._v(" 闭包问题")]),t._v(" "),a("p",[t._v("闭包是一个老生常谈的问题了，面试的时候经常会被问到，所以到底什么是闭包？闭包有什么作用？")]),t._v(" "),a("h2",{attrs:{id:"什么是闭包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是闭包"}},[t._v("#")]),t._v(" 什么是闭包")]),t._v(" "),a("p",[t._v("《JavaScript高级程序设计》第三版中讲到：闭包是指有权访问另一个函数作用域中的变量的函数")]),t._v(" "),a("p",[t._v("简单理解闭包的含义：函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，从而形成闭包")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" num "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this -> window")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'num'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" num"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"/assets/images/closure.jpg",alt:"闭包"}})]),t._v(" "),a("p",[t._v("这个例子中，通过浏览器调试后可以看到，正常情况下函数调用后，作用域环境指到了window对象下，是无法访问函数内部变量的，但是现在依然能够访问到num变量。因为在fn函数中返回了另一个函数，通过调用这个函数获取到了fn内部的num变量，此时浏览器会给num变量打上一个Closure标签(闭包变量)")]),t._v(" "),a("h2",{attrs:{id:"闭包的优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#闭包的优缺点"}},[t._v("#")]),t._v(" 闭包的优缺点")]),t._v(" "),a("p",[t._v("缺点：由于闭包中的变量是不会被回收的，大量使用闭包后有可能会导致内存泄露"),a("br"),t._v("\n优点：我们可以利用闭包来实现模块化，在很多框架代码中都会使用到闭包的概念")]),t._v(" "),a("h2",{attrs:{id:"扩展"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扩展"}},[t._v("#")]),t._v(" 扩展")]),t._v(" "),a("ol",[a("li",[t._v("MDN对闭包的定义为："),a("strong",[t._v("闭包是指那些能够访问自由变量的函数。")])]),t._v(" "),a("li",[t._v("什么是自由变量？"),a("strong",[t._v("自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。")])]),t._v(" "),a("li",[t._v("《JavaScript权威指南》中讲到："),a("strong",[t._v("从技术的角度讲，所有的JavaScript函数都是闭包。")])]),t._v(" "),a("li",[t._v("ECMAScript中，闭包指的是：")])]),t._v(" "),a("ul",[a("li",[t._v("从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。")]),t._v(" "),a("li",[t._v("从实践角度：以下函数才算是闭包：\n"),a("ul",[a("li",[t._v("即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）")]),t._v(" "),a("li",[t._v("在代码中引用了自由变量")])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);