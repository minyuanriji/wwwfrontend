<template>
	<view class="accountingOrder_app">
		<view class="accountingOrder-code">
			<view class="accountingOrder-title">输入核销码:</view>
			<input type="text" value="" placeholder="请输入核销码" class="input-btn" v-model="code"/>
		</view>
		<view class="ercode">
			<button type="default" class="ercode_btn" @click='ercodeBtn'>点击扫描二维码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',//核销code
			}
		},
		methods: {
			ercodeBtn(){
				// wx.scanCode({
				// 	onlyFromCamera: true,
				// 	  success (res) {
				// 	    console.log(res)
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
	.accountingOrder_app{width:100%;overflow:hidden;}
	.accountingOrder-code{width: 100%;overflow: hidden;display: flex;height: 100rpx;line-height: 100rpx;padding: 0rpx 20rpx;box-sizing: border-box;background: #fff;margin: 20rpx 0;}
	.accountingOrder-title{width: 25%;}
	.input-btn{height: 100rpx;background: rgb(245, 245, 245);width: 70%;padding-left: 10rpx;}
	.ercode{width: 100%;overflow: hidden;margin-top: 50rpx;}
	.ercode_btn{width: 100%;outline: none;border: none;background: #007AFF;color: #fff;}
</style>
