<template>
	<view class="installCenter-app">
		<view class="installCenter-set">
			<view @click="link(1)">
				<image src="../../../static/img/accountSettings.png" mode=""></image>
				<text>帐号设置</text>
				<image src="../../../static/img/arrow-right.png" mode=""></image>
			</view>
			<view @click="link(2)">
				<image src="../../../static/img/shopSetting.png" mode=""></image>
				<text>店铺设置</text>
				<image src="../../../static/img/arrow-right.png" mode=""></image>
			</view>
			<view>
				<image src="../../../static/img/money.png" mode=""></image>
				<text>结算设置</text>
				<image src="../../../static/img/arrow-right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			link(index){
				if(index==1){
					uni.navigateTo({
						url:'./accountSetting/accountSetting'
					})
				}
				if(index==2){
					uni.navigateTo({
						url:'../shopSetting/shopSetting'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.installCenter-app{width: 100%;height: 100%;}
	.installCenter-set{width: 100%;overflow: hidden;padding-top: 100rpx;}
	.installCenter-set view{width: 90%;overflow: hidden;margin: 0 auto 50rpx;border-radius: 10rpx;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.5);box-sizing: border-box;padding: 0rpx 20rpx;}
	.installCenter-set view image:nth-of-type(1){float: left;display: block;width: 40rpx;height: 40rpx;margin-top: 25rpx;}
	.installCenter-set view text{float: left;display: block;line-height: 90rpx;font-size: 30rpx;color: #000;margin-left: 30rpx;}
	.installCenter-set view image:nth-of-type(2){float: right;display: block;width: 40rpx;height: 40rpx;margin-top: 25rpx;}
</style>
