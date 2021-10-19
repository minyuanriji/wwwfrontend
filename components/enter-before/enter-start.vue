<template>
	<view class="Merchants_join_container">
		<view class="jojin_list">
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">店铺名称</text>
				</view>
				<view style="width: 64%;">
					<input type="text" v-model="params.store_name" placeholder="请输入您的店铺名称"
						style="line-height: 120rpx;display: block;height: 120rpx;border: none;text-align: right;" />
				</view>
			</view>
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">申请人姓名</text>
				</view>
				<view style="width: 64%;">
					<input type="text" v-model="params.realname" placeholder="请填写您的真实姓名"
						style="line-height: 120rpx;display: block;height: 120rpx;border: none;text-align: right;" />
				</view>
			</view>
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">选择商铺位置</text>
				</view>
				<view style="width: 55%;">
					<input type="text" value="" v-model="addresss" disabled
						style="line-height: 120rpx;display: block;height: 120rpx;border: none;text-align: right;" />
				</view>
				<view style="width: 10%;">
					<image :src="img_url+'dao_location.png'" mode="" @tap="chooseAddress"
						style="display: block;width: 60rpx;height: 60rpx;margin: 30rpx 0 0 5rpx;"></image>
				</view>
			</view>
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">申请人手机号</text>
				</view>
				<view style="width: 64%;">
					<input type="number" value="" v-model="params.mobile"
						style="line-height: 120rpx;display: block;height: 120rpx;border: none;text-align: right;" />
				</view>
			</view>
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">输入验证码</text>
				</view>
				<view style="width: 35%;">
					<input type="number" value="" v-model="params.captcha"
						style="line-height: 60rpx;display: block;height: 60rpx;border: none;text-align: center;background: #C0C4CC;margin-top: 30rpx;color: #000;" />
				</view>
				<view style="width: 35%;">
					<button type="default" v-if="!countDown" @tap="getCode" style="background:rgb(255, 113, 4) ;'"
						class="codeBtn">
						获取验证码
					</button>
					<button type="default" v-else style="background:rgb(255, 113, 4) ;'" class="codeBtn">
						{{countDown}}
					</button>
				</view>
			</view>
			<view class="jojin_item">
				<view style="width: 35%;">
					<text style="margin: 0 5rpx;color: red;">*</text>
					<text style="color: #000;">选择消费类型</text>
				</view>
				<view style="width: 50%;display: flex;">
					<picker :range="cats_arr1" :value="catsIndex" @change="changeCart" style="
		flex: 1;
		font-size: 15px;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 30rpx;
		text-align: center;
		background: rgb(223,223,223);
		color: #000;
	">
						{{params.store_mch_common_cat_id?cat_name:"请选择"}}
					</picker>
					<view class="block_bb1_r" :style="'border-top:'+'10px '+background+' solid'"></view>
				</view>
			</view>
		</view>
		<view class="content_footer">
			<button class="sumbit" :style="{background:background}" @tap="sumbit">下一步</button>
		</view>
	</view>
</template>
<style>
	.Merchants_join_container {
		width: 100%;
		overflow: hidden;
	}

	.jojin_list {
		width: 100%;
		overflow: hidden;
	}

	.jojin_item {
		width: 98%;
		overflow: hidden;
		margin: 10rpx auto 0;
		padding: 0 20rpx;
		line-height: 120rpx;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.codeBtn {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: rgb(83, 222, 219);
		border-radius: 3px;
		font-size: 25rpx;
		float: right;
		margin-left: 10rpx;
		color: #fff;
		margin-top: 30rpx;
	}

	.content_footer {
		width: 98%;
		margin: 5px auto;
		background: #FFFFFF;
		box-shadow: 0px 1px 1px 1px rgba(2, 58, 63, 0.16);
		border-radius: 3px;
		padding: 20px 5px 50px;
		color: #fff;
	}

	.sumbit {
		width: 90%;
		margin: 0px auto;
		height: 40px;
		border: 0px solid rgba(4, 0, 0, 0.39);
		box-shadow: 0px 1px 2px 0px rgba(4, 76, 102, 0.71);
		border-radius: 13px;
		line-height: 40px;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
<script>
	import {
		isMobile
	} from '@/utils/util.js';
	export default {
		props: {
			applyInfo: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				img_url: this.$api.img_url,
				background: 'rgb(255, 113, 4)',
				params: {
					store_name: '', //店铺名称
					store_mch_common_cat_id: "", //行业ID
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
			setTimeout(() => {
				console.log(this.applyInfo)
				this.params.store_name = this.applyInfo.store_name
				this.params.store_mch_common_cat_id = this.applyInfo.store_mch_common_cat_id
				this.params.store_longitude = this.applyInfo.store_longitude
				this.params.store_latitude = this.applyInfo.store_latitude
				this.params.realname = this.applyInfo.realname
				this.params.mobile = this.applyInfo.mobile
				this.addresss = this.applyInfo.store_address
			}, 1000)
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
					data: that.params,
					method: 'post',
					showLoading: true
				}).
				then(function(res) {
					if (res.code == 0) {
						that.$emit("returnStatus", 2)
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
					url: that.$api.moreShop.getcategorylist,
					data: {},
					method: 'post',
				}).
				then(function(res) {
					that.cats = res.data.list
					if (that.params.store_mch_common_cat_id.length > 0) {
						for (var i = 0; i < that.cats.length; i++) {
							if (that.params.store_mch_common_cat_id == that.cats[i].id) {
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
