<template>
	<view class="index1_content">
		<!--搜索-->
		<view class="index1_content_top" id="index1_content_top">
			<view class="index1_content_top_r">
				<view class="iconfont iconsousuo"></view>
				<input type="text" placeholder="输入商家名、品类或商圈" class="index1_content_top_r_input" v-model="keyword" @confirm="search"></input>
			</view>
		</view>
		<!---->
		<scroll-view scroll-y="true" class="index1_content_body" :style="'height:'+height+'px;'" @scrolltolower="scrolltolower">
			<!--筛选条件-->
			<view class="index1_content_xs">
				<view class="index1_content_xs_block" v-for="(item,index) in dhList" :class="index==dhIndex?'xs_block_active':''" @tap="sliderBtn(index)">
					<view class="index1_content_xs_block_name">{{item}}</view>
					<view class="index1_content_xs_block_r"></view>
				</view>
			</view>
			<!--店铺列表-->
			<view class="index1_content_shop">
				<view class="index1_content_shop_block" v-for="item in shop_list" @tap="toDetail(item.id)">
					 <image :src="item.store.cover_url" class="index1_content_shop_block_img"></image>
					 <view class="index1_content_shop_block_r">
						 <view class="index1_content_shop_block_r_name">{{item.store.name}}</view>
						 <view class="index1_content_shop_block_r_m">
							 <view class="index1_content_shop_block_r_m_star">
								  <view class="iconfont iconwujiaoxing" v-for="i in (Number(item.store.score))" style="color: #FFA600;"></view>
								  <view class="point">{{item.store.score}}分</view>
							 </view>
							 <view class="index1_content_shop_block_r_m_aver" v-if="item.store.average_spend">{{item.store.average_spend}}/人</view>
							 <view class="index1_content_shop_block_r_m_dist" v-if="item.store.distance">{{item.store.distance}}</view>
						 </view>
						 <view class="index1_content_shop_block_r_m1">
						 	  <view class="index1_content_shop_block_r_m1_l" v-if="item.store.main_product">{{item.store.main_product}}</view>
							  <view class="index1_content_shop_block_r_m1_r">{{item.store.address}}</view>
						 </view>
						 <view class="index1_content_shop_block_r_m2">
						 	 {{item.store.description}}
						 </view>
						 <view class="index1_content_shop_block_r_m3" v-if="item.store.tuan">
						 	 <view class="index1_content_shop_block_r_m3_l">团</view>
							 <view class="index1_content_shop_block_r_m3_r">{{item.store.tuan}}</view>
						 </view>
						 <view class="index1_content_shop_block_r_m4" v-if="item.store.juan">
						 	 <view class="index1_content_shop_block_r_m4_l">劵</view>
						 	 <view class="index1_content_shop_block_r_m4_r">{{item.store.juan}}</view>
						 </view>
					 </view>
				</view>
				
				<!--加载loadding-->
				<main-loadmore :visible="moreLoading" :index="3" type="red"></main-loadmore>
				<main-loading :visible="mainLoading"></main-loading>
				<!--加载loadding-->
				
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
				height:"",//滚动高度
				sortList:[//导航分类
					
				],
				ms_list:[
					{"name":"化妆品","img":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg","url":""},
					{"name":"化妆品","img":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg","url":""},
					{"name":"化妆品","img":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg","url":""},
					{"name":"化妆品","img":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg","url":""},
					{"name":"化妆品","img":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729596015,2929996475&fm=15&gp=0.jpg","url":""},
				],//秒杀
				dhIndex:0,//导航索引 默认为全部商铺
				dhList:["全部商铺","附近","智能排序","筛选"],
				shop_list:[
					
				],
				sort:"",
				keyword:"",
				page:1,
				lat:"",//纬度
				lnt:"",//经度
				page_count:"",//页面总数
				isScorll:true,//是否可以滚动
				host:"",
				cat_id:"",
				
				moreLoading: false,
				mainLoading: false,
			}
		},
		methods: {
			getKm(lat1, lng1, lat2, lng2){
				var radLat1 = lat1*Math.PI / 180.0;
				var radLat2 = lat2*Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
				Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
				s = s *6378.137 ;// EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				return s;
			},
			toList(){
				
			},
			toDetail(mch_id){
				uni.setStorage({
					key:'mch_id',
					data:mch_id,
					success() {
						uni.navigateTo({
							url:"/pages/shop/home/home?mch_id="+mch_id
						})
					}
				})
				
			},
			search(){//搜索
			    this.shop_list=[]
				this.page=1
				this.getData()
			},
			scrolltolower(){//滚动加载
				if(this.page==this.page_count) return false;
				if(!this.isScorll) return false;
				this.page=this.page+1
				this.getData()
			},
			sliderBtn(e){//筛选切换
			    if(e==1){
					this.sort='nearby'
				}else if(e==2){
					this.sort='ai'
				}
				this.page=1
				this.shop_list=[]
				this.getData()
				this.dhIndex=e
			},
			getCat(){//获取导航
				var that=this
				this.$http.request({
					 url:this.$api.moreShop.getmchscats,
					 data:{},
					 method:'post',
					 }).
					then(function(res){
						that.sortList=res.data.list
				   })
			},
			getData(bool){//获取门店列表
				this.isScorll=false
				var page=this.page
				var lat=this.lat
				var lnt=this.lnt
				var keyword=this.keyword
				var that=this
				var cat_id=this.cat_id
				var params={page,lat,lnt,keyword,cat_id}
				
				if(bool){
					this.mainLoading = true;
				}else{
					this.moreLoading = true;
				}
				
				this.$http.request({
						 url:this.$api.moreShop.getmchs,
						 data:params,
						 method:'post'
						 }).
						then(function(res){
							
							that.mainLoading = false;
							that.moreLoading = false;
												
							
							if(res.list.length==0) return false;
							that.isScorll=true
							var alist=res.list
							for(var i=0;i<alist.length;i++){
								var latitude=alist[i]['store']['latitude']
								var longitude=alist[i]['store']['longitude']
								var km=that.getKm(latitude,longitude,lat,lnt)
								var km1=Number(km)>=1?km.toFixed(1)+'km':Math.round(Number(km)*1000)+'m'
								alist[i]['store']['distance']=km1
							}
							var new_data=alist
							console.log(that.shop_list)
							var shop_list=that.shop_list.concat(new_data)
							that.shop_list=shop_list
							that.page_count=res.pagination.page_count
							that.page=res.pagination.current_page
				   })
			},
			getLocationData(){
				var that=this
				uni.getLocation({
					type:'gcj02',
					success(res) {
						var longitude=res.longitude
						var latitude=res.latitude
						that.lat=latitude
						that.lnt=longitude
						that.getData()
					},
					fail(){
						that.getData()
					}
				})
			}
		},	
		onReady(){
			var info=uni.getSystemInfoSync()
			var window_height=info.windowHeight
			var query=uni.createSelectorQuery()
			var that=this
			query.select("#index1_content_top").boundingClientRect(function(res){
				 var view_height=window_height-res.height
				 that.height=view_height
			}).exec()
		},
		onLoad(e){
			var that=this
			this.host=this.$api.test_url
			var cat_id=e.cat_id
			this.cat_id=cat_id
			var name=e.name
			uni.setNavigationBarTitle({
				title:name?name:"商铺列表"
			})
			//#ifdef H5
			   if(this.$http.getPlatform()=='wechat'){
				   this.$wechatSdk.location(function(res){
				   				   var longitude=res.longitude
				   				   var latitude=res.latitude
				   				   that.lat=latitude
				   				   that.lnt=longitude
				   				   that.getData()
				   })
			   }else{
				    this.getLocationData()
			   }
			   
			// #endif
			// #ifndef H5
			   this.getLocationData()	  
			// #endif
		}
	}
</script>

<style>
/* @import url("@/static/font-icon/iconfont1.css"); */
@import url("@/plugins/font-icon/iconfont1.css");
.index1_content{
	padding-bottom: 80px;
}
.index1_content_top{width: 100%;display: flex;align-items: center;padding: 10px 15px;background-color: #fff;}
.index1_content_top_l{display: flex;
font-size: 13px;
font-weight: bold;
color: #131313;
}
.index1_content_top_r{
height: 29px;
background: #F4F4F4;
border-radius: 14px;
font-size: 14px;
margin-left: 15px;
display: flex;
align-items: center;
width: 100%;
}
.index1_content_top_r_input{
	width: 100%;
	font-size: 14px;
}

.index1_content_sort{
	display: flex;
	flex-wrap: wrap;
	border-radius: 5px;
	border: 1px #eee solid;
	padding: 10px 10px 0px 10px;
}
.index1_content_sort_block{
	width: 20%;
	text-align: center;
	padding: 0px 5px;
	margin-bottom: 10px;
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
.index1_content_ms{
	
}
.index1_content_ms_img{
	width: 100%;
	height: 86px;
	border-radius: 6px;

}
.ms_title{
	margin: 11px auto 6px;
	font-size: 14px;
	font-weight: bold;
	color: #000000;
	opacity: 0.8;
}
.index1_content_xs{
	display: flex;
	padding: 15px 0px;
	border-bottom: 1px #eee solid;
}
.index1_content_xs_block{
	flex: 1;
	padding: 4px 0px;
	background: #f1efef;
	border-radius: 11px 11px 0px 0px;
	margin-right: 5px;
	font-size: 13px;
	font-weight: bold;
	color: #000000;
    text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

}
.xs_block_active{
	background-color: #fff;
	box-shadow: 0px -3px 3px #eee;
}
.index1_content_xs_block_r{
	width: 7px;
	height: 7px;
	border-top: 1px #999 solid;
	border-right: 1px #999 solid;
	transform: rotate(135deg);
	margin-left: 5px;
}

.index1_content_shop_block{display: flex;padding: 15px;border-bottom: 1px #eee solid;}
.index1_content_shop_block_img{
width: 58px;
height: 58px;
background: #C4C4C4;
border-radius: 2px;
}
.index1_content_shop_block_r{flex: 1;margin-left: 13px;}
.index1_content_shop_block_r_name{
font-size: 14px;
font-weight: bold;
color: #000000;
}
.index1_content_shop_block_r_m{margin: 8px 0px;display: flex;}
.index1_content_shop_block_r_m_star{flex: 1;display: flex;align-items: center;}
.index1_content_shop_block_r_m_aver{
font-size: 11px;
font-weight: bold;
color: #787878;
margin-left: 20px;
}
.index1_content_shop_block_r_m_dist{
font-size: 11px;
font-weight: bold;
color: #787878;
margin-left: 30px;
}
.index1_content_shop_block_r_m1{display: flex;align-items: center;
font-size: 11px;
font-weight: bold;
color: #787878;
}
.index1_content_shop_block_r_m1_l{flex: 1;}
.index1_content_shop_block_r_m2{margin: 8px auto;font-size: 11px;
font-weight: bold;
color: #787878;}
.index1_content_shop_block_r_m3{display: flex;font-size: 11px;
color: #787878;align-items: center;}
.index1_content_shop_block_r_m3_l{width: 11px;
height: 11px;
background: #45BCAF;
text-align: center;
line-height: 11px;
font-size: 7px;
color: #fff;
}
.index1_content_shop_block_r_m4{display: flex;font-size: 11px;
color: #787878;align-items: center;margin: 7px auto;}
.index1_content_shop_block_r_m4_l{width: 11px;
height: 11px;
background: #DC9106;
text-align: center;
line-height: 11px;
font-size: 7px;
color: #fff;
}
.index1_content_shop_block_r_m3_r{font-weight: bold;margin-left: 4px;}
.index1_content_shop_block_r_m4_r{font-weight: bold;margin-left: 4px;}
.point{
	font-weight: bold;
	color: #787878;
	margin-left: 10px;
	font-size: 11px;
	}
</style>
