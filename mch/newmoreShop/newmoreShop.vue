<template>
	<view class="more-shop">
		<com-nav-bar left-icon="back" :title="title" @clickLeft="back"></com-nav-bar>
		
		
		<!--
		<view v-if="result == 1" class="success_message">
		<view v-if="result == 2" class="faile_message" >
			
			<view class="faile_message_title">
				<view style="font-size: 42rpx;font-weight: bold;margin-bottom:10rpx;">出错啦</view>
				{{msg}}
			</view>
		</view>
		-->
		
		<view v-if="status == 'success'" style="text-align: center;color:green;margin-top:100rpx;">
			<text class="iconfont icon-dagou3" style="font-size:190rpx;"></text>
			<view style="font-size:60rpx;">核销成功</view>
		</view>
		
		<view v-if="status == 'fail'" style="text-align: center;color:red;margin-top:100rpx;">
			<text class="iconfont icon-gantan" style="font-size:130rpx;"></text>
			<view style="font-size:60rpx;">核销失败</view>
		</view>
		
		<view v-if="status == 'invalid'" style="text-align: center;color:red;margin-top:100rpx;">
			<text class="iconfont icon-gantan" style="font-size:130rpx;"></text>
			<view style="font-size:60rpx;">订单不存在</view>
		</view>
		
		<view v-if="status == 'normal'">
			
			<view style="background:white;margin-top:20rpx;padding:20rpx;color:#333;">
				<view style="border-bottom:1px solid #ddd;padding-bottom:10rpx;">产品信息</view>
				<view style="display:flex;margin-top:10rpx;padding:15rpx;">
					<image style="width:200rpx;height:140rpx;" src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20211105/7fd259a7bcb71a96832c12d739883249.jpg" mode="aspectFill"></image>
					<view style="padding-left:20rpx;display:flex;flex-direction:column;justify-content:space-around">
						<view style="font-size: 26rpx;">
							凭此卡到店享78元经络点穴推拿 并送500元会员卡（每次消费抵扣20元）
						</view>
						<view style="color:red;">100.00元</view>
					</view>
				</view>
			</view>
			
			<view style="background:white;margin-top:20rpx;padding:20rpx;color:#333;">
				<view style="border-bottom:1px solid #ddd;padding-bottom:10rpx;">产品类型</view>
				<view style="display:flex;margin-top:10rpx;font-size: 26rpx;padding:15rpx;">
					本地生活|店内产品
				</view>
			</view>
			
			
			<view style="background:white;margin-top:20rpx;padding:20rpx;color:#333;">
				<view style="border-bottom:1px solid #ddd;padding-bottom:10rpx;">状态</view>
				<view style="display:flex;margin-top:10rpx;font-size: 26rpx;padding:15rpx;">
					剩余1次，永久有效
				</view>
			</view>
			<view style="height:130rpx;line-height:130rpx;font-size:40rpx;color:white;text-align:center;width:100%;background:#ff7104;position:absolute;left:0rpx;bottom:0rpx;">确认核销</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				img_url: this.$api.img_url,
				id:'',
				title:'产品核销',
				msg:'',
				result: 0,
				status: 'fail' //invalid|success|fail|normal
			}
		},
		onLoad(options) {
			
			this.beforeOnLoad(options);
			
			let that=this
			
			/*
			// #ifdef H5
			that.id=options.id
			// #endif
			
			uni.showLoading({
			    title: '核销中'
			});
			that.$http.request({
				url: that.$api.default.verificationProgress,
				method: 'POST',
				data: {
					id:options.id,
				}
			}).then(res => {
				uni.hideLoading();
				if(res.code==0){
					that.result = 1;
				}else{
					that.result = 2;
					that.msg=res.msg
				}
			})*/
		},
		methods: {
			gointo(){
				uni.navigateTo({
					url:'../personalCentre/accountingOrder/accountingOrder'
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../../plugins/font-icon/iconfont1.css");
	.more-shop{width: 100%;height: 100%;}
	.success_message_goods {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background: #81d8d0;
		.success_message_goods-img {
			width: 180rpx;
			height: 180rpx;
			display: block;
			flex-shrink: 0;
		}
	
		.success_message_goods-center {
			flex: 1;
			padding: 20rpx;
			box-sizing: border-box;
		}
	}	
	.success_message_goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 9pt;
		line-height: 32rpx;
	}	
	.jx-goods-attr {
		font-size: 9pt;
		color: #888888;
		line-height: 32rpx;
		padding-top: 36rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}	
	.success_message_goods-price-right {
		text-align: right;
		font-size: 9pt;
		color: #999999;
		line-height: 30rpx;
		padding-top: 20rpx;	
		.price {
			margin-bottom: 20rpx;
		}	
		.num {
			margin-top: 30rpx;
			font-weight: bold;
			color: #000;
		}
	}
	.account-code{width: 100%;height: 100rpx;line-height: 100rpx;text-align: center;color: #000;}
	.success_logo{width: 200rpx;height: 200rpx;margin: 0 auto;}
	.success_logo image{width: 200rpx;height: 200rpx;display: block;margin-top: 50rpx;}
	.success_message_title{width: 100%;overflow: hidden;font-size: 42rpx;color: #000;font-weight: bold;text-align: center;}
	.success_message{width: 100%;height: 100%;background: url(../../plugins/images/success_back.jpg)no-repeat;background-size: cover;}
	.sure_btn{width: 60%;height: 80rpx;margin: 30rpx auto;text-align: center;background: #81d8d0;
	border-radius: 15rpx;outline: none;border: none;line-height: 80rpx;color: #fff;font-weight: bold;}
	
	.zhanwei{width: 100%;height: 100rpx;}
	.faile_message{width: 100%;height: 100%;text-align:center;background:#F7F7F7;padding-top:50rpx;}
	.faile_message_title{margin-left:20%;border:1px solid #C90A0C;border-radius: 30rpx; padding-top:30rpx;padding-bottom:30rpx;width: 60%;text-align: center;color:#C51A15;}


</style>
