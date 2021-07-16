<template>
	<view class="moreCreadit-app">
		<view class="moreCreadit_header">
			<view class="title">
				充值中心
			</view>
			<view class="text">
				<input type="number" value="" />
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
							<text style="color:rgb(255, 113, 4);font-size: 38rpx;font-weight: bold;">{{item.num}}</text>
							<text style="color:rgb(255, 113, 4);font-size: 25rpx;">元</text>
						</view>
						<view style="font-size: 26rpx;color: #9E9E9E;">
							售价{{item.price}}
						</view>
					</view>
				</view>
			</view>
			<view class="recharge">
				<button type="default" @click="checkrecharge">立即充值</button>
			</view>
		</view>
		<com-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="recharge_detail">
				<view class="recharge_money">
					<text style="color: rgb(255, 113, 4)">￥</text>
					<text style="font-size: 50rpx;font-weight: bold;color: rgb(255, 113, 4);">{{form.price}}</text>
				</view>
				<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
					<view class="jx-cell-header"
						style="height: 80rpx;width: 90%;margin: 0 auto;border-bottom: 1rpx solid #F8FAF9;">
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: left;">订单信息</view>
						<view class="jx-cell-title" style="line-height: 80rpx;font-size: 30rpx;float: right;">手机充值
						</view>
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
					<button type="default">立即支付</button>
					<image :src="img_url+'/artice_logo.png'" mode="widthFix"></image>
				</view>
			</view>
		</com-bottom-popup>
	</view>
</template>

<script>
	import jxListCell from '@/components/list-cell/list-cell';
	export default {
		components: {
			jxListCell
		},
		data() {
			return {
				img_url: this.$api.img_url,
				selectIndex: 4,
				list: [{
						num: 10,
						price: 10,
					},
					{
						num: 20,
						price: 20,
					},
					{
						num: 30,
						price: 30,
					},
					{
						num: 50,
						price: 50,
					},
					{
						num: 100,
						price: 100,
					},
					{
						num: 200,
						price: 200,
					},
					{
						num: 300,
						price: 300,
					},
					{
						num: 500,
						price: 500,
					}
				],
				popupShow: false,
				items:[
					{
						 value: '红包支付',
						 name: '红包支付'
					},
				],
				current: 0,
				form:{
					price:100,
					type:"红包支付"
				}
			};
		},
		methods: {
			select(item, index) {
				this.selectIndex = index
				console.log(item)
				this.form.price=item.price
			},
			checkrecharge() {
				this.popupShow = true
			},
			hidePopup() { //关闭弹窗
				this.popupShow = false;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
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
		padding: 40rpx 20rpx 0 20rpx;
	}

	.title {
		color: #fff;
		font-size: 40rpx;
		margin-top: 20rpx;
	}

	.text {
		color: #fff;
		font-size: 38rpx;
		width: 95%;
		border-bottom: 1rpx solid #fff;
		margin: 20rpx auto 0;
		height: 80rpx;
		line-height: 80rpx;
	}

	.text input {
		width: 100%;
		line-height: 80rpx;
		font-size: 38rpx;
		color: #fff;
	}

	.moreCreadit_detail {
		width: 90%;
		overflow: hidden;
		;
		margin: -160rpx auto 0;
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
		margin: 10rpx 0;
	}

	.active {
		width: 30%;
		text-align: center;
		height: 160rpx;
		background: #F7F7FF;
		margin: 10rpx 0;
		border: 1rpx dashed rgb(255, 113, 4);
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
	.pay-type{width: 90%;overflow: hidden;margin: 0 auto;}
	.lables{width: 100%;height: 60rpx;margin: 10rpx 0;}
</style>
