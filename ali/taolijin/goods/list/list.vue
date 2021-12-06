<template>
	<view class="detail-app" v-if="detail_mode">
		<template v-if="detail">
			<view class="con" style="padding-bottom:30rpx;">
				<text class="con-title">{{detail.name}}</text>
				<text style="font-size:50rpx;color:rgb(255, 113, 4)">¥{{detail.price}}</text>
				<image :src="detail.cover_pic" mode="aspectFill"></image>
			</view>
			<view class="con" style="padding-bottom:30rpx;">
				<view class="con-url">
					<image :src="plugins_img_url+'/web-link.png'" mode="aspectFill" style=""></image>
					<text>{{click_url}}</text>
				</view> 
				<view class="con-copy">
					<text @click="copyUrl">点击复制</text>
				</view>
				<view style="margin-top:30rpx;color:#000;text-align:center;font-size:30rpx;">请点击复制链接，在浏览器打开</view>
			</view>
		</template>
	</view>
	
	<view class="container" v-else>
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
			<liuyuno-tabs :tabData="cats" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="container-goodsList">
			<view class="goodsList-item" v-for="(item,index) in list" :key='index'>
				<view class="goodsList-item-img">
					<image :src="item.pict_url" mode="aspectFill"></image>
				</view>
				<view class="goodsList-item-title">
					{{item.title}}
				</view>
				<view class="money_num">
					<view class="money" style="width: 50%;color: rgb(255, 113, 4);">
						<text style="font-size: 26rpx;">￥</text>
						<text style="font-size: 28rpx;">{{item.reserve_price}}</text>
					</view>
					<view style="width: 50%;font-size: 24rpx;line-height: 50rpx;text-align: right;">
						<text>30天售{{item.volume}}件</text>
					</view>
				</view>
				<view class="send" style="position: relative;">
					<view class="send_imag"></view>
					<text style="font-size: 27rpx;position: absolute;top: 11rpx;left: 80rpx;color: #fff;">999购物券</text>
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
				plugins_img_url:this.$api.plugins_img_url,
				img_url: this.$api.img_url,
				
				detail_mode: 0,
				detail: {},
				click_url: '',
				
				key: "",
				defaultIndex: 0,
				img_url: this.$api.img_url,
				form: {
					page: 1,
					cat_id: 0
				},
				list: [],
				page_count: '',
				cats:[]
			}
		},
		onLoad() {
			this.getCatList();
		},
		methods: {
			cleanKey: function() { //清空搜索
				this.key = ''
			},
			tabClick(item){
				this.defaultIndex = item.index;
				this.form.page = 1;
				this.list = [];
				this.getgoodList();
			},
			search(){
				uni.navigateTo({
					url:'/ali/taolijin/searchList/searchList'
				});
			},
			orderlist(){ //订单列表页面
				uni.navigateTo({
					url:'/ali/taolijin/orderList/orderList'
				});
			},
			getCatList(){
				let that = this;
				this.$http.request({
					url: this.$api.taolijin.getCatList,
					method: 'post',
					showLoading: true
				}).then((res) => {
					if (res.code == 0) {
						that.cats = res.data.list;
						that.getgoodList();
					} else {
						that.$http.toast(res.msg);
					}
				})
			},
			getgoodList() { //获取淘礼金商品				
				let that=this, i, cat_id = 0;
				for(i=0; i < this.cats.length; i++){
					if(i == this.defaultIndex){
						cat_id = this.cats[i].id;
						break;
					}
				} 
				this.form['cat_id'] = cat_id;
				this.$http.request({
					url: this.$api.taolijin.getgoodsList,
					method: 'post',
					showLoading: true,
					data: this.form
				}).then((res) => {
					if (res.code == 0) {
						if(res.data.no_special_id == 1){
							let ali_id = res.data.ali_id;
							uni.$on('ali_auth_status', function(data){
								that.bindSpecialId(ali_id);
							})
							uni.navigateTo({
								url: '/ali/taolijin/auth/auth?ali_id=' + ali_id
							})
							return;
						}
						if (res.data.list.length == 0) 
							return false
						let goodslist = res.data.list;
						var arr = this.list.concat(goodslist)
						this.list = arr
						this.page_count = res.data.pagination.page_count;
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			bindSpecialId(ali_id) { //私域用户关系绑定
				let that = this;
				this.$http.request({
					url: this.$api.taolijin.bindSpecialId,
					method: 'post',
					showLoading: true,
					data: {ali_id: ali_id}
				}).then((res) => {
					if (res.code == 0) {
						that.getgoodList();
					} else {
						that.$http.toast(res.msg);
					}
				});
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
	
	
	.detail-app {
		width: 100%;
		height:100%;
		background:#F1F1F1;
	}
	.con{margin-top:20rpx;background:white;display:flex;justify-content: center;flex-direction: column;text-align:center;align-items:center;}
	.con > image{margin-top:30rpx;width:350rpx;height:350rpx;}
	.con-title{margin-top:30rpx;color:#000;text-align:center;display:inline-block;width:80%;}
	.con-url{border-radius:10rpx;height:100rpx;margin-top:30rpx;border:1px solid #ddd;width:80%;display:flex;justify-content: flex-start;background:#fafafa}
	.con-url > image{margin-left:20rpx;margin-top:15rpx;width:70rpx;height:70rpx;}
	.con-url > text{height:97rpx;line-height:97rpx;width:499rpx;padding-left:20rpx;text-align:left;display:inline-block;text-decoration:underline;color:#3194d0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.con-copy{}
	.con-copy > text{display:inline-block;background:white;border:1px solid rgb(255, 113, 4);color:rgb(255, 113, 4);width:260rpx;height:70rpx;line-height:66rpx;border-radius:70rpx;margin-top:30rpx;}
	
</style>
