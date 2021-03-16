<template>
	<view class="ercode">
		<!-- <view class="ercode-code">
			<view class="accountingOrder-title">输入收款金额:</view>
			<input type="number" value="" placeholder="请输入收款金额" class="input-btn" v-model.trim="code"/>
		</view>
		<view class="sure-code">
			<button type="default" @click='btnPay'>点击生成收款码</button>
		</view>
		<view class="pay-code" v-if="show" @click="show=false">
			<view class="code-detail">
				<image :src="message.qrcode" mode="" class="code"></image>
				<text>金额:￥{{code}}</text>
			</view>
		</view> -->
		<view class="pay-code">
			<view class="code-detail">
				<image :src="ercodeLogo.qrcode" mode="" class="code"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// code:'',
				// show:false,
				// message:{},
				ercodeLogo:{},
			}
		},
		onLoad() {
				this.$http.request({
					url: this.$api.moreShop.checkOrder,
					method: 'POST',
					data: {
						route:'/h5/#/pages/personalCentre/ercode/payPages/payPages'
					},
					showLoading: true
				}).then(res => {
					if(res.code==0){
						console.log(res)
						this.ercodeLogo=res.data
					}
				})
		},
		methods: {
			// btnPay(){ //点击生成收款码
			// 	if(this.code.length<=0){
			// 		this.$http.toast("输入不能为空")
			// 		return
			// 	}
			// 	this.show=true
			// 	this.$http.request({
			// 		url: this.$api.moreShop.getpayCode,
			// 		method: 'POST',
			// 		data: {
			// 			order_price: this.code,
			// 			route:'/h5/#/pages/personalCentre/invoicingMessage/invoicingMessage'
			// 		},
			// 		showLoading: true
			// 	}).then(res => {
			// 		if(res.code==0){
			// 			this.message=res.data
			// 		}
			// 	})
			// }
		}
	}
</script>

<style scoped>
		.ercode{width:100%;height: 100%;position: relative;}
		.ercode-code{width: 100%;overflow: hidden;display: flex;height: 100rpx;line-height: 100rpx;padding: 0rpx 20rpx;box-sizing: border-box;background: #fff;margin: 40rpx 0;}
		.accountingOrder-title{width: 30%;color: #000;}
		.input-btn{height: 100rpx;background: rgb(245, 245, 245);width: 65%;padding-left: 10rpx;}
		.sure-code{width: 100%;overflow: hidden;}
		.sure-code button{width: 100%;margin: 0 auto;background: #007AFF;color: #fff;}
		.ercode_btn{width: 100%;outline: none;border: none;background: #007AFF;color: #fff;}
		.pay-code{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background:rgba(0, 0, 0, 0.5);}
		.code-detail{width:450rpx ;height: 550rpx;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
		.code{width: 450rpx;height: 450rpx;display: block;}
		.code-detail text{display: block;width: 100%;height: 100rpx;
		line-height: 100rpx;text-align: center;background: #52DCAE;color: #fff;font-size: 40rpx;}
</style>
