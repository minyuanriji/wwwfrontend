<template>
	<view class="examine-detail-app">
		<view class="examine-detail-header">
			<view v-for="(item,index) in type" :key='index' :class="selecIndex==index?'active':''" @click="select(index)">
				{{item}}
			</view>
		</view>
		<view class="basic-message" v-if="selecIndex==0">
			<view>
				<text>小程序用户</text>
				<input type="text" value="" v-model="form.detail.nickname" disabled/>
			</view>
			<view>
				<text>联系人</text>
				<input type="text" value="" v-model="form.detail.realname" disabled/>
			</view>
			<view>
				<text>联系电话</text>
				<input type="text" value="" v-model="form.detail.mobile"  disabled/>
			</view>
			<view>
				<text>微信号</text>
				<input type="text" value="" v-model="form.detail.wechat" disabled/>
			</view>
			<view>
				<text>所受类目</text>
				<input type="text" value="" v-model="form.detail.mch_common_cat_name" disabled/>
			</view>
			<view>
				<text>是否开业</text>
				<input type="text" value="" v-model="form.detail.status" disabled/>
			</view>
			<view>
				<text>好店推荐</text>
				<input type="text" value="" v-model="form.detail.is_recommend" disabled/>
			</view>
			<view>
				<text>排序</text>
				<input type="text" value="" v-model="form.detail.sort" disabled/>
			</view>
			<view>
				<text>商户账号</text>
				<input type="text" value="" v-model="form.detail.username" disabled/>
			</view>
			<view>
				<text>商户密码</text>
				<input type="text" value="" v-model="form.detail.password" disabled/>
			</view>
		</view>
		<view class="shop-message" v-if="selecIndex==1">
			<view>
				<text>店铺名称</text>
				<input type="text" value="" v-model="form.detail.name" disabled/>
			</view>
			<view>
				<text>店铺logo</text>
				<image :src="form.detail.logo" mode=""></image>
			</view>
			<view>
				<text>店铺背景图</text>
				<image :src="item.pic_url" mode="" v-for="(item,index) in form.detail.bg_pic_url" :key='index'></image>
			</view>
			<view>
				<text>省市区</text>
				<input type="text" value="" v-model="form.detail.districts" disabled/>
			</view>
			<view>
				<text>店铺地址</text>
				<input type="text" value="" v-model="form.detail.address" disabled/>
			</view>
			<view>
				<text>客服电话</text>
				<input type="text" value="" v-model="form.detail.service_mobile" disabled/>
			</view>
		</view>
		<view class="audit-information" v-if="selecIndex==2">
			<view class="settlement-account">
				<view style="text-align: center;height: 50rpx;line-height: 50rpx;font-size: 28rpx;color: #000;margin: 0 0 20rpx 0;">
					结算账号
				</view>
				<view>
					<text>结算账户类型</text>
					<input type="text" value="" v-model="form.review.paper_settleTarget" disabled/>
				</view>
				<view>
					<text>结算账户号</text>
					<input type="text" value="" v-model="form.review.paper_settleAccountNo" disabled/>
				</view>
				<view>
					<text>结算账户名</text>
					<input type="text" value="" v-model="form.review.paper_settleAccount" disabled/>
				</view>
				<view>
					<text>结算类型</text>
					<input type="text" value="" v-model="form.review.paper_settleAccountType" disabled/>
				</view>
				<view>
					<text>开户银行</text>
					<input type="text" value="" v-model="form.review.paper_openBank" disabled/>
				</view>
			</view>
			<view class="legal-person">
				<view style="text-align: center;height: 50rpx;line-height: 50rpx;font-size: 28rpx;color: #000;margin: 0 0 20rpx 0;">
					法人信息
				</view>
				<view>
					<text>证件类型</text>
					<input type="text" value="" v-model="form.review.paper_lawyerCertType" disabled/>
				</view>
				<view>
					<text>证件号码</text>
					<input type="text" value="" v-model="form.review.paper_lawyerCertNo" disabled/>
				</view>
				<view>
					<text>证件姓名</text>
					<input type="text" value="" v-model="form.review.paper_certificateName" disabled/>
				</view>
			</view>
			<view class="discount-apply">
				<view class="discount-apply-select">
					<text class="discount-apply-select-title">是否特殊折扣申请</text>
					<view>
						 <radio-group @change="radioChange">
						    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						        <view>
						            <radio :value="item.value" :checked="index === current" />
						        </view>
						        <view>{{item.name}}</view>
						    </label>
						</radio-group>
					</view>
				</view>
				<view class="discount-status" v-if="current==0">
					<view style="text-align: center;height: 50rpx;line-height: 50rpx;font-size: 28rpx;color: #000;margin: 0 0 20rpx 0;">
						审核状态
					</view>
					<view class="status">
						<text class="status-lable">审核状态</text>
						<view class="status-radio">
							 <radio-group @change="radioChangeTwo">
							    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in itemTwo" :key="item.value">
							        <view>
							            <radio :value="item.value" :checked="index === currentTwo" />
							        </view>
							        <view>{{item.name}}</view>
							    </label>
							</radio-group>
						</view>
					</view>
					<view class="special-discount-detail" style="margin-bottom: 20rpx;" v-if="seviceCount">
						<view>
							<text>服务费</text>
							<input type="number" value="" placeholder="请输入折扣" v-model="form.detail.transfer_rate" style="margin-left: 45rpx;"/>
							<text>折</text>
						</view>
					</view>
					<view class="discount-results">
						<text>审核结果</text>
						<textarea value="" placeholder="请输入审核结果" v-model="form.detail.review_remark"/>
					</view>
				</view>
				<view class="special-discount" v-if="current==1">
					<view style="text-align: center;height: 50rpx;line-height: 50rpx;font-size: 28rpx;color: #000;margin: 0 0 20rpx 0;">
						特殊折扣申请
					</view>
					<view class="special-discount-detail">
						<view>
							<text>特殊折扣申请</text>
							<input type="number" value="" placeholder="请输入折扣" v-model="form.detail.special_rate"/>
							<text>折</text>
						</view>
					</view>
					<view class="special-discount-notice">
						<text>说明</text>
						<textarea value="" placeholder="请输入说明" v-model="form.detail.special_rate_remark"/>
					</view>
				</view>		
			</view>
			<view class="save" @click="saveMessage" v-if="saveShow">
				保存
			</view>
		</view>
	
	</view>
</template>

<script>
	import {isEmpty} from '../../../common/validate.js'
	export default{
		data(){
			return{
				id:'',
				type:["基本信息",'店铺信息','审核信息'],
				selecIndex:0,
				form:{
					detail:{
						nickname:'',//小程序用户
						wechat:'',//微信号
						mch_common_cat_name:'',//所受类目
						username:'',//商户账号
						password:'',//商户密码
						is_recommend:'',//好店推荐
						status:'',//是否开业
						sort:'',//排序
						mobile:'',//联系电话,
						realname:'',//联系人
						name:'',//店铺名称
						logo:'',//店铺logo
						bg_pic_url:[],//店铺背景图
						districts:'',//省市区
						address:'',//店铺地址
						service_mobile:'',//客服电话
						is_special:'',//是否特殊折扣申请 默认：0 0否 1是
						transfer_rate:'',//0-8 服务费
						review_status:'',//审核状态 1.审核通过.2=审核不通过
						review_remark:'',//审核结果和备注
						special_rate:'',//特殊折扣数
						special_rate_remark:'',//特殊折扣申请说明
					},
					review:{
						paper_settleTarget:'',//结算账户类型 1：个体工商户 2：企业 3：个人(小微)
						paper_settleAccountNo:'',//结算账户号
						paper_settleAccount:'',//结算账户号
						paper_settleAccountType:'',//1：对公账户 2：法人账户 3：授权对公 4：授权对私
						paper_openBank:'',//开户银行
						paper_lawyerCertType:'',//证件类型证件类型。0：身份证；1：居住证；2：签证；3：护照；4：户口本；5：军人证；6：团员证；7：党员证；8：港澳通行证；9:台胞证；11：临时身份证；12：回乡证；13：营业执照：14：组织机构代码证；15：驾驶证；99：其他\r\n目前仅支持 0：身份证’
						paper_lawyerCertNo:'',//证件号码
						paper_certificateName:'',//证件姓名
					}
				},
				items:[
					{
					   value: '否',
					   name: '否'
					},
					{
						value: '是',
						name: '是'
					}
				],
				current: 0,
				itemTwo:[
					{
					   value: '审核通过',
					   name: '审核通过'
					},
					{
						value: '审核不通过',
						name: '审核不通过'
					}
				],
				currentTwo:0,
				message:{},
				saveShow:false,//保存按钮显示
				seviceCount:true,//服务费
			}
		},
		onLoad(options) {
			if(options&&options.id){
				this.id=options.id
				this.getexamineDetail(options.id)
			}
			if(options&&options.review_status){
				if(options.review_status==0){
					this.saveShow=true
				}
			}
		},
		methods:{
			select(index){ //选项
				this.selecIndex=index
			},
			getexamineDetail(id){ //获取审核信息
				this.$http
					.request({
						url: this.$api.moreShop.getexamineDetail,
						method: 'GET',
						data:{
							id:id
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.form=res.data
							if(res.data.detail.status==0){
								this.form.detail.status='否'
							}else{
								this.form.detail.status='是'
							}
							if(res.data.detail.is_recommend==0){
								this.form.detail.is_recommend='否'
							}else{
								this.form.detail.is_recommend='是'
							}
							if(res.data.review.paper_settleTarget==1){
								this.form.review.paper_settleTarget='个体工商户'
							}else if(res.data.review.paper_settleTarget==2){
								this.form.review.paper_settleTarget='企业'
							}else if(res.data.review.paper_settleTarget==3){
								this.form.review.paper_settleTarget='个人(小微)'
							}
							if(res.data.review.paper_settleAccountType==1){
								this.form.review.paper_settleAccountType='对公账户'
							}else if(res.data.review.paper_settleAccountType==2){
								this.form.review.paper_settleAccountType='法人账户'
							}else if(res.data.review.paper_settleAccountType==3){
								this.form.review.paper_settleAccountType='授权对公'
							}else if(res.data.review.paper_settleAccountType==4){
								this.form.review.paper_settleAccountType='授权对私'
							}else{
								this.form.review.paper_settleAccountType=''
							}
							if(res.data.review.paper_lawyerCertType==0){
								this.form.review.paper_lawyerCertType='身份证'
							}
							if(res.data.detail.is_special==0){
								this.current=0
							}else if(res.data.detail.is_special==1){
								this.current=1
							}
							if(res.data.detail.review_status==1){
								this.currentTwo=0
								this.seviceCount=true
							}else if(res.data.detail.review_status==2){
								this.currentTwo=1
								this.seviceCount=false
							}
						}
				});
			},
			radioChange(evt) { //是否折扣申请
		            for (let i = 0; i < this.items.length; i++) {
		                if (this.items[i].value === evt.detail.value) {
		                    this.current = i;
							console.log(this.current)
		                    break;
		                }
		            }
		        },
			radioChangeTwo(evt){ //审核状态选择
				for (let i = 0; i < this.itemTwo.length; i++) {
				    if (this.itemTwo[i].value === evt.detail.value) {
				        this.currentTwo = i;
						console.log(this.currentTwo)
						if(this.currentTwo==1){
							this.seviceCount=false
						}else{
							this.seviceCount=true
						}
				        break;
				    }
				}
			},		
			saveMessage(){ //保存审核信息
				if(this.current==0){
					if(this.currentTwo==0){
						if(this.form.detail.transfer_rate<0){
							uni.showToast({
								title: '服务费需在0-8.5之间',
								icon: 'none'
							});
							setTimeout(function() {
								uni.hideToast();
							}, 2000);
							return
						}
						if(this.form.detail.transfer_rate>8.5){
							uni.showToast({
								title: '服务费需在0-8.5之间',
								icon: 'none'
							});
							setTimeout(function() {
								uni.hideToast();
							}, 2000);
							return
						}
					}
					if(isEmpty(this.form.detail.review_remark)){
						uni.showToast({
							title: '请填写审核结果',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					this.message={
						id:this.id,
						is_special:this.current,//是否特殊折扣申请 0、否 1、是 
						transfer_rate:this.form.detail.transfer_rate,//0-8
						review_status:this.currentTwo==0?1:2,//审核状态 1、通过 2、不通过 
						review_remark:this.form.detail.review_remark,//不通过原因
					}
				}
				if(this.current==1){
					if(this.form.detail.special_rate<0){
						uni.showToast({
							title: '折扣数需在0-10之间',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if(this.form.detail.special_rate>10){
						uni.showToast({
							title: '折扣数需在0-10之间',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					if(isEmpty(this.form.detail.special_rate_remark)){
						uni.showToast({
							title: '请填写特殊申请原因',
							icon: 'none'
						});
						setTimeout(function() {
							uni.hideToast();
						}, 2000);
						return
					}
					this.message={
						id:this.id,
						is_special:this.current,//是否特殊折扣申请 0、否 1、是 
						special_rate:this.form.detail.special_rate,//折扣 0-10 不能超出范围
						special_rate_remark:this.form.detail.special_rate_remark,//特殊申请原因
					}
				}		
				this.$http
					.request({
						url: this.$api.moreShop.saveMessage,
						method: 'POST',
						data:this.message,
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							uni.redirectTo({
								url:'./examine'
							})
						}else{
							this.$http.toast(res.msg);
						}
					});
			}
		}
	}
</script>

<style lang="less">
	.examine-detail-app{width: 100%;overflow: hidden;}
	.examine-detail-header{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;}
	.examine-detail-header view{font-size: 28rpx;width: 150rpx;height: 60rpx;text-align: center;line-height: 60rpx;border-radius: 30rpx;margin: 20rpx 0;}
	.active{background: #ff7104;color: #fff;font-weight: bold;}
	.basic-message{width: 100%;overflow: hidden;margin-bottom: 100rpx;}
	.basic-message view{width: 90%;height: 80rpx;margin: 15rpx auto 0 ;}
	.basic-message view text{display: inline-block;height: 80rpx;line-height: 80rpx;font-size: 28rpx;color: #000;width: 150rpx;float: left;}
	 .basic-message view input{display: inline-block;height: 80rpx;outline: none;border: none;line-height: 80rpx;float: left;width: 450rpx;padding-left: 30rpx;margin-left: 5rpx;background: #f2f2f2;color: #000;font-size: 26rpx;}
	.shop-message{width: 100%;overflow: hidden;margin-bottom: 100rpx;}
	.shop-message view{width: 90%;overflow: hidden;margin: 15rpx auto 0 ;}
	.shop-message view text{display: inline-block;height: 80rpx;line-height: 80rpx;font-size: 28rpx;color: #000;width: 150rpx;float: left;}
	.shop-message view input{display: inline-block;height: 80rpx;outline: none;border: none;line-height: 80rpx;float: left;width: 450rpx;padding-left: 30rpx;margin-left: 5rpx;background: #f2f2f2;color: #000;font-size: 26rpx;}
	.shop-message view image{display: block;margin: 5rpx 0;}
	.audit-information{width: 100%;overflow: hidden;margin-bottom: 100rpx;}
	.settlement-account view{margin: 15rpx 0;}
	.settlement-account{width: 90%;margin: 0 auto;border-radius: 30rpx;background: #fff;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);padding: 15rpx;}
	.settlement-account view text{display: inline-block;height: 80rpx;line-height: 80rpx;font-size: 28rpx;color: #000;width: 180rpx;float: left;}
	.settlement-account view input{display: inline-block;height: 80rpx;outline: none;border: none;line-height: 80rpx;width:400rpx ;background: #f2f2f2;color: #000;font-size: 26rpx; padding-left: 10rpx;margin-left: 5rpx;}
	.legal-person{width: 90%;margin: 20rpx auto;border-radius: 30rpx;background: #fff;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);padding: 15rpx;}
	.legal-person view{margin: 15rpx 0;}
	.legal-person view text{display: inline-block;height: 80rpx;line-height: 80rpx;font-size: 28rpx;color: #000;width: 180rpx;float: left;}
	.legal-person view input{display: inline-block;height: 80rpx;outline: none;border: none;line-height: 80rpx;width:400rpx ;background: #f2f2f2;color: #000;font-size: 26rpx; padding-left: 10rpx;margin-left: 5rpx;}
	.discount-apply{width:90% ;margin: 15rpx auto;}
	.discount-apply-select{width: 100%;height: 80rpx;}
	.discount-apply-select-title{display: block;float: left;height: 80rpx;font-size: 28rpx;color: #000;line-height: 80rpx;}
	.discount-apply-select view{float: left;font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;}
	.discount-apply-select view label{margin: 0 30rpx;}
	.status{width: 100%;height: 80rpx;}
	.discount-status{width: 100%;overflow: hidden;background: #fff;border-radius: 30rpx;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);padding: 15rpx;}
	.status-lable{display: block;float: left;height: 80rpx;font-size: 28rpx;color: #000;line-height: 80rpx;}
	.status-radio{float: left;width: 450rpx;height: 80rpx;line-height: 80rpx;font-size: 28rpx;margin-left: 40rpx;}
	.status-radio view{float: left;margin: 0 10rpx;}
	.discount-results{width: 100%;height: 230rpx;}
	.discount-results text{display: inline-block;font-size: 28rpx;color: #000;}
	.discount-results textarea{display: inline-block;width: 450rpx;height: 200rpx;background:#f2f2f2;margin-left: 20rpx;padding: 15rpx;font-size: 25rpx;}
	.special-discount{width: 100%;overflow: hidden;background: #fff;border-radius: 30rpx;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);padding: 15rpx;margin-top: 20rpx;}
	.special-discount-detail{width: 100%;height: 80rpx;line-height: 80rpx;}
	.special-discount-detail text{display: inline-block;height: 80rpx;float: left;font-size: 28rpx;color: #000;}
	.special-discount-detail input{display: inline-block;width: 200rpx;height: 80rpx;float: left;font-size: 26rpx;background:#f2f2f2;outline: none;border: nono;margin-left: 20rpx;text-align: center;}
	.special-discount-notice{width: 100%;height: 230rpx;margin-top: 20rpx;}
	.special-discount-notice text{display: inline-block;font-size: 28rpx;color: #000;}
	.special-discount-notice textarea{display: inline-block;width: 420rpx;height: 200rpx;background:#f2f2f2;margin-left: 130rpx;padding: 15rpx;font-size: 25rpx;}
	.save{width: 300rpx;height: 80rpx;text-align: center;line-height: 80rpx;margin: 50rpx auto;background: #ff7104 ;color: #fff;border-radius: 35rpx;}
</style>
