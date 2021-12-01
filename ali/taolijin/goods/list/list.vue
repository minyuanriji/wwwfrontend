<template>
	<view class="container">
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
				 class="tui-input" v-model.trim="key" @tap='search'/>
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="key"><tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon></view>
				<!-- #endif -->
			</view>
			<view class="tui-cancle" @tap="orderlist">订单</view>
		</view>
		<view class="change-list">
			<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="container-goodsList">
			<view class="goodsList-item" v-for="(item,index) in 3" :key='index' @click="getDetail(item.id)">
				<view class="goodsList-item-img">
					<image
						src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20211018/af8287e1940ea564d15c60345c790bea.jpg"
						mode="widthFix"></image>
				</view>
				<view class="goodsList-item-title">
					牙刷成人软毛10-20支套装
				</view>
				<view class="money_num">
					<view class="money" style="width: 50%;color: rgb(255, 113, 4);">
						<text style="font-size: 26rpx;">￥</text>
						<text style="font-size: 28rpx;">0.01</text>
					</view>
					<view style="width: 50%;font-size: 24rpx;line-height: 50rpx;text-align: right;">
						<text>已售1313件</text>
					</view>
				</view>
				<view class="send" style="position: relative;">
					<view class="send_imag"></view>
					<text
						style="font-size: 27rpx;position: absolute;top: 11rpx;left: 80rpx;color: #fff;">300购物券</text>
				</view>
			</view>
			<!-- <view class="no-more" v-if="list.length==0">
				<image :src="img_url+'/giftOrder_logo.png'" mode=""></image>
				<text>暂无服务内容</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon";
	import tuiTag from "@/components/tag/tag";
	import tuiButton from "@/components/extend/button/button"
	import tuiListCell from "@/components/list-cell/list-cell"
	import liuyunoTabs from "@/components/liuyunotabs/liuyuno-tabs.vue";
	export default {
		components: {
			tuiButton,
			tuiListCell,
			tuiIcon,
			tuiTag,
			liuyunoTabs
		},
		data() {
			return {
				key: "",
				defaultIndex: 0,
				img_url: this.$api.img_url,
				form: {
					page: 1,
				},
				list: [],
				page_count: '',
				tabs:[
					'男装',
					'女装',
					'童装',
					'内衣',
					'外套',
					'电器',
					'五金',
				]
			}
		},
		onLoad() {
			this.getgoodList()
		},
		methods: {
			cleanKey: function() { //清空搜索
				this.key = ''
			},
			search(){
				uni.navigateTo({
					url:'../../searchList/searchList'
				})
			},
			orderlist(){ //订单列表页面
				uni.navigateTo({
					url:'../../orderList/orderList'
				})
			},
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
			// if (this.form.page == this.page_count) {
			// 	return false;
			// }
			// this.form.page = this.form.page + 1
			// this.getgoodList()
		},
	}
</script>

<style lang="scss" scoped>
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
	.change-list{
		width: 100%;
		overflow: hidden;
		background: #fff;
		position: fixed;
		height: 95rpx;
		/* #ifdef H5 */
		top: 200rpx;
		/* #endif */
		/* #ifdef MP|| APP-PLUS */
		top:120rpx;
		/* #endif */
		left: 0;
		z-index: 999;		
	}
	.container-goodsList {
		width: 95%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		/* #ifdef H5 */
		margin: 210rpx auto 60rpx;
		/* #endif */
		/* #ifdef MP||APP-PLUS */
		margin: 220rpx auto 60rpx;
		/* #endif */
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
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.money_num {
		width: 100%;
		padding: 0 10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.send {
		padding: 0 10rpx;
		box-sizing: border-box;
	}

	.send_imag {
		min-width: 240rpx;
		display: inline-block;
		text-align: center;
		font-size: 24rpx;
		height: 80rpx;
		background: url(../../../../mch/img/song.png);
		background-repeat: no-repeat;
		background-size: 100% 70%;
		color: #fff;
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
