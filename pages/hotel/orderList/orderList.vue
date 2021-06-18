<template>
	<view class="hotel-orderList-app">
		<view class="hotel-orderList-status">
			<view v-for="(item,index) in list" :key='index' :class="switchIndex==index?'active':''" @click="checkIndex(index,item.status)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						title:'全部',
						status:0
					},
					{
						title:'待付款',
						status:1
					},
					{
						title:'待处理',
						status:2
					},
					{
						title:'待出行',
						status:3
					},
					// {
					// 	title:'待评价',
					// 	status:4
					// },
					{
						title:'退款/售后',
						status:4
					}
				],
				switchIndex:0
			};
		},
		methods:{
			checkIndex(index,status){
				this.switchIndex=index
			}
		}
	}
</script>

<style lang="less">
	.hotel-orderList-app{width: 100%;overflow: hidden;}
	.hotel-orderList-status{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;}
	.hotel-orderList-status view{font-size: 26rpx;line-height: 80rpx;width: 16%;text-align: center;}
	.active{color: rgb(255, 113, 4);border-bottom: 6rpx solid  rgb(255, 113, 4);font-weight: bold;}
</style>
