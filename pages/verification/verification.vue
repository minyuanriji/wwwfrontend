<template>
	<view class="verification-app">
		<view class="verification-code">
			<view class="code-logo">
				<view class="mask" v-if="showCode">
					<image :src="img_url+'/gou.png'" mode=""></image>
				</view>
				<image :src="codeDetail.file_path" mode=""></image>
				<text>核销码：{{codeDetail.code}}</text>
				<text>{{poup}}</text>
			</view>
		</view> 
		<view class="address-list">
			<view class="address_location">
				<image :src="img_url+'/ver_location_1.png'" @tap="chooseAddress"></image>
				<input type="text" v-model="address" placeholder="请选择你的定位" disabled />
				<image :src="img_url+'/erroDelete.png'" mode=""></image>
			</view>
			<view class="shopList">
				<view class="shopItem">
					<image :src="img_url+'/ver_location.png'" mode="" class="img_loc"></image>
					<view class="shopItem_message">
						<image src="../../plugins/images/extensions/community/index-bg.png" mode="" class="shop_logo"></image>
						<view class="_message">
							<view class="title_message">
								理发店
							</view>
							<view class="address_message">
								广东省广州市白云区某某接到
							</view>
							<view class="addess_num">
								距离200m
							</view>
						</view>
					</view>
					<image :src="img_url+'/right_check.png'" mode="" class="img_right"></image>
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
				codeDetail:'',
				poup:'',
				timer:'',
				showCode:true,
				address:''
			};
		},
		onLoad(options) {
			if(options.id){
				this.getCode(options.id)
				this.timer=setInterval(() => {
					this.getResult(options.orderId)
				},2500);
			}
		},
		methods:{
			getCode(id){
				this.$http.request({
					url: this.$api.moreShop.getOrdercode,
					data: {
						id:id
					}
				}).then((res) => {
					if (res.code == 0) {
						this.codeDetail=res.data
					}
				})
			},
			getResult(id) {
				if(	this.poup=="已核销")return false
				this.$http.request({
					url: this.$api.moreShop.getOrdercodestatus,
					method: 'POST',
					data: {
						id:id,
					},
				}).then(res => {
					if (res.code == 0) {
						let reult = res.data
						if (reult.clerk_status && reult.clerk_status == 1) {
							this.poup="已核销"
							this.showCode=true
						}else{
							this.poup="待核销"
							this.showCode=false
						}
					}
				})
			},
			chooseAddress(){
				var that = this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						that.address=res.address
						// that.form.longitude=String(res.longitude)
						// that.form.latitude=String(res.latitude)
					}
				})
			}
		},
		onUnload() {
			if(this.timer!=null) {  
			    clearInterval(this.timer);  
			    this.timer = null;  
			}  
		}
	}
</script>

<style lang="less" scoped>
	.verification-app{width: 100%;}
	.verification-code{width: 100%;height: 500rpx;position: relative;}
	.code-logo{width: 400rpx;height: 500rpx;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
	.code-logo image{width: 400rpx;height: 400rpx;display: block;}
	.code-logo text{display: block;width: 100%;height: 50rpx;text-align: center;line-height: 50rpx;
	background: #3F536E;color: #fff;}
	.address-list{width: 100%;overflow: hidden;background: #fff;box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.6);padding: 0 20rpx;}
	.address_location{width: 100%;height: 120rpx;border-bottom: 1rpx solid #BFBFBF;}
	.address_location image:nth-of-type(1){float: left;display: block;width: 50rpx;height: 50rpx;margin-top: 30rpx;}
	.address_location image:nth-of-type(2){float: right;display: block;width: 50rpx;height: 50rpx;margin-top: 30rpx;}
	.address_location input{float: left;height: 120rpx;width: 580rpx;padding-left: 20rpx;font-size: 30rpx;}
	.shopList{width: 100%;overflow: hidden;}
	.shopItem{width: 100%;overflow: hidden;}
	.img_loc{width: 50rpx;height: 50rpx;display: block;margin-top: 80rpx;float: left;}
	.img_right{width: 50rpx;height: 50rpx;display: block;margin-top: 80rpx;float: right;}
	.shopItem_message{float: left;display: flex;overflow: hidden;width: 600rpx;margin-left: 10rpx;}
	.shop_logo{width: 140rpx;height: 140rpx;display: block;margin: 40rpx 0;}
	.title_message{width: 410rpx;word-break: break-all;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;
		-webkit-line-clamp: 2;-webkit-box-orient: vertical;color: #000;font-size: 32rpx;margin: 10rpx 0 5rpx 10rpx;}
	.address_message{width: 410rpx;word-break: break-all;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;
		-webkit-line-clamp: 2;-webkit-box-orient: vertical;color: #000;font-size: 28rpx;margin: 10rpx 0 5rpx 10rpx;}
		.addess_num{width: 410rpx;word-break: break-all;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;
		-webkit-line-clamp: 2;-webkit-box-orient: vertical;color: #000;font-size: 28rpx;margin: 10rpx 0 5rpx 10rpx;}
	.mask{
		width: 400rpx;
		height: 400rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0,0,0,0.6);
	}
	.mask image{
		width: 150rpx;
		height: 150rpx;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		
	}
</style>
