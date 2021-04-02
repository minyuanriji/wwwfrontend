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
				list:[
					{
						img:'',
						title:"复合物哦热换个蓉儿光和热哦哦热火个哦不大对仍认为",
						price:205,
						num:1000
					},
					{
						img:'',
						title:"复合物哦热换个蓉儿光和热哦哦热火个哦不大对仍认为",
						price:205,
						num:1000
					}
				]
			};
		}
	}
</script>

<style lang="less" scoped>
	.productList-app{width: 100%;overflow: hidden;display: flex;justify-content: space-between;
	padding: 0 30rpx;}
</style>
