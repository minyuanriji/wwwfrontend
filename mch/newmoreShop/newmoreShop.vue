<template>
	<view class="more-shop">
		<com-nav-bar left-icon="back" :title="title" @clickLeft="back"></com-nav-bar>
		
		<view v-if="result == 1" class="success_message">
			<view class="zhanwei"></view>
			<view class="success_logo">
				<image :src="img_url+'/success_logo.png'" mode=""></image>				
			</view>
			<view class="success_message_title">
				核销成功
			</view>
			<view class="sure_btn" @click="gointo">
				完成
			</view>
		</view>
		
		<view v-if="result == 2" class="faile_message" >
			
			<view class="faile_message_title">
				<view style="font-size: 42rpx;font-weight: bold;margin-bottom:10rpx;">出错啦</view>
				{{msg}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				img_url: this.$api.img_url,
				id:'',
				title:'核销进度',
				msg:'',
				result: 0
			}
		},
		onLoad(options) {
			let that=this
			that.id=options.id
			uni.showLoading({
			    title: '核销中'
			});
			that.$http.request({
				url: that.$api.default.verificationProgress,
				method: 'POST',
				data: {
					id:options.id,
				}
			}).then(res => {
				uni.hideLoading();
				if(res.code==0){
					that.result = 1;
				}else{
					that.result = 2;
					that.msg=res.msg					
					// setTimeout(function(){
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },2000)
				}
			})		
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
	.faile_message{width: 100%;height: 100%;text-align:center;background:#F7F7F7;padding-top:50rpx;}
	.faile_message_title{margin-left:20%;border:1px solid #C90A0C;border-radius: 30rpx; padding-top:30rpx;padding-bottom:30rpx;width: 60%;text-align: center;color:#C51A15;}


</style>
