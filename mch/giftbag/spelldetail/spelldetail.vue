<template>
	<view class="giftbagDetail-app">
		<view class="tui-banner-swiper">
			<image :src="detail.cover_pic" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="time-money">
			<view class="time-money-left">
				<view style="height: 60rpx;line-height: 60rpx;">
					<text style="font-weight: bold;">￥</text>
					<text style="font-size: 48rpx;font-weight: bold;">{{detail.group_price}}</text>
				</view>
				<view>
					<text style="font-size: 30rpx;color: #fff;width: 120rpx;background: #007AFF;line-height: 44rpx;text-align: center;border-radius: 30rpx;">拼团价</text>
					<text style="font-size: 28rpx;color: #fff;margin-left: 10rpx;">原价</text>
					<text style="font-size: 28rpx;color: #fff;text-decoration: line-through;">￥{{detail.price}}</text>
				</view>
			</view>
			<view class="time-money-right">
				<view style="margin-top: 10rpx;">距离活动结束</view>
				<view>{{expired_at}}</view>
			</view>
		</view>
		<view class="giftbag-title">
			<view style="width: 95%;color: #000;font-weight: bold;padding: 0 20rpx;font-size: 31rpx;">
				<text style="display: inline-block;;width: 120rpx;height: 50rpx;line-height: 48rpx;color: rgb(255,71,121);text-align: center;border: 1rpx solid rgb(255,71,121);border-radius: 30rpx;margin-right: 10rpx;">{{detail.group_num}}人团</text>
				{{detail.title}}
			</view>
		</view>
		<view class="giftbag-describe">
			{{detail.descript}}
			有<text style="background: rgb(217,217,217);color: #000;border-radius: 30rpx;display: inline-block;min-width: 90rpx;text-align: center;">{{detail.view_num}}</text>人浏览，
			<text style="background: rgb(221,82,77);color: #fff;border-radius: 30rpx;display: inline-block;min-width: 90rpx;text-align: center;">{{detail.sold_num}}</text>人参与
		</view>
		<view class="warm-prompt">
			<text style="display: block;color: rgb(255,71,83);padding-left: 10rpx;position: absolute;z-index: 99;background: #fff;right: 50rpx;top:-26rpx;height: 50rpx;border: 1rpx solid rgb(255,71,83);border-radius: 10rpx;text-align: center;line-height: 52rpx;">友情提示！</text>
			拼团发起后，<text style="color: rgb(255,68,0);">{{detail.group_hour_expired}}小时内</text>完成<text  style="color: rgb(255,68,0);">{{detail.group_num}}人</text>组团即拼团成功，否则拼团失败，拼团金额返回用户支付帐户
		</view>
		<view class="my-spell-joinnum">
			<view v-for="(item,index) in join_list" :key='index' style="position: relative;float: left;margin-left: 20rpx;">
				<image :src="item.avatar_url" mode="" style="width: 120rpx;height: 120rpx;margin: 20rpx;display: block;border-radius: 50%;"></image>
				<text v-if="item.is_owner==1" style="display: block;position: absolute;font-size: 28rpx;right: 0;bottom: 20rpx;
				width: 80rpx;background: red;color: #fff;text-align: center;border-radius: 20rpx;">团长</text>
			</view>
		</view>
		<view class="select-check">
			<text v-for="(item,index) in table" :key='index' :class="selectIndex==index?'active':'actove'" @click="select(index)">
				{{item}}
			</text>
		</view>
		<view class="package-content" v-if="selectIndex==0">
			<view class="package-content-title">
				套餐包括：
			</view>
			<view class="package-content-item" v-for="(item,index) in productList" :key='index'>
				<image :src="item.cover_pic" mode="widthFix"></image>
				<text>{{index+1}}.{{item.name}}</text>
			</view>
		</view>
		<view class="bottom" v-if="show">
			<view class="bottom-back" @click="back">
				<image src="https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="bottom-buy">
				<!-- #ifdef H5 -->
				<view style="background: rgb(54,207,54);width: 100%;height: 85rpx;margin-top: 25rpx;border-radius: 50rpx;" @click="invitation">
					<text style="font-size: 30rpx;font-weight: bold;line-height: 85rpx;">邀请好友拼团</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN || APP-PLUS -->
				<button open-type="share" style="background: rgb(54,207,54);width: 100%;height: 85rpx;margin-top: 25rpx;border-radius: 50rpx;">
					<text style="font-size: 30rpx;font-weight: bold;line-height: 85rpx;">邀请好友拼团</text>
				</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="bottom" v-if="!show">
			<view class="bottom-back" @click="back">
				<image src="https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="bottom-buy" @click="gospellbuy">
				<view style="background: rgb(255,51,0);width: 100%;height: 85rpx;margin-top: 25rpx;border-radius: 50rpx;">
					<text style="font-size: 30rpx;font-weight: bold;line-height: 85rpx;">我要拼团</text>
				</view>
			</view>
		</view>
		<com-modal :button="button" :show="modal" @click="handleClick" @cancel="hide" title="提示" content="您没有设置支付密码,是否需要跳转设置？"></com-modal>
		<com-payment-password ref="paymentPassword" :show="cashFlag" :value="paymentPwd" :digits="6"
		@submit="checkPwd" @cancel="togglePayment" @checkSafePwd="safePasswork"></com-payment-password>
		<unipopup ref="popup" type="bottom">
			<view class="spell-pay-type" >
				<view class="spell-pay-type-title">支付方式</view>
				<view class="giftbagDetail-service" v-if="detail.allow_currency=='integral'">
					<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
						<view class="jx-cell-header" style="height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">需使用红包支付</view>
						</view>
						<view class="jx-cell-header" style="margin-left: 350rpx;color: #FF5A0E;height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">{{moneyMessage.integral_deduction_price}}红包</view>
						</view>
					</jx-list-cell>		
				</view>
				<view class="popup-bottom"  v-if="detail.allow_currency=='integral'">
					<text>剩余红包：{{moneyMessage.user_integral}}</text>
					<text @click="buy">去支付</text>
				</view>
				<view class="giftbagDetail-service" v-if="detail.allow_currency=='money'">
					<radio-group @change="radioChange">
				        <view  v-for="(item, index) in payitems" :key="index" style="width: 100%;height: 100rpx;line-height: 100rpx;padding: 0 20rpx;">
							<view style="float: left;">{{item.name}}</view>
							<view style="float: right;">
				                <radio :value="item.value" :checked="index === current" />
				            </view>
				        </view>
				    </radio-group>
				</view>
				<view class="giftbagDetail-service" v-if='current==0'>
					<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
						<view class="jx-cell-header" style="height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">需使用余额支付</view>
						</view>
						<view class="jx-cell-header" style="margin-left: 350rpx;color: #FF5A0E;height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">{{moneyMessage.group_price}}元</view>
						</view>
					</jx-list-cell>		
				</view>
				<view class="giftbagDetail-service" v-if='current==1'>
					<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
						<view class="jx-cell-header" style="height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">需使用微信支付</view>
						</view>
						<view class="jx-cell-header" style="margin-left: 350rpx;color: #FF5A0E;height: 80rpx;">
							<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">{{moneyMessage.group_price}}元</view>
						</view>
					</jx-list-cell>		
				</view>
				<view class="popup-bottom"  v-if="detail.allow_currency=='money'&&current==0">
					<text>剩余余额：{{moneyMessage.balance}}</text>
					<text @click="buy">去支付</text>
				</view>
				<view class="popup-bottom"  v-if="detail.allow_currency=='money'&&current==1">
					<text   style="width: 360rpx;height: 80rpx;background: red;text-align: center;line-height: 80rpx;border-radius: 30rpx;
							margin-left: 240rpx;color: #fff;margin-top: 10rpx;"  @click="buy">去支付</text>
				</view>
			</view>
		</unipopup>
		<!-- #ifdef H5 -->
		<unipopup ref="popupShare" type="center">
			<view class="popup-detail">
				<view class="popup-detail-title">
					分享链接
				</view>
				<view class="popup-detail-link">
					{{url}}
				</view>
				<view class="select-type">
					<button type="default" @click="deleted">取消</button>
					<button type="default"  style="background: red;color: #fff;"  v-clipboard:copy="url" v-clipboard:success="(type) => paste('success')" v-clipboard:error="(type) => paste('error')">复制链接</button>
				</view>
			</view>
		</unipopup>
		<!-- #endif -->
		
	</view>
</template>
<style lang="less" scoped>
	.giftbagDetail-app{width: 100%;overflow: hidden;}
	.tui-banner-swiper{width: 100%;overflow: hidden;position: relative;}
	.tui-banner-swiper image{display: block;width: 100%;}
	.time-money{width: 100%;height: 140rpx;padding: 10rpx 20rpx;box-sizing: border-box;background: rgb(255,71,83);display: flex;justify-content: space-between;}
	.time-money-left view:nth-of-type(1){color: rgb(255,255,0);}
	.time-money-left view text{display: inline-block;}	
	.time-money-right{text-align: right;color: #fff;}
	.giftbag-title{width: 100%;overflow: hidden;display: flex;justify-content: space-between;margin: 20rpx 0;}
	.giftbag-describe{width: 80%;font-size: 29rpx;padding-left: 20rpx;}
	.warm-prompt{width: 95%;min-height: 150rpx;position: relative;margin: 40rpx auto 0;border-radius: 15rpx;border: 1rpx solid rgb(255,71,83);padding: 30rpx 15rpx;font-size: 28rpx;}
	.select-check{width: 100%;display: flex;justify-content: space-evenly;margin: 30rpx 0;background: rgb(239,239,244);height: 90rpx;}
	.actove{display: block;height: 100%;width: 30%;text-align: center;line-height: 90rpx;color: #000;}
	.active{color: rgb(221,82,77);border-bottom: 1rpx solid rgb(221,82,77);display: block;height: 100%;width: 30%;text-align: center;line-height: 90rpx;}
	.package-content{width: 95%;overflow: hidden;margin: 0 auto 150rpx;}
	.package-content-title{color: #000;font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;}
	.package-content-item{width: 100%;overflow: hidden;margin-top: 20rpx;}
	.package-content-item image{width: 100%;display: block;}
	.package-content-item text{display: block;width: 100%;overflow: hidden;margin-top: 20rpx;font-size: 30rpx;color: #000;}
	.Spell-group-polite{width: 95%;overflow: hidden;margin: 0 auto 150rpx;}
	.Spell-group-polite-header{font-size: 30rpx;color: #000;border-bottom: 1rpx solid rgb(221,221,221);height: 80rpx;line-height: 80rpx;}
	.Spell-group-polite-item{width: 100%;overflow: hidden;background: #fff;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);margin: 20rpx 0;border-radius: 20rpx}
	.Spell-group-polite-item-detail{background: rgb(254,167,182);height: 150rpx;display: flex;justify-content: space-evenly;}
	.Spell-group-polite-item-detail .logo{width: 120rpx;height: 120rpx;display: block;margin-top: 15rpx;}
	.Spell-group-polite-item-detail-price{margin-top: 15rpx;color: #fff;width: 70%;}
	.Spell-group-polite-item-detail-price text{display: inline-block;}
	.Spell-group-polite-item-detail-price-num{width: 100%;text-align: right;}
	.Spell-group-polite-item-detail-name{font-size: 30rpx;width: 100%;text-align: right;}
	.Spell-group-polite-item-title{width: 100%;display: flex;justify-content: space-between;background: #fff;margin-top: 20rpx;padding: 0 20rpx;}
	.Spell-group-polite-item-title image{display: inline-block;width: 50rpx;height: 50rpx;float: left;}
	.Spell-group-polite-item-describe{font-size: 26rpx;margin: 30rpx 0;padding: 0 20rpx;}
	.spell-pay-type{width: 100%;min-height: 700rpx;background: #fff;border-radius: 30rpx 30rpx 0 0;}
	.spell-pay-type-title{width: 100%;line-height: 80rpx;text-align: center;color: #000;}
	.popup-bottom{position: absolute;left: 0;bottom: 0;width: 100%;height: 100rpx;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);background: #fff;}
	.popup-bottom text{display: inline-block;}
	.popup-bottom text:nth-of-type(1){line-height: 100rpx;margin-left: 50rpx;font-size: 30rpx;color: #FF5A0E;font-weight: bold;}
	.popup-bottom text:nth-of-type(2){width: 260rpx;height: 80rpx;background: red;text-align: center;line-height: 80rpx;border-radius: 30rpx;
	margin-left: 140rpx;color: #fff;}
	.bottom{width: 100%;height: 120rpx;padding: 0 20rpx;box-sizing: border-box;background: #fff;position: fixed;left: 0;bottom: 0;z-index: 99;display: flex;justify-content: space-evenly;}
	.bottom view image{width: 50rpx;height: 50rpx;display: block;margin: 15rpx auto 5rpx;}
	.bottom-back{width: 20%;text-align: center;font-size: 29rpx;}
	.bottom-buy{display: flex;justify-content: space-between;width: 75%;}
	.bottom-buy text{display: block;text-align: center;color: #fff;}
	.popup-detail{width: 550rpx;height: 400rpx;background: #fff;border-radius: 30rpx;}
	.popup-detail-title{width:550rpx;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;}
	.popup-detail-link{width:550rpx;overflow: hidden;font-size: 25rpx;color: #000;background:#fafafa ;margin: 35rpx 0;padding: 0 10rpx;box-sizing: border-box;
	overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height: 80rpx;}
	.select-type{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;margin: 80rpx 0 0 0;}
	.select-type button{width: 40%;height: 80rpx;text-align: center;line-height: 80rpx;font-size: 28rpx;}
	.my-spell-joinnum{width: 100%;height: 160rpx;margin: 20rpx 0;padding: 0 20rpx;background: #efeff4;}
</style>


<script>
	import unipopup from '@/components/uni-popup/uni-popup';
	import jxListCell from '@/components/list-cell/list-cell';
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	export default {
		components: {
			unipopup,
			jxListCell
		},
		data() {
			return {
				pack_id:'',
				img_url: this.$api.img_url,
				selectIndex:0,//table选项
				table:['活动介绍'],
				// table:['活动介绍','拼团记录','拼团有礼']
				detail:'',
				productList:[],
				expired_at:'',
				modal:false,//模态弹窗
				button:[],
				cashFlag: false,
				paymentPwd: '',
				is_transaction_password:true,//是否设置过支付密码
				popup:false,
				payitems: [
					{
				        value: '余额支付',
				        name: '余额支付'
				    },
				    {
				        value: '微信支付',
				        name: '微信支付'
				    }
				],
				current: 0,
				moneyMessage:"",
				group_id:'',//团id
				popupShare:false,
				show:true,//控制底部的显示
				url:'',
				join_list:[],//参团人员
			}
		},
		onLoad(options) {
			if(options&&options.pack_id){
				this.pack_id=options.pack_id
				this.packageDetail(options.pack_id)
				this.getpackageListitem(options.pack_id)
			}
			if(options&&options.group_id){
				this.group_id=options.group_id
				this.getespellDetail(options.group_id)
			}
			if(options&&options.type){
				this.show=false
			}
			this.button = this.globalSet('btnCol','确定');
		},
		onShow() {
			this.initSetting()
		},
		methods:{
			select(index){ //table切换
				this.selectIndex=index
			},
			back(){ //点击返回首页
				uni.navigateTo({
					url:'../../../pages/index/index'
				})
			},
			packageDetail(pack_id){ //获取大礼包详情
				this.$http.request({
					url: this.$api.package.packageDetail,
					method: 'POST',
					data: {
						pack_id:pack_id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.detail=res.data.detail
						this.expired_at=res.data.detail.expired_at
						var timestamp =parseInt( new Date().getTime()/1000)
						let time=this.expired_at-timestamp
						let days=''
						let hours=''
						let minutes=''
						let seconds=''
						let timers=setInterval(()=>{
							time--
							if(time<=0){
								this.expired_at='00'+'天'+'00'+"时"+'00'+'分'+'00'+'秒'
								clearInterval(timers)
								return 
							}
							days = parseInt(time / 60 / 60 / 24 , 10); //计算剩余的天数
							hours = parseInt(time / 60 / 60 % 24 , 10)<10?"0"+parseInt(time / 60 / 60 % 24 , 10):parseInt(time  / 60 / 60 % 24 , 10); //计算剩余的小时 
							minutes = parseInt(time / 60 % 60, 10)<10?"0"+parseInt(time / 60 % 60, 10):parseInt(time / 60 % 60, 10);//计算剩余的分钟 
							seconds = parseInt(time % 60, 10)<10?"0"+parseInt(time  % 60, 10):parseInt(time  % 60, 10);//计算剩余的秒数 								
							this.expired_at=days+'天'+hours+"时"+minutes+'分'+seconds+"秒"
						},1000)
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			getpackageListitem(pack_id){ //获取礼包套餐类容
				this.$http.request({
					url: this.$api.package.packageListitem,
					method: 'POST',
					data: {
						page:this.page,
						pack_id:pack_id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.productList =res.data.list
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			gospellbuy(){ //参加拼团
				this.$http.request({
					url: this.$api.package.joinespell,
					method: 'POST',
					data: {
						group_id:this.group_id
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						 this.moneyMessage=res.data
						 this.$refs.popup.open()
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
			initSetting() { //获取是否设置支付密码
				this.$http
					.request({
						url: this.$api.plugin.extensions.cash.setting
					})
					.then(res => {
						if (res.code == 0) {
							this.is_transaction_password = res.data.user_info.is_transaction_password;
						} else {
							this.$http.toast(res.msg);
						}
					});
			},
			hide() { //影藏
				this.modal = false;
			},
			handleClick(e) { //没有设置密码
				let index = e.index;
				if (index === 0) {
					this.modal = false;
				} else {
					uni.navigateTo({
						url:'../../../pages/user/payment/password'
					})
				}
				this.hide();
			},
			checkPwd(e) { //输入密码
				console.log(e)
			},
			safePasswork(e){ //密码校验
				this.paymentPwd = e.passwork;
				this.payMoney(this.group_id,this.paymentPwd)
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.payitems.length; i++) {
					if (this.payitems[i].value === evt.detail.value) {
						this.current = i;
						console.log(this.current )
						break;
					}
				}
			},
			buy(){ //点击去支付弹出输入密码框
				if(!this.is_transaction_password){
					this.modal = true;
					return;
				}
				this.cashFlag=true
				this.$refs.paymentPassword.modalFun('show');	
			},
			payMoney(group_id,trade_pwd){ //支付
				if(this.detail.allow_currency=='integral'){ //红包支付
					this.$http.request({
						url: this.$api.package.payMoneybag,
						method: 'POST',
						data: {
							group_id:group_id,
							trade_pwd:trade_pwd
						},
						showLoading: true
					}).then(res => {
						if (res.code == 0) {
							this.$refs.paymentPassword.modalFun('hide');
							this.$http.toast('支付成功');
							setTimeout(()=>{
								uni.navigateTo({
									url:'../spelldetail/spelldetail?pack_id='+this.pack_id
								})
							},2000)
						} else {
							this.$http.toast(res.msg);
						}
					});
				}
				if(this.detail.allow_currency=='money'&&this.current==0){ //余额支付
					this.$http.request({
						url: this.$api.package.paybalancebag,
						method: 'POST',
						data: {
							group_id:group_id,
							trade_pwd:trade_pwd
						},
						showLoading: true
					}).then(res => {
						if (res.code == 0) {
							this.$refs.paymentPassword.modalFun('hide');
							this.$http.toast('支付成功');
							setTimeout(()=>{
								uni.navigateTo({
									url:'../spelldetail/spelldetail?pack_id='+this.pack_id
								})
							},2000)
						} else {
							this.$http.toast(res.msg);
						}
					});
				}
				if(this.detail.allow_currency=='money'&&this.current==1){ //微信支付
					this.$http.request({
						url: this.$api.package.paywechatcreatedbag,
						method: 'POST',
						data: {
							group_id:group_id,
						},
					}).then(res => {
						if (res.code == 0) {
							var union_id=res.data.union_id
							this.getWchat(union_id)
						} else {
							this.$http.toast(res.msg);
						}
					});
				}
			},
			getWchat(union_id){ //第三方支付
				this.$http.request({
					url: this.$api.package.paywechatbag,
					method: 'POST',
					data: {
						union_id:union_id,
						stands_mall_id:JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id!=null?JSON.parse(uni.getStorageSync('mall_config')).stands_mall_id:5,
						wx_type:'wechat'//公众号：wechat  小程序：mp-wx
					},
					showLoading: true
				}).then(res => {
					this.$refs.paymentPassword.modalFun('hide');
					if (res.code == 0) {
						let url="/mch/spelldetail/spelldetail?pack_id="+this.pack_id
						this.$wechatSdk.pay(res.data,url);
					} else {
						this.$http.toast(res.msg);
					}
				});
			},		
			invitation(){ //邀请好友
				this.$refs.popupShare.open()
				let pid=JSON.parse(uni.getStorageSync('userInfo')).user_id
				this.url=window.location.href+"&pid="+pid+"&type="+1
			},	
			deleted(){
				 this.$refs.popupShare.close()
			},
			paste(type) {
				if (type==='success') {
					this.$http.toast('复制成功');
					this.$refs.popupShare.close()
				} else {
					this.$http.toast('复制失败');
				}
			},
			getespellDetail(group_id){ //获取拼团详情
				this.$http.request({
					url: this.$api.package.espellDetail,
					method: 'POST',
					data: {
						group_id:group_id,
					},
					showLoading: true
				}).then(res => {
					if (res.code == 0) {
						this.join_list=res.data.join_list
					} else {
						this.$http.toast(res.msg);
					}
				});
			},
		},
	}
</script>