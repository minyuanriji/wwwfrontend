<template>
	<view>
		<view class="common-box">
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>
						负责人<span style="color: #FE5860;">*</span>
					</view>
					<input class="inp" type="text" v-model="form.realname" placeholder="请输入负责人姓名"
						placeholder-class="pla-style" />
				</view>
			</view>
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>
						手机号码<span style="color: #FE5860;">*</span>
					</view>
					<input class="inp" type="number" v-model="form.mobile" placeholder="请输入负责人手机号码"
						placeholder-class="pla-style" />
				</view>
			</view>
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>
						门店名称<span style="color: #FE5860;">*</span>
					</view>
					<input class="inp" type="text" v-model="form.name" placeholder="请输入您的门店名称"
						placeholder-class="pla-style" />
				</view>
			</view>
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>
						门店地区<span style="color: #FE5860;">*</span>
					</view>
					<view class="data-item-tips">
						<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker"
							:range="multiArray">
							<block v-if='address_text'>
								<view class="data-item-tips flex flex-y-center" style="color: #666666;">
									{{address_text}}
								</view>
							</block>
							<block v-else>
								<view class="data-item-tips flex flex-y-center">
									请选择门店地区
									<view class="iconfont icon-xiala2" style="margin-left: 10rpx;color: #C7C7CC;">
									</view>
								</view>
							</block>
						</picker>
			
					</view>
				</view>
			</view>
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>
						详细地址
					</view>
					<input class="inp" type="text" v-model="form.address" placeholder="例如：黄石街16号"
						placeholder-class="pla-style" />
				</view>
			</view>
			<view class="common-box-down">
				<view class="data-item flex flex-y-center flex-x-between">
					<view>折扣 </view>
					<input class="inp" min="0" type="number" v-model="form.zk" placeholder="请输入折扣" placeholder-class="pla-style" style="flex-grow: 1;"/>
					<text style="margin-left:30rpx;font-weight:bold;text-align: right;color:#333;">折</text>
				</view>
			</view>
			
		</view>

		<view class="protocol-box">
			<view class="flex flex-y-center">
				<view class="iconfont icon-quanquan agree-icon" v-if="!is_agree" @tap="selectAgree"></view>
				<view class="iconfont icon-dagou1 agree-icon" v-else :style="{color:textColor}" @tap="selectAgree">
				</view>
				<view style="margin-bottom: 1px;" @click="wyb">我已阅读并同意《{{sell_name?sell_name:'平台门店'}}协议》</view>
			</view>
			<view class="save-btn" @tap='save' :style="{background:textColor}">保存</view>
		</view>
		
		<!-- 协议弹窗 -->
		<com-modal :show="popup" :custom="true" @cancel="cancel" padding="0">
			<view class="pop-box">
				<view class="iconfont icon-guanbi pop-close" @tap="cancel"></view>
				<scroll-view scroll-y="true" class="scroll-box">
					<view>
						<rich-text :nodes="enter_agree"></rich-text>
					</view>
				</scroll-view>
			</view>
		</com-modal>
	</view>
	
</template>

<script>
	import {
		validation
	} from '@/common/validation.js';
	export default {
		data() {
			return {
				enter_agree: '', //注册协议
				popup: false,
				is_agree: false,
				
				form: {
					name: '',
					realname: '',
					mobile: '',
					province: "",
					city: "",
					district: "",
					province_id: "",
					city_id: "",
					district_id: "",
					zk: "",
					address: ""
				},
				textColor: '',
				sell_name: '', //商家名
				
				// 三级联动
				province: '',
				city: '',
				district: '',
				selectList: '',
				multiArray: [], //picker数据
				value: [0, 0, 0],
				address_text: "",
				
				rule: [{
					name: "realname",
					rule: ["required"], //可使用区间，此处主要测试功能
					msg: ["请输入负责人名称"]
				},
				{
					name: "mobile",
					rule: ["required", "isMobile"], //可使用区间，此处主要测试功能
					msg: ["请输入手机号", "请输入正确的手机号"]
				},
				{
					name: "name",
					rule: ["required"], //可使用区间，此处主要测试功能
					msg: ["请输入门店名称"]
				},
				{
					name: "city_id",
					rule: ["required"], //可使用区间，此处主要测试功能
					msg: ["请选择门店地区"]
				}],
			}
		},
		onLoad(options) {
			let mall_config = uni.getStorageSync("mall_config") ? JSON.parse(uni.getStorageSync("mall_config")) : '';
			this.textColor = this.globalSet('textCol');
			if (mall_config) this.sell_name = mall_config.copyright.description;
			
			
			this.getCity();
			
			let that = this;
			this.$http.request({
				 url: this.$api.moreShop.getTExt,
				 data:{},
				 method:'post',
			 }).then(function(res){
				if(res.code==0){
					that.enter_agree = res.data.agreement;
				}
			});
			
		},
		onShow() {
			this.getApply();
		},
		methods: {
			applyReset(){
				let that = this;
				this.$http.request({
					url: this.$api.merchants.applyreset,
					showLoading: true,
					method: 'post',
					data: {}
				}).then(res => {
					if (res.code == 0) {
						this.getApply();
					}else{
						this.$http.toast(res.msg);
					}
				});
			},
			getApply(){
				let that = this;
				this.$http.request({
					url: this.$api.merchants.getapplyInfo,
					showLoading: true,
					method: 'post',
					data: {}
				}).then(res => {
					if (res.code == 0) {
						if(res.data.status == "verifying"){
							uni.navigateTo({
								url: '/pages/enter/success'
							});
						}else if(res.data.status == "refused"){
							uni.showModal({
							    title: '审核失败',
							    content: res.data.remark,
								showCancel:false,
							    success: function (res) {
							        if (res.confirm) {
							            that.applyReset();
							        }
							    }
							});
						}else if(res.data.status == "passed"){
							uni.showModal({
							    title: '提示',
							    content: "审核已通过了",
								showCancel:false,
							    success: function (res) {
							        
							    }
							});
						}
						that.form = {
							name: res.data.store_name,
							realname:  res.data.realname,
							mobile: res.data.mobile,
							province: res.data.store_province,
							city: res.data.store_city,
							district: res.data.store_district,
							province_id: res.data.store_province_id,
							city_id: res.data.store_city_id,
							district_id: res.data.store_district_id,
							zk: res.data.settle_discount,
							address: res.data.store_address
						};
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			selectAgree() {
				this.is_agree = !this.is_agree;
			},
			save() {
				if (!this.is_agree) {
					this.$http.toast('请先同意协议!');
					return;
				}
				
				let copyRule = JSON.parse(JSON.stringify(this.rule));
				var bool = validation(this.form, copyRule);
				
				if (bool) {
					this.$http.toast(bool);
					return;
				}
				
				this.$http.request({
					url: this.$api.merchants.applyEasy,
					showLoading: true,
					method: 'post',
					data: this.form
				}).then(res => {
					if (res.code == 0) {
						this.$http.toast(res.msg);
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/enter/success'
							})
						}, 1500)
					} else {
						this.$http.toast(res.msg);
					}
				})
			
			},
			getAdress(){
				return this.form.province + this.form.city + this.form.district
			},
			wyb() {
				// this.$refs.popup.show() // 显示
				this.popup = true
			},
			cancel() {
				this.popup = false
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
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
			picker(e) {
				this.index = -1;
				let value = e.detail.value;
				if (this.selectList.length > 0) {
					
					this.province = this.selectList[value[0]].name; //获取省
					this.city = this.selectList[value[0]].children[value[1]].name; //获取市
					this.district = this.selectList[value[0]].children[value[1]].children[value[2]].name; //获取区
					
					this.form.province_id = this.selectList[value[0]].id; //获取省id
					this.form.city_id = this.selectList[value[0]].children[value[1]].id; //获取市id
					this.form.district_id = this.selectList[value[0]].children[value[1]].children[value[2]].id; //获取区id
					this.form.province = this.selectList[value[0]].name; //获取省
					this.form.city = this.selectList[value[0]].children[value[1]].name; //获取市
					this.form.district = this.selectList[value[0]].children[value[1]].children[value[2]].name; //获取区
					
					this.address_text = this.province + " " + this.city + " " + this.district;
				}
			},
			getCity() { //请求省市区数据
				this.$http.request({
					url: this.$api.user.addressInfo,
					method: 'post',
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
					this.multiArray = [provinceArr, cityArr, districtArr];
			
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
		}
	}
</script>

<style lang="scss">
	$scroll_height: 700rpx;

	/deep/ .jx-modal-box {
		height: $scroll_height;
	}

	.pop-box {
		height: $scroll_height;
		position: relative;

		.scroll-box {
			height: $scroll_height;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
		}

		.pop-close {
			position: absolute;
			top: 20rpx;
			right: 30rpx;
			z-index: 999;
		}
	}

	.common-box {
		background: #FFFFFF;
		padding: 0rpx 30rpx;
		margin: 20rpx 0;

		.common-box-down {
			border-bottom: 1px solid #F3F3F3;
			padding: 32rpx 0;
		}
	}

	// .data-item{
	// 	border-bottom: 1px solid #F3F3F3;
	// }

	.pla-style {
		text-align: right;
	}

	.inp {
		text-align: right;
	}

	.title {
		padding: 8rpx 30rpx;
		font-size: 30rpx;
		color: #808080;
	}

	.not-selecte-img {
		width: 300rpx;
		height: 200rpx;
		border-radius: 10rpx;
		// border: 1px solid #999999;
	}

	.license-icon {
		font-size: 80rpx;
		color: #999999;
	}

	.data-item-tips {
		color: #808080;
		font-size: 32rpx;
	}

	.protocol-box {
		background: #FFFFFF;
		padding: 30rpx 30rpx 50rpx;

		.agree-icon {
			color: #C9C9C9;
			font-size: 46rpx;
			line-height: 50rpx;
			margin-right: 20rpx;
		}

		.save-btn {
			font-size: 34rpx;
			color: #FFFFFF;
			margin-top: 50rpx;
			text-align: center;
			padding: 20rpx 0;
			border-radius: 50rpx;
			letter-spacing: 1px;
		}
	}
</style>
