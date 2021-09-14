<template>
	<view class="ali-home-app">
		<view class="ali-home-app-header">
			<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="ali-home-app-header-catory-two">
			<view v-for="(item,index) in typeList" :key='index' v-if="index<10">
				<image :src="item.cover_url" mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="ali-home-app-product">
			<view class="product-item" v-for="(item,index) in typeList" :key='index' @click="link()">
				<!-- <image :src="item.img" mode="widthFix" class="product-item-logo"></image> -->
				<image src="https://liangcang-material.alicdn.com/prod/upload/1ab0ce94f41c4e7ca4126d5d1b6717f6.jpg" mode="widthFix" class="product-item-logo"></image>
				<view class="product-item-name">{{item.name}}</view>
				<view class="product-item-money-buy">
					<view class="product-item-money">
						<text style="color:#FF7104;font-size: 28rpx;width: 100%;">兑换价格￥128.00</text>
						<text
							style="font-size: 28rpx;width: 100%;margin: 20rpx;background: #FF7104;height: 60rpx;text-align: center;line-height: 60rpx;border-radius: 30rpx;color: #fff;">购物券兑换</text>
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
			liuyunoTabs,
		},
		data() {
			return {
				tabs: [], //一级分类
				defaultIndex: 0,
				typeList: [], //二级分类
			};
		},
		onLoad() {
			this.getclassify()
		},
		methods: {
			tabClick(e) { //点击切换table
				for (let i = 0; i < this.tabs.length; i++) {
					if (e == i) {
						this.typeList = this.tabs[i].children
					}
				}
			},
			link() { //进入商品详情页
				uni.navigateTo({
					url: '../detail/detail?proId=' + 2107
				})
			},
			getclassify() { //获取分类
				this.$http.request({
					url: this.$api.taolijin.getClassify,
					method: 'POST',
					data: '',
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.tabs = res.data
						this.typeList = this.tabs[0].children
					} else {
						this.$http.toast(res.msg);
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.ali-home-app {
		width: 100%;
		overflow: hidden;
	}

	.ali-home-app-header {
		width: 100%;
		overflow: hidden;
		background: #fff;
	}
	.ali-home-app-header-catory-two{
		width: 96%;
		background: #fff;
		margin: 20rpx auto;
		overflow: hidden;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		border-radius: 30rpx;
	}
	.ali-home-app-header-catory-two view{
		width: 17%;
		overflow: hidden;
		margin: 10rpx 0 20rpx 0;
	}
	.ali-home-app-header-catory-two view image{
		width: 100%;
		height: 122rpx;
	}
	.ali-home-app-header-catory-two view text{
		width: 100%;
		font-size:24rpx;
		display: block;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.ali-home-app-product {
		width: 95%;
		overflow: hidden;
		margin: 30rpx auto 80rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.product-item {
		width: 48%;
		overflow: hidden;
		margin: 10rpx 0;
		border-radius: 10rpx;
		box-shadow: 0px 0px 10px #eee;
		border: 1px solid rgb(239, 239, 239);
	}

	.product-item-logo {
		width: 100%;
	}

	.product-item-name {
		width: 100%;
		height: 84rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		padding: 0 10rpx;
		color: #000000;
		box-sizing: border-box;
	}

	.product-item-money-buy {
		width: 100%;
		overflow: hidden;
		margin-bottom: 15rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
	}

	.product-item-money {
		color: red;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
