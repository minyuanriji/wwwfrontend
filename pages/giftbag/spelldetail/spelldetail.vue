<template>
	<view class="spellDetail">
		<view class="count_time">
			{{group_info.expired_at}}
		</view>
		<view class="invitation-friend" @click="Invitefriends">
			邀请好友拼单
		</view>
		<view class="go-see" @click="visit">
			去逛逛
		</view>
		<view class="jojin-list">
			<view class="jojin-item" v-for="(item,index) in join_list" :key='index'>
				<image :src="item.avatar_url" mode=""></image>
				<text v-if="item.is_owner==1">拼主</text>
			</view>
		</view>
		<view>
			<jx-list-cell :arrow="true" padding="0" :lineLeft="false">
				<view class="jx-cell-header" style="height: 80rpx;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">订单详情</view>
				</view>
				<view class="jx-cell-header" style="height: 80rpx;margin-left: 480rpx;color: #000;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">查看</view>
				</view>
			</jx-list-cell>
		</view>
		<view>
			<jx-list-cell :arrow="false" padding="0" :lineLeft="false">
				<view class="jx-cell-header" style="height: 80rpx;">
					<view class="jx-cell-title" style="font-size: 28rpx;line-height: 80rpx;margin-left: 20rpx;">拼团规则</view>
				</view>
				<view class="jx-cell-header" style="height: 80rpx;margin-left: 120rpx;">
					<view class="jx-cell-title" style="font-size: 25rpx;line-height: 80rpx;margin-left: 20rpx;">好友拼单,人满发货，人不满时间结束后退款</view>
				</view>
			</jx-list-cell>
		</view>
		<unipopup ref="popup" type="center">
			<view class="popup-detail">
				<view class="popup-detail-title">
					分享链接
				</view>
				<view class="popup-detail-link">
					{{url}}
				</view>
				<view class="select-type">
					<button type="default" @click="deleted">取消</button>
					<button type="default"  style="background: red;color: #fff;"  v-clipboard:copy="url" v-clipboard:success="(type) => paste('success')" v-clipboard:error="(type) => paste('error')">复制链接</button>
				</view>
			</view>
		</unipopup>
	</view>
</template>

<script>
	import jxListCell from '@/components/list-cell/list-cell';
	import unipopup from '@/components/uni-popup/uni-popup';
	export default {
		components: {
			jxListCell,
			unipopup
		},
		data() {
			return {
				group_info:'',
				join_list:'',
				pack_id:'',
				url:'',
			};
		},
		onLoad(options) {
			if(options&&options.group_id){
				this.getspellDetail(options.group_id)
			}
			if(options&&options.pack_id){
				this.pack_id=options.pack_id
			}
		},
		methods:{
			getspellDetail(group_id){
				this.$http
					.request({
						url: this.$api.package.espellDetail,
						method: 'POST',
						data:{
							group_id:group_id
						},
						showLoading: true
					})
					.then(res => {
						if (res.code == 0) {
							console.log(res)
							this.group_info=res.data.group_info
							this.join_list=res.data.join_list
							var timestamp =parseInt( new Date().getTime()/1000)
							let time=this.group_info.expired_at-timestamp
							let days=''
							let hours=''
							let minutes=''
							let seconds=''
							let timers=setInterval(()=>{
								time--
								if(time<=0){
									this.group_info.expired_at='00'+'天'+'00'+"："+'00'+'：'+'00'
									clearInterval(timers)
									return 
								}
								days = parseInt(time / 60 / 60 / 24 , 10); //计算剩余的天数
								hours = parseInt(time / 60 / 60 % 24 , 10)<10?"0"+parseInt(time / 60 / 60 % 24 , 10):parseInt(time  / 60 / 60 % 24 , 10); //计算剩余的小时 
								minutes = parseInt(time / 60 % 60, 10)<10?"0"+parseInt(time / 60 % 60, 10):parseInt(time / 60 % 60, 10);//计算剩余的分钟 
								seconds = parseInt(time % 60, 10)<10?"0"+parseInt(time  % 60, 10):parseInt(time  % 60, 10);//计算剩余的秒数 								
								this.group_info.expired_at=days+'天'+hours+"："+minutes+'：'+seconds
							},1000)
						}else{
							this.$http.toast(res.msg);
						}
					});
			},
			visit(){//去逛逛
				uni.navigateTo({
					url:'../../index/index'
				})
			},
			Invitefriends(){
				this.$refs.popup.open()
				let pid=JSON.parse(uni.getStorageSync('userInfo')).user_id
				console.log(pid)
				this.url="https://dev.mingyuanriji.cn/h5/#/pages/giftbag/gifebagDetail/gifebagDetail?pack_id="+this.pack_id+"&pid="+pid
			},
			deleted(){
				 this.$refs.popup.close()
			},
			paste(type) {
				if (type==='success') {
					this.$http.toast('复制成功');
					this.$refs.popup.close()
				} else {
					this.$http.toast('复制失败');
				}
			},
		}
	}
</script>

<style lang="less">
	.spellDetail{width: 100%;overflow: hidden;}
	.count_time{width: 300rpx;height: 60rpx;color: #000;margin: 50rpx auto 0;text-align: center;line-height: 60rpx;font-size: 28rpx;}
	.invitation-friend{width: 90%;height: 80rpx;background: red;margin: 50rpx auto 30rpx;text-align: center;line-height: 80rpx;font-size: 30rpx;color: #fff;border-radius: 10rpx;}
	.go-see{width: 90%;height: 80rpx;border: 1rpx solid red;margin: 30rpx auto 30rpx;text-align: center;line-height: 80rpx;font-size: 30rpx;color: red;border-radius: 10rpx;}
	.jojin-list{width: 100%;overflow: hidden;display: flex;justify-content: space-evenly;margin: 80rpx 0;}
	.jojin-item{width: 80rpx;height: 80rpx;border-radius: 50%;position: relative;}
	.jojin-item image{display: block;width: 80rpx;height: 80rpx;border-radius: 50%;}
	.jojin-item text{display: block;position: absolute;top: 0;right: -20rpx;width: 60rpx;font-size: 25rpx;background: #ffcf79;text-align: center;color: #fff;line-height: 36rpx;border-radius: 5rpx;}
	.popup-detail{width: 550rpx;height: 400rpx;background: #fff;border-radius: 30rpx;}
	.popup-detail-title{width:550rpx;text-align: center;height: 80rpx;line-height: 80rpx;color: #000;}
	.popup-detail-link{width:550rpx;overflow: hidden;font-size: 25rpx;color: #000;background:#fafafa ;margin: 35rpx 0;padding: 0 10rpx;box-sizing: border-box;
	overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height: 80rpx;}
	.select-type{width: 100%;height: 80rpx;display: flex;justify-content: space-evenly;margin: 80rpx 0 0 0;}
	.select-type button{width: 40%;height: 80rpx;text-align: center;line-height: 80rpx;font-size: 28rpx;}
</style>
