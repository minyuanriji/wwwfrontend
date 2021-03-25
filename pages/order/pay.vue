<template>
	<view class="cart-root">
		<!-- <view class="status_bar" style="background: #bc0100;"></view>
		<view :class="['status_bar2',showBool?'show':'hide']" :style="{'opacity':opacity,'background':'#ffffff'}"></view> -->
		<com-nav-bar @clickLeft="back" left-icon="back" title="提交订单" :status-bar="true" :background-color="navBg" :border="false" :color="navCol"></com-nav-bar>
		<!-- 背景图，可自定义 -->
		<view class="cart-bg" :style="{background:'url('+bg_url+')'}"></view>

		<!-- <view class="cart-title" style="background: #bc0100;">
			确认支付
			<view class="iconfont icon-fanhui back" @tap="back"></view>
		</view> -->

		<view class="mainContent">
			<view class="up">
				<view class="balance">
					<text>账户余额:</text>

					<view><text class="price">{{payData.balance}}</text>元</view>
				</view>
				<view class="pay-content">
					<view class="pay-title">支付金额</view>
					<view class="pay-price" :style="{color:textColor}" v-if="payData"><text class="pay-icon">&yen;</text>{{(payData.amount).toFixed(2)}}</view>
					<view class="numbering">订单编号：{{payData.orderNo}}</view>
				</view>
			</view>
			<view class="down" v-if="payData.amount">
				<view class="down-item" v-for="(item,index) in payData.supportPayTypes" :key="index">
					<view class="item-left">
						<image class="item-img" :src="img_url+'images/pay/'+item+'.png'" mode=""></image>
						<text v-if="item == 'wechat'">微信支付</text>
						<text v-if="item == 'alipay'">支付宝支付</text>
						<text v-if="item == 'balance'">余额支付</text>
					</view>
					<view class="item-right-box" @tap="switchIcon(index)">
						<view v-if="index == switchIndex" class="item-icon iconfont icon-dagou1" :style="{color:textColor}"></view>
						<view v-else class="item-right"></view>
					</view>
				</view>
			</view>
			<view class="down" v-else>
				<view class="down-item">
					<view class="item-left">
						<image class="item-img" :src="img_url+'images/pay/'+'balance'+'.png'" mode=""></image>
						<text>余额支付</text>
					</view>
					<view class="item-right-box">
						<view class="item-icon iconfont icon-dagou1" :style="{color:textColor}"></view>
						<!-- <view v-else class="item-right"></view> -->
					</view>
				</view>
			</view>

			<view class="confirmPay" @tap="toConfirmPay" :style="{background:textColor}">确认支付</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	// #ifdef MP-WEIXIN || APP-PLUS
	import {
		setPay
	} from '@/config/utils.js'
	// #endif
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				showBool: false, // 固定定位状态栏占位
				is_index : '',	//是否为拼团支付的标记
				active_id : '',	//团id
				opacity: 0,
				token: '',
				queue_id: '',
				payData: '',
				switchIndex: 0,
				textColor:"#BC0100",
				bg_url:'',
				navBg:'',
				navCol:'',
				goods_id : '',
			}
		},
		onLoad(options) {
			if(options.goods_id){
				this.goods_id = options.goods_id;
			}
			this.textColor = this.globalSet('textCol');
			this.bg_url = this.globalSet('imgUrl');
			this.navBg = this.globalSet('navBg');
			this.navCol = this.globalSet('navCol');
			
			this.token = options.token;
			this.queue_id = options.queue_id;
			let orderId = options.orderId ? options.orderId : '';
			// 拿到支付信息
			this.getPayData(orderId);
			// 加多一个是否为拼团支付的标记
			if(options.is_index){
				this.is_index = 1;
				this.active_id = options.active_id;
			}
			
		},
		methods: {
			back() {
				this.navBack();
			},
			// 获取支付信息
			getPayData(id) {
				this.$http.request({
					url: this.$api.order.toPay,
					showLoading: true,
					data: {
						token: this.token || '',
						queue_id: this.queue_id || '',
						id
					}
				}).then((res) => {
					if (res.code == 0) {
						console.log(res.data)
						this.payData = res.data;
						//拿到拼单详情id--拼团的时候才发请求
						// this.is_index==1?this.detailByOrder(res.data.orderNo):'';
					}
				})
			},
			
			// 3.1 点击支付的方法(拼团支付/直接支付)
			toConfirmPay(){
				
				this.is_index==1?this.detailByOrder(this.payData.orderNo):this.confirmPay();
			},
			
			// 2.0 拿到拼单详情id
			detailByOrder(order_no){
				this.$http.request({
					url: this.$api.plugin.group.detail_by_order,
					method:'post',
					data:{
						order_no : order_no
					}
				}).then((res)=>{
					if(res.code == 0){
						if(res.data){
							if(res.data.active_id){
								this.active_id = res.data.active_id;
								// console.log(this.active_id);
								// 这里再走拼团支付流程 
								this.confirmPay(true);
								
							}else{
								// 这里跳转拼团订单页面
								// uni.redirectTo({
								// 	url: '/mch/group-buy/orderList?goods_id='+this.goods_id
								// })
								this.confirmPay(false);
							}
						}else{
							this.confirmPay(false);
						}
						
					}
				})
			},
			
			// 请求支付接口，如果是余额支付
			confirmPay(flag){
				let self = this; 
				let flagStatus = flag;
				// 这个是拼团跳转页面		
				let groupUrl = '/mch/group-buy/detail?goods_id='+self.goods_id+'&detailId='+self.active_id;
				let orderListUrl = '/mch/group-buy/orderList?goods_id='+self.goods_id;
				if(self.payData.supportPayTypes[self.switchIndex]=='alipay'){
						self.$http.request({
							url: self.$api.moreShop.alipay,
							showLoading: true,
							method: 'post',
							data: {
								union_id: self.payData.union_id,
							}
						}).then(res=>{
							if(res.code==0){
								let url=res.data.codeUrl
								location.href=url
							}else{
								self.$http.toast(res.msg)
							}
						})
				}else{
					self.$http.request({
						url: self.$api.payment.doPay,
						showLoading: true,
						method: 'post',
						data: {
							union_id: self.payData.union_id,
							pay_type: self.payData.amount > 0 ? self.payData.supportPayTypes[self.switchIndex] : 'balance'    //self.payData.supportPayTypes[self.switchIndex]
						}
					}).then(res => {
						if (res.code == 0) {
							var priceflag = self.payData.amount > 0 ? self.payData.supportPayTypes[self.switchIndex] : 'balance';
							// self.payData.supportPayTypes[self.switchIndex]
							if (priceflag == 'balance') {
								self.$http.toast('支付成功!');
								setTimeout(() => {
									if(self.is_index==1){	//如果是拼团支付
										if(flagStatus){
											uni.redirectTo({
												url: groupUrl
											})
										}else{
											uni.redirectTo({
												url: orderListUrl
											})
										}
									}else{
										uni.redirectTo({
											url: '/pages/order/list?status=1'
										})
									}
								},500)
								return;
							}
							
							// #ifdef H5
							if(self.is_index==1){	//如果是拼团支付
							
								if(flagStatus){
									self.$wechatSdk.pay(res.data,groupUrl);
								}else{
									self.$wechatSdk.pay(res.data,orderListUrl);
								}	
							}else{
								self.$wechatSdk.pay(res.data,'/pages/order/list?status=1');	
							}
							// #endif
					
							// #ifdef MP-WEIXIN || APP-PLUS
							setPay(res.data, (result) => {
								console.log(12312);
								let _url = '/pages/order/list?status=1'
								if (result.success) {
									self.$http.toast("支付成功")
								} else {
									self.$http.toast("未支付")
									_url = '/pages/order/list?status=0'
								}
					
								setTimeout(() => {
									if(self.is_index==1){	//如果是拼团支付
										if(flagStatus){
											uni.redirectTo({
												url: groupUrl
											})
										}else{
											uni.redirectTo({
												url: orderListUrl
											})
										}
									}else{
										uni.redirectTo({
											url: _url
										})
									}
								},1000)
					
							});
							// #endif
						} else {
							self.$http.toast(res.msg);
							return
							setTimeout(() => {
								if(self.is_index==1){	//如果是拼团支付--跳转拼团订单列表
									uni.redirectTo({
										url: orderListUrl
									})
								}else{
									uni.redirectTo({
										url: '/pages/order/list?status=0'
									})
								}
							},1000)
						}
					})
				}
				// self.$http.request({
				// 	url: self.$api.payment.doPay,
				// 	showLoading: true,
				// 	method: 'post',
				// 	data: {
				// 		union_id: self.payData.union_id,
				// 		pay_type: self.payData.amount > 0 ? self.payData.supportPayTypes[self.switchIndex] : 'balance'    //self.payData.supportPayTypes[self.switchIndex]
				// 	}
				// }).then(res => {
				// 	if (res.code == 0) {
				// 		var priceflag = self.payData.amount > 0 ? self.payData.supportPayTypes[self.switchIndex] : 'balance';
				// 		// self.payData.supportPayTypes[self.switchIndex]
				// 		if (priceflag == 'balance') {
				// 			self.$http.toast('支付成功!');
				// 			setTimeout(() => {
				// 				if(self.is_index==1){	//如果是拼团支付
				// 					if(flagStatus){
				// 						uni.redirectTo({
				// 							url: groupUrl
				// 						})
				// 					}else{
				// 						uni.redirectTo({
				// 							url: orderListUrl
				// 						})
				// 					}
				// 				}else{
				// 					uni.redirectTo({
				// 						url: '/pages/order/list?status=1'
				// 					})
				// 				}
				// 			},500)
				// 			return;
				// 		}
						
				// 		// #ifdef H5
				// 		if(self.is_index==1){	//如果是拼团支付
						
				// 			if(flagStatus){
				// 				self.$wechatSdk.pay(res.data,groupUrl);
				// 			}else{
				// 				self.$wechatSdk.pay(res.data,orderListUrl);
				// 			}	
				// 		}else{
				// 			self.$wechatSdk.pay(res.data,'/pages/order/list?status=1');	
				// 		}
				// 		// #endif

				// 		// #ifdef MP-WEIXIN || APP-PLUS
				// 		setPay(res.data, (result) => {
				// 			console.log(12312);
				// 			let _url = '/pages/order/list?status=1'
				// 			if (result.success) {
				// 				self.$http.toast("支付成功")
				// 			} else {
				// 				self.$http.toast("未支付")
				// 				_url = '/pages/order/list?status=0'
				// 			}

				// 			setTimeout(() => {
				// 				if(self.is_index==1){	//如果是拼团支付
				// 					if(flagStatus){
				// 						uni.redirectTo({
				// 							url: groupUrl
				// 						})
				// 					}else{
				// 						uni.redirectTo({
				// 							url: orderListUrl
				// 						})
				// 					}
				// 				}else{
				// 					uni.redirectTo({
				// 						url: _url
				// 					})
				// 				}
				// 			},1000)

				// 		});
				// 		// #endif
				// 	} else {
				// 		self.$http.toast(res.msg);
				// 		return
				// 		setTimeout(() => {
				// 			if(self.is_index==1){	//如果是拼团支付--跳转拼团订单列表
				// 				uni.redirectTo({
				// 					url: orderListUrl
				// 				})
				// 			}else{
				// 				uni.redirectTo({
				// 					url: '/pages/order/list?status=0'
				// 				})
				// 			}
				// 		},1000)
				// 	}
				// })
			},
			
			
			switchIcon(index) {
				this.switchIndex = index;
			},
			
			/* 看能不能把逻辑判断的封装起来 */
			
			
		},
	}
</script>

<style scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.status_bar2 {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 99;
	}

	body,
	page {
		background-color: $uni-bg-color-grey;
	}

	.cart-root {
		position: relative;
		z-index: 1;
	}

	.cart-bg {
		position: absolute;
		width: 100%;
		background-size: cover;
		height: 320rpx;
	}

	.cart-bg-img {
		width: 100%;
	}

	.cart-title {
		padding: 40rpx 0 0rpx;
		color: #FFFFFF;
		font-size: 14pt;
		letter-spacing: 4rpx;
		text-align: center;
		position: relative;
		margin-bottom: 40rpx;
	}

	.back {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		font-size: 40rpx;
	}

	.mainContent {
		z-index: 999;
		position: relative;
		width: 690rpx;
		margin: 118rpx auto 0;
	}

	.up {
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 30rpx;
	}

	.balance {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 23rpx;
		font-size: 10pt;
		color: #000000;
		border-bottom: 2rpx solid #F2F2F2;
	}

	.price {
		font-size: 13pt;
		margin-right: 10rpx;
	}

	.pay-content {
		padding: 43rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pay-title {
		font-size: 9pt;
		font-weight: 600;
		margin-bottom: 20rpx;
		color: #000000;
	}

	.pay-icon {
		font-size: 12pt;
		margin-right: 20rpx;
		font-weight: 500;
	}

	.pay-price {
		color: #BC0100;
		font-size: 16pt;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.numbering {
		font-size: 10pt;
		color: #000000;
	}

	.down {
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 40rpx 20rpx;
	}

	.down-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.down .down-item:last-child {
		margin-bottom: 0rpx;
	}

	.item-left {
		display: flex;
		align-items: center;
		color: #000000;
		font-size: 10pt;
	}

	.item-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}

	.item-right-box {
		width: 38rpx;
		height: 38rpx;
		position: relative;
	}

	.item-right {
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
		border: 2rpx solid #8B8B8B;
		position: absolute;
	}

	.item-icon {
		font-size: 38rpx;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		line-height: 40rpx;
		color: #BC0100;
	}

	.confirmPay {
		color: #FFFFFF;
		background: #bc0100;
		padding: 26rpx 0;
		text-align: center;
		border-radius: 80rpx;
		font-size: 10pt;
		letter-spacing: 4rpx;
		margin-top: 80rpx;
	}
</style>
