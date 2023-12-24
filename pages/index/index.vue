<template>
	<view>
		<view>
			<!-- 顶部导航的适配 -->
			<!--#ifdef MP-WEIXIN-->
			<Wxnav :status-bar-height="statusBarHeight" :bar-height="barHeight" :location="location"></Wxnav>

			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" @fabClick="fabClick" />
			<!--  #endif -->


			<!-- #ifdef H5 -->
			<H5nav :location="location"></H5nav>
			<!--  #endif -->

			<!-- #ifdef H5||APP-PLUS -->
			<view class="toTop">
				<text class="iconfont icon-18huidaodingbu top"></text>
			</view>
			<!--  #endif -->

		</view>

		<view class="nav">
			<!-- 顶部拖动的滑块 -->
			<scroll-view scroll-x="true" class='scroll-content'>
				<view :id="'top'+index" class='scroll-item' v-for='(item,index) in topBar' :key='index'
					@tap='changeTab(index)' :class='topBarIndex===index? "f-active-size":"f-size"'>
					<text :class='topBarIndex===index? "f-active-color":"f-color"'>{{item.name}}</text>
				</view>
			</scroll-view>
		</view>

		<!-- 内容模块 -->
		<swiper @change='onChangeTab' :current="topBarIndex" :style="'height:'+clentHeight+'px;'">
			<swiper-item></swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+clentHeight+'px;'">
					<view>
						<!-- 轮播 -->
						<!-- <uSwiper :list="list" :height="600" indicator-pos="bottomLeft"></uSwiper> -->
						<!-- #ifdef APP-PLUS -->
						<!-- <uSwiper :list="list" :height="400"  indicator-pos="bottomLeft" ></uSwiper> -->
						<!-- #endif -->
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item></swiper-item>
			<swiper-item></swiper-item>
		</swiper>

		<!-- 微信端分享发布的弹出层 -->
		<!-- #ifdef MP-WEIXIN-->
		<van-popup :show="flag" round closeable @close="closepop" position="bottom" custom-style="height:50%;">
			<wxPopup></wxPopup>
		</van-popup>
		<!-- #endif -->
		<Tabbar :current-page="0" @userData="getdata"></Tabbar>
	</view>

</template>

<script>
	var QQMapWX = require('../../common/qqmap-wx-jssdk.js')
	let qqmapsdk = new QQMapWX({
		key: 'GKFBZ-ERIKQ-NRZ5Q-4EBDC-XRUDT-GKBN7'
	});
	import $http from '@/common/api/request.js'
	import Tabbar from '@/components/tabbar/tabbar.vue'
	import Wxnav from '@/components/navigation/WX_nv/WX_nv.vue'
	import H5nav from '@/components/navigation/H5_nv.vue'
	import uSwiper from '@/components/u-swiper/u-swiper.vue'
	import wxPopup from '@/components/other/wxPopup.vue'
	export default {
		data() {
			return {
				code: '',
				flag: false,
				topBarIndex: 1, //选中的索引
				clentHeight: 0, //内容块的高度值
				statusBarHeight: '', //状态栏高度
				barHeight: '',
				horizontal: 'right', //水平对齐方式
				vertical: 'bottom', //垂直对齐方式
				direction: 'vertical', //展开菜单显示方式
				latitude: '',
				longitude: '',
				location: '',
				userInfo: '',
				session_key: '',
				openid: '',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					buttonColor: '#0ee7e6',
					iconColor: '#fff'
				},

				content: [{
						iconPath: '/static/icons/fun.png',
						selectedIconPath: '/static/icons/fun.png',
						text: '分类',
						active: false
					},
					{
						iconPath: '/static/icons/top.png',
						selectedIconPath: '/static/icons/top.png',
						text: '置顶',
						active: false
					},

				],

				topBar: [{
						id: 1,
						name: '关注'
					},
					{
						id: 2,
						name: '推荐'
					},
					{
						id: 3,
						name: '附近'
					},
					{
						id: 4,
						name: '菜谱'
					},
				],
				list: [{
						Bimg: '/static/image/无醇酒.JPG',
						image: [{
								img: '/static/image/小黄鱼.JPG'
							},
							{
								img: '/static/image/广式烧鸭.JPG'
							}
						],
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						Bimg: '/static/image/无醇酒.JPG',
						image: [{
								img: '/static/image/小黄鱼.JPG'
							},
							{
								img: '/static/image/广式烧鸭.JPG'
							}
						],
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						Bimg: '/static/image/无醇酒.JPG',
						image: [{
								img: '/static/image/小黄鱼.JPG'
							},
							{
								img: '/static/image/广式烧鸭.JPG'
							}
						],
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		components: {
			Tabbar,
			Wxnav,
			H5nav,
			uSwiper,
			wxPopup
		},
		onNavigationBarButtonTap(e) {
			if (e.float === 'left') {
				uni.navigateTo({
					url: '/subpages/selectCity/selectCity'
				})
			}
		},
		onLoad() {

			const res = uni.getSystemInfoSync(); //获取系统信息
			const system = res.platform; //获取当前的设备

			//#ifdef MP-WEIXIN
			// 状态栏高度
			this.statusBarHeight = res.statusBarHeight;
			// 胶囊位置数据
			const {
				top,
				height
			} = wx.getMenuButtonBoundingClientRect();
			// 自定义导航栏高度 = 胶囊高度 + 胶囊的padding*2, 如果获取不到设置为38
			this.barHeight = height ? height + (top - this.statusBarHeight) * 2 : 38;
			// #endif

			// let res1 = this.wxAuthorize()
			// if (res1) {
			// 	this.getLocation()

			// }
		},
		onReady() {
			// 获取系统信息可以获取窗口高度
			uni.getSystemInfo({
				success: (res) => {
					// uni.upx2px(80):顶部导航高度是80rpx,upx2px可以将rpx转px,
					this.clentHeight = res.windowHeight - uni.upx2px(80) - this.getClientHeight();
				}
			})
		},
		onShow(e) {
			//#ifdef MP-WEIXIN||H5
			let that = this
			uni.$on('CityName', function(e) {
				that.location = e.name
			})
			// #endif

			//#ifdef APP-PLUS
			this.otherFun()
			// #endif
		},
		methods: {
			

			//获取可视区域高度
			getClientHeight() {
				const res = uni.getSystemInfoSync(); //加了Sync是使用同步获取系统信息
				const system = res.platform; //获取当前的设备
				if (system === 'ios') {
					// 获取手机状态栏的高度res.statusBarHeight，44是顶部标题的高度
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return res.statusBarHeight - 23;
				} else { //微信小程序不用处理
					return 0;
				}

			},
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},

			otherFun(object) {
				if (object) {
					console.log(object.name)
					this.location = object.name
					var webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, {
						text: this.location,
					})
				} else {
					return
				}
			},
			async getLocation() {

				const res = await new Promise((resolve) => {
					uni.getLocation({
						type: 'wgs84',
						success(res) {
							resolve(res);

						}
					})
				})
				console.log(res)
				const latitude = res.latitude
				const longitude = res.longitude

				this.latitude = latitude,
					this.longitude = longitude

				const res2 = await new Promise(resolve => {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude,
							longitude
						},
						success: (res) => {

							resolve(res)
						}
					})

				})
				console.log(res2.result)
				this.location = res2.result.ad_info.city.slice(0, -1)
				uni.setStorage({
					key: 'City_Name',
					data: this.location
				})
				// #ifdef APP-PLUS  
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text: this.location,
				})
				// #endif
				console.log(this.location)
			},

			wxAuthorize: function(scope = 'scope.userLocation') {
				return new Promise(resolve => {
					uni.authorize({
						success: () => {
							resolve(true)
						},
						fail() {
							resolve(false)
						}
					})
				})
			},
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			fabClick() {
				// uni.showToast({
				// 	title: '点击了悬浮按钮',
				// 	icon: 'none'
				// })
			},
			changeTab(index) {
				if (this.topBarIndex === index) {
					return;
				}
				this.topBarIndex = index;
			},
			getdata(e) {
				this.flag = e

			},
			closepop() {
				this.flag = false;
			},
		}
	}
</script>

<style lang="scss">
	$uni-shadow-base: 0 1px 5px 2px rgba($color: #000000, $alpha: 0.1) !default;

	.toTop {
		width: 70rpx;
		height: 70rpx;
		background-color: #fefdfb;
		border-radius: 50%;
		box-shadow: $uni-shadow-base;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 15px;
		bottom: 100px;

		.top {
			font-size: 40rpx;
		}

	}


	.nav {
		padding-top: 16rpx;
		text-align: center;
	}

	.scroll-content {
		width: 100%;
		height: 70rpx;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		padding: 10rpx 30rpx;

	}

	.f-active-size {
		font-size: 32rpx;
		font-weight: bold;
	}

	.f-active-color {
		padding: 10rpx 0;
		color: #292929;
		border-bottom: 6rpx solid #0ee7e6;
	}

	.f-size {
		font-size: 28rpx;
	}

	.f-color {
		color: #6b6b6b;
	}
</style>