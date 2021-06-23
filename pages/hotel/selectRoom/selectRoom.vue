<template>
	<view class="selectRoom_app">
		<view class="hotel_show_image">
			<image :src="hotelProduct.thumb_url" mode="widthFix"></image>
		</view>
		<view class="selectRoom_detail">
			<view class="Room_title">
				<text>{{hotelProduct.name}}</text>
				<text style="color: rgb(251, 69, 18);">{{hotelProduct.type_text}}</text>
			</view>
			<view class="Room_notice">
				<text v-for="(item,index) in hotelProduct.tag" :key='index'>{{item}}</text>
			</view>
			<view class="hotel-jieshao" style="font-size: 25rpx;">
				酒店介绍：{{hotelProduct.descript}}
			</view>
			<view class="select_time" @click="timeShow=true">
				<view v-if="timeStaus.endStr.dateStr.length<=0">
					请选择入住时间
					<image :src="img_url+'/hotel/right.png'" mode=""></image>
				</view>
				<view v-if="timeStaus.endStr.dateStr.length>0">
					<text style="color:rgb(251, 69, 18) ;">
						{{timeStaus.startStr.dateStr}}{{timeStaus.startStr.recent}}----{{timeStaus.endStr.dateStr}}{{timeStaus.endStr.recent}}
					</text>
					<text style="color:rgb(251, 69, 18) ;">
						共{{timeStaus.dayCount}}天
					</text>
				</view>
			</view>
			<!-- <view class="selectRoom_type">
				<text>大床房</text>
			</view> -->
			<view class="Room_list">
				<view class="Room_item" v-for="(item,index) in hotel.booking_list" :key='index'>
					<view class="Room_items" @click="pouSHow(item)">
						<view class="Room_item_image">
							<image :src="item.product_thumb" mode=""></image>
						</view>
						<view class="Room_item_name">
							<text style="font-size: 28rpx;color: #000;">{{item.product_name}}</text>
							<view style="font-size: 25rpx;">
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.bed_type=='single'">单床</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.bed_type=='double'">双床</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.bed_type=='big'">大床</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.window=='no'">无窗</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.window=='out'">外窗</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.window=='part_no'">部分无窗</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.window=='inner'">内窗</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.window=='part_inner'">部分内窗</text>
								<text style="float: left;width: 100rpx;text-align: center;" v-if="item.ban_smoking==1">禁烟</text>
							</view>
						</view>
						<view class="Room_item_price">
							<view class="Room_item_price_detail">
								<text style="font-size: 25rpx;text-decoration: line-through;">￥{{item.product_price}}</text>
								<text style="color:#FB4512;">￥0{{item.check}}</text>
								<image :src="img_url+'/hotel/rightColor.png'" mode="" @click.stop="checkSHow(index)" v-if="checkIndex!=index"></image>
								<image :src="img_url+'/hotel/rightColor.png'" mode="" @click.stop="checkHidden(index)" v-if="checkIndex==index" class="rightColor_logo"></image>
							</view>
							<view class="shop_detail" style="margin-bottom: 20rpx;">
								补商汇红包全额抵扣
							</view>
						</view>
					</view>
					<view class="Room_detail"  v-if="checkIndex==index" @click="pouSHow(item)">
						<view class="Room_detail-left">
							<view class="Room_detail-title">{{item.product_name}}</view>
							<view class="Room_detail-notice">
								<image :src="img_url+'/hotel/face.png'" mode=""></image>
								<text>入住当天18点前可以免费取消</text>
							</view>
							<view class="Room_detail-forbid">
								<view v-if="item.ban_smoking==1">
									<image :src="img_url+'/hotel/nosmoking.png'" mode=""></image>
									<text>禁止吸烟</text>
								</view>
							</view>
						</view>
						<view class="Room_detail-right">
							<view class="Room_detail-right_left">
								<view>
									<text style="color: #707070;font-size: 25rpx;text-decoration: line-through;">￥{{item.product_price}}</text>
									<text  style="color: #FB4512;font-size: 30rpx;">￥0起</text>
								</view>
								<view style="min-width: 160rpx;font-size: 25rpx;text-align: center;border: 1px solid #FB4512;border-radius: 6rpx;color: #FB4512;">
									红包全额抵扣
								</view>
							</view>
							<view class="Room_detail-right_right" @click.stop="order">
								<image :src="img_url+'/hotel/drawup.png'" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="need-to-know">
				<view class="need-to-know_item">
					<image :src="img_url+'/hotel/need-to-know1.png'" mode="widthFix"></image>
					<!-- <view class="need-to-know-notice">
						<text @click="know">查看全部必读</text>
					</view> -->
				</view>
				<view class="need-to-know_item">
					<image :src="img_url+'/hotel/need-to-know2.png'" mode="widthFix"></image>
					<!-- <view class="need-to-know-notice">
						<text @click="know">查看详情</text>
					</view> -->
				</view>
				<view class="need-to-know_item">
					<image :src="img_url+'/hotel/need-to-know3.png'" mode="widthFix"></image>
					<!-- <view class="need-to-know-notice">
						<text @click="know">查看详情</text>
					</view> -->
				</view>
			</view>
		</view>
		<calendar :is-show="timeShow"  :start-date="startDate" :end-date="endDate" mode="2"  @callback="getDate" />	
		<com-bottom-popup :show="hotelDetalShow" @close="hidePopup">
			<view class="hotelDetalShow">
				<image :src="img_url+'/hotel/close.png'" mode="" class="closePoup" @click="hotelDetalShow=false"></image>
				<view class="hotelDetalShow-image">
					<image :src="itemDetai.product_thumb" mode=""></image>
				</view>
				<view class="hotelDetalShow-detail">
					<view class="hotelDetalShow_title">
						{{itemDetai.product_name}}
					</view>
					<view class="hotelDetalShow-detail-list">
						<view>
							<image src="" mode=""></image>
							<text v-if="itemDetai.bed_type=='single'">单床</text>
							<text v-if="itemDetai.bed_type=='double'">双床</text>
							<text v-if="itemDetai.bed_type=='big'">大床</text>
						</view>
						<view>
							<image src="" mode=""></image>
							<text v-if="itemDetai.window=='no'">无窗</text>
							<text v-if="itemDetai.window=='out'">外窗</text>
							<text v-if="itemDetai.window=='part_no'">部分无窗</text>
							<text v-if="itemDetai.window=='inner'">内窗</text>
							<text v-if="itemDetai.window=='part_inner'">部分内窗</text>
						</view>
						<view>
							<image src="" mode=""></image>
							<text v-if="itemDetai.ban_smoking==1">禁烟</text>
						</view>
					</view>
					<!-- <view class="hotelDetalShow_title">
						基础设施
					</view>
					<view class="hotelDetalShow-detail-list">
						<view v-for="item in 6" :key='item'>
							<image src="" mode=""></image>
							<text>1张大床（1.8m）</text>
						</view>
					</view> -->
				</view>
				<view class="sure">
					<view class="sure_money">
						<view>
							<view>
								<text style="color: #707070;font-size: 25rpx;text-decoration: line-through;">￥1888</text>
								<text style="color: #FB4512;font-size: 30rpx;">￥0起</text>
							</view>
							<view style="width: 160rpx;font-size: 25rpx;text-align: center;border: 1px solid #FB4512;border-radius: 6rpx;color: #FB4512;">
								红包全额抵扣
							</view>
						</view>
						<view class="sure_money_logo" @click="order">
							<image :src="img_url+'/hotel/drawup.png'" mode=""></image>
						</view>
					</view>
				</view>
			</view>			
		</com-bottom-popup>
	
	
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
				id:'',
				startDate:'',//开始时间
				endDate:'',//结束时间
				betweenStart:'',//区间时间开始
				betweenEnd:'',//取件时间结束
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
				heighShow:false,
				checkIndex:null,
				hotelDetalShow:false,
				hotel:'',
				hotelProduct:'',
				itemDetai:'',
			};
		},
		onLoad(options) {
			var myDate = new Date();
			let year=myDate.getFullYear();
			let monthy=myDate.getMonth()+1;
			let day=myDate.getDate(); 
			if(monthy<10){
				monthy='0'+monthy
			}
			if(day<10){
				day='0'+day
			}
			let nowTime=year+'-'+monthy+'-'+day
			let days=1
			if(options&&options.id){
				this.id=options.id
				this.getDetail(options.id,nowTime,days)
			}
		},
		methods:{
			getDate(date){ //获取入住时间
				this.timeStaus=date
			    console.log(date)
				this.timeShow=false
				this.getDetail(this.id,this.timeStaus.startStr.dateStr,this.timeStaus.dayCount)
			},
			getDetail(id,start_date,days){
				this.$http
					.request({
						url: this.$api.hotel.gethoteldetail,
						method: 'POST',
						data:{
							hotel_id:id,
							start_date:start_date,
							days:days,
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.hotel=res.data
							console.log(this.hotel)
							this.hotelProduct=res.data.hotel_info
						}else{
							this.$http.toast(res.msg);
						}
				});
			},
			checkSHow(index){
				this.checkIndex=index
				this.heighShow=true
			},
			checkHidden(index){
				this.heighShow=false
				this.checkIndex=null
			},
			pouSHow(item){
				this.hotelDetalShow=true
				this.itemDetai=item
				console.log(this.itemDetai)
			},
			know(){ //跳转需知页面
				uni.navigateTo({
					url:'../hotelKnow/hotelKnow'
				})
			},
			hidePopup(){
				this.hotelDetalShow = false;
			},
			order(){
				uni.navigateTo({
					url:'../orderSure/orderSure'
				})
			}
		}
	}
</script>

<style lang="less">
	.selectRoom_app{width: 100%;overflow: hidden;}
	.hotel_show_image{width: 100%;height: 320rpx;}
	.hotel_show_image image{width: 100%;display: block;}
	.selectRoom_detail{width: 100%;border-radius: 30rpx 30rpx 0 0;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.6);
	 overflow: hidden;background: #fff;opacity: 1;padding: 20rpx 20rpx 0 20rpx;position: relative;}
	 .Room_title{width: 100%;overflow: hidden;}
	 .Room_title text{display: inline-block;}
	 .Room_title text:nth-of-type(1){font-size: 30rpx;color: #000;}
	 .Room_title text:nth-of-type(2){font-size: 25rpx;margin-left: 20rpx;}
	 .Room_notice{width: 100%;overflow: hidden;font-size: 25rpx;margin-top: 20rpx;}
	 .Room_notice text{display: inline-block;float: left;margin:0 8rpx 8rpx 0;min-width: 120rpx;height: 50rpx;background: #EBEDF1;line-height: 50rpx;text-align: center;}
	 .select_time{width: 100%;height: 100rpx;margin: 40rpx auto 0;font-size: 28rpx;line-height: 100rpx;position: relative;border-bottom: 2px solid  #F5F5F5;
	 border-top: 2px solid  #F5F5F5;}
	 .select_time view{display: flex;justify-content: space-between;} 
	 .select_time image{width: 16rpx;height: 26rpx;display: block;position: absolute;top: 30rpx;right: 0;}
	 .select_time view text{display: block;}
	 .select_time view text:nth-of-type(1){width: 80%;color: #000;}
	 .select_time view text:nth-of-type(2){width: 20%;text-align: right;font-size: 25rpx;}
	 .selectRoom_type{width: 100%;overflow: hidden;margin-top: 20rpx;font-size: 25rpx;}
	 .selectRoom_type text{display: inline-block;float: left;min-width: 120rpx;height: 50rpx;background: #EBEDF1;line-height: 50rpx;text-align: center;}
	 .Room_list{width: 100%;overflow: hidden;}
     .Room_item{width: 100%;margin: 25rpx 0;border-bottom: 4px solid  #F5F5F5;}
	 .Room_items{width: 100%;display: flex;justify-content: space-between;overflow: hidden;}	
	 .Room_item_image{width: 148rpx;height: 148rpx;border-radius: 20rpx;}
	 .Room_item_image image{width: 160rpx;height: 160rpx;display: block;border-radius: 20rpx;margin-top: 20rpx;}
	 .Room_item_name{width: 300rpx;display: flex;flex-wrap: wrap;height: 120rpx;}
	 .Room_item_name text{display: block;width: 100%;}
	 .shop_detail{font-size: 25rpx;color:#FB4512 ;border: 1px solid #FB4512;border-radius: 10rpx;}
	 .Room_item_price_detail{margin-top: 100rpx;position: relative;}
	 .Room_item_price_detail image{width: 35rpx;height: 35rpx;display: block;position: absolute;top: 8rpx;right: 8rpx;}
	 .Room_detail{width: 100%;overflow: hidden;display: flex;justify-content: space-between;background: #F5F5F5;padding: 0 10rpx;}
	 .Room_detail-title{font-size: 30rpx;color: #000;width: 100%;overflow: hidden;margin-top: 10rpx;}
	 .Room_detail-notice{color: #14C4AD;font-size: 25rpx;margin: 15rpx 0;}
     .Room_detail-notice image{display:inline-block ;width: 22rpx;height: 22rpx;}
     .Room_detail-forbid{display: flex;justify-content: space-between;font-size: 25rpx;margin-bottom: 15rpx;}
     .Room_detail-forbid view image{display: inline-block;width: 22rpx;height: 22rpx;margin-top: 10rpx;}
	 .Room_detail-right_left{margin-top: 70rpx;}
	 .Room_detail-right{display: flex;justify-content: space-between;}
	 .Room_detail-right_right image{display: block;width: 70rpx;height: 74rpx;margin: 85rpx 10rpx 0 15rpx;}
	 .need-to-know{width: 100%;overflow: hidden;margin-bottom: 80rpx;}
	 .need-to-know view image{display: block;width: 100%;}	 
	 .need-to-know_item{position: relative;}
	 .need-to-know-notice{width: 100%;height: 55rpx;position: absolute;left: 0;bottom: 0;}
	 .need-to-know-notice text{display: block;width: 180rpx;height: 55rpx;color: #2088FF;margin: 0 auto;font-size: 25rpx;text-align: center;border: 1rpx solid #2088FF;line-height:55rpx ;
	 border-radius: 15rpx;}
	 .hotelDetalShow{width: 100%;overflow: hidden;position: relative;}
	 .hotelDetalShow-image{width: 100%;overflow: hidden;}
	 .hotelDetalShow-image image{width:100% ;border-radius: 20rpx 20rpx 0 0;height: 300rpx;display: block;}
	.hotelDetalShow-detail{width: 100%;overflow: hidden;padding: 0 20rpx;}
	.hotelDetalShow_title{width: 100%;overflow: hidden;font-size: 30rpx;color: #000;font-weight: bold;}
	.hotelDetalShow-detail-list{width: 100%;overflow: hidden;display: flex;
	justify-content: space-evenly;flex-wrap: wrap;}
	.hotelDetalShow-detail-list view{overflow: hidden;margin: 5rpx 0 0 0;}
	.hotelDetalShow-detail-list view image{width: 35rpx;height: 35rpx;display: inline-block;margin-top: 5rpx;}
	.hotelDetalShow-detail-list view text{display: inline-block;font-size: 25rpx;color: #000;height: 50rpx;line-height: 50rpx;text-align: center;}
	.sure{width: 100%;height: 110rpx;background: #fff;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.6);margin-top: 20rpx;}
	.sure_money{display: flex;justify-content: space-evenly;width: 300rpx;float: right;}
	.sure_money_logo image{display: block;width: 70rpx;height: 74rpx;margin-top: 10rpx;}
	.closePoup{width: 52rpx;height: 52rpx;position: absolute;top: 30rpx;right: 20rpx;z-index: 999;}
	.rightColor_logo{ transform: rotate(90deg);-webkit-transform: rotate(90deg); transition: transform 0.5s;}



</style>
