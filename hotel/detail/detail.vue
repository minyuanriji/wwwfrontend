<template>
	<view class="hotel-detail-app">
		<view class="hotel-detail-img">
			<image src="http://imgs.bestwehotel.com/images/inn/1bEImLhGsb" mode="aspectFill"></image>
		</view>
		<view class="hotel-detail-product">
			<view class="hotel-name">
				轻住•悦享酒店(济南长清大学城店)
			</view>
			<view class="hotel-detail-address-phone">
				<view style="width: 70%;font-size: 26rpx;">
					山东省济南市长青区三庆青年城二号楼1楼
				</view>
				<view class="address-phone">
					<view style="margin-right: 20rpx;" @click="location()">
						<image src="https://dev.mingyuanriji.cn/web/static//hotel/locations.png" mode="" style="margin: 5rpx 0 5rpx 0;"></image>
						<text>地图</text>
					</view>
					<view @click="callPhone">
						<image :src="img_url+'iphone-my-new.png'" mode="" style="width: 58rpx;height: 58rpx;"></image>
						<text>电话</text>
					</view>
				</view>
			</view>
		</view>
		<view class="hotel-facilities">
			<view class="hotel-facilities-list">
				<view>
					<image :src="img_url+'parking-lot.png'" mode=""></image>
					<text>停车场</text>
				</view>
				<view>
					<image :src="img_url+'wifi.png'" mode=""></image>
					<text>WIFI</text>
				</view>
				<view style="margin-right: 80rpx;">
					<image :src="img_url+'luggage.png'" mode=""></image>
					<text>行李寄存</text>
				</view>
				<view @click="morefacilities">
					<text>设施/服务</text>
					<image :src="img_url+'arrow-right-seracher.png'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="hotel-time" @click="timeShow=true">
			<view class="hotel-select-date">
				<view style="width: 35%;height: 120rpx;">
					<view style="text-align: center;line-height: 60rpx;font-size: 30rpx;">入住时间</view>
					<view style="text-align: center;line-height: 60rpx;color: rgb(255, 113, 4);">
						{{timeStaus.startStr.dateStr}}
					</view>
				</view>
				<view style="width: 10%;height: 120rpx;line-height: 120rpx;text-align: center;font-size: 30rpx;">
					至
				</view>
				<view style="width: 35%;height: 120rpx;">
					<view style="text-align: center;line-height: 60rpx;font-size: 30rpx;">离店时间</view>
					<view style="text-align: center;line-height: 60rpx;color: rgb(255, 113, 4);">
					{{timeStaus.endStr.dateStr}}
					</view>
				</view>
				<view style="width: 20%;height: 120rpx;box-sizing: border-box;" >
					<view style="width: 100%;margin: 65rpx 0 0 0;font-size: 28rpx;text-align: center;">共{{timeStaus.dayCount}}晚</view>
				</view>
			</view>
		</view>
		<view class="hoteil-room-list">
			<view class="hoteil-room-item" v-for="(item,index) in 5" :key='index' @click="reservation">
				<view class="hoteil-room-item-img">
					<image src="http://imgs.bestwehotel.com/images/inn/1bEImLhGsb" mode=""></image>
				</view>
				<view class="hoteil-room-item-product">
					<view style="font-size: 30rpx;color: #000;font-weight: bold;margin-top: 10rpx;">
						精品双床房
					</view>
					<view style="font-size: 27rpx;margin-top: 10rpx;">
						<text>30㎡</text>
						<text style="margin: 0 10rpx;">大床</text>
						<text>部分窗</text>
					</view>
				</view>
				<view class="hoteil-room-item-money">
					<view style="color:rgb(255, 113, 4) ;">
						<text style="font-size: 30rpx;">￥</text>
						<text style="font-weight: bold;font-size: 36rpx;">158</text>
					</view>
					<view>
						<image src="https://dev.mingyuanriji.cn/web/static//hotel/drawup.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="hotel-notice">
			<view class="hotel-notice-title">
				入住提示
			</view>
			<view class="hotel-notice-item">
				<text>
					•到店时间：请在入住日下午14：00后办理入住,提前到店可能需要等待
				</text>
			</view>
		</view>
		<calendar :is-show="timeShow"  :start-date="startDate" :end-date="endDate" mode="2"  @callback="getDate" />
		<unipopup ref="popup" type="bottom">
			<view style="width: 100%;min-height: 600rpx;background: #fff;border-radius: 20rpx 20rpx 0 0;box-sizing: border-box;">
				<view class="popup-title">
					精品双床房
				</view>
				<view class="popup-image">
					<image src="http://imgs.bestwehotel.com/images/inn/1bEImLhGsb" mode="aspectFill"></image>
				</view>
				<view class="popup-pruc-list">
					<view>
						<text>楼层</text>
						<text>1,2层</text>
					</view>
					<view>
						<text>窗户</text>
						<text>无窗</text>
					</view>
					<view>
						<text>床型</text>
						<text>1.0X2.0米</text>
					</view>
					<view>
						<text>面积</text>
						<text>30㎡</text>
					</view>
					<view>
						<text>人数</text>
						<text>2人</text>
					</view>
					<view>
						<text>网络</text>
						<text>WIFI</text>
					</view>
				</view>
				<view class="popup-facilities">
					<view class="popup-facilities-title" style="width: 100%;margin-bottom: 15rpx;color: #000;font-size: 36rpx;">
						设施信息
					</view>
					<text>免费WIFI</text>
					<text>免费停车</text>
					<text>行李寄存</text>
					<text>24小时前台服务</text>
					<text>公共区域闭路电视监控系统</text>
					<text>公共休息区</text>
				</view>
				<view class="reservationOrder">
					<view style="width: 30%;text-align: center;">
						<text style="font-size: 30rpx;">￥</text>
						<text style="font-size: 40rpx;color: rgb(255, 113, 4);font-weight: bold;">158</text>
					</view>
					<view style="width: 70%;background:rgb(255, 113, 4);text-align: center;color: #fff;" @click="orderSure">立即预订</view>
				</view>
			</view>
		</unipopup>
	
	</view>
</template>

<script>
	import Calendar from '@/components/mobile-calendar-simple/Calendar.vue';
	import unipopup from '@/components/uni-popup/uni-popup';
	export default {
		components:{
			Calendar, 
			unipopup,
		},
		data() {
			return {
				img_url: this.$api.img_url,
				timeShow:false,//入住时间选择
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
				startDate:'',//开始时间
				endDate:'',//结束时间
				time:'',//当前日期
				tomoryTime:'',//明天日期
			};
		},
		onLoad() {
			if(uni.getStorageSync('timeStaus')){
				this.timeStaus=uni.getStorageSync('timeStaus')
				this.startDate=uni.getStorageSync('timeStaus').startStr.dateStr
				this.endDate=uni.getStorageSync('timeStaus').endStr.dateStr
			}else{
				this.getTime()
			}
		},
		methods:{
			getTime(){
				this.time=this.changeTime(new Date())
				var day= new Date();
				day.setTime(day.getTime()+24*60*60*1000);
				this.tomoryTime = day.getFullYear()+"-" +((day.getMonth()+1)<10?'0'+(day.getMonth()+1):(day.getMonth()+1))+ "-" +(day.getDate()<10?'0'+day.getDate():day.getDate());
				this.startDate=this.time
				this.endDate=this.tomoryTime
				this.timeStaus.startStr.dateStr=this.time
				this.timeStaus.startStr.recent='今天'
				this.timeStaus.endStr.dateStr=this.tomoryTime
				this.timeStaus.endStr.recent='明天'
				this.timeStaus.dayCount=1
			},
			getDate(date){ //获取入住时间
				this.timeStaus=date				
				this.startDate=this.timeStaus.startStr.dateStr
				this.endDate=this.timeStaus.endStr.dateStr
				this.timeShow=false
				uni.setStorageSync('timeStaus',this.timeStaus)
			},
			changeTime(d){ //获取今日时间
			     return d.getFullYear() + '-' +((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate());
			},
			morefacilities(){//跳转到跟多的设施/服务
				uni.navigateTo({
					url:'../facilities/facilities'
				})
			},
			reservation(){ //预定弹窗
				this.$refs.popup.open()
			},
			orderSure(){
				uni.navigateTo({
					url:'../../mch/hotel/orderSure/orderSure'
				})
			},
			callPhone(phone){ //拨打电话
				alert("拨打电话")
				// uni.makePhoneCall({
				//  	// 手机号
				//     phoneNumber: phone, 				
				// 	// 成功回调
				// 	success: (res) => {
				// 		console.log('调用成功!')	
				// 	},				
				// 	// 失败回调
				// 	fail: (res) => {
				// 		console.log('调用失败!')
				// 	}					
				//  })
			},
			location(lat,lnt,addrress){
				alert("定位")
				// // #ifdef H5
				// window.location.href='https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+lat+','+lnt+';addr:'+addrress+'&referer=myapp&key=O3DBZ-IFH3W-KKIRN-RZPNQ-AOSH3-EGB5N'
				// // #endif
				
				// // #ifdef MP-WEIXIN || APP-PLUS
				// uni.openLocation({
				// 	latitude:Number(lat),
				// 	longitude:Number(lnt),
				// 	name:addrress,
				// 	address:addrress,
				// 	success: function () {
						
				// 	}
				// })	
				// // #endif
			}
		}
	}
</script>

<style lang="less">
	.hotel-detail-app{width: 100%;overflow: hidden;}
	.hotel-detail-img{width: 100%;height: 350rpx;}
	.hotel-detail-img image{display: block;width: 100%;height: 100%;}
	.hotel-detail-product{width: 100%;overflow: hidden;background: #fff;padding: 20rpx 30rpx;box-sizing: border-box;}
	.hotel-name{width: 100%;overflow: hidden;color: #000;font-weight: bold;}
	.hotel-detail-address-phone{width: 100%;overflow: hidden;display: flex;justify-content: space-between;margin: 20rpx 0 0 0;}
	.address-phone{width: 30%;overflow: hidden;display: flex;justify-content: space-evenly;font-size: 24rpx;}
	.address-phone image{display: block;width: 50rpx;height: 50rpx;}
	.hotel-facilities{width:100%;overflow: hidden;margin-top: 4rpx;background: #fff;padding: 0 30rpx;box-sizing: border-box;}
	.hotel-facilities-list{width: 100%;overflow: hidden;display: flex;justify-content: space-between;margin: 20rpx 0 30rpx 0;}
	.hotel-facilities-list view{display: flex;justify-content: space-evenly;font-size: 26rpx;}
	.hotel-facilities-list view image{width: 40rpx;height: 40rpx;}
	.hotel-time{width: 100%;overflow: hidden;background: #fff;margin: 6rpx 0 4rpx 0;}
	.hotel-select-date{width: 100%;height: 120rpx;border-bottom: 1rpx solid rgb(239,239,239);display: flex;justify-content: space-between;}
	.hotel-select-name{width: 100%;height: 100rpx;box-sizing: border-box;border-bottom: 1rpx solid rgb(239,239,239);padding: 0 30rpx 0 30rpx;line-height: 100rpx;}
	.hotel-select-name image{width: 30rpx;height: 30rpx;float: right;display: block;margin-top: 32rpx;}
	.hoteil-room-list{width: 100%;overflow: hidden;padding: 0 20rpx;box-sizing: border-box;margin:10rpx 0 4rpx 0;}
	.hoteil-room-item{width: 100%;height: 240rpx;display: flex;justify-content: space-evenly;background: #fff;padding: 20rpx 0;margin: 10rpx 0;}
	.hoteil-room-item-img{width: 30%;overflow: hidden;}
	.hoteil-room-item-img image{width: 100%;height:180rpx;display: block;float: left;margin-top: 10rpx;}
	.hoteil-room-item-product{width: 40%;height: 200rpx;padding-left: 15rpx;box-sizing: border-box;}
	.hoteil-room-item-money{width: 30%;height: 100rpx;display: flex;justify-content: space-evenly;margin-top: 90rpx;line-height: 100rpx;}
	.hoteil-room-item-money image{width: 55rpx;height: 60rpx;}
	.hotel-notice{width: 100%;overflow: hidden;padding:30rpx;box-sizing: border-box;background: #fff;margin-bottom: 100rpx;}
	.hotel-notice-title{color: #000;margin-bottom: 20rpx;}
	.hotel-notice-item{font-size: 26rpx;}
	.popup-title{width: 100%;height: 100rpx;text-align: center;line-height: 100rpx;color: #000;}
	.popup-image{width: 100%;height: 400rpx;}
	.popup-image image{display: block;width: 100%;height: 100%;}
	.popup-pruc-list{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;flex-wrap: wrap;margin-top:20rpx}
	.popup-pruc-list view{width: 50%;text-align: center;font-size: 28rpx;margin: 5rpx 0;}
	.popup-pruc-list view text{display: inline-block;width: 50%;}
	.popup-pruc-list view text:nth-of-type(1){text-align: right;padding-right: 30rpx;box-sizing: border-box;}
	.popup-pruc-list view text:nth-of-type(2){text-align: left;color: #000;}
	.popup-facilities{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;flex-wrap: wrap;padding: 20rpx;box-sizing: border-box;border-top: 1rpx solid rgb(242,245,249);border-bottom: 1rpx solid rgb(242,245,249);margin-top: 20rpx;font-size: 28rpx;margin-bottom: 40rpx;}
	.reservationOrder{width: 100%;height: 100rpx;display: flex;justify-content: space-between;line-height: 100rpx;}
</style>
