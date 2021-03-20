import Vue from 'vue'
import App from './App'
import request from '@/common/request.js';
import api from '@/common/api.js';
// #ifdef H5
import wechatSdk from '@/common/wechatJsSdk.js';
import VueClipboard from 'vue-clipboard2'
// 视频播放 vue-video-player 
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer).use(VueClipboard);
Vue.prototype.$wechatSdk = wechatSdk;
// #endif

// #ifdef MP-WEIXIN
//挂载全局微信分享
import { wxShare } from '@/config/utils'
Vue.prototype.wxShare = wxShare;
// #endif


import { navBack,globalSet,dateFormat,checkHttpUrl } from '@/config/utils'
Vue.prototype.navBack = navBack;
Vue.prototype.globalSet = globalSet;
Vue.prototype.dateFormat = dateFormat;
Vue.prototype.checkHttpUrl = checkHttpUrl;

Vue.prototype.$http = request;
Vue.prototype.$api = api;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();



App.mpType = 'app'

const app = new Vue({
	...App,
})

// Vue.initMall();
app.$mount()
