<template>
	<view class="topic-root">
		<view class="sliding">
			<sliding :cateList='cateList' @click="switchCate"></sliding>
		</view>
		
		<thematic v-if="topicList" :topicData='topicList' @click='navTo'></thematic>
		
		<main-loading :visible="loading"></main-loading>
	</view>
</template>

<script>
	import sliding from '@/components/slidingCate/slidingCate.vue';
	import thematic from '@/components/thematic/thematic.vue';
	
	export default{
		components: {
			sliding,
			thematic
		},
		data(){
			return{
				currentTab: 0,
				cateList:[],
				topicList: null,
				loading:false
			}
		},
		onLoad() {
			this.getType();
		},
		methods:{
			switchCate(val){
				this.getList(val.target.id);
			},
			getType(id){ //获取分类数据
				this.$http.request({
					url:this.$api.topic.type,
				}).then(res=>{
					if(res.code == 0){
						this.cateList.push(...res.data.list);
						this.getList(res.data.list[0].id);
					}
				})
			},
			getList(type){ //获取专题列表
				this.loading = true;
				let temp = {};
				this.$http.request({
					url:this.$api.topic.list,
					method:'post',
					data:{
						type
					}
				}).then(res=>{
					if(res.code == 0){
						temp.topic_list=res.data.list;
						this.topicList = temp;
						this.loading = false;
					}
				})
			},
			change(e) {
				this.currentTab = e.index
			},
			navTo(id){
				uni.navigateTo({
					url:'/pages/topic/detail?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	.sliding{
		background: #FFFFFF;
		border-bottom: 2rpx solid #ebebeb;
		padding: 10rpx 0;
	}
</style>