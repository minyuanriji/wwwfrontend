<template>
	<view class="hotelKnow_app">
		<view class="selectType">
			<view  v-for="(item,index) in list" :key='index' :class="seclectIndex==index?'active':'actove'" @click="select(index)">
				{{item}}
			</view>
		</view>
		<view class="detail">
			<image :src="img_url+'/hotel/konw1.png'" mode="widthFix" v-if="seclectIndex==0"></image>
			<image :src="img_url+'/hotel/konw1.png'" mode="widthFix" v-if="seclectIndex==1"></image>
			<image :src="img_url+'/hotel/konw1.png'" mode="widthFix" v-if="seclectIndex==2"></image>
			<image :src="img_url+'/hotel/konw1.png'" mode="widthFix" v-if="seclectIndex==3"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				seclectIndex:0,
				list:[
					'酒店亮点','预定须知','设施服务','周边信息'
				]
			};
		},
		methods:{
			select(index){ //选择type
				this.seclectIndex=index
			}
		}
	}
</script>

<style lang="less">
		.hotelKnow_app{width: 100%;overflow: hidden;}
		.selectType{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;background: #fff;
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);}
		.selectType view{width: 120rpx;height: 60rpx;text-align: center;line-height: 60rpx;font-size: 25rpx;border-radius: 15rpx;margin: 20rpx 0;}
		.active{background: #FF8F0B;color: #fff;}
		.actove{background: #F5F5F5;}
		.detail{width: 100%;overflow: hidden;margin-top: 20rpx;}
		.detail image{width:100% ;}
</style>
