<template>
	<view class="shopLogoupload-app">
		<view class="main">
			<view class="img-item" v-for="(item,index) in imgList" :key='index'>
				<image :src="img_url+'/delete.png'" mode="" class="delete" @click="deleted(item)"></image>
				<image :src="item" mode="" class="img"></image>
			</view>
			<view class="upload-logo" @tap="uploadImg">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				img_url: this.$api.img_url,
			};
		},
		onLoad() {
			uni.showLoading({
			    title: '正在加载图片'
			});
			setTimeout(function(){
				 uni.hideLoading();
			},1000)
			if(uni.getStorageSync('imglist')){
				this.imgList=uni.getStorageSync('imglist')
			}
		},
		methods:{
			uploadImg(){
				var that = this
				// var params = this.params
				uni.chooseImage({
					// count: 1,
					success: function(res) {
						var file = res.tempFiles[0].path
						var requestData = {
							serverUrl: that.$api.default.upload+'&width=6000&height=6000&type=1',
							fileKeyName: "file",
							file: file
						}
						uni.showLoading({
							title: "正在上传"
						})
						that.$http.uploadFile(requestData).then(function(res) {
							uni.hideLoading()
							if(res.code==0){
								var url = res.data.url
								that.$http
									.request({
										url: that.$api.moreShop.setShopLogo,
										method: 'POST',
										showLoading: true,
										data:{
											act:'add',
											pic_url:url,
										}
									})
									.then(result => {
										if(result.code==0){
											console.log(result.data.pic_urls)
											let List=result.data.pic_urls
											let logoList=[]
											List.forEach((item)=>{
												if(typeof(item)!='object'){
													logoList.push(item)
												}
											})										
											uni.setStorageSync('imglist',logoList)
											that.imgList=logoList
										}else{
											that.$http.toast(result.msg);
										}
									});
								// that.$forceUpdate()
							}else{
								uni.showToast({
									title: '图片太大，请重新上传',
									icon: 'none'
								});
								setTimeout(function() {
									uni.hideToast();
								}, 2000);
							}
						})
					}
				})
			},
			deleted(item){
				let that=this
				that.$http
					.request({
						url: that.$api.moreShop.setShopLogo,
						method: 'POST',
						showLoading: true,
						data:{
							act:'sub',
							pic_url:item,
						}
					})
					.then(result => {
						if(result.code==0){
							that.$http.toast('删除成功');
							let List=result.data.pic_urls
							let logoList=[]
							List.forEach((item)=>{
								if(typeof(item)!='object'){
									logoList.push(item)
								}
							})										
							uni.setStorageSync('imglist',logoList)
							that.imgList=logoList
						}else{
							that.$http.toast(result.msg);
						}
					});
			},
		}
	}
</script>

<style lang="less">
	.shopLogoupload-app{width: 100%;overflow: hidden;}
	.main{width: 100%;overflow:hidden;padding: 0 30rpx;}
	.img-item{width: 200rpx;height: 200rpx;position: relative;float: left;margin: 30rpx 30rpx 20rpx 0rpx;}
	.img{width: 200rpx;height: 200rpx;display: block;}
	.delete{width: 40rpx;height: 40rpx;display: block;position: absolute;right: -10rpx;top: -20rpx;z-index: 999;}
	.upload-logo{width: 200rpx;height: 200rpx;margin-top: 30rpx;
	background: url(../../../plugins/images/select_pic.png)no-repeat;
	background-size:cover ;float: left;}
</style>
