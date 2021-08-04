<template>
	<view class="giftsubmit-app">
		<view class="giftsubmit-detail">
			<image :src="detail.cover_pic" mode=""></image>
			<view class="giftsubmit-detail-product">
				<text>{{detail.title}}</text>
				<text>{{detail.descript}}</text>
			</view>
		</view>
		<view class="giftbagDetail-service">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click='href(detail.id)'>
				<view class="jx-cell-header" style="height: 80rpx;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">内含{{detail.item_count}}项服务</view>		
				</view>
				<view class="jx-cell-header" style="height: 80rpx;margin-left: 400rpx">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">详情</view>		
				</view>
			</jx-list-cell>
		</view>
		<view class="giftbagDetail-service">
			<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
				<view class="jx-cell-header" style="height: 80rpx;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">需使用红包支付</view>
				</view>
				<view class="jx-cell-header" style="margin-left: 350rpx;color: #FF5A0E;height: 80rpx;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">{{integral_deduction_price}}元</view>
				</view>
			</jx-list-cell>
		</view>
		<view class="bottom">
			<text>剩余红包：{{integrals}}</text>
			<text @click="buy(detail.id)">去支付</text>
		</view>
		<com-modal :button="button" :show="modal" @click="handleClick" @cancel="hide" title="提示" content="您没有设置支付密码,是否需要跳转设置？"></com-modal>
		<com-payment-password ref="paymentPassword" :show="cashFlag" :value="paymentPwd" :digits="6"
		@submit="checkPwd" @cancel="togglePayment" @checkSafePwd="safePasswork"></com-payment-password>
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
				integral_deduction_price:'',
				integrals:'',
				detail:'',
				modal:false,//模态弹窗
				button:[],
				cashFlag: false,
				paymentPwd: '',
				is_transaction_password:true,//是否设置过支付密码
				order_id:'',//订单ID
			};
		},
		onLoad(options) {
			if(options&&options.pack_id){
				this.prevwDetail(options.pack_id)
			}
			this.button = this.globalSet('btnCol','确定');
		},
		onShow() {
			this.initSetting()
		},
		methods:{
			href(id){ //更过服务
				uni.navigateTo({
					url:'../giftbagCapacity/giftbagCapacity?pack_id='+id
				})
			},
			prevwDetail(id){ //预览订单
				this.$http.request({
					url: this.$api.package.previewOrder,
					method: 'POST',
					data: {
						pack_id:id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.detail=res.data.detail
						this.integral_deduction_price=res.data.integral_deduction_price
						this.integrals=res.data.integrals
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			buy(id){//生成订单并且支付
				this.$http.request({
					url: this.$api.package.productOrder,
					method: 'POST',
					data: {
						pack_id:id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.order_id=res.data.order_id
						if(!this.is_transaction_password){
							this.modal = true;
							return;
						}
						this.cashFlag=true
						this.$refs.paymentPassword.modalFun('show');						
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			payMoney(order_id,trade_pwd){ //红包个人支付
				this.$http.request({
					url: this.$api.package.payMoney,
					method: 'POST',
					data: {
						order_id:order_id,
						trade_pwd:trade_pwd
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.$refs.paymentPassword.modalFun('hide');
						this.$http.toast('支付成功');
						setTimeout(()=>{
							uni.navigateTo({
								url:'../orderList/orderList'
							})
						},2000)
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			hide() {
				this.modal = false;
			},
			togglePayment() {
				this.cashFlag = false;
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					this.modal = false;
				} else {
					uni.navigateTo({
						url:'../../user/payment/password'
					})
				}
				this.hide();
			},
			checkPwd(e) { //输入密码
				console.log(e)
			},
			safePasswork(e){ //密码校验
				this.paymentPwd = e.passwork;
				this.payMoney(this.order_id,this.paymentPwd)
			},
			initSetting() { //获取是否设置支付密码
				this.$http
					.request({
						url: this.$api.plugin.extensions.cash.setting
					})
					.then(res => {
						if (res.code == 0) {
							this.is_transaction_password = res.data.user_info.is_transaction_password;
						} else {
							this.$http.toast(res.msg);
						}
					});
			},
			
			
		}
	}
</script>

<style lang="less" scoped>
	.giftsubmit-app{width: 100%;overflow: hidden;}
	.giftsubmit-detail{width: 100%;margin: 10rpx auto 0;overflow: hidden;background: #fff;padding: 20rpx;}
	.giftsubmit-detail image{width: 240rpx;height: 200rpx;display: block;float: left;}
	.giftsubmit-detail-product{float: left;width: 450rpx;margin-left: 10rpx;overflow: hidden;}
	.giftsubmit-detail-product text{display: block;width: 100%;}
	.giftsubmit-detail-product text:nth-of-type(1){overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #000;font-size: 34rpx;}
	.giftsubmit-detail-product text:nth-of-type(2){overflow: hidden;font-size: 25rpx;}
	.giftbagDetail-service{margin: 5rpx 0;}
	.bottom{position: fixed;left: 0;bottom: 0;width: 100%;height: 100rpx;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);background: #fff;}
	.bottom text{display: inline-block;}
	.bottom text:nth-of-type(1){line-height: 100rpx;margin-left: 50rpx;font-size: 30rpx;color: #FF5A0E;font-weight: bold;}
	.bottom text:nth-of-type(2){width: 200rpx;height: 60rpx;background: red;text-align: center;line-height: 60rpx;border-radius: 30rpx;
	margin-left: 200rpx;color: #fff;}
</style>
