<template>
	<view>
		<view v-if="couponData.length != 0" class="couponRoot">
			<coupon :couponData='couponData' :couponStyle='couponStyle' @receiveClick='receiveClick'></coupon>
		</view>
		<view class="defaultPage" v-else>
			<image class="couponPage-img" :src="img_url+'images/coupon/couponPage.png'" mode=""></image>
			<view>暂时没有可领取的优惠券~</view>
		</view>
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
				img_url: this.$api.img_url,
				couponStyle:4,
				couponData:[],
				coupon_id:0,
			}
		},
		onLoad() {
			this.couponList();
		},
		methods:{
			receiveClick(val){ //领取优惠券
				if(this.couponData[val.index].is_receive == 0){
					this.$http.request({
						url:this.$api.coupon.receive,
						showLoading:true,
						data:{
							coupon_id:val.id,
							receive_type:3
						}
					}).then(res=>{
						if(res.code == 0){
							this.couponData[val.index].is_receive = 1;
						}
					})
				}else{
					this.couponData[val.index].is_receive = 1;
				}
			},
			couponList(){ //获取优惠券列表
				this.$http.request({
					url:this.$api.coupon.list,
					showLoading:true
				}).then(res=>{
					if(res.code == 0){
						this.couponData.push(...res.data.list);
					}
				})
			}
		}
	}
</script>

<style>
	.couponRoot{
		margin-top: 16rpx;
		padding: 40rpx 0 20rpx;
		background: #FFFFFF;
	}
	
	.defaultPage{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
	}
	.couponPage-img{
		width: 187rpx;
		height: 187rpx;
		margin-bottom: 35rpx;
	}
</style>
