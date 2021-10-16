<template>
	<view :class="show?'ercode':'active'" id="poster">
		<view class="main">
			<view class="logo">
				<image :src="img_url+'/logo_logo.png'" mode="widthFix"></image>
			</view>
			<view class="title">
				推荐使用补商汇
			</view>
			<view class="ercodeImg">
				<view class="ercodeImg-img">
					<image :src="ercodeLogo.qrcode" mode=""></image>
				</view>
				<view class="shop-name">
					{{message.store.name}}
				</view>
			</view>
			<view class="notice">
				扫码付多少送多少购物券
			</view>
		</view>
		<view class="type_pay">
			<view>
				<image :src="img_url+'/logo_wechat.png'" mode=""></image>
				<text>微信</text>
			</view>
			<view>
				<image :src="img_url+'/logo_ali.png'" mode=""></image>
				<text>支付宝</text>
			</view>
			<view>
				<image :src="img_url+'/logo_card.png'" mode=""></image>
				<text>信用卡</text>
			</view>
		</view>
		<view class="btn" @click="capture" v-if="show">
			点击生成图片
		</view>		
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
					</view>
					<view class="saveCode-btn">长按图片保存至本地</view>
				</view>
				
				<view class="goods-qrcode-close" @click="closePost">
					<view style="width: 50rpx;height: 50rpx;text-align: center;background-color: #ADADAD;color: #FFFFFF;border-radius: 50%;line-height: 50rpx;"
					 class="iconfont icon-guanbi"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
	import html2canvas from 'html2canvas'
	//#endif
	export default {
		data() {
			return {
				ercodeLogo: {},
				message: {},
				showPoster: false,
				poster_url:"",
				img_url: this.$api.img_url,
				show:true
			}
		},
		onLoad() {
			// #ifdef H5
			var route = '/h5/#/mch/personalCentre/ercode/payPages/payPages';
			// #endif
			
			// #ifdef MP-WEIXIN || APP-PLUS
			var route = 'mch/personalCentre/ercode/payPages/payPages';
			// #endif
			
			this.$http.request({
				url: this.$api.moreShop.checkOrder,
				method: 'POST',
				data: {
					route: route
				},
				showLoading: true
			}).then(res => {
				if (res.code == 0) {
					this.ercodeLogo = res.data
				}
			})
			if (uni.getStorageSync('mchMessage')) {
				this.message = uni.getStorageSync('mchMessage')
			}
		},
		methods: {
			//#ifdef H5
			capture() {
				this.show=false
				setTimeout(()=>{
					window.pageYoffset = 0;
					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
					html2canvas(
					    document.getElementById('poster'), 
					    { 
							height: document.getElementById('poster').clientHeight+90,
							scale: 4,
							dpi: window.devicePixelRatio * 4,
							useCORS: true
						 }
					).then( canvas => {
								this.poster_url = canvas.toDataURL('image/png', 1);
								if(this.poster_url.length>0){								
									this.showPoster=true
								}
					});
				},500)

			},
			//#endif
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
			closePost(){
				this.showPoster = false;
				this.show=true
			}
		}
	}
</script>

<style scoped lang="less">
	.ercode {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.active{
		width: 100%;
		height: 80%;
		position: relative;
	}
	.main{width: 100%;height:850rpx ;background:#FF6B09 ;padding-top: 30rpx;}
	.logo{width: 100%;overflow: hidden;}
	.logo image{width: 164rpx;height: 64rpx;margin: 0 auto;display: block;}
	.title{width: 100%;overflow: hidden;font-size: 50rpx;color: #fff;text-align: center;font-weight: bold;margin: 25rpx 0 30rpx 0;}
	.ercodeImg{width: 60%;margin: 0 auto;background: #fff;height: 500rpx;border-radius: 30rpx;}
	.ercodeImg-img{width: 350rpx;height: 350rpx;margin: 0 auto;padding-top: 40rpx;}
	.ercodeImg-img image{width: 350rpx;height: 350rpx;}
	/* #ifdef H5 */
.shop-name{margin-top: 60rpx;width: 100%;overflow: hidden;text-align: center;color: #FF6B09 ;font-weight: bold;font-size: 36rpx;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;}
	/* #endif */
	/* #ifdef  MP  */
	.shop-name{margin-top: 30rpx;width: 100%;overflow: hidden;text-align: center;color: #FF6B09 ;font-weight: bold;font-size: 36rpx;overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;}
	/* #endif */
	.notice{width: 100%;overflow: hidden;text-align: center;color: #fff;font-weight: bold;font-size: 36rpx;margin: 40rpx 0 0 0;}
	.type_pay{width: 100%;height: 184rpx;display: flex;justify-content: space-evenly;}
	.type_pay view{width: 30%;margin: 50rpx 0 0 0;}
	.type_pay image{display: block;width: 60rpx;height: 60rpx;margin: 0 auto;}
	.type_pay text{display: block;width: 100%;text-align: center;font-size: 30rpx;color: #000;}
	
	
	
	
	
	
	
	
	
	
	
	.btn {
		width: 450rpx;
		background: #FF7104;
		height: 70rpx;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin: 50rpx auto 80rpx;
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

