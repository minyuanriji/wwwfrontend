<template>
	<view class="withdrawal_detail-app">
		
	</view>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			this.getwithdrawal_detail()
		},
		methods:{
			getwithdrawal_detail(){
				this.$http
					.request({
						url: this.$api.moreShop.withdrawal_detail,
						method: 'GET',
						showLoading: true
					})
					.then(res => {
						console.log(res.data)
						if(res.code==0){
							
						}else{
							this.$http.toast(res.msg);
						}
					});
			}
		}
	}
</script>

<style lang="less">
	
</style>
