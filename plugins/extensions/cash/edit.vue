<template>
	<view class="app">
		<view class="container" v-if="setting">
			<view class="text-input-desc m-top-20">
				<view class="money">
					<view class="dot font-size-16">¥</view>
					<input
						class="input font-size-12"
						type="number"
						v-model="dataForm.price"
						maxlength="20"
						placeholder-style="color:#BFBFBF"
						:placeholder="`最高可提现${income}元`"
					/>
					<view class="text font-size-9" @click="max()" :style="{color:'#FF7104'}">全部提现</view>
				</view>
				<view class="sum font-size-9 m-top-20">
					可提现金额：
					<span class="red" :style="{color:'#FF7104'}">{{ income }}元</span>
				</view>
			</view>

			<view class="fee-desc m-top-20 font-size-9">
				<view class="title">费用说明</view>
				<view class="fee">
					<view class="handling-fee">
						<view class="sum" :style="{color:'#FF7104'}">{{ setting.cash_service_fee }}%</view>
						<view class="desc">手续费费率</view>
					</view>
					<!-- <view class="labor-service-fee">
						<view class="sum">{{'156'}}元</view>
						<view class="desc">劳务费合计</view>
					</view> -->
				</view>
			</view>

			<view class="withdraw-type m-top-20 font-size-9">
				<view class="title">提现方式</view>
				<view class="items">
					<view class="item m-top-12" v-for="(item, i) in withdrawType" :key="i">
						<view v-if="item.is_show">
							<view class="type" @click="switchType(item.key)">
								<image :src="item.url" mode="aspectFill" class="logo"></image>
								<!-- <view class="name">提现到{{item.title}}</view> -->
								<view class="name">{{ item.name }}</view>
								<view class="icon iconfont" :style="{color:'#FF7104'}" :class="dataForm.type == item.key ? 'icon-xuanzhong-01 checked' : 'icon-quanquan check'"></view>
							</view>
							<view>
								<view class="attach" v-if="dataForm.type == 'wechat' && item.key == 'wechat'">
									<view v-if="dataForm.wechat_qrcode == 0" class="upload-img flex-col flex-x-center flex-y-center">
										<view class="iconfont icon-xiangji"></view>
										<view>添加收款码</view>
									</view>
									<com-upload
										@complete="result"
										@remove="remove"
										:limit="1"
										:width="130"
										:height="130"
										:style="{ opacity: dataForm.wechat_qrcode.length ? 1 : 0, position: dataForm.wechat_qrcode.length ? '' : 'absolute' }"
										style="top: 0;"
									></com-upload>
									<input type="text" v-model="dataForm.content" placeholder="备注(选填)" class="input" maxlength="50" />
								</view>
								<view class="attach" v-if="dataForm.type == 'alipay' && item.key == 'alipay'">
									<input type="text" v-model="dataForm.name" placeholder="点我输入支付宝用户名" class="input" maxlength="50" />
									<input type="text" v-model="dataForm.mobile" placeholder="点我输入支付宝账号" class="input" maxlength="50" />
								</view>
								<view class="attach" v-if="dataForm.type == 'bank' && item.key == 'bank'">
									<input type="text" v-model="dataForm.name" placeholder="点我输入银行卡开户名" class="input" maxlength="50" />
									<input type="text" v-model="dataForm.bank_name" placeholder="点我输入开户行名称" class="input" maxlength="50" />
									<input type="text" v-model="dataForm.bank_account" placeholder="点我输入银行卡卡号" class="input" maxlength="50" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="bottom">
				<view class="btn submit font-size-9" @click="dataFormSubmit" :style="{background:'#FF7104'}"><span>确认提现</span></view>
			</view>
		</view>
		<com-modal :button="button" :show="modal" @click="handleClick" @cancel="hide" title="提示" content="您没有设置支付密码,是否需要跳转设置？"></com-modal>
		<com-payment-password ref="paymentPassword" :show="cashFlag" :value="paymentPwd" :digits="6"
		@submit="checkPwd" @cancel="togglePayment" @checkSafePwd="safePasswork"></com-payment-password>
		<main-loading :visible="loading"></main-loading>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			dataForm: {
				price: '',
				type: '',
				name: '',
				mobile: '',
				bank_name: '',
				bank_account: '', 
				content: '',
				wechat_qrcode: ''
			},
			setting: null,
			income: 888,
			imgArr: [],
			cashFlag: false,
			// 支付密码
			paymentPwd: '',
			is_transaction_password:true,//是否设置过支付密码
			modal:false,//模态弹窗
			textCol:'#bc0100',
			button:[],
			default_bank:''
		};
	},
	onLoad() {
		this.textCol = this.globalSet('textCol');
		this.button = this.globalSet('btnCol','确定');
		this.initSetting();
	},
	computed: {
		withdrawType() {
			let temp = [
				{
					url: 'https://pic.downk.cc/item/5ece3f6ac2a9a83be5a6fc2b.jpg',
					key: 'auto',
					title: '微信自动打款',
					is_show: false
				},
				{
					url: 'https://pic.downk.cc/item/5ece3f6ac2a9a83be5a6fc2b.jpg',
					key: 'wechat',
					title: '微信线下转账',
					is_show: false
				},
				{
					url: 'https://pic.downk.cc/item/5ed205a9c2a9a83be544fe98.jpg',
					key: 'alipay',
					title: '支付宝线下转账',
					is_show: false
				},
				{
					url: 'https://pic.downk.cc/item/5ece3f72c2a9a83be5a70462.jpg',
					key: 'bank',
					title: '银行卡线下转账',
					is_show: false
				},
				{
					url: 'https://pic.downk.cc/item/5ece3f5ec2a9a83be5a6ed86.jpg',
					key: 'balance',
					title: '余额提现',
					is_show: false
				}
			];
			let arr = [];
			this.setting.cash_type_name.forEach(type => {
				let t = temp.find(item => type.type == item.key);
				t.is_show = true;
				t.name = type.name;
				arr.push(t);
			});
			return arr;
		}
	},
	methods: {
		hide() {
			this.modal = false;
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				this.modal = false;
			} else {
				uni.navigateTo({
					url:'/pages/user/payment/password'
				})
			}
			this.hide();
		},
		checkPwd(e) {
			// this.paymentPwd = e.value;
			return;
			this.$http
				.request({
					url: this.$api.plugin.extensions.cash.submit,
					method: 'POST',
					data: this.dataForm,
					showLoading: true
				})
				.then(res => {
					this.$http.toast(res.msg);
					if (res.code == 0) {
						this.dataForm = {
							price: '',
							type: type,
							name: '',
							mobile: '',
							bank_name: '',
							bank_account: '',
							content: '',
							wechat_qrcode: ''
						};
						this.initSetting();
					}
				});
		},
		togglePayment() {
			this.cashFlag = false;
		},
		dataFormSubmit() {
			let self = this;
			let { price, type, name, mobile, bank_name, bank_account, content, wechat_qrcode } = self.dataForm;
			
			if(!this.is_transaction_password){
				this.modal = true;
				return;
			}

			if (self.setting.min_money > Number(price)) {
				self.$http.toast(`最少提现${self.setting.min_money}元`);
				return;
			}

			if (type == 'wechat') {
				if (!wechat_qrcode.trim().length) {
					self.$http.toast(`请上传您的微信收款码`);
					return;
				}
			} else if (type == 'alipay') {
				if (!name.trim().length) {
					self.$http.toast(`请输入您的支付宝用户名`);
					return;
				}
				if (!mobile.trim().length) {
					self.$http.toast(`请输入您的支付宝账号`);
					return;
				}
			} else if (type == 'bank') {
				if (!name.trim().length) {
					self.$http.toast(`请输入您的银行卡开户名`);
					return;
				}
				if (!bank_name.trim().length) {
					self.$http.toast(`请输入您的开户行名称`);
					return;
				}
				if (!/^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(bank_account)) {
					self.$http.toast(`请确认您的银行卡卡号输入正确`);
					return;
				}
			}

			if (Number(self.income) < Number(price)) {
				self.$http.toast(`您的可提现金额不足以提现`);
				return;
			}
			
			self.cashFlag = true;
			// 调用弹出函数
			self.$refs.paymentPassword.modalFun('show');
			return;
		},
		safePasswork(e){
			let { price, type, name, mobile, bank_name, bank_account, content, wechat_qrcode } = this.dataForm;
			this.dataForm.transaction_password = e.passwork;
			
			uni.showLoading({
				title: '校验安全密码中'
			});
			this.$http.request({
				url: this.$api.plugin.extensions.cash.submit,
				method: 'POST',
				data: this.dataForm,
				showLoading: true
			}).then(res => {
				this.$http.toast(res.msg);
				this.$refs.paymentPassword.modalFun('hide');
				if (res.code == 0) {
					this.dataForm = {
						price:'',
						type: '',
						name: '',
						mobile: '',
						bank_name: '',
						bank_account: '',
						content: '',
						wechat_qrcode: '',
					};
					this.initSetting();
					this.$http.toast(res.msg);
				}else{
					this.$http.toast(res.msg);
				}
			});
		},
		initSetting() {
			this.loading = true;
			this.$http
				.request({
					url: this.$api.plugin.extensions.cash.setting
				})
				.then(res => {
					this.loading = false;
					if (res.code == 0) {
						let { setting, user_info ,default_bank } = res.data;
						this.setting = setting;
						this.default_bank=default_bank;
						this.income = user_info.income;
						this.dataForm.type = setting.cash_type[0];
						this.is_transaction_password = res.data.user_info.is_transaction_password;
					} else {
						this.$http.toast(res.msg);
						setTimeout(() => {
							uni.navigateBack();
						}, 1000 * 2);
					}
				});
		},
		switchType(key) {
			if(key=='bank'){
				this.dataForm.type = key;
				this.dataForm.name = this.default_bank.name;
				this.dataForm.mobile = '';
				this.dataForm.content = '';
				this.dataForm.bank_name = this.default_bank.bank_name;
				this.dataForm.bank_account =this.default_bank.bank_account;
				this.dataForm.wechat_qrcode = '';
				this.imgArr = [];
			}else{
				this.dataForm.type = key;
				this.dataForm.name = '';
				this.dataForm.mobile = '';
				this.dataForm.content = '';
				this.dataForm.bank_name = '';
				this.dataForm.bank_account = '';
				this.dataForm.wechat_qrcode = '';
				this.imgArr = [];
			}
		},
		max() {
			this.dataForm.price = Number(this.income);
		},
		result(e) {
			// 图片上传结果
			if (e.status != 1) {
				return;
			}
			this.imgArr = e.imgArr;
			if (e.imgArr.length == 0) {
				this.dataForm.wechat_qrcode = '';
				return;
			}
			this.dataForm.wechat_qrcode = e.imgArr[0];
		},
		remove(e) {
			//移除图片
			let index = e.index;
		}
	}
};
</script>

<style lang="scss" scoped>
.app {
	background-color: #f2f2f2;
	min-height: 100%;
	color: #000000;

	.text-input-desc,
	.fee-desc,
	.withdraw-type {
		background-color: #ffffff;
	}

	.text-input-desc {
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: column;

		.money {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f2f2f2;

			.dot {
				margin-right: 20rpx;
				font-weight: 600;
			}

			.input {
				flex: 1;
				border-bottom: 0;
			}

			.text {
				color: #bc0100;
				font-weight: 600;
			}
		}

		.sum {
			color: #333333;

			.red {
				color: #bc0100;
			}
		}
	}

	.fee-desc {
		.fee {
			display: flex;
			padding: 10rpx 0;

			.handling-fee,
			.labor-service-fee {
				height: 170rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

			.handling-fee {
				// border-right: 1rpx solid #F2F2F2;
			}

			.sum,
			.desc {
				line-height: 40rpx;
			}

			.sum {
				color: #bc0100;
				font-weight: 600;
				font-size: 11pt;
				margin-bottom: 8rpx;
			}
		}
	}

	.withdraw-type {
		.items {
			background-color: #f2f2f2;

			.item {
				background-color: #ffffff;
				padding: 0 36rpx;

				&:first-child {
					margin-top: 0;
				}
			}

			.type {
				padding: 20rpx 0;
				display: flex;
				align-items: center;

				.logo {
					margin-right: 16rpx;
					width: 53rpx;
					height: 53rpx;
				}

				.name {
					flex: 1;
				}
			}

			.attach {
				padding-bottom: 20rpx;
				position: relative;

				.upload-img {
					width: 130rpx;
					height: 130rpx;
					color: #bfbfbf;
					border: 1rpx dotted #bfbfbf;
					z-index: 10;

					.iconfont {
						font-size: 12pt;
					}
				}
			}
		}
	}

	.bottom {
		margin: 60rpx 0;
		padding: 0 30rpx;

		.btn {
			line-height: 90rpx;
			text-align: center;
			border-radius: 45rpx;

			&.submit {
				background-color: #bc0100;
				color: #ffffff;
			}
		}
	}

	.title {
		padding: 0 30rpx;
		line-height: 60rpx;
		border-bottom: 1rpx solid #f2f2f2;
	}
}

.input {
	font-size: 10pt;
	margin-top: 10rpx;
	border-bottom: 2rpx solid #f2f2f2;
	height: 70rpx;
	padding-left: 20rpx;
}

.checked {
	color: #bc0100;
}

.check {
	color: #9e9e9e;
}

.font-size-16 {
	font-size: 16pt;
}

.font-size-12 {
	font-size: 12pt;
}

.font-size-9 {
	font-size: 9pt;
}

.m-top-20 {
	margin-top: 20rpx;
}

.m-top-12 {
	margin-top: 12rpx;
}
</style>
