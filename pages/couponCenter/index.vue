<template>
	<view class="couponRoot">
		<coupon :couponData='couponData' :couponStyle='couponStyle' @getCoupon='receiveClick'></coupon>
	</view>
</template>

<script>
	import coupon from '@/components/coupon/coupon';
	export default{
		components:{
			coupon
		},
		data(){
			return{
				couponStyle:3,
				couponData:[
					{
						receive:true, //true为已领取 false为未领取
						shopName:'华为旗舰店',
						productList:[
							{
								pic_url:'http://img.alicdn.com/imgextra/i1/742634735/TB2.peMXwCN.eBjSZFoXXXj0FXa_!!742634735.jpg',
								pro_price:'50'
							},
							{
								pic_url:'http://img.alicdn.com/imgextra/i4/2142747419/O1CN01FWniwm24fwucTTgIY_!!2142747419.jpg',
								pro_price:'320'
							},
							{
								pic_url:'http://store.hzstorm.com/web/uploads/image/store_1/07cd6e2851b960a2738835d2effb4f4c5c37f533.jpg',
								pro_price:'96'
							},
						],
						coupon_price:'100',
						coupon_condition:'满9000可用'
					},
					{
						receive:false, //true为已领取 false为未领取
						shopName:'oppo旗舰店',
						productList:[
							{
								pic_url:'http://img.alicdn.com/imgextra/i1/742634735/TB2.peMXwCN.eBjSZFoXXXj0FXa_!!742634735.jpg',
								pro_price:'50'
							},
							{
								pic_url:'http://img.alicdn.com/imgextra/i4/2142747419/O1CN01FWniwm24fwucTTgIY_!!2142747419.jpg',
								pro_price:'320'
							},
							{
								pic_url:'http://store.hzstorm.com/web/uploads/image/store_1/07cd6e2851b960a2738835d2effb4f4c5c37f533.jpg',
								pro_price:'96'
							},
						],
						coupon_price:'50',
						coupon_condition:'满900可用'
					},
				],
			}
		},
		methods:{
			receiveClick(val){
				if(this.couponData[val.index].receive){
					this.tui.toast('已经领取，且跳转页面')
				}else{
					this.couponData[val.index].receive = true;
				}
			}
		}
	}
</script>

<style>
	.couponRoot{
		padding-top: 20rpx;
	}
</style>
