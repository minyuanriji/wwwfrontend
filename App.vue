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
			// #endif
	
	
	
	
	
			
			//#ifdef H5
			   this.locationH5()	   
			// #endif
			// #ifndef H5
				this.locationMp()
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

			},			
			
			
			
			
			getLocationDataH5(){ //公众号定位
				let that=this
				if(that.$http.getPlatform()=='wechat'){
					that.$wechatSdk.location(function(res){
					if(uni.getStorageSync('x-longitude')&&uni.getStorageSync('x-latitude')){	
						 var  countLO=that.getMapDistanceApi(uni.getStorageSync('x-longitude'),uni.getStorageSync('x-latitude'),res.longitude,res.latitude)					
						 if((Math.floor(countLO/1000 * 100) / 100)>3){
							 uni.showModal({
							 	title: '提示',
							 	content: "已经超出初次定位3公里，是否重新定位",
							 	success: function(result) {
							 		if (result.confirm) {
										uni.removeStorageSync('x-longitude')
										uni.removeStorageSync('x-latitude')
							 			that.locationH5()
							 		} else if (result.cancel) {
										
							 		}
							 	}
							 })
						 }else{
							
						 }
					}
					uni.setStorageSync('x-longitude',res.longitude)
					uni.setStorageSync('x-latitude',res.latitude)
					})
				}else{
					that.getLocationData()
				}
			},
			getLocationData(){  //微信或者APP定位
				var that=this
				uni.getLocation({
					type:'gcj02',
					success(res) {
						if(uni.getStorageSync('x-longitude')&&uni.getStorageSync('x-latitude')){
							 var  countLO=that.getMapDistanceApi(uni.getStorageSync('x-longitude'),uni.getStorageSync('x-latitude'),res.longitude,res.latitude)					
							 if((Math.floor(countLO/1000 * 100) / 100)>3){
								 uni.showModal({
								 	title: '提示',
								 	content: "已经超出初次定位3公里，是否重新定位",
								 	success: function(result) {
								 		if (result.confirm) {
											uni.removeStorageSync('x-longitude')
											uni.removeStorageSync('x-latitude')
								 			that.locationMp()
								 		} else if (result.cancel) {
											
								 		}
								 	}
								 })
							 }else{
								
							 }
						}
						uni.setStorageSync('x-longitude',res.longitude)
						uni.setStorageSync('x-latitude',res.latitude)
					}
				})
			},			
			locationH5(){
				this.getLocationDataH5()
				var time=(parseInt(new Date().getTime()/1000)+7200)-parseInt(new Date().getTime()/1000)
				let temp=setInterval(()=>{
					time--
					if(time<=0){
						this.getLocationDataH5()
						clearInterval(temp);
					}else{
									
					}
				},1000)				
			},
			locationMp(){
				this.getLocationData()
				var time=(parseInt(new Date().getTime()/1000)+7200)-parseInt(new Date().getTime()/1000)
				let temp=setInterval(()=>{
					time--
					if(time<=0){
						this.getLocationData()
						clearInterval(temp);
					}else{
									
				}
				},1000)	  
			},
			getMapDistanceApi(lng1,lat1,lng2,lat2){	 //计算两点之间的距离		    
			    var radLat1 = lat1*Math.PI / 180.0;
			    var radLat2 = lat2*Math.PI / 180.0;
			    var a = radLat1 - radLat2;
			    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
			    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
			    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
			    s = s *6378.137 ;// EARTH_RADIUS;
			    s = Math.round(s * 10000) / 10000;
			    
			    s = s * 1000
			    
			    if (isNaN(s)) {  
			        return 0;  
			    }	    
			    return s;
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
