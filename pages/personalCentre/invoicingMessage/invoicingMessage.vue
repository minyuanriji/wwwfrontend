<template>
	<view class="invoicingMessage-app">
		<view class="order-code">
			订单号:{{orderMessage.order_info.order_no}}
		</view>
		<view class="shop-detail">
			<image :src="orderMessage.mch_info.cover_url" mode="" class="shop-logo"></image>
			<!-- <image src="" mode="" class="shop-logo"></image> -->
			<view class="shop-name">
				<text>店铺名:{{orderMessage.mch_info.name}}</text>
				<text>ID:{{orderMessage.mch_info.mch_id}}</text>
			</view>
		</view>
		<view class="product-price">
			价格:￥{{orderMessage.order_info.order_price}}
		</view>
		<view class="use-points flex flex-y-center flex-x-between">
			<view>
				<!-- 使用抵扣券 :{{orderMessage.integral_max_deduction}} -->
				使用抵扣券 :{{num}} 
				<view class="xieti">拥有抵扣券金额:{{orderMessage.user_integral_num}}</view>
			</view>
			<switch :checked="is_integral" @change="useIntegral" :color='textColor' class="points-switch" />
		</view>
		<view class="go-pay">
			<button type="default" @click='pay'>去支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderMessage:{
					"order_info":{
						"id":1,
						 "mch_id": 31,
						 "order_no": "MS202103110906011010910457",
						 "order_price": "100.00",
					},
					"mch_info":{
						"mch_id": 31,
						"name": "维也纳国际酒店(深圳草埔百鸽笼地铁站店)",
						"cover_url": "http://",
					},
					"user_integral_num": 99999,
					"integral_max_deduction": 100
				},//结账单信息
				textColor: '#00dd00',
				is_integral:false,
				num:0
			};
		},
		onLoad() {   //通过扫二维码进入此页面会带有一个id
			this.getmessage()
		},
		methods:{
			useIntegral(e) {
				console.log(e)
				this.is_integral = e.detail.value;
				if(this.is_integral=false){
					this.orderMessage.order_info.order_price=this.orderMessage.order_info.order_price
				}else{
					this.orderMessage.order_info.order_price=Number(this.orderMessage.order_info.order_price)-Number(this.orderMessage.integral_max_deduction)
					this.num=this.orderMessage.integral_max_deduction
					this.getmessage()
				}
				// this.is_integral ? this.use_integral = 1 : this.use_integral = 0; //是否使用抵扣券(请求用)
			},
			getmessage(){
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curParam = routes[routes.length - 1].options; //获取路由参数
				this.$http.request({
					url: this.$api.moreShop.getpayMessage,
					method: 'POST',
					data: {
						id:curParam.id
					},
					showLoading: true
				}).then(res => {
					if(res.code==0){
						this.orderMessage=res.data
					}else{
						this.$http.toast(res.msg)
					}
				})
			},
			pay(){ //点击去支付
				uni.navigateTo({
					url:'../invoicingMessage/pay?id='+this.orderMessage.order_info.id+"&use_integral="+this.orderMessage.integral_max_deduction
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.invoicingMessage-app{width: 100%;overflow: hidden;}
	.order-code{width: 100%;height: 100rpx;background: #fff;margin: 30rpx 0 0 0;line-height: 100rpx;
	font-weight: 600;padding: 0rpx 20rpx;color: #000;}
	.shop-detail{width: 100%;overflow: hidden;background: #fff;margin-top: 20rpx;display: flex;padding: 0rpx 20rpx;}
	.shop-logo{width: 158rpx;height: 158rpx;}
	.shop-name{margin-left: 20rpx;width: 500rpx;}
	.shop-name text{display: block;}
	.shop-name text:nth-of-type(1){margin-top:25rpx ;}
	.product-price{width: 100%;height: 100rpx;background: #fff;margin: 30rpx 0 0 0;line-height: 100rpx;
	font-weight: 600;padding: 0rpx 20rpx;color: #000;}
	.use-points{background: #fff;margin-top: 40rpx;}
	.go-pay{width: 100%;height: 100rpx;margin-top: 100rpx;}
	.go-pay button{width: 100%;outline: none;border: none;background: #19BE6B;color: #fff;}
</style>
