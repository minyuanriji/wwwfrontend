<template>
	<view v-if="show" class="post-app">
		<!-- <button type="warn" @click="getData()" v-if="hidden">点击生成二维码</button> -->
		<view class="goods-qrcode-modal" v-if="!hidden">
			<view class="goods-qrcode-body flex-col">
				<view class="flex-grow-1" style="position: relative;">
					<view style="width: 100%;height: 100%;">
						<view class="goods-qrcode-box">
							<!-- #ifdef H5 -->
							<image :src="poster_url" class="goods-qrcode" mode="widthFix"></image>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<image :src="poster_url" class="goods-qrcode" mode="widthFix" @longpress="saveImage(poster_url)"></image>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<image :src="poster_url" class="goods-qrcode" mode="widthFix" @longpress="appSaveImg(poster_url)"></image>
							<!-- #endif -->
						</view>
					</view>
				</view>
				<view class="flex-grow-0 flex-col flex-y-center" style="padding: 30rpx 60rpx">
					<view>长按图片保存至本地</view>
				</view>
			</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				poster_url:'',
				show:true,
				hidden:true
			}
		},
		onLoad() {
				console.log(typeof uni.getStorageSync('userInfo'))
			if(typeof uni.getStorageSync('userInfo')=='string'){
				if(uni.getStorageSync('userInfo')&&JSON.parse(uni.getStorageSync('userInfo')).new_user_is_get_score==0){
							this.show=false
							uni.showModal({
									    title: '提示',
									    content: '新人领取红包',
										showCancel:false,
									    success: function (res) {
									        if (res.confirm) {
									            uni.navigateTo({
									            	url: '/pages/link/welfare'
									            });
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
				}else{
					this.show=true
					this.getData()
				}
			}else if(typeof uni.getStorageSync('userInfo')=='object'){			
				if(uni.getStorageSync('userInfo')&&uni.getStorageSync('userInfo').new_user_is_get_score==0){
							this.show=false
							uni.showModal({
									    title: '提示',
									    content: '新人领取红包',
										showCancel:false,
									    success: function (res) {
									        if (res.confirm) {
									            uni.navigateTo({
									            	url: '/pages/link/welfare'
									            });
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
				}else{
					this.show=true
					this.getData()
				}
				
				
			}
		
		},
		methods: {
			getData() {
				this.loading = true;
				this.$http.request({
					url: this.$api.plugin.extensions.LinkPoster,
					method: 'POST'
				}).then(res => {
					if (res.status == 1) {
						this.hidden=false
						this.poster_url = res.img;
						uni.showToast({
						    title: res.msg,
						    duration: 500,
							icon:'none'
						});
						setTimeout(() => {
							this.loading = false;
						}, 1000)
					}else{
						this.$http.toast(res.msg);
						uni.redirectTo();
					}
				})
			},
			saveImage(url) { //保存图片
				var that = this;
				uni.authorize({
					/* 这个就是保存相册的 */
					scope: 'scope.writePhotosAlbum',
					success() {
						/* 保存图片方法 */
						that.saveImg(url);
					},
					complete(res) {
						/* 这里判断一下如果没有授权重新打开设置选项 */
						uni.getSetting({
							success(res) {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									/* 打开设置的方法 */
									that.opensit();
								}
							}
						});
					}
				});
			},
			opensit() {
				uni.showModal({
					content: '由于您还没有允许保存图片到您相册里,请点击确定去允许授权',
					success: function(res) {
						if (res.confirm) {
							/* 这个就是打开设置的API*/
							uni.openSetting({
								success(res) {
									console.log(res.authSetting);
								}
							});
						} else if (res.cancel) {
							uni.showModal({
								cancelText: '依然取消',
								confirmText: '重新授权',
								content: '很遗憾你点击了取消，请慎重考虑',
								success: function(res) {
									if (res.confirm) {
										uni.openSetting({
											success(res) {
												console.log(res.authSetting);
											}
										});
									} else if (res.cancel) {
										console.log('用户不授权');
									}
								}
							});
						}
					}
				});
			},
			saveImg(url) {
				/* 获取图片信息 */
				uni.getImageInfo({
					src: url,
					success: function(image) {
						/* 保存图片到相册 */
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
							},
							complete(res) {
								console.log(res);
							}
						});
					}
				});
			},
			appSaveImg(url){
				let that = this;
				/* 保存图片到相册 */
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: function() {
						that.$http.toast('保存成功');
					},
					fail(res){
						that.$http.toast('保存失败,请稍后重试');
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.post-app{width: 100%;height: 100%;position: relative;}
	.goods-qrcode-modal {
		width: 100%;
		height: 100%;
	}
	
	.goods-qrcode-body {
		background: #ffffff;
		border-radius: 10rpx;
		padding: 40rpx;
	}
	
	.goods-qrcode-body .goods-qrcode-box {
		height: 100%;
		position: relative;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
		border-radius: 16px;
	}
	
	.goods-qrcode {
		width: 100%;
		height: 100%;
		display: block;
		background: #fffffff;
	}
	
	.goods-qrcode-close {
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		padding: 15rpx;
	}
</style>
