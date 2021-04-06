<template>
	<view class="app">
		<!--header-->
		<view class="app-header-box"><com-nav-bar @clickLeft="back" left-icon="back" title="账户明细" :status-bar="true"></com-nav-bar></view>
		<!--header-->
		<view class="tabble">
			<text @click="tabbleCheck(1)" :class="switchIndex==1?'active':''">收入</text>
			<text @click="tabbleCheck(2)" :class="switchIndex==2?'active':''">支出</text>
		</view>
		<view class="items" v-if="dataList && dataList.length">
			<view class="item" v-for="(item, i) in dataList" :key="i">
				<view class="item-left">
					<view class="desc margin-bottom text-12-pt">{{ item.desc }}</view>
					<view class="date-time text-10-pt">{{ item.format_date }}</view>
				</view>
				<view class="item-right">
					<view class="update margin-bottom text-12-pt" :style="{color:item.type == 1 ?textColor:''}">{{ updateStatus(item.type, item.money) }}</view>
				</view>
			</view>
		</view>
		<view class="items" v-else><main-nomore text="暂无记录" :visible="true" bgcolor="transparent"></main-nomore></view>

		<!--加载loadding-->
	<!-- 	<main-loadmore :visible="loadding" :index="3" type="red"></main-loadmore> -->
		<!-- 没有更多了-->
		<main-nomore :visible="!pullUpOn" bgcolor="#FFFFFF"></main-nomore>
		<!-- 正在加载 -->
	<!-- 	<main-loading :visible="loading"></main-loading> -->
		<!--加载loadding-->
	</view>
</template>

<script>
// const _status = 'refresh';
export default {
	data() {
		return {
			pullUpOn: true,
			loadding: false,
			dataList: [],
			page:1,
			type:'in',//in收入，out支出
			textColor:'#bc0100',
			page_count:'',
			switchIndex:1,
		};
	},
	onLoad() {
		if(uni.getStorageSync('mall_config')){
			this.textColor = this.globalSet('textCol');
		}
		this.getDateList();
	},
	methods: {
		back() {
			this.navBack();
		},
		updateStatus(type, data) {
			return type == 1 ? `+${data}` : `-${data}`;
		},
		getDateList() {	
			// this.loadding=true
			this.$http
				.request({
					url: this.$api.moreShop.getaccountList,
					method: 'POST',
					data: {
						page:this.page,
						type:this.type
					},
					showLoading: true,
				})
				.then(res => {
					if (res.code === 0) {
						if(res.data.list.length==0)return false
						let list= res.data.list;
						var arr=this.dataList.concat(list)
						this.dataList =arr
						this.page_count= res.data.pagination.page_count;
						this.pullUpOn = true;
					}
				});
		},
		tabbleCheck(index){
			this.switchIndex=index
			if(index==1){
				// this.loadding=false,
				this.pullUpOn=true,
				this.dataList=[],
				this.pages=1
				this.type='in'
				this.getDateList();
			}
			if(index==2){
				// this.loadding=false,
				this.pullUpOn=true,
				this.dataList=[],
				this.pages=1
				this.type='out'
				this.getDateList();
			}
		}
	},
	onPullDownRefresh() {
		setTimeout(() => {
			uni.stopPullDownRefresh();
			this.getDateList();
		}, 1000);
	},
	onReachBottom() {
		this.loadding = true;
		this.pullUpOn = true;
		console.log(this.page,this.page_count)
		if(this.page==this.page_count){
			this.loadding=false
			this.pullUpOn = false;
			return false;
		} 		
		this.page=this.page+1
		this.getDateList();
	}
};
</script>

<style lang="scss" scoped>
.app {
	min-height: 100%;
	background-color: #ffffff;
	color: #000000;

	.app-header-box {
		border-bottom: 4rpx solid #f7f7f7;
	}
}

.items {
	margin: 0 30rpx;
	display: flex;
	flex-direction: column;

	.item {
		display: flex;
		font-size: 9pt;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #b0f0ea;

		.item-left {
			flex: 1;
			max-width: 70%;

			.desc {
				overflow:hidden;  
				text-overflow:ellipsis;  
				white-space: normal;  
				display:-webkit-box;  
				-webkit-box-orient:vertical;  
				-webkit-line-clamp:3;/*规定最多显示两行*/ 
				font-size: 10pt;
			}
			.date-time {
				color: #bdbdbd;
				font-size: 10pt;
			}
		}

		.item-right {
			flex: 1;
			text-align: end;
			.update {
				&.add {
					color: #bc0100;
				}
			}
			.sum {
				color: #bc0100;
			}
		}
	}
}
.margin-bottom {
	margin-bottom: 10rpx;
}
.text-10-pt {
	font-size: 10pt;
}
.text-12-pt {
	font-size: 12pt;
}
.tabble{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;}
.tabble text{display: block;height:80rpx;line-height: 80rpx;width: 50%;text-align: center;font-weight: bold;}
.active{background: rgb(7, 190, 180);color: #fff;}
</style>

