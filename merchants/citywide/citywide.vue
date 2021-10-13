<template>
	<view class="citywide-container">
		<!--搜索-->
		<view class="index1_content_top" :style="{background:'#FF7104'}" id="index1_content_top">
			<view style="width: 20%;color: #fff;font-size: 30rpx;font-weight: bold;overflow: hidden;
			text-overflow:ellipsis;white-space: nowrap;" @click="setCITY">
				{{city}}
			</view>
			<view class="index1_content_top_l_r"></view>
			<view class="index1_content_top_r">
				<view class="iconfont iconsousuo"></view>
				<input type="text" placeholder="输入商家名、品类或商圈" class="index1_content_top_r_input" v-model="keyword"
					@confirm="search"></input>
			</view>
		</view>
		<!---->
		<view class="citywide-screening">
			
		</view>
		
		
		
		<citySelect @back_city="back_city" v-if="show"></citySelect>
		<hans-tabber :list="list"  style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></hans-tabber>
	</view>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	import hansTabber from '../../components/hans-tabbar/hans-tabbar.vue'
	export default {
		components:{
			citySelect,
			hansTabber
		},
		data() {
			return {
				img_url: this.$api.img_url,
				city:'广州市',
				keyword:'',
				show:false,//城市选择显示或者影藏
				currentIndex:0,//table默认选项
				list: [{
				            "text": "首页",
				            "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/dd6672076ec5386b6dc2e06040a0b802.png' ,
				            "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png'
				        },
				         {
				                     "text": "同城",
				                    "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/dd6672076ec5386b6dc2e06040a0b802.png' ,
				                    "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/2cacecc12ab4ae6fd6cb233da7089f75.png'
				                     },
				                     {
				                       "text": "我的",
				                       "iconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/08ba1fe2754bc566116a39deee8fdd90.png',
				                       "selectedIconPath": 'https://www.mingyuanriji.cn/web//uploads/images/original/20210506/e6e4ff50b6ef41c1ab17775f676d7b4f.png'
				                     }],
			};
		},
		onReady() {
			var info = uni.getSystemInfoSync()
			var window_height = info.windowHeight
			var query = uni.createSelectorQuery()
			var that = this
			query.select("#index1_content_top").boundingClientRect(function(res) {
				var view_height = window_height - res.height
				that.height = view_height
			}).exec()
		},
		methods:{
			setCITY(){ //选择城市
				this.show=true
			},
			back_city(e){ //城市选择回显
				if (e !== 'no') {
					this.city = e.cityName ;
					this.show=false;
				} 
				else { 
					this.show=false;
				 }
			},
			tabChange(index) { //切换下面的tabbar
			   if(index){
				   if(index==0){
				   		uni.navigateTo({
				   			url:'../home/home'
				   		})
				   }
				   if(index==1){
						uni.navigateTo({
							url:'../citywide/citywide'
						})
				   }
				   if(index==2){
					   uni.navigateTo({
					   	url:'../../pages/user/index'
					   })
				   }
			   }
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../plugins/font-icon/iconfont1.css");
	.citywide-container{width: 100%;overflow: hidden;}
	.index1_content_top {width: 100%;display: flex;align-items: center;padding: 15px 15px 10px 15px;position: fixed;top: 0;left: 0;z-index: 999;}
	.index1_content_top_l {display: flex;font-size: 13px;font-weight: bold;color: #131313;}	
	.index1_content_top_l_r {margin-left: 5px;width: 8px;height: 8px;border-top: 2px #FFF solid;border-right: 2px #fff solid;transform: rotate(135deg);margin-top: 3px;margin-bottom: 8px;}	
	.index1_content_top_r {width: 60%;height: 29px;background: #F4F4F4;border-radius: 14px;font-size: 14px;margin-left: 15px;display: flex;align-items: center;padding-left: 15px;}
	.index1_content_top_r_input {width: 100%;font-size: 14px;}
	.citywide-screening{width: 100%;overflow: hidden;}
</style>
