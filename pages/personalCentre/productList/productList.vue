<template>
	<view class="productList-app">
		<shopProduct v-for='(item,index) in list' :item='item' :key='index'></shopProduct>
	</view>
</template>

<script>
	import shopProduct from '../../../components/shopProduct.vue'
	export default {
		components:{
			shopProduct
		},
		data() {
			return {
				list:[],
				form:{
					mch_id:'',
					cat_id:'',
					keyword:'',
					label:'',
					page:'',
					limit:''
				}
			};
		},
		onLoad() {
			this.getGoodsList()
		},
		methods:{
			getGoodsList(){ //获取商户商品
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组			
				let curRoute = routes[routes.length - 1].route //获取当前页面路由				
				let curParam = routes[routes.length - 1].options; //获取路由参数
				this.form.mch_id=curParam.mch_id
				this.$http
					.request({
						url: this.$api.moreShop.getmchgods,
						method: 'POST',
						showLoading: true,
						data:this.form
					})
					.then(res => {
						if(res.code==0){
							console.log(res)
							this.list=res.data.list
						}else{
							this.$http.toast(res.msg);
						}
					});
			}
		}
	}
</script>

<style lang="less" scoped>
	.productList-app{width: 100%;overflow: hidden;display: flex;justify-content: space-between;
	padding: 0 30rpx;}
</style>
