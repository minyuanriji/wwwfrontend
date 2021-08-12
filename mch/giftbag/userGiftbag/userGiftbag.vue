<template>
	<view class="userGiftbag-app">
		<view class="giftbagCapacity-item">
			<image :src="seviceDetail.cover_pic" mode="" class="logo"></image>
			<view class="giftbagCapacity-product">
				<view>
					<image :src="img_url+'/gift_star.png'" mode="" class="star"></image>
					<text style="font-size: 25rpx;">{{seviceDetail.score}}</text>
					<text style="margin: 10rpx 0rpx 0 8rpx;height: 30rpx;background: #F4F4F4;width: 5rpx;"></text>
					<text style="width: 370rpx;font-size: 30rpx;color: #000;padding-left: 10rpx;">{{seviceDetail.name}}</text>
				</view>
				<view style="font-size: 26rpx;">
					{{seviceDetail.store_name}}
				</view>
				<view style="margin-top: 50rpx;">
					<image :src="img_url+'/gift_tishi.png'" mode="" style="float: left;margin: 15rpx 10rpx 0 0;width: 30rpx;height: 27rpx;"></image>
					<text style="width: 370rpx;font-size: 25rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{seviceDetail.infos}}</text>
				</view>
				<view class="location_div" @click.stop="location(seviceDetail.latitude,seviceDetail.longitude,seviceDetail.address)">
					<image :src="img_url+'/gift_location.png'" mode="" class="loc"></image>
					<text>{{seviceDetail.distance_format}}</text>
				</view>
			</view>
		</view>
		<view class="btn" v-if="seviceDetail.is_available==0" style="background: #C0C0C0;">
			已使用完，或者已失效
		</view>
		<view class="btn" @click="showQrde" v-if="seviceDetail.is_available==1">
			点击展示二维码
		</view>
		<unipopup ref="popupgo" type="center">
			<view class="Qrcode">
				<image :src="file_path" mode=""></image>
			</view>
		</unipopup>
	</view>
</template>

<script>
	import unipopup from '@/components/uni-popup/uni-popup';
	export default {
		components: {
			unipopup
		},
		data() {
			return {
				img_url: this.$api.img_url,
				seviceDetail:'',
				file_path:'',
				order_id:'',
				pack_item_id:'',
			};
		},
		onLoad(options) {
			if(options&&options.order_id&&options.pack_item_id){
				this.getDetail(options.order_id,options.pack_item_id)
				this.order_id=options.order_id
				this.pack_item_id=options.pack_item_id
			}
		},
		methods:{
			location(lat,lnt,address){//导航
				// #ifdef H5
				window.location.href='https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+lat+','+lnt+';addr:'+address+'&referer=myapp&key=O3DBZ-IFH3W-KKIRN-RZPNQ-AOSH3-EGB5N'
				// #endif
			
				// #ifdef MP-WEIXIN || APP-PLUS
				uni.openLocation({
					latitude:Number(lat),
					longitude:Number(lnt),
					name:address,
					address:address,
					success: function () {
						
					}
				 });
				 // #endif
			},
			showQrde(){//点击展示二维码
			
				
			
				// #ifdef H5
				let route = '/h5/#/pages/newmoreShop/newmoreShop';
				// #endif
				
				// #ifdef MP-WEIXIN || APP-PLUS
				let route = 'pages/newmoreShop/newmoreShop';
				// #endif
				
				let that=this
				that.$http
					.request({
						url: that.$api.package.generateQRcode,
						method: 'POST',
						data:{
							order_id:that.order_id,//订单ID
							pack_item_id:that.pack_item_id,//大礼包物品ID
							route_with_param:route,//带参数的前端路由
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							that.$refs.popupgo.open()
							this.file_path=res.data.file_path
						}else{
							that.$http.toast(res.msg);
						}
				});
			},
			getDetail(order_id,pack_item_id){//点击展示二维码
				let that=this
				that.$http
					.request({
						url: that.$api.package.getitemdetail,
						method: 'POST',
						data:{
							order_id:order_id,//订单ID
							pack_item_id:pack_item_id,//大礼包物品ID
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.seviceDetail=res.data.detail
						}else{
							that.$http.toast(res.msg);
						}
				});
			}
		}
	}
</script>

<style lang="less">
	.userGiftbag-app{width: 100%;overflow: hidden;}
	.giftbagCapacity-item{width: 98%;overflow: hidden;margin: 10rpx auto;padding: 20rpx 10rpx;
	background: #FFFFFF;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);border-radius: 20rpx;}
	.logo{width: 240rpx;height: 200rpx;display: block;float: left;}
	.giftbagCapacity-product{float: left;width: 450rpx;margin-left: 20rpx;position: relative;}
	.giftbagCapacity-product text{display: inline-block;height: 48rpx;line-height: 48rpx;float: left;}
	.giftbagCapacity-product text:nth-of-type(3){overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.star{width:30rpx ;height: 27rpx;float: left;margin-top: 10rpx;}
	.location_div{font-size: 28rpx;position: absolute;right: 0;top: 50rpx;}
	.location_div text{display: block;width: 100%;text-align: center;font-size: 25rpx;height: 40rpx;line-height: 40rpx;}
	.loc{width: 23rpx;height: 35rpx;display: block;margin: 0 auto;}
	.btn{width: 80%;height: 80rpx;background: rgb(255, 113, 4);color: #fff;text-align: center;line-height: 80rpx;margin: 50rpx auto 0;border-radius: 40rpx;}
	.Qrcode{width: 400rpx;height: 400rpx;}
	.Qrcode image{width: 400rpx;height: 400rpx;display: block;}
</style>
