<template>
	<view class="invoicingMessage-app">
		<view class="order-code">
			订单号:
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {   //通过扫二维码进入此页面会带有一个id
			this.$http.request({
				url: this.$api.moreShop.getpayMessage,
				method: 'POST',
				data: {
					id:options.id
				},
				showLoading: true
			}).then(res => {
				if(res.code==0){
					console.log(res)
				}else{
					// this.$http.toast(res.msg)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.invoicingMessage-app{width: 100%;overflow: hidden;}
	.order-code{width: 100%;height: 100rpx;background: #fff;margin: 30rpx 0 0 0;line-height: 100rpx;
	font-weight: 600;padding: 0rpx 20rpx;color: #000;}
</style>
