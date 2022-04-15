<template>
	<div class="out-box" :style="cOutStyle">
		<view class="diy-take-score" :style="cStyle">
			<image v-if="data.pic_url" :src="data.pic_url" :style="cImgStyle" mode="scaleToFill"></image>
			<view class="button-box" :style="cButtonStyle" v-if="data.isButton">
				<view>
					<text @click="takeScore"></text>
					<view class="button-box-mask"></view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type:Object,
				default:()=>{}
			},
		},
		data() {
			return {
				window_h: 0,
				top: 0,
				data:{}
			}
		},
		computed:{
			cOutStyle(){
				let style = [];
				style.push("height:" + this.window_h + "rpx");
				style.push("margin-top:" + this.top + "rpx");
				return style.join(";");
			},
			cButtonStyle(){
				let left, top, width, height, style = [];
				left   = !isNaN(this.data.button_x) && this.data.button_x > 0 ? this.data.button_x : 0;
				top    = !isNaN(this.data.button_y) && this.data.button_y > 0 ? this.data.button_y : 0;
				width  = !isNaN(this.data.button_w) && this.data.button_w > 0 ? this.data.button_w : 0;
				height = !isNaN(this.data.button_h) && this.data.button_h > 0 ? this.data.button_h : 0;
				
				style.push("left:" + left + "rpx");
				style.push("top:" + top + "rpx");
				style.push("width:" + width + "rpx");
				style.push("height:" + height + "rpx");
				style.push("line-height:" + height + "rpx");
				return style.join(";");
			},
			cStyle(){
				let style = [];
				if(this.data.isPadding){
					
				}
				return style.join(";");
			},
			cImgStyle() {
				let style = [], img_width = this.data.img_width;
				if(img_width && !isNaN(img_width) && parseInt(img_width) > 0){
					style.push("width:" + (img_width > 750 ? 750 : img_width) + 'rpx');
				}else{
					style.push("width:90%");
				}
				if(this.data.img_height && !isNaN(this.data.img_height) && parseInt(this.data.img_height) > 0){
					style.push("height:" + this.data.img_height + 'rpx');
				}
				return style.join(";");
			},
		},
		created() {
			this.data = JSON.parse(JSON.stringify(this.value));
			uni.getSystemInfo({
				success: (res) => {
					console.log("getSystemInfo", res);
					this.window_h = ((res.screenHeight)/res.screenWidth) * 750;
					// #ifdef H5
					this.top = (res.windowTop/res.windowWidth) * 750;
					// #endif
					// #ifndef H5
					//this.top = (res.statusBarHeight/res.windowWidth) * 750;
					// #endif
				}
			})
		},
		methods: {
			openUrl(){
				uni.navigateTo({
					url: this.data.link.new_link_url
				})
			},
			takeScore(){
				let that = this;
				this.$http.request({
					url: this.$api.plugin.score.free_score_take,
					method: 'POST',
					data: {id: this.data.send_data ? this.data.send_data.id : ''},
					showLoading: true
				}).then(res => {
					if(res.code == 0){
						uni.showModal({
							title: '恭喜您',
							content: '积分领取成功',
							showCancel: false,
							confirmText: '去使用',
							success: function (res) {
								if (res.confirm) {
									that.openUrl();
								}
							}
						});
					}else{
						this.$http.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.out-box{position:fixed;left:0;top:0;background:RGBA(255, 255, 255, 0.5);width:100%;display:flex;justify-content: center;}
.diy-take-score{position:relative;display:flex;justify-content: center;width:100%;min-height:100rpx;background:white;padding-top:0rpx;padding-bottom:0rpx;}
.diy-take-score image{width:90%;}
.button-box{position:absolute;left:0;top:0;width:200rpx;height:70rpx;line-height:70rpx;}
.button-box > view{width:100%;height:100%;position:relative;text-align:center;}
.button-box > view text{position:absolute;left:0;top:0;z-index:9;width:100%;height:100%;color:white;}
.button-box-mask{z-index:8;left:0;top:0;width:100%;height:100%;position:absolute;background: rgba(0, 144, 127, 0.0)}
</style>
