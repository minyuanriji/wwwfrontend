(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-list"],{"05fb":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"tuiTopDropdown",props:{mask:{type:Boolean,default:!0},show:{type:Boolean,default:!1},bgcolor:{type:String,default:"#f2f2f2"},paddingbtm:{type:Number,default:0},height:{type:Number,default:580},translatey:{type:Number,default:0}},methods:{handleClose:function(){this.show&&this.$emit("close",{})},px:function(t){return uni.upx2px(t)+"px"}}};e.default=a},"0c68":function(t,e,i){"use strict";i.r(e);var a=i("3c7f"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"0e79":function(t,e,i){"use strict";i.r(e);var a=i("e764"),n=i("dbb6");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("8f8b");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"065ff33b",null,!1,a["a"],r);e["default"]=d.exports},1031:function(t,e,i){"use strict";var a=i("11e0"),n=i.n(a);n.a},"11e0":function(t,e,i){var a=i("cd57");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("a086e17a",a,!0,{sourceMap:!1,shadowMode:!1})},"1f2c":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.jx-loadmore-none[data-v-332b08f2]{width:50%;margin:1.5em auto;line-height:1.5em;font-size:%?24?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.jx-nomore[data-v-332b08f2]{width:100%;height:100%;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?10?%;padding-bottom:%?6?%}.jx-nomore[data-v-332b08f2]::before{content:" ";position:absolute;border-bottom:%?1?% solid #e5e5e5;-webkit-transform:scaleY(.5);transform:scaleY(.5);width:100%;top:%?18?%;left:0}.jx-nomore-text[data-v-332b08f2]{color:#999;font-size:%?24?%;text-align:center;padding:0 %?18?%;height:%?36?%;line-height:%?36?%;position:relative;z-index:1}.jx-nomore-dot[data-v-332b08f2]{position:relative;text-align:center;-webkit-display:flex;display:-webkit-box;display:flex;-webkit-justify-content:center;-webkit-box-pack:center;justify-content:center;margin-top:%?10?%;padding-bottom:%?6?%}.jx-nomore-dot[data-v-332b08f2]::before{content:"";position:absolute;border-bottom:%?1?% solid #e5e5e5;-webkit-transform:scaleY(.5);transform:scaleY(.5);width:%?360?%;top:%?18?%}.jx-dot-text[data-v-332b08f2]{position:relative;color:#e5e5e5;font-size:10px;text-align:center;width:%?50?%;height:%?36?%;line-height:%?36?%;-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center;z-index:1}',""]),t.exports=e},2524:function(t,e,i){"use strict";i.r(e);var a=i("a7e6"),n=i("d248");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("1031");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"06075cc7",null,!1,a["a"],r);e["default"]=d.exports},2631:function(t,e,i){"use strict";var a=i("7909"),n=i.n(a);n.a},"3c7f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"jxNomore",props:{visible:{type:Boolean,default:!1},bgcolor:{type:String,default:"#fafafa"},isDot:{type:Boolean,default:!1},text:{type:String,default:"没有更多了"}},data:function(){return{dotText:"●"}}};e.default=a},5968:function(t,e,i){"use strict";i.r(e);var a=i("6219"),n=i("0c68");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("aac4");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"332b08f2",null,!1,a["a"],r);e["default"]=d.exports},"5bd8":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"tuiDrawer",props:{visible:{type:Boolean,default:!1},mask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},mode:{type:String,default:"left"}},methods:{handleMaskClick:function(){this.maskClosable&&this.$emit("close",{})}}};e.default=a},6219:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.visible?i("v-uni-view",{staticClass:"jx-nomore-class jx-loadmore-none"},[i("v-uni-view",{class:[t.isDot?"jx-nomore-dot":"jx-nomore"]},[i("v-uni-view",{class:[t.isDot?"jx-dot-text":"jx-nomore-text"],style:{background:t.bgcolor}},[t._v(t._s(t.isDot?t.dotText:t.text))])],1)],1):t._e()},o=[]},"6f81":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".tui-dropdown-box[data-v-c649e368]{width:100%;position:fixed;box-sizing:border-box;border-bottom-right-radius:%?24?%;border-bottom-left-radius:%?24?%;-webkit-transform:translateZ(0);transform:translateZ(0);overflow:hidden;visibility:hidden;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;z-index:989;top:0}.tui-dropdown-show[data-v-c649e368]{visibility:visible}.tui-dropdown-mask[data-v-c649e368]{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:986;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;opacity:0;visibility:hidden}.tui-mask-show[data-v-c649e368]{opacity:1;visibility:visible}",""]),t.exports=e},7909:function(t,e,i){var a=i("a38b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5d1f1658",a,!0,{sourceMap:!1,shadowMode:!1})},8069:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"tui-top-dropdown tui-dropdown-box",class:[t.show?"tui-dropdown-show":""],style:{height:t.height?t.px(t.height):"auto",background:t.bgcolor,paddingBottom:t.px(t.paddingbtm),transform:"translateZ(0) translateY("+(t.show?t.px(t.translatey):"-100%")+")"}},[t._t("default")],2),i("v-uni-view",{staticClass:"tui-dropdown-mask",class:[t.mask&&t.show?"tui-mask-show":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleClose.apply(void 0,arguments)}}})],1)},o=[]},"81b5":function(t,e,i){var a=i("e30e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("80722f6c",a,!0,{sourceMap:!1,shadowMode:!1})},8202:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".tui-drawer[data-v-62901254]{visibility:hidden}.tui-drawer-show[data-v-62901254]{visibility:visible}.tui-drawer-show .tui-drawer-mask[data-v-62901254]{display:block;opacity:1}.tui-drawer-show .tui-drawer-container[data-v-62901254]{opacity:1}.tui-drawer-show.tui-drawer-left .tui-drawer-container[data-v-62901254],\n.tui-drawer-show.tui-drawer-right .tui-drawer-container[data-v-62901254]{-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.tui-drawer-mask[data-v-62901254]{opacity:0;position:fixed;top:0;left:0;right:0;bottom:0;z-index:8888;background:rgba(0,0,0,.6);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.tui-drawer-container[data-v-62901254]{position:fixed;left:50%;height:100.2%;top:0;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;z-index:99999;opacity:0;overflow-y:scroll;background:#fff;-webkit-overflow-scrolling:touch;-ms-touch-action:pan-y cross-slide-y;-ms-scroll-chaining:none;-ms-scroll-limit:0 50 0 50}.tui-drawer-left .tui-drawer-container[data-v-62901254]{left:0;top:50%;-webkit-transform:translate3d(-100%,-50%,0);transform:translate3d(-100%,-50%,0)}.tui-drawer-right .tui-drawer-container[data-v-62901254]{right:0;top:50%;left:auto;-webkit-transform:translate3d(100%,-50%,0);transform:translate3d(100%,-50%,0)}",""]),t.exports=e},"8adb":function(t,e,i){"use strict";i.r(e);var a=i("8069"),n=i("9ef3");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("e5b2");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"c649e368",null,!1,a["a"],r);e["default"]=d.exports},"8f8b":function(t,e,i){"use strict";var a=i("81b5"),n=i.n(a);n.a},"9a59":function(t,e,i){"use strict";i("4160"),i("c975"),i("a9e3"),i("d3b7"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"jxTabbar",props:{current:{type:Number,default:4},color:{type:String,default:"#000000"},selectedColor:{type:String,default:"#5677FC"},hump:{type:Boolean,default:!1},isFixed:{type:Boolean,default:!0},tabBar:{type:Array,default:function(){return[]}},badgeColor:{type:String,default:"#fff"},badgeBgColor:{type:String,default:"#F74D54"},unlined:{type:Boolean,default:!1}},data:function(){return{tabBarItems:null,is_show_tabbar:!1,backgroundColor:"",is_shadow:!1}},mounted:function(){var t=this,e=getCurrentPages();if(e.length>0)var i=e[e.length-1].route;var a,n=uni.getStorageSync("mall_config")?JSON.parse(uni.getStorageSync("mall_config")).navbar:null;n?"plugins/short-video/index"==i?(this.backgroundColor="transparent",this.is_shadow=!1):(this.backgroundColor=n.bottom_background_color,this.is_shadow=n.shadow):this.initMall().then((function(e){t.backgroundColor=e.bottom_background_color,t.is_shadow=e.shadow,a=e,a.navs.forEach((function(e,a){e.index=a,-1!=e.url.indexOf(i)&&(e.active=!0,t.is_show_tabbar=!0)})),t.tabBarItems=a.navs}));var o=this.tabBar.length>0?this.tabBar:n.navs;o.forEach((function(e,a){e.index=a,-1!=e.url.indexOf(i)&&(e.active=!0,t.is_show_tabbar=!0)})),this.tabBarItems=o;this.$http.getUrlParam("mall_id")},methods:{tabbarSwitch:function(t,e,i,a){"/plugins/short-video/index"==i&&(i+="?from=short-video"),uni.redirectTo({url:i})},initMall:function(){var t=this,e=uni.getStorageSync("mall_config")?JSON.parse(uni.getStorageSync("mall_config")).navbar:null;return new Promise((function(i,a){e?i(e):t.$http.request({url:t.$api.index.config}).then((function(t){if(0===t.code){var e=t.data,a=(e.cat_style,e.copyright,e.mall_setting,e.navbar);e.page_title;uni.setStorageSync("mall_config",JSON.stringify(t.data)),i(a)}}))}))}}};e.default=a},"9ef3":function(t,e,i){"use strict";i.r(e);var a=i("05fb"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},a38b:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".jx-loadmore[data-v-d1900d36]{width:48%;margin:1.5em auto;line-height:1.5em;font-size:%?24?%;text-align:center}.jx-loading-1[data-v-d1900d36]{margin:0 5px;width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:a-data-v-d1900d36 1s steps(12) infinite;animation:a-data-v-d1900d36 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}@-webkit-keyframes a-data-v-d1900d36{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes a-data-v-d1900d36{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.jx-loadmore-tips[data-v-d1900d36]{display:inline-block;vertical-align:middle}.jx-loading-2[data-v-d1900d36]{width:%?28?%;height:%?28?%;border:1px solid #8f8d8e;border-radius:50%;margin:0 6px;display:inline-block;vertical-align:middle;-webkit-clip-path:polygon(0 0,100% 0,100% 30%,0 30%);clip-path:polygon(0 0,100% 0,100% 30%,0 30%);-webkit-animation:rotate-data-v-d1900d36 1s linear infinite;animation:rotate-data-v-d1900d36 1s linear infinite}@-webkit-keyframes rotate-data-v-d1900d36{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate-data-v-d1900d36{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.jx-loading-3[data-v-d1900d36]{display:inline-block;margin:0 6px;vertical-align:middle;width:%?28?%;height:%?28?%;background:0 0;border-radius:50%;border:2px solid;border-color:#e5e5e5 #e5e5e5 #e5e5e5 #8f8d8e;-webkit-animation:jx-rotate-data-v-d1900d36 .7s linear infinite;animation:jx-rotate-data-v-d1900d36 .7s linear infinite}.jx-loading-3.jx-loading-primary[data-v-d1900d36]{border-color:#e5e5e5 #e5e5e5 #e5e5e5 #5677fc}.jx-loading-3.jx-loading-green[data-v-d1900d36]{border-color:#e5e5e5 #e5e5e5 #e5e5e5 #19be6b}.jx-loading-3.jx-loading-orange[data-v-d1900d36]{border-color:#e5e5e5 #e5e5e5 #e5e5e5 #ff7900}.jx-loading-3.jx-loading-red[data-v-d1900d36]{border-color:#ededed #ededed #ededed #ed3f14}@-webkit-keyframes jx-rotate-data-v-d1900d36{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes jx-rotate-data-v-d1900d36{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}",""]),t.exports=e},a7e5:function(t,e,i){var a=i("1f2c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2d92f486",a,!0,{sourceMap:!1,shadowMode:!1})},a7e6:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.is_show_tabbar?i("v-uni-view",{staticClass:"jx-tabbar",class:[t.isFixed?"jx-tabbar-fixed":"",t.unlined?"jx-unlined":"",t.is_shadow?"jx-shadow":""],style:{background:t.backgroundColor}},[t._l(t.tabBarItems,(function(e,a){return[i("v-uni-view",{key:a+"_0",staticClass:"jx-tabbar-item",class:[e.hump?"jx-item-hump":""],style:{backgroundColor:e.hump?t.tabBarItems.top_background_color:"none"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabbarSwitch(a,e.hump,e.url,e.verify)}}},[i("v-uni-view",{staticClass:"jx-icon-box",class:[e.hump?"jx-tabbar-hump":""]},[i("v-uni-image",{staticClass:"img",class:[e.hump?"":"jx-tabbar-icon"],attrs:{src:e.active?e.active_icon:e.icon}}),e.num?i("v-uni-view",{class:[e.isDot?"jx-badge-dot":"jx-badge"],style:{color:t.badgeColor,backgroundColor:t.badgeBgColor}},[t._v(t._s(e.isDot?"":e.num))]):t._e()],1),i("v-uni-view",{staticClass:"jx-text-scale",class:[e.hump?"jx-text-hump":""],style:{color:e.active?e.active_color:e.color}},[t._v(t._s(e.text))])],1)]})),t.hump&&!t.unlined?i("v-uni-view",{class:[t.hump?"jx-hump-box":""]}):t._e()],2):t._e()],1)},o=[]},aac4:function(t,e,i){"use strict";var a=i("a7e5"),n=i.n(a);n.a},c5f9:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("ade3")),o=a(i("b9ab")),r=a(i("d9c5")),s=a(i("8adb")),d={components:{tuiIcon:o.default,tuiDrawer:r.default,tuiTopDropdown:s.default},data:function(){var t;return t={statusBarHeight:0,searchKey:"",width:200,height:64,inputTop:0,arrowTop:0,dropScreenH:0,isList:!1,drawer:!1,cat_id:0,productList:[],page:1,loadding:!1,pullUpOn:!1,page_count:0,carryOut:!0},(0,n.default)(t,"searchKey",""),(0,n.default)(t,"textColor","#bc0100"),t},onLoad:function(t){var e=this;this.textColor=this.globalSet("textCol"),this.cat_id=t.cat_id,t.cat_id?this.cat_id=t.cat_id:this.cat_id="",this.searchKey=t.searchKey,this.getData();var i={};uni.getSystemInfo({success:function(a){e.statusBarHeight=a.statusBarHeight,e.width=i.left||a.windowWidth,e.height=i.top?i.top+i.height+8:a.statusBarHeight+44,e.inputTop=i.top?i.top+(i.height-30)/2:a.statusBarHeight+7,e.arrowTop=i.top?i.top+(i.height-32)/2:a.statusBarHeight+6,e.searchKey=t.searchKey||"",e.dropScreenH=e.height-10}})},methods:{getData:function(){var t=this;this.loadding=!0,this.$http.request({url:this.$api.goods.rightList,data:{cat_id:this.cat_id,keyword:this.searchKey,page:this.page,limit:6}}).then((function(e){0==e.code&&(t.productList=t.productList.concat(e.data.list),t.page_count=e.data.page_count,t.loadding=!1,t.page>=e.data.page_count&&(t.pullUpOn=!0))}))},screen:function(t){var e=t.currentTarget.dataset.index;0==e?this.showDropdownList():1==e?this.tabIndex=1:2==e?this.isList=!this.isList:3==e&&(this.drawer=!0)},closeDrawer:function(){this.drawer=!1},back:function(){if(this.drawer)this.closeDrawer();else{var t=getCurrentPages();1==t.length?uni.redirectTo({url:"/pages/index/index"}):uni.navigateBack()}},search:function(t){uni.redirectTo({url:"/pages/search/search?key="+t})},detail:function(t){uni.navigateTo({url:"/pages/goods/detail?proId="+t})}},onReachBottom:function(){this.page++,this.page<=this.page_count&&this.getData()}};e.default=d},cd57:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.jx-tabbar[data-v-06075cc7]{width:100%;height:%?100?%;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;\nposition:relative}.jx-tabbar-fixed[data-v-06075cc7]{position:fixed;z-index:99999;left:0;bottom:0;\npadding-bottom:env(safe-area-inset-bottom);\nbox-sizing:initial;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.jx-tabbar[data-v-06075cc7]::before{\ncontent:"";width:100%;\n\t/* border-top: 1rpx solid #dadada; */position:absolute;top:0;left:0;-webkit-transform:scaleY(.5);transform:scaleY(.5);-webkit-transform-origin:0 100%;transform-origin:0 100%\n}.jx-tabbar-item[data-v-06075cc7]{height:100%;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;text-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;box-sizing:border-box;\nposition:relative;padding:%?10?% 0}.jx-icon-box[data-v-06075cc7]{position:relative}.jx-item-hump[data-v-06075cc7]{height:%?98?%;z-index:2}.jx-tabbar-icon[data-v-06075cc7]{width:%?48?%;height:%?48?%;\ndisplay:block\n}.jx-hump-box[data-v-06075cc7]{width:%?120?%;height:%?120?%;background-color:#fff;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);top:%?-50?%;border-radius:50%;z-index:1}.jx-hump-box[data-v-06075cc7]::before{\ncontent:"";height:200%;width:200%;border:%?1?% solid #b2b2b2;position:absolute;top:0;left:0;-webkit-transform:scale(.5) translateZ(0);transform:scale(.5) translateZ(0);-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:100%\n}.jx-unlined[data-v-06075cc7]::before{border:0!important}.jx-tabbar-hump[data-v-06075cc7]{width:%?100?%;height:%?100?%;position:absolute;left:50%;-webkit-transform:translateX(-50%) rotate(0deg);transform:translateX(-50%) rotate(0deg);top:%?-40?%;\n-webkit-transition:all .2s linear;transition:all .2s linear\n}.jx-tabbar-hump .img[data-v-06075cc7]{width:%?100?%;height:%?100?%;\ndisplay:block\n}.jx-hump-active[data-v-06075cc7]{\n-webkit-transform:translateX(-50%) rotate(135deg);transform:translateX(-50%) rotate(135deg)\n}.jx-text-hump[data-v-06075cc7]{position:absolute;bottom:%?10?%}.jx-text-scale[data-v-06075cc7]{font-weight:700;-webkit-transform:scale(.8);transform:scale(.8);font-size:%?25?%;line-height:%?28?%;-webkit-transform-origin:center 100%;transform-origin:center 100%}.jx-badge[data-v-06075cc7]{position:absolute;font-size:%?24?%;height:%?30?%;\nmin-width:%?30?%;\n\n\npadding:0 %?6?%;border-radius:%?40?%;right:0;top:%?-5?%;-webkit-transform:translateX(60%);transform:translateX(60%);\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center\n}.jx-badge-dot[data-v-06075cc7]{position:absolute;height:%?16?%;width:%?16?%;border-radius:50%;right:%?-4?%;top:%?-4?%}.jx-shadow[data-v-06075cc7]{box-shadow:0 0 5px 0 #eee}',""]),t.exports=e},d1ae:function(t,e,i){"use strict";i.r(e);var a=i("e1d9"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},d248:function(t,e,i){"use strict";i.r(e);var a=i("9a59"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},d74e:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.visible?i("v-uni-view",{staticClass:"jx-loadmore"},[i("v-uni-view",{class:["jx-loading-"+t.index,3==t.index&&t.type?"jx-loading-"+t.type:""]}),i("v-uni-view",{staticClass:"jx-loadmore-tips"},[t._v(t._s(t.text))])],1):t._e()},o=[]},d9c5:function(t,e,i){"use strict";i.r(e);var a=i("ef16"),n=i("eaec");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("fcb3");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"62901254",null,!1,a["a"],r);e["default"]=d.exports},dbb6:function(t,e,i){"use strict";i.r(e);var a=i("c5f9"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},dbcc:function(t,e,i){var a=i("6f81");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("7fc97c28",a,!0,{sourceMap:!1,shadowMode:!1})},e18e:function(t,e,i){"use strict";i.r(e);var a=i("d74e"),n=i("d1ae");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("2631");var r,s=i("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"d1900d36",null,!1,a["a"],r);e["default"]=d.exports},e1d9:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"jxLoadmore",props:{text:{type:String,default:"正在加载..."},visible:{type:Boolean,default:!1},index:{type:Number,default:1},type:{type:String,default:""}}};e.default=a},e30e:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-065ff33b]{background:#f7f7f7}.container[data-v-065ff33b]{padding-bottom:env(safe-area-inset-bottom)}\n\n/* 隐藏scroll-view滚动条*/[data-v-065ff33b]::-webkit-scrollbar{width:0;height:0;color:transparent}.tui-header-box[data-v-065ff33b]{width:100%;background:#fff;position:fixed;z-index:99998;left:0;top:0}.tui-header[data-v-065ff33b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;position:relative}.tui-back[data-v-065ff33b]{margin-left:%?8?%;height:32px!important;width:32px!important;position:relative;top:%?-9?%}.tui-searchbox[data-v-065ff33b]{width:80%;height:30px;margin-right:%?30?%;border-radius:15px;font-size:9pt;background:#f7f7f7;padding:3px 10px;box-sizing:border-box;color:#999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow:hidden}\n.tui-search-text[data-v-065ff33b]{padding-left:%?16?%}.tui-search-key[data-v-065ff33b]{max-width:80%;height:100%;padding:0 %?16?%;margin-left:%?12?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:15px;background:rgba(0,0,0,.5);color:#fff}.tui-key-text[data-v-065ff33b]{box-sizing:border-box;padding-right:%?12?%;font-size:9pt;line-height:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n\n/* 商品列表*/.tui-product-list[data-v-065ff33b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;box-sizing:border-box}.tui-product-container[data-v-065ff33b]{width:49.2%;margin-right:%?10?%}.tui-product-container[data-v-065ff33b]:last-child{margin-right:0}.tui-pro-item[data-v-065ff33b]{width:100%;margin-bottom:%?10?%;background:#fff;box-sizing:border-box;\n\t/* border-radius: 12rpx; */overflow:hidden;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.tui-flex-list[data-v-065ff33b]{display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:%?16?%!important}.tui-pro-img[data-v-065ff33b]{width:100%;display:block}.tui-proimg-list[data-v-065ff33b]{width:%?260?%;height:%?260?%!important;-webkit-flex-shrink:0;flex-shrink:0\n\t/* border-radius: 12rpx; */}.tui-pro-content[data-v-065ff33b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;box-sizing:border-box;padding:%?20?%}.tui-pro-tit[data-v-065ff33b]{color:#2e2e2e;font-size:9pt;word-break:break-all;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.tui-pro-price[data-v-065ff33b]{padding-top:%?18?%;-webkit-flex-wrap:wrap;flex-wrap:wrap}.tui-sale-price[data-v-065ff33b]{font-size:13pt;font-weight:500;color:#e41f19;padding-right:%?12?%}.tui-factory-price[data-v-065ff33b]{font-size:9pt;color:#a0a0a0;text-decoration:line-through}.tui-pro-pay[data-v-065ff33b]{padding-top:%?10?%;font-size:9pt;color:#656565}\n\n/* 商品列表*/\n\n/* .switchStyle{\n\tposition: absolute;\n\ttop: 50%;\n\tright: 20rpx;\n\ttransform: translateY(-50%);\n} */.search-box[data-v-065ff33b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:30px}.switchStyle[data-v-065ff33b]{margin-right:%?20?%}body.?%PAGE?%[data-v-065ff33b]{background:#f7f7f7}",""]),t.exports=e},e5b2:function(t,e,i){"use strict";var a=i("dbcc"),n=i.n(a);n.a},e764:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={mainLoadmore:i("e18e").default,mainNomore:i("5968").default,mainTabbar:i("2524").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"tui-header-box"},[i("v-uni-view",{staticClass:"tui-header",style:{width:t.width+"px",height:t.height+"px"}},[i("v-uni-view",{staticClass:"tui-back",style:{marginTop:t.arrowTop+"px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}},[i("tui-icon",{attrs:{name:"arrowleft",size:28,color:"#000"}})],1),i("v-uni-view",{staticClass:"search-box",style:{marginTop:t.arrowTop+"px"}},[i("v-uni-view",{staticClass:"tui-searchbox tui-search-mr",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search(t.searchKey)}}},[t.searchKey?t._e():i("v-uni-text",{staticClass:"tui-search-text"},[t._v("搜索商品")]),t.searchKey?i("v-uni-view",{staticClass:"tui-search-key"},[i("v-uni-view",{staticClass:"tui-key-text"},[t._v(t._s(t.searchKey))]),i("tui-icon",{attrs:{name:"shut",size:12,color:"#fff"}})],1):t._e()],1),i("v-uni-view",{staticClass:"tui-top-item switchStyle",attrs:{"data-index":"2"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.screen.apply(void 0,arguments)}}},[i("tui-icon",{attrs:{name:t.isList?"manage":"listview",size:t.isList?22:18,bold:!t.isList,color:"#333"}})],1)],1)],1)],1),i("v-uni-view",{staticClass:"tui-product-list",style:{marginTop:t.dropScreenH+20+"px"}},[i("v-uni-view",{staticClass:"tui-product-container",style:{width:t.isList?"100%":"49.2%"}},[t._l(t.productList,(function(e,a){return(a+1)%2!=0||t.isList?[i("v-uni-view",{key:a+"_0",staticClass:"tui-pro-item",class:[t.isList?"tui-flex-list":""],attrs:{"hover-class":"hover","hover-start-time":150},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.detail(e.id)}}},[i("v-uni-image",{staticClass:"tui-pro-img",class:[t.isList?"tui-proimg-list":""],attrs:{src:e.cover_pic,mode:"widthFix"}}),i("v-uni-view",{staticClass:"tui-pro-content"},[i("v-uni-view",{staticClass:"tui-pro-tit"},[t._v(t._s(e.name))]),i("v-uni-view",[i("v-uni-view",{staticClass:"tui-pro-price flex flex-y-center"},[i("v-uni-view",{staticClass:"tui-sale-price",style:{color:t.textColor}},[t._v("￥"+t._s(e.price))]),i("v-uni-view",{staticClass:"tui-factory-price"},[t._v("￥"+t._s(e.original_price))])],1),1==e.is_show_sales?i("v-uni-view",{staticClass:"tui-pro-pay"},[t._v(t._s(e.sales||0)+"人付款")]):t._e()],1)],1)],1)]:t._e()}))],2),t.isList?t._e():i("v-uni-view",{staticClass:"tui-product-container"},[t._l(t.productList,(function(e,a){return(a+1)%2==0?[i("v-uni-view",{key:a+"_0",staticClass:"tui-pro-item",class:[t.isList?"tui-flex-list":""],attrs:{"hover-class":"hover","hover-start-time":150},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.detail(e.id)}}},[i("v-uni-image",{staticClass:"tui-pro-img",class:[t.isList?"tui-proimg-list":""],attrs:{src:e.cover_pic,mode:"widthFix"}}),i("v-uni-view",{staticClass:"tui-pro-content"},[i("v-uni-view",{staticClass:"tui-pro-tit"},[t._v(t._s(e.name))]),i("v-uni-view",[i("v-uni-view",{staticClass:"tui-pro-price flex flex-y-center"},[i("v-uni-view",{staticClass:"tui-sale-price",style:{color:t.textColor}},[t._v("￥"+t._s(e.price))]),i("v-uni-view",{staticClass:"tui-factory-price"},[t._v("￥"+t._s(e.original_price))])],1),1==e.is_show_sales?i("v-uni-view",{staticClass:"tui-pro-pay"},[t._v(t._s(e.sales||0)+"人付款")]):t._e()],1)],1)],1)]:t._e()}))],2)],1),i("main-loadmore",{attrs:{visible:t.loadding,index:3,type:"red"}}),i("main-nomore",{attrs:{visible:t.pullUpOn,bgcolor:"#f7f7f7"}}),i("main-tabbar")],1)},o=[]},eaec:function(t,e,i){"use strict";i.r(e);var a=i("5bd8"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},ee86:function(t,e,i){var a=i("8202");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("58d59bab",a,!0,{sourceMap:!1,shadowMode:!1})},ef16:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"tui-drawer-class tui-drawer",class:[t.visible?"tui-drawer-show":"","tui-drawer-"+t.mode]},[t.mask?i("v-uni-view",{staticClass:"tui-drawer-mask",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleMaskClick.apply(void 0,arguments)}}}):t._e(),i("v-uni-view",{staticClass:"tui-drawer-container",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e)}}},[t._t("default")],2)],1)},o=[]},fcb3:function(t,e,i){"use strict";var a=i("ee86"),n=i.n(a);n.a}}]);