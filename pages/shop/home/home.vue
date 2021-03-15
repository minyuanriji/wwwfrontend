<template>
	<view class="home_content" :style="{background:background}">
		<tabar :current="current" :background="background"></tabar>
		<scroll-view scroll-y="true" class="home_content_body" :style="'height:'+height+'px;'" @scrolltolower="scrolltolower" lower-threshold="100">
			<view class="home_content_top" id="index1_content_top">
				 <image :src="store.logo" class="home_content_logo"></image>
				 <view class="home_content_top_r">
					 <view class="content_top_r_name">{{store.name}}</view>
					 <view class="content_top_r_desc">{{store.description}}</view>
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
				  <!--分类-->
				 <view class="index1_content_sort">
				  	 <view class="index1_content_sort_block" v-for="item in params['sort']" @tap="toList(item.id)">
				  		 <image :src="item.pic_url?item.pic_url:host+'/images/shop/noneimg.png'" class="index1_content_sort_block_icon" mode="widthFix"></image>
				  		 <view class="index1_content_sort_block_txt">{{item.name}}</view>
				  	 </view>
				  </view>
				  <!-- 产品 -->
				  <view class="shop-my-products" style="margin-top: 20rpx;">
				  		爆品区
				  </view>
						<view class="simulate-product">
							<view class="product-item" v-for="item in 3">
								<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210301/cf25b1aa6ad93a149ee217e36e7f6473.jpg" mode="widthFix" class="product-item-logo"></image>
								<view class="product-item-name">雷盛豪迈系列430法国干红葡萄酒 750ml*6支</view>
								<view class="product-item-money-buy">
									<view class="product-item-money">
										￥36
									</view>
									<view class="product-item-buy">
										<image src="http://www.mingyuanriji.cn/web/statics/img/mall/goods/cart_active.png" mode="" class="select1_buyBtn1"></image>
									</view>
								</view>
							</view>
						</view>
				  
				   <!-- 产品 -->
				  <!--商品列表-->
				  <view class="shop-my-products">
				  		 店铺商品
				  </view>
				  <view class="index1_content_list">
					  <view class="index1_content_list_block" v-for="item in list" @tap="toDetail(item.id)">
						  <view class="index1_content_list_block_t">
							  <image :src="item.cover_pic" class="block_t_head"></image>
							  <view class="index1_content_list_block_t_r">
								  <view class="index1_content_list_block_t_r_name">{{item.name}}</view>
								  <view class="index1_content_list_block_t_r_block">
									  <view class="r_block_label">促销价</view>
									  <view class="r_block_now_price">¥{{item.price}}</view>
									  <view class="r_block_old_price">¥{{item.original_price}}</view>
								  </view>
								  <!-- <view class="index1_content_list_block_t_r_bottom">截团：{{item.end_time}}</view> -->
							  </view>
						  </view>
						  <view class="index1_content_list_block_b">
							  <view class="index1_content_list_block_b_l">
								<!--  <view class="index1_content_list_block_b_l_l">
									  <image :src="t.head" v-for="t in item.userList"></image>
								  </view>
								  <view class="index1_content_list_block_b_l_r">
									  ... 等购买了此商品
								  </view> -->
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
				current:0,
				background:"#53DEDB",
				height:"",
				isMiniWechat:2,//判断是否是小程序 1 是
				mch_id:"",//商户ID
				params:{
					 "name":"小喵的店铺",
					 "logo":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg",
					 "desc":"货真价实的正品什么的",
					 "sort":[
						
					 ]
				},
				"list":[
					
				],
				keyword:"",
				page:1,
				page_count:"",//页面总数
				isScorll:true,//是否可以滚动
				host:"",
				store:{}
			}
		},
		methods: {
			// toList(id){
			// 	var mch_id=this.mch_id
			// 	var cat_id=id
			// 	uni.navigateTo({
			// 		url:"/pages/shop/goods/list?cat_id="+cat_id+"&mch_id="+mch_id
			// 	})
			// },
			toDetail(proId){
				uni.navigateTo({
					url:"/pages/goods/detail?proId="+proId
				})
			},
			search(){//搜索
			    this.list=[]
				this.page=1
				this.getMchGoods()
			},
			scrolltolower(){//滚动加载
				if(this.page==this.page_count) return false;
				if(!this.isScorll) return false;
				this.page=this.page+1
				this.getMchGoods()
			},
			getmchstore(){
				var that=this
				var mch_id=this.mch_id
				var params=this.params
				this.$http.request({
					 url:this.$api.moreShop.getmchstore,
					 data:'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="mch_id"' +
					'\r\n' +
					'\r\n'+mch_id,
					 method:'POST',
					 isformData:true
					 }).
					then(function(res){
						that.store=res.data.store
				   })
			},
			sliderBtn(e){//筛选切换
				this.dhIndex=e
			},
			getGoodsCats(){//获取商户分类
				var that=this
				var mch_id=this.mch_id
				var params=this.params
				this.$http.request({
					 url:this.$api.moreShop.getmchgodscats,
					 data:{mch_id},
					 method:'post',
					 }).
					then(function(res){
						that.params.sort=res.data.list
						that.params=params
				   })
			},
			getMchGoods(){//获取商户商品
			    this.isScorll=false
			    var page=this.page
			    var keyword=this.keyword
			    var that=this
				var mch_id=this.mch_id
			    var params={page,keyword,mch_id}
				this.$http.request({
					 url:this.$api.moreShop.getmchgods,
					 data:params,
					 method:'post',
					 showLoading:true
					 }).
					then(function(res){
						if(res.data.list.length==0) return false;
						that.isScorll=true
						var new_data=res.data.list
						var list=that.list.concat(new_data)
						that.list=list
						that.page_count=res.page_count
				   })
			}
		},	
		onReady(){
			var info=uni.getSystemInfoSync()
			var window_height=info.windowHeight
			var query=uni.createSelectorQuery()
			var that=this
			that.height=window_height
		},
		onLoad(e){
			var mch_id=e.mch_id?e.mch_id:uni.getStorageSync('mch_id')
			this.mch_id=mch_id
			uni.setStorageSync('mch_id',mch_id)
			this.host=this.$api.test_url
			this.getmchstore()
			this.getGoodsCats()
			this.getMchGoods()
			uni.setNavigationBarColor({
				  frontColor: "#ffffff",
				  backgroundColor: this.background,
				  animation: {
				    duration: 400,
				    timingFunc: 'easeIn'
				  }
			})
			uni.setNavigationBarTitle({
				title:"名媛日记"
			})
		},
		onShareAppMessage() {
			return{
				title:this.store.name,
				path:"/pages/shop/home/home?mch_id="+this.mch_id
			}
		},
		onShow(){
			if(this.$http.getPlatform()=='mp-wx'){
				this.isMiniWechat=1
			}
		}
	}
</script>

<style>
@import url("../../../static/font-icon/iconfont1.css");
page{width: 100%;height: 100%;}
.home_content{width: 100%;height: 100%;}
.home_content_top{width: 100%;display: flex;align-items: center;padding: 33px 15px 10px 15px;}
.home_content_logo{
	width: 61px;
	height: 61px;
	background: #FFFFFF;
	border-radius: 50%;
}
.home_content_top_r{flex: 1;margin-left: 10px;}
.content_top_r_name{
	font-size: 17px;
	font-weight: bold;
	color: #FFFFFF;

}
.content_top_r_desc{
	margin-top: 5px;
	font-size: 13px;
	font-weight: 400;
	color: #FFFFFF;

}
.home_content_top_share{
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
.home_content_content{
	background-color: #fff;
	border-radius: 21px;
	padding: 8px 15px;
}
.index1_content_top_r{
width: 95%;
height: 39px;
background: #F4F4F4;
border-radius:21px;
font-size: 14px;
margin: 0 auto;
display: flex;
align-items: center;
padding-left: 15px;
}
.index1_content_top_r_input{
	width: 100%;
	font-size: 14px;
}
.index1_content_sort{
	margin-top: 23px;
	display: flex;
	flex-wrap: wrap;
}
.index1_content_sort_block{
	width: 25%;
	text-align: center;
	padding: 0px 5px;
	margin-bottom: 18px;
}
.index1_content_body{
	background-color: #fff;
	padding: 5px 10px 5px 10px;
}
.index1_content_sort_block_icon{
	width: 100%;
	margin: 0px auto;
}
.index1_content_sort_block_txt{
	font-size: 10px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #42414F;
}
.index1_content_list{padding-bottom: 100px;}
 .index1_content_list_block{display: block;padding: 15px;border-bottom: 1px #eee solid;
 box-shadow: 0px 0px 10px #eee;
 margin-bottom: 10px;
 border-radius: 6px;
 }

.index1_content_list_block_t{display: flex;}
.block_t_head{height: 120px;width: 120px;}
.index1_content_list_block_t_r{margin-left: 15px;flex: 1;}
.index1_content_list_block_t_r_name{font-size: 18px;}
.index1_content_list_block_t_r_block{display: flex;align-items: center;margin-top: 15px;}
.r_block_label{padding: 0px 4rpx;background-color: #fa7f5e;font-size: 11px;color: #000000;border-radius: 10px;text-align: center;}
.r_block_now_price{font-size: 20px;color: #dc3c63;margin-left: 3px;}
.r_block_old_price{color: #b4b3b3;font-size: 13px;margin-left: 10px;text-decoration: line-through;}
.index1_content_list_block_t_r_bottom{color: #555;font-size: 13px;}
.index1_content_list_block_b{display: flex;padding: 15px 0px 0px 15px;align-items: center;}
.index1_content_list_block_b_l{display: flex;flex: 1;align-items: center;}
.index1_content_list_block_b_l_l{display: flex;align-items: center;}
.index1_content_list_block_b_l_l image{width: 20px;height: 20px;border-radius: 50%;margin-left: -10px;}
.index1_content_list_block_b_l_r{font-size: 13px;color: #b4b3b3;}
.index1_content_list_block_b_r{padding: 5px 25px;background-color: #DC3C63;color: #ffffff;border-radius: 15px;font-size: 14px;font-weight: bold;}





.simulate-product{width: 95%;overflow: hidden;margin: 0 auto 50rpx;display: flex;justify-content: space-between;flex-wrap: wrap;}
.product-item{width: 48%;overflow: hidden;}
.product-item-logo{width: 100%;}
.product-item-name{width: 100%;
overflow: hidden;
-webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
font-size: 28rpx;margin-bottom: 24rpx;}
.product-item-money-buy{width: 100%;overflow: hidden;display: flex;justify-content: space-between;}
.product-item-money{color: rgb(7, 190, 180);font-size: 28rpx;}
.select1_buyBtn1 {width: 44rpx;height: 44rpx;display: block;}
.shop-my-products{width: 100%;text-align: center;background-color: rgb(83, 222, 219);height: 80rpx;line-height: 80rpx;color: #fff;}
</style>
