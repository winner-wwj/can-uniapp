<template>
	<view>
		<view style="height:15px;"></view>

		<view class="topnav">
			<view class="addSelect" @click="selectCity">
				<text >{{location}}</text>
				<text class="iconfont icon-xiajiantou xia"></text>
			</view>

			<view class="search">
				<text class="iconfont  icon-sousuo searIcon"></text>
				<text>搜索粤菜、菜谱</text>
			</view>
			<view class="fenlei">
				<text class="iconfont icon-fenlei"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			location: {
				type: String,
				default: '定位中...'
			}
		},
		mounted() {
	
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
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.addSelect {
		display: flex;
		justify-content: space-around;
		padding: 3rpx;

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
		width: 65%;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F7F7F7;
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

	.fenlei {
		display: flex;
	}

	.fenlei text {
		font-size: 25px;
		align-self: center;
	}
</style>