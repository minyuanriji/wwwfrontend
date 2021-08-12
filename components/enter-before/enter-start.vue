<template>
	<view>
		<view class="content_body">
			<!--
			<image :src="this.$api.test_url+'/images/shop/ttzl.png'" class="content_start_title"></image>
			-->
			<view class="content_body_block">
				<view class="content_body_block_t">1、店铺名称</view>
				<view class="content_body_block_desc">
					输入您<text :style="{color: background}">线下店铺</text>
					的名称
				</view>
				<input class="content_body_block_input" v-model="params.store_name"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">2、申请人姓名</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">真实姓名</text>
				</view>
				<input class="content_body_block_input" v-model="params.realname"></input>
			</view>
			<view class="content_body_block" style="position: relative;">
				<view class="content_body_block_t">3、选择商铺位置</view>
				<view class="content_body_block_desc">
					请选择你的<text :style="{color: background}">店铺地址</text>
				</view>
				<input class="content_body_block_input" v-model="addresss"  disabled></input>
				<image :src="img_url+'dao_location.png'" mode="" class="location" @tap="chooseAddress"></image>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">4、申请人手机号</view>
				<view class="content_body_block_desc">
					手机号码共<text :style="{color: background}">11</text>位<text
						:style="{color: background}">数字</text>。其他为无效输入
				</view>
				<input class="content_body_block_input" v-model="params.mobile"></input>
				<view class="code">
					<input type="number" placeholder="输入验证码" v-model="params.captcha">
					<button type="default" v-if="!countDown" @tap="getCode" style="background:rgb(255, 113, 4) ;'">
						获取验证码
					</button>
					<button type="default" v-else style="background:rgb(255, 113, 4) ;'">
						{{countDown}}
					</button>
				</view>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">5、店铺消费类型</view>
				<view class="content_body_block_desc">
					选择你的店铺的消费类型，以方便消费者快速搜索到你的店铺。
				</view>
				<view class="content_body_block_bb2">
					<picker :range="cats_arr1" :value="catsIndex" class="content_body_block_bb2_l" @change="changeCart">
						{{params.store_mch_common_cat_id?cat_name:"请选择"}}</picker>
					<view class="block_bb1_r" :style="'border-top:'+'10px '+background+' solid'"></view>
				</view>
			</view>
		</view>
		<view class="content_footer">
			<button class="sumbit" :style="{background:background}" @tap="sumbit">下一步</button>
		</view>
	</view>
</template>

<script>
	import {
		isMobile
	} from '@/utils/util.js';
	export default {
		props:{
			applyInfo:{
				type:Object,
				required:true,
			}
		},
		data() {
			return {
				img_url: this.$api.img_url,
				background: 'rgb(255, 113, 4)',
				params: {
					store_name: '', //店铺名称
					store_mch_common_cat_id:"", //行业ID
					store_longitude: '', //经度
					store_latitude: '', //纬度
					captcha: '', //短信验证码
					realname: '', //申请人姓名
					mobile: '', //申请人手机号
				},
				cats: [], //分类列表
				cats_arr1: [], //分类列表
				catsIndex: 0,
				agreement: '',
				countDown: '',
				cat_name: '',
				addresss: '', //商铺地址
			}
		},
		created() {
			setTimeout(()=>{
				console.log(this.applyInfo)
				this.params.store_name=this.applyInfo.store_name
				this.params.store_mch_common_cat_id=this.applyInfo.store_mch_common_cat_id
				this.params.store_longitude=this.applyInfo.store_longitude
				this.params.store_latitude=this.applyInfo.store_latitude
				this.params.realname=this.applyInfo.realname
				this.params.mobile=this.applyInfo.mobile
				this.addresss=this.applyInfo.store_address
			},1000)
		},
		methods: {
			alert(txt) { //弹窗提示
				uni.showToast({
					title: txt,
					icon: 'none'
				})
			},
			sumbit: function() {
				if (!this.params.store_name) return this.alert('请输入店铺名称')
				if (!this.params.realname) return this.alert('请填写您的真实姓名')
				if (!this.addresss) return this.alert('请选择地址')
				if (!this.params.mobile) return this.alert('请填写您的手机号')
				if (!this.params.mobile.match(/1\d{10}/)) return this.alert('手机号错误')
				if (!this.params.captcha) return this.alert('请填写验证码')
				if (!this.params.store_mch_common_cat_id) return this.alert('请选择店铺消费类型')
				var that = this
				that.$http.request({
					url: that.$api.merchants.Fillbasic,
					data:that.params,
					method: 'post',
					showLoading: true
				}).
				then(function(res) {
					if (res.code == 0) {
						that.$emit("returnStatus",2)
					} else {
						that.$http.toast(res.msg)
					}
				})
			},
			changeCart(e) { //下拉选择商户分类
				var index = e.detail.value
				this.params.store_mch_common_cat_id = this.cats[index]['id']
				this.cat_name = this.cats[index]['name']
			},
			chooseAddress() { ////获取地址
				var that = this
				uni.chooseLocation({
					success: function(res) {
						that.addresss = res.name
						that.params.store_latitude = res.latitude
						that.params.store_longitude = res.longitude
					}
				})
			},
			getCat: function() { //获取店铺消费类型
				var that = this
				that.$http.request({
					url: that.$api.moreShop.getmchscats,
					data: {},
					method: 'post',
				}).
				then(function(res) {					
					that.cats = res.data.list
					if(that.params.store_mch_common_cat_id.length>0){
						for (var i = 0; i <that.cats.length; i++) {
							if(that.params.store_mch_common_cat_id==that.cats[i].id){
								that.cat_name=that.cats[i].name
							}
						}
					}
					var cats = res.data.list
					var cats_arr1 = []
					for (var i = 0; i < cats.length; i++) {
						cats_arr1.push(cats[i]['name'])
					}
					that.cats_arr1 = cats_arr1
					var data = {
						"detail": {
							"value": 0
						}
					}
					that.changeCart(data) //默认第一个
				})
			},
			getCode() { //获取验证码
				if (!isMobile(this.params['mobile'])) {
					this.$http.toast('请输入手机号后在获取验证码');
					return;
				}
				let _self = this;
				_self.countDown = 60;
				let temp = setInterval(() => {
					_self.countDown--
					if (_self.countDown <= 0) {
						clearInterval(temp);
					}
				}, 1000)

				_self.$http.request({
					url: _self.$api.default.phoneCode,
					data: {
						mobile: _self.params['mobile']
					},
					method: 'POST'
				}).then((res) => {
					this.$http.toast(res.msg);
				}).catch(err => {
					console.log(err);
				})
			},
		},
		mounted() {
			this.getCat()
		},
	}
</script>

<style>
	@import url("../../plugins/font-icon/iconfont1.css");

	.scroll-Ys {
		width: 80%;
		overflow: hidden;
		margin: 0 auto;
		background: #fff;
		border-radius: 20rpx;
	}

	.html {
		width: 100%;
		height: 500rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 60rpx;
		padding: 20rpx;
	}

	.content_body {
		width: 98%;
		margin: 5px auto;
		background: #FFFFFF;
		box-shadow: 0px 1px 1px 1px rgba(2, 58, 63, 0.16);
		border-radius: 3px;
		padding: 12px 5px 5px;
	}

	.content_start_title {
		width: 168px;
		height: 28px;

	}

	.content_footer {
		width: 98%;
		margin: 5px auto;
		background: #FFFFFF;
		box-shadow: 0px 1px 1px 1px rgba(2, 58, 63, 0.16);
		border-radius: 3px;
		padding: 20px 5px 50px;
	}

	.sumbit {
		width: 90%;
		margin: 0px auto;
		height: 32px;
		border: 0px solid rgba(4, 0, 0, 0.39);
		box-shadow: 0px 1px 2px 0px rgba(4, 76, 102, 0.71);
		border-radius: 13px;
		line-height: 32px;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
	}

	.content_body_block {
		width: 90%;
		margin: 0px auto;
		padding: 15px 0px;
		border-bottom: 1px dotted #CDCBCB;

	}

	.content_body_block_t {
		font-size: 15px;
		font-weight: bold;
		color: #000000;
		opacity: 0.9;

	}

	.content_body_block_desc {
		font-size: 10px;
		font-weight: 400;
		color: #6B6B6B;

	}

	.code {
		width: 100%;
		height: 60rpx;
		margin-top: 20rpx;
	}

	.code input {
		display: inline-block;
		width: 250rpx;
		height: 63rpx;
		border: 3px solid #eee;
		float: left;
		font-size: 25rpx;
		text-align: center;
		line-height: 63rpx;
	}

	.code button {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: rgb(83, 222, 219);
		border-radius: 3px;
		font-size: 25rpx;
		color: #333;
		float: left;
		margin-left: 10rpx;
		color: #fff;
	}

	.content_body_block_input {
		width: 70%;
		margin-top: 10px;
		height: 40px;
		line-height: 38px;
		border: 3px solid #eee;
		border-radius: 3px;
		font-size: 14px;
		color: #333
	}

	.content_body_block_b {
		width: 40%;
		height: 35px;
		margin-top: 10px;
		line-height: 35px;
		border: 3px solid #eee;
		border-radius: 3px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.content_body_block_b_input {}

	.content_body_block_bb1 {
		display: flex;
		margin-top: 10px;
	}

	.content_body_block_bb_l {
		flex: 1;
		text-align: center;
	}

	.content_body_block_bb_l image {
		width: 80%;
		height: 88px;
	}

	.content_body_block_bb_l view {
		font-size: 13px;
		font-weight: bold;
		color: #6B6B6B;
	}

	.content_body_block_bb_l2 {
		flex: 1;
	}

	.content_body_block_bb_l2 image {
		width: 50%;
		height: 113px;
	}

	.content_body_block_bb_l2 view {
		font-size: 13px;
		font-weight: bold;
		color: #6B6B6B;
		text-align: center;
		width: 50%;
	}

	.block_bb1_r {
		margin-top: 10px;
		border-right: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 10px solid transparent;
	}

	.content_body_block_bb2 {
		margin-top: 10px;
		width: 70%;
		height: 35px;
		border: 3px solid #eee;
		border-radius: 3px;
		display: flex;
	}

	.content_body_block_bb2_l {
		flex: 1;
		font-size: 15px;
		line-height: 29px;
	}

	.content_footer_top {
		font-size: 14px;
		display: flex;
		color: #6B6B6B;
		padding: 0px 0px 10px 15px;
	}

	.location {
		width: 60rpx;
		height: 60rpx;
		display: block;
		position: absolute;
		right: 100rpx;
		top: 115rpx;
	}
</style>
