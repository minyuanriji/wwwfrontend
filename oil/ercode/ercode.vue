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
		<view style="padding-top:60rpx;background:white;width:100%;position:absolute;bottom:0rpx;height:300rpx;text-align:center;">
			<view style="">
				<text @click="goTowp" style="display:inline-block;border-radius:8rpx;color:#ff7104;border:1px solid #ff7104;width:300rpx;padding:15rpx 0rpx;">打开兑换小程序</text>
			</view>
			<view style="margin-top:30rpx;">
				<text @click="openLa" style="display:inline-block;border-radius:8rpx;width: 100rpx;color:#ff7104;border:1px solid #ff7104;width:300rpx;padding:15rpx 0rpx;">打开中石化小程序</text>
			</view>
		</view>
		<unipopup ref="popup" type="center">
			<view class="popup_view">
				<view class="popup_title">
					请选择兑换城市(必选)
				</view>
				<view class="popup-city">
					<text   :class="selectINdex==index?'active':''"   v-for="(item,index) in cityList" :key='index' @click="select(index,item.codenum)">
						{{item.name}}
					</text>
				</view>
				<view class="sure" @click="sure">确定</view>
			</view>
		</unipopup>
	</view>
</template>

<script>
	import unipopup from '@/components/uni-popupoil/uni-popup';
	export default {
		components:{
			unipopup,
		},
		data() {
			return {
				plugins_img_url: this.$api.plugins_img_url,
				detail:'',
				cityList:[
					{
						name:'广东',
						codenum:'1941',
					},
					{
						name:'广西',
						codenum:'2088',
					},
				],
				selectINdex:null,
				form:{
					id:'',
					use_province:'',//省份：2088（广西），1941（广东）
				}
			};
		},
		onLoad(options) {
			let that=this
			that.form.id=options.id
			setTimeout(()=>{
				that.$refs.popup.open()
			})
		},
		methods:{
			select(index,use_province){ //选择城市
				this.selectINdex=index
				this.form.use_province=use_province
			},
			sure(){ //点击确定
				if(this.selectINdex==null){
					this.$http.toast('请选择城市');
					return
				}else{
					this.$refs.popup.close()
					this.getcode()
				}
			},
			getcode(){//获取二维码
				this.$http.request({
					url: this.$api.oil.getoilcode,
					method: 'POST',
					data:this.form,
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
	.popup_view{width: 500rpx;height: 450rpx;background: #fff;border-radius: 30rpx;}
	.popup_title{width: 100%;height: 120rpx;text-align: center;line-height: 120rpx;font-size: 32rpx;color: #000;}
	.popup-city{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;margin: 40rpx 0 80rpx 0;}
	.popup-city text{display: block;width: 200rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 20rpx;color: #000;font-weight: bold;}
	.active{background: #de3b2d;color: #fff!important;}
	.sure{width: 90%;height: 80rpx;background: red;text-align: center;line-height: 80rpx;margin: 0 auto;border-radius: 20rpx;color: #fff;}
</style>
