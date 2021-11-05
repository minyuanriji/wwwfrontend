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
				<image :src="detail.mpwx_pic" mode="" style="width: 100%;height: 100%;display: blo;"></image>
			</view>
			 <!--#endif -->
			 <!-- #ifdef MP-WEIXIN -->
			 <view class="codeImg">
			 	<image :src="detail.mpwx_pic" mode="" style="width: 100%;height: 100%;display: blo;" @click="goTowp"></image>
			 </view>
			  <!--#endif -->
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
			goTowp(){ //跳到小程序
				let appId=this.detail.mpwx_app_id
				let path=this.detail.mpwx_path
				//#ifdef MP-WEIXIN
					 wx.navigateToMiniProgram({
						appId: appId,
						path: path,
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
