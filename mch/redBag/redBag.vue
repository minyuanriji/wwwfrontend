<template>
	<view class="income-root">
		<!-- #ifdef H5 -->
			<view class="income-root-header" style="width: 100%;overflow: hidden;position: fixed;top: 88rpx;left: 0;">
		<!--#endif -->
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
			 <view class="income-root-header" style="width: 100%;overflow: hidden;position: fixed;top: 0;left: 0;">
		 <!--#endif -->
			<view class="pick-time">
				<view class="pick-time-detail">
					<picker mode="date" :value="date"  @change="bindDateChange" fields='month'>
					    <view class="uni-input">{{date}}</view>
					 </picker>
					<image :src="img_url+'/upstrong.png'" mode=""></image>
					<view style="font-size: 25rpx;color: #A0A0A0;">
						<text style="margin-right: 20rpx;">收入：{{detailed_count.income}}</text>
						<text>支出：{{detailed_count.expenditure}}</text>
					</view>
				</view>
				<view style="float: right;height: 85rpx;margin-right: 20rpx;" @click="reset">
					<text style="display: block;width: 100rpx;height: 60rpx;background:#FF7104;text-align: center;line-height: 60rpx;
					margin-top: 25rpx;color: #fff;border-radius: 15rpx;">重置</text>
				</view>
				<view style="float: right;height: 85rpx;margin-right: 30rpx;" @click="screening">
					<text style="display: block;width: 100rpx;height: 60rpx;background:#FF7104;text-align: center;line-height: 60rpx;
					margin-top: 25rpx;color: #fff;border-radius: 15rpx;">筛选</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 130rpx;margin-bottom: 50rpx;">
			<view class="detail-box" v-for="(item,index) in list" :key='index'>
				<view class="detail-item-box">
					<view class="price flex flex-x-between">
						<view v-if="item.type==1">收入：<text :style="{color: '#FF7104'}">{{item.integral}}</text></view>
						<view v-if="item.type==2">支出：<text :style="{color: '#FF7104'}">{{item.integral}}</text></view>
						<view>剩余红包： <text :style="{color: '#FF7104'}">{{item.current_integral}}</text> </view>
					</view>
					<view class="explanation">
						说明：{{item.desc}}
					</view>
					<view class="time">{{item.created_at}}</view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0" class="nothing">没有更多记录~</view>
		<unipopup ref="popup" type="top">
			<view class="popup-detail">
				<view class="popup-detail-header">
					请选择收益类型
				</view>
				<view class="popup-detail-list">
					<view :class="selectIndex==index?'active':''" v-for="(item,index) in incomeList" :key='index'  @click="select(index,item.type)">
						{{item.name}}
					</view>
				</view>
			</view>
		</unipopup>
	</view>
</template>

<script>
	import unipopup from '@/components/uni-popup/uni-popup';
	export default {
		components: {
			unipopup
		},
		data() {
			return {
				img_url: this.$api.img_url,
				list: [],
				// status: 0,
				page: 1,
				page_count:'',
				textColor: '',
				date: "全部",
				popup:false,
				incomeList:[
					{
						name:'全部',
						type:''
					},
					// {
					// 	name:'大礼包订单',
					// 	type:'giftpacks_order'
					// },
					// {
					// 	name:'大礼包拼单',
					// 	type:'giftpacks_group_payorder'
					// },
					// {
					// 	name:'话费充值退款',
					// 	type:'addcredit_refund'
					// },
					// {
					// 	name:'话费充值',
					// 	type:'addcredit'
					// },
					{
						name:'商品购买',
						type:'record'
					},
					{
						name:'商品订单退款',
						type:'order_refund'
					},
					{
						name:'酒店订单',
						type:'hotel_order'
					},
					{
						name:'酒店退款单',
						type:'hotel_order_refund'
					},
					// {
					// 	name:'管理员操作',
					// 	type:'admin'
					// },
					// {
					// 	name:'大礼包拼单取消退款',
					// 	type:'giftpacks_group_pay_order_refund'
					// },
				],
				selectIndex:0,
				created_at:'',//时间
				source_type:'',//类型
				detailed_count:{
					income:0,
					expenditure:0
				},
			};
		},
		onLoad() {
			if (uni.getStorageSync('mall_config')) {
				this.textColor = this.globalSet('textCol');
			}
			this.getList()
		},
		methods: {
			bindDateChange: function(e) { //点击选择年月
				let time=e.target.value		
			    this.date = time.split('-')[0]+'年'+time.split('-')[1]+'月'
				this.page=1
				this.list=[]
				this.page_count=''
				this.created_at=this.date
				this.getList()
			},		
			getList() {
				this.$http.request({
					url: this.$api.default.getredbagList,
					data: {
						page: this.page,
						created_at:this.created_at,
						source_type:this.source_type,
						// status: '',
					},
					showLoading: true,
				}).then((res) => {
					if (res.code == 0) {
						this.detailed_count=res.data.detailed_count
						if (res.data.list.length == 0) return false
						let list = res.data.list
						var arr = this.list.concat(list)
						this.list = arr
						this.page_count = res.data.pagination.page_count
					} else {
						this.$http.toast(res.msg);
					}
				})
			},
			screening(){ //点击筛选
				this.$refs.popup.open()
			},
			select(index,type){//点击筛选选择
				this.$refs.popup.close()
				this.selectIndex=index
				this.page=1
				this.list=[]
				this.page_count=''
				if(this.date=='全部'){
					this.created_at=''
				}else{
					this.created_at=this.date
				}
				this.source_type=type
				this.getList()
			},
			reset(){
				this.page=1
				this.list=[]
				this.date="全部",
				this.page_count=''
				this.created_at=''
				this.source_type=''
				this.selectIndex=0
				this.getList()
			}
		},
		onReachBottom: function(e) {
			if (this.page == this.page_count) {
				return
			}
			this.page = this.page + 1
			this.getList();
		},
	}
</script>

<style lang="scss" scoped>
	.detail-box {
		padding: 0 30rpx;

		.detail-item-box {
			background: #FFFFFF;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 30rpx 20rpx;

			.time {
				border-top: 1px solid #F3F3F3;
				padding-top: 16rpx;
				line-height: 50rpx;
			}

			.price {
				padding: 0 0 16rpx 0;
				border-bottom: 1px solid #F3F3F3;
			}

			.explanation {
				font-size: 30rpx;
				padding: 16rpx 0 16rpx 0;
			}
		}
	}
	.nothing {
		padding-top: 200rpx;
		text-align: center;
		letter-spacing: 1px;

	}
	.income-root{width: 100%;overflow: hidden;}
	.pick-time{width: 100%;height: 110rpx;background: rgb(244,244,244);}
	.pick-time-detail{width: 420rpx;height: 60rpx;float: left;margin: 20rpx 30rpx;border-radius: 15rpx;font-weight: bold;color: #000;position: relative;}
	.pick-time-detail image{display: block;width: 36rpx;height: 36rpx;position: absolute;top: 7rpx;left: 185rpx;}
	.popup-detail{width: 100%;background: #fff;min-height: 400rpx;border-radius: 0 0 20rpx 20rpx;padding-bottom: 30rpx;}
	.popup-detail-header{width: 100%;height: 80rpx;line-height: 80rpx;padding: 0 20rpx;font-size: 30rpx;color: #000;font-weight: bold;}
	.popup-detail-list{width: 100%;overflow: hidden;margin-bottom: 30rpx;}
	.popup-detail-list view{min-width: 180rpx;height: 70rpx;line-height: 70rpx;text-align: center;
	float: left;margin: 20rpx 0rpx 0 50rpx;border-radius: 10rpx;font-size: 26rpx;font-weight: bold;}
	.active{background: rgb(222,59,45);color: #fff;}
</style>

