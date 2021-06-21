<template>
	<view class="examine-detail-app">
		<view class="examine-detail-header">
			<view v-for="(item,index) in type" :key='index' :class="selecIndex==index?'active':''" @click="select(index)">
				{{item}}
			</view>
		</view>
		<view class="basic-message" v-if="selecIndex==0">
			<view>
				<text>小程序用户</text>
				<input type="text" value="" v-model="form.detail.nickname" disabled/>
			</view>
			<view>
				<text>联系人</text>
				<input type="text" value="" disabled/>
			</view>
			<view>
				<text>联系电话</text>
				<input type="text" value="" disabled/>
			</view>
			<view>
				<text>微信号</text>
				<input type="text" value="" v-model="form.detail.wechat" disabled/>
			</view>
			<view>
				<text>所受类目</text>
				<input type="text" value="" v-model="form.detail.mch_common_cat_name" disabled/>
			</view>
			<view>
				<text>是否开业</text>
				<input type="text" value="" v-model="form.detail.status" disabled/>
			</view>
			<view>
				<text>好店推荐</text>
				<input type="text" value="" v-model="form.detail.is_recommend" disabled/>
			</view>
			<view>
				<text>排序</text>
				<input type="text" value="" v-model="form.detail.sort" disabled/>
			</view>
			<view>
				<text>商户账号</text>
				<input type="text" value="" v-model="form.detail.username" disabled/>
			</view>
			<view>
				<text>商户密码</text>
				<input type="text" value="" v-model="form.detail.password" disabled/>
			</view>
		</view>
	
	
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:["基本信息",'店铺信息','审核信息'],
				selecIndex:0,
				form:{
					detail:{
						nickname:'',//小程序用户
						wechat:'',//微信号
						mch_common_cat_name:'',//所受类目
						username:'',//商户账号
						password:'',//商户密码
						is_recommend:'',//好店推荐
						status:'',//是否开业
						sort:'',//排序
					},
					review:{
						
					}
				}
			}
		},
		onLoad(options) {
			if(options&&options.id){
				this.getexamineDetail(options.id)
			}
		},
		methods:{
			select(index){ //选项
				this.selecIndex=index
			},
			getexamineDetail(id){ //获取审核信息
				this.$http
					.request({
						url: this.$api.moreShop.getexamineDetail,
						method: 'GET',
						data:{
							id:id
						},
						showLoading: true
					})
					.then(res => {
						if(res.code==0){
							this.form=res.data
						}
				});
			}
		}
	}
</script>

<style lang="less">
	.examine-detail-app{width: 100%;overflow: hidden;}
	.examine-detail-header{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;}
	.examine-detail-header view{font-size: 28rpx;width: 150rpx;height: 60rpx;text-align: center;line-height: 60rpx;border-radius: 30rpx;margin: 20rpx 0;}
	.active{background: #ff7104;color: #fff;font-weight: bold;}
	.basic-message{width: 100%;overflow: hidden;margin-bottom: 100rpx;}
	.basic-message view{width: 90%;height: 80rpx;margin: 15rpx auto 0 ;}
	.basic-message view text{display: inline-block;height: 80rpx;line-height: 80rpx;font-size: 28rpx;color: #000;width: 150rpx;float: left;}
	 .basic-message view input{display: inline-block;height: 80rpx;outline: none;border: none;line-height: 80rpx;float: left;width: 450rpx;padding-left: 10rpx;margin-left: 5rpx;background: #f2f2f2;color: #000;}
</style>
