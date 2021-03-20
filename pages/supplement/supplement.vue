<template>
	<view class="supplement_app">
		<view class="type">
			<image src="../../static/img/type-one.png" mode="widthFix" v-if="typeone"></image>
			<image src="../../static/img/type-two.png" mode="widthFix" v-if="typetwo"></image>
			<image src="../../static/img/type-three.png" mode="widthFix" v-if="typethree"></image>
		</view>
		<view class="type-one" v-if="typeone">
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>商户类型</text>
				</view>
				<input type="text" v-model="userType" placeholder="请选择" @click="popupShow=true" />
				<image src="../../static/img/sanjia.png" mode="" class="logo"></image>
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>营业执照号</text>
				</view>
				<input type="text" v-model="form.paper_businessLicenseCode" placeholder="请填写" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>商户经营名称</text>
				</view>
				<input type="text" v-model="form.paper_businessLicenseName" placeholder="请填写" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title">
					<text style="margin-top: 10rpx;">营业执照有效日期</text>
					<text>(截止)</text>
				</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input" style="height: 120rpx;line-height: 120rpx;">{{date}}</view>
				</picker>
				<!-- <input type="text" v-model="time" placeholder="请填写"/> -->
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">营业执照</view>
				<view class="content_body_block_desc">
					需提供有效的营业执照，或其他监部门认可的具有与营业执照同等法律效力的证件。
				</view>
				<view class="content_body_block_bb1">
					<view class="content_body_block_bb_l2">
						<image :src="params.pic_business_license" @tap="uploadImg" data-id="0"></image>
						<view>营业执照（有经营类目的面）</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>商户简称</text>
				</view>
				<input type="text" v-model="form.paper_shortName" placeholder="请填写" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>营业执照类型</text>
				</view>
				<input type="text" value="" placeholder="三证合一" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>法人姓名</text>
				</view>
				<input type="text" v-model="form.paper_lawyerName" placeholder="请填写" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>经营范围</text>
				</view>
				<input type="text" v-model="form.paper_businessScope" placeholder="请填写" />
			</view>
			<view class="item" v-if="flag">
				<view class="item_title" style="line-height: 120rpx;">
					<text>注册地址</text>
				</view>
				<input type="text" v-model="form.paper_registerAddress" placeholder="请填写" />
			</view>
			<view class="type-one-Up-down">
				<text>上一页</text>
				<text @click="saveone">下一页</text>
			</view>
		</view>
		<view class="type-two" v-if="typetwo">
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>证件类型</text>
				</view>
				<input type="text" placeholder="身份证" disabled/>			
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>证件号码</text>
				</view>
				<input type="text"  v-model="datatwo.paper_lawyerCertNo" placeholder="请填写"/>			
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>证件人姓名</text>
				</view>
				<input type="text" placeholder="请填写" v-model="datatwo.paper_certificateName"/>			
			</view>
			<view class="item">
				<view class="item_title">
					<text style="margin-top: 10rpx;">证件有效日期</text>
					<text>(截止)</text>
				</view>
				<picker mode="date" :value="dateTwo" :start="startDate" :end="endDate" @change="bindDateChangetwo">
					<view class="uni-input" style="height: 120rpx;line-height: 120rpx;">{{dateTwo}}</view>
				</picker>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">身份证照片</view>
				<view class="content_body_block_desc">
					需提供有效的身份证照片。
				</view>
				<view class="content_body_block_bb1">
					<view class="content_body_block_bb_l2">
						<image :src="params.pic_id_card_front" @tap="uploadImg" data-id="1"></image>
						<view>身份证照片（正面）</view>
					</view>
					<view class="content_body_block_bb_l2">
						<image :src="params.pic_id_card_back" @tap="uploadImg" data-id="2"></image>
						<view>身份证照片（反面）</view>
					</view>
				</view>
			</view>
			<view class="type-one-Up-down">
				<text>上一页</text>
				<text @click="savetwo">下一页</text>
			</view>
		</view>
		<view class="type-two" v-if="typethree">
			
		</view>
		<com-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="shop_type_item" v-for="(item,index) in shoptype" :key='index' @click="choose(item.num,item.name)">
				{{item.name}}
			</view>
		</com-bottom-popup>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				typeone:false,
				typetwo:false,
				typethree:true,	
								
				popupShow: false,//底部弹窗
				flag: true, //选择个人后控制显示影藏
				shoptype: [{
						name: '个体',
						num: 1
					},
					{
						name: '企业',
						num: 2
					},
					{
						name: '个人',
						num: 3
					},
				],
				params: {
					pic_id_card_front: this.$api.test_url + "/images/shop/sfz_zm.png",
					pic_id_card_back: this.$api.test_url + "/images/shop/sfz_fm.png",
					pic_business_license: this.$api.test_url + "/images/shop/yyzz2.png"
				},
				userType: '',//选择类型
				time: '',//时间
				form: {
					paper_merchantType: '',
					paper_shortName: '',
					paper_businessLicenseCode: '',
					paper_businessLicenseName: '',
					paper_businessLicensePhoto: '',
					paper_businessLicenseTo: currentDate,
					paper_lawyerName: '',
					paper_businessScope: '',
					paper_registerAddress: '',
				},
				date: currentDate,//营业执照有效期
				dateTwo:currentDate,//身份证有效期
				datatwo:{
					paper_lawyerCertNo:'',
					paper_lawyerCertPhotoFront:'',
					paper_lawyerCertPhotoBack:'',
					paper_certificateName:'',
					paper_certificateTo:currentDate,
				}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			hidePopup() {
				this.popupShow = false
			},
			choose(index, name) { //选择商户类型
				this.userType = name
				this.form.paper_merchantType = index
				this.popupShow = false
				if (index == 3) {
					this.flag = false
				} else {
					this.flag = true
				}
			},
			saveone() { // 保存第一步
				if (this.form.paper_merchantType.length <= 0) {
					uni.showToast({
						title: '请选择商户类型',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (this.form.paper_merchantType == 1 || this.form.paper_merchantType == 2) {
					if (this.form.paper_businessLicenseCode.length <= 0) {
						uni.showToast({
							title: '请填写营业执照号',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_businessLicenseName.length <= 0) {
						uni.showToast({
							title: '请填写商户经营名称',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_businessLicensePhoto.length <= 0) {
						uni.showToast({
							title: '请上传营业执照',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_shortName.length <= 0) {
						uni.showToast({
							title: '请填写商户简称',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_lawyerName.length <= 0) {
						uni.showToast({
							title: '请填写法人姓名',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_businessScope.length <= 0) {
						uni.showToast({
							title: '请填写经营范围',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if (this.form.paper_registerAddress.length <= 0) {
						uni.showToast({
							title: '请填写注册地址',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
				}
				if (this.form.paper_merchantType == 3) {
					if (this.form.paper_shortName.length <= 0) {
						uni.showToast({
							title: '请填写商户简称',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
				}
				this.$http
					.request({
						url: this.$api.moreShop.merchanttype,
						method: 'POST',
						data: this.form,
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.typeone=false
							this.typetwo=true
						}else{
							that.$http.toast(res.msg);
						}
					});
			},
			getDate(type) { //获取时间
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) { //选择时间
				this.date = e.target.value
				this.form.paper_businessLicenseTo = e.target.value
			},
			bindDateChangetwo:function(e){ //选择证件有效期
				this.dateTwo = e.target.value
				this.datatwo.paper_certificateTo = e.target.value
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
								params.pic_business_license = url
								that.form.paper_businessLicensePhoto = url
							}else if(id==1){
								params.pic_id_card_front = url
								that.datatwo.paper_lawyerCertPhotoFront = url
							}else if(id==2){
								params.pic_id_card_back = url
								that.datatwo.paper_lawyerCertPhotoBack = url
							}
							that.params = params
							that.$forceUpdate()
						})
					}
				})

			},
			savetwo(){ //保存第二部
				if(this.datatwo.paper_lawyerCertNo.length!=18){
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(this.datatwo.paper_certificateName.length<=0){
					uni.showToast({
						title: '请输入证件人姓名',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(this.datatwo.paper_lawyerCertPhotoFront.length<=0){
					uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(this.datatwo.paper_lawyerCertPhotoBack.length<=0){
					uni.showToast({
						title: '请上传身份证背面照',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				this.$http
					.request({
						url: this.$api.moreShop.merchantidcard,
						method: 'POST',
						data: this.datatwo,
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.typeone=false
							this.typetwo=false
							this.typethree=true
						}else{
							this.$http.toast(res.msg);
						}
					});
			},
			
		}
	}
</script>

<style lang="less">
	.supplement_app {
		width: 100%;
		overflow: hidden;
	}

	.type {
		width: 90%;
		height: 100rpx;
		margin: 10rpx auto 0;
	}

	.type image {
		width: 100%;
		margin-top: 10rpx;
	}

	.type-one {
		width: 100%;
		overflow: hidden;
	}
	.type-two{
		width: 100%;
		overflow: hidden;
	}
	.item {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		border-bottom: 1rpx solid #80848F;
		width: 90%;
		margin: 0 auto;
	}

	.item_title {
		display: flex;
		width: 250rpx;
		height: 120rpx;
		flex-wrap: wrap;
		margin-right: 20rpx;
	}

	.item_title text {
		display: block;
		color: #000;
		font-weight: bold;
		font-size: 30rpx;
		width: 100%;
	}

	.item input {
		height: 100%;
		font-size: 28rpx;
		height: 120rpx;
	}

	.logo {
		position: absolute;
		right: 0;
		top: 50rpx;
		width: 20rpx;
		height: 20rpx;
	}

	.shop_type_item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-bottom: 1rpx solid #B3B3B3;
	}

	.type-one-Up-down {
		width: 100%;
		overflow: hidden;
		margin: 50rpx 0 100rpx 0;
		text-align: center;
	}

	.type-one-Up-down text {
		display: inline-block;
		width: 120rpx;
		margin: 0 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #000;
		border-radius: 10rpx;
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
</style>
