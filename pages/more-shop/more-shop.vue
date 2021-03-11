<template>
	<view class="more-shop">
		<view class="more-shop-account-title">
			核销成功
		</view>
		<view class="more-shop-account-detail">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			let that=this
			console.log(options)
			uni.showLoading({
			    title: '正在核销中'
			});
			setTimeout(function () {
			    uni.hideLoading();
				that.$http.request({
					url: that.$api.moreShop.verification,
					method: 'POST',
					data: {
						code: options.code,
					},
					showLoading: false
				}).then(res => {
					if(res.code==0){
						that.$http.toast(res.msg)
					}else{
						that.$http.toast(res.msg)
						// setTimeout(function(){
						// 	uni.redirectTo({
						// 		url:'../personalCentre/accountingOrder/accountingOrder'
						// 	})
						// },2000)
					}
				})		
			}, 2000);
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.more-shop{width: 100%;overflow: hidden;}
	.more-shop-account-title{width: 100%;height: 200rpx;text-align: center;line-height: 200rpx;font-size: 55rpx;font-weight: 600;color: #000;}
	.more-shop-account-detail{margin-top: 20rpx;width: 100%;overflow: hidden;}
</style>
