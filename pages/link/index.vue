<template>
	<view>
		分享红包：<button type="warn" @click="getData()">点击生成二维码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			getData() {
				this.loading = true;
				this.$http.request({
					url: this.$api.plugin.extensions.LinkPoster,
					method: 'POST'
				}).then(res => {
					if (res.code == 0) {
						this.poster_url = res.data.pic_url;
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
