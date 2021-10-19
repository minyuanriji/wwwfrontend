<template>
	<view class="vouchers-container">
		<!-- <view class="vouchers-type">
			<view v-for="(item,index) in tupe" :key='index' @click="select(index)">
				<text :class="secIndex==index?'active':''">{{item}}</text>
			</view>
		</view> -->
		<view class="goods">
				<view v-for="(item,index) in list" :key="index" class="goods_item">
					<image :src="item.cover_pic" mode="scaleToFill"></image>
					<view class="item_name">
						{{item.name}}
					</view>
					<view class="money_num">
						<view class="money" style="width: 50%;color: rgb(255, 113, 4);">
							<text style="font-size: 26rpx;">￥</text>
							<text style="font-size: 28rpx;">{{item.price}}</text>
						</view>
						<view style="width: 50%;font-size: 24rpx;line-height: 50rpx;text-align: right;">
							<text>{{item.sales}}</text>
						</view>
					</view>
					<view class="send" style="position: relative;">
						<view class="send_imag"></view>
						<text style="font-size: 24rpx;position: absolute;top: 10rpx;left: 78rpx;color: #fff;">{{item.got_shopping_voucher_num}}购物券</text>	
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list'],
		name:"vouchers",
		data() {
			return {
				tupe:[
					"热门推荐",
					"全网送红包",
					"红包兑换"
				],
				secIndex:0,
			};
		},
		methods:{
			
		},
	}
</script>

<style lang="less" scoped>
	.vouchers-container{width: 100%;overflow: hidden;background: #fff;margin-bottom: 20rpx;}
	.vouchers-type{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;}
	.vouchers-type view{width: 30%;}
	.vouchers-type view text{display: block;width: 80%;margin: 0 auto;height: 60rpx;margin: 0 auto;text-align: center;line-height: 60rpx;}
	.active{color: rgb(255, 113, 4);font-weight: bold;border-bottom: 5rpx solid rgb(255, 113, 4);}
	.goods{width: 94%;background: #fff;display: flex;justify-content: space-between;flex-wrap: wrap;margin: 0 auto;}
	.goods_item{width: 49%;border:1rpx solid rgb(239,239,239) ;height: 510rpx;border-radius: 15rpx;margin-top: 15rpx;}
	.goods_item image{width: 100%;height: 300rpx;display: block;}
	.item_name{font-size: 29rpx;color: #000;padding: 0 10rpx;box-sizing: border-box; overflow: hidden;margin: 10rpx 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;}
  .money_num{width: 100%;padding: 0 10rpx;box-sizing: border-box;display: flex;justify-content: space-between;}
  .send{padding: 0 10rpx;box-sizing: border-box;}
  .send_imag{min-width: 240rpx;display:inline-block;text-align: center;font-size: 24rpx;height: 80rpx;background: url(../mch/img/song.png);background-repeat: no-repeat;background-size: 100% 70%;color: #fff;}
</style>
