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
		<!-- <view class="pay-code">
			<view class="code-detail">
				<image :src="ercodeLogo.qrcode" mode="" class="code"></image>
			</view>
		</view> -->
		<view class="ercode_title">
			扫码支付
		</view>
		<view class="ercode_background">
			<view class="shop_logo">
				<image :src="message.store.cover_url" mode=""></image>
			</view>
			<view class="shop_name_id">
				<text>{{message.store.name}}</text>
				<text style="color: #8ad8d0;">ID:{{message.store.mch_id}}</text>
			</view>
			<view class="sao_sao">
				扫描下面的二维码付款
			</view>
			<view class="ercode_code">
				<image :src="ercodeLogo.qrcode" mode="" class="ercode_code_logo"></image>
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
				message:{}
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
				if(uni.getStorageSync('mchMessage')){
					this.message=uni.getStorageSync('mchMessage')
				}
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
		.ercode{width:100%;height: 100%;position: relative;
		background:url('https://dev.mingyuanriji.cn/web/static/mch/ollectionQRCode.jpg')no-repeat ;
		background-size: 100%
		}
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
		
		
		
		
		
		.ercode_title{width: 100%;overflow: hidden;text-align: center;color: #fff;padding-top: 30rpx;font-size: 40rpx;}
		.ercode_background{width: 90%;height: 850rpx;background: #fff;border-radius: 20rpx;margin: 100rpx auto 0;position: relative;}
		.shop_logo{width: 200rpx;height: 200rpx;border-radius: 50%;margin:0 auto;}
		.shop_logo image{width: 200rpx;height: 200rpx;border-radius: 50%;margin-top: -70rpx;}
		.shop_name_id{width: 100%;overflow: hidden;display: flex;flex-wrap: wrap;margin-top: -40rpx;}
		.shop_name_id text{display: block;width: 100%;overflow: hidden;color: #000;text-align: center;margin-bottom: 10rpx;font-size: 35rpx;}
		.sao_sao{width: 100%;overflow: hidden;text-align: center;font-size: 25rpx;margin-top: 10rpx;color: #B8B8B8;}
		.ercode_code{width: 100%;overflow: hidden;}
		.ercode_code_logo{width: 450rpx;height: 450rpx;display: block;margin: 0 auto;}
</style>
