<template>
	<view>
		<!-- mask层 -->
		<view :class="['mask', show ? '' : 'visible']"></view>
		<!-- 金额 -->
		<view :class="['content', show ? '' : 'contenthide']">
			<view class="title">
				<view class="close" @click="close()"><image src="../../plugins/images/close.png" /></view>
				<view class="center">请输入支付密码</view>
				<view class="close"></view>
			</view>
			<view class="pay-money">
				<view>金额</view>
				<view class="money">￥ <text>{{money}}</text></view>
			</view>
			<view class="pay-way">
				<view>手续费</view>
				<view class="pay-img"><image src="../../plugins/images/yue.png"/>￥{{count}}</view>
			</view>
			<view :class="['code', show ? '' : 'visible']">
				<view class="code-box">
					<block v-for="(item, index) in 6" :key="index">
						<view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
					</block>
				</view>
				<input type="number" v-model="password" />
			</view>			
		</view>
		<!-- 键盘 -->
		<view :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<block v-for="(item, index) in 9" :key="index">
				<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
			</block>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
			<view class="keyboard-item delte" @tap="del()"><image class="img" src="../../plugins/images/del.png" mode="aspectFill" :lazy-load="true"></image></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false 
			},
			money: {
				type: String,
				default: false 
			},
			count: {
				type: String,
				default: false 
			},
			isIphoneX: {
				type: Boolean,
				default: false 
			},
		},
		data() {
			return {
				password: '',
				trantision: false
			};
		},
		methods: {
			key(key) {
				if (this.password.length < 6) {
					this.password += key;
					if (this.password.length == 6) {
						console.log(this.password);
						let data={
							withdraw_pwd:this.password,
							money:this.money
						}
						this.$http.request({
							url: this.$api.moreShop.paywithdraw,
							method: 'POST',
							showLoading: true,
							data:data
						}).then(res => {
							if (res.code == 0) {
								this.password=''
								uni.navigateTo({
									url:'../audit/audit'
								})
							}else{
								this.$http.toast(res.msg);								
							}
						})
					}
				}
			},
			clear() {
				this.password = '';
			},
			close() {
				this.password = '';
				this.trantision = false;
				this.$emit('close', false);
			},
			del() {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			}
		}
	}
</script>

<style lang="scss">
	input {
		display: none;
	}
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		transition: all 0.3s ease;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		z-index: 2;
		visibility: visible;
	}
	.content {
		width: 588rpx;
		height: 570rpx;
		border-radius: 15rpx;
		position: fixed;
		left: 50%;
		top:35%;
		margin-left: -294rpx;
		margin-top: -285rpx;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		z-index: 2;
		opacity: 1;
		visibility: visible;
		transition: all 0.3s ease;
	}
	.contenthide {
		margin-left: -350rpx;
		margin-top: -340rpx;
		width: 700rpx;
		height: 680rpx;
		opacity: 0;
		z-index: 0;
		visibility: hidden;
	}
	.visible {
		opacity: 0;
		z-index: 2;
		visibility: hidden;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		width: 560rpx;
		font-size: 32rpx;
	}
	.center {
		color: #333;
		font-size: 32rpx;
	}
	.close {
		width: 50rpx;
		height: 50rpx;	
	}
	image {
		width: 100%;
		height: 100%;
	}
	.pay-money {
		width: 525rpx;
		height: 240rpx;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.pay-money view {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-way {
		width: 520rpx;
		height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #8A8A8A;
		font-size: 28rpx;
	}
	.money {
		font-size: 45rpx;
		font-weight: 600;
		margin-bottom: 50rpx;
	}
	.money text {
		font-size: 60rpx;
		margin-left: 10rpx;
	}
	.pay-img {
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-img image {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}
	.code {
		width: 100%;
		height: 120rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.code-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #d0d0d0;
	}
	.code-box-item {
		width: 86rpx;
		height: 86rpx;
		background: #fff;
		font-size: 40rpx;
		line-height: 75rpx;
		text-align: center;
	}
	.code-box-item:not(:last-child) {
		border-right: 1px solid #d0d0d0;
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #EBEBEB;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
</style>
