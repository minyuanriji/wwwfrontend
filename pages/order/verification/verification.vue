<template>
	<view class="verification-app">
		<block >
			<view class="jx-goods-item">
				<!-- <image src="../../../plugins/images/extensions/o2o/shuiguotu.png" lazy-load="true" class="jx-goods-img"></image> -->
				<view class="jx-goods-center">
					<view class="jx-goods-name">{{verificationMessage.detail.goods_info.goods_attr.name}}</view>
				</view>
				<view class="jx-price-right">
					<view class="price">¥{{verificationMessage.detail.total_original_price}}</view>
					<view class="num">x{{verificationMessage.detail.num}}</view>
				</view>
			</view>
		</block>
		<view class="verification-code">
			<image :src="verificationMessage.url" mode="" class="ercode"></image>
			<view class="verification-edite-code">
				核销码：{{verificationMessage.code?verificationMessage.code:"xxxxxxxxxx"}}
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verificationMessage:{},//核销信息
			}
		},
		onLoad(options) {			
			console.log(options)
			this.$http.request({
				url: this.$api.moreShop.getexpenseMessage,
				method: 'POST',
				data: {
					id: options.id,
					route:'#'
				},
				showLoading: true
			}).then(res => {
				if(res.code==0){
					this.verificationMessage=res.data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.verification-app{width: 100%;overflow: hidden;}
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
	.verification-code{width: 100%;overflow: hidden;margin: 20rpx 0;background: #fff;}
	.ercode{width: 300rpx;height: 300rpx;margin: 20rpx auto 0;display: block;}
	.verification-edite-code{width: 100%;margin: 40rpx 0;height: 80rpx;text-align: center;line-height: 80rpx;}
	
</style>
