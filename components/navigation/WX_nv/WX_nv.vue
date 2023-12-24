<template>
	<view>
		<!-- 状态栏高度 -->
		<view :style="{ height: `${statusBarHeight}px` }"></view>

		<view class="topnav" :style="{
	  height: `${barHeight}px`,
	  'line-height': `${barHeight}px`,
	  'text-align': 'center',
	}">
			<view class="addSelect" @click="selectCity">
				<!-- {{location}} -->
				<text> {{location}} </text>
				<text class="iconfont icon-xiajiantou xia"></text>
			</view>

			<view class="search">
				<text class="iconfont  icon-sousuo searIcon"></text>
				<text>搜索粤菜、菜谱</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			statusBarHeight: {
				type: String,
			},
			barHeight: {
				type: String,
			},
			location: {
				type: String,
				default: '定位中...'
			}
		},
		data() {
			return {
				city: ''
			}
		},
		mounted() {

		},
		destroyed() {

		},
		methods: {
			selectCity() {
				uni.navigateTo({
					url: '/subpages/selectCity/selectCity'
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.topnav {
		height: 58rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
	}

	.addSelect {
		display: flex;
		justify-content: space-around;

		.xia {
			color: 20rpx;
			align-self: center;
		}
	}

	.addSelect text {
		font-size: 16px;
		color: #171717;
	}

	.search {
		width: 52%;
		height: 30px;
		display: flex;
		margin-left: 15rpx;
		justify-content: center;
		align-items: center;
		background-color:#f6f6f6;
		border-radius: 30rpx;

		.searIcon {
			margin-top: 5rpx;
			margin-right: 10rpx;
		}
	}

	.search text {
		font-size: 13px;
		color: #B3B3B3;
	}
</style>