<template>
	<view class="more-shop">
		<view class="more-shop-account-title" v-if="flag">
				核销成功
		</view>
		<view class="more-shop-account-detail">		
			<view class="jx-goods-item">
				<image :src="goodinfo.cover_pic" lazy-load="true" class="jx-goods-img"></image>
				<view class="jx-goods-center">
					<view class="jx-goods-name">{{goodinfo.name}}</view>
				</view>
				<view class="jx-price-right">
					<view class="price">￥{{message.total_original_price}}</view>
					<view class="num">x{{message.num}}</view>
				</view>
			</view>
		</view>
		<view class="account-code">
			核销码：{{code}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:"",
				message:{},
				success:'',
				goodinfo:{},
				flag:false
			}
		},
		onLoad(options) {
			let that=this
			that.code=options.code
			console.log(options)
			uni.showLoading({
			    title: '正在核销中'
			});
			setTimeout(function () {
			    uni.hideLoading();
				that.$http.request({
					url: that.$api.moreShop.verification,
					method: 'POST',
					data: {
						code: options.code,
					},
					showLoading: false
				}).then(res => {
					if(res.code==0){
						that.$http.toast(res.msg)
						that.flag=true
						that.message=res.data.detail
						that.goodinfo=res.data.detail.goods_info.goods_attr
					}else{
						that.$http.toast(res.msg)
						setTimeout(function(){
							uni.redirectTo({
								url:'../personalCentre/accountingOrder/accountingOrder'
							})
						},2000)
					}
				})		
			}, 2000);
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	.more-shop{width: 100%;overflow: hidden;}
	.more-shop-account-title{width: 100%;height: 200rpx;text-align: center;line-height: 200rpx;font-size: 55rpx;font-weight: 600;color: #000;}
	.more-shop-account-detail{margin-top: 20rpx;width: 100%;overflow: hidden;}
	.jx-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	
		.jx-goods-img {
			width: 180rpx;
			height: 180rpx;
			display: block;
			flex-shrink: 0;
		}
	
		.jx-goods-center {
			flex: 1;
			padding: 20rpx;
			box-sizing: border-box;
		}
	}	
	.jx-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 9pt;
		line-height: 32rpx;
	}	
	.jx-goods-attr {
		font-size: 9pt;
		color: #888888;
		line-height: 32rpx;
		padding-top: 36rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}	
	.jx-price-right {
		text-align: right;
		font-size: 9pt;
		color: #999999;
		line-height: 30rpx;
		padding-top: 20rpx;	
		.price {
			margin-bottom: 20rpx;
		}	
		.num {
			margin-top: 30rpx;
			font-weight: bold;
			color: #000;
		}
	}
		.account-code{width: 100%;height: 100rpx;line-height: 100rpx;text-align: center;}
</style>
