<template>
	<view class="bindUser">
		<view class="center">
			<view class="logo">
				<image :src="message.avatar_url" mode=""></image>
			</view>
			<view class="name">{{message.nickname}} 1122</view>
			<view class="id">
				BSH:{{message.id}} 1122
			</view>
			<view class="role">
				{{message.role_type}} 1122
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:''
			};
		},
		onLoad() {
			this.getBind()
		},
		methods:{
			getBind(){
				this.$http.request({
					url: this.$api.moreShop.getBindUser,
					showLoading: true,
				}).then(res => {
					if (res.code == 0) {
						this.message=res.data.detail
						let page=uni.getStorageSync('page')
						setTimeout(function(){
							window.location.href=page						 
						},3000)
					}else{
						this.$http.toast(res.msg);
						setTimeout(function(){
							uni.reLaunch({
							    url: '../../index/index'
							});
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.bindUser{width: 100%;height: 100%;position: relative;}
	.center{width: 100%;height: 500rpx;box-shadow: 0 1px 10px rgba(183, 183, 183, 0.5);position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
	.logo{width: 100%;overflow: hidden;}
	.logo image{width: 160rpx;height: 160rpx;margin: 30rpx auto;display: block;border-radius: 50%;}
	.name{width: 100%;overflow: hidden;font-size: 34rpx;color: #000000;text-align: center;margin: 20rpx 0;}
	.id{width: 100%;overflow: hidden;text-align: center;font-size: 26rpx;}
	.role{width: 100%;overflow: hidden;text-align: center;font-size: 28rpx;margin: 20rpx 0;}
</style>
