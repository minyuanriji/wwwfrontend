<template>
	<view class="app" v-if="diy && diy.id">
		<!-- <com-nav-bar left-icon="back" :title="diy.name" @clickLeft="back"></com-nav-bar> -->
		
		<diy-container :diy-data="item" v-for="(item,i) in diy.template.data" :key="i" :title='title'></diy-container>

		<!-- <view class="navbars" :style="{background:navbarData.background}">
			<view class="navbars-box">
				<view class="navbars-item" v-for="(item,index) in navbars" :key='index' @tap="switchNav(index,item.nav_id)" :style="{color:switchIndex == index?navbarData.active_color:navbarData.color}">
					<view>
						<image v-show="switchIndex == index" class="navbars-item-img" :src="item.nav_pic_active" mode=""></image>
						<image v-show="switchIndex != index" class="navbars-item-img" :src="item.nav_pic" mode=""></image>
					</view>
					<view class="navbars-item-text">{{item.name}}</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diy: {},
				navbars: '',
				navbarData: '',
				switchIndex: 0,
				pageId: 0,
				templateId: 0,
				nav_id:11,
				title:''
			}
		},
		onLoad(options) {
			if (options.page_id) {
				this.switchIndex = options.page_id;
				this.getData(this.switchIndex);
			} else {
				this.getData(0);
			}
		},
		methods: {
			switchNav(index, id) {
				this.switchIndex = index;
				uni.redirectTo({
					url: `/pages/index/diy-demo?switchIndex=${this.switchIndex}`
				});
				
			},
			getData(index) {
				this.$http.request({
					url: this.$api.plugin.diy.page.detail,
					showLoading: true,
					data: {
						id: index
					}
				}).then(res => {
					//console.log(res.data);
					this.$set(this, "diy", res.data.navs[0]);
					this.navbarData = res.data;
					this.navbars = res.data.navbars;
					this.title=res.data.title
					uni.setNavigationBarTitle({
					    title: res.data.title
					});
				}).catch(err => {
					console.log(err);
				})
			},
			back(){
				this.navBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbars {
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		width: 100%;
		z-index: 9999;
		padding: 10rpx 0;
		border-top: 2rpx solid #F3F3F3;

		.navbars-box {
			display: flex;
			align-items: center;
			justify-content: space-around;

			.navbars-item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.navbars-item-img {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 4rpx;
			}

			.navbars-item-text {
				line-height: 30rpx;
				font-size: 9pt;
			}
		}
	}
</style>
