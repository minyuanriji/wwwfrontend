<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-box">
			
			<block v-for="(item,index) in detailContent" :key='index'>
				<!-- 图文详情 -->
				<view v-if="item.id == 'image-text'">
					<jyf-parser :html="item.data.content"></jyf-parser>
				</view>
				<!-- 图文详情 -->
				
				<!-- 图片魔方 -->
				<view class="adBoxs" v-if="item.id == 'rubik'">
					<!-- <view class="ad1">图片广告一</view> -->
					<rubik :types="item.data.style" :hotspotData="item.data.hotspot" :image-data='item.data.list'></rubik>
				</view>
				<!-- 图片魔方 -->
				
				<view class="video-box" v-if="item.id == 'video'">
					<video :class="['video','video'+index]" :poster='item.data.pic_url' :src="item.data.url" controls></video>
				</view>
			</block>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import rubik from '@/components/rubik/rubik';
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	
	export default {
		components:{
			rubik,
			jyfParser
		},
		data() {
			return {
				id:0,
				detailContent: '',
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getDetail(this.id)
		},
		methods: {
			getDetail(id){ //获取详情数据
				this.$http.request({
					url:this.$api.topic.detail,
					data:{
						id
					}
				}).then(res=>{
					if(res.code == 0){
						this.detailContent = res.data.topic.detail;
						this.detailContent = this.detailContent.map((val)=>{
							val.id == 'video' && this.$set(val,'is_show','true');
							return val;
						})
					}
				})
			},
		}
	}
</script>

<style scoped>
	page{
		overflow-y: auto;
	}
	.adBoxs {
		overflow: hidden;
	}
	
	.video-box{
		position: relative;
		height: 450rpx;
		margin: 10rpx 0;
	}
	.video-cover-url{
		width: 100%;
		height: 450rpx;
		background-size: cover !important;
		background-position: center !important;
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
	}
	.video{
		width: 100%;
		top: 0;
		left: 0;
		position: absolute;
	}
	
	.scroll-box{
		width: 750rpx;
		height: calc(100vh - var(--window-bottom));
	}
</style>
