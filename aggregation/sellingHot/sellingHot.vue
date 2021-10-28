<template>
	<view class="sellingHot_container">
		<vouchers :list='goods_ist'></vouchers>
	</view>
</template>

<script>
	import vouchers from '@/components/vouchers.vue';
	export default{
		components: {
			vouchers
		},
		data(){
			return{
				goods_ist:[],
				page_count:'',
				page:1,
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList() { //首页商品
				this.$http.request({
					url: this.$api.default.getvoucherList,
					method: 'GET',
					data:{
						page:this.page
					},
					showLoading: true
				}).then((res) => { 
					if(res.code==0){
						if(res.data.list.length==0)return false
						let list= res.data.list;
						var arr=this.goods_ist.concat(list)
						this.goods_ist =arr
						this.page_count = res.data.page_count;
					}else{
						this.$http.toast(res.msg);
					}
				})
			},
		},
		onReachBottom() {
			if(this.page==this.page_count){
				return false;
			} 		
			this.page=this.page+1
			this.getList();
		},
	}
</script>

<style lang="less" scoped>
	
</style>
