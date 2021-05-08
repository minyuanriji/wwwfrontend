<template>
	<view class="home_content" :style="{background:background}">
		<tabar :current="current" :background="background"></tabar>
		<scroll-view scroll-y="true" class="home_content_body" :style="'height:'+height+'px;'" @scrolltolower="scrolltolower"
		 lower-threshold="100">
			<view class="home_content_top" id="index1_content_top">
				<image :src="store.logo" class="home_content_logo"></image>
				<view class="home_content_top_r">
					<view class="content_top_r_name">{{store.name}}</view>
					<view class="content_top_r_desc">{{store.description}}</view>
					<image :src="img_url+'/iphone.png'" mode="" class="tellPhone" @click="callPhone(store.service_mobile)"></image>
				</view>
				<button class="home_content_top_share" open-type="share" v-if="isMiniWechat==1">
					<view class="iconfont iconfenxiang"></view>
					<view class="top_share_txt">分享</view>
				</button>
			</view>
			<!---->
			<view class="home_content_content">
				<!--搜索-->
				<view class="index1_content_top_r">
					<view class="iconfont iconsousuo"></view>
					<input type="text" placeholder="搜索你想要的商品" class="index1_content_top_r_input" v-model="keyword" @confirm="search"></input>
				</view>
				<view class="shop-my-products" style="margin-top: 20rpx;" @click="checkmore">
					<image :src="img_url+'/shop_logo_hot.png'" mode=""></image>
					<text class="shop-my-products_title">
						店铺热销爆品
					</text>
					<text class="shop-my-products_more">查看更多</text>
				</view>
				<view class="simulate-product">
					<view class="product-item" v-for="(item,index) in hotlist" v-if='index<=3' :key='index' @click="hotlink(item.goods_id,item.mch_baopin_id)">
						<image :src="item.cover_pic"
						 mode="widthFix" class="product-item-logo"></image>
						<view class="product-item-name">{{item.name}}</view>
						<view class="product-item-money-buy">
							<view class="product-item-money">
								<text style="color: #c0c0c0;font-size: 28rpx;">官方价￥{{item.original_price}}</text>
								<text style="color: rgb(7, 190, 180);font-size: 28rpx;">会员价{{item.price}}</text>
							</view>                                                   
						</view>
					</view>
				</view>
				<view class="shop-my-products" style="margin-top: 20rpx;">
					<image :src="img_url+'/shop_logo_hot.png'" mode=""></image>
					<text class="shop-my-products_title">
						分类
					</text>
				</view>
				<!-- 产品 -->
				<view class="index1_content_sort">
					<view class="index1_content_sort_block" v-for="item in params['sort']" @tap="toList(item.id)">
						<image :src="item.pic_url?item.pic_url:host+'/images/shop/noneimg.png'" class="index1_content_sort_block_icon"
						 mode="widthFix"></image>
						<view class="index1_content_sort_block_txt">{{item.name}}</view>
					</view>
				</view>
				<!--商品列表-->
				<view class="shop-my-products" style="margin-top: 20rpx;">
					<image :src="img_url+'/shop_logo_hot.png'" mode=""></image>
					<text class="shop-my-products_title">
						店铺推荐商品
					</text>
				</view>
				<view class="index1_content_list">
					<view class="index1_content_list_block" v-for="item in list" @tap="toDetail(item.id)">
						<view class="index1_content_list_block_t">
							<image :src="item.cover_pic" class="block_t_head"></image>
							<view class="index1_content_list_block_t_r">
								<view class="index1_content_list_block_t_r_name">{{item.name}}</view>
								<view class="index1_content_list_block_t_r_block">
									<view class="r_block_label">全额抵扣</view>
									<view class="r_block_now_price">¥{{item.price}}</view>
									<view class="r_block_old_price">¥{{item.original_price}}</view>
								</view>
								
							</view>
						</view>
						<view class="index1_content_list_block_b">
							<view class="index1_content_list_block_b_l">
								
							</view>
							<view class="index1_content_list_block_b_r">立即抢购</view>
						</view>
					</view>
					<view class="none" v-if="list.length==0" style="text-align: center;color: #999;margin-top: 80px;font-size: 14px;">暂无数据</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tabar from '@/components/tabar.vue'
	export default {
		components: {
			tabar
		},
		data() {
			return {
				img_url: this.$api.img_url,
				current: 0,
				background: "#53DEDB",
				height: "",
				isMiniWechat: 2, //判断是否是小程序 1 是
				mch_id: "", //商户ID
				params: {
					"name": "小喵的店铺",
					"logo": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg",
					"desc": "货真价实的正品什么的",
					"sort": [

					]
				},
				"list": [

				],
				keyword: "",
				page: 1,
				page_count: "", //页面总数
				isScorll: true, //是否可以滚动
				host: "",
				store: {},
				hotlist:[],//爆品商品
			}
		},
		methods: {
			callPhone(phone){ //拨打电话
				// alert(phone)
				uni.makePhoneCall({
				 	// 手机号
				    phoneNumber: phone, 				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}					
				 })
			},
			toDetail(proId) {
				uni.navigateTo({
					url: "/pages/goods/detail?proId=" + proId
				})
			},
			search() { //搜索
				this.list = []
				this.page = 1
				this.getMchGoods()
			},
			scrolltolower() { //滚动加载
				if (this.page == this.page_count) return false;
				if (!this.isScorll) return false;
				this.page = this.page + 1
				this.getMchGoods()
			},
			getmchstore() {
				var that = this
				var mch_id = this.mch_id
				var params = this.params
				this.$http.request({
					url: this.$api.moreShop.getmchstore,
					data: '\r\n--XXX' +
						'\r\nContent-Disposition: form-data; name="mch_id"' +
						'\r\n' +
						'\r\n' + mch_id,
					method: 'POST',
					isformData: true
				}).
				then(function(res) {
					that.store = res.data.store
				})
			},
			sliderBtn(e) { //筛选切换
				this.dhIndex = e
			},
			getGoodsCats() { //获取商户分类
				var that = this
				var mch_id = this.mch_id
				var params = this.params
				this.$http.request({
					url: this.$api.moreShop.getmchgodscats,
					data: {
						mch_id
					},
					method: 'post',
				}).
				then(function(res) {
					that.params.sort = res.data.list
					that.params = params
				})
			},
			getMchGoods() { //获取商户商品
				this.isScorll = false
				var page = this.page
				var keyword = this.keyword
				var that = this
				var mch_id = this.mch_id
				var params = {
					page,
					keyword,
					mch_id
				}
				this.$http.request({
					url: this.$api.moreShop.getmchgods,
					data: params,
					method: 'post',
					showLoading: true
				}).
				then(function(res) {
					if (res.data.list.length == 0) return false;
					that.isScorll = true
					var new_data = res.data.list
					var list = that.list.concat(new_data)
					that.list = list
					that.page_count = res.page_count
				})
			},
			getHotgoods(){
				let that = this
				var mch_id = that.mch_id
				let form={
					mch_id:mch_id,
					page:'',
					keyword:'',
					sort_prop:'',//排序字段： goods_id按商品ID，virtual_sales按销售，goods_stock按库存，sort按排序
					sort_type:1,//排序方式：0降序，1升序
				}
				that.$http.request({
					url: that.$api.moreShop.gethotgoods,
					data:form ,
					method: 'post',
					showLoading: true
				}).
				then(function(res) {
					console.log(res)
					that.hotlist=res.data.list
				})
			},
			hotlink(id,hotid){//点击跳转详情
				uni.navigateTo({
					url:'../../goods/detail?proId='+id+"&mch_baopin_id="+hotid
				})
				
			},
			checkmore(){ //点击店铺热销爆品查看更多
				uni.navigateTo({
					url:'../hotGoods/hotGoods'
				})
				// uni.navigateTo({
				// 	url:'../../diy/diy?page_id=11'
				// })
			}
		},
		onReady() {
			var info = uni.getSystemInfoSync()
			var window_height = info.windowHeight
			var query = uni.createSelectorQuery()
			var that = this
			that.height = window_height
		},
		onLoad(e) {
			var mch_id = e.mch_id ? e.mch_id : uni.getStorageSync('mch_id')
			if (e.pid) {
				uni.setStorageSync('user_id', e.pid)
			}
			this.mch_id = mch_id
			uni.setStorageSync('mch_id', mch_id)
			this.host = this.$api.test_url
			this.getmchstore()
			this.getGoodsCats()
			this.getMchGoods()
			this.getHotgoods()
		},
		onShareAppMessage() {
			return {
				title: this.store.name,
				path: "/pages/shop/home/home?mch_id=" + this.mch_id
			}
		},
		onShow() {
			if (this.$http.getPlatform() == 'mp-wx') {
				this.isMiniWechat = 1
			}
		}
	}
</script>

<style>
	/* @import url("../../../static/font-icon/iconfont1.css"); */
	@import url("../../../plugins/font-icon/iconfont1.css");
	page {
		width: 100%;
		height: 100%;
	}

	.home_content {
		width: 100%;
		height: 100%;
	}
	.tellPhone{
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin-top: 20rpx;
	}
	.home_content_top {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15px 15px 10px 15px;
	}

	.home_content_logo {
		width: 61px;
		height: 61px;
		background: #FFFFFF;
		border-radius: 50%;
	}

	.home_content_top_r {
		flex: 1;
		margin-left: 10px;
	}

	.content_top_r_name {
		font-size: 17px;
		font-weight: bold;
		color: #FFFFFF;

	}

	.content_top_r_desc {
		margin-top: 5px;
		font-size: 13px;
		font-weight: 400;
		color: #FFFFFF;

	}

	.home_content_top_share {
		background: #FFFFFF;
		border-radius: 22px;
		display: flex;
		color: #131313;
		font-size: 14px;
		font-weight: 400;
		color: #000000;
		padding: 6px 20px;
		line-height: 20px;
		height: 30px;
	}

	.home_content_content {
		background-color:#fff;
		border-radius: 21px;
		padding: 8px 15px;
	}

	.index1_content_top_r {
		width: 95%;
		height: 39px;
		background: #F4F4F4;
		border-radius: 21px;
		font-size: 14px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding-left: 15px;
	}

	.index1_content_top_r_input {
		width: 100%;
		font-size: 14px;
	}

	.index1_content_sort {
		margin-top: 23px;
		display: flex;
		flex-wrap: wrap;
	}

	.index1_content_sort_block {
		width: 25%;
		text-align: center;
		padding: 0px 5px;
		margin-bottom: 18px;
	}

	.index1_content_body {
		background-color: #fff;
		padding: 5px 10px 5px 10px;
	}

	.index1_content_sort_block_icon {
		width: 100%;
		height: 148rpx;
		margin: 0px auto;
		border: 1px solid rgb(239, 239, 239);
	}

	.index1_content_sort_block_txt {
		font-size: 10px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #42414F;
	}

	.index1_content_list {
		padding-bottom: 100px;
	}

	.index1_content_list_block {
		display: block;
		padding: 10px 0;
		border-bottom: 1px #eee solid;
		box-shadow: 0px 0px 10px #eee;
		margin-bottom: 10px;
		border-radius: 6px;
	}

	.index1_content_list_block_t {
		display: flex;
	}

	.block_t_head {
		height: 120px;
		width: 120px;
		border: 1px solid rgb(239, 239, 239);
	}

	.index1_content_list_block_t_r {
		margin-left: 15px;
		flex: 1;
	}

	.index1_content_list_block_t_r_name {
		font-size: 18px;
	}

	.index1_content_list_block_t_r_block {
		/* display: flex;
		align-items: center; */
		margin-top: 10px;
	}

	.r_block_label {
		width: 35%;
		height: 50rpx;
		display: block;
		padding: 0px 4rpx;
		background-color: #fa7f5e;
		font-size: 30rpx;
		color: #000000;
		border-radius: 10px;
		text-align: center;
		line-height: 50rpx;
		margin-bottom: 10rpx;
	}

	.r_block_now_price {
		font-size: 18px;
		color: #dc3c63;
		margin: 0 10rpx;
		float: left;
		
	}

	.r_block_old_price {
		color: #b4b3b3;
		font-size: 13px;
		/* margin-left: 10px; */
		text-decoration: line-through;
		float: left;
		margin-top: 10rpx;
	}

	.index1_content_list_block_t_r_bottom {
		color: #555;
		font-size: 13px;
	}

	.index1_content_list_block_b {
		display: flex;
		padding: 15px 0px 0px 15px;
		align-items: center;
	}

	.index1_content_list_block_b_l {
		display: flex;
		flex: 1;
		align-items: center;
	}

	.index1_content_list_block_b_l_l {
		display: flex;
		align-items: center;
	}

	.index1_content_list_block_b_l_l image {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin-left: -10px;
	}

	.index1_content_list_block_b_l_r {
		font-size: 13px;
		color: #b4b3b3;
	}

	.index1_content_list_block_b_r {
		padding: 5px 25px;
		background-color: #DC3C63;
		color: #ffffff;
		border-radius: 15px;
		font-size: 14px;
		font-weight: bold;
	}





	.simulate-product {
		width: 95%;
		overflow: hidden;
		margin: 30rpx auto 50rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.product-item {
		width: 48%;
		overflow: hidden;
		margin: 10rpx 0;
		border-radius: 10rpx;
		box-shadow: 0px 0px 10px #eee;
		border: 1px solid rgb(239, 239, 239);
	}

	.product-item-logo {
		width: 100%;
	}

	.product-item-name {
		width: 100%;
		height: 84rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		padding: 0 5rpx;
		color: #000000;
	}

	.product-item-money-buy {
		width: 100%;
		overflow: hidden;
		margin-bottom: 15rpx;
		padding: 0 5rpx;
	}

	.product-item-money {
		color: red;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.select1_buyBtn1 {
		width: 44rpx;
		height: 44rpx;
		display: block;
	}

	.shop-my-products {
		width: 100%;
		position: relative;
	}
	.shop-my-products  image{
		width: 100%;
		height: 80rpx;
	}
	.shop-my-products_title{
		position: absolute;
		top: 15rpx;
		left: 20rpx;
		color: #000;
		display: block;
		font-size: 30rpx;
		font-weight: bold;
	}
	.shop-my-products_more{
		position: absolute;
		top: 15rpx;
		right: 20rpx;
		color: #000;
		display: block;
		font-size: 30rpx;
		font-weight: bold;
	}
	.hot-googds {
		width: 100%;
		overflow: hidden;
		margin: 20rpx 0 0 0;
	}

	.hot-Logo {
		width: 100%;
	}

	.hot-Logo image {
		width: 100%;
	}

	.hotitem0 {
		width: 100%;
		margin-bottom: 20rpx;
	}

	.hotitem1 {
		width: 45%;
		float: left;
	}

	.hotitem2 {
		width: 45%;
		float: right;
	}

	.hotitem0 image {
		width: 100%;
		margin-bottom: 20rpx;
		height: 690rpx;
	}

	.hotitem1 image {
		width: 100%;
		height: 310rpx;
	}

	.hotitem2 image {
		width: 100%;
		height: 310rpx;
	}



	.hot-goods-logo {
		width: 100%;
		background: #FFFFFF;
	}

	.hot-goods-name {
		font-size: 28rpx;
		color: #000000;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	.hot-goods-num-price {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 10rpx 0
	}

	.hot-goods-num-price text {
		display: block;
		font-size: 20rpx;
		color: #dc3c63;
	}
</style>
