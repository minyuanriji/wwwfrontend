<script>
	export default {
		onLaunch: function() {

			//console.log('App Launch');
			// 初始化项目就执行自定义分享
			// this.$wechatSdk.share();
			this.initMall();
			// #ifdef H5
			if (this.$route.query.mall_id) {
				uni.setStorageSync('mall_id', this.$route.query.mall_id);
			}
			// #endif
				
			// #ifdef APP-PLUS
			let that = this;
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				//APP更新
				//console.log('请求更新前提交的版本='+widgetInfo.version)
				that.$http.request({
					url: that.$api.app_update,
					data: {
						version_number: widgetInfo.version
					}
				}).then(res => {
					//console.log('更新接口返回=='+JSON.stringify(res));
					if (res.code == 0) {
						if (res.data.status == 1) { //1代表有新版本
							if (res.data.type == 0) { //0：全部更新

								uni.showModal({
									title: '提示',
									showCancel: res.data.compulsive == 0 ? true :
									false, //是否强制更新：0：否 1：是
									content: res.data.remark,
									success: function(res2) {
										if (res2.confirm) {
											plus.runtime.openURL(res.data.address);
										} else if (res2.cancel) {

										}
									}
								})
							} else if (res.data.type == 1) { //1：部分更新
								uni.showModal({
									title: '提示',
									content: res.data.remark,
									showCancel: res.data.compulsive == 0 ? true :
									false, //是否强制更新：0：否 1：是
									success: function(res2) {
										if (res2.confirm) {
											uni.navigateTo({
												url: '/pages/about/about?pageSource=2'
											})
										}
									}
								})
							}
						}

					} else {

					}
				})
			});
			// #endif
		},

		onShow: function(options) {
			
			
			
			
			
			// //#ifdef H5
			// 	var jweixin = require('jweixin-module');
			// 	this.$wechatSdk.initJssdk(function(signData){});
			// 	let use=uni.getStorageSync('userInfo')
			// 	let url=window.location.href+"&pid="+JSON.parse(use).user_id
			// 	let shareInfo={
			// 		title:'分享',
			// 		desc: '自定义分享',
			// 		imgUrl: 'https://www.mingyuanriji.cn/web/static//header-logo.png',
			// 		link:url,
			// 	}
			// 	console.log(shareInfo)
			// 	jweixin.updateAppMessageShareData(shareInfo)				
			// //#endif
			// #ifdef MP-WEIXIN
			if (uni.getUpdateManager) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
				});
				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: "更新提示",
						content: "新版本已经准备好，是否重启应用？",
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate();
							}
						}
					});
				});
				updateManager.onUpdateFailed(function(res) {
					uni.showModal({
						title: "已经有新版本了哟~",
						content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
						showCancel: false
					});
				});
			}
			// #endif
			
			// #ifdef H5
			let location=window.location.href
			let currentOne=''
			let currentTwo=''
			let currentLink=''
			if(location.indexOf('pid=')!=-1){
				 currentOne=location.split('&pid=')[0]				 				 
				 currentLink=location.split('&pid=')[1].split("&")				 
				 let arr=[]
				 for(let i= 0;i<currentLink.length;i++){
				 	if(i>0){
				 		arr.push(currentLink[i])
				 	}
				 }
				 if(arr.length>0){
					  currentTwo= arr.join("&")
					  let page=currentOne+"&"+currentTwo
					  uni.setStorageSync('page',page)
				 }else{
					   uni.setStorageSync('page',currentOne)
				 }
			}
			if(options.query.pid){
				uni.setStorageSync('pid',options.query.pid)	
				setTimeout(function(){
					uni.navigateTo({
						url:'/pages/user/bindUser/bindUser'
					})
				},500)						 				
			}	
			
			/* let wx_platform = this.$http.getPlatform()
			let wx_userInfo = uni.getStorageSync('userInfo');
			let wx_currUrl = window.location.href;
			let wx_token = uni.getStorageSync('token');
			if(wx_platform == 'wechat'){
				if(!wx_token){11
					if(wx_currUrl.indexOf('rechargeCard') == -1 && wx_currUrl.indexOf('pages/public') == -1){
						uni.navigateTo({
							url:'/pages/public/login'
						})
					}
				}
			} */
			// #endif
		},
		onHide: function() {
			
		},
		methods: {
			initMall() {
				this.$http.request({
					url: this.$api.index.config
				}).then(res => {
					if (res.code === 0) {
						let {
							cat_style,
							copyright,
							mall_setting,
							navbar,
							page_title
						} = res.data;
						uni.setStorageSync('tabbars', JSON.stringify(navbar));
						uni.setStorageSync('mall_config', JSON.stringify(res.data));
						this.$nextTick();
					}
				});

			}
		}
	};
</script>

<style>

	/*每个页面公共css */
	@import './common/app.css';
	/* @import './static/font-icon/iconfont.css'; */
	@import './plugins/font-icon/iconfont.css';
	/* #ifdef H5 */
	/* //修复H5底部导航挡住内容bug */
	/* uni-app {
	height: auto;
} */

	/* //修复H5输入框上下不居中bug */
	/* .uni-input-form {
	height: 100%;
} */
	/* //去除地图上高德地图标识符 */
	.amap-copyright {
		display: none !important;
	}

	.amap-logo {
		display: none !important;
	}

	.amap-ui-control-zoom {
		width: 60rpx !important;
	}

	.amap-ui-control-zoom>* {
		width: 60rpx !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}

	.amap-ui-control-theme-dark {
		display: none !important;
	}

	/* #endif */
</style>
