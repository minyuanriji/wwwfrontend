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
			//#ifdef MP-WEIXIN
			let livePlayer = requirePlugin('live-player-plugin');
			const sceneList = [1007, 1008, 1014, 1044, 1045, 1046, 1047, 1048, 1049, 1073, 1154, 1155];
			console.log(options);
			// console.log(options.query.custom_params);
			if (options.query.custom_params) {
				uni.setStorageSync('parent_user_id', options.query.custom_params);
			}
			if (sceneList.includes(options.scene)) {
				livePlayer.getShareParams()
					.then(res => {
						// 房间号
						console.log('get room id', res.room_id)
						// 用户openid
						console.log('get openid', res.openid)
						// 分享者openid，分享卡片进入场景才有
						console.log('get share openid', res.share_openid)
						// 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
						uni.setStorageSync('parent_user_id', res.custom_params);
						console.log('get custom params', res.custom_params)
					}).catch(err => {
						console.log('get share params', err)
					})
			}
			//#endif

			// #ifdef MP-WEIXIN
			//小程序更新
			if (uni.getUpdateManager) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					// console.log(res.hasUpdate);
				});
				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: "更新提示",
						content: "新版本已经准备好，是否重启应用？",
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
				updateManager.onUpdateFailed(function(res) {
					// 新的版本下载失败
					uni.showModal({
						title: "已经有新版本了哟~",
						content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
						showCancel: false
					});
				});
			}
			// #endif
			
			// #ifdef H5
			/* let wx_platform = this.$http.getPlatform()
			let wx_userInfo = uni.getStorageSync('userInfo');
			let wx_currUrl = window.location.href;
			let wx_token = uni.getStorageSync('token');
			if(wx_platform == 'wechat'){
				if(!wx_token){
					if(wx_currUrl.indexOf('rechargeCard') == -1 && wx_currUrl.indexOf('pages/public') == -1){
						uni.navigateTo({
							url:'/pages/public/login'
						})
					}
				}
			} */
				
			if (!uni.getStorageSync('subscribe')) {
				if(uni.getStorageSync("userInfo")){
					this.$http.request({
						url: this.$api.default.subscribe,
						data: {
							user_id: uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync('userInfo'))
								.user_id : 0
						}
					}).then((res) => {
						if (res.status == 1 && res.subscribe == 0) {
							uni.showModal({
								title: '提示',
								content: '请先关注公众号',
								success: function(res) {
									if (res.confirm) {
										window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg4OTQzMDkxNw==&scene=110#wechat_redirect';
										// uni.reLaunch({
										//     url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg4OTQzMDkxNw==&scene=110#wechat_redirect'
										// });
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} else if (res.status == 1 && res.subscribe == 1) {
							uni.setStorageSync('subscribe', res.subscribe);
						}
					})
				}
			}


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
	@import './static/font-icon/iconfont.css';

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
