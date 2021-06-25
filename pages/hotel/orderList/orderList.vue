<template>
	<view class="hotel-orderList-app">
		<view class="hotel-orderList-status">
			<view v-for="(item,index) in list" :key='index' :class="switchIndex==index?'active':''" @click="checkIndex(index,item.status)">
				{{item.title}}
			</view>
		</view>
		<view class="hotel-orderLis">
			<view class="hotel-orderLis-item" v-for="item in 8" :key='item' @click="linkTo">
				<view class="hotel-orderLis-item-title">
					<image :src="img_url+'/shoplogo.png'" mode="widthFix"></image>
					<text>酒店名字啥大红花</text>
					<text>已确定</text>
				</view>
				<view class="hotel-orderLis-item-detail">
					<view class="hotel-orderLis-item-detail-image">
						<image src="../../../plugins/images/extensions/o2o/shuiguotu.png" mode=""></image>
					</view>
					<view class="hotel-orderLis-item-detail-message">
						<view class="hotel-orderLis-item-detail-name">
							酒店名字啥大红花adfnsadfjisas
							ahsgdchasg
						</view>
						<view class="hotel-orderLis-item-detail-selectType">
							豪华大套间-24小时免费接机:车程
							10分钟 有早餐·1间·1晚
						</view>
						<view class="hotel-orderLis-item-detail-time">
							入离日期;6月18日-6月19日
						</view>
					</view>
					<view class="hotel-orderLis-item-detail-price">
						<text>￥0.00</text>
						<text>x1</text>
					</view>
				</view>
				<view class="hotel-orderLis-item-count">
					<text>共1件 合计</text>
					<text>￥0.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				list:[
					{
						title:'全部',
						status:0
					},
					{
						title:'待付款',
						status:1
					},
					{
						title:'待确认',
						status:2
					},
					{
						title:'已完成',
						status:3
					},
					// {
					// 	title:'待评价',
					// 	status:4
					// },
					{
						title:'退款/售后',
						status:4
					}
				],
				switchIndex:0
			};
		},
		methods:{
			checkIndex(index,status){//选择状态
				this.switchIndex=index
			},
			linkTo(){//跳转到订单详情
				uni.navigateTo({
					url:'../hotelDetail/hotelDetail'
				})
			}
		}
	}
</script>

<style lang="less">
	.hotel-orderList-app{width: 100%;overflow: hidden;}
	.hotel-orderList-status{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;}
	.hotel-orderList-status view{font-size: 26rpx;line-height: 80rpx;width: 16%;text-align: center;}
	.active{color: rgb(255, 113, 4);border-bottom: 6rpx solid  rgb(255, 113, 4);font-weight: bold;}
	.hotel-orderLis{width: 100%;overflow: hidden;margin: 20rpx 0 80rpx 0;}
	.hotel-orderLis-item{width: 96%;overflow: hidden;padding: 20rpx;background: #FFFFFF;margin: 20rpx auto;border-radius: 20rpx;
	 box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);}
	.hotel-orderLis-item-title{width: 100%;overflow: hidden;display: flex;justify-content: space-between;}
	.hotel-orderLis-item-title image{width: 100rpx;margin-top: 8rpx;}
	.hotel-orderLis-item-title text{font-size: 26rpx;color: #000;display: inline-block;}
	.hotel-orderLis-item-title text:nth-of-type(1){width: 70%;}
	.hotel-orderLis-item-title text:nth-of-type(2){color: #FF7B10;}
	.hotel-orderLis-item-detail{display: flex;justify-content: space-between;margin: 25rpx 0;}
	.hotel-orderLis-item-detail-image{width: 150rpx;height: 150rpx;margin-top: 20rpx;}
	.hotel-orderLis-item-detail-image image{display: block;width: 150rpx;height: 150rpx;}
	.hotel-orderLis-item-detail-message{width: 60%;overflow: hidden;display: flex;justify-content: space-evenly;flex-wrap: wrap;}
	.hotel-orderLis-item-detail-message view{width: 100%;margin-bottom: 10rpx;}
	.hotel-orderLis-item-detail-name{font-size: 28rpx;color: #000;
	display: -webkit-box;            
	-webkit-box-orient: vertical;     
	-webkit-line-clamp: 2;          
	overflow: hidden; }
	.hotel-orderLis-item-detail-selectType{font-size: 25rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden; }
	.hotel-orderLis-item-detail-time{font-size: 25rpx;}
	.hotel-orderLis-item-detail-price{overflow: hidden;}
	.hotel-orderLis-item-detail-price text{display: block;text-align: center;font-size: 25rpx;color:#FF7B10 ;}
	.hotel-orderLis-item-count{width: 100%;overflow: hidden;text-align: right;margin: 30rpx 0 20rpx 0;}
	.hotel-orderLis-item-count text:nth-of-type(1){font-size: 25rpx;}
	.hotel-orderLis-item-count text:nth-of-type(2){font-size: 35rpx;color: #FF7B10;font-weight: bold;}
</style>
