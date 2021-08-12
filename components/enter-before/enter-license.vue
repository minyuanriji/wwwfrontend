<template>
	<view>
		<view class="content_body">
			<!--
			 <image :src="this.$api.test_url+'/images/shop/ttzl.png'" class="content_start_title"></image>
			 -->
			<view class="content_body_block">
				<view class="content_body_block_t">1、营业执照名称</view>
				<view class="content_body_block_desc">
					请输入您<text :style="{color: background}">营业执照名称</text>
					的名称
				</view>
				<input class="content_body_block_input" v-model="params.license_name"></input>
			</view>
			<!-- <view class="content_body_block">
				<view class="content_body_block_t">2、营业执照编号</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">营业执照编号</text>
				</view>
				<input class="content_body_block_input" v-model="params.license_num"></input>
			</view> -->
			<view class="content_body_block">
				<view class="content_body_block_t">2、营业执照图片</view>
				<view class="content_body_block_desc">
					请上传<text :style="{color: background}">营业执照图片</text>
				</view>
				<view class="content_body_block_bb1">
					<view class="content_body_block_bb_l2">
						<image :src="params.license_pic?params.license_pic:img_url+'/yingye.jpg'" @tap="uploadImg" data-id="0"></image>
						<view>营业执照（有经营类目的面）</view>
					</view>
				</view>
			</view>		
			<view class="content_body_block">
				<view class="content_body_block_t">3、法人姓名</view>
				<view class="content_body_block_desc">
					请填写<text :style="{color: background}">法人姓名</text>
				</view>
				<input class="content_body_block_input" v-model="params.cor_realname"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">4、身份证号码</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">身份证号码</text>
				</view>
				<input class="content_body_block_input" v-model="params.cor_num"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">5、法人身份证照片</view>
				<view class="content_body_block_desc">
					请上传<text :style="{color: background}">法人身份证照片</text>
				</view>
				<view class="content_body_block_bb1">				
						<view class="content_body_block_bb_l2">
							<image :src="params.cor_pic1?params.cor_pic1:img_url+'/positive.png'" @tap="uploadImg" data-id="1"></image>
							<view>身份证照片（正面）</view>
						</view>
						<view class="content_body_block_bb_l2">
							<image :src="params.cor_pic2?params.cor_pic2:img_url+'/reverse.png'" @tap="uploadImg" data-id="2"></image>
							<view >身份证照片（反面）</view>
						</view>					
				</view>
			</view>		
			<view class="content_body_block">
				<view class="content_body_block_t">6、银行卡号码</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">银行卡号码（选填）</text>
				</view>
				<input class="content_body_block_input" v-model="params.settle_num"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">7、银行卡开户人</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">银行卡开户人（选填）</text>
				</view>
				<input class="content_body_block_input" v-model="params.settle_realname"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">8、银行名称</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">银行名称（选填）</text>
				</view>
				<input class="content_body_block_input" v-model="params.settle_bank"></input>
			</view>
			<view class="content_body_block">
				<view class="content_body_block_t">9、店铺折扣</view>
				<view class="content_body_block_desc">
					请填写你的<text :style="{color: background}">店铺折扣（选填）</text>
				</view>
				<input type="number" class="content_body_block_input" v-model="params.settle_discount" style="width: 200rpx;text-align: center;"></input>
			</view>
		</view>
		<view class="content_footer">
			<view class="content_footer_top">
				<view class="iconfont iconxuanzhong" :style="{color:status==1?background:''}" @tap="agreeBtn"></view>
				<view class="content_footer_top_m">我已阅读并同意</view>
				<view class="content_footer_top_r" :style="{color: background}" @click="popupShow">《补商汇商城开店说明》</view>
			</view>
			<view class="btncheck">
				<button class="sumbit" :style="{background:background}" @tap="backTo">上一步</button>
				<button class="sumbit" :style="{background:background}" @tap="sumbit">提交</button>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<scroll-view scroll-y="true"  class="scroll-Ys">
				<view class="html" v-html="agreement">
					<rich-text :nodes="agreement"></rich-text>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import {isEmpty} from '../../common/validate.js'
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
				status: 0, //0 未同意,1 同意
				agreement:'',
				params: {
					license_name:'',//企业名称
					// license_num:'',//营业执照编号
					license_pic:'',//营业执照图片
					cor_realname:'',//法人姓名
					cor_num:'',//法人身份证号码
					cor_pic1:'',//法人身份证正面
					cor_pic2:'',//法人身份证反面
//-----------------------------------------------下面是选填					
					settle_num:'',//银行卡号码
					settle_realname:'',//银行卡开户人
					settle_bank:'',//银行名称
					settle_discount:'',//店铺折扣
				},
				picture: { //图片上传回显
					license_pic: this.$api.test_url + "/images/shop/license_pic.png",
					cor_pic1: this.$api.test_url + "/images/shop/cor_pic1.png",
					cor_pic2: this.$api.test_url + "/images/shop/cor_pic2.png",
				},
			}
		},
		created() {
			let that=this
			that.$http.request({
				 url:that.$api.moreShop.getTExt,
				 data:{},
				 method:'post',
				 }).
				then(function(res){
					if(res.code==0){
						var str = res.data.agreement.replace(/[\n]/, "<br/>");
						str = str.replace("[\s]", "&nbsp;");
						that.agreement=str;
					}
			})
			setTimeout(()=>{
				this.params.license_name=this.applyInfo.license_name
				// this.params.license_num=this.applyInfo.license_num
				this.params.license_pic=this.applyInfo.license_pic
				this.params.cor_realname=this.applyInfo.cor_realname
				this.params.cor_num=this.applyInfo.cor_num
				this.params.cor_pic1=this.applyInfo.cor_pic1
				this.params.cor_pic2=this.applyInfo.cor_pic2
				this.params.settle_num=this.applyInfo.settle_num
				this.params.settle_realname=this.applyInfo.settle_realname
				this.params.settle_bank=this.applyInfo.settle_bank
				this.params.settle_discount=this.applyInfo.settle_discount
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
				if (isEmpty(this.params.license_name)) return this.alert('请填写企业名称')
				// if (isEmpty(this.params.license_num)) return this.alert('请填写营业执照编号')
				if (isEmpty(this.params.license_pic)) return this.alert('请上传营业执照图片')
				if (isEmpty(this.params.cor_realname)) return this.alert('请填写法人姓名')
				if (isEmpty(this.params.cor_num)) return this.alert('请填写身份证号码')
				if (isEmpty(this.params.cor_pic1)) return this.alert('请上传法人身份证正面')
				if (isEmpty(this.params.cor_pic2)) return this.alert('请上传法人身份证反面')
				if(this.status==0)return this.alert('请阅读协议后勾选')
				var that = this
				that.$http.request({
					url: that.$api.merchants.Filllicense,
					data:that.params,
					method: 'post',
					showLoading: true
				}).
				then(function(res) {
					if (res.code == 0) {
						that.$emit("returnStatus",3)
						//location.reload()
						
					} else {
						that.$http.toast(res.msg)
					}
				})
			},
			agreeBtn() {
				this.status = this.status == 1 ? 0 : 1
			},
			popupShow(){
				this.$refs.popup.open()
			},
			backTo(){
				this.$emit("returnStatus", 1)
			},
			uploadImg(e) { //上传图片
				var id = e.currentTarget.dataset.id
				var that = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var file = res.tempFiles[0].path
						var requestData = {
							serverUrl: that.$api.default.upload+'&width=6000&height=6000&type=1',
							fileKeyName: "file",
							file: file,
						}
						uni.showLoading({
							title: "正在上传"
						})
						that.$http.uploadFile(requestData).then(function(res) {						
							uni.hideLoading()
							if(res.code==0){
								var url = res.data.url
								if (id == 0) {
									that.picture.license_pic = url
									that.params.license_pic = url
								}else if(id == 1){
									that.picture.cor_pic1 = url
									that.params.cor_pic1 = url
								}else if(id == 2){
									that.picture.cor_pic2 = url
									that.params.cor_pic2 = url
								}  
								that.$forceUpdate()
							}else{
								uni.showToast({
									title: '图片太大，请重新上传',
									icon: 'none'
								});
								setTimeout(function() {
									uni.hideToast();
								}, 2000);
							}
						})
					}
				})
			
			},
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
		width: 40%;
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
		width: 80%;
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
		top: 130rpx;
	}
	.btncheck{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;}
</style>
