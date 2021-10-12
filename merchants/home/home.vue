<template>
	<view class="shop-container">
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
		
		
		
		
		
		<citySelect @back_city="back_city" v-if="show"></citySelect>
	</view>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	export default{
		components:{
			citySelect,
		},
		data(){
			return{
				keyword:'',
				city:'广州市',
				show:false,//城市选择显示或者影藏
			}
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
			back_city(e){
				if (e !== 'no') {
					this.city = e.cityName ;
					this.show=false;
				} 
				else { 
					this.show=false;
				 }
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop-container{width: 100%;overflow: hidden;}
	.index1_content_top {width: 100%;display: flex;align-items: center;padding: 15px 15px 10px 15px;}	
	.index1_content_top_l {display: flex;font-size: 13px;font-weight: bold;color: #131313;}	
	.index1_content_top_l_r {margin-left: 5px;width: 8px;height: 8px;border-top: 2px #FFF solid;border-right: 2px #fff solid;transform: rotate(135deg);margin-top: 3px;margin-bottom: 8px;}	
	.index1_content_top_r {width: 60%;height: 29px;background: #F4F4F4;border-radius: 14px;font-size: 14px;margin-left: 15px;display: flex;align-items: center;padding-left: 15px;}
	.index1_content_top_r_input {width: 100%;font-size: 14px;}
	
</style>
