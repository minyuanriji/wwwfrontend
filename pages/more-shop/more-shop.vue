<template>
	<view class="more-shop" v-if="show">
		<com-nav-bar left-icon="back" :title="title" @clickLeft="back"></com-nav-bar>
		<view class="success_message" v-if="flag">
			<view class="zhanwei"></view>
			<view class="success_message_goods">
				<image :src="goodinfo.cover_pic" lazy-load="true" class="success_message_goods-img"></image>
				<view class="success_message_goods-center">
					<view class="success_message_goods-name">{{goodinfo.name}}</view>
				</view>
				<view class="success_message_goods-price-right">
					<view class="price">￥{{message.total_original_price}}</view>
					<view class="num">x{{message.num}}</view>
				</view>
			</view>
			<view class="success_logo">
				<image :src="img_url+'/success_logo.png'" mode=""></image>				
			</view>
			<view class="success_message_title">
				核销成功
			</view>
			<view class="account-code">
				核销码：{{code}}
			</view>
			<view class="sure_btn" @click="gointo">
				完成
			</view>
		</view>
		<view class="faile_message" v-if="!flag">
			<view class="faile_message_title">
				核销失败
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:"",
				message:{},
				success:'',
				goodinfo:{},
				flag:true,
				show:false,
				title:'核销进度',
				img_url: this.$api.img_url,
			}
		},
		onLoad(options) {
			let that=this
			that.code=options.code
			console.log(options)
			uni.showLoading({
			    title: '正在核销中'
			});
			setTimeout(function () {
			    uni.hideLoading();
				that.$http.request({
					url: that.$api.moreShop.verification,
					method: 'POST',
					data: {
						code: options.code,
					},
					showLoading: false
				}).then(res => {
					if(res.code==0){
						that.$http.toast(res.msg)
						that.flag=true
						that.show=true
						that.message=res.data.detail
						that.goodinfo=res.data.detail.goods_info.goods_attr
					}else{
						that.$http.toast(res.msg)
						that.flag=false
						that.show=true
						setTimeout(function(){
							// uni.redirectTo({
							// 	url:'../personalCentre/accountingOrder/accountingOrder'
							// })
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				})		
			}, 2000);
		},
		methods: {
			gointo(){
				uni.navigateTo({
					url:'../personalCentre/accountingOrder/accountingOrder'
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.more-shop{width: 100%;height: 100%;}
	.success_message_goods {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background: #81d8d0;
		.success_message_goods-img {
			width: 180rpx;
			height: 180rpx;
			display: block;
			flex-shrink: 0;
		}
	
		.success_message_goods-center {
			flex: 1;
			padding: 20rpx;
			box-sizing: border-box;
		}
	}	
	.success_message_goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 9pt;
		line-height: 32rpx;
	}	
	.jx-goods-attr {
		font-size: 9pt;
		color: #888888;
		line-height: 32rpx;
		padding-top: 36rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}	
	.success_message_goods-price-right {
		text-align: right;
		font-size: 9pt;
		color: #999999;
		line-height: 30rpx;
		padding-top: 20rpx;	
		.price {
			margin-bottom: 20rpx;
		}	
		.num {
			margin-top: 30rpx;
			font-weight: bold;
			color: #000;
		}
	}
	.account-code{width: 100%;height: 100rpx;line-height: 100rpx;text-align: center;color: #000;}
	.success_logo{width: 200rpx;height: 200rpx;margin: 0 auto;}
	.success_logo image{width: 200rpx;height: 200rpx;display: block;margin-top: 50rpx;}
	.success_message_title{width: 100%;overflow: hidden;font-size: 42rpx;color: #000;font-weight: bold;text-align: center;}
	.success_message{width: 100%;height: 100%;background: url(../../plugins/images/success_back.jpg)no-repeat;background-size: cover;}
	.sure_btn{width: 60%;height: 80rpx;margin: 30rpx auto;text-align: center;background: #81d8d0;
	border-radius: 15rpx;outline: none;border: none;line-height: 80rpx;color: #fff;font-weight: bold;}
	
	.zhanwei{width: 100%;height: 100rpx;}
	.faile_message{width: 100%;height: 100%;background: url(../../plugins/images/faile_back.jpg)no-repeat;background-size: cover;position: relative;}
	.faile_message_title{position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 100%;
	height: 80rpx;text-align: center;color: #000;font-size: 42rpx;font-weight: bold;}




</style>
