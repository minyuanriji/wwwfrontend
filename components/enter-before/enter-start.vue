<template>
	<view>
		<view class="content_body">
			<image :src="this.$api.test_url+'/images/shop/ttzl.png'" class="content_start_title"></image>
			<view class="content_body_block">
				<view class="content_body_block_t">1、店铺名称</view>
				<view class="content_body_block_desc">
					输入您<text :style="{color: background}">线下店铺</text>
					的名称
				</view>
				<input class="content_body_block_input" v-model="params.name"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">2、店铺地址</view>
				<view class="content_body_block_desc" @tap="chooseAddress">
					打开<text :style="{color: background}">GPS,点击此处</text>
					获取您的店铺地理位置
				</view>
				<view class="content_body_block_b">
					<view class="iconfont icondingwei" :style="{color: background}"></view>
					<view class="content_body_block_b_input">{{params.address}}</view>
				</view>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">3、申请人姓名</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">真实姓名</text>
				</view>
				<input class="content_body_block_input" v-model="params.realname"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">4、申请人手机号</view>
				<view class="content_body_block_desc">
					手机号码共<text :style="{color: background}">11</text>位<text :style="{color: background}">数字</text>。其他为无效输入
				</view>
				<input class="content_body_block_input" v-model="params.mobile"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">5、申请人身份证</view>
				<view class="content_body_block_bb1">
					<view class="content_body_block_bb_l" @tap="uploadImg" data-id="0">
						<image :src="params.pic_id_card_front"></image>
						<view>身份证头面</view>
					</view>
					<view class="content_body_block_bb_l" @tap="uploadImg" data-id="1">
						<image :src="params.pic_id_card_back"></image>
						<view>身份证国徽面</view>
					</view>
				</view>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">6、营业执照</view>
				<view class="content_body_block_desc">
					需提供有效的营业执照，或其他监部门认可的具有与营业执照同等法律效力的证件。
				</view>
				<view class="content_body_block_bb1">
					<view class="content_body_block_bb_l2">
						<image :src="params.pic_business_license" @tap="uploadImg" data-id="2"></image>
						<view>营业执照（有经营类目的面）</view>
					</view>
				</view>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">7、店铺消费类型</view>
				<view class="content_body_block_desc">
					选择你的店铺的消费类型，以方便消费者快速搜索到你的店铺。
				</view>
				<view class="content_body_block_bb2">
					<picker :range="cats_arr1" :value="catsIndex" class="content_body_block_bb2_l" @change="changeCart">{{params['cat_id']?params['cat_name']:"请选择"}}</picker>
					<view class="block_bb1_r" :style="'border-top:'+'10px '+background+' solid'"></view>
				</view>
			</view>
		</view>
		<view class="content_footer">
			<view class="content_footer_top">
				<view class="iconfont iconxuanzhong" :style="{color:status==1?background:''}" @tap="agreeBtn"></view>
				<view class="content_footer_top_m">我已阅读并同意</view>
				<view class="content_footer_top_r" :style="{color: background}">《名媛日记商城开店说明》</view>
			</view>
			<button class="sumbit" :style="{background:background}" @tap="sumbit">我准备好了</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			background: {
				type: String,
				default: true
			}
		},
		data() {
			return {
				status: 0, //0 未同意,1 同意
				params: {
					pic_id_card_front: this.$api.test_url + "/images/shop/sfz_zm.png",
					pic_id_card_back: this.$api.test_url + "/images/shop/sfz_fm.png",
					pic_business_license: this.$api.test_url + "/images/shop/yyzz2.png"
				},
				cats: [], //分类列表
				cats_arr1: [], //分类列表
				catsIndex: 0,
				district: []
			}
		},
		methods: {
			alert(txt) {
				uni.showToast({
					title: txt,
					icon: 'none'
				})
			},
			sumbit: function() {
				var params = this.params
				if (!params['name']) return this.alert('请输入店铺名称')
				if (!params['address']) return this.alert('请选择店铺地址')
				if (!params['realname']) return this.alert('请填写您的真实姓名')
				if (!params['mobile']) return this.alert('请填写您的手机号')
				if (!params['mobile'].match(/1\d{10}/)) return this.alert('手机号错误')
				if (params['pic_id_card_front'].match(/sfz_zm.png/)) return this.alert('请上传身份证正面照片')
				if (params['pic_id_card_back'].match(/sfz_fm.png/)) return this.alert('请上传身份证反面照片')
				if (params['pic_business_license'].match(/yyzz2.png/)) return this.alert('请上传营业执照')
				if (!params['cat_id']) return this.alert('请选择店铺消费类型')
				if (this.status == 0) return this.alert('请同意名媛日记商城开店说明')
				var that = this
				this.$http.request({
					url: this.$api.moreShop.apply,
					data:'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="mobile"' +
					'\r\n' +
					'\r\n'+params['mobile']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="address"' +
					'\r\n' +
					'\r\n'+params['address']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="realname"' +
					'\r\n' +
					'\r\n'+params['realname']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="name"' +
					'\r\n' +
					'\r\n'+params['name']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="pic_id_card_front"' +
					'\r\n' +
					'\r\n'+params['pic_id_card_front']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="pic_id_card_back"' +
					'\r\n' +
					'\r\n'+params['pic_id_card_back']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="pic_business_license"' +
					'\r\n' +
					'\r\n'+params['pic_business_license']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="province_id"' +
					'\r\n' +
					'\r\n'+params['province_id']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="city_id"' +
					'\r\n' +
					'\r\n'+params['city_id']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="district_id"' +
					'\r\n' +
					'\r\n'+params['district_id']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="longitude"' +
					'\r\n' +
					'\r\n'+params['longitude']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="latitude"' +
					'\r\n' +
					'\r\n'+params['latitude']+
					'\r\n--XXX' +
					'\r\nContent-Disposition: form-data; name="cat_id"' +
					'\r\n' +
					'\r\n'+params['cat_id']
					,
					method: 'post',
					showLoading: true,
					isformData:true
				}).
				then(function(res) {
					if (res.code == 0) {
						that.alert(res.msg)
						setTimeout(function() {
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 2000)

					} else {
						that.alert(res.msg)
					}
				})
			},
			agreeBtn() {
				this.status = this.status == 1 ? 0 : 1
			},
			//下拉选择商户分类
			changeCart(e) {
				var index = e.detail.value
				var cats = this.cats
				var params = this.params
				params['cat_id'] = cats[index]['id']
				params['cat_name'] = cats[index]['name']
				this.params = params
				this.$forceUpdate()
			},
			//匹配地址ID
			decAddress(addressList) {
				var len = addressList.length
				var province = addressList[0] //省
				var city = len == 2 ? addressList[0] : addressList[1] //市
				var district = len == 2 ? addressList[1] : addressList[2] //区
				var district_arr = this.district //地址数据
				var params = this.params
				for (var i = 0; i < district_arr.length; i++) {
					if (district_arr[i]['name'] == province) {
						var city_arr = district_arr[i]['list']
						var province_id = district_arr[i]['id']
						for (var j = 0; j < city_arr.length; j++) {
							if (city_arr[j]['name'] == city) {
								var city_id = city_arr[j]['id']
								var district1_arr = city_arr[j]['list']
								for (var z = 0; z < district1_arr.length; z++) {
									if (district1_arr[z]['name'] == district) {
										var district_id = district1_arr[z]['id']
										params.province_id = province_id
										params.city_id = city_id
										params.district_id = district_id
										console.log(params)
										return false;
									}
								}
							}
						}


					}
				}



			},
			chooseAddress() { //打开腾讯地图
				var that = this
				var params = this.params
				uni.chooseLocation({
					success: function(res) {
						params.address = res.address
						//params.address = "北京市东城区长安街"
						var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						let addressList = params.address.match(reg).toString().split(",");
						that.decAddress(addressList)
						params.latitude = res.latitude
						params.status = 1
						params.longitude = res.longitude
						that.params = params
						that.$forceUpdate()
					}
				})
			},
			//获取地址
			getAddress() {
				var that = this
				this.$http.request({
					url: this.$api.district.tree,
					data: {},
					method: 'post',
				}).
				then(function(res) {
					console.log(res)
					that.district = res.data.district
				})
			},
			uploadImg(e) { //上传图片
				var id = e.currentTarget.dataset.id
				console.log(id)
				var that = this
				var params = this.params
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var file = res.tempFiles[0].path
						var requestData = {
							serverUrl: that.$api.default.upload,
							fileKeyName: "file",
							file: file
						}
						uni.showLoading({
							title: "正在上传"
						})
						that.$http.uploadFile(requestData).then(function(res) {
							uni.hideLoading()
							var url = res.data.url
							if (id == 0) {
								params.pic_id_card_front = url
							} else if (id == 1) {
								params.pic_id_card_back = url
							} else if (id == 2) {
								params.pic_business_license = url
							}
							that.params = params
							that.$forceUpdate()
						})
					}
				})

			},
			getCat: function() { //获取分类
				var that = this
				this.$http.request({
					url: this.$api.moreShop.getmchscats,
					data: {},
					method: 'post',
				}).
				then(function(res) {
					that.cats = res.data.list
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
			}
		},
		mounted() {
			this.getCat()
			this.getAddress()
		}
	}
</script>

<style>
	@import url("../../static/font-icon/iconfont1.css");

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
		color: #000000;
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

	.content_body_block_input {
		width: 70%;
		margin-top: 10px;
		height: 35px;
		line-height: 35px;
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
</style>