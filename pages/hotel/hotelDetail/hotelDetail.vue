<template>
	<view class="hotel-detail-app">
		<view class="hotel-detai-header">
			<text>{{orderDetail.order.status_text}}</text>
		<!-- 	<text>房间将为您整晚保留，请安心入住</text> -->
		</view>
		<view class="hotel-detai-setAgain">
			<text v-if="orderDetail.action.is_payable==1">去支付</text>
			<text v-if="orderDetail.action.is_cancelable==1" @click="cancleOrder(orderDetail.order.id)">取消订单</text>
			<text v-if="orderDetail.action.is_refundable==1">退款/售后</text>
			<!-- <text>再次预订</text> -->
		</view>
		<view class="hotel-detail-prompt">
			<!-- <view class="hotel-detail-prompt-title">
				<text>免费取消</text>
				<text>预定后可随时取消订单，补商汇不收取任何费用</text>
			</view> -->
			<view class="hotel-detail-prompt-detail">
				<view class="hotel-detail-prompt-detail-title">
					<image :src="img_url+'/hotel/prompt-logo.png'" mode=""></image>
					<text>温馨提示</text>
				</view>
				<view class="hotel-detail-prompt-detail-list">
					<view class="hotel-detail-prompt-detail-item">
						<text></text>
						<text>不允许携带宠物</text>
					</view>
				</view>
			</view>
		</view>
		<view class="hotel-detail">
			<view class="hotel-detail-name">
				<image :src="img_url+'/shoplogo.png'" mode="" style="width: 100rpx;height: 24rpx;margin-top: 10rpx;"></image>
				<!-- <text>{{orderDetail.hotel.name}}</text> -->
				<!-- <image :src="img_url+'/hotel/right.png'" mode="" style="width: 10rpx;height: 16rpx;margin-top: 15rpx;"></image> -->
			</view>
			<view class="hotel-detail-product">
				<view class="hotel-detail-product-image">
					<image :src="orderDetail.hotel.thumb_url" mode=""></image>
				</view>
				<view class="hotel-detail-product-messgae">
					<view class="hotel-detail-product-messgae-name">
						{{orderDetail.hotel.name}} 
					</view>
					<!-- <view class="hotel-detail-product-messgae-facilities">
						<text>儿童乐园</text>
						<text>娱乐场/棋牌室</text>
					</view> -->
					<view class="hotel-phone-address">
						<text style="margin-bottom: 5rpx;">酒店联系方式 : {{orderDetail.hotel.contact_phone}}</text>
						<text>地址 :{{orderDetail.hotel.province_name}}{{orderDetail.hotel.city_name}}{{orderDetail.hotel.address}}</text>
					</view>
				</view>
			</view>
			<view class="hotel-phone-address-logo">
				<image :src="img_url+'/hotel/tellphone.png'" mode=""></image>
				<image :src="img_url+'/hotel/locations.png'" mode=""></image>
			</view>
			<view class="hotel-room-detail">
				<view class="hotel-room-detail-messahe">
					{{orderDetail.room.name}}-
					<text v-if="orderDetail.hotel.policy_breakfast==0">无早餐</text>
					<text v-if="orderDetail.hotel.policy_breakfast==1">有早餐</text>
					·{{orderDetail.order.booking_num}}间·{{orderDetail.order.booking_days}}天
				</view>
				<view class="hotel-room-detail-specifications">
					{{orderDetail.room.room_size}}m²|
					<text v-if="orderDetail.room.bed_type=='single'">单床</text>
					<text v-if="orderDetail.room.bed_type=='double'">双床</text>
					<text v-if="orderDetail.room.bed_type=='double'">大床</text>
					{{orderDetail.room.bed_width}}m |可住{{orderDetail.room.people_num}}人
				</view>
				<view class="hotel-room-detail-time">
					<view>
						<text style="color: #000;">{{orderDetail.order.booking_start_date}}</text>
						<text>入住</text>
					</view>
					<view>
						<text style="color: #000;">{{orderDetail.order.end_date}}</text>
						<text>14:00前离店</text>
					</view>
				</view>
			</view>
			<view class="passengers-message" v-for="(item,index) in orderDetail.order.booking_passengers" :key='index'>
				<view>
					<text>入住人</text>
					<text>{{item.name}}</text>
				</view>
				<view>
					<text>联系手机</text>
					<text>{{item.mobile}}</text>
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
				orderDetail:'',
				hotel_order_id:'',
			};
		},
		onLoad(options) {
			if(options&&options.hotel_order_id){
				this.hotel_order_id=options.hotel_order_id
				this.getOrderDetail(options.hotel_order_id)
			}
		},
		methods:{
			getOrderDetail(hotel_order_id){//获取订单详情
				this.$http
					.request({
						url: this.$api.hotel.getOrderdetail,
						method: 'POST',
						data:{
							hotel_order_id:hotel_order_id
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.orderDetail=res.data
						}else{
							this.$http.toast(res.msg);
						}
				});
			},
			cancleOrder(id){
				this.$http
					.request({
						url: this.$api.hotel.cancleOrder,
						method: 'POST',
						data:{
							hotel_order_id:id
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.$http.toast('取消订单成功');
							this.getOrderDetail(this.hotel_order_id)
						}else{
							this.$http.toast(res.msg);
						}
				});
			}
		
		}
	}
</script>

<style lang="less">
	.hotel-detail-app{width: 100%;overflow: hidden;background: #FF7B10;}
	.hotel-detai-header{width: 100%;overflow: hidden;padding: 0 20rpx;margin-top: 50rpx;}
	.hotel-detai-header text{display: block;width: 100%;overflow: hidden;}
	.hotel-detai-header text:nth-of-type(1){font-size: 60rpx;color: #fff;}
	.hotel-detai-header text:nth-of-type(2){color: #F3F3F3;font-size: 24rpx;}
	.hotel-detai-setAgain{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;margin: 40rpx 0 20rpx 0;}
	.hotel-detai-setAgain text{display: block;width: 194rpx;height: 60rpx;text-align: center;line-height: 60rpx;background: rgba(255, 255, 255, 0.85);
border-radius: 31px;color: #0F0F0F;font-size: 26rpx;}
.hotel-detail-prompt{width: 100%;overflow: hidden;background: #fff;border-radius: 20rpx 20rpx 0 0;border-bottom: 6rpx solid #F1F3F4;}
.hotel-detail-prompt-title{width: 90%;height: 70rpx;font-size: 25rpx;line-height: 70rpx;margin: 0 auto;border-bottom: 1rpx solid #E6E6E6;}
.hotel-detail-prompt-title text:nth-of-type(1){color: #14C4AD;}
.hotel-detail-prompt-title text:nth-of-type(2){color: #000;}
.hotel-detail-prompt-detail-title{width: 90%;overflow: hidden;font-size: 28rpx;color: #000;margin: 10rpx auto 0;}
.hotel-detail-prompt-detail-title image{width: 30rpx;height: 30rpx;margin-top: 8rpx;display: block;float: left;margin-right: 15rpx;}
.hotel-detail-prompt-detail-list{width: 90%;margin: 0 auto ;overflow: hidden;}
.hotel-detail-prompt-detail-item{width: 100%;overflow: hidden;line-height: 50rpx;font-size: 25rpx;margin: 10rpx 0;}
.hotel-detail-prompt-detail-item text{display: inline-block;}
.hotel-detail-prompt-detail-item text:nth-of-type(1){width: 10rpx;height: 10rpx;background: #000;border-radius: 50%;margin-right: 20rpx;}
.hotel-detail{width: 100%;overflow: hidden;background: #fff;padding: 20rpx 0;}
.hotel-detail-name{width: 90%;overflow: hidden;margin: 0 auto;}
.hotel-detail-name image{display: block;float: left;}
.hotel-detail-name text{display: block;float: left;font-size: 28rpx;color: #000;margin: 0 15rpx;}
.hotel-detail-product{width: 90%;overflow: hidden;margin: 30rpx auto 10rpx;display: flex;justify-content: space-evenly;}
.hotel-detail-product-image image{display: block;width: 120rpx;height: 120rpx;margin-top: 25rpx;}
.hotel-detail-product-messgae{width: 450rpx;overflow: hidden;}
.hotel-detail-product-messgae-name{width: 100%;overflow: hidden;font-size: 30rpx;color: #000;overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;}
.hotel-detail-product-messgae-facilities{font-size: 25rpx;margin: 10rpx 0;width: 100%;}
.hotel-detail-product-messgae-facilities text{margin: 0 5rpx;}
.hotel-phone-address{font-size: 25rpx;width: 100%;}
.hotel-phone-address text{display: block;}
.hotel-phone-address text:nth-of-type(2){text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;}
.hotel-phone-address-logo{width: 40%;overflow: hidden;margin: 0 auto;}
.hotel-phone-address-logo image{width: 60rpx;height: 60rpx;margin: 0 35rpx;}
.hotel-room-detail{width: 90%;margin: 25rpx auto ;overflow: hidden;border-top: 1rpx solid #E6E6E6;}
.hotel-room-detail-messahe{font-size: 28rpx;color: #000;width: 80%;margin-bottom: 10rpx;margin-top: 20rpx;}
.hotel-room-detail-specifications{font-size: 25rpx;margin-bottom: 15rpx;}
.hotel-room-detail-time{width: 100%;overflow: hidden;display: flex;justify-content: space-between;font-size: 25rpx;}
.passengers-message{width: 90%;overflow: hidden;margin: 0 auto 20rpx;border: 1rpx solid #E6E6E6;;border-radius: 30rpx;padding: 20rpx;}
.passengers-message view{width: 100%;height: 70rpx;line-height: 70rpx;}
.passengers-message view text{display: inline-block;}
.passengers-message view text:nth-of-type(1){font-size: 28rpx;width: 150rpx;}
.passengers-message view text:nth-of-type(2){font-size: 28rpx;color: #000;}
</style>
