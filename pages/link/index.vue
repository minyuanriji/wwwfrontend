<template>
	<view>
		分享红包：<button type="warn" @click="getData()">点击生成二维码</button>
		<image style="width: 100%; height: 400px;" :src="poster_url"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				poster_url:''
			}
		},
		methods: {
			getData() {
				this.loading = true;
				this.$http.request({
					//#ifdef H5
					url: this.$api.plugin.extensions.LinkPoster,
					// #endif
					
					//#ifdef MP-WEIXIN
					url: this.$api.plugin.extensions.LinkPoster2,
					//#endif
					
					
					method: 'POST'
				}).then(res => {
					if (res.status == 1) {
						this.poster_url = res.img;
						uni.showToast({
						    title: res.msg,
						    duration: 2000,
							icon:'none'
						});
						setTimeout(() => {
							this.loading = false;
						}, 1000)
					}else{
						this.$http.toast(res.msg);
						uni.redirectTo();
					}
				})
			}
		}
	}
</script>

<style>

</style>
