<template>
	<view class="order_lisat_container">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#333'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view>
					<com-icons type="search" :size='16' color='#333333'></com-icons>
				</view>
				<!-- #endif -->
				<input type="search" placeholder="请输入商品名"  placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="key" @confirm='search'/>
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="key"><tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon></view>
				<!-- #endif -->
			</view>
			<view class="tui-cancle" @tap="search">搜索</view>
		</view>
		<com-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="showTab[status]" selectedColor="#FF7104" sliderBgColor="#FF7104"
		 :sliderHeight="4" :sliderWidth="50" bgColor="#F7F7F7" @change="change" bottom="10rpx" style="z-index:999;"></com-tabs>
	
		<view class="goods_list">
			<view class="item">
				<view class="item_header">
					<image src="../../../plugins/images/extensions/community/map-location.png" mode="" style="width: 50rpx;height: 50rpx;display: block;float: left;"></image>
					<view style="float: left;">
						18824708843
					</view>
					<view style="float: right;">
						<text>待收货</text>
					</view>
				</view>
				<view class="ordermessage">
					<view style="margin: 20rpx 0;font-size: 30rpx;">
						<text>订单编号：</text>
						<text style="color: #000;">415615646415164565489</text>
						<text style="display: inline-block;float: right;border: 1rpx solid rgb(237,237,237);width: 100rpx;text-align: center;border-radius: 10rpx;">复制</text>
					</view>
					<view style="font-size: 30rpx;margin: 0 0 20rpx 0;">
						<text>下单时间：</text>
						<text  style="color: #000;">165156445</text>
					</view>
				</view>
				<view class="goods_detail">
					<view class="goods_detail_message">
						<image src="../../img/logo_oil.png" mode=""></image>
						<view class="goods_detail_message_right">
							<view>
								的君威of呢热辽宁高考来个你
							</view>
							<view>
								ckerpgmkerl;mgrtl; 
							</view>
						</view>
					</view>
					<view class="goods_detail_price">
						<view style="float: right;">
							<text>实付款：</text>
							<text>￥0</text>
							<text>共1件</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon";
	import tuiTag from "@/components/tag/tag";
	export default {
		components: {
			tuiIcon,
			tuiTag,
		},
		data() {
			return {
				img_url: this.$api.img_url,
				key: "",
				tabs: [{
					name: "全部"
				}, {
					name: "待付款"
				}, {
					name: "待发货"
				}, {
					name: "待收货"
				}, {
					name: "待评价"
				},
				{
					name: "售后"
				},
				],
				showTab: {
					'0': 0,
					'1': 1,
					'2': 2,
					'3': 3,
					'4': 4,
					'5': 5,
				},
				scrollTop: 0,
				status: 0,
				statusObj: {
					0: 0,
					1: 1,
					2: 2,
					3: 3,
					4: 4,
					5: 5,
				},
			};
		},
		onLoad() {

		},
		methods:{
			cleanKey: function() { //清空搜索
				this.key = ''
			},
			search(){ //搜索
				
			},
			change(e) {
				this.status = this.statusObj[e.index]
				console.log(this.status)
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
	}
</script>

<style lang="less" scoped>
	.order_lisat_container{width: 100%;height: 100%;}
	.tui-searchbox {
		width: 100%;
		padding: 30rpx;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: fixed;
		/* #ifdef H5 */
		top: 80rpx;
		/* #endif */
		/* #ifdef  MP  */
		top: 0rpx;
		/* #endif */
		left: 0;
		z-index: 9999;
	}
	
	.tui-search-input {
		width: 90%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}
	
	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 11pt;
	}
	
	.tui-input-plholder {
		font-size: 11pt;
		color: #b2b2b2;
	}
	
	.tui-cancle {
		color: #888;
		font-size: 11pt;
		padding-left: 30rpx;
		flex-shrink: 0;
	}
	
	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	
	.tui-icon-delete {
		padding: 10rpx;
	}
	
	.tui-search-title {
		font-size: 11pt;
		font-weight: bold;
	}
	
	.tui-hot-header {
		padding: 30rpx 0;
	}
	
	.tui-tag-class {
		display: inline-block;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		font-size: 9pt !important;
	}
	.tui-history-content{
		display: flex;
		flex-wrap: wrap;
	}
	.goods_list{width: 100%;overflow: hidden;margin-top: 220rpx;}
	.item{width: 100%;overflow: hidden;padding:20rpx;box-sizing: border-box;background: #fff;}
	.item_header{width: 100%;overflow: hidden;margin-bottom: 20rpx;}
	.ordermessage{width: 100%;overflow: hidden;border:1rpx solid rgb(237,237,237) ;border-left: none;border-right: none;}
	.goods_detail{width: 100%;overflow: hidden;margin: 15rpx 0;}
	.goods_detail_message{width: 100%;overflow: hidden;}
	.goods_detail_message image{width: 200rpx;height: 200rpx;display: block;float: left;}
	.goods_detail_message_right{width: 70%;float: left;padding: 0 0 0 10rpx;box-sizing: border-box;}
	.goods_detail_price{width: 100%;overflow: hidden;margin: 10rpx 0;}
</style>

