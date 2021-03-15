<template>
	<view class="accountingOrder_app">
		<view class="accountingOrder-code">
			<view class="accountingOrder-title">输入核销码:</view>
			<input type="text" value="" placeholder="请输入核销码" class="input-btn" v-model.trim="code"/>
		</view>
		<view class="sure-code">
			<button type="default" @click='btn'>确认</button>
		</view>
		<view class="ercode">
			<button type="default" class="ercode_btn" @click='ercodeBtn'>点击扫描二维码</button>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
		var jweixin = require('jweixin-module');
	//#endif
	export default {
		data() {
			return {
				code:'',//核销code
			}
		},
		onLoad() {
		//#ifdef H5
			this.$wechatSdk.initJssdk(function(signData){
				console.log(signData)
			});
		//#endif
		},
		methods: {
			ercodeBtn(){
				//#ifdef H5
					jweixin.scanQRCode({
					  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					  success: function (res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					  }
					});
				//#endif
				// #ifdef MP-WEIXIN || APP-PLUS
						uni.scanCode({
							onlyFromCamera: true,
						    success: function (res) {
						      
						    }
						});
				// #endif
			},
			
			btn(){ //点击确认核销码
				if(this.code.length<=0){
					this.$http.toast("核销码不能为空")
					return
				}
				uni.navigateTo({
					url:'../../more-shop/more-shop?code='+this.code
				})	
			}
		}
	}
</script>

<style scoped>
	.accountingOrder_app{width:100%;height: 100%;}
	.accountingOrder-code{width: 100%;overflow: hidden;display: flex;height: 100rpx;line-height: 100rpx;padding: 0rpx 20rpx;box-sizing: border-box;background: #fff;margin: 40rpx 0;}
	.accountingOrder-title{width: 25%;}
	.input-btn{height: 100rpx;background: rgb(245, 245, 245);width: 70%;padding-left: 10rpx;}
	.ercode{width: 100%;overflow: hidden;margin-top: 50rpx;position: absolute;bottom: 150rpx;left: 0;}
	.sure-code{width: 100%;overflow: hidden;}
	.sure-code button{width: 100%;margin: 0 auto;background: #007AFF;color: #fff;}
	.ercode_btn{width: 100%;outline: none;border: none;background: #007AFF;color: #fff;}
</style>
