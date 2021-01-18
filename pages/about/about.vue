<template>
	<view>
		<jyf-parser :html="htmls"></jyf-parser>
		<!-- #ifdef APP-PLUS -->
		<view class="banbenBox">
			<view class="view1">当前版本v{{version}}</view>
			<view class="view2" v-if="isShow2">最新版本v{{version2}}</view>
			<view class="btn btn1" type="primary" @click="appUpdate(3)">检测更新</view>
		</view>

		<view class="fixedBox" v-if="isShow">
			<view>新版本下载进度: {{downloadProgress}}%</view>
			<progress :percent="downloadProgress" stroke-width="6" />
		</view>
		<view class="mask" v-if="isShow"></view>
		<!-- #endif -->


	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				htmls: '',
				// #ifdef APP-PLUS
				version:'',
				isShow:false,
				isShow2:false,
				version2:'',
				downloadTask: null, // 下载任务
				downloadProgress: 0, // 下载进度
				// #endif
			};
		},
		components: {
			jyfParser
		},
		onLoad(options) {
			this.getData();
			
			// #ifdef APP-PLUS
				let that = this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					console.log('当前的版本='+widgetInfo.version)
					that.version = widgetInfo.version
				})
				if(options.pageSource == 2){//从app.vue 请求完app更新接口 进来这个页面会传递这个参数
					that.appUpdate(2);
				}else{
					that.appUpdate(1);//请求APP是否有更新的接口
				}
			// #endif
			
		},
		methods: {
			getData() {
				this.$http.request({
					url: this.$api.article.detail,
					data: {
						type: 'about_us'
					}
				}).then(res => {
					console.log(res, 'ressssss');
					if (res.code == 0) {
						this.htmls = res.data.article.content
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			// #ifdef APP-PLUS
			appUpdate(funCallType){
				let that = this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					//APP更新
					console.log('请求更新前提交的版本2='+widgetInfo.version)
					that.$http.request({
						showLoading:true,
						url: that.$api.app_update,
						data: {
							version_number:widgetInfo.version
						}
					}).then(res => {
						console.log('更新接口返回2='+JSON.stringify(res));
						if (res.code == 0) {
							if(res.data.status == 1){//1代表有新版本
								if(funCallType == 1){//是APP的话 进来此页面请求app是否有更新
									console.log('进来了1='+res.data.version_number)
									
										that.isShow2 = true;
										that.version2 = res.data.version_number
									
								}else if(funCallType == 2){//代表从app.vue进来 走直接更新的逻辑
									console.log('进来了2')
									if(res.data.type == 1){//1：部分更新
										that.isShow = true;
										that.isShow2 = true;
										that.version2 = res.data.version_number;
										that.downloadTask = uni.downloadFile({
										    url: res.data.address,  
										    success: (downloadResult) => {  
												console.log('downloadResult=='+JSON.stringify(downloadResult))
										        if (downloadResult.statusCode === 200) {  
													//console.log('120=='+downloadResult.tempFilePath)
													plus.runtime.install(downloadResult.tempFilePath, { force: true })
													uni.showModal({
													    title: '提示',
													    content: '更新完成后需要重启APP才能生效',
														showCancel:false,
													    success: function (res2) {
													        if (res2.confirm) {
																plus.runtime.restart(); 
													        } else if (res2.cancel) {
													            
													        }
													    }
													});
										        }  
										    }  
										})
										// 进度条更新
										that.downloadTask.onProgressUpdate((res) => {
										  that.downloadProgress = res.progress
										})   
									}
								}else if(funCallType == 3){//点击检测更新的时候
									console.log('进来了3')
									if(res.data.type == 1){//部分更新
										
										that.isShow2 = true;
										that.version2 = res.data.version_number
										uni.showModal({
										    title: '提示',
										    content: res.data.remark,
											showCancel:res.data.compulsive == 0?true:false,//是否强制更新：0：否 1：是
										    success: function (res2) {
										        if (res2.confirm) {
													that.isShow = true;
													that.downloadTask = uni.downloadFile({
													    url: res.data.address,  
													    success: (downloadResult) => {  
															console.log('downloadResult2=='+JSON.stringify(downloadResult))
													        if (downloadResult.statusCode === 200) {  
																//console.log('120=='+downloadResult.tempFilePath)
																plus.runtime.install(downloadResult.tempFilePath, { force: true })
																uni.showModal({
																    title: '提示',
																    content: '更新完成后需要重启APP才能生效',
																	showCancel:false,
																    success: function (res3) {
																        if (res3.confirm) {
																			plus.runtime.restart(); 
																        }
																    }
																});
													        }  
													    }  
													})
													// 进度条更新
													that.downloadTask.onProgressUpdate((res) => {
													  that.downloadProgress = res.progress
													})   
										        }
										    }
										})
									}else if(res.data.type == 0){//整包更新
											uni.showModal({
											    title: '提示',
											    content: res.data.remark,
												showCancel:res.data.compulsive == 0?true:false,//是否强制更新：0：否 1：是
											    success: function (res2) {
											        if (res2.confirm) {
														console.log(172)
											           plus.runtime.openURL(res.data.address);
											        }
											    }
											})
									}
								}
								
							}else if(res.data.status == 0){//没有版本更新
								if(funCallType == 3){//点击检测更新的时候
									that.$http.toast('当前已经是最新版本');
								}
							}
						} else {
							
						}
					})
				});
			},
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
	.banbenBox {
		margin-top: 20rpx;
		text-align: center;
		padding-bottom: 20rpx;
		font-size: 28rpx;
	
		view {
			padding: 10rpx 0;
		}
	
		.btn {
			width: 182rpx;
			padding: 10rpx 0;
			border: 5rpx solid #FFBD86;
			text-align: center;
			font-size: 28rpx;
			color: #333;
			margin: 0 auto;
			margin-top: 10rpx;
		}
	}
	
	.mask {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.7);
	}
	.fixedBox{
		width: 600rpx;
		height: 200rpx;
		background-color: #fff;
		border-radius: 20rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		z-index: 11;
		box-sizing: border-box;
		padding: 40rpx;
		text-align: center;
		
		progress{
			margin-top: 30rpx;
		}
	}
	/* #endif */
	
</style>
