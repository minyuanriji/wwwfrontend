<template>
	<view class="personalCenter">
		<view class="personalCenter-top">
			<image src="../../plugins/images/extensions/o2o/shuiguotu.png"  class="personal-logo" @click="setMessage"></image>
			<view class="personal_nicken_ID">
				<view class="personal_nicken">小伙子</view>
				<view class="personal_id">ID:123456</view>
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
