<template>
	<view class="moreCreadit-app">
		<view class="moreCreadit_header">
			<view class="text">
				<input type="number" v-model.trim ="form.mobile" placeholder="请输入电话号码"/>
			</view>
		</view>
		<view class="moreCreadit_detail">
			<view class="moreCreadit_detail-num">
				<view class="moreCreadit_detail-num_title">
					<text v-for="(item,index) in type" :key='index' :class="typeIndex==index?'typeActive':''" @click="typeSelect(index,item)">{{item}}</text>
				</view>
				<view class="moreCreadit_detail-num_list">
					<view :class="selectIndex==index?'active':'moreCreadit_detail-num_list-item'"
						v-for="(item,index) in list" :key='index' @click="select(item,index)">
						<view style="margin: 15rpx 0 10rpx 0;">
							<text style="color:rgb(255, 113, 4);font-size: 38rpx;font-weight: bold;">{{item.price}}</text>
							<text style="color:rgb(255, 113, 4);font-size: 25rpx;">元</text>
						</view>
						<view style="font-size: 25rpx;color: #9E9E9E;">
							送{{getSendNum(item.price)}}购物券
						</view>
					</view>
				</view>
			</view>
			<view class="recharge">
				<button type="default" @click="checkrecharge">立即充值</button>
			</view>
		</view>
		<view class="notice">
			<text style="display: block;width: 100%;height: 60rpx;line-height: 60rpx;font-size: 28rpx;color: #000;font-weight: bold;">温馨提示</text>
			<view class="notice-item" >
				<view>
					1：充值前请核对充值号码
				</view>
				<view v-if="typeIndex==0">
					2：充值后1-30分钟内到账，月初稍慢一些
				</view>
				<view v-if="typeIndex==1">
					2：充值72小时内到账，月初稍慢一些
				</view>
				<view v-if="typeIndex==0">
					3：快充赠送充值金额30%购物券
				</view>
				<view v-if="typeIndex==1">
					3：新用户第一次充值送100%购物券，每个用户第一次送购物券上限100，超过上限部分赠送订单金额50%购物券
				</view>
				<view>
					4：红包充值不返购物券
				</view>
				<view>
					5：如对本次充值相关内容有疑问,请联系客服
				</view>
				<view>
					6：暂不支持携号转网的手机号充值
				</view>
			</view>
		
		</view>
		
		<view class="recharge_list">
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href">
				<view class="jx-cell-header" style="height: 80rpx;margin: 10rpx 0;">
					<view class="jx-cell-title" style="font-weight: 700;line-height: 80rpx;font-size: 28rpx;padding-left: 20rpx;">当天充值记录</view>
				</view>
				<view class="jx-cell-header" style="height: 80rpx;margin: 10rpx 0;">
					<view class="jx-cell-title" style="font-weight: 700;line-height: 80rpx;font-size: 28rpx;padding-left: 20rpx;margin-left: 350rpx;color: gray;">全部</view>
				</view>
			</jx-list-cell>
			<view class="recharge_list-title">
				<text>手机号</text>
				<text>充值金额</text>
				<text>充值时间</text>
				<text>充值状态</text>
			</view>
			<view class="recharge-item" v-for="(item,index) in creditStatusList" :key='index'>
				<text style="color: #000;">{{item.mobile}}</text>
				<text>{{item.order_price}}</text>
				<text>{{item.created_at}}</text>
				<!-- <text v-if="item.pay_status=='paid'&&item.order_status=='success'" style="color: green;">充值成功</text>
				<text v-if="item.pay_status=='paid'&&item.order_status=='processing'" style="color: red;">充值中...</text>
				<text v-if="item.pay_status=='paid'&&item.order_status=='fail'" style="color: gray;">充值失败</text> -->
				<!-- <text v-if="item.pay_status=='refunding'" style="color: red;">退款中...</text>
				<text v-if="item.pay_status=='refund'" style="color: gray;">已退款</text> -->		
				<text v-if="item.pay_status=='unpaid'" style="color: gray;">未支付</text>
				<text v-else style="color: green;">充值成功</text>	
			</view>
		</view>	
		<com-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="recharge_detail">
				<view class="recharge_money">
					<text style="color: rgb(255, 113, 4)">￥</text>
					<text
						style="font-size: 50rpx;font-weight: bold;color: rgb(255, 113, 4);">{{form.order_price}}</text>
				</view>
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">订单信息</view>
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: right;">手机充值
						</view>
					</view>
				</jx-list-cell>
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">手机号</view>
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: right;">
							{{form.mobile}}
						</view>
					</view>
				</jx-list-cell>
				<view class="pay-type">
					<radio-group @change="radioChange">
						<view class="lables" v-for="(item, index) in items" :key="item.value">
							<view style="float: right;height: 60rpx;line-height: 60rpx;">
								<radio :value="item.value" :checked="index === current" color='rgb(255, 113, 4)'/>
							</view>
							<view style="float: left;height: 60rpx;line-height: 60rpx;font-size: 30rpx;">{{item.name}}</view>
						</view>
					</radio-group>
				</view>
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false" v-if="current==0">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">需支付</view>
						<view class="jx-cell-title"
							style="line-height: 80rpx;font-size: 30rpx;float: right;margin-right: 30rpx;color: rgb(255, 113, 4);">{{redbag}}红包</view>
					</view>
				</jx-list-cell>
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false" v-if="current==1">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">需支付现金</view>
						<view class="jx-cell-title"
							style="line-height: 80rpx;font-size: 30rpx;float: right;margin-right: 30rpx;color: rgb(255, 113, 4);">{{form.order_price}}元</view>
					</view>
				</jx-list-cell>
				<view class="sumbit" v-if="current==0">
					<button type="default" @click="sumbit">立即支付</button>
					<image :src="img_url+'/artice_logo.png'" mode="widthFix"></image>
				</view>
				<view class="sumbit" v-if="current==1">
					<button type="default" @click="paysubnit">立即支付</button>
					<image :src="img_url+'/artice_logo.png'" mode="widthFix"></image>
				</view>
			</view>
		</com-bottom-popup>
	</view>
</template>

<script>
	import jxListCell from '@/components/list-cell/list-cell';
	import {isEmpty} from '../../common/validate.js';
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	// #ifdef MP-WEIXIN || APP-PLUS
	import {
		setPay
	} from '@/config/utils.js'
	// #endif
	export default {
		components: {
			jxListCell
		},
		data() {
			return {
				img_url: this.$api.img_url,
				selectIndex: 0,
				list: [],
				popupShow: false,
				items: [
					{
					value: '红包支付',
					name: '红包支付'
					}, 
					{
					value: '现金支付',
					name: '现金支付'
					}, 
				],
				current: 0,
				form: {
					mobile: '',
					order_price: '',
					integral_deduction_price:'',
					product_id:"",
					plateform_id: "",
					pay_type:2,//1  现金 2红包
				},
				creditStatusList:[],//充值记录
				order_id:'',//订单ID
				redbag:'',//红包
				type:["快充","慢充"],
				typeIndex:0,
				moneyList:'',
				payData:'',
			};
		},
		onShow() { 
			this.creditStatus()
		},
		methods: {
			getSendNum(val){
				if(this.typeIndex == 0){
					val = val * (3/10);
				}else{
					val = val <= 100 ? val : 100;
				}
				return val.toFixed(0);
			},
			typeSelect(index,item){//选择快充还是慢充
				this.typeIndex=index
				if(item=='快充'){
					this.selectIndex=0
					this.list=this.moneyList.FastCharging
						this.form.order_price=this.list[0].price
						this.form.integral_deduction_price=this.list[0].redbag_num
						this.redbag=this.list[0].redbag_num
						// this.form.product_id=123
						this.form.product_id=this.list[0].product_id
						this.form.plateform_id=this.list[0].plateform_id
				}
				if(item=='慢充'){
					this.selectIndex=0
					this.list=this.moneyList.SlowCharge
						this.form.order_price=this.list[0].price
						this.form.integral_deduction_price=this.list[0].redbag_num
						this.redbag=this.list[0].redbag_num
						// this.form.product_id=86
						this.form.product_id=this.list[0].product_id
						this.form.plateform_id=this.list[0].plateform_id
				}
				console.log(this.form)
			},
			select(item, index) { //选择充值金额
				this.selectIndex = index
				this.form.order_price = item.price
				this.form.product_id=item.product_id
				this.form.plateform_id=item.plateform_id
				this.form.integral_deduction_price = item.redbag_num
				this.redbag=item.redbag_num
				console.log(this.form)
			},
			checkrecharge() { //打开弹窗
				if (isEmpty(this.form.mobile)) return this.alert('请填写充值的号码')
				this.popupShow = true
			},
			hidePopup() { //关闭弹窗
				this.popupShow = false;
			},
			radioChange: function(evt) { //选择支付方式
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			alert(txt) { //弹窗提示
				uni.showToast({
					title: txt,
					icon: 'none'
				})
			},
			sumbit() {//生成充值订单
				this.form.pay_type=2
				this.$http.request({ 
					url: this.$api.morecredit.creditOrder,
					method: 'POST',
					data: this.form,
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						let datas = {
							order_no: res.data.order_no,
							order_price: res.data.order_price
						}
						this.order_id=res.data.order_id
						this.paycredit(datas)
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			paycredit(datas){ //支付
				this.$http.request({
					url: this.$api.morecredit.creditpay,
					method: 'POST',
					data: datas,
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.popupShow=false
						uni.navigateTo({
							url:'./creditResults?order_id='+this.order_id
						})
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			paysubnit(){ //现金支付生成订单
				this.form.pay_type=1
				this.$http.request({
					url: this.$api.morecredit.creditOrder,
					method: 'POST',
					data: this.form,
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.getpaypreiew(res.data.order_no)
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			getpaypreiew(order_no){//支付预处理
				this.$http.request({
					url: this.$api.morecredit.paypreiew,
					method: 'POST',
					data:{
						order_no:order_no,
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						console.log(res)
						this.payData = res.data;
						this.confirmPay()
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			// 请求支付接口
			confirmPay(){
				let that=this
						// #ifdef H5
								that.$http.request({
									url: that.$api.moreShop.wechatpay,
									showLoading: true,
									method: 'post',
									data: {
										union_id: that.payData.union_id,
										stands_mall_id:JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id!=null?JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id:5,
										wx_type:'wechat'//公众号：wechat  小程序：mp-wx
									}
								}).then(res=>{
									if(res.code==0){
											that.$wechatSdk.pay(res.data,'/mch/hotel/orderswaiting/orderswaiting?order_no='+this.order_no);
									}else{
										that.$http.toast(res.msg);	
									}
								})
						// #endif
						// #ifdef MP-WEIXIN || APP-PLUS
								that.$http.request({
									url: that.$api.moreShop.wechatpay,
									showLoading: true,
									method: 'post',
									data: {
										union_id: that.payData.union_id,
										stands_mall_id:JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id!=null?JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id:5,
										wx_type:'mp-wx'//公众号：wechat  小程序：mp-wx
									}
								}).then(res=>{
									if(res.code==0){
										setPay(res.data, (result) => {
											let _url = '/mch/hotel/orderswaiting/orderswaiting?order_no='+this.order_no
											if (result.success) {
												that.$http.toast("支付成功")
											} else {
												that.$http.toast("未支付")
												_url = '/mch/hotel/orderList/orderList'
											}
												setTimeout(() => {
													uni.redirectTo({
														url: _url
													})
												},1000)														
										});
									}else{
										that.$http.toast(res.msg);	
									}
								})
						// #endif			
			},			
			creditStatus(){ //充值记录
				this.$http.request({
					url: this.$api.morecredit.creditStatus,
					method: 'get',
					data: {
						plateforms_id:1
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.creditStatusList=res.data
						this.moneyList=res.money_list
						this.list=this.moneyList.FastCharging
						if (isEmpty(this.form.order_price)){
							this.form.order_price=this.list[0].price
							this.form.integral_deduction_price=this.list[0].redbag_num
							this.form.product_id=this.list[0].product_id
							this.form.plateform_id=this.list[0].plateform_id
							this.redbag=this.list[0].redbag_num
						}
						console.log(this.form)
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			href(){
				uni.navigateTo({
					url:'./rechargeList'
				})
			}
		}
	}
</script>

<style lang="less">
	.moreCreadit-app {
		width: 100%;
		overflow: hidden;
	}

	.moreCreadit_header {
		width: 100%;
		height: 420rpx;
		// background: rgb(255, 113, 4);
		// border-radius: 0 0 35rpx 35rpx;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.title {
		color: #fff;
		font-size: 40rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.text {
		color: #fff;
		font-size: 38rpx;
		width: 90%;
		border: 1rpx solid rgb(112,170,214);
		margin: 40rpx auto 0;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.text input {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #000;
	}

	.moreCreadit_detail {
		width: 90%;
		overflow: hidden;
		margin: -220rpx auto 0;
		border-radius: 20rpx 20rpx 0 0;
		background: url('https://dev.mingyuanriji.cn/web/static//Morecredit.png')no-repeat;
		background-size: 100%;
	}

	.moreCreadit_detail-num {
		width: 100%;
		overflow: hidden;
		background: #fff;
		margin-top: 60rpx;
	}

	.moreCreadit_detail-num_title {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 20rpx;
		display: flex;justify-content: space-evenly;
		margin-bottom: 5rpx;
	}

	.moreCreadit_detail-num_title text {
		display: block;
		width: 120rpx;
		height: 60rpx;
		text-align: center;
		color: #272727;
		font-size: 35rpx;
		font-weight: bold;
	}
	.typeActive{ border-bottom: 4rpx solid rgb(255, 113, 4);}
	.moreCreadit_detail-num_list {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.moreCreadit_detail-num_list-item {
		width: 30%;
		text-align: center;
		height: 160rpx;
		background: #F7F7FF;
		margin: 30rpx 5rpx;
		box-sizing: border-box;
	}

	.active {
		width: 30%;
		text-align: center;
		height: 160rpx;
		background: #F7F7FF;
		margin: 30rpx 5rpx;
		border: 4rpx dashed rgb(255, 113, 4);
		box-sizing: border-box;
	}

	.moreCreadit_detail-num_list-item view {
		margin: 10rpx 0;
	}

	.recharge {
		width: 100%;
		height: 80rpx;
		margin: 50rpx auto 0;
	}

	.recharge button {
		width: 100%;
		height: 100%;
		text-align: center;
		background: rgb(255, 113, 4);
		line-height: 80rpx;
		outline: none;
		border: none;
		color: #fff;
		font-size: 35rpx;
	}

	.recharge_detail {
		width: 100%;
		min-height: 600rpx;
		padding: 50rpx 0 0 0;
	}

	.recharge_money {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
	}

	.sumbit {
		width: 100%;
		overflow: hidden;
	}

	.sumbit button {
		width: 90%;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		outline: none;
		border: none;
		background: rgb(255, 113, 4);
		color: #fff;
		margin-top: 80rpx;
	}

	.sumbit image {
		display: block;
		width: 40%;
		margin: 20rpx auto 0;
	}

	.pay-type {
		width: 90%;
		overflow: hidden;
		margin: 0 auto;
	}

	.lables {
		width: 100%;
		height: 60rpx;
		margin: 10rpx 0;
	}
	.recharge_list{
		width: 100%;
		margin: 20rpx 0 60rpx 0;
	}
	.recharge_list-title{
		display: flex;
		justify-content: space-evenly;
		font-size: 28rpx;
		margin: 10rpx 0;
	}
	.recharge_list-title text{
		display: block;
		width: 25%;
		text-align: center;
		color: #ff7104;
	}
	.recharge-item{
		display: flex;
		justify-content: space-evenly;
		margin: 35rpx 0;
	}
	.recharge-item text{
		display: block;
		font-size: 25rpx;
		width: 25%;
		text-align: center;
	}
	.notice{width: 100%;overflow: hidden;padding: 0 20rpx;box-sizing: border-box;margin: 20rpx 0;}
	.notice-item{width: 100%;font-size: 26rpx;}
	.notice-item view{margin: 5rpx 0;}
</style>
