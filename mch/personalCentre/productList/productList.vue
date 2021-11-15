<template>
	<view class="productList-app">
		<shopProduct v-for='(item,index) in list' :item='item' :key='index'></shopProduct>
		<view class="none" v-if="list.length==0" style="text-align: center;color: #999;margin-top: 20px;font-size: 14px;">暂无商品</view>
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
					store_id:'',
					cat_id:'',
					keyword:'',
					label:'',
					page:1,
					limit:''
				},
				page_count:'',
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
				this.form.store_id=curParam.mch_id
				this.$http
					.request({
						url: this.$api.moreShop.getmchgods,
						method: 'POST',
						showLoading: true,
						data:this.form
					})
					.then(res => {
						if(res.code==0){
							if(res.data.list.length==0)return false
							let list= res.data.list;
							var arr=this.list.concat(list)
							this.list =arr
							this.page_count = res.data.pagination.page_count;
						}else{
							this.$http.toast(res.msg);
						}
					});
			}
		},
		onReachBottom() {
			if(this.form.page==this.page_count){
				return false;
			} 		
			this.form.page=this.form.page+1
			this.getGoodsList();
		},
	}
</script>

<style lang="less" scoped>
	.productList-app{width: 100%;overflow: hidden;display: flex;justify-content: space-between;flex-wrap: wrap;
	padding: 0 30rpx;box-sizing: border-box;}
	.none{width: 100%;}
</style>
