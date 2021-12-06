<template>
	<view>
		<web-view :src="auth_url" v-if="auth_url"></web-view>
	</view>
</template>

<script>
	
	let timer = null;
	
	export default {
		data() {
			return {
				ali_id: 0,
				auth_url: ''
			}
		},
		onLoad(option) {
			this.beforeOnLoad(option);
			this.ali_id = option.ali_id;
			
			timer && clearInterval(timer);
			
			let that = this;
			that.getAuth(true);
			timer = setInterval(function(){
				that.getAuth(false);
			}, 3000);
			
			//TODO 测试，记得删掉
			/* uni.$emit('ali_auth_status', {msg:'授权成功'});
			uni.navigateBack({
			    delta: 1
			}); */
		},
		onHide(){
			timer && clearInterval(timer);
		},
		methods: {
			getAuth(showLoading){
				let that = this;
				this.$http.request({
					url: this.$api.taolijin.getAuthInfo,
					method: 'post',
					showLoading: showLoading,
					data: {ali_id: this.ali_id}
				}).then((res) => {
					if (res.code == 0) {
						if(res.data.need_auth == 1){
							that.auth_url = that.$api.host + "/web/index.php?r=plugin/taolijin/auth/ali-auth&ali_id="+that.ali_id + "&user_id="+res.data.user_id;
						}else{
							uni.showToast({
							    title: '您已授权成功',
							    duration: 2000
							});
							timer && clearInterval(timer);
							uni.$emit('ali_auth_status', {msg:'授权成功'});
							uni.navigateBack({
							    delta: 1
							});
						}
					} else {
						that.$http.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style>

</style>
