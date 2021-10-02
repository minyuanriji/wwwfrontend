<template>
	<view class="detail-app">
		<view class="tui-banner-swiper">
			<swiper :duration="150" :style="{height:scrollH + 'px'}" @change="bannerChange">
				<block v-for="(item,b_index) in detail.pic_url" :key="b_index">
					<swiper-item :data-index="b_index+1">
						<image :src="item.pic_url" mode="aspectFill" class="tui-slide-image"
							:style="{height:scrollH+'px'}" />
					</swiper-item>
				</block>
			</swiper>
			<jx-tag class="tui-tag-class" type="translucent" shape="circle" size="small">
				{{bannerIndex+1}}/{{bannerLength}}</jx-tag>
		</view>
		<view class="goods-detail-name">
			{{detail.name}}
		</view>
		<view class="goods-detail-price">
			<view>一口价：<text style="color:rgb(255, 113, 4)">{{detail.price}}</text></view>
			<view>礼金面额：{{detail.gift_price}}</view>
			<view>红包抵扣：{{detail.deduct_integral}}</view>
		</view>
		<view class="bottom">
			<button type="default" @click="exchange">兑换礼金</button>
		</view>
		<unipopup ref="popup" type="center">
			<view class="linkPoup">
				<view>
					<text>{{link.tlj_send_url}}</text>
					<!-- #ifdef H5 -->
					<text v-clipboard:copy="link.tlj_send_url" v-clipboard:success="(type) => paste('success')" v-clipboard:error="(type) => paste('error')">点击复制链接</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN || APP-PLUS -->
						<text @click="checkCopy(1)">点击复制链接</text>
					<!-- #endif -->
				</view>
				<view>
					<text>{{link.spread_url}}</text>
					<!-- #ifdef H5 -->
					<text v-clipboard:copy="link.spread_url" v-clipboard:success="(type) => paste('success')" v-clipboard:error="(type) => paste('error')">点击复制链接</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN || APP-PLUS -->
						<text @click="checkCopy(2)">点击复制链接</text>
					<!-- #endif -->
				</view>
			</view>
		</unipopup>
	</view>
</template>
<style lang="less" scoped>
	.detail-app {
		width: 100%;
		overflow: hidden;
	}

	.tui-banner-swiper {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.tui-banner-swiper .tui-tag-class {
		position: absolute;
		color: #fff;
		bottom: 40rpx;
		right: 40rpx;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	.goods-detail-name {
		width: 100%;
		overflow: hidden;
		font-size: 30rpx;
		color: #000;
		padding: 020rpx;
	}

	.goods-detail-price {
		width: 100%;
		overflow: hidden;
		padding: 0 20rpx;
	}

	.bottom {
		width: 100%;
		overflow: hidden;
	}

	.bottom button {
		width: 80%;
		background: red;
		margin: 40rpx auto 0;
		color: #fff;
		border-radius: 45rpx;
	}

	.linkPoup {
		width: 500rpx;
		overflow: hidden;
		background: #fff;
		border-radius: 30rpx;
	}

	.linkPoup view {
		width: 500rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}

	.linkPoup view text {
		display: block;
	}

	.linkPoup view text:nth-of-type(1) {
		margin: 20rpx 0;
		padding: 0 10rpx;
		width:500rpx;
		color: #000;
		overflow: hidden;
		box-sizing: border-box;
		text-overflow:ellipsis;white-space:nowrap;
		font-size: 28rpx;
		line-height: 60rpx;
		background:#fafafa ;
	}

	.linkPoup view text:nth-of-type(2) {
		width: 200rpx;
		background: red;
		margin: 0 auto;
		border-radius: 20rpx;
		font-size: 28rpx;
		color: #fff;
		line-height: 60rpx;
		text-align: center;
	}
</style>


<script>
	import unipopup from '@/components/uni-popup/uni-popup';
	import jxTag from "@/components/tag/tag"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			unipopup,
			jxTag,
			jyfParser
		},
		data() {
			return {
				img_url: this.$api.img_url,
				url: '',
				bannerLength: 0,
				bannerIndex: 0,
				height: '',
				scrollH: '',
				detail: '',
				id: '',
				link: '', //链接
			}
		},
		onLoad(options) {
			if (options && options.id) {
				this.getDetail(options.id)
				this.id = options.id
			}
		},
		onShow() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight +
						44);
						this.scrollH = res.windowWidth
					}
				})
			}, 50)
		},
		methods: {
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
			getDetail(id) { //获取商品详情
				this.$http.request({
					url: this.$api.taolijin.getgoodsDetail,
					method: 'post',
					showLoading: true,
					data: {
						id: id
					}
				}).then((res) => {
					if (res.code == 0) {
						this.detail = res.data.detail
						this.bannerLength = res.data.detail.pic_url.length
					} else {
						that.$http.toast(res.msg);
					}
				})
			},
			exchange() { //红包兑换礼金
				this.$http.request({
					url: this.$api.taolijin.exchange,
					method: 'post',
					data: {
						id: this.id
					}
				}).then((res) => {
					if (res.code == 0) {
						this.getUrl()
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			getUrl() { //获取链接
				this.$http.request({
					url: this.$api.taolijin.getUrl,
					method: 'post',
					showLoading: true,
					data: {
						id: this.id
					}
				}).then((res) => {
					if (res.code == 0) {
						this.link = res.data
						this.$refs.popup.open()
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			checkCopy(index) {  //复制链接
				let value='';
				if(index==1){
					value=this.link.tlj_send_url
				}
				if(index==2){
					value=this.link.spread_url
				}
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 1000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 1000,
							icon: 'none'
						});
					}
				});
			},
			paste(type) {				
				// #ifdef H5
				if (type==='success') {
					this.$http.toast('复制成功');
				} else {
					this.$http.toast('复制失败');
				}
				// #endif
			},
		}
	}
</script>
