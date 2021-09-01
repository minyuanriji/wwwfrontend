<template>
	<view class="container">
		<button @click="exchange" type="primary">兑换礼金</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//红包兑换礼金
			exchange(){
				let that = this;
				that.$http.request({
					url: that.$api.taolijin.exchange,
					method: 'post',
					showLoading: true,
					data: {
						id: 100008
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.redirectTo({
							url: "/ali/taolijin/take/take"
						}); 
					}else{
						that.$http.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style>

</style>
