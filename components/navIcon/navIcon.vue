<template>
	<view class="navIconBox" :style="{'background':background,'color':textColor}">
		
		<view class="flex list" v-if="listNums == 3">
			<view v-for="(item,index) in list" :key='index' class="tui-col-4 listBox">
				<view class="listBox_nav flex flex-col flex-y-center flex-x-center" @tap="navTo(item.url,item.name)">
					<image class="listImg" :src="item.icon" mode=""></image>
					<view class="navName" :style="{color: textColor}">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="flex list" v-if="listNums == 4">
			<view v-for="(item,index) in list" :key='index' class="tui-col-3 listBox">
				<view class="listBox_nav flex flex-col flex-y-center flex-x-center" @tap="navTo(item.url,item.name)">
					<image class="listImg" :src="item.icon" mode=""></image>
					<view class="navName" :style="{color: textColor}">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="flex list" v-if="listNums == 5">
			<view v-for="(item,index) in list" :key='index' class="listBox listBox5">
				<view class="listBox_nav flex flex-col flex-y-center flex-x-center" @tap="navTo(item.url,item.name)">
					<image class="listImg" :src="item.icon" mode=""></image>
					<view class="navName" :style="{color: textColor}">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navIcon",
		props: {
			list: {
				type: Array,
				default: ()=>[]
			},
			background: {
				type: String,
				default: '#ffffff'
			},
			textColor: {
				type: String,
				default: '#000000'
			},
			listNums: {
				type: Number,
				default: 1
			},
			rowNums: {
				type: Number,
				default: 1
			},
			url: {
				type: String,
				default: ''
			},
		},
		methods:{
			navTo(url,title){
				if(title == '直播专区'){
					console.log(url);
					uni.navigateTo({
						url:'/pages/live/live'
					})
					return false;
				}
				if (url) {
					if (url.split('=')[0] == '/pages/web/web?url') {
						//#ifdef H5
						window.location.href = decodeURIComponent(url.split('=')[1]);
						//#endif
						
						//#ifdef MP-WEIXIN
							uni.navigateTo({
								url:'/pages/webview/webview?url=' + url.split('=')[1]
							})
						//#endif
						
					}else if(url.split('=')[0] == 'tel?tel'){
						uni.makePhoneCall({
						    phoneNumber: url.split('=')[1], 
							success: (res)=>{
								this.$http.toast('打电话回调成功！')
							}
						});
					}else{
						uni.navigateTo({
							url
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/style/thorui.css';
	.list{
		flex-wrap: wrap;
		overflow: hidden;
		display: flex;
		padding: 10rpx 0;
	}
	.listBox{
		height: 140rpx;
		text-align: center;
		// flex: 1;
	}
	.listBox_nav{
		width: 100%;
		height: 100%;
	}
	.listImg {
		width: 84rpx;
		height: 84rpx;
		margin-bottom: 6rpx;
	}
	.navName{
		font-size: 24rpx;
	}
	.listBox5{
		width: 150rpx;
		// width: 142rpx;
	}
</style>
