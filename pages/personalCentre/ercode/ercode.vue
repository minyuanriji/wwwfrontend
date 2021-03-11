<template>
	<view class="ercode">
		<view class="ercode-code">
			<view class="accountingOrder-title">输入收款金额:</view>
			<input type="number" value="" placeholder="请输入收款金额" class="input-btn" v-model.trim="code"/>
		</view>
		<view class="sure-code">
			<button type="default" @click='btnPay'>点击生成收款码</button>
		</view>
		<view class="pay-code">
			<image src="../../../plugins/images/extensions/o2o/shuiguotu.png" mode="" class="code"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
			}
		},
		methods: {
			btnPay(){ //点击生成收款码
				if(this.code.length<=0){
					alert(11)
					return
				}
				this.$http.request({
					url: this.$api.moreShop.getpayCode,
					method: 'POST',
					data: {
						order_price: this.code,
						route:''
					},
					showLoading: true
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
		.ercode{width:100%;height: 100%;}
		.ercode-code{width: 100%;overflow: hidden;display: flex;height: 100rpx;line-height: 100rpx;padding: 0rpx 20rpx;box-sizing: border-box;background: #fff;margin: 40rpx 0;}
		.accountingOrder-title{width: 30%;color: #000;}
		.input-btn{height: 100rpx;background: rgb(245, 245, 245);width: 65%;padding-left: 10rpx;}
		.sure-code{width: 100%;overflow: hidden;}
		.sure-code button{width: 100%;margin: 0 auto;background: #007AFF;color: #fff;}
		.ercode_btn{width: 100%;outline: none;border: none;background: #007AFF;color: #fff;}
		.pay-code{width: 100%;overflow: hidden;}
		.code{width: 450rpx;height: 450rpx;margin: 60rpx auto 0;display: block;}
</style>
