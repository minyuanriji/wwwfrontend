<template>
	<view class="oilrecord-container">
		<view class="oilrecord_type">
			<view v-for="(item,index) in type" :key='index' style="width: 25%;text-align: center;" @click="selectType(index)">
				<text style="display: inline-block;width: 60%;height: 80rpx;margin-top: 10rpx;line-height: 80rpx;" :class="selectIndex==index?'active':''">{{item}}</text>
			</view>
		</view>
		<view class="oilrecord_list">
			<view class="oilrecord_item" v-for="(item,index) in 6" :key='index'>
				<view style="display: flex;justify-content: space-evenly;flex-wrap: wrap;width: 70%;">
					<text style="display: block;width: 100%;margin-bottom: 10rpx;font-size: 30rpx;">观看视频20分钟</text>
					<text style="display: block;width: 100%;font-size: 26rpx;">2018-11-12 12:10:00</text>
				</view>
				<view style="width: 30%;text-align: right;">
					<text>+10</text>
					<text>积分</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:["办理中","已完成","已撤销","全部"],
				selectIndex:0,
			}
		},
		onLoad() {
		
		},
		methods:{
			selectType(index){ //table选择状态
				this.selectIndex=index
			}
		}
	}
</script>

<style lang="less" scoped>
	.oilrecord-container{width: 100%;overflow: hidden;}
	.oilrecord_type{width: 100%;height: 100rpx;background: #fff;display: flex;justify-content: space-evenly;}
	.active{color:rgb(37,130,234) ;border-bottom: 4rpx solid rgb(37,130,234);}
	.oilrecord_list{width: 100%;overflow: hidden;}
	.oilrecord_item{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;padding: 30rpx ;background: #fff;}
</style>
