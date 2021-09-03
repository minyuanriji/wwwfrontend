<template>
	<view class="container">
		<view class="container-goodsList">
			<view class="goodsList-item" v-for="(item,index) in list" :key='index' @click="getDetail(item.id)">
				<view class="goodsList-item-img">
					<image :src="item.cover_pic" mode="widthFix"></image>
				</view>
				<view class="goodsList-item-title">
					{{item.name}}
				</view>
				<view class="price">
					<view>一口价：<text style="color:rgb(255, 113, 4)">{{item.price}}</text></view>
					<view>礼金面额：{{item.gift_price}}</view>
					<view>红包抵扣：{{item.deduct_integral}}</view>
				</view>
			</view>
			<view class="no-more" v-if="list.length==0">
				<image :src="img_url+'/giftOrder_logo.png'" mode=""></image>
				<text>暂无服务内容</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				form: {
					page: 1,
				},
				list: [],
				page_count: '',
			}
		},
		onLoad() {
			this.getgoodList()
		},
		methods: {
			getgoodList() { //获取淘礼金商品				
				this.$http.request({
					url: this.$api.taolijin.getgoodsList,
					method: 'post',
					showLoading: true,
					data: this.form
				}).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length == 0) return false
						let goodslist = res.data.list;
						var arr = this.list.concat(goodslist)
						this.list = arr
						this.page_count = res.data.pagination.page_count;
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			getDetail(id) { //点击跳转该商品详情
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			}
		},
		onReachBottom() {
			if (this.form.page == this.page_count) {
				return false;
			}
			this.form.page = this.form.page + 1
			this.getgoodList()
		},
	}
</script>

<style lang="scss" scoped>
	.container-goodsList {
		width: 95%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin: 0 auto 60rpx;
		flex-wrap: wrap;
	}

	.goodsList-item {
		width: 48%;
		overflow: hidden;
		border-radius: 15rpx;
		box-shadow: 0px 0px 10px #eee;
		background: #FFFFFF;
		margin-top: 20rpx;
	}

	.goodsList-item-img {
		width: 100%;
		overflow: hidden;
	}

	.goodsList-item-img image {
		width: 100%;
	}

	.goodsList-item-title {
		width: 100%;
		padding: 0 10rpx;
		font-size: 28rpx;
		color: #000;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.price {
		font-size: 26rpx;
		padding: 0 15rpx;
		margin-bottom: 20rpx;
	}

	.no-more {
		width: 200rpx;
		height: 280rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
		font-size: 26rpx;
		text-align: center;
		color: #808080;
	}

	.no-more image {
		width: 200rpx;
		height: 200rpx;
	}
</style>
