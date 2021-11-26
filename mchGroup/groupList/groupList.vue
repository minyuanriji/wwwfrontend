<template>
	<view class="groupList-app">
		<view class="groupList" style="margin-bottom: 80rpx;">
			<view class="groupList-item" v-for="(item,index) in groupList" :key='index' >
				<image :src="item.cover_url" mode="" class="itemLogo"></image>
				<view class="groupList-item-info" style="width:490rpx;">
					<view>
						<view class="groupList-item-title">
							{{item.name}}
						</view>
						<view class="groupList-item-detail">
							<view>{{item.province}} {{item.city}} {{item.district}}</view>
							<view>广东省广州市荔湾区花地大道中228号</view>
						</view>
					</view>
					<view class="groupList-item-btn" style="">
						<text style="font-size: 30rpx;">{{item.mobile}}</text>
						<text @click="manaStore(item)">进入管理</text>
					</view>
				</view>
			</view>		
		</view>
		<view class="no-more" v-if="groupList.length==0">
			<image :src="img_url+'/giftOrder_logo.png'" mode=""></image>
			<text>暂无店铺</text>
		</view>
		<view @click="groupAdd" class="add-item-button">添加门店</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url: this.$api.img_url,
				groupList:[],
				page_count:"",
				form:{
					page:1,
				}
			};
		},
		onLoad() {
			this.getGroupList()
		},
		methods:{
			manaStore(item){
				uni.setStorageSync('x-man-mch-id',item.mch_id)							
				uni.navigateTo({
					url:'../../mch/personalCentre/personalCentre'
				})
			},
			getGroupList(){//获取订单列表
				this.$http.request({
					url: this.$api.merchants.groupItemList,
					method: 'POST',
					data: this.form,
					showLoading: true
				}).then(res => {
					if(res.code==0){
						if(res.data.list.length==0)
							return false
						let list = res.data.list;
						var arr = this.groupList.concat(list)
						this.groupList = arr
						this.page_count = res.data.pagination.page_count;
					}else{
						this.$http.toast(res.msg);
					}
				});
			},
			groupAdd(){
				uni.navigateTo({
					url:'../groupAdd/groupAdd'
				})
			}
		},
		onReachBottom() {
			if(this.form.page==this.page_count){
				return false;
			} 		
			this.form.page=this.form.page+1
			this.getGroupList();
		},
	}
</script>

<style lang="less">
	.groupList-app{width: 100%;overflow: hidden;padding-bottom:80rpx;}
	.no-more{width: 200rpx;height: 280rpx;position: absolute;top: 0;left: 0;right: 0;margin: auto;bottom: 0;
	font-size: 26rpx;text-align: center;color: #808080;}
	.no-more image{width: 200rpx;height: 200rpx;}
	.groupList-item{width: 98%;overflow: hidden;display: flex;justify-content: flex-start;margin: 10rpx auto;padding: 20rpx 20rpx;
	background: #FFFFFF;box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);border-radius: 20rpx;}
	.groupList-item-info{display: flex;flex-direction: column;padding-left:20rpx;justify-content: space-between;}
	.itemLogo{width: 200rpx;height: 200rpx;}
	.groupList-item-title{font-size: 30rpx;color: #000;font-weight: bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.groupList-item-detail{font-size: 25rpx;margin: 10rpx 0;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
	.groupList-item-btn{display:flex;justify-content: space-between;}
	.groupList-item-btn > text:nth-of-type(2){padding:0 30rpx;display: inline-block;text-align: center;background: #FF5A0E;border-radius: 30rpx;font-size: 30rpx;height: 60rpx;line-height: 60rpx;color: #fff;}

	.add-item-button{color:white;position: fixed;width:100%;left:0;bottom:0;height:120rpx;line-height:120rpx;text-align:center;background:#ff5a0e;}
</style>

