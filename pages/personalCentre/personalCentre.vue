<template>
	<view class="personalCenter">
		<view class="personalCenter-top">
			<image src="../../plugins/images/extensions/o2o/shuiguotu.png"  class="personal-logo" @click="setMessage"></image>
			<view class="personal_nicken_ID">
				<view class="personal_nicken">小伙子</view>
				<view class="personal_id">ID:123456</view>
			</view>
		</view>
		<view class="jx-content-box">
			<view class="jx-header-btm">
				<view class="jx-btm-item">
					<view class="jx-btm-num">1</view>
					<view class="jx-btm-text">余额</view>
				</view>
				<view class="jx-btm-item">
					<view class="jx-btm-num">2</view>
					<view class="jx-btm-text">订单</view>
				</view>
				<view class="jx-btm-item last">
					<view class="jx-btm-num">3</view>
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
					<!-- <view class="jx-cell-sub">查看全部订单</view> -->
				</view>
			</jx-list-cell>
		</view>
		<view class="personalCenter-item">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4)">
				<view class="jx-cell-header">
					<view class="jx-cell-title" style="font-weight: 700;">我的设置</view>
					<!-- <view class="jx-cell-sub">查看全部订单</view> -->
				</view>
			</jx-list-cell>
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
				
			}
		},
		onLoad() {
			
		},
		methods:{
			href(page) {
				if(page==1){
					let mch_id=53
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
			},
			setMessage(){
				uni.navigateTo({
					url:'./personalCentreSET/personalCentreSET'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personalCenter{width:100%;overflow:hidden;}
	.personalCenter-top{width: 100%;overflow: hidden;padding: 20upx;background: #fff;margin-top: 20rpx;}
	.personal-logo{width: 128rpx;height: 128rpx;display: block;border-radius: 50px;float: left;}
	.personal_nicken_ID{float: left;margin-left: 30rpx;}
	.personal_nicken{margin: 10upx 0;}
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
</style>
