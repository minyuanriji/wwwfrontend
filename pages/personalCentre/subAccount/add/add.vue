<template v-cloak>
	<view class="app">
		<view class="center">
			<view class="item">
				<view class="title">手机号码</view>
				<view class="input-btn">
					<input class="input" type="number" v-model.number="dataForm.mobile" placeholder="请输入子账号绑定的手机号码"/>
				</view>
			</view>
			<view class="item">
				<view class="title">验证码</view>
				<view class="input-btn">
					<input class="input" type="number" v-model.number="dataForm.captcha" placeholder="请输入验证码" />
					<view class="btn" @click="getCode" :style="{color:'rgb(255, 113, 4)'}">{{countDown || '发送验证码'}}</view>
				</view>
			</view>
			<view class="item last">
				<view class="title"></view>
				<view class="jx-btn" @click="dataSubmit" :style="{background:'rgb(255, 113, 4)'}">确认保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isNullOrEmpty,
		isMobile
	} from '@/utils/util.js';
	export default {
		data() {
			return {
				data: {},
				dataForm: {
					mobile: '',
					captcha: ''
				},
				countDown: '',
				textCol:'',
			}
		},
		onLoad() {
			this.textCol = this.globalSet('textCol');
		},
		methods: {
			dataSubmit(){
				if(!isNullOrEmpty(this.dataForm.captcha)){
					this.$http.toast("验证码必须填写哦")
					return
				}
				// 可以发送请求了
				this.$http.request({
					url: this.$api.moreShop.addSubAccount,
					method: 'POST',
					showLoading: true,
					data: this.dataForm
				}).then(res => {
					if(res.code == 0){
						this.$http.toast("保存成功");
						setTimeout(() => {
							this.navBack();
						},1000 * 2)
					}else{
						this.$http.toast(res.msg);
					}
				})
			},
			getCode() {
				if (!isMobile(this.dataForm.mobile)) {
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
						mobile: _self.dataForm.mobile
					},
					method: 'POST'
				}).then((res) => {
					if(res.code == 0){
						_self.$http.toast("发送成功");
					}else{
						_self.$http.toast(res.msg);
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;
		display: flex;

		.center {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 50rpx 30rpx 0;
			.avatar{
				text-align:center;
				.jx-avatar {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50px;
				}
			}
			
			.item {

				padding: 0 30rpx;
				font-size: #000000;
				border-bottom: 2rpx solid #E0E0E0;

				&:last-child {
					border-bottom: 0;
				}

				.title {

					line-height: 60rpx;
					font-size: 13pt;
					padding: 20rpx 0;
				}

				.input-btn {

					margin-bottom: 20rpx;
					display: flex;
					.input {
						font-size: 11pt;
						flex: 1;
					}
					.uni-input-placeholder {
						color: #E0E0E0;
					}
					.btn {
						flex-basis: 180rpx;
						position: relative;
						color: #BC0100;
						font-size: 11pt;
						text-align: center;
						&::before {
							color: #E0E0E0;
							content: "|";
							position: absolute;
							left: -20rpx;
						}
					}
				}
				
				.jx-btn{
					text-align: center;
					height: 90rpx;
					line-height: 90rpx;
					background-color: #BC0100;
					border-radius:45rpx;
					color: #FFFFFF;
				}
				
				&.last{
					
					span{
						margin-left: 30rpx;
						color: #000000;
					}
				}
			}
		}
	}
</style>


