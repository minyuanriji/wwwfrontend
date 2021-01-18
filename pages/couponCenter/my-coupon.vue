<template>
	<view class="app">
		<view class="app-header">
			<view class="tui-mtop">
				<tui-tabs :tabs="tabs" :currentTab="currentTab" selectedColor="#EB0909" sliderBgColor="#EB0909" @change="change" itemWidth="33.3333%"></tui-tabs>
			</view>
		</view>
		<view class="app-body">
			<view class="coupon-items">
				<view class="item" v-for="(item,i) in coupons" :key="i">
					<view class="state">
						<view class="pic">
							<span class="dot">¥</span>
							<span class="money">{{item.pic}}</span>
						</view>
						<span class="text">{{item.msg}}</span>
					</view>
					<view class="desc">
						<view class="text">{{item.text}}</view>
						<view class="interval">
							<span>{{timeFormat(item.startTime)}}</span>
							-
							<span>{{timeFormat(item.endTime)}}</span>
						</view>
					</view>
					<view class="use">
						<tui-button type="warning" width="120rpx" height="70rpx" :size="24">立即使用</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view class="app-footer flex flex-y-center flex-x-center" @tap="navTo">
			<view>领取更多优惠券 </view>
			<image class="app-footer-icon" src="/static/images/icon/arrow-down.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import tuiButton from "@/components/extend/button/button"
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	export default {
		components: {
			tuiTabs,
			tuiButton
		},
		data() {
			return {
				currentTab: 0,
				tabs: [{
					name: "未使用"
				}, {
					name: "已使用"
				}, {
					name: "已过期"
				}],
				coupons:[
					{
						id: 1,
						text: "仅限demo旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"3",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 2,
						text: "仅限test旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"5",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					},{
						id: 3,
						text: "仅限xxx旗舰店指定商品使用",
						msg: "无门槛",
						pic:　"2",
						startTime: 1587438000000,
						endTime: 1587610800000
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
			timeFormat(date){
				return moment(date).format("YYYY-MM-DD");
			},
			navTo(){
				uni.navigateTo({
					url:'/pages/couponCenter/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.app-header{
	
}
.app-body{
	
	padding: 24rpx 28rpx;
	.coupon-items{
		
		.item{
			background-color: #FFFFFF;
			margin-bottom: 24rpx;
			display: flex;
			height: 240rpx;
			align-items: center;
			
			.state{
				
				flex-basis: 160rpx;
				display: flex;				flex-direction: column;
				align-items: center;
				
				.pic{
					color: #E2A356;
					
					.dot{
						font-size: 11pt;
					}
					.money{
						font-size: 15pt;
					}
				}
				
				.text{
					color: #CFAC4C;
					font-size: 9pt;
				}
			}
			
			.desc{
				flex: 1;
				
				.text{
					font-size: 11pt;
				}
				.interval{
					margin-top: 20rpx;
					font-size: 9pt;
				}
			}
			
			.use{
				flex-basis: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}

.app-footer{
	position: fixed;
	bottom: 0px;
	background: #FFFFFF;
	width: 100%;
	text-align: center;
	padding: 26rpx 0;
	border-top: 1px solid #e8e0e0;
	z-index: 9;
	font-size: 12pt;
	
	.app-footer-icon{
		width: 30rpx;
		height: 30rpx;
		transform: rotate(-90deg);
		margin-top: 4rpx;
	}
}
</style>
