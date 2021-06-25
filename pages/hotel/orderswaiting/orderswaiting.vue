<template>
	<view class="order_waiting_app">
		<view class="order_waiting_app-header">
			<view style="width: 200rpx;height: 42rpx;margin: 0 auto;">
				<image :src="img_url+'/hotel/righr_back.png'" mode="" class="count-logo" ></image>
				<text style="font-size: 36rpx;color: #fff;font-weight: bold;">等待确认</text>
			</view>
		</view>
		<view class="check-link">
			<view class="check-link-title">
				平台一般会在5分钟内为您反馈结果，请您耐心等待~
			</view>
			<view class="check-list">
				<text>订单详情</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
			};
		}
	}
</script>

<style lang="less">
	.order_waiting_app{width: 100%;height: 100%;position: relative;background: #F1F3F4;}
	.order_waiting_app-header{width: 100%;height: 300rpx;background: #FF7B10;padding-top: 40rpx;}
	.count-logo{width: 42rpx;height: 42rpx;display: block;float: left;margin-top: 8rpx;margin-right: 15rpx;}
	.check-link{width: 100%;height: 300rpx;position: absolute;top: 200rpx;left: 0;z-index: 999;background: #fff;border-radius: 20rpx 20rpx 0 0;}
	.check-link-title{font-size: 25rpx;color: #000;text-align: center;margin-top: 40rpx;}
	.check-list{width: 100%;height: 60rpx;display: flex;justify-content: space-evenly;margin-top: 80rpx;}
	.check-list text{display: block;width: 150rpx;height: 60rpx;font-size: 28rpx;line-height: 60rpx;text-align: center;border: 2rpx solid #FF7B10;
border-radius: 30rpx;color: #FF7B10;}
</style>
