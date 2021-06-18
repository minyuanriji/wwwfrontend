<template>
	<view class="examine_app">
		<view class="search">
			<input type="search" value="" placeholder="关键字搜索 店铺名、手机号"/>
			<view class="search_check">
				搜索
			</view>
		</view>
		<view class="examine-status">
			<view v-for="(item,index) in status" :key='index' @click="swichIndex(index,item.review_status)"
			:class="statusIndex==index?'active':''">
				{{item.title}}
			</view>
		</view>
		<view class="examine-list">
			<view class="examine-item">
				<view class="examine-item-title">
					<view class="examine-item-title-name">
						早点见面
					</view>
					<view class="examine-item-title-name-time-status">
						<text></text>
						<text>待审核</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:[
					{
						title:'待审核',
						review_status:0
					},
					{
						title:'通过',
						review_status:1
					},
					{
						title:'未通过',
						review_status:2
					}
				],
				statusIndex:'',
			};
		},
		methods:{
			swichIndex(index,review_status){ //选择状态
				this.statusIndex=index
			}
		}
	}
</script>

<style lang="less">
	.examine_app{width: 100%;overflow: hidden;}
	.search{overflow: hidden;width: 600rpx;margin: 0 auto;}
	.search input{width: 500rpx;height: 70rpx;display: inline-block;margin: 35rpx 0;border-radius: 30rpx 0 0 30rpx;
	padding-left: 30rpx;font-size: 26rpx;background: rgb(242, 242, 242);float: left;}
	.search_check{float: left;margin: 35rpx 0;display: inline-block;font-size: 28rpx;color: #000;border-radius: 0 30rpx 30rpx 0;
	background:rgb(255, 113, 4) ;height: 68rpx;width: 100rpx;text-align: center;line-height: 68rpx;color: #fff;}
	.examine-status{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;background: #fff;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3)}
    .examine-status view{height: 60rpx;margin: 10rpx 0;font-size: 30rpx;}
	.active{color: #ff7104;border-bottom: 4rpx solid #ff7104;}
	.examine-list{width: 100%;overflow: hidden;}
	.examine-item{width: 80%;height: 300rpx;background: #fff;margin: 20rpx auto;border-radius: 20rpx;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);padding: 10rpx;}
</style>

