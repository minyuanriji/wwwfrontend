<template>
	<view class="verification-app">
		<view class="verification-code">
			<view class="code-logo">
				<image src="../../plugins/images/success_back.jpg" mode=""></image>
				<text>未使用</text>
			</view>
		</view> 
		<view class="address-list">
			<view class="address_location">
				<image :src="img_url+'/ver_location_1.png'"></image>
				<input type="text" value="" />
				<image :src="img_url+'/erroDelete.png'" mode=""></image>
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

<style lang="less" scoped>
	.verification-app{width: 100%;}
	.verification-code{width: 100%;height: 500rpx;position: relative;}
	.code-logo{width: 300rpx;height: 400rpx;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
	.code-logo image{width: 300rpx;height: 300rpx;display: block;}
	.code-logo text{display: block;width: 100%;height: 100rpx;text-align: center;line-height: 100rpx;}
	.address-list{width: 100%;height: 300rpx;background: #fff;box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.6);padding: 0 20rpx;}
	.address_location{width: 100%;height: 120rpx;border-bottom: 1rpx solid #BFBFBF;display: flex;}
	.address_location image{width: 50rpx;height: 50rpx;}
</style>
