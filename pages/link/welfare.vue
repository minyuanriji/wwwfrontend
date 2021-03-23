<template>
	<view>
		<view class="integral_text">300积分，赠送一个月.</view>
		<view>
			<button type="warn" @tap="get_integral">立即获取</button>
		</view>
	</view>  
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			//#ifdef H5
			var a = document.getElementsByClassName('uni-page-head-hd')[0]
			a.style.display = 'none';	
			//#endif
		},
		methods: {
			get_integral() {
				var user = uni.getStorageSync('userInfo');
				var user_id = JSON.parse(user).user_id;
				this.$http.request({
					url: this.$api.plugin.extensions.GetIntegral,
					method: 'POST',
					data:{
						"user_id":user_id
					}
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
						    title: res.msg,
						    duration: 2000,
							icon:'none'
						});
						uni.removeStorageSync('new_user');
						setTimeout(function () {
							uni.redirectTo({
								url:'/pages/index/index'
							});
						},2000);
					} else {
						this.$http.toast(res.msg);
						uni.redirectTo();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.integral_text {
		// border: 1px solid red;
		font-size: 38rpx;
		text-align: center;
	}
</style>
