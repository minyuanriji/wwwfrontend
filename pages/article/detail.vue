<template>
	<view class="app">
		<jyf-parser :html="article_data.content"></jyf-parser>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components:{
			jyfParser
		},
		data() {
			return {
				id:0,
				article_data:'',
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getData();
		},
		methods: {
			getData(){
				this.$http.request({
					url: this.$api.article.detail,
					showLoading:true,
					data:{
						id: this.id
					}
				}).then(res => {
					if(res.code == 0){
						this.article_data = res.data.article;
					}else{
						this.$http.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
