<template>
	<view class="tabbar-container">
		<block>
			<view class="tabbar-item" v-for="(item, index) in tabbarList"
				:class="[item.centerItem ? 'center-item' : '']" :key="index" @click="changeItem(item)">
				<view class="item-top">
					<image :src="currentItem == item.id ? item.selectIcon : item.icon"
						:class="[item.centerItem ?'special_img':'img']">
					</image>
				</view>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</block>
	</view>
	
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
                 show:false,
				animation: null,
				currentItem: 0,
				tabbarList: [{
						id: 0,
						path: '/pages/index/index',
						icon: '/static/tabbar_icon/index.png',
						selectIcon: '/static/tabbar_icon/indexSelected.png',
						text: '首页',
						centerItem: false
					},
					{
						id: 1,
						path: '/pages/list/list',
						icon: '/static/tabbar_icon/list.png',
						selectIcon: '/static/tabbar_icon/listSelected.png',
						text: '排行榜',
						centerItem: false
					},
					{
						id: 2,
						path: '/pages/sharing/sharing',
						icon: '/static/tabbar_icon/share.png',
						selectIcon: '/static/tabbar_icon/cancel.png',
						centerItem: true
					},
					{
						id: 3,
						path: '/pages/message/message',
						icon: '/static/tabbar_icon/message.png',
						selectIcon: '/static/tabbar_icon/messageSelected.png',
						text: '消息',
						centerItem: false
					},
					{
						id: 4,
						path: '/pages/my/my',
						icon: '/static/tabbar_icon/my.png',
						selectIcon: '/static/tabbar_icon/mySelected.png',
						text: '我的',
						centerItem: false
					}
				]
			};
		},
		mounted() {
			this.currentItem = this.currentPage;
			uni.hideTabBar();
		},
		methods: {
			changeItem(item) {
				if (item.id === 2) {
					// #ifdef MP-WEIXIN 
					this.show=true
					this.$emit('userData',this.show);
					// #endif
					
					// #ifdef APP-PLUS||H5
					uni.navigateTo({
						url: item.path,
						animationType: 'fade-in',
						animationDuration: 300
					})
					// #endif
					
				} else {

					uni.switchTab({
						url: item.path
					});
				}

			}
		}
	};
</script>
<style lang="scss" scoped>
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.tabbar-container {
		z-index: 1000;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		box-shadow: 0 0 5px #999;
		display: flex;
		align-items: center;
		padding: 5rpx 0;
		color: #636263;

		.tabbar-item {
			width: 20%;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;

			.item-bottom {
				font-size: 28rpx;
				width: 100%;
				padding-bottom: 5rpx;
			}

			.item-top {
				width: 70rpx;
				height: 70rpx;
				padding: 10rpx;
				padding-bottom: 4rpx;
				transition: transform 0.3s ease; // 添加过渡效果

				.img {
					width: 40rpx;
					height: 40rpx;
				}

				.special_img {
					width: 100%;
					height: 100%;
				}
			}

		}

		.item-active {
			color: #0ee7e6;
		}

		.rotate {
			transform: rotate(45deg); // 旋转图标180度
		}

		.center-item {
			display: block;
			position: relative;

			.item-top {
				flex-shrink: 0;
				width: 110rpx;
				height: 110rpx;
				position: absolute;
				top: -36rpx;
				left: calc(50% - 50rpx);
				border-radius: 50%;
				box-shadow: 0 0 5px #999;
				background-color: #ffffff;
				padding: 8rpx;
			}

			.item-bottom {
				position: absolute;
				bottom: 5rpx;
			}
		}
	}
</style>