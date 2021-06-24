<template>
	<view class="orderSure_app">
		<view class="order_timer">
			<view class="order_timer_interval">
				<view>
					<text>入住时间</text>
					<text>{{beginTime}}</text>
				</view>
				<view>
					<text>离店时间</text>
					<text>{{privewMessage.end_day}}</text>
				</view>
			</view>
			<view class="order_timer_count">
				  共{{privewMessage.days}}晚
			</view>
		</view>
		<view class="order-message">
			<view class="order_hotel_info">
				<view class="order_hotel_logo">
					<image :src="privewMessage.hotel_info.thumb_url" mode=""></image>
				</view>
				<view class="order_hotel-detail">
					<view>{{privewMessage.hotel_info.name}}</view>
					<view>
						<text>{{privewMessage.booking_item.product_name}}</text>
						<text v-if="privewMessage.booking_item.bed_type=='single'">单床</text>
						<text v-if="privewMessage.booking_item.bed_type=='double'">双床</text>
						<text v-if="privewMessage.booking_item.bed_type=='big'">大床</text>
						<text v-if="privewMessage.booking_item.window=='no'">无窗</text>
						<text v-if="privewMessage.booking_item.window=='out'">外窗</text>
						<text v-if="privewMessage.booking_item.window=='part_no'">部分无窗</text>
						<text v-if="privewMessage.booking_item.window=='inner'">内窗</text>
						<text v-if="privewMessage.booking_item.window=='part_inner'">部分内窗</text>
						<text v-if="privewMessage.booking_item.ban_smoking==1">禁烟</text>
					</view>
					<view>{{privewMessage.hotel_info.address}}</view>
				</view>
			</view>
			<!-- <view class="order_hotel_notice">
				<view v-for="item in 5" :key='item'>
					<text></text>
					<text>仅接待大陆客人</text>
				</view>
			</view> -->
		</view>
		<view class="check_in_message">
			<view class="check_in_message_title">
				<text style="color: #FF5D0D;font-weight: bold;margin-right: 10rpx;">|</text>
				<text style="font-size: 28rpx;color: #000;font-weight: 600;">入住信息</text>
			</view>
			<view class="check_in_message_form">
				<view>
					<text>姓名</text>
					<input type="text" v-model="form.name" placeholder="请填写姓名"/>
				</view>
				<view>
					<text>联系手机</text>
					<input type="text" v-model="form.phone"  placeholder="请填写联系手机" />
				</view>
				<view>
					<text>房间数</text>
					<input type="text" v-model="form.roomNum"  placeholder="请填写房间数"/>
				</view>
				<view>
					<text>到店时间</text>
					<input type="text" placeholder="14:00点后办理入住" disabled/>
				</view>
			</view>
		</view>
		<view class="check_in_message" style="margin-bottom: 100rpx;">
			<view class="check_in_message_title">
				<text style="color: #FF5D0D;font-weight: bold;margin-right: 10rpx;">|</text>
				<text style="font-size: 28rpx;color: #000;font-weight: 600;">优惠</text>
			</view>
			<view class="check_in_message_form">
				<view>
					<text>促销优惠</text>
					<text style="width:450rpx ;color: #EF4A1A;">红包全额抵扣</text>
				</view>
			</view>
		</view>
		<view class="goPAy">
			<view class="goPAy_left">
				<text style="font-size: 30rpx;color: #000;">红包支付</text>
				<text style="font-size: 25rpx;text-decoration: line-through;margin: 0 5rpx;">￥{{privewMessage.booking_item.product_price}}</text>
				<text style="color:#FF5D0D ;font-size: 28rpx;font-weight: bold;">2000红包</text>
				<text style="display: block;font-size: 25rpx;">已减￥{{privewMessage.booking_item.product_price}}</text>
			</view>
			<view class="goPAy_right" @click="gopay">
				<button type="default">去支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {isEmpty} from '../../../common/validate.js'
	export default {
		data() {
			return {
				form:{
					name:'',
					phone:'',
					roomNum:'',
				},
				beginTime:'',
				privewMessage:'',			
			};
		},
		onLoad(options){
			if(options){
				this.beginTime=options.start_date
				this.getorderprivew(options.unique_id,options.product_code,options.start_date,options.days)
			}			
		},
		methods:{
			getorderprivew(unique_id,product_code,start_date,days){//获取预览订单信息
				this.$http
					.request({
						url: this.$api.hotel.getpreviewOrder,
						method: 'POST',
						data:{
							unique_id:unique_id,
							product_code:product_code,
							start_date:start_date,
							days:days,
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.privewMessage=res.data
						}else{
							this.$http.toast(res.msg);
						}
				});
			},
			gopay(){ //去支付
				if (isEmpty(this.form.name)) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (isEmpty(this.form.phone)) {
					uni.showToast({
						title: '请填写联系电话',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (isEmpty(this.form.roomNum)) {
					uni.showToast({
						title: '请填写房数数',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
			}
		}
	}
</script>

<style lang="less">
	.orderSure_app{width: 100%;overflow: hidden;background: url(https://dev.mingyuanriji.cn/web/static/hotel/orderBack.png)no-repeat;background-size: 100% 100%;}
	.order_timer{width: 720rpx;height: 135rpx;background: #fff;margin: 30rpx auto;border-radius: 20rpx;
	display: flex;justify-content: space-between;}
	.order_timer_interval{display: flex;justify-content: space-evenly;width: 80%;}
	.order_timer_interval view{width: 50%;height: 135rpx;}
	.order_timer_interval view text{display:block ;width: 100%;text-align: center;height: 50%;line-height: 65rpx;}
	.order_timer_interval view text:nth-of-type(1){font-size: 25rpx;color: #000;}
	.order_timer_interval view text:nth-of-type(2){font-size: 28rpx;color: #FF5D0D;}
	.order_timer_count{width: 20%;height: 100%;line-height: 135rpx;text-align: center;font-size: 28rpx;color: #000;}
	.order-message{width: 720rpx;overflow: hidden;background: #fff;border-radius: 20rpx;margin: 0 auto;}
	.order_hotel_info{width: 100%;overflow: hidden;padding: 20rpx;display: flex;justify-content: space-evenly;}
	.order_hotel_logo{width: 200rpx;height: 200rpx;}
	.order_hotel_logo image{width: 200rpx;height: 200rpx;}
	.order_hotel-detail view:nth-of-type(1){font-size: 30rpx;color: #000000;width: 420rpx;overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;}
	.order_hotel-detail view:nth-of-type(2){font-size: 25rpx;margin: 10rpx 0;}
	.order_hotel-detail view:nth-of-type(2) text{margin: 0 10rpx;}
	.order_hotel-detail view:nth-of-type(3){font-size: 25rpx;}
	.order_hotel_notice{width: 100%;overflow: hidden;padding: 0 20rpx;background: #F3F3F3;border-radius: 0 0 20rpx 20rpx;}
	.order_hotel_notice view{margin: 0rpx 0 10rpx 0;}
	.order_hotel_notice text{display: inline-block;}
	.order_hotel_notice text:nth-of-type(1){width: 10rpx;height: 10rpx;background: #000;border-radius: 50%;margin: 0 10rpx;}
	.order_hotel_notice text:nth-of-type(2){font-size: 25rpx;}
	.check_in_message{width: 720rpx;overflow: hidden;background: #fff;margin: 20rpx auto;border-radius: 20rpx;padding: 20rpx;}
	.check_in_message_form{width: 100%;overflow: hidden;}
	.check_in_message_form view{width: 100%;height: 80rpx;}
	.check_in_message_form view text{display: block;float: left;width: 150rpx;font-size: 28rpx;color: #000;line-height: 80rpx;text-align: left;}
	.check_in_message_form view input{width: 450rpx;height: 80rpx;font-size: 28rpx;color: #000;line-height: 80rpx;border-bottom: 1rpx dashed #808080;display: block;float: left;}
	.goPAy{width: 100%;height: 120rpx;background: #fff;padding:20rpx;display: flex;justify-content: space-between;}
	.goPAy_right button{width: 260rpx;height: 80rpx;background: #FF5D0D;line-height: 80rpx;border-radius: 40rpx;color: #fff;outline: none;}






</style>
