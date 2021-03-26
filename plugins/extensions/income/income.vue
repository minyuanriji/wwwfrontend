<template>
	<view class="income-root">
		<view class="tab flex">
			<view v-for="(item,index) in tab_list" @tap="tabSwitch(index)"
			class="tab-item" :class="{border:index == 0,cut:status == index}" :style="{background:status == index ? textColor :''}" :key='index'>{{item}}</view>
		</view>
		
		<view v-if="list.length == 0" class="nothing">没有更多记录~</view>
		<block v-else-if="status == 0">
			<view class="detail-box" v-for="(item,index) in list" :key='index'>
				<view class="detail-item-box">
					<view class="time">创建时间：{{item.created_at}}</view>
					<view class="price flex flex-x-between">
						<view>收入：<text :style="{color: textColor}">{{item.money}}</text></view>
						<view>当前金额：{{item.income}}</view>
					</view>
					<view class="explanation">
						说明：{{item.desc}}
					</view>
				</view>
			</view>
		</block>
		
		<block v-else-if="status == 1">
			<!-- <view v-if="list.length !== 0" class="nothing">没有更多记录~</view> -->
			<view class="detail-box" v-for="(item,index) in list" :key='index'>
				<view class="detail-item-box">
					<view class="time">创建时间：{{item.created_at}}</view>
					<view class="price flex flex-x-between">
						<view>支出：<text :style="{color: textColor}">{{item.money}}</text></view>
						<view>当前金额：{{item.income}}</view>
					</view>
					<view class="explanation">
						说明：{{item.desc}}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab_list:['收入','支出'],
				list:[],
				status:0,
				page:1,
				is_no_more:false,
				textColor:'',
			};
		},
		onLoad(){
			if (uni.getStorageSync('mall_config')) {
				this.textColor = this.globalSet('textCol');
			}
			this.getList();
		},
		onReachBottom:function(e){
			  this.is_no_more=false
			  if(this.page==this.page_count){
				   this.is_no_more=true
				   return
			  }
			 this.page=this.page+1
			  this.getList();
		},
		methods:{
			// 点击切换栏 同时请求数据
			tabSwitch(index){
				this.status=index
				this.is_no_more=false;	
				this.page=1;
				this.list=[];
				this.getList();
			},
			// 封装请求数据
			getList(){
				if(this.is_no_more){
					uni.showToast({
						title:'暂无更多数据'
					})
					return;
				}
				
				uni.showLoading({
					title:'加载中'
				})
				
				this.$http.request({
					url:this.$api.income.list,
					data:{
						page:this.page,
						status:this.status
					}
				}).then((res)=>{
					console.log(res);
					uni.hideLoading();
					if(res.code == 0){
						if(res.data.list.length==0)return false
							let list=res.data.list
							var arr=this.list.concat(list)
							this.list=arr
							this.page_count=res.data.pagination.page_count
							
							// this.list = res.data.list;
						// 判断 页面数据是否大于当前页面
		
						// if(res.data.pagination.page_count>this.page){
						// // 如果大于当前页面 页面++
						//   this.page++;
						// }else{
						// 	this.is_no_more=true;
						// }
					}else{
						uni.showToast({
							title:res.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab{
		background: #FFFFFF;
		
		.tab-item{
			width: 50%;
			text-align: center;
			font-size: 32rpx;
			color: #000000;
			border-top: 1px solid #F3F3F3;
			padding: 28rpx 0;
			letter-spacing: 2rpx;
		}
		.border{
			border-right: 1px solid #F3F3F3;
		}
		.cut{
			background: #BC0100;
			color: #FFFFFF;
		}
	}
	
	.detail-box{
		padding: 0 30rpx;
		
		.detail-item-box{
			background: #FFFFFF;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 30rpx 20rpx;
			
			.time{
				border-bottom: 1px solid #F3F3F3;
				padding-bottom: 16rpx;
			}
			.price{
				padding: 16rpx 0;
				border-bottom: 1px solid #F3F3F3;
			}
			.explanation{
				padding: 16rpx 0 0;
			}
		}
	}
	
	.nothing{
		padding-top: 200rpx;
		text-align: center;
		letter-spacing: 1px;
		
	}
</style>
