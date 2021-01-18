<template>
	<view>
		<thematic :mode='mode' :thematicData='thematicData'></thematic>
		<view>
			<tui-tabbar :selectedColor='selectedColor' :tabBar='tabBar' @click='cutTabbar' :current='tabCurrent'></tui-tabbar>
		</view>
		<placeholder :placeholderHeight='placeholderHeight3'></placeholder>
	</view>
</template>

<script>
	import thematic from '@/components/thematic/thematic.vue';
	import placeholder from "@/components/placeholder/placeholder.vue";
	import tuiTabbar from "@/components/tui-tabbar/tui-tabbar.vue";
	export default{
		components:{
			thematic,
			placeholder,
			tuiTabbar
		},
		data(){
			return{
				placeholderHeight3:130,
				// 1是简易模式 2是列表模式
				mode:2,
				thematicData:{
					cutBool:true,
					cat_list:[
						{
							id: 2,
							name: "公司介绍",
							sort: 1,
							is_delete: 0,
							store_id: 1,
							goods_count: 1,
						},
						{
							id: 3,
							name: "装修课堂",
							sort: 1,
							is_delete: 0,
							store_id: 1,
							goods_count: 1,
						}
					],
					goods_list:[
						{
							id: 3,
							goods_id: 3,
							pic_url: "http://store.hzstorm.com/web/uploads/image/store_1/e539b37428e4fd12d4d43d79f0b2829cdcea5432.jpg",
							cover_pic: "http://store.hzstorm.com/web/uploads/image/store_1/e539b37428e4fd12d4d43d79f0b2829cdcea5432.jpg",
							title: "家居装修小知识有哪些",
							name: "家居装修小知识有哪些",
							page_url: "/pages/topic/index?id=3",
							layout: 1,
							read_count: 161,
						},
						{
							id: 4,
							goods_id: 4,
							pic_url: "http://store.hzstorm.com/web/uploads/image/store_1/4f5a64d2fc154ce78a82a0d382d7133d4984da0e.jpg",
							cover_pic: "http://store.hzstorm.com/web/uploads/image/store_1/4f5a64d2fc154ce78a82a0d382d7133d4984da0e.jpg",
							title: "装修常识小课堂（一） ",
							name: "装修常识小课堂（一） ",
							page_url: "/pages/topic/index?id=4",
							layout: 1,
							read_count: 171,
						},
						{
							id: 5,
							goods_id: 5,
							pic_url: "http://store.hzstorm.com/web/uploads/image/store_1/b825534fdc10409829bb8ae3ef548ed6b2672192.jpg",
							cover_pic: "http://store.hzstorm.com/web/uploads/image/store_1/b825534fdc10409829bb8ae3ef548ed6b2672192.jpg",
							title: "15个室内装修必备小常识，掌握5条你家装修就完美了！",
							name: "15个室内装修必备小常识，掌握5条你家装修就完美了！",
							page_url: "/pages/topic/index?id=5",
							layout: 1,
							read_count: 114,
						}
					]
				},
				//导航栏数据
				tabCurrent: 3,
				selectedColor: '#ec3838',
				tabBar: [{
						pagePath: '/pages/index/index',
						text: '首页',
						iconPath: 'http://store.hzstorm.com/web/statics/images/appnavbar/nav-icon-index.png',
						selectedIconPath: 'http://store.hzstorm.com/web/statics/images/appnavbar/nav-icon-index.active.png',
						hump: false,
						num: 2,
					},
					{
						pagePath: '/pages/category/index',
						text: '分类',
						iconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/79691493d6d0bb20d220b72979a722f2fe7cc93a.png',
						selectedIconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/615c6a0cc94d7dd5bf117226a39f3a1c0c044164.png',
						hump: false,
					},
					{
						pagePath: '/pages/cart/index',
						text: '购物车',
						iconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/210501f35c607240cbcc5e79e9766fb34ca59b17.png',
						selectedIconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/b5c37596e0264be7a10554b60eae0fc7eeacaa88.png',
						hump: false,
					},
					{
						pagePath: '/pages/topic/index',
						text: '专题',
						iconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/7526707ecddaa73582f5ca9bc678063bcd11a999.png',
						selectedIconPath: 'http://store.hzstorm.com/web/uploads/image/store_1/8f527dc57595a6aabd23a058073c3bea19297386.png',
						hump: false,
					},
					{
						pagePath: '/pages/user/index',
						text: '我的',
						iconPath: 'http://store.hzstorm.com/web/statics/images/appnavbar/nav-icon-user.png',
						selectedIconPath: 'http://store.hzstorm.com/web/statics/images/appnavbar/nav-icon-user.active.png',
						hump: false,
					},
				],
			}
		},
		methods:{
			cutTabbar(val) {
				this.tabCurrent = val.index;
				uni.redirectTo({
					url: val.pagePath
				})
			},
		}
	}
</script>

<style>
</style>
