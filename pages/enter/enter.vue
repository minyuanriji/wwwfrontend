<template>
	<view class="content">
		 <view class="content_top" v-if="SHOW">
			 <view class="content_top_body">
			 	<image src="http://hs.wezhijin.com/images/shop/resiger_banner1.png" class="content_top_banner" mode="aspectFill"></image>
				<view class="content_top_body_bottom">
					<view class="content_top_body_bottom_block">
						 <view class="content_top_body_bottom_block_t" :style="{background:background}">1</view>
						 <view class="content_top_body_bottom_block_b">提交资料</view>
					</view>
					<view class="content_top_body_bottom_line" :style="{background:background}"></view>
					<view class="content_top_body_bottom_block">
						 <view class="content_top_body_bottom_block_t" :style="{background:background}">2</view>
						 <view class="content_top_body_bottom_block_b">审核签约</view>
					</view>
					<view class="content_top_body_bottom_line" :style="{background:background}"></view>
					<view class="content_top_body_bottom_block">
						 <view class="content_top_body_bottom_block_t" :style="{background:background}">3</view>
						 <view class="content_top_body_bottom_block_b">开门营业</view>
					</view>
				</view>
			 </view>
		 </view>
		 <!--开店需要准备材料的内容展示-->
		 <view class="content_block">
			  <view class="enter_before" v-show="status==0">
				  <enter_before :background="background" @returnStatus="getStatus"></enter_before>
			  </view>
			  <view class="enter_before" v-show="status==1">
			  	 <enter_start :background='background' @returnStatus="getStatus" :applyInfo='applyInfo'></enter_start>
			  </view>
			  <view class="enter_before" v-show="status==2">
			  	 <enter_license :background='background' @returnStatus="getStatus" :applyInfo='applyInfo'></enter_license>
			  </view>
			  <view class="enter_before" v-show="status==3">
			  	 <enter_results :background='background' @returnStatus="getStatus" :type='type' :msg='applyInfo.remark'>
				</enter_results>
			  </view>
		 </view>
		 
	</view>
</template>

<script>
	import enter_before from '@/components/enter-before/enter-before.vue';
	import enter_start from '@/components/enter-before/enter-start.vue';
	import enter_license from '@/components/enter-before/enter-license.vue';
	import enter_results from '@/components/enter-before/enter-results.vue';
	export default {
		components: {
			 enter_before,
			 enter_start,
			 enter_license,
			 enter_results,
		},
		data() {
			return {
				background:'rgb(255, 113, 4)',
				status:0,//1:提交资料,2 审核签约 ,3 开门营业
				agreement:'',
				type:'',
				applyInfo:'',
				SHOW:true,
			}
		},
		onLoad() {
			this.getApplyInfo()
		},
		methods: {
			getStatus:function(e){
				this.status=e
			},
			getApplyInfo(){
				this.$http
					.request({  //获取用户个人信息
						url: this.$api.merchants.getapplyInfo,
						method: 'POST',
						showLoading: true
					})
					.then(res => {
						if(res.code==0){ //申请状态（refused拒绝，passed通过，verifying审核中，applying申请中）							
							this.applyInfo=res.data
							if(res.data.status=='applying'){
								this.status=0
							}
							if(res.data.status=='refused'){
								this.status=3
								this.type='refused'
								this.remark=res.data.remark
								this.SHOW=false
							}
							if(res.data.status=='verifying'){
								this.status=3
								this.type='verifying'
								this.SHOW=false
							}
							if(res.data.status=='passed'){
								this.status=3
								this.type='passed'
								this.SHOW=false
							}
						}
					});
			}
		},
		onShow() {
			var isLogin=this.$http.isLogin()
			uni.setStorageSync('_login_pre_url','/pages/enter/enter')
			if(!isLogin){
				uni.showModal({
					title: "提示",
					content: "您还未登录，去登录吧~",
					confirmText: "去登录",
					cancelText: "再逛会",
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/public/login'
							});
						}else{
							let _currRoute = ''
							// #ifdef H5
							_currRoute = currPage.route;
							// #endif
							// #ifdef MP-WEIXIN || APP-PLUS
							_currRoute = currPage.__route__;
							// #endif
							if(_currRoute.indexOf("cart") == -1 && _currRoute.indexOf("goods") == -1){
								uni.navigateBack();
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
page{background-color: #e9f5f6;}
.content_top{
	width: 98%;
	margin: 5px auto;
	background: #FFFFFF;
	box-shadow: 0px 1px 1px 1px rgba(2, 58, 63, 0.16);
	border-radius: 3px;
	padding: 12px 5px 5px;
}
.content_top_body{position: relative;}
.content_top_banner{
	width: 100%;
	height: 124px;
	border-radius: 7px;
}
.content_top_body_bottom{display: flex;justify-content: space-between;padding: 15px 25px 0px;}
.content_top_body_bottom_block{width: 15%;text-align: center;}
.content_top_body_bottom_block_t{
	width: 26px;
	height: 26px;
	font-weight: bold;
	color: #fff;
	text-align: center;
	line-height: 26px;
	margin: 0px auto;
	border-radius: 3px;

}
.content_top_body_bottom_line{
	width: 67px;
	height: 1px;
    margin-top: 13px;
}
.content_top_body_bottom_block_b{
	font-size: 11px;
	font-weight: bold;
	color: #000000;
}

</style>
