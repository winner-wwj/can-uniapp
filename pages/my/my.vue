<template>
	<view class="main-box">
		<view class="topBox">
			<view class="infoBox">
				<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="icon"></image>
				<image v-else src="https://i.postimg.cc/9MpSxbWn/demoLogo.png" class="icon"></image>
				<view class="username">
					<view class="name">
						<text v-if="!token" @click="toLogin"  class="mian-name">登录</text>
						<text v-else class="mian-name">{{ userInfo.nickName }}</text>
					</view>
					<view class="sign" v-if="token">
						<text>{{ userInfo.account }}</text>
					</view>
				</view>
			</view>
			<view class="bottomBox"></view>

		</view>
		<!-- 微信端分享发布的弹出层 -->
		<!-- #ifdef MP-WEIXIN -->
		<van-popup :show="flag" round closeable @close="closepop" position="bottom" custom-style="height:55%;">
			<wxPopup></wxPopup>
		</van-popup>
		<!-- #endif -->
		<Tabbar :current-page="4" @userData="getdata"></Tabbar>
	</view>

</template>

<script >
	import Tabbar from '@/components/tabbar/tabbar.vue'
	import wxPopup from '@/components/other/wxPopup.vue'
	export default {
		data() {
			return {
				token:'',
				flag: false,
				userInfo:{},
			}
		},
		components: {
			Tabbar,
			wxPopup
		},
		onShow(){
			this.userInfo=uni.getStorageSync('userInfo')
			this.token=uni.getStorageSync("loginToken")
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:'/subpages/login/login'
				})
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
	.main-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-image: linear-gradient(#33d0f1 0%, #ffffff 30%);
		overflow-y: hidden;

		.topBox {
			display: flex;
			align-items: center;
			width: 100%;
			height: 320rpx;
			position: relative;

			.infoBox {
				display: flex;
				align-items: center;

				.icon {
					width: 108rpx;
					height: 108rpx;
					opacity: 1;
					margin: 0 24rpx 0rpx 36rpx;
					border-radius: 50%;
				}
			}

			.username {
				display: flex;
				flex-direction: column;
				font-weight: 400;
				color: #ffffff;
				line-height: 44rpx;

				.name {
					font-size: 40rpx;

					.mian-name {
						display: block;
						width: 360rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.sign {
					font-size: 28rpx;
				}
			}
		}

		.bottomBox {
			width: 100%;
			height: calc(100vh - 216rpx);
			background-color: white;
			position: absolute;
			top: 320rpx;
			border-radius: 40rpx 40rpx 40rpx 40rpx;
			padding: 50rpx 32rpx 0rpx 32rpx;
			box-sizing: border-box;
		}

	}
</style>