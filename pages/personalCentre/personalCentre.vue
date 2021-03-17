<template>
	<view class="personalCenter">
		<view class="personalCenter-top">
			<image :src="userMessage.store.cover_url"  class="personal-logo"></image>
			<view class="personal_nicken_ID">
				<view class="personal_nicken">{{userMessage.store.name}}</view>
				<view class="personal_id">ID:{{userMessage.store.mch_id}}</view>
			</view>
			<!-- 分享的店铺  -->
			<view class="share-shop">
				<view class="tui-collection tui-size"  @click.stop="poster()">
					<view class="tui-icon-collection iconfont icon-qrcode"></view>
					<view class="tui-scale">分享</view>
				</view>
			</view>
			<!-- 分享店铺  -->
		</view>
		<view class="jx-content-box">
			<view class="jx-header-btm">
				<view class="jx-btm-item" @click="href(5)">
					<view class="jx-btm-num">{{userMessage.stat.account_money}}</view>
					<view class="jx-btm-text">账户</view>
				</view>
				<view class="jx-btm-item">
					<view class="jx-btm-num">{{userMessage.stat.order_num}}</view>
					<view class="jx-btm-text">订单</view>
				</view>
				<view class="jx-btm-item last">
					<view class="jx-btm-num">{{userMessage.stat.goods_num}}</view>
					<view class="jx-btm-text">商品</view>
				</view>
			</view>
		</view>
		<view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false"  @click="href(1)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">我的首页</view>
					<!-- <view class="jx-cell-sub">查看全部订单</view> -->
				</view>
			</jx-list-cell>
		</view>
		<view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false"  @click="href(2)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">二维码收款</view>
					<!-- <view class="jx-cell-sub">查看全部订单</view> -->
				</view>
			</jx-list-cell>
		</view>
		<view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(3)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">核销订单</view>
				</view>
			</jx-list-cell>
		</view>
	<!-- 	<view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">我的设置</view>
				</view>
			</jx-list-cell>
		</view> -->
		<!-- <view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(5)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">资金明细</view>
				</view>
			</jx-list-cell>
		</view> -->
		
		<view class="goods-qrcode-modal" v-if="showPoster">
			<view class="goods-qrcode-body flex-col">
				<!-- 整一个图片包括二维码都是后台给的图片 -->
				<view class="goods-qrcode2 flex flex-y-center flex-x-center">
					<view class="codeImg_box">
						<!-- #ifdef H5 -->
						<view class="goods-qrcode-box">
							<image :src="poster_url" class="goods-qrcode" mode='aspectFit'></image>
						</view>
						<!-- #endif -->
						
						<!-- #ifdef MP-WEIXIN -->
						<view class="goods-qrcode-box" @longpress="saveImage(poster_url)">
							<image :src="poster_url" class="goods-qrcode" mode='aspectFit'></image>
						</view>
						<!-- #endif -->
						
						<!-- #ifdef APP-PLUS -->
						<view class="goods-qrcode-box" @longpress="appSaveImg(poster_url)">
							<image :src="poster_url" class="goods-qrcode" mode='aspectFit'></image>
						</view>
						<!-- #endif -->
					</view>
					<view class="saveCode-btn">长按图片保存至本地</view>
				</view>
				
				<view class="goods-qrcode-close" @click="poster(-1)">
					<view style="width: 50rpx;height: 50rpx;text-align: center;background-color: #ADADAD;color: #FFFFFF;border-radius: 50%;line-height: 50rpx;"
					 class="iconfont icon-guanbi"></view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import jxListCell from '@/components/list-cell/list-cell';
	export default {
		components: {
			jxListCell
		},
		data() {
			return {
				userMessage:{},
				showPoster: false,
				loading: false,
				poster_url:"",
			}
		},
		onLoad() {
			this.$http
				.request({
					url: this.$api.user.userInfo,
					method: 'POST',
					showLoading: true
				})
				.then(res => {
					console.log(res.data.mch_info)
					this.userMessage=res.data.mch_info
				});
		},
		methods:{
			href(page) {
				if(page==1){
					let mch_id=this.userMessage.store.mch_id
					uni.setStorage({
						key:'mch_id',
						data:mch_id,
						success() {
							uni.navigateTo({
								url:"/pages/shop/home/home?mch_id="+mch_id
							})
						}
					})
				}
				if(page==2){
					uni.navigateTo({
						url:'./ercode/ercode'
					})
				}
				if(page==3){
					uni.navigateTo({
						url:'./accountingOrder/accountingOrder'
					})
				}
				if(page==4){
					uni.navigateTo({
						url:'./personalCentreSET/personalCentreSET'
					})
				}
				if(page==5){
					uni.navigateTo({
						url:'./mongeyDetail/mongeyDetail'
					})
				}
			},
			poster(key) {
				if (key == -1) {
					this.showPoster = false;
					return;
				}
				this.loading = true;
				this.showPoster = true;
				if (this.poster_url) {
					setTimeout(() => {
						this.loading = false;
					}, 1000)
					return;
				}
				this.$http.request({
					url: this.$api.goods.poster,
					method: 'POST',
					data: {
						// goods_id: this.proId,
						goods_id: 1158,
						source: 2
					}
				}).then(res => {
					if (res.code == 0) {
						this.poster_url = res.data.pic_url;
						setTimeout(() => {
							this.loading = false;
						}, 1000)
					}
				})
			},
			appSaveImg(url){ //app保存图片到本地
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
			saveImg(url) {
				var that = this;
				/* 获取图片信息 */
				uni.getImageInfo({
					src: url,
					success: function(image) {
						/* 保存图片到相册 */
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								that.$http.toast('保存成功');
							},
							fail(res){
								that.$http.toast('保存失败,请稍后重试');
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
		}
	}
</script>

<style lang="scss" scoped>
	.personalCenter{width:100%;overflow:hidden;}
	.personalCenter-top{width: 100%;overflow: hidden;padding: 20upx;background: #fff;margin-top: 20rpx;}
	.personal-logo{width: 128rpx;height: 128rpx;display: block;border-radius: 50px;float: left;}
	.personal_nicken_ID{float: left;margin-left: 30rpx;width: 400rpx;}
	.personal_nicken{margin: 10upx 0;width: 100%;}
	.personalCenter-item{width: 100%;overflow: hidden;margin: 20upx 0;}
	.jx-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
	.jx-header-btm {
		border-radius: 12rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;
		background: #ffffff;
		margin-bottom: 20rpx;
		// box-shadow: 1rpx 1rpx 5rpx #888;
	}
	
	.jx-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		position: relative;
	
		&::after {
			content: '';
			border-right: 1rpx solid #b3b3b3;
			width: 1px;
			height: 100rpx;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	
		&:last-child {
			&::after {
				display: none;
			}
		}
	}
	
	.jx-btm-num {
		font-size: 12pt;
		font-weight: 600;
		position: relative;
	}
	
	.jx-btm-text {
		font-size: 9pt;
		opacity: 0.85;
		padding-top: 4rpx;
	}
	.jx-cell-header {
		width: 100%;
		height: 100rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f3f3f3;
	}
	.jx-cell-title {
		font-size: 11pt;
		line-height: 30rpx;
		font-weight: 400;
		color: #333;
		font-weight: 600;
		letter-spacing: 1px;
	}
	.jx-cell-sub {
		font-size: 9pt;
		font-weight: 400;
		color: #999;
		padding-right: 10rpx;
	}
	.share-shop{float: right;}
	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 96rpx;
		width: 96rpx;
		border-radius: 100rpx;
		background: #F7F7F7;
		margin-right: 10rpx;
	}
	
	.tui-scale {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24rpx;
		font-weight: normal;
	}
	
	.tui-icon-collection {
		line-height: 20px !important;
		margin-bottom: 0 !important;
		color: #333333;
		font-size: 20px;
	}
	
	
	.goods-qrcode-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		transition: opacity 250ms;
		z-index: 9999;
	}
	
	.goods-qrcode-body {
		background: #ffffff;
		height: 100%;
		border-radius: 10rpx;
		padding: 30rpx;
	}
	
	.goods-qrcode-body .goods-qrcode-box {
		height: 100%;
		position: relative;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
	}
	.goods-qrcode2{
		position: relative;
		height: 1300rpx;
		flex-direction: column;
		margin-top: 40rpx;
	}
	.codeImg_box {
		width: 92%;
		height: 82%;
		margin-bottom: 20rpx;
	}
	.saveCode-btn{
		color: #939292;
		padding: 10px 20px;
		border-radius: 10px;
	}
	
	.goods-qrcode {
		width: 100%;
		height: 100%;
		background: #fffffff;
		background-size: 100%;
	}
	
	.goods-qrcode-close {
		position: absolute;
		top: 40rpx;
		/* #ifdef MP-WEIXIN */
		top: 150rpx;
		/* #endif */
		right: 40rpx;
		padding: 15rpx;
	}
</style>
