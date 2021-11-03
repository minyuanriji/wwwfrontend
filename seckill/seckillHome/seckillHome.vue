<template>
	<view class="seckillHome-container">
		<view class="seckillHome_header">
			<image :src="plugins_img_url+'/xgg.jpg'" mode="widthFix" style="width: 100%;display: block;"></image>
		</view>
		<view class="main">
			<view class="main_top">
				<view style="width: 44%;display: flex;justify-content: space-evenly;">
					<view style="width: 37%;text-align: center;">
						<image :src="plugins_img_url+'/sss.jpg'" mode="widthFix" style="width: 120rpx;display: block;height: 116rpx;margin-top: 30rpx;"></image>
					</view>
					<view style="width: 45%">
						<view  style="width: 100%;display: block;text-align: center;margin-top: 45rpx;font-size: 30rpx;color: #000;">热卖中</view>
						<view  style="width: 100%;display: block;text-align: center;font-size: 30rpx;">不能错过</view>
					</view>
				</view>
				<view style="width: 56%;line-height: 160rpx;font-size: 30rpx;color: #000;font-weight: bold;">
					抢购时间：2021-11-11开始
				</view>
			</view>
			<view class="list">
				<view class="item">
					<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20211018/af8287e1940ea564d15c60345c790bea.jpg" mode=""></image>
					<view class="item_right">
						<view class="item_name">
							牙刷成人软毛10-20支套装
						</view>
						<view class="item_tag">
							限时秒杀
						</view>
						<view class="retail_price" style="font-size: 30rpx;margin: 15rpx 0;color: #000;text-decoration: line-through;">
							零售价：￥129
						</view>
						<view class="price_go">
							<view class="kill_price" style="width:100%;display: flex;justify-content: space-between;" >
								<view style="font-size: 30rpx;color: rgb(254,0,0);width: 30%;">
									秒杀价：
								</view>
								<view style="font-size: 30rpx;color: rgb(254,0,0);font-weight: bold;width: 70%;">
									<text>12200积分+25运营费</text>
								</view>
							</view>
						</view>
						<view class="go_buy">
							<view style="text-align: center;color: #fff;font-size: 30rpx;line-height: 60rpx;">
								去抢购
							</view>
							<!-- <view style="width: 90%;margin: 0 auto;display: flex;justify-content: space-between;">
								<view style="width: 65%;padding: 15rpx 0;">
									 <progress :percent="percent" :show-info='false' stroke-width="5" font-size='10' activeColor="red" />
								</view>
								<view style="width: 30%;font-size: 24rpx;color: #fff;">
									20%
								</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				percent:"20",
				plugins_img_url: this.$api.plugins_img_url,
			}
		},
		onLoad() {
		
		},
		methods:{
			
		}
	}
</script>
<style>
	.uni-progress-info{font-size: 24rpx!important;}
</style>
<style lang="less" scoped>
	.seckillHome-container{width: 100%;overflow: hidden;}
	.seckillHome_header{width: 100%;overflow: hidden;}
	.main{width: 100%;overflow: hidden;background:rgb(240,240,240);position: relative;top: -40rpx;z-index: 99;border-radius: 25rpx 25rpx 0 0;}
	.main_top{width: 100%;height: 160rpx;display: flex;justify-content: space-between;}
	.list{width: 100%;overflow: hidden;margin-top: 20rpx;}
	.item{width: 95%;overflow: hidden;background: #fff;border-radius: 15rpx;margin: 0 auto;display: flex;justify-content: space-between;padding: 25rpx 10rpx;}
	.item image{width: 210rpx;height: 210rpx;display: block;margin-top: 10rpx;}
	.item_right{width: 470rpx;position: relative;}
	.item_name{font-size: 32rpx;color: #000;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
	.item_tag{width: 130rpx;color: rgb(255,79,17);font-size: 24rpx;border: 1rpx solid rgb(255,79,17);border-radius: 10rpx;text-align: center;margin-top: 5rpx;}
	.price_go{width: 100%;display: flex;justify-content: space-between;margin-top: 25rpx;height: 75rpx;}
	.go_buy{width: 160rpx;background: rgb(253,174,9);border-radius: 10rpx;position: absolute;top: 80rpx;right: 0;height: 60rpx;}


</style>
