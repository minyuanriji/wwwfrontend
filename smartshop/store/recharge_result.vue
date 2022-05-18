<template>
</template>

<script>
	export default {
		data() {
			return {
				order_id: ''
			}
		},
		onLoad(options) {
			this.order_id = options.orderId;
			this.getData();
		},
		methods: {
			getData(){
				this.$http.request({
					url: this.$api.smartshop.store.pay_order_detail,
					showLoading: true,
					data: {
						order_id: this.order_id
					}
				}).then((res) => {
					
				})
			}
		}
	}
</script>

<style>
</style>
