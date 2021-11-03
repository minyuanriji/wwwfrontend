<template>
	<view class="oilHome-container">
		<view class="header">
			<view class="location">
				<image src="https://dev.mingyuanriji.cn/web/static/samecitycheck.png" mode="" style="display: block;width: 30rpx;height: 30rpx;float: left;margin-top: 10rpx;"></image>
				<text>{{addressName}}</text>
			</view>
			<view class="location" @click="linkTo">
				兑换记录
			</view> 
		</view>
		<view class="main">
			<view class="rechargePhone">
				<input type="number" v-model.trim="form.mobile"  placeholder="请输入手机号码" maxlength="11"/>
			</view>
			<view class="phonenotice">
				该手机号用来关联电子加油劵账户
			</view>
			<view class="select_num">
				<view class="select_num_header">
					选择面额
				</view>
				<view class="num_list">
					<view class="item" v-for="(item,index) in produceList" :key='index' @click="selectNum(item)">
						<view style="text-align: center;margin: 65rpx 0 0 0;color: rgb(37,130,234);">
							<text style="font-size: 26rpx;font-weight: bold;">￥</text>
							<text  style="font-size: 40rpx;font-weight: bold;">{{item.price}}</text>
						</view>
						<!-- <view style="text-align: center;font-size: 28rpx;color: rgb(37,130,234);">
							<text>会员权益</text>
							<text style="font-size: 26rpx;">100.00</text>
							<text>元</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="remeber_notice">
				<view class="remeber_notice_header">
					注意事项
				</view>
				<view class="remeber_notice_detail">
					<view>
						1：充值前请核对充值号码
					</view>
					<view>
						2：充值后1-30分钟内到账，月初稍慢一些
					</view>
					<view>
						3：红包充值不返购物券
					</view>
					<view>
						4：如对本次充值相关内容有疑问,请联系客服
					</view>
					<view>
						5：暂不支持携号转网的手机号充值
					</view>
				</view>
			</view>
		</view>
		<unipopup ref="popup" type="bottom">
			<view class="popup_view">
				<view class="popup_view_header">
					<image src="../../plugins/images/extensions/o2o/shuiguotu.png" mode="" style="width: 120rpx;height: 80rpx;display: block;float: left;margin: 10rpx 20rpx 0 20rpx;"></image>
					<view>
						<text style="display: block;font-size: 30rpx;margin-bottom: 10rpx;">兑换手机号码</text>
						<text style="display: block;color: #000;font-weight: bold;">{{form.mobile}}</text>
					</view>
				</view>
				<view class="popup_view_denomination">
					<view style="line-height: 100rpx;color: #000;">加油卷面额</view>
					<view style="line-height: 100rpx;color: rgb(255,129,71);">￥{{price}}</view>
				</view>
				<view class="use-points">
					<view style="color: #000;">使用红包 <view class="xieti" style="font-size: 18rpx;color: #666;">拥有红包：{{previewDetail.user_integral}}
						<text class="text" v-if="is_checked" style="font-style: oblique;color: #F53939;margin-left: 20rpx;padding-right: 10rpx;">-{{previewDetail.integral_deduction_price}}</text>
					</view>
					</view>
					<switch :checked="is_checked" @change="use" color='#FF7104' class="points-switch" />
				</view>
				<view class="count">					
					<view style="line-height:120rpx;margin-left: 30rpx;">
						<text style="color: #000;">合计：</text>
						<text style="color: rgb(255,129,71);">￥{{previewDetail.total_price}}</text>
					</view>
					<view style="line-height:120rpx;background: rgb(37,130,234);width: 180rpx;color: #fff;text-align: center;border-radius: 0 60rpx 60rpx 0;" @click="gopay">
						去支付
					</view>
				</view>
			</view>
		</unipopup>
	
	</view>
</template>

<script>
	import {isEmpty} from '../../common/validate.js';
	import unipopup from '@/components/uni-popup/uni-popup';
	export default{
		components:{
			unipopup,
		},
		data(){
			return{
				addressName:'定位中...',//定位的省市区名字
				form:{ //请求的参数
					mobile:'',//电话
					product_id:'',//产品ID
					use_integral:1,//是否使用红包  使用红包：0否，1是
					lng:'',
					lat:'',
				},
				is_checked:true,
				produceList:[],//加油产品
				price:'',//加油面额
				previewDetail:'',//预览详情
			}
		},
		onLoad() {
			this.getmyLOcation()
		},
		methods:{
			selectNum(item){ //点击面额
			    this.price=item.price
				if(isEmpty(this.form.mobile)){
					uni.showToast({
						title: "请输入手机号码",
						icon: 'none'
					})
					return
				}
				this.form.product_id=item.id
				this.getProductpreview()
			},
			gopay(){//点击去支付 提交订单
				this.dosubmite()
			},
			getmyLOcation() { //获取定位信息
				let that = this				
				//#ifdef H5
				that.$unifylocation.locationH5()
				setTimeout(() => {
					if(uni.getStorageSync('x-longitude-new'),uni.getStorageSync('x-latitude-new')){
						uni.setStorageSync('x-longitude',uni.getStorageSync('x-longitude-new'))
						uni.setStorageSync('x-latitude',uni.getStorageSync('x-latitude-new'))
					}
				}, 500)
				setTimeout(() => {
			
			    //在这里请求获取面额的接口  拿到省市区名字赋值
					this.getProductlist()
			
				}, 1000)
				// #endif
				
				// #ifndef H5
				that.$unifylocation.locationMp()
				setTimeout(() => {
					if(uni.getStorageSync('x-longitude-new'),uni.getStorageSync('x-latitude-new')){
						uni.setStorageSync('x-longitude',uni.getStorageSync('x-longitude-new'))
						uni.setStorageSync('x-latitude',uni.getStorageSync('x-latitude-new'))
					}
				}, 500)
				setTimeout(() => {
					
					 //在这里请求获取面额的接口  拿到省市区名字赋值
					this.getProductlist()
					
				}, 1000)
				// #endif
			},
			linkTo(){ //跳转到兑换记录
				uni.navigateTo({
					url:'../oilrecord/oilrecord'
				})
			},
			use(e) {
				this.is_checked=e.detail.value
				if(this.is_checked){
					this.form.use_integral=1
					this.getProductpreview()
				}
				if(!this.is_checked){
					this.form.use_integral=0
					this.getProductpreview()
				}
			},
			getProductlist(){//获取加油产量列表
				this.$http.request({
					url: this.$api.oil.getoilproduct,
					method: 'POST',
					data:'',
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.addressName=res.city_data.district
						this.form.lng=res.city_data.longitude
						this.form.lat=res.city_data.latitude
						this.produceList=res.data.list
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			getProductpreview(){//获取加油产量预览
				this.$http.request({
					url: this.$api.oil.getoilpreview,
					method: 'POST',
					data:this.form,
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.$refs.popup.open()
						this.previewDetail=res.data
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			dosubmite(){//提交订单
				this.$http.request({
					url: this.$api.oil.submite,
					method: 'POST',
					data:this.form,
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.$refs.popup.close()
						uni.navigateTo({
							url:'../pay?order_no='+res.data.order_no
						})
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.oilHome-container{width: 100%;overflow: hidden;background: rgb(248,248,248);}
	.header{width: 100%;height: 200rpx;border-radius: 0 0 30rpx 30rpx;background: rgb(63,107,244);padding: 35rpx 30rpx;box-sizing: border-box;
	display: flex;justify-content: space-between;color: #fff;font-size: 30rpx;}
	.main{width: 90%;overflow: hidden;z-index: 99;position:relative ;top: -80rpx;left: 5%;}
	.rechargePhone{width: 100%;height: 150rpx;background: #fff;border-radius: 20rpx;}
	.rechargePhone input{width: 90%;height: 150rpx;margin: 0 auto;font-size: 40rpx;color: #000;font-weight: bold;}
	.phonenotice{width: 100%;overflow: hidden;font-size: 26rpx;margin: 20rpx 0;}
	.select_num{width: 100%;overflow: hidden;}
	.select_num_header{width: 100%;overflow: hidden;margin: 30rpx 0 20rpx;color: #000;}
	.num_list{width: 100%;overflow: hidden;display: flex;justify-content: space-between;flex-wrap: wrap;}
	.item{width: 48%;border: 4rpx solid rgb(37,130,234);height: 200rpx;border-radius: 20rpx;margin-bottom: 20rpx;}
	.remeber_notice{width: 100%;overflow: hidden;}
	.remeber_notice_header{width: 100%;overflow: hidden;margin: 30rpx 0 20rpx;color: #000;}
	.remeber_notice_detail {width: 100%;overflow: hidden;font-size: 26rpx;}
	.popup_view{width: 100%;height: 700rpx;background: rgb(248,248,248);border-radius: 15rpx;padding: 30rpx  20rpx;box-sizing: border-box;}
	.popup_view_denomination{width: 100%;height: 100rpx;padding: 0 25rpx;box-sizing: border-box;display: flex;justify-content: space-between;background: #fff;margin: 50rpx 0 0 0;}
	.use-points{width: 100%;height: 100rpx;padding: 0 25rpx;box-sizing: border-box;display: flex;justify-content: space-between;background: #fff;margin: 50rpx 0 0 0;}
	.points-switch {transform: scale(0.7);margin-top: 10rpx;}
	
	
	.select_pay{width: 100%;overflow: hidden;}
	.count{width: 100%;height: 120rpx;background: #fff;margin-top: 100rpx;border-radius: 60rpx;display: flex;justify-content: space-between;}
</style>
