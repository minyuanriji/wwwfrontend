<template>
	<view class="ercode_container">
		<image :src="plugins_img_url+'/oilcode.jpg'" mode="widthFix" style="width: 100%;display: block;"></image>
		<view class="code">
			<view class="header" style="width: 100%;height: 200rpx;color: #fff;text-align: center;line-height: 200rpx;font-size: 50rpx;">加入补商汇，加油全免费</view>
			<text style="text-align: center;display: block;width: 100%;color: #000;margin: 80rpx 0 20rpx 0;">兑换码：{{detail.couponCode}}</text>
			<!-- #ifdef H5 -->
			<view class="btn" v-clipboard:copy="detail.couponCode" v-clipboard:success="(type) => paste('success')" v-clipboard:error="(type) => paste('error')">复制兑换码</view>
			 <!--#endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="btn" @tap="copy(detail.couponCode)">复制兑换码</view>
			 <!--#endif -->
			<!-- #ifdef H5 -->
			<view class="codeImg">
				<image :src="detail.mpwx_pic" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			 <!--#endif -->
			 <!-- #ifdef MP-WEIXIN -->
			 <view class="codeImg">
			 	<image :src="detail.mpwx_pic" mode="" style="width: 100%;height: 100%;display: blo;" @click="goTowp"></image>
			 </view>
			  <!--#endif -->
		</view>
		<view style="padding-top:60rpx;background:white;width:100%;position:absolute;bottom:0rpx;height:280rpx;text-align:center;">
			<text @click="openLa" style="border-radius:8rpx;width: 100rpx;color:#ff7104;border:1px solid #ff7104;padding:15rpx 50rpx;">打开加油小程序</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plugins_img_url: this.$api.plugins_img_url,
				detail:''
			};
		},
		onLoad(options) {
			if(options.id){
				this.getcode(options.id)
			}
		},
		methods:{
			getcode(id){//获取二维码
				this.$http.request({
					url: this.$api.oil.getoilcode,
					method: 'POST',
					data:{
						id:id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.detail=res.data
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			copy(serialize_no){
				let that=this
				uni.showToast({ title:'复制成功' })
				wx.setClipboardData({
					data:"兑换码："+that.detail.couponCode,
					success:function(res){
						wx.getClipboardData({
							success:function(result){
								console.log(result.data)
							}
						})
					}
				})
			},
			paste(type) {
				if (type==='success') {
					uni.showToast({ title:'复制成功' })
				} else {
					uni.showToast({ title:'复制失败' })
				}
			},
			openLa(){
				// #ifdef H5
				this.$http.toast('请使用小程序打开本页面')
				// #endif
				//#ifdef MP-WEIXIN
				 wx.navigateToMiniProgram({
					appId: "wx32fe2eb8b2fa221f",
					path: "/",
					envVersion: 'release',// 打开正式版
					success(res) {
						   // 打开成功
					},
					fail: function (err) {
						console.log(err);
					}
				})
				//#endif
			},
			goTowp(){ //跳到兑换小程序
				// #ifdef H5
				this.$http.toast('请使用小程序打开本页面')
				// #endif
				
				//#ifdef MP-WEIXIN
				let appId=this.detail.mpwx_app_id
				let path=this.detail.mpwx_path
				 wx.navigateToMiniProgram({
					appId: appId,
					path: path,
					extraData: {
						mobile: this.detail.mobile,
						couponCode: this.detail.couponCode
					},
					envVersion: 'release',// 打开正式版
					success(res) {
						   // 打开成功
					},
					fail: function (err) {
						console.log(err);
					}
				})
				//#endif
			}
		}
	}
</script>

<style lang="less">
	.ercode_container{width: 100%;overflow: hidden;position: relative;}
	.code{width: 100%;height: 100%;position: absolute;top: 0;left: 0;}
	.codeImg{width: 400rpx;height: 400rpx;margin: 80rpx auto 0;}
	.btn{background: none;width: 180rpx;font-size: 28rpx;height: 60rpx;line-height: 60rpx;color: #fff;background: rgb(255, 113, 4);margin: 0 auto;text-align: center;border-radius: 15rpx;}
</style>
