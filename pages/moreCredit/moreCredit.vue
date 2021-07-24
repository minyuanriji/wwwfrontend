<template>
	<view class="moreCreadit-app">
		<view class="moreCreadit_header">
			<view class="title">
				充值中心
			</view>
			<view class="text">
				<input type="number" v-model="form.mobile" />
			</view>
		</view>
		<view class="moreCreadit_detail">
			<view class="moreCreadit_detail-num">
				<view class="moreCreadit_detail-num_title">
					<text>充话费</text>
				</view>
				<view class="moreCreadit_detail-num_list">
					<view :class="selectIndex==index?'active':'moreCreadit_detail-num_list-item'"
						v-for="(item,index) in list" :key='index' @click="select(item,index)">
						<view style="margin: 15rpx 0 10rpx 0;">
							<text style="color:rgb(255, 113, 4);font-size: 38rpx;font-weight: bold;">{{item.price}}</text>
							<text style="color:rgb(255, 113, 4);font-size: 25rpx;">元</text>
						</view>
						<view style="font-size: 26rpx;color: #9E9E9E;">
							红包{{item.redbag_num}}
						</view>
					</view>
				</view>
			</view>
			<view class="recharge">
				<button type="default" @click="checkrecharge">立即充值</button>
			</view>
		</view>
		<view class="recharge_list">
			<jx-list-cell :arrow="false" padding="0" :lineLeft="false" @click="href(4)">
				<view class="jx-cell-header" style="height: 80rpx;margin: 10rpx 0;">
					<view class="jx-cell-title" style="font-weight: 700;line-height: 80rpx;font-size: 28rpx;padding-left: 20rpx;">充值记录</view>
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
				<text v-if="item.status=='充值成功'" style="color: green;">{{item.status}}</text>
				<text  style="color: red;" v-if="item.status!='充值成功'">{{item.status}}</text>
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
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">需支付</view>
						<view class="jx-cell-title"
							style="line-height: 80rpx;font-size: 30rpx;float: right;margin-right: 30rpx;color: rgb(255, 113, 4);">{{redbag}}红包</view>
					</view>
				</jx-list-cell>
				<jx-list-cell :arrow="true" padding="0" :lineLeft="false">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">支付方式</view>
						<view class="jx-cell-title"
							style="line-height: 80rpx;font-size: 30rpx;float: right;margin-right: 30rpx;">红包支付</view>
					</view>
				</jx-list-cell>
				<!-- <view class="pay-type">
					<radio-group @change="radioChange">
						<view class="lables" v-for="(item, index) in items" :key="item.value">
							<view style="float: right;height: 60rpx;line-height: 60rpx;">
								<radio :value="item.value" :checked="index === current" color='rgb(255, 113, 4)'/>
							</view>
							<view style="float: left;height: 60rpx;line-height: 60rpx;font-size: 30rpx;">{{item.name}}</view>
						</view>
					</radio-group>
				</view> -->
				<view class="sumbit">
					<button type="default" @click="sumbit">立即支付</button>
					<image :src="img_url+'/artice_logo.png'" mode="widthFix"></image>
				</view>
			</view>
		</com-bottom-popup>
	</view>
</template>

<script>
	import jxListCell from '@/components/list-cell/list-cell';
	import {
		isEmpty
	} from '../../common/validate.js'
	export default {
		components: {
			jxListCell
		},
		data() {
			return {
				img_url: this.$api.img_url,
				selectIndex: 1,
				list: [],
				popupShow: false,
				items: [{
					value: '红包支付',
					name: '红包支付'
				}, ],
				current: 0,
				form: {
					mobile: '',
					order_price: '',
					integral_deduction_price:'',
					plateform_id: 1
				},
				creditStatusList:[],//充值记录
				order_id:'',//订单ID
				redbag:'',//红包
			};
		},
		onShow() {
			this.creditStatus()
		},
		methods: {
			select(item, index) { //选择充值金额
				this.selectIndex = index
				this.form.order_price = item.price
				this.form.integral_deduction_price = item.redbag_num
				this.redbag=item.redbag_num
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
						this.list=res.money_list
						if (isEmpty(this.form.order_price)){
							this.form.order_price=this.list[1].price
							this.form.integral_deduction_price=this.list[1].redbag_num
							this.redbag=this.list[1].redbag_num
						}
					} else {
						this.$http.toast(res.msg);
					}
				});
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
		background: rgb(255, 113, 4);
		border-radius: 0 0 35rpx 35rpx;
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
		width: 95%;
		border-bottom: 1rpx solid #fff;
		margin: 10rpx auto 0;
		height: 80rpx;
		line-height: 80rpx;
	}

	.text input {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 38rpx;
		color: #fff;
	}

	.moreCreadit_detail {
		width: 90%;
		overflow: hidden;
		margin: -180rpx auto 0;
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
	}

	.moreCreadit_detail-num_title text {
		display: block;
		width: 120rpx;
		height: 60rpx;
		border-bottom: 1rpx solid rgb(255, 113, 4);
		text-align: center;
		color: #272727;
		font-size: 30rpx;
		font-weight: bold;
	}

	.moreCreadit_detail-num_list {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.moreCreadit_detail-num_list-item {
		width: 30%;
		text-align: center;
		height: 160rpx;
		background: #F7F7FF;
		margin: 30rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	.active {
		width: 30%;
		text-align: center;
		height: 160rpx;
		background: #F7F7FF;
		margin: 30rpx 0 30rpx 0;
		border: 3px dashed rgb(255, 113, 4);
		box-sizing: border-box;
	}

	.moreCreadit_detail-num_list-item view {
		margin: 10rpx 0;
	}

	.recharge {
		width: 100%;
		height: 80rpx;
		margin: 80rpx auto 0;
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
</style>
