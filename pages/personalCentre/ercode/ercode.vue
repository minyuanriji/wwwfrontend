<template>
	<view class="ercode" id="poster">
		<view class="main">
			<view class="logo">
				<image :src="img_url+'/header-logo.png'" mode=""></image>
			</view>
			<view class="main-title">
				让天下没有难做的生意
			</view>
			<view class="main-title-english">
				LET THERE BE NO HARD BUSSINESS IN THE WORLD
			</view>
			<view class="shop-name">
				{{message.store.name}}
			</view>
			<view class="saosao">
				收款二维码
			</view>
			<view class="code">
				<image :src="ercodeLogo.qrcode" mode="" class="ercode_code_logo"></image>
			</view>
		</view>
		<view class="btn" @click="capture">
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
			}
		},
		onLoad() {
			this.$http.request({
				url: this.$api.moreShop.checkOrder,
				method: 'POST',
				data: {
					route: '/h5/#/pages/personalCentre/ercode/payPages/payPages'
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
				// // let dom = document.querySelector('#poster'); // 获取dom元素
				// let scale=3
				// 	html2canvas(dom, {
				// 		width: dom.clientWidth, //dom 原始宽度
				// 		height: dom.clientHeight,
				// 		scrollY: 0,// html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
				// 		scrollX: 0,
				// 		useCORS: true,//支持跨域，但好像没什么用
				// 		scale:scale,
				// 		dpi:300
				// 	}).then((canvas) => {
				// 		//成功后调用返回canvas.toDataURL返回图片的base64，H5不支持下载base64，PC浏览器测试没问题，可以正常下载。
				// 		this.poster_url = canvas.toDataURL('image/png', 1);
				// 		if(this.poster_url.length>0){
				// 			this.showPoster=true
				// 		}
				// 	});
							window.pageYoffset = 0;
					        document.documentElement.scrollTop = 0;
					        document.body.scrollTop = 0;
					        html2canvas(
					            document.getElementById('poster'), 
					            { scale: 1 }
					        ).then( canvas => {
										this.poster_url = canvas.toDataURL('image/png', 1);
										if(this.poster_url.length>0){
											this.showPoster=true
										}
					        });
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
			}
		}
	}
</script>

<style scoped lang="less">
	.ercode {
		width: 100%;
		height: 100%;
		position: relative;
		background: url(https://dev.mingyuanriji.cn/web/static/erqode-img.jpg)no-repeat; 
		background-size: 100% 100%;
		padding-top: 70rpx;
	}

	.main {
		width: 90%;
		height: 900rpx;
		margin: 0rpx auto;
		background: #fff;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(62, 65, 79, 0.2);
		border-radius: 10rpx;
	}

	.logo {
		width: 180rpx;
		height: 180rpx;
		margin: 0rpx auto;
		position: relative;
	}

	.logo image {
		width: 180rpx;
		height: 180rpx;
		display: block;
		position: absolute;
		top: -70rpx;
	}

	.main-title {
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 30rpx;
		margin-top: -60rpx;
		color: #395d5a;
		font-weight: bold;
	}

	.main-title-english {
		width: 100%;
		overflow: hidden;
		font-size: 10rpx;
		text-align: center;
		transform: scale(0.6)
	}

	.shop-name {
		width: 450rpx;
		background:#FF7104;
		height: 70rpx;
		margin: 15rpx auto;
		border-radius: 40rpx;
		text-align: center;
		line-height: 70rpx;
		color: #fff;
		font-size: 30rpx;
	}

	.saosao {
		width: 100%;
		overflow: hidden;
		text-align: center;
		color: #395d5a;
		font-size: 28rpx;
	}

	.code {
		width: 450rpx;
		height: 450rpx;
		margin: 30rpx auto 0;
		background: url(../../../plugins/images/kuang.png)no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.ercode_code_logo {
		width: 420rpx;
		height: 420rpx;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.btn {
		width: 450rpx;
		background: #FF7104;
		height: 70rpx;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin: 50rpx auto 100rpx;
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
