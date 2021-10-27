<template>
	<view class="shopSetting-app">
		<view class="shopSetting-item">
			<view class="shopSetting-title">
				店铺名称：
			</view>
			<view class="shopSetting-int">
				<input type="text" value="" placeholder="请填写店铺名称" v-model="form.name"/>
			</view>
		</view>
		<view class="shopSetting-item">
			<view class="shopSetting-title" style="height: 150rpx;line-height: 150rpx;">
				店铺LOGO：
			</view>
			<image :src="form.cover_url" mode="" class="logo"></image>
			<view class="upload-logo" @tap="uploadImg">
				
			</view>
		</view>
		<view class="shopSetting-item" @click="goTo">
			<view class="shopSetting-title">
				店铺图片：
			</view>
			<view class="shopSetting-num">
				<text>{{num}}张</text>
				<image :src="img_url+'/arrow-right.png'" mode=""></image>
			</view>
		</view>
		<view class="shopSetting-item">
			<view class="shopSetting-title">
				店铺类别：
			</view>
			<view class="shopSetting-num">
				<view style="width: 100%;display: flex;">
								<picker :range="cats_arr1" :value="catsIndex" @change="changeCart" style="
					flex: 1;
					font-size: 15px;
					height: 101rpx;
					line-height: 101rpx;
					text-align: center;
				">
									{{form.store_mch_common_cat_id?cat_name:"请选择"}}
								</picker>
							</view>
				<image :src="img_url+'/sanjia.png'" mode="" class="select_logo" style="width: 30rpx;height: 24rpx;margin: 40rpx 15rpx 0 0;"></image>
			</view>
		</view>
		<view class="shopSetting-item">
			<view class="shopSetting-title">
				店铺地址：
			</view>
			<view class="shopSetting-int">
				<picker  mode="multiSelector" @change="picker"  :value="value" @columnchange="columnPicker" :range="multiArray"
				style="float: left;">	
					<view style="width: 450rpx;height: 100rpx;">
						<view class="index1_content_top_l_name" style="height: 100rpx;line-height: 100rpx;">{{text.length<=0?'请选择':text}}</view>
					</view>
				</picker>
				<image :src="img_url+'/sanjia.png'" mode="" class="select_logo"></image>
			</view>
		</view>
		<view class="shopSetting-item">
			<view class="shopSetting-title">
				店铺位置：
			</view>
			<view class="shopSetting-int">
				<text>
					经度:{{form.longitude}}
				</text>
				<text>
					纬度:{{form.latitude}}
				</text>
				<image :src="img_url+'/position_LOGO.png'" mode="" class="position_logo" @tap="chooseAddress"></image>
			</view>
		</view>
		<view class="shopSetting-item">
			<view class="shopSetting-title">
				详细地址：
			</view>
			<view class="shopSetting-int">
				<input type="text" value="" placeholder="请填写详细地址" v-model="form.address"/>
			</view>
		</view>
		<view class="sure_btn" @click="sureBtn">
			确定
		</view>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :maxWidth="300" :minHeight="300">
		
		</kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import {isEmpty}  from '../../../common/validate.js'
	export default {
		components: {
			kpsImageCutter
		},
		data() {
			return {
				img_url: this.$api.img_url,
				params:{
					shop_logo:this.$api.test_url + "/images/shop/shop_logo.png",
				},
				num:0,
				value:[0,0,0],
				multiArray: [], //picker数据
				selectList:[],
				provice: "",
				city: "",
				district: "",
				proviceId: "",
				cityId: "",
				districtId: "",
				form:{
					name:'',
					cover_url:'',
					province_id:'',
					city_id:'',	
					district_id:'',
					longitude:'',
					latitude:'',
					address:'',
					store_mch_common_cat_id:''
				},
				text:'',
				userMessage:'',
				url: "",
				cats_arr1: [], //分类列表
				catsIndex: 0,
				cat_name:'',
				cats: [], //分类列表
			};
		},
		onLoad() {
			this.getCity()
			this.getBaseInfo()
			let that=this
			setTimeout(() => {
				this.getCat()
			}, 500)
		},
		methods: {
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			uploadImg(){
				var that = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						that.url =res.tempFiles[0].path	
					}
				})
			},
			picker(e){
				let value = e.detail.value;
				if (this.selectList.length > 0) {
					this.provice = this.selectList[value[0]].name; //获取省
					this.district = this.selectList[value[0]].children[value[1]].children[value[2]].name; //获取区
					this.city = this.selectList[value[0]].children[value[1]].name; //获取区
					this.proviceId = this.selectList[value[0]].id; //获取省id
					this.cityId = this.selectList[value[0]].children[value[1]].id; //获取市id
					this.districtId = this.selectList[value[0]].children[value[1]].children[value[2]].id; //获取区id
					this.text = this.provice + " " + this.city+" "+this.district;
					this.form.province_id=this.proviceId
					this.form.city_id=this.cityId
					this.form.district_id=this.districtId
				}
				console.log(this.text)
				console.log(this.proviceId,this.cityId)
			},
			columnPicker(e){
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(this.selectList[this.value[0]].children[value].children)
					];
					this.value = [this.value[0], value, 0]
				}
			},
			getCity() { //请求省市区数据
				this.$http.request({
					url: this.$api.moreShop.getCity,
					method: 'post',
					showLoading:true,
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
					this.multiArray = [provinceArr, cityArr,districtArr];
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
						this.toArr(this.selectList[0].children[0].children)
					];	
				})
			},
			chooseAddress() { //打开腾讯地图
				var that = this
				uni.chooseLocation({
					success: function(res) {
						that.form.longitude=String(res.longitude)
						that.form.latitude=String(res.latitude)
					}
				})
			},
			sureBtn(){
				if(isEmpty(this.form.name)){
					uni.showToast({
						title: '请填写店铺名称',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(isEmpty(this.form.cover_url)){
					uni.showToast({
						title: '请上传店铺LOGO',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(isEmpty(this.form.store_mch_common_cat_id)){
					uni.showToast({
							title: '请选择店铺类别',
							icon: 'none'
					});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
				}	
				if(isEmpty(this.form.province_id)||isEmpty(this.form.city_id)||isEmpty(this.form.district_id)){
					uni.showToast({
						title: '请选择店铺地址',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}	
				if(isEmpty(this.form.longitude)||isEmpty(this.form.latitude)){
					uni.showToast({
						title: '请定位获取经纬度',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(isEmpty(this.form.address)){
					uni.showToast({
						title: '请填写详细地址',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				let that=this
				that.$http.request({
					 url:that.$api.moreShop.setShopmessage,
					 data:that.form,
					 method:'post',
					 showLoading: true
					 }).
					then(function(res){
						if(res.code==0){
							let forms={}
							forms.name=that.form.name
							forms.cover_url=that.form.cover_url
							forms.city_id=that.form.city_id
							forms.province_id=that.form.province_id
							forms.district_id=that.form.district_id
							forms.latitude=that.form.latitude
							forms.longitude=that.form.longitude
							forms.address=that.form.address
							forms.text=that.text
							uni.setStorageSync('shop-MESSAGE',forms)
							uni.navigateTo({
								url:'../personalCentre'
							})
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
				})
			},
			goTo(){
				uni.navigateTo({
					url:'../shopLogoupload/shopLogoupload'
				})
			},
			getBaseInfo(){
				this.$http.request({
					url: this.$api.moreShop.getMchBaseInfo,
					method: 'POST',
					showLoading: true
				}).then(res => {
					this.userMessage=res.data.base_info.store
					this.form.store_mch_common_cat_id=res.data.base_info.category.id
					this.form.name=this.userMessage.name
					this.form.cover_url=this.userMessage.cover_url
					this.params.shop_logo=this.userMessage.cover_url
					this.form.city_id=this.userMessage.city_id
					this.form.province_id=this.userMessage.province_id
					this.form.district_id=this.userMessage.district_id
					this.form.latitude=this.userMessage.latitude
					this.form.longitude=this.userMessage.longitude
					this.form.address=this.userMessage.address;
					let cityList=this.selectList
					
					this.text=this.userMessage.province + ' ' + this.userMessage.city + ' ' + this.userMessage.district;
					let imgList=JSON.parse(this.userMessage.pic_url)
					let logoList=[]
					imgList.forEach((item)=>{
						if(typeof(item)!='object'){
							logoList.push(item)
						}
					})
					uni.setStorageSync('imglist',logoList)
					this.num=logoList.length
				});
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
			},
			onok(ev) {
				let that=this
				that.form.cover_url= ev.path;
				that.url = "";
				var requestData = {
					serverUrl: that.$api.default.upload,
					fileKeyName: "file",
					file:that.form.cover_url 
				}
				uni.showLoading({
					title: "正在上传"
				})
				that.$http.uploadFile(requestData).then(function(res) {
					uni.hideLoading()
					if(res.code==0){
						that.form.cover_url=res.data.thumb_url
					}else{
						that.$http.toast(res.msg);
					}
				})
			},
			changeCart(e) { //下拉选择商户分类
				var index = e.detail.value
				this.form.store_mch_common_cat_id = this.cats[index]['id']
				this.cat_name = this.cats[index]['name']
			},
			getCat: function() { //获取店铺消费类型
				var that = this
				that.$http.request({
					url: that.$api.moreShop.getcategorylist,
					data: {},
					method: 'post',
				}).
				then(function(res) {
					that.cats = res.data.list
					if (that.form.store_mch_common_cat_id.length > 0) {
						for (var i = 0; i < that.cats.length; i++) {
							if (that.form.store_mch_common_cat_id == that.cats[i].id) {
								that.cat_name = that.cats[i].name
							}
						}
					}
					var cats = res.data.list
					var cats_arr1 = []
					for (var i = 0; i < cats.length; i++) {
						cats_arr1.push(cats[i]['name'])
					}
					that.cats_arr1 = cats_arr1
					// var data = {
					// 	"detail": {
					// 		"value": 0
					// 	}
					// }
					// that.changeCart(data) //默认第一个
				})
			},
		}	
	}
</script>

<style lang="less" scoped>
	.shopSetting-app {
		width: 100%;
		height: 100%;
		// background: url(https://dev.mingyuanriji.cn/web/static/shop_setLogo.jpg)no-repeat;
		// background-size: cover;
		padding-top: 100rpx;
	}

	.shopSetting-item {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1rpx solid #888888;
		overflow: hidden;
	}

	.shopSetting-title {
		height: 100rpx;
		line-height: 100rpx;
		margin-right: 20rpx;
		color: #000;
		float: left;
	}

	.shopSetting-int {
		height: 100rpx;
		float: left;
	}
	.shopSetting-int text{display: block;height: 100rpx;float: left;line-height: 100rpx;width: 225rpx;
	overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	
	}
	.shopSetting-int input {
		height: 100rpx;
		float: left;
		width: 450rpx;
	}

	.logo{width: 130rpx;height: 130rpx;float: left;display: block;margin-top: 10rpx;}
	.upload-logo{width: 130rpx;height: 130rpx;margin-top: 10rpx;background: url(../../../plugins/images/select_pic.png)no-repeat;background-size:cover ;float: right;}
	.select_logo{float: right;width: 30rpx;height: 25rpx;display: block;margin-top: 40rpx;}
	.shopSetting-num{float: right;height: 100rpx;display: flex;justify-content: space-evenly;line-height: 100rpx;}
	.shopSetting-num image{width: 40rpx;height: 40rpx;margin-top: 30rpx;}
	.position_logo{display: block;width: 40rpx;height: 40rpx;margin: 30rpx 0 0 450rpx;}
	.sure_btn{width: 85%;height: 80rpx;margin: 90rpx auto 0;background: #FF7104;border-radius: 20rpx;
	text-align: center;line-height: 80rpx;color: #fff;}
</style>
