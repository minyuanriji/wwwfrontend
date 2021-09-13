<template>
	<view class="ali-home-app">
		<view class="ali-home-app-header">
			<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="ali-home-app-lei-list">
			<view v-for="(item,index) in typeList" :key='index'>
				<image :src="item.img" mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="ali-home-app-product">
			<view class="product-item" v-for="(item,index) in typeList" :key='index'>
				<image :src="item.img"
				 mode="widthFix" class="product-item-logo"></image>
				<view class="product-item-name">{{item.name}}</view>
				<view class="product-item-money-buy">
					<view class="product-item-money">
						<text style="color:#FF7104;font-size: 28rpx;width: 100%;">兑换价格￥128.00</text>
						<text style="font-size: 28rpx;width: 100%;margin: 20rpx;background: #FF7104;height: 60rpx;text-align: center;line-height: 60rpx;border-radius: 30rpx;color: #fff;">购物券兑换</text>
					</view>                                                   
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	export default {
		 components: {
		        liuyunoTabs
		    },
		data() {
			return {
				tabs:[
					{
						"name":'推荐'
					},
					{
						"name":'玩具'
					},
					{
						"name":'童装'
					},
					{
						"name":'鞋靴'
					},
					{
						"name":'生鲜'
					},
					{
						"name":'女装'
					},
					{
						"name":'玩具'
					},
					{
						"name":'内衣'
					},
					{
						"name":'电子'
					},
				],
				defaultIndex:0,
				typeList:[
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					},
					{
						img:"https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg",
						name:'童装'
					}
				]
			};
		},
		methods:{
			tabClick(e){
				
			}
		}
	}
</script>

<style lang="less">
	.ali-home-app{width: 100%;overflow: hidden;}
	.ali-home-app-header{width: 100%;overflow: hidden;background: #fff;}
	.ali-home-app-lei-list{width: 95%;overflow: hidden;display: flex;justify-content: space-evenly;flex-wrap: wrap;box-sizing: border-box;background: #fff;margin: 30rpx auto;border-radius: 15rpx;}
	.ali-home-app-lei-list view{width: 20%;font-size: 28rpx;text-align: center;margin: 20rpx 0;}
	.ali-home-app-lei-list view image{width: 100rpx;height: 100rpx;border-radius: 50%;display: block;margin: 0 auto;}
	.ali-home-app-product {width: 95%;overflow: hidden;margin: 30rpx auto 80rpx;display: flex;justify-content: space-between;flex-wrap: wrap;}	
	.product-item {width: 48%;overflow: hidden;margin: 10rpx 0;border-radius: 10rpx;box-shadow: 0px 0px 10px #eee;border: 1px solid rgb(239, 239, 239);}
	.product-item-logo {width: 100%;}	
	.product-item-name {width: 100%;height: 84rpx;overflow: hidden;-webkit-line-clamp: 2;display: -webkit-box;-webkit-box-orient: vertical;text-overflow: ellipsis;font-size: 28rpx;margin-bottom: 24rpx;padding: 0 10rpx;color: #000000;box-sizing: border-box;}
	.product-item-money-buy {width: 100%;overflow: hidden;margin-bottom: 15rpx;padding: 0 10rpx;box-sizing: border-box;}
	.product-item-money {color: red;font-size: 28rpx;display: flex;justify-content: space-between;flex-wrap: wrap;}	
</style>
