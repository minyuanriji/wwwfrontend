<template>
	<view class="index1_content">
		<!--搜索-->
		<view class="index1_content_top" :style="{background:'#FF7104'}" id="index1_content_top">
			<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker" :range="multiArray" class="index1_content_top_l">
				<view style="display: flex;align-items: center;">
					<view class="index1_content_top_l_name" style="color: white;">{{city}}</view>
					<view class="index1_content_top_l_r"></view>
				</view>
			</picker>
			<view class="index1_content_top_r">
				<view class="iconfont iconsousuo"></view>
				<input type="text" placeholder="输入商家名、品类或商圈" class="index1_content_top_r_input" v-model="keyword" @confirm="search"></input>
			</view>
		</view>
		<!---->
		<scroll-view scroll-y="true" class="index1_content_body" :style="'height:'+height+'px;'" @scrolltolower="scrolltolower">
			<!--导航菜单-->
			<view class="index1_content_sort">
				 <view class="index1_content_sort_block" v-for="(item,index) in sortList" @tap="toList(item.id,item.name)" :key='index'>
					 <image :src="item.pic_url?item.pic_url:host+'/images/shop/noneimg.png'" class="index1_content_sort_block_icon" mode="widthFix"></image>
					 <view class="index1_content_sort_block_txt">{{item.name}}</view>
				 </view>
			</view>
			<!--限时秒杀-->
			<!-- <view class="ms_title">限时秒杀</view>
			<swiper class="index1_content_ms" display-multiple-items="1" previous-margin="88px" next-margin="88px" current="1">
				<block v-for="item in ms_list">
					<swiper-item>
						<image :src="item.img" class="index1_content_ms_img" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper> --> 
			<!--筛选条件-->
			<view class="index1_content_xs">
				<view class="index1_content_xs_block" v-for="(item,index) in dhList" :class="index==dhIndex?'xs_block_active':''" @tap="sliderBtn(index)" :key='index'>
					<view class="index1_content_xs_block_name">{{item}}</view>
					<view class="index1_content_xs_block_r"></view>
				</view>
			</view>
			<!--店铺列表-->
			<view class="index1_content_shop">
				<view class="index1_content_shop_block" v-for="(item,index) in shop_list" @tap="toDetail(item.id)" :key='index'>
					 <image :src="item.store.cover_url" class="index1_content_shop_block_img"></image>
					 <view class="index1_content_shop_block_r">
						 <view class="index1_content_shop_block_r_name">{{item.store.name}}</view>
						 <view class="index1_content_shop_block_r_m">
							 <view class="index1_content_shop_block_r_m_star">
								  <view class="iconfont iconwujiaoxing" v-for="(i,index) in (Number(item.store.score))" style="color: #FFA600;" :key='index'></view>
								  <view class="point">{{item.store.score}}分</view>
							 </view>
							 <view class="index1_content_shop_block_r_m_aver" v-if="item.store.average_spend">{{item.store.average_spend}}/人</view>
							 <view class="index1_content_shop_block_r_m_dist" v-if="item.distance_format">{{item.distance_format}}</view>
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
					 <image :src="img_url+'dao_location.png'" mode="" class="locatins_logo" @click.stop="location(item.store.latitude,item.store.longitude,item.store.address)"></image>
				</view>
			</view>
		</scroll-view>
		<!-- 导航栏 -->
		<main-tabbar></main-tabbar>
		<!-- 导航栏 -->
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
				effect:"",
				keyword:"",
				page:1,
				lat:"",//纬度
				lnt:"",//经度
				page_count:"",//页面总数
				isScorll:true,//是否可以滚动
				host:"",
				multiArray: [], //picker数据
				value:[0,0,0],
				selectList:[],
				provice: "",
				city: "",
				district: "",
				proviceId: "",
				cityId: "",
				districtId: "",
				ifOnShow:false,
			}
		},
		methods: {
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
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
			toList(e,name){
				var cat_id=e				
				uni.navigateTo({
					url:"/pages/shop/list/list?cat_id="+cat_id+"&name="+name
					
				})
			},
			toDetail(mch_id){
				let mall_id=uni.getStorageSync("mall_id")?uni.getStorageSync("mall_id"):5;
				uni.navigateTo({
						url:"/pages/shop/home/home?mch_id="+mch_id
					})
				// if(uni.getStorageSync("userInfo")){
				// 	let user_id=JSON.parse(uni.getStorageSync("userInfo")).user_id
				// 	let obj={
				// 		mall_id:mall_id,
				// 		user_id:user_id,
				// 		mch_id:Number(mch_id),
				// 	}
				// 	this.$http.request({
				// 		url: this.$api.moreShop.getclickNum,
				// 		method: 'POST',
				// 		showLoading:true,
				// 		data: obj
				// 	}).then(res => {
				// 		if (res.code == 0) {
				// 			uni.setStorage({
				// 				key:'mch_id',
				// 				data:mch_id,
				// 				success() {
				// 					uni.navigateTo({
				// 						url:"/pages/shop/home/home?mch_id="+mch_id
				// 					})
				// 				}
				// 			})
				// 		}
				// 	})			
				// }else{
				// 	uni.navigateTo({
				// 		url:"/pages/shop/home/home?mch_id="+mch_id
				// 	})
				// }	
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
				console.log(e)
				if(e==0){
					this.effect=''
				}else if(e==1){
					this.effect='nearby'					
				}else if(e==2){
					this.effect='intelligence'
				}else if(e==3){
					this.effect='screen'
				}			    
				this.shop_list=[]
				this.page=1
				this.getData()
				this.dhIndex=e
			},
			getCat(){//获取导航
				var that=this
				this.$http.request({
					 url:this.$api.moreShop.getmchscats,
					 data:{},
					 method:'post',
					 // showLoading:true,
					 }).
					then(function(res){
						that.sortList=res.data.list
				   })
			},
			getData(){//获取门店列表
				this.isScorll=false
				var page=this.page
				var lat=this.lat
				var lnt=this.lnt
				var keyword=this.keyword
				var effect =this.effect
				var that=this
				var params={page,lat,lnt,keyword,effect}
				this.$http.request({
						 url:this.$api.moreShop.getmchs,
						 data:params,
						 method:'post',
						 showLoading:true
						 }).
						then(function(res){
							that.city=res.city_data.sel_city
							if(res.list.length==0) return false;
							that.isScorll=true
							var alist=res.list
							for(var i=0;i<alist.length;i++){
								var latitude=alist[i]['store']['latitude']
								var longitude=alist[i]['store']['longitude']
							}
							var new_data=alist
							var shop_list=that.shop_list.concat(new_data)
							that.shop_list=shop_list
							that.page_count=res.pagination.page_count
				   })
			},
			picker(e) {
				let value = e.detail.value;
				if (this.selectList.length > 0) {
					this.provice = this.selectList[value[0]].name; //获取省
					// this.city = this.selectList[value[0]].children[value[1]].name; //获取市
					// uni.setStorageSync('x-city-name',this.city)
					this.district = this.selectList[value[0]].children[value[1]].children[value[2]].name; //获取区
					this.text = this.provice + " " + this.city + " " + this.district;
					this.proviceId = this.selectList[value[0]].id; //获取省id
					this.cityId = this.selectList[value[0]].children[value[1]].id; //获取市id
					uni.setStorageSync('x-city-id',this.cityId)
					this.districtId = this.selectList[value[0]].children[value[1]].children[value[2]].id; //获取区id
				}
				this.shop_list=[]
				this.page=1
			    this.getData();
			},
			columnPicker(e) {
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						
					];
					this.value = [this.value[0], value, 0]
				}
			},
			getDistrict() { //获取乡镇数据
				this.$http.request({
					url: this.$api.district.town_list,
					data: {
						district_id: this.districtId
					},
					 // showLoading:true,
				}).then(res => {
					if (res.code == 0) {
						this.town_data = res.list;
						this.array = res.list.map(val => val.name);
					}
				})
			},
			getCity() { //请求省市区数据
				this.$http.request({
					url: this.$api.moreShop.getCity,
					method: 'post',
					 // showLoading:true,
				}).then((res) => {
					// 处理数据
					var provinceArr = [];
					var cityArr = [];
					var districtArr = [];
					for (var key in res.data) { //分为三个数组
						if (res.data[key].level == 'province' || res.data[key].level == 'city') {
							this.$set(res.data[key], 'children', [])
						}
						if (res.data[key].level == 'province') {
							provinceArr.push(res.data[key])
						}
						if (res.data[key].level == 'city') {
							cityArr.push(res.data[key])
						}
						if (res.data[key].level == 'district') {
							districtArr.push(res.data[key])
						}
					}
					this.multiArray = [provinceArr, cityArr];
			
					cityArr.forEach((item, index) => {
						districtArr.forEach((items, index) => {
							if (item.id == items.parent_id) {
								item.children.push(items);
							}
						})
					})
			
					provinceArr.forEach((item, index) => {
						cityArr.forEach((items, indexs) => {
							if (item.id == items.parent_id) {
								item.children.push(items);
							}
						})
					})
					this.selectList = provinceArr;
			
					this.multiArray = [
						this.toArr(this.selectList),
						this.toArr(this.selectList[0].children),
						
					];
			
				})
			},
			deleteAddress() { //删除地址
				var that = this;
				uni.showModal({
					content: '确定要删除该地址吗?',
					confirmColor: this.textColor,
					success: function(res) {
						if (res.confirm) {
							that.$http.request({
								url: that.$api.user.addressDelete,
								data: {
									id: that.id
								}
							}).then(res => {
								if (res.code == 0) {
									that.$http.toast(res.msg);
									setTimeout(() => {
										uni.navigateBack();
									}, 1000)
								}
							})
						}
					}
				});
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
						uni.setStorageSync('x-longitude',res.longitude)
						uni.setStorageSync('x-latitude',res.latitude)
						that.getData()
					}
				})
			},
			location(lat,lnt,addrress){
				window.location.href='https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+lat+','+lnt+';addr:'+addrress+'&referer=myapp&key=O3DBZ-IFH3W-KKIRN-RZPNQ-AOSH3-EGB5N'
				// console.log(lat,lnt,addrress)
				// uni.openLocation({
				// 	 latitude:Number(lat),
				// 	 longitude:Number(lnt),
				// 	 name:addrress,
				// 	 address:addrress,
				// 	 success: function () {
						
				// 	},
				// 	success: function () {
						
				// 	}
				// })	
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
		onLoad() {
			var that=this
			this.host=this.$api.test_url
			if(uni.getStorageSync('x-city-id')){
				uni.removeStorageSync("x-city-id")
			}
			this.getCity();
			//#ifdef H5
			   if(this.$http.getPlatform()=='wechat'){
				   this.$wechatSdk.location(function(res){
				   		var longitude=res.longitude
				   		var latitude=res.latitude
				   		that.lat=latitude
				   		that.lnt=longitude
						uni.setStorageSync('x-longitude',res.longitude)
						uni.setStorageSync('x-latitude',res.latitude)
				   		that.getData()
				   })
			   }else{
				    that.getLocationData()
			   }
			   
			// #endif
			// #ifndef H5
				that.getLocationData()	  
			// #endif
			that.getCat()
		},
		onShareAppMessage() {
			return{
				title:"补商汇官方商城",
				path:"/pages/shop/shop"
			}
		},
		// onHide(){
		// 	this.page=1
		// 	this.lat='',
		// 	this.lnt='',
		// 	this.keyword='',
		// 	this.shop_list=[]
		// },
	}
</script>	

<style>
/* @import url("../../static/font-icon/iconfont1.css"); */
@import url("../../plugins/font-icon/iconfont1.css");
page{background-color: #fff;}
.index1_content{
	padding-bottom: 80px;
	position: fixed;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
}
.locatins_logo{width: 48rpx;height: 48rpx;position: absolute;right: 30rpx;top: 30rpx;z-index: 999;}
.index1_content_top{width: 100%;display: flex;align-items: center;padding: 15px 15px 10px 15px;}
.index1_content_top_l{display: flex;
font-size: 13px;
font-weight: bold;
color: #131313;
}
.index1_content_top_l_r{margin-left: 5px;width: 8px;height: 8px;border-top: 2px #FFF solid;border-right: 2px #fff solid;transform: rotate(135deg);margin-top: 3px;}
.index1_content_top_r{width: 70%;
height: 29px;
background: #F4F4F4;
border-radius: 14px;
font-size: 14px;
margin-left: 15px;
display: flex;
align-items: center;
padding-left: 15px;
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
	margin: 15px 0px;
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

.index1_content_shop_block{display: flex;padding: 15px;border-bottom: 1px #eee solid;position: relative;}
.index1_content_shop_block_img{
width: 58px;
height: 58px;
background: #C4C4C4;
border-radius: 2px;
border: 1px solid rgb(239, 239, 239);
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
.index1_content_shop{
	padding-bottom: 50px;
}
</style>
