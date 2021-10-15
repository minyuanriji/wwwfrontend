<template>
	<view class="shop_detail_container">
		<view class="shop_detail_header">
			<view class="shop_detail_header_name">
				补商汇广州运营中心
			</view>
			<view class="shop_table_score">
				<view class="iconfont iconwujiaoxing" v-for="(i,index) in 5"
					style="color: #FFA600;" :key='index'></view>
				<view class="point" style="font-size: 28rpx;color: red;margin-left: 10rpx;">5.0</view>
			</view>
			<scroll-view class="s-c-list-x" scroll-x="true">
			          <view class="s-c-l-item">01</view>
			          <view class="s-c-l-item">02</view>
			         <view class="s-c-l-item">03</view>
			</scroll-view>
			<view class="shop_details-hours-detail">
				<view class="shop_details-hours">
					营业时间： 00：00-23：59
				</view>
				<view class="shop_details-detail" @click="link">
					<text style="margin-right: 5rpx;">商户详情</text>		
					<image :src="img_url+'arrow-right-seracher.png'" mode=""></image>
				</view>
			</view>
			<view class="shop_details-address">
				<view style="width: 80%;font-size: 30rpx;color: #000;"> 
					广东省广州市白云区景泰直街31号天津大厦首层，二层
				</view>
				<view style="width: 20%;text-align: center;font-size: 30rpx;color: #000;">
					<image :src="img_url+'dao_location.png'" mode="" style="width: 60rpx;height: 60rpx;display: block;margin: 0 auto;"></image>
					<text>导航</text>
				</view>
			</view>
			<view class="shop_detail_table">
				<view v-for="(item,index) in table" :key='index' @click="tableSelect(index)" :class="tableIndex==index?'active':''">
					<text>{{item}}</text>
					<text></text>
				</view>
			</view>
		</view>
		<view class="shop_detail_goods">
			<view class="shop_detail_goods_item" v-for="item in 3" :key='item'>
				<view class="shop_detail_goods_item_left">
					<image src="https://www.mingyuanriji.cn/web//uploads/images/original/20210605/c43a5504dbf63e117ff4d8240ddc6ccd.jpg" mode=""></image>
				</view>
				<view class="shop_detail_goods_item_center">
					<view style="height: 75%;color: #000;">超值双人餐</view>
					<view style="height: 25%;">
						<text style="color:rgb(234,51,63) ;font-weight: bold;margin-right: 10rpx;">￥40.60</text>
						<text  style="color:rgb(184,183,183) ;font-size: 26rpx;text-decoration: line-through;">￥40.60</text>
					</view>
				</view>
				<view class="shop_detail_goods_item_lright">
					<text>抢购</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				table:["优惠","商品"],
				tableIndex:0,
				
			};
		},
		methods:{
			tableSelect(index){//table选择
				this.tableIndex=index
			},
			link(){ //跳转到商户详情页面
				uni.navigateTo({
					url:'../shopDetail/shopDetail'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../plugins/font-icon/iconfont1.css");
	.shop_detail_container{width: 100%;overflow: hidden;}
	.shop_detail_header{width: 95%;overflow: hidden;background: #fff;margin: 20rpx auto;border-radius: 20rpx;padding: 20rpx;box-sizing: border-box;}
	.shop_detail_header_name{width: 100%;overflow: hidden;font-size: 35rpx;color: #000;font-weight: bold;}
	.shop_table_score{width: 100%;overflow: hidden;flex: 1;display: flex;align-items: center;margin-top: 10rpx;}
	.s-c-list-x{white-space: nowrap;width: 100%;height: 230rpx;color:#fff;overflow: hidden;margin: 20rpx 0;}
	.s-c-list-x .s-c-l-item{display: inline-block; width: 350rpx;height: 230rpx;margin-right: 20rpx;background-color:#27ae60;text-align: center; line-height: 230rpx;font-size: 100rpx;border-radius: 20rpx;}
	.s-c-list-x .s-c-l-item:nth-child(2n){background-color: #e74c3c;}
	.shop_details-hours-detail{width: 100%;overflow: hidden;display: flex;justify-content: space-between;margin: 25rpx 0;padding-right: 10rpx;box-sizing: border-box;}
	.shop_details-hours{font-size: 28rpx;color: #000;}
	.shop_details-detail{font-size: 28rpx;display: flex;justify-content: space-evenly;line-height: 44rpx;}
	.shop_details-detail image{width: 35rpx;height: 35rpx;display: inline-block;margin-top: 5rpx;}
	.shop_details-address{width: 100%;overflow: hidden;display: flex;justify-content: space-between;margin: 40rpx 0 10rpx 0;}
	.shop_detail_table{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;margin: 30rpx 0 15rpx 0;}
	.shop_detail_table view{display: flex;justify-content: space-evenly;flex-wrap: wrap;width: 30%;}
	.shop_detail_table view text{display:block;}
	.shop_detail_table view text:nth-of-type(1){width: 100%;text-align: center;margin-bottom: 5rpx;}
	.active{color: #FF7104}
	.active text:nth-of-type(2){background: #FF7104;width: 60rpx;height: 4rpx;}
	.shop_detail_goods{width: 95%;overflow: hidden;background: #fff;margin: 20rpx auto 100rpx;border-radius: 20rpx;padding: 20rpx;box-sizing: border-box;}
	.shop_detail_goods_item{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;margin-bottom: 50rpx;}
	.shop_detail_goods_item_left{width: 30%;height: 200rpx;}
	.shop_detail_goods_item_left image{width: 100%;height: 200rpx;display: block;}
	.shop_detail_goods_item_center{width: 55%;padding:0 15rpx;box-sizing: border-box;}
	.shop_detail_goods_item_lright{width: 15%;height: 200rpx;line-height: 200rpx;}
	.shop_detail_goods_item_lright text{display: inline-block;background: rgb(234,51,63);width: 100%;height: 60rpx;line-height: 60rpx;border-radius: 20rpx;font-size: 28rpx;text-align: center;color: #fff;}

</style>
