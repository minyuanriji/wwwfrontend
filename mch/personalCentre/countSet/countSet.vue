<template>
	<view class="countSet-app">
		<view class="countSet-type">
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>结算账户类型</text>
				</view>
				<view @click="bankShow=true" style="width: 350rpx;line-height: 120rpx;font-size:28rpx ;">{{userbanktype.length>0?userbanktype:'请选择'}}</view>
				<!-- <input type="text" placeholder="请选择" @click="bankShow=true" v-model="userbanktype" disabled /> -->
				<!-- 	<image src="../../static/img/sanjia.png" mode="" class="logo"></image> -->
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>账户姓名</text>
				</view>
				<input type="text" placeholder="请填写账户姓名" v-model="form.paper_settleAccount" />
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>银行卡号</text>
				</view>
				<input type="text" placeholder="请填写银行卡号" v-model="form.paper_settleAccountNo" />
			</view>
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>银行名称</text>
				</view>
				<input type="text" placeholder="请填写银行名称" v-model="form.paper_openBank" />
			</view>
			<!-- <view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>交易密码</text>
				</view>
				<input type="number" placeholder="请填写密码(提现密码)" maxlength="6"  v-model="form.withdraw_pwd" />
			</view> -->
			<view class="item">
				<view class="item_title" style="line-height: 120rpx;">
					<text>提现方式</text>
				</view>
				<view @click="TargetShow=true" style="width: 350rpx;line-height: 120rpx;font-size:28rpx ;">{{Targettype.length>0?Targettype:'请选择'}}</view>
				<!-- <input type="text" placeholder="请选择" @click="bankShow=true" v-model="userbanktype" disabled /> -->
				<!-- 	<image src="../../static/img/sanjia.png" mode="" class="logo"></image> -->
			</view>
			<view class="btn" @click="sureBTN">
				<button type="default">提交</button>
			</view>
		</view>
		<com-bottom-popup :show="bankShow" @close="hidePopup(1)">
			<view class="shop_type_item" v-for="(item,index) in banktype" :key='index' @click="choosebank(item.num,item.name)">
				{{item.name}}
			</view>
		</com-bottom-popup>
		<com-bottom-popup :show="TargetShow" @close="hidePopup(2)">
			<view class="shop_type_item" v-for="(item,index) in targetType" :key='index' @click="choosetarget(item.num,item.name)">
				{{item.name}}
			</view>
		</com-bottom-popup>
		 <payPass ref="verify" @finish="getCode"></payPass>
	</view>
</template>

<script>
	import {isEmpty} from '../../../common/validate.js'
	import payPass from '../../../components/pay-pass/pay-pass.vue'
	export default {
		components:{
			payPass
		},
		data() {
			return {
				bankShow:false,
				TargetShow:false,
				userbanktype:'',
				Targettype:"",
				banktype: [/*{ //结算账户类型
						name: '对公账户',
						num: 1
					},*/
					{
						name: '对私账户',
						num: 2
					},
				],
				targetType: [{ //提现方式
						name: '自动提现',
						num: 1
					},
					{
						name: '手动提现',
						num: 2
					},
				],
				form:{
					paper_settleAccountType:'',//结算账户类型。1：对公账户 2：法人账户 3：授权对公 4：授权对私 merchantType=3 时必填 2。
					paper_settleAccountNo:'',//银行卡号
					paper_settleAccount:"",//账户姓名
					paper_settleTarget:'',//1自动提现，2手动提现
					paper_openBank:'',//银行名称
					withdraw_pwd:'',//交易密码
				}
			};
		},
		onLoad(){
			this.getBaseInfo();
		},
		methods:{
			getBaseInfo(){
				let that = this;
				this.$http.request({  //获取商户基本信息
					url: this.$api.moreShop.getMchBaseInfo,
					method: 'POST', 
				}).then(res => {
					if(res.code == 0){
						let baseInfo = res.data.base_info;
						that.form.paper_settleAccountType=baseInfo.settle.paper_settleAccountType
						for(let i=0;i<that.banktype.length;i++){
							if(that.banktype[i].num == baseInfo.settle.paper_settleAccountType){
								that.userbanktype=that.banktype[i].name
							}
						}
						that.form.paper_settleAccountNo=baseInfo.settle.paper_settleAccountNo
						that.form.paper_settleAccount=baseInfo.settle.paper_settleAccount
						that.form.paper_openBank=baseInfo.settle.paper_openBank
						// this.form.withdraw_pwd=
						that.form.paper_settleTarget=baseInfo.settle.paper_settleTarget
						for(let j=0;j<that.targetType.length;j++){
							if(that.targetType[j].num==baseInfo.settle.paper_settleTarget){
								that.Targettype=that.targetType[j].name
							}
						}
					}else{
						that.$http.toast(res.msg);
					}
				});
			},
			hidePopup(index) { //底部弹窗显示隐藏
				if(index==1){
					this.bankShow=false
				}
				if(index==2){
					this.TargetShow=false
				}
			},
			choosebank(index, name) { //选择结算账户类型
				this.userbanktype = name
				this.form.paper_settleAccountType=index
				this.bankShow = false
			},
			choosetarget(index,name){
				this.Targettype=name
				this.form.paper_settleTarget=index
				this.TargetShow = false
			},
			getCode:function(e){
				this.form.withdraw_pwd=e
				this.$http.request({
					url: this.$api.moreShop.settleMessage,
					method: 'POST',
					showLoading: true,
					data:this.form
				}).then(res => {
					if (res.code == 0) {
						this.$http.toast("设置成功");
						setTimeout(()=>{
							this.getBaseInfo();
						},1000)
					}else{
						this.$http.toast(res.msg);
					}
				})
			},
			sureBTN(){
				if (isEmpty(this.form.paper_settleAccountType)) {
					uni.showToast({
						title: '请选择结算账户类型',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (isEmpty(this.form.paper_settleAccount)) {
					uni.showToast({
						title: '请填写账户姓名',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (isEmpty(this.form.paper_settleAccountNo)) {
					uni.showToast({
						title: '请填写银行卡号',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if (isEmpty(this.form.paper_openBank)) {
					uni.showToast({
						title: '请填写银行名称',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				// if (isEmpty(this.form.withdraw_pwd)) {
				// 	uni.showToast({
				// 		title: '请填写交易密码',
				// 		icon: 'none'
				// 	});
				// 	setTimeout(function() {
				// 		uni.hideToast();
				// 	}, 2000);
				// 	return
				// }
				if (isEmpty(this.form.paper_settleTarget)) {
					uni.showToast({
						title: '请选择提现方式',
						icon: 'none'
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				 this.$refs.verify.show();
			}
		}
		
	}
</script>

<style lang="less">
	.countSet-app{width: 100%;overflow: hidden;}
	.countSet-type{width: 100%;overflow: hidden;}
	.item {position: relative;display: flex;flex-wrap: wrap;overflow: hidden;border-bottom: 1rpx solid #80848F;width: 90%;margin: 0 auto;}
	.item_title {
		display: flex;
		width: 220rpx;
		height: 120rpx;
		flex-wrap: wrap;
		margin-right: 10rpx;
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
		width: 400rpx;
	}
	.shop_type_item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-bottom: 1rpx solid #B3B3B3;
	}
	.btn{
		margin: 80rpx auto 0;
		background: #FF7104;
		width: 80%;
	}
	.btn button{
		background: #FF7104;
		outline: none;
		border: none;
		color: #fff;
		border-radius: 20rpx;
	}
</style>
