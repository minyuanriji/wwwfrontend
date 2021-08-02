<template>
	<view class="giftList-app">
		<view class="giftList-item" v-for="(item,index) in productList" :key='index' @click="linkDetail(item.id)">
			<view class="giftList-item-left">
				<image :src="item.cover_pic" mode="" class="giftLogo"></image>
				<view class="giftList-item-product">
					<view class="giftList-item-product-title">
						{{item.title}}
					</view>
					<view class="giftList-item-product-detail">
						{{item.descript}}
					</view>
					<view class="giftList-item-product-num">
						<image :src="img_url+'/gift-icon.png'" mode="" ></image>
						<text>含{{item.item_num}}款服务</text>
					</view>
					<view class="giftList-item-product-num" style="font-size: 25rpx;">
						<text>库存:{{item.max_stock}}</text>
						<text style="margin-left: 10rpx;">已售:{{item.sold_num}}</text>
					</view>
				</view>
			</view>
			<view class="giftList-item-right">
				<text>{{item.price}}元</text>
				<text>立即抢购</text>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				page:1,
				productList:[],
				page_count:'',
			};
		},
		onLoad() {
			this.packageList()
		},
		methods:{
			linkDetail(id){//跳转到大礼包详情
				uni.navigateTo({
					url:'../gifebagDetail/gifebagDetail?pack_id='+id
				})
			},
			packageList(){ //获取大礼包列表
				this.$http.request({
					url: this.$api.package.getpackageList,
					method: 'get',
					data: {
						page:this.page
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						if(res.data.list.length==0)return false
						let list= res.data.list;
						var arr=this.productList.concat(list)
						this.productList =arr
						this.page_count = res.data.pagination.page_count;
					} else {
						this.$http.toast(res.msg);
					}
				});
			}
		},
		onReachBottom() {
			if(this.page==this.page_count){
				return false;
			} 		
			this.page=this.page+1
			this.packageList();
		},
	}
</script>

<style lang="less">
	.giftList-app{width: 100%;overflow: hidden;}
	.giftList-item{width: 98%;overflow: hidden;display: flex;justify-content: space-evenly;margin: 10rpx auto;padding: 20rpx 0rpx;
	background: #FFFFFF;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);border-radius: 20rpx;}
	.giftList-item-left{width: 70%;display: flex;justify-content: space-between;}
	.giftLogo{width: 200rpx;height: 200rpx;display: block;}
	.giftList-item-product{width: 300rpx;}
	.giftList-item-product-title{font-size: 30rpx;color: #000;font-weight: bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.giftList-item-product-detail{font-size: 25rpx;margin: 10rpx 0;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
      overflow: hidden;}
	.giftList-item-product-num{font-size: 26rpx;margin-top: 20rpx;}
	.giftList-item-product-num image{width: 33rpx;height: 33rpx;float: left;margin: 5rpx 5rpx 0 0;}
	.giftList-item-right{width: 22%;height: 100%;}
	.giftList-item-right text{display: block;width: 100%;text-align: center;}
	.giftList-item-right text:nth-of-type(1){color: #FF5A0E;font-weight: bold;margin: 35rpx 0 20rpx 0;}
	.giftList-item-right text:nth-of-type(2){background: #FF5A0E;border-radius: 30rpx;font-size: 25rpx;height: 50rpx;line-height: 50rpx;color: #fff;}
</style>
