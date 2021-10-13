<template>
	<view class="shop-container">
		<!--搜索-->
		<view class="index1_content_top" :style="{background:'#FF7104'}" id="index1_content_top">
			<view style="width: 20%;color: #fff;font-size: 30rpx;font-weight: bold;overflow: hidden;
			text-overflow:ellipsis;white-space: nowrap;" @click="setCITY">
				{{city}}
			</view>
			<view class="index1_content_top_l_r"></view>
			<view class="index1_content_top_r">
				<view class="iconfont iconsousuo"></view>
				<input type="text" placeholder="输入商家名、品类或商圈" class="index1_content_top_r_input" v-model="keyword"
					@confirm="search"></input>
			</view>
		</view>
		<!---->
		<view class="shop-type">
			<cg-swiper :swiperList="swiperList"  :swiperDots='true'  :autoplay='false'
			  @clickItem="clickItem"></cg-swiper>
		</view>
		<view class="shop-table">
			<view v-for="(item,index) in shoptable" :key='index' :class="currentIndex==index?'active':''" @click="selectTable(index)">
				<text>{{item}}</text>
				<text></text>
			</view>
		</view>
		<view class="shop_table_list">
			<view class="shop_table_item" v-for="item in 3" :key='item' @click="shopdetail"> 
				<view class="shop_table_item_left">
					<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210916/f601fd5d7d7eb92e735cd1de31d72325.png" mode="scaleToFill"></image>
				</view>
				<view class="shop_table_item_right">
					<view class="shop_table_item-name">
						补商汇广州运营中心
					</view>
					<view class="shop_table_item-score">
						<view class="iconfont iconwujiaoxing" v-for="(i,index) in 5"
							style="color: #FFA600;" :key='index'></view>
						<view class="point" style="font-size: 28rpx;color: red;margin-left: 10rpx;">5.0</view>
					</view>
					<view class="shop_table_item_notice">
						到店支付100送100购物券
					</view>
					<view class="shop_table_item-location">
						<image :src="img_url+'dao_location.png'" mode="" style="width: 35rpx;height: 35rpx;"></image>
						<text style="margin: 0 10rpx;">白云区</text>
						<text>1.5km</text>
					</view>
				</view>	
			</view>
		</view>
		
		<hans-tabber :list="list"  style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></hans-tabber>
		<citySelect @back_city="back_city" v-if="show"></citySelect>
	</view>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	import cgSwiper from '@/components/cg-swiper/cg-swiper.vue';
	import hansTabber from '../../components/hans-tabbar/hans-tabbar.vue'
	export default{
		components:{
			citySelect,
			cgSwiper,
			hansTabber
		},
		data(){
			return{
				img_url: this.$api.img_url,
				keyword:'',
				city:'广州市',
				show:false,//城市选择显示或者影藏
				swiperList:[
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg',
						text:1
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/1ab0ce94f41c4e7ca4126d5d1b6717f6.jpg',
						text:2
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/7438aaf338ce4a90b30a2806a3fee785.jpg',
						text:3
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg',
						text:1
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/1ab0ce94f41c4e7ca4126d5d1b6717f6.jpg',
						text:2
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/7438aaf338ce4a90b30a2806a3fee785.jpg',
						text:3
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg',
						text:1
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/1ab0ce94f41c4e7ca4126d5d1b6717f6.jpg',
						text:2
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/7438aaf338ce4a90b30a2806a3fee785.jpg',
						text:3
					}
					,
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/3916be5165cb4d4aadae49a5a34400e6.jpg',
						text:1
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/1ab0ce94f41c4e7ca4126d5d1b6717f6.jpg',
						text:2
					},
					{
						img:'https://liangcang-material.alicdn.com/prod/upload/7438aaf338ce4a90b30a2806a3fee785.jpg',
						text:3
					}
					
					
				],
				shoptable:['同城好店','同城好店','同城好店'],
				currentIndex:0,//table默认选项
				 list: [{
				                     "text": "首页",
				                     "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/dd6672076ec5386b6dc2e06040a0b802.png' ,
				                     "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png'
				                   },
				                   {
				                     "text": "同城",
				                    "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/dd6672076ec5386b6dc2e06040a0b802.png' ,
				                    "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png'
				                     },
				                     {
				                       "text": "我的",
				                       "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/08ba1fe2754bc566116a39deee8fdd90.png',
				                       "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/e6e4ff50b6ef41c1ab17775f676d7b4f.png'
				                     }],
			}
		},
		onReady() {
			var info = uni.getSystemInfoSync()
			var window_height = info.windowHeight
			var query = uni.createSelectorQuery()
			var that = this
			query.select("#index1_content_top").boundingClientRect(function(res) {
				var view_height = window_height - res.height
				that.height = view_height
			}).exec()
		},
		methods:{
			setCITY(){ //选择城市
				this.show=true
			},
			back_city(e){ //城市选择回显
				if (e !== 'no') {
					this.city = e.cityName ;
					this.show=false;
				} 
				else { 
					this.show=false;
				 }
			},
			selectTable(index){ //table切换选择
				this.currentIndex=index
			},
			tabChange(index) { //切换下面的tabbar
			   if(index){
				   if(index==1){
						uni.navigateTo({
							url:'../citywide/citywide'
						})
				   }
				   if(index==2){
					   uni.navigateTo({
					   	url:'../../pages/user/index'
					   })
				   }
			   }
			},
			shopdetail(){
				uni.navigateTo({
					url:'../detail/detail'
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import url("../../plugins/font-icon/iconfont1.css");
	.shop-container{width: 100%;overflow: hidden;}
	.index1_content_top {width: 100%;display: flex;align-items: center;padding: 15px 15px 10px 15px;position: fixed;top: 0;left: 0;z-index: 999;}	
	.index1_content_top_l {display: flex;font-size: 13px;font-weight: bold;color: #131313;}	
	.index1_content_top_l_r {margin-left: 5px;width: 8px;height: 8px;border-top: 2px #FFF solid;border-right: 2px #fff solid;transform: rotate(135deg);margin-top: 3px;margin-bottom: 8px;}	
	.index1_content_top_r {width: 60%;height: 29px;background: #F4F4F4;border-radius: 14px;font-size: 14px;margin-left: 15px;display: flex;align-items: center;padding-left: 15px;}
	.index1_content_top_r_input {width: 100%;font-size: 14px;}
	.shop-type{width: 100%;overflow: hidden;margin-top: 108rpx;}
	.shop-table{width: 100%;height: 100rpx;display: flex;justify-content: space-evenly;background: rgb(244,244,244);}
	.shop-table view{width: 30%;margin-top: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;}
	.shop-table view text{display: block;margin: 0 auto;width:100%;text-align: center;}
	.shop-table view text:nth-of-type(2){width: 80rpx;height: 5rpx;}
	.active{color: #FF7104;}
	.active text:nth-of-type(2){background: #FF7104;}
	.shop_table_list{width: 100%;overflow: hidden;margin-bottom: 116rpx;}
	.shop_table_item{width: 95%;margin: 15rpx auto;background: #fff;display: flex;justify-content: space-evenly;overflow: hidden;}
	.shop_table_item_left{width: 35%;height: 250rpx;margin: 20rpx 0;}
	.shop_table_item_left image{width: 100%;display: block;height: 250rpx;}
	.shop_table_item_right{width: 64%;padding-left: 25rpx;box-sizing: border-box;margin: 20rpx 0;position: relative;}
	.shop_table_item-name{width: 100%;font-size: 34rpx;color: #000;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.shop_table_item_notice{font-size: 28rpx;color: rgb(255,166,0);margin-top: 5rpx;background: rgb(247,236,230);width: 80%;text-align: center;border-radius: 10rpx;}
	.shop_table_item-score{width: 100%;overflow: hidden;flex: 1;display: flex;align-items: center;margin-top: 10rpx;}
	.shop_table_item-location{width: 100%;overflow: hidden;position: absolute;left: 0;bottom: 0;text-align: right;line-height: 50rpx;font-size: 28rpx;}
	.shop_table_item-location image{display: inline-block;position: relative;top: 6rpx;}
</style>
