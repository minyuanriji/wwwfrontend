<template>
	<view class="verification-app">
		<block >
			<view class="jx-goods-item">
				<image src="../../../plugins/images/extensions/o2o/shuiguotu.png" lazy-load="true" class="jx-goods-img"></image>
				<view class="jx-goods-center">
					<view class="jx-goods-name">得分积分发热热风机快热发热客家人</view>
					<view class="jx-goods-attr">33</view>
				</view>
				<view class="jx-price-right">
					<view class="price">¥110</view>
					<view class="num">x2</view>
				</view>
			</view>
		</block>
		<view class="verification-code">
			<image src="../../../plugins/images/extensions/o2o/shuiguotu.png" mode="" class="ercode"></image>
			<view class="verification-edite-code">
				核销码：cx123456789
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
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
			margin-bottom: 20rpx;
			font-weight: bold;
		}
	}	
	.verification-code{width: 100%;overflow: hidden;margin: 20rpx 0;background: #fff;}
	.ercode{width: 300rpx;height: 300rpx;margin: 0 auto;display: block;}
	.verification-edite-code{width: 100%;margin: 40rpx 0;height: 80rpx;text-align: center;line-height: 80rpx;}
	
</style>
