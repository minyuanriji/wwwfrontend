<template>
	<view class="creditResult_app">
		<view class="creditResult_app-detail">
			<view>
				<image :src="img_url+'/huafe-logo.png'"></image>
				<text>支付成功</text>
			</view>
			<view style="font-size: 28rpx;">
				预计10分钟到账 请注意到账信息
			</view>
			<view>
				<button type="default" @click="linkTo">确定</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				img_url: this.$api.img_url,
			}
		},
		methods:{
			linkTo(){
				uni.redirectTo({
					url:'../index/index'
				})
			}
		}
	}
</script>
<style lang="less">
	.creditResult_app{width: 100%;height: 100%;background: #ff7104;position: relative;}
	.creditResult_app-detail{width: 100%;height: 300rpx;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
	.creditResult_app-detail view{width: 100%;overflow: hidden;text-align: center;line-height: 88rpx;color: #fff;}
	.creditResult_app-detail view image{display: inline-block;width: 92rpx;height: 88rpx;margin-right: 10rpx;}
	.creditResult_app-detail view text{display: block;height: 88rpx;line-height: 88rpx;color: #fff;font-size: 40rpx;font-weight: bold;}
	.creditResult_app-detail button{width: 60%;height: 80rpx;line-height: 80rpx;margin-top: 50rpx;outline: none;border: none;}
</style>