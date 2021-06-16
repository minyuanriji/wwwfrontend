<template>
	<view class="hotel_app">
		<view class="hotel_search">
			<view class="hotel_search_header">
				<view @click="select(1)" :class="selectIndex==1?'active':''">国内</view>
				<view @click="select(2)" :class="selectIndex==2?'active':''">钟点房</view>
				<view @click="select(3)" :class="selectIndex==3?'active':''">民宿</view>
			</view>
			<view class="hotel_search_address">
				<view class="hotel_search_address_int">
					北京
				</view>
				<view class="hotel_search_address_right">
					<image :src="img_url+'/hotel/right.png'" mode=""></image>
				</view>
				<view class="hotel_search_address_location">
					<image :src="img_url+'/hotel/my-location.png'" mode=""></image>
					<text>我的位置</text>
				</view>
			</view>
			<view class="hotel_search_time" @click="timeShow=true">
				<view v-if="timeStaus.endStr.dateStr.length<=0">
					请选择入住时间
					<image :src="img_url+'/hotel/right.png'" mode=""></image>
				</view>
				<view v-if="timeStaus.endStr.dateStr.length>0">
					<text>
						{{timeStaus.startStr.dateStr}}{{timeStaus.startStr.recent}}----{{timeStaus.endStr.dateStr}}{{timeStaus.endStr.recent}}
					</text>
					<text>
						共{{timeStaus.dayCount}}天
					</text>
				</view>
			</view>
			<view class="hotel_search_hotel_address">
				<input type="text" value="" placeholder="酒店/地标/关键词"/>
				<!-- <image :src="img_url+'/hotel/right.png'" mode=""></image> -->
			</view>
			<view class="hotel_search_screening">
				<input type="text" value="" placeholder="酒店/地标/关键词"/>
				<image :src="img_url+'/hotel/right.png'" mode=""></image>
			</view>
			<view class="hotel_search_sure">
				搜索酒店
			</view>
		</view>
		 <calendar :is-show="timeShow"  :start-date="startDate" :end-date="endDate" mode="2"  @callback="getDate" />
	</view>
</template>

<script>
	import Calendar from '@/components/mobile-calendar-simple/Calendar.vue'
	export default {
		components:{
			Calendar,
		},
		data() {
			return {
				img_url: this.$api.img_url,
				selectIndex:1,
				startDate:'',
				endDate:'',
				betweenStart:'',
				betweenEnd:'',
				timeShow:false,
				timeStaus:{
					dayCount:'',
					endStr:{
						dateStr:'',
						recent:'',
						week:''
					},
					startStr:{
						dateStr:'',
						recent:'',
						week:''
					}
				},
				
			};
		},
		onLoad() {
			
		},
		methods:{
			select(index){ //点击切换类型
				this.selectIndex=index
			},
			getDate(date){				
				this.timeStaus=date
			    console.log(date)
				this.timeShow=false
			}
		}
		
	}
</script>

<style lang="less">
	.hotel_app{width: 100%;overflow: hidden;background: url(https://dev.mingyuanriji.cn/web/static/hotel/hotel_back.png)no-repeat;background-size: 100%;}
	.hotel_search{width:696rpx;height: 586rpx;margin: 80px auto 0;border-radius: 20rpx;opacity: 1;background: #FFFFFF;
	 box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);}
	.hotel_search_header{width: 100%;height: 88rpx;display: flex;justify-content: space-evenly;}
	.hotel_search_header view{line-height: 84rpx;}
	.active{border-bottom: 4rpx solid #ED6D00;color: #0E0E0E;font-size: 30rpx;font-weight: 600;}
	.hotel_search_address{width: 100%;margin-top: 20rpx;height: 80rpx;padding: 0 30rpx;
	box-sizing: border-box;display: flex;justify-content: space-between;position: relative;}
	.hotel_search_address_int{width: 70%;height: 80rpx;line-height: 80rpx;color: #000;}
	.hotel_search_address_right{width: 5%;text-align: center;line-height: 80rpx;}
	.hotel_search_address_right image{width: 16rpx;height: 26rpx;}
	.hotel_search_address_location {width: 25%;height: 80rpx;}
	.hotel_search_address_location image{width: 30rpx;height: 36rpx;display: block;margin: 0 auto;}
	.hotel_search_address_location  text{display: block;font-size: 25rpx;color: #2EAFD0;text-align: center;}
	.hotel_search_time{width: 90%;height: 80rpx;border-bottom: 1rpx dashed ;margin: 0 auto;font-size: 28rpx;line-height: 80rpx;position: relative;}
	.hotel_search_time view{display: flex;justify-content: space-between;} 
	.hotel_search_time image{width: 16rpx;height: 26rpx;display: block;position: absolute;top: 30rpx;right: 0;}
	.hotel_search_time view text{display: block;}
	.hotel_search_time view text:nth-of-type(1){width: 80%;color: #000;}
	.hotel_search_time view text:nth-of-type(2){width: 20%;text-align: right;font-size: 25rpx;}
	.hotel_search_hotel_address{width: 90%;height: 80rpx;border-bottom: 1rpx dashed ;margin: 10rpx auto 0;font-size: 28rpx;line-height: 80rpx;}
	.hotel_search_hotel_address input{width: 80%;height: 80rpx;line-height: 80rpx;font-size: 28rpx;float: left;}
	.hotel_search_hotel_address image{width: 16rpx;height: 26rpx;float: right;margin-top: 30rpx;}
	.hotel_search_screening{width: 90%;height: 80rpx;margin: 10rpx auto 0;font-size: 28rpx;line-height: 80rpx;}
	.hotel_search_screening input{width: 80%;height: 80rpx;line-height: 80rpx;font-size: 28rpx;float: left;}
	.hotel_search_screening image{width: 16rpx;height: 26rpx;float: right;margin-top: 30rpx;}
	.hotel_search_sure{width: 90%;height: 90rpx;margin: 20rpx auto 0;text-align: center;line-height: 90rpx;color: #fff;font-size: 30rpx;
	background: url(https://dev.mingyuanriji.cn/web/static/hotel/searchHotel.png)no-repeat;background-size: 100%;}
</style>
