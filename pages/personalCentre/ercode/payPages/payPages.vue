<template>
	<view class="payPages-app">
		<view class="ercode-code">
			<view class="accountingOrder-title">输入金额:</view>
			<input type="number" value="" placeholder="请输入金额" class="input-btn" v-model.trim="num"/>
		</view>
		<view class="sure-code">
			<button type="default" @click='sure'>确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:'',
				id:''
			};
		},
		onLoad(options) {
			this.id=options.id
		},
		methods:{
			sure(){
				this.$http.request({
							url: this.$api.moreShop.creatCheckOrder,
							method: 'POST',
							data: {
								id:this.id,
								order_price:this.num
							},
							showLoading: true
						}).then(res => {
							if(res.code==0){
							}
						})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.payPages-app{width: 100%;overflow: hidden;}
	.ercode{width:100%;height: 100%;position: relative;}
	.ercode-code{width: 100%;overflow: hidden;display: flex;height: 100rpx;line-height: 100rpx;padding: 0rpx 20rpx;box-sizing: border-box;background: #fff;margin: 40rpx 0;}
	.accountingOrder-title{width: 30%;color: #000;}
	.input-btn{height: 100rpx;background: rgb(245, 245, 245);width: 65%;padding-left: 10rpx;}
	.sure-code{width: 100%;overflow: hidden;}
	.sure-code button{width: 100%;margin: 0 auto;background: #007AFF;color: #fff;}
</style>
