<template>
	<view class="container">
		<com-nav-bar @clickLeft="back" left-icon="back" title="提交订单" :status-bar="true" background-color="#ffffff" :border="false"
		 color="#000000"></com-nav-bar>
		<view class="tui-box">
			<!-- 收货地址 -->
			<tui-list-cell :arrow="true" :last="true" :radius="true" @click="chooseAddr" v-if="addressShpw">
				<view class="tui-address">
					<view v-if="user_address.length != 0">
						<view class="tui-userinfo">
							<text class="tui-name">{{user_address.name}}</text> {{user_address.mobile}}
						</view>
						<view class="tui-addr">
							<!-- <view class="tui-addr-tag">公司</view> -->
							<text>{{user_address.province}}{{user_address.city}}{{user_address.district}}{{user_address.detail}}</text>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<!-- <image src="/static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image> -->
						<text>请添加收货地址</text>
					</view>
				</view>
			</tui-list-cell>
			<!-- 收货地址 -->

			<!-- 商品详情 -->
			<!-- 0.1 循环出商家 -->
			<view class="tui-top tui-goods-info" v-for="(item,index) in list" :key='index'>
				<!-- 0.2 循环出商品 -->
				<tui-list-cell :hover="false" :lineLeft="false" padding="26rpx 20rpx">
					<view class="tui-goods-title">
						<view class="logo" @tap="toShop(item.mch.id)">
							<!-- <span :style="`background-image:url(${})`"></span> -->
							<image class="img" lazy-load="true" :src="url+'/images/shop/shoplogo.png'" mode="aspectFill"></image>
							<span class="name">{{item.mch.name?item.mch.name:"名媛日记官方商城"}}</span>
							<view class="toright"></view>
						</view>
					</view>
				</tui-list-cell>
				<view v-for="(its,ids) in item.same_goods_list" class="item-goods">
					<!-- 0.3 循环出规格 -->
					<view v-for="(gItem,gIndex) in its.goods_list">
						<tui-list-cell :hover="false" padding="0">
							<view class="tui-goods-item">
								<image v-if="" :src="gItem.goods_attr.pic_url?gItem.goods_attr.pic_url:gItem.goods_attr.cover_pic" class="tui-goods-img"></image>
								<view class="tui-goods-center">
									<view class="tui-goods-name">{{gItem.name}}</view>
									<view class="tui-goods-attr">{{groupName(gItem.attr_list)}}</view>
								</view>
								<view class="tui-price-right">
									<view>￥{{gItem.unit_price}}</view>
									<view>x{{gItem.num}}</view>
								</view>
							</view>
						</tui-list-cell>
					</view>
					<!-- 0.2.1 该商品对应的优惠券 -->
					<view style="border-bottom: 2rpx solid #e8e8e8;" v-if="its.coupon_list.length != 0" @tap="showPopup(its.coupon_list,index,ids,its.goods_id)">
						<tui-list-cell :arrow="hasCoupon" :hover="hasCoupon">
							<view class="tui-padding tui-flex">
								<view>优惠券</view>
								<view :class="{'tui-color-red':hasCoupon}" :style="{color:hasCoupon ? textColor :''}">{{its.coupon_name}}</view>
							</view>
						</tui-list-cell>
					</view>

				</view>
				<!-- <tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>快递方式</view>
						<view v-if="item.delivery.send_type == 'express'">快递</view>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex" v-if="flag">
						<view>运营费</view>
						<view v-if="list" :style="{color: textColor}">+&yen;{{item.express_price}}</view>
					</view>
					<view class="tui-padding tui-flex" v-else>
						<view>运营费</view>
						<view v-if="list" :style="{color: textColor}">+&yen;{{ExpressPrice}}</view>
					</view>

				</tui-list-cell>
				<tui-list-cell :hover="false" v-if="item.total_full_relief_price != 0">
					<view class="tui-padding tui-flex">
						<view>满额减免</view>
						<view v-if="list" :style="{color: textColor}">-&yen;{{item.total_full_relief_price || 0}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>订单备注</view>
						<input type="text" class="tui-remark" placeholder="选填: 请先和商家协商一致" placeholder-class="tui-phcolor" v-model="remark"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :last="true">
					<view class="tui-padding tui-flex tui-total-flex">
						<view class="tui-flex-end tui-color-red" :style="{color:textColor}">
							<view class="tui-black">小计： </view>
							<view class="tui-size-26">￥</view>
							<view v-if="flag" class="tui-price-large">{{item.total_price}}</view>
							<view v-else class="tui-price-large">{{total_price}}</view>
						</view>
					</view>
				</tui-list-cell>
			</view>

			<view class="use-points flex flex-y-center flex-x-between" v-if="score_enable == 1 && scoreswitc == 1 || scoreswitc == 0">
				<view>使用积分 <view class="xieti">拥有积分：{{user_score}} <text class="text" v-if="is_checked">-{{total_score_use}}</text>
					</view>
				</view>
				<switch :checked="is_checked" @change="use" :color='textColor' class="points-switch" />
			</view>

			<!-- 使用抵扣券 -->
			<view class="use-points flex flex-y-center flex-x-between" v-if="integral_enable == 1 && scoreswitc == 2 || scoreswitc == 0||scoreswitc == 3">
				<view>使用抵扣券 <view class="xieti">拥有抵扣券金额：{{user_integral}} <text class="text" v-if="is_integral">-{{total_integral_use}}</text></view>
				</view>
				<switch :checked="is_integral" @change="useIntegral" :color='textColor' class="points-switch" />
			</view>
		</view>


		<!--优惠券底部选择层-->
		<com-bottom-popup :show="popupShow2" @close="hidePopup">
			<scroll-view scroll-y="true" style="max-height: 1000rpx;">
				<view class="coupon-box">
					<view class="coupon-title2">
						优惠券
						<view class="coupon-icon iconfont icon-guanbi" @tap="hidePopup"></view>
					</view>
					<view style="height: 120rpx"></view>
					<!-- <view class="coupon-tips">领取优惠券购买</view> -->
					<view class="coupon-content">
						<view class="coupon-item" :style="{background: 'url('+couponImg+')no-repeat'}" v-for="(cItem,cIndex) in coupon_list"
						 :key="cIndex">
							<view class="coupon-item-left">
								<view class="coupon-item-price">
									<block v-if="cItem.type == 2">
										<text class="price-symbol">&yen;</text>
										<text class="price-int">{{cItem.sub_price}}</text>
									</block>
									<block v-else>
										<text class="price-int">{{cItem.discount*10}}</text>
										<text>折</text>
									</block>
								</view>
								<view class="coupon-item-condition">
									满{{cItem.coupon_min_price}}可用
								</view>
							</view>
							<view class="coupon-item-right">
								<view class="coupon-item-name">{{cItem.coupon_data.name}}</view>
								<view class="coupon-item-time">
									<view v-if="cItem.coupon_data.expire_type == 1">领取{{cItem.coupon_data.expire_day}}天后过期</view>
									<view v-else>{{cItem.coupon_data.begin_at}}~{{cItem.coupon_data.end_at}}</view>
									<view class="receive" :style="{background:textColor}" @tap="useCoupon('use',cIndex,cItem.id)" v-if="cItem.is_use == 0">使用</view>
									<view class="receive receive-col" @tap="useCoupon('notUse',cIndex,cItem.id)" :style="{border:'1px solid'+textColor,color:textColor}"
									 v-else>不使用</view>
								</view>
								<!-- <view class="received iconfont icon-yilingqu"></view> -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</com-bottom-popup>
		<!--优惠券底部选择层-->

		<view class="tui-safe-area"></view>

		<view class="tui-tabbar">
			<view class="tui-tabbar-box flex flex-x-between flex-y-center">
				<view class="tui-flex-end tui-color-red tui-pr-20" :style={color:textColor}>
					<view class="tui-black">合计: </view>
					<view class="tui-size-26">￥</view>
					<!-- <view class="tui-price-large" v-if="is_checked">{{total_score}}</view>
					<view class="tui-price-large" v-if="is_checked">{{total_integral}}</view> -->
					<view class="tui-price-large">{{total_price}}</view>
				</view>
				<view class="tui-pr25" @tap="btnPay" :style="{background:textColor}">
					去支付
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell,
		},
		data() {
			return {
				url: this.$api.test_url,
				img_url: this.$api.img_url,
				hasCoupon: true,
				insufficient: false,
				list: '', //商品数据
				addressId: 0, //地址栏ID
				user_address: '', //用户地址
				popupShow2: false, //优惠券弹窗是否显示
				coupon_list: [], //当前优惠券列表
				coupon_name: '', //优惠券名字
				coupon_index: -1, //优惠券索引
				coupon_id: 0, //优惠券id
				user_coupon: '', //用户所能用的全部优惠券
				shop_index: 0, //店铺索引
				goods_index: 0, //商品索引
				remark: '', //订单备注
				sendData: '', //本地缓存读取的商品数据
				subSendData: '', //发给后台的数据
				use_coupon_list: [], //已使用优惠券列表
				coupon_goods_id: '', //当前弹窗是否使用优惠券的商品id
				total_price: 0, //合计的总价格
				score_enable: 0, //是否显示使用积分
				is_checked: false, //是否打开使用积分
				use_score: 0, //是否使用积分(请求用)
				is_integral: false, //抵扣券
				use_integral: 0,

				total_score: 0, //使用了的积分抵扣的钱
				total_score_use: 0, //总共可使用的积分
				user_score: 0, //用户拥有积分
				user_remaining_score: 0, //剩余积分

				total_integral: 0, //使用了的抵扣券的钱
				total_integral_use: 0, //总共可使用的抵扣券
				user_integral: 0, //用户拥有抵扣券
				user_remaining_integral: 0, //剩余抵扣券

				is_request: false,
				textColor: '#bc0100',
				couponImg: '',
				province: '',
				flag: true,
				ExpressPrice: '',
				scoreswitc: '',
				wx_order_id: '',
				mch_id: "", //店铺ID
				params: {}, //请求数据
				integral_enable: "",
				price: 0,
				express_price: 0,
				express: 0,
				addressShpw:true,
			}
		},
		onLoad(options) {
			if (uni.getStorageSync('mall_config')) {
				this.textColor = this.globalSet('textCol');
				this.couponImg = this.globalSet('couponImg');
			}
			if (uni.getStorageSync("addressID")) { //如果有地址id在请求地址接口，如果没有则用默认的地址
				this.addressId = uni.getStorageSync("addressID");
				this.getAddress();
			} else {
				this.addressId = 0;
			}
			this.mch_id = options.mch_id
			this.sendData = uni.getStorageSync('orderData');
			this.getData();
			//#ifdef MP-WEIXIN
			this.wx_order_id =options.nav_id;
			console.log(this.wx_order_id);
			//#endif
			
			//#ifdef H5
			// this.wx_order_id = this.$route.query.nav_id !== undefined ? this.$route.query.nav_id : 0;
			this.wx_order_id = this.$route.query.nav_id !== undefined ? this.$route.query.nav_id : 0;
			//#endif
			this.getscoreswitc();
		},
		onShow() {
			this.switcExpressPrice();
			if (uni.getStorageSync("addressID")) { //如果有地址id在请求地址接口，如果没有则用默认的地址
				this.addressId = uni.getStorageSync("addressID");
				this.getAddress();
			} else {
				this.addressId = 0;
			}
		},
		onBackPress(e) {
			uni.removeStorageSync('orderData');
		},
		computed: {
			groupName() {
				return function(val) {
					var str = '';
					val.forEach((item) => {
						str = str + item.attr_name;
					})
					return str;
				}
			}
		},
		methods: {
			toShop(id) {
				if (id) {
					uni.navigateTo({
						url: "/pages/shop/home/home?mch_id=" + id
					})
				} else {
					uni.navigateTo({
						url: "pages/shop/shop"
					})
				}
			},
			back() {
				this.navBack();
			},
			getscoreswitc() {
				//#ifdef H5
				var order_id = this.$route.query.nav_id !== undefined ? this.$route.query.nav_id : 0;
				//#endif
				//#ifdef MP-WEIXIN
				var order_id = this.wx_order_id;
				//#endif

				this.$http.request({
					url: this.$api.order.getscore,
					method: 'post',
					showLoading: true,
					data: {
						nav_id: order_id
					}
				}).then(res => {
					this.scoreswitc = res;
					console.log(this.scoreswitc);
				}).catch()
			},
			//切换地址获取运费
			switcExpressPrice() {
				if(this.province == this.user_address.province){
					return false;
				}
				if(this.user_address.province === undefined){
					this.user_address = uni.getStorageSync('user_address_cache');
				}
				this.province = this.user_address.province;
				this.express=0
				if(this.user_address.province){
					this.$http.request({
						url: this.$api.order.express_price,
						method: 'post',
						showLoading: true,
						data: {
							data: this.user_address.province,
							order_id: JSON.parse(this.wx_order_id)
						}
					}).then((res) => {
						var result=Object.keys(res)
						this.list.forEach((item)=>{
							if(item.mch.id==0){
								item.goods_list.forEach((ites)=>{
									console.log(ites)
									if(result.indexOf(String(ites.id))!=-1){
										this.express+=Number(res[ites.id])
									}
								})
								item.express_price=this.express;
								item.total_price=Number(item.total_price)+Number(item.express_price);
							}							
						})
						this.getData();
						console.log(this.list)
					})
				}
			},

			// 使用积分
			use(e) {
				this.price = 0;
				this.is_checked = e.detail.value;
				this.is_checked ? this.use_score = 1 : this.use_score = 0; //是否使用积分(请求用)
				this.getData(); //重新获取订单详情
				// this.switcExpressPrice()

				/* this.total_score_use = 0;	//总共可使用的积分
				this.list.forEach((item) => {
					console.log('score',item);
					this.total_score_use = this.total_score_use + (item.score.deduction_price) * 1;
				})
				this.total_score = (this.total_price - this.total_score_use).toFixed(2); */
				// this.is_checked = e.detail.value;
			},
			// 使用抵扣券
			useIntegral(e) {
				this.price = 0;
				this.is_integral = e.detail.value;
				this.is_integral ? this.use_integral = 1 : this.use_integral = 0; //是否使用抵扣券(请求用)
				//console.log(this.is_integral);
				this.getData(); //重新获取订单详情


				/* this.total_integral_use = 0;	//总共可使用的积分
				this.list.forEach((item) => {
					console.log('integral',item);
					this.total_integral_use = this.total_integral_use + (item.integral.integral_deduction_price) * 1;
				})
				this.total_integral = (this.total_price - this.total_integral_use).toFixed(2); */
			},
			//去重
			unique(arr) {
				for (var i = 0, len = arr.length; i < len; i++) {
					for (var j = i + 1, len = arr.length; j < len; j++) {
						if (arr[i] === arr[j]) {
							arr.splice(j, 1);
							j--; // 每删除一个数j的值就减1
							len--; // j值减小时len也要相应减1（减少循环次数，节省性能）   
							// console.log(j,len)

						}
					}
				}
				return arr;
			},
			// 0.1 获取订单页面数据
			getData(fn) {
				var sendData = this.sendData
				var list = []
				var mch_id_arr = []
				for (var i = 0; i < sendData.length; i++) {
					var mch_id = sendData[i]['mch_id']
					mch_id_arr.push(mch_id)
				}
				//获取门店IDS
				var mch_id_arr_unique = this.unique(mch_id_arr)
				var data = {
					user_address_id: this.addressId,
					use_score: this.use_score, //是否使用积分
					use_integral: this.use_integral, //是否使用抵扣券
				}
				for (var j = 0; j < mch_id_arr_unique.length; j++) {
					var slist = []
					for (var z = 0; z < sendData.length; z++) {
						if (mch_id_arr_unique[j] == sendData[z]['mch_id']) {
							slist.push(sendData[z])
						}
					}
					list.push({
						mch_id: mch_id_arr_unique[j],
						goods_list: slist,
						use_coupon_list: this.use_coupon_list //已使用优惠券列表
					})
				}
				data['list'] = list;
				this.params = data //请求数据
				//获取
				this.$http.request({
					url: this.$api.order.submit,
					method: 'post',
					showLoading: true,
					data: data
				}).then((res) => {
					if (res.code == 0) {
						console.log(res)
						if(res.data.is_need_address==0){
							this.addressShpw=false
						}
						let resList = res.data.list
						resList.forEach((item) => {
							let that = this;
							// 0.0.1 先初始化所有选中的优惠券
							that.use_coupon_list = [];
							if (item.same_goods_list && item.same_goods_list.length > 0) {
								item.same_goods_list.forEach((its, ids) => {
									its['coupon_name'] = '请选择优惠券';
									// gItem['sale_price'] = gItem.total_price * 1;
									its.coupon_list.forEach((couponItem, couponIndex) => {
										// 0.0.2应该是要先初始化当前商品对应的优惠券数据-先移除再添加
										couponItem.is_use = 0;
										// if(that.coupon_goods_id ==its.goods_id){
										// 	that.use_coupon_list.forEach((item,listIndex) => {
										// 		if(item.user_coupon_id==couponItem.id){
										// 			// 移除原先被选中的优惠券
										// 			that.use_coupon_list.splice(listIndex,1);
										// 		}
										// 	})
										// 	// its.coupon_name = '不使用优惠券';
										// }

										if (its.usable_user_coupon_id && its.usable_user_coupon_id != 0 && its.usable_user_coupon_id ==
											couponItem.id) { //如果这里使用了优惠券
											// 0.0.3被选中的优惠券切换状态，同时追加到所有使用的优惠券列表中
											let couponObj = {};
											couponObj['goods_id'] = its.goods_id;
											couponObj['user_coupon_id'] = couponItem.id;
											couponItem.is_use = 1; //切换对应优惠券列表中对应优惠券的is_use状态
											that.use_coupon_list.push(couponObj);
											its.coupon_name = couponItem.coupon_data.name;
											///console.log(that.use_coupon_list);
										}
										// 重复或不能使用优惠券的提示语
										if (its.coupon.coupon_error != '') {
											its.coupon_name = its.coupon.coupon_error;
										}
									})
								})
							}

						})

						this.list = resList;
						console.log(this.list)
						this.score_enable = res.data.score_enable;
						this.user_score = this.list[0].score.user_score; //用户拥有积分
						this.total_score_use = this.list[0].score.use_num; //可抵扣
						this.user_remaining_score = this.list[0].score.user_remaining_score; //剩余积分
						if (this.list[0].score.use) {
							this.is_checked = true; //是否打开使用积分
							this.use_score = 1; //是否使用积分(请求用)
							// this.is_integral = true; 
							// this.use_integral = 1;	
						} else {
							this.is_checked = false; //是否打开使用积分
							this.use_score = 0; //是否使用积分(请求用)
							// this.is_integral = false; 
							// this.use_integral = 0;	
						}
						this.integral_enable = res.data.integral_enable;
						this.user_integral = this.list[0].integral.user_integral; //用户拥有抵扣券
						this.total_integral_use = this.list[0].integral.use_num; //可抵扣
						this.user_remaining_integral = this.list[0].integral.user_remaining_integral; //剩余抵扣券
						if (this.list[0].integral.use) {
							this.is_integral = true; //是否打开使用抵扣券
							this.use_integral = 1; //是否使用抵扣券(请求用)
							// this.is_integral = true; 
							// this.use_integral = 1;	
						} else {
							this.is_integral = false; //是否打开使用抵扣券
							this.use_integral = 0; //是否使用抵扣券(请求用)
							// this.is_integral = false; 
							// this.use_integral = 0;	
						}
						// this.total_use_score_price = res.data.total_use_score_price;
						// this.sendData.forEach((item) => { //给发往后台的数据添加优惠券id字段
						// 	item.user_coupon_id = 0;
						// })

						// 这里是提交订单需要的数据
						this.subSendData = JSON.parse(JSON.stringify(this.sendData));
						this.user_coupon = res.data.user_coupon[0];


						if (!this.addressId) {
							this.user_address = res.data.user_address;
						}

						this.calcTotalPrice();

						// 这里后台返回了总价
						this.total_price = res.data.total_price;
						if(typeof fn  == "function"){
							fn.call(this);
						}
					} else {
						this.$http.toast(res.msg);
						setTimeout(() => {
							// uni.navigateBack()
						}, 1500)
					}
				})
			},
			getAddress() { //地址栏数据
				this.$http.request({
					url: this.$api.user.addressDetail,
					data: {
						id: this.addressId
					}
				}).then((res) => {
					if (res.code == 0) {
						this.user_address = res.data;
						uni.setStorageSync('user_address_cache',res.data);
					}
				})
			},
			showPopup(val, index, gIndex, goods_id) { //显示商品优惠券弹窗
				//index是店铺索引，gIndex是商品索引
				this.shop_index = index;
				this.goods_index = gIndex;
				this.coupon_goods_id = goods_id; //定位是哪个商品想要使用优惠券

				this.coupon_list = val;
				this.popupShow2 = true;
			},
			hidePopup() { //关闭优惠券底部弹窗
				this.popupShow2 = false;
			},
			useCoupon(name, index, user_coupon_id) { //优惠券使用
				var subtotal = 0, //小计
					list = this.list[this.shop_index], //所点击的店铺的数据
					goods_list = list.same_goods_list[this.goods_index], //所点击的商品的数据
					coupon_detail = this.coupon_list[index]; //点击的优惠券的数据

				if (name == 'notUse') { //判断是否使用优惠券
					goods_list.sale_price = goods_list.total_price * 1;
					// this.subSendData[this.goods_index].user_coupon_id = 0;

					let that = this;
					that.use_coupon_list.forEach((item, listIndex) => {
						if (item.user_coupon_id == user_coupon_id) {
							// 移除原先被选中的优惠券
							that.use_coupon_list.splice(listIndex, 1);
							//console.log('取消的优惠券id:'+user_coupon_id);
							//console.log(that.use_coupon_list);
						}
					})
					goods_list.coupon_name = '不使用优惠券';

					that.coupon_list.forEach((its, ids) => {
						if (its.id == user_coupon_id) {
							its.is_use = '0';
							that.$set(that.coupon_list[ids], 'is_use', '0');
						}
					})

					// 重新获取订单详情
					that.getData(); //重新获取订单详情

					// for (var key in that.user_coupon) { //判断是否使用相同的优惠券
					// 	if (that.user_coupon[key].id == coupon_detail.id) {
					// 		that.user_coupon[key].is_use = '0';
					// 		coupon_detail.is_use = '0';
					// 	}
					// }
				} else { //使用优惠券的情况
					let self = this;
					let isInClude = false;
					//往发送给后台数据添加优惠券id
					// 0.3 定位商品id与优惠券id
					let couponObj = {};
					couponObj['goods_id'] = self.coupon_goods_id;
					couponObj['user_coupon_id'] = user_coupon_id;
					// 循环当前优惠券列表
					self.coupon_list.forEach((its, ids) => {
						if (self.use_coupon_list.length > 0) { //判断已使用的优惠券列表中是否已经存在
							self.use_coupon_list.forEach((item, listIndex) => {
								if (item.user_coupon_id == user_coupon_id) { //存在于已使用的优惠券列表中
									self.$http.toast('不能选择相同的优惠券');
									isInClude = true;
									return false;
								}
							})
						}
						if (its.is_use == 1) { //如果之前有被选中的，初始化
							if (self.use_coupon_list.length > 0) {
								self.use_coupon_list.forEach((item, listIndex) => {
									if (item.user_coupon_id == its.id) {
										// 移除原先被选中的优惠券
										self.use_coupon_list.splice(listIndex, 1);
										//console.log(self.use_coupon_list);
										//console.log(its.id);
									}
								})
							}
							its.is_use = '0'; //先全部置0
							self.$set(self.coupon_list[ids], 'is_use', '0');
							// 在设置选中状态
						}
					})
					if (!isInClude) {
						// 现在被选中的切换状态，追加到已使用的优惠券列表中
						self.coupon_list[index].is_use = '1';
						self.$set(self.coupon_list[index], 'is_use', '1');
						self.use_coupon_list.push(couponObj);

						goods_list.coupon_name = coupon_detail.coupon_data.name; //获取优惠券名


					}

					// total_price当前商品的价格
					// type == '1'折扣，type == '2'满减
					if (coupon_detail.type == '1') { //计算使用优惠券后价格
						goods_list.sale_price = (((goods_list.total_price * 1) * (coupon_detail.coupon_data.discount * 1)).toFixed(2)) *
							1;
					} else {
						goods_list.sale_price = (((goods_list.total_price * 1) - (coupon_detail.coupon_data.sub_price * 1)).toFixed(2)) *
							1;
					}

					// 重新获取订单详情
					self.getData(); //重新获取订单详情

				}

				list.goods_list.forEach((item) => { //计算小计
					subtotal = subtotal + item.sale_price;
				})
				subtotal = subtotal + list.express_price * 1; //加上运费
				list.total_price = subtotal.toFixed(2); //将计算好的值,并保留两位小数，赋给对象里面的数据响应式更新视图

				this.calcTotalPrice();
				this.hidePopup();
			},

			calcTotalPrice() { //计算总价
				this.total_price = 0;
				this.list.forEach((item) => {
					this.total_price = this.total_price + (item.total_price * 1);
				})
				this.total_price = this.total_price.toFixed(2);
			},
			chooseAddr() { //选择地址
				uni.navigateTo({
					url: "/pages/user/address/list?name=cart"
				})
				// console.log(1231);
			},
			getAddressqh() {
				console.log('我给触发了');
			},
			// 2.2 订单提交
			btnPay() {
				if (this.is_request) return;
				this.is_request = true;

				var use_score;
				var obj = {};
				// 
				// this.list.forEach((item) => {
				// 	item.goods_list.forEach((gItem, gIndex) => {
				// 		this.subSendData[gIndex].total_price = gItem.total_price;
				// 		this.subSendData[gIndex].total_original_price = gItem.total_original_price;

				// 		this.subSendData[gIndex].use_score = gItem.use_score || 0;
				// 		this.subSendData[gIndex].use_score_after_price = gItem.use_score_after_price || 0;
				// 		this.subSendData[gIndex].use_score_price = gItem.use_score_price || 0;
				// 	})
				// })

				if (!(this.addressId || this.user_address.id)) {
					this.$http.toast('请添加收货地址!')
					this.is_request = false
					return;
				}
				//请求数据
				var params = this.params
				var list = params['list']
				for (var i = 0; i < list.length; i++) {
					list[i]['remark'] = this.remark
					list[i]['delivery'] = [{
						send_type: 'express'
					}]
					list[i]['use_coupon_list'] = this.use_coupon_list
				}
				params['list'] = list
				console.log(params)
				this.$http.request({
					url: this.$api.order.doSubmitOrder,
					method: 'post',
					data: params
				}).then((res) => {
					this.is_request = false; //防抖(重复请求)
					if (res.code == 0) {
						uni.removeStorageSync('orderData');
						uni.redirectTo({
							url: `/pages/order/pay?token=${res.data.token}&queue_id=${res.data.queue_id}`
						})
					} else {
						this.$http.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 20rpx 118rpx;
		box-sizing: border-box;
	}

	.tui-goods-info {
		border: 1px #eee solid;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name {
		padding-right: 40rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
		border-radius: 20rpx;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;

	}

	.img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}

	.toright {
		width: 8px;
		height: 8px;
		border-top: 1px #999 solid;
		border-right: 1px #999 solid;
		transform: rotate(45deg);
		margin-left: 5px;
	}

	.name {
		color: #1E1E1E;
		font-size: 11pt;
	}

	.tui-padding {
		box-sizing: border-box;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #BC0100;
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 99;
	}

	.tui-tabbar-box {
		padding: 0 20rpx 0 42rpx;
		height: 100%;
	}

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		background: linear-gradient(-30deg, rgba(214, 16, 13, 1), rgba(241, 72, 34, 1));
		width: 208rpx;
		height: 78rpx;
		border-radius: 50rpx;
		color: #FFFFFF;
		font-size: 11pt;
		text-align: center;
		line-height: 78rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	/*优惠券底部选择弹层*/
	.coupon-box {
		padding: 0 20rpx 80rpx;
		overflow: hidden;
	}

	.coupon-title2 {
		height: 100rpx;
		text-align: center;
		font-size: 12pt;
		color: #000000;
		position: fixed;
		background: #FFFFFF;
		width: 100%;
		left: 0;
		letter-spacing: 4rpx;
		font-weight: 700;
		z-index: 99;
		border-radius: 30rpx;
		line-height: 100rpx;
	}

	.coupon-icon {
		position: absolute;
		right: 30rpx;
		top: 4rpx;
		color: #ACACAC;
		font-size: 28rpx;
	}

	.coupon-tips {
		margin: 50rpx 0 30rpx;
		color: #000000;
		font-size: 11pt;
	}

	.coupon-item {
		width: 100%;
		height: 195rpx;
		display: flex;
		color: #000000;
		margin-bottom: 20rpx;
		background-size: cover !important;
	}

	.coupon-item-left {
		width: 248rpx;
		height: 100%;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.price-symbol {
		font-size: 14pt;
	}

	.price-int {
		font-size: 18pt;
		font-weight: 700;
		margin: 0 2rpx 0 4rpx;
	}

	.coupon-item-right {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: relative;
		padding: 20rpx 0 10rpx 20rpx;
		box-sizing: border-box;
	}

	.coupon-item-name {
		font-size: 11pt;
	}

	.coupon-item-condition {
		font-size: 10pt;
	}

	.coupon-item-time {
		font-size: 9pt;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 12rpx;
	}

	.receive {
		background: #bc0100;
		color: #FFFFFF;
		padding: 6rpx 30rpx;
		border-radius: 40rpx;
		font-size: 9pt;
	}

	.receive-col {
		background: #FFFFFF;
		border: 1px solid #BC0100;
		color: #BC0100;
	}

	.received {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 60rpx;
		color: #BC0100;
		line-height: 60rpx;
		height: 60rpx;
	}

	/*优惠券底部选择弹层*/

	.use-points {
		background: #FFFFFF;
		margin-top: 40rpx;
		border-radius: 20rpx;
		padding: 10rpx 30rpx;
		font-size: 26rpx;
		color: #000000;
	}

	.use-points .xieti {
		font-size: 18rpx;
		color: #666;
		overflow: hidden;
	}

	.use-points .xieti .text {
		font-style: oblique;
		color: #F53939;
		margin-left: 20rpx;
		padding-right: 10rpx;
	}

	.points-switch {
		transform: scale(0.7);
	}

	/* 0.2 商品列表样式 */
	.item-goods {
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
