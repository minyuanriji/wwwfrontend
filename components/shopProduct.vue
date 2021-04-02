<template>
	<view class="shopProductItem">
		<view class="shop-img">
			<image src="https://img.alicdn.com/imgextra/i3/1709365317/O1CN01KJERwK1p9ERkXoHLJ_!!1709365317-0-daren.jpg_180x180xzq90.jpg_.webp"
			 mode="widthFix"></image>
		</view>
		<view class="shop-title">
			奇偶荣割肉割个哦我破房间我劫贫济富我旁边防空炮热哦哦几个人平股票仍将二批
		</view>
		<view class="shop-money">
			<view>
				<text>￥</text>
				<text>140.00</text>
			</view>
			<view>
				已售:502件
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.shopProductItem {
		width: 48%;
		overflow: hidden;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.5);
		margin: 10rpx 0;
		border-radius: 10rpx;
		padding: 5rpx;
	}

	.shop-img {
		width: 100%;
		overflow: hidden;
	}

	.shop-img image {
		width: 100%;
		display: block;
	}

	.shop-title {
		width: 100%;
		font-size: 30rpx;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/*规定最多显示两行*/
		margin: 5rpx 0;
	}

	.shop-money {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin: 10rpx 0;
	}
	.shop-money view:nth-of-type(1){
		font-size: 30rpx;
		color: #07beb4;
	}
	.shop-money view:nth-of-type(2){
		font-size: 25rpx;
		margin-top: 5rpx;
	}
</style>
