<template>
	<view class="shopDetail">
		<view class="shopDetail-message">
			<view class="shopDetail-message-item">
				<view style="width: 10%;text-align: center;">•</view>
				<view style="width: 90%;display: flex;justify-content: space-evenly;flex-wrap: wrap;">
					<text>营业信息</text>
					<text>周一至周日 00:00-23:59</text>
				</view>
			</view>
			<view class="shopDetail-message-item">
				<view style="width: 10%;text-align: center;">•</view>
				<view style="width: 90%;display: flex;justify-content: space-evenly;flex-wrap: wrap;">
					<text>地址</text>
					<text>广东省广州市白云区景直街31号天津大厦首层，二层</text>
				</view>
			</view>
		</view>
		<view class="shopDetail_location">
			<image :src="img_url+'dao_location.png'" mode="" style="width: 60rpx;height: 60rpx;display: block;float: left;"></image>
			<text style="display: block;float: right;line-height: 60rpx;color: #000;">导航</text>
		</view>
		<view class="map">
			 <map style="width: 100%; height: 200px;" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
		</view>
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#333'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view>
					<com-icons type="search" :size='16' color='#333333'></com-icons>
				</view>
				<!-- #endif -->
				<input confirm-type="search" placeholder="请输入商品名" :focus="true" auto-focus placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="key" @confirm='search'/>
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="key"><tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon></view>
				<!-- #endif -->
			</view>
			<view class="tui-cancle" @tap="search">搜索</view>
		</view>
		<view class="shop_table_list">
			<view class="shop_table_item" v-for="item in 3" :key='item'>
				<view class="shop_table_item_left">
					<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210916/f601fd5d7d7eb92e735cd1de31d72325.png" mode="scaleToFill"></image>
				</view>
				<view class="shop_table_item_right">
					<view class="shop_table_item-name">
						补商汇广州运营中心
					</view>
					<view class="shop_table_item-score">
						<view class="iconfont iconwujiaoxing" v-for="(i,index) in 5"
							style="color: #FFA600;" :key='index'></view>
						<view class="point" style="font-size: 28rpx;color: red;margin-left: 10rpx;">5.0</view>
					</view>
					<view class="shop_table_item_notice">
						到店支付100送100购物券
					</view>
					<view class="shop_table_item-location">
						<image :src="img_url+'dao_location.png'" mode="" style="width: 35rpx;height: 35rpx;"></image>
						<text style="margin: 0 10rpx;">白云区</text>
						<text>1.5km</text>
					</view>
				</view>	
			</view>	
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon";
	import tuiTag from "@/components/tag/tag";
	export default {
		components: {
			tuiIcon,
			tuiTag,
		},
		data() {
			return {
				key: "",
				img_url: this.$api.img_url,
				latitude: 39.909,
				longitude: 116.39742,
				markers:[
					{
						id:1,
						latitude: 39.909,//纬度
						longitude:116.39742,//经度
						iconPath: 'https://dev.mingyuanriji.cn/web/static/dao_location.png'
					}
				],
			};
		},
		methods:{
			cleanKey: function() { //清空搜索
				this.key = ''
			},
		}
	}
</script>

<style lang="less" scoped>
	.shopDetail{width: 100%;overflow: hidden;}
	.shopDetail-message{margin: 10rpx 0 20rpx 0;padding: 20rpx;box-sizing: border-box;}
	.shopDetail-message-item{width: 100%;overflow: hidden;margin: 30rpx 0;display: flex;justify-content: space-evenly;}
	.shopDetail-message-item view text{display: block;width: 100%;margin-bottom: 5rpx;color: #000;font-size: 30rpx;}
	.shopDetail_location{width: 20%;margin: 0 auto;overflow: hidden;}
	.map{width: 100%;overflow: hidden;margin: 20rpx 0;}
	.tui-searchbox {
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	
	.tui-search-input {
		width: 90%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}
	
	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 11pt;
	}
	
	.tui-input-plholder {
		font-size: 11pt;
		color: #b2b2b2;
	}
	
	.tui-cancle {
		color: #888;
		font-size: 11pt;
		padding-left: 30rpx;
		flex-shrink: 0;
	}
	
	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	
	.tui-icon-delete {
		padding: 10rpx;
	}
	
	.tui-search-title {
		font-size: 11pt;
		font-weight: bold;
	}
	
	.tui-hot-header {
		padding: 30rpx 0;
	}
	
	.tui-tag-class {
		display: inline-block;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		font-size: 9pt !important;
	}
	.tui-history-content{
		display: flex;
		flex-wrap: wrap;
	}
	.shop_table_list{width: 100%;overflow: hidden;margin-bottom: 116rpx;}
	.shop_table_item{width: 95%;margin: 15rpx auto;background: #fff;display: flex;justify-content: space-evenly;overflow: hidden;}
	.shop_table_item_left{width: 35%;height: 250rpx;margin: 20rpx 0;}
	.shop_table_item_left image{width: 100%;display: block;height: 250rpx;}
	.shop_table_item_right{width: 64%;padding-left: 25rpx;box-sizing: border-box;margin: 20rpx 0;position: relative;}
	.shop_table_item-name{width: 100%;font-size: 34rpx;color: #000;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.shop_table_item_notice{font-size: 28rpx;color: rgb(255,166,0);margin-top: 5rpx;background: rgb(247,236,230);width: 80%;text-align: center;border-radius: 10rpx;}
	.shop_table_item-score{width: 100%;overflow: hidden;flex: 1;display: flex;align-items: center;margin-top: 10rpx;}
	.shop_table_item-location{width: 100%;overflow: hidden;position: absolute;left: 0;bottom: 0;text-align: right;line-height: 50rpx;font-size: 28rpx;}
	.shop_table_item-location image{display: inline-block;position: relative;top: 6rpx;}
</style>
