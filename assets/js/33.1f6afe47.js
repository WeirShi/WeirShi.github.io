(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{389:function(t,s,o){"use strict";o.r(s);var e=o(45),a=Object(e.a)({},(function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h2",{attrs:{id:"什么是react-hooks"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#什么是react-hooks"}},[t._v("#")]),t._v(" 什么是React Hooks？")]),t._v(" "),o("p",[t._v("Hooks 是 React 16.8版本中新增的特性。")]),t._v(" "),o("p",[t._v("组件是React的核心，在16.8版本前，类组件是React主要的编写方式，当然函数组件也是支持的，但是当时的函数组件限制比较大，必须是纯函数，不能包含状态，不支持生命周期方法，因此无法取代类组件。")]),t._v(" "),o("p",[t._v("类组件的几个缺点：")]),t._v(" "),o("ol",[o("li",[t._v("大型组件很难拆分和重构，也很难测试")]),t._v(" "),o("li",[t._v("业务逻辑分散在组件的各个方法中，导致重复逻辑或关联逻辑")]),t._v(" "),o("li",[t._v("组件类引入了复杂的编程模式，比如render，props，HOC")])]),t._v(" "),o("p",[o("strong",[t._v('React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。')]),o("br"),t._v(" "),o("strong",[t._v("Hooks本质上就是一类特殊的函数，它们可以为你的函数型组件（function component）注入一些特殊的功能，让您在不编写类的情况下使用 state(状态) 和其他 React 特性。")])]),t._v(" "),o("h2",{attrs:{id:"react-hooks解决了什么问题"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#react-hooks解决了什么问题"}},[t._v("#")]),t._v(" React Hooks解决了什么问题？")]),t._v(" "),o("ul",[o("li",[o("strong",[t._v("状态逻辑难以复用")]),t._v("： 业务变得复杂之后，组件之间共享状态变得频繁，组件复用和状态逻辑管理就变得十分复杂。使用redux也会加大项目的复杂度和体积。")]),t._v(" "),o("li",[o("strong",[t._v("组件复杂难以维护")]),t._v("： 复杂的组件中有各种难以管理的状态和副作用，在同一个生命周期中你可能会因为不同情况写出各种不相关的逻辑，但实际上我们通常希望一个函数只做一件事情。")]),t._v(" "),o("li",[o("strong",[t._v("类的this指向性问题")]),t._v("： 我们用class来创建react组件时，为了保证this的指向正确，我们要经常写这样的代码：const that = this，或者是this.handleClick = this.handleClick.bind(this)>；一旦this使用错误，各种bug就随之而来。")])])])}),[],!1,null,null,null);s.default=a.exports}}]);