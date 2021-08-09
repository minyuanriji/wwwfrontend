<template>
	<view class="giftbagDetail-app">
		<view class="tui-banner-swiper">
			<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210802/98d72971fdda19357649d7e0ab24a589.jpeg" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="time-money">
			<view class="time-money-left">
				<view style="height: 60rpx;line-height: 60rpx;">
					<text style="font-weight: bold;">￥</text>
					<text style="font-size: 48rpx;font-weight: bold;">0.02</text>
				</view>
				<view>
					<text style="font-size: 30rpx;color: #fff;width: 120rpx;background: #007AFF;line-height: 44rpx;text-align: center;border-radius: 30rpx;">拼团价</text>
					<text style="font-size: 28rpx;color: #fff;margin-left: 10rpx;">原价</text>
					<text style="font-size: 28rpx;color: #fff;text-decoration: line-through;">￥358</text>
				</view>
			</view>
			<view class="time-money-right">
				<view style="margin-top: 10rpx;">距离活动结束</view>
				<view>875天14时17分4秒</view>
			</view>
		</view>
		<view class="giftbag-title">
			<view style="width: 80%;color: #000;font-weight: bold;padding: 0 20rpx;font-size: 31rpx;border-right:1rpx solid rgb(238,238,238);">
				<text style="display: inline-block;;width: 120rpx;height: 50rpx;line-height: 48rpx;color: rgb(255,71,121);text-align: center;border: 1rpx solid rgb(255,71,121);border-radius: 30rpx;margin-right: 10rpx;">2人团</text>
				疯狂618节：原价358的双人海鲜套餐5人拼团只需59--机会仅此几天
			</view>
			<view style="width: 20%;font-size: 30rpx;">
				<image :src="img_url+'/new-share.png'" mode="" style="display: block;width: 50rpx;height: 50rpx;margin: 0 auto;"></image>
				<text style="display: block;width: 100%;text-align: center;color:rgb(255,71,83);">分享</text>
			</view>
		</view>
		<view class="giftbag-describe">
			5人成团即可59元获得原价358元双人海鲜套餐一份
			有<text style="background: rgb(217,217,217);color: #000;border-radius: 30rpx;display: inline-block;min-width: 90rpx;text-align: center;">1186</text>人浏览，
			<text style="background: rgb(221,82,77);color: #fff;border-radius: 30rpx;display: inline-block;min-width: 90rpx;text-align: center;">107</text>人参与
		</view>
		<view class="warm-prompt">
			<text style="display: block;color: rgb(255,71,83);padding-left: 10rpx;position: absolute;z-index: 99;background: #fff;right: 50rpx;top:-26rpx;height: 50rpx;border: 1rpx solid rgb(255,71,83);border-radius: 10rpx;text-align: center;line-height: 52rpx;">友情提示！</text>
			拼团发起后，<text style="color: rgb(255,68,0);">1小时内</text>完成<text  style="color: rgb(255,68,0);">2人</text>组团即拼团成功，否则拼团失败，拼团金额返回用户支付帐户
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
			<view class="package-content-item" v-for="item in 3" :key='item'>
				<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210802/98d72971fdda19357649d7e0ab24a589.jpeg" mode="widthFix"></image>
				<text>1.北极贝刺身1份；</text>
			</view>
		</view>
		<view class="Spell-group-records" v-if="selectIndex==1">
			<view class="Spell-group-records-header">
				<text style="color: #000;font-size: 30rpx;">最近拼团记录</text>
				<text style="float: right;font-size: 25rpx;min-width: 120rpx;background:rgb(0,122,255);height: 45rpx;line-height: 45rpx;color: #fff;text-align: center;
				margin-top: 20rpx;border-radius: 30rpx;">
					共107
				</text>
			</view>
			<view class="Spell-group-records-item" v-for="item in 3" :key='item'>
				<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/rKziaiauzDTSbziaDdBzNRZZ8c0vTL0IZRdicrf61aMtlCVm8xNQW2gicxQVhVmLQW9oxvWiclzLBh628D1Y73PuN46w/132" mode=""></image>
				<view style="width: 65%;">
					<text style="color: #000;font-size: 28rpx;margin: 5rpx 0;">周先生</text>
					<text style="color: rgb(255,153,0);font-size: 28rpx;">2021-08-05 10:37:12发起</text>
				</view>
				<!-- <view style="width: 65%;">
					<view style="float: left;width: 45%;height: 100%;line-height: 100rpx;font-size: 28rpx;color: #000;
					overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding-left: 5rpx;
					">周先生</view>
					<view style="float: right;">
						<view style="font-size: 25rpx;margin: 10rpx 0;">
							还差<text style="display: inline-block;color: red;">1</text>人就可以完成拼团
						</view>
						<text style="font-size: 25rpx;text-align: right;">
							2小时59分12秒
						</text>
					</view>
				</view> -->
				<view>
					<text style="width: 120rpx;margin-top: 30rpx;height: 45rpx;font-size: 25rpx;line-height: 45rpx;text-align: center;background: rgb(76,217,100);color: #fff;border-radius: 30rpx;">
						已完成
					</text>
				</view>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
			</view>
		</view>
		<view class="Spell-group-polite" v-if="selectIndex==2">
			<view class="Spell-group-polite-header">
				发起拼团可得以下礼品：
			</view>
			<view class="Spell-group-polite-item" v-for="item in 3" :key=''>
				<view class="Spell-group-polite-item-detail">
					<image src="http://yingmlife-1302693724.cos.ap-guangzhou.myqcloud.com/uploads/images/original/20210802/98d72971fdda19357649d7e0ab24a589.jpeg" class="logo"></image>
					<view class="Spell-group-polite-item-detail-price">
						<view class="Spell-group-polite-item-detail-price-num">
							<text style="font-size: 45rpx;font-weight: bold;">￥21</text>
							<text style="font-size: 30rpx;">x11</text>
						</view>
						<view class="Spell-group-polite-item-detail-name">
							果汁
						</view>
					</view>
				</view>
				<view class="Spell-group-polite-item-title">
					<view style="font-size: 30rpx;color: #000;font-weight: bold;">
						<image :src="img_url+'/dao_location.png'"  mode=""></image>
						<text>亚马逊食人鱼</text>
					</view>
					<view style="font-size: 30rpx;color: #000;">
						<image :src="img_url+'/cell-phone_new.png'" mode=""></image>
						<text>18888888888</text>
					</view>
				</view>
				<view class="Spell-group-polite-item-describe">
					到店核销领取
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-back" @click="back">
				<image :src="img_url+'/new_bac.png'" mode=""></image>
				<text>返回</text>
			</view>
			<view class="bottom-order" @click="order">
				<image :src="img_url+'/new_ord.png'" mode=""></image>
				<text>订单</text>
			</view>
			<view class="bottom-buy">
				<view style="background: rgb(253,188,2);width: 50%;height: 85rpx;margin-top: 25rpx;border-radius: 50rpx 0 0 50rpx;">
					<text style="font-size: 30rpx;font-weight: bold;">￥358</text>
					<text style="font-size: 28rpx;">单独购买</text>
				</view>
				<view style="background: rgb(255,71,83);width: 50%;height: 85rpx;margin-top: 25rpx;border-radius: 0 50rpx 50rpx 0;">
					<text style="font-size: 30rpx;font-weight: bold;">￥0.02</text>
					<text style="font-size: 28rpx;">我要开团</text>
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="less" scoped>
	.giftbagDetail-app{width: 100%;overflow: hidden;}
	.tui-banner-swiper{width: 100%;overflow: hidden;position: relative;}
	.tui-banner-swiper image{display: block;width: 100%;}
	.time-money{width: 100%;height: 140rpx;padding: 10rpx 20rpx;background: rgb(255,71,83);display: flex;justify-content: space-between;}
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
	.Spell-group-records{width: 95%;overflow: hidden;margin: 0 auto 150rpx;}
	.Spell-group-records-header{width: 100%;height: 80rpx;line-height: 80rpx;}
	.Spell-group-records-header text{display: inline-block;}
	.Spell-group-records-item{width: 100%;height: 140rpx;padding: 20rpx 0;display: flex;justify-content: space-evenly;border-top: 1rpx dashed rgb(221,221,221);}
	.Spell-group-records-item image{display: block;width: 100rpx;height: 100rpx;border-radius: 50%;}
	.Spell-group-records-item view text{display: block;}
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	.bottom{width: 100%;height: 120rpx;padding: 0 20rpx;background: #fff;position: fixed;left: 0;bottom: 0;z-index: 999s;display: flex;justify-content: space-evenly;}
	.bottom view image{width: 50rpx;height: 50rpx;display: block;margin: 15rpx auto 5rpx;}
	.bottom-back,.bottom-order{width: 20%;text-align: center;font-size: 29rpx;}
	.bottom-buy{display: flex;justify-content: space-between;width: 60%;}
	.bottom-buy text{display: block;text-align: center;color: #fff;}
</style>


<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				selectIndex:0,//table选项
				table:['活动介绍','拼团记录','拼团有礼']
			}
		},
		methods:{
			select(index){ //table切换
				this.selectIndex=index
			},
			back(){ //点击返回按钮
				uni.navigateBack({
					delta:1
				})
			},
			order(){ //点击订单按钮
				uni.navigateTo({
					url:'../orderList/orderList'
				})
			}
		}
	}
</script>