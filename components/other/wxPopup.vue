<template>
	<view class="box">
		<view class="shareBox leftbox">
			<text style="font-weight: bold;">发布菜谱</text>
			<view class="boxMask">
				<view class="txt1">
					<view class="txtStyle">
						<text>每一道粤菜菜谱都是一份珍贵的</text>
					</view>

				</view>
				<view class="txt2">
					<view class="txtStyle">
						<text>传承珍宝</text>
					</view>
				</view>
				<view style="width:85%; height: 120rpx;background-color: #dae6dc; ">
					<image src="../../static/icons/menu.png" class="shareicon"></image>
				</view>
				<view class="txt3">
					<view class="txtStyle">
						<text>您记录的粤菜菜谱</text>
					</view>
				</view>
				<view class="txt4">
					<view class="txtStyle">
						<text>将会让您的美味旅程永久留存</text>
					</view>
				</view>
			</view>

		</view>
		<view class="shareBox rightbox" @tap="toShareFood">
			<text style="font-weight: bold;">发布粤菜</text>
			<view class="boxMask">
				<view style="width:87%; height: 120rpx;background-color: #fff5da; ">
					<image src="../../static/icons/food.png" class="shareicon"></image>

				</view>
				<view class="txt_1">
					<view class="txtStyle">
						<text>每一次品尝，都是一次美味探索</text>
					</view>
				</view>
				<view class="txt_2">
					<view class="txtStyle">
						<text>让我们一起开启</text>
					</view>
				</view>
				<view class="txt_3">
					<view class="txtStyle">
						<text>粤菜之旅，发现更多美味的可能性</text>
					</view>
				</view>
				<view class="txt_4">
					<view class="txtStyle">
						<text>留下属于您的独特美食印记</text>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toShareFood() {
				uni.redirectTo({
					url: '/subpages/shareFood/shareFood'
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10rpx;

		.shareBox {
			width: 300rpx;
			height: 460rpx;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
		}

		.leftbox {
			background-color: #b7ceb4;
			padding-bottom: 45rpx;
			margin-right: -25rpx;
			text-align: center;
			font-size: 30rpx;
			line-height: 125rpx;
			color: #497a41;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txt1 {
				width: 85%;
				height: 30rpx;
				background-color: #dae6dc;
				font-size: 14rpx;
				position: relative;

			}

			.txt2 {
				width: 55%;
				height: 30rpx;
				background-color: #dae6dc;
				margin-left: -89rpx;
				font-size: 14rpx;
				position: relative;
			}

			.txt3 {
				width: 70%;
				height: 30rpx;
				background-color: #dae6dc;
				margin-left: -44rpx;
				font-size: 14rpx;
				position: relative;
			}

			.txt4 {
				width: 85%;
				height: 30rpx;
				background-color: #dae6dc;
				font-size: 14rpx;
				position: relative;
			}


		}

		.txtStyle {
			position: absolute;
			top: -48rpx;
			left: 10rpx;
		}

		.boxMask {
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;
			justify-content: center;

			.shareicon {
				width: 65rpx;
				height: 65rpx;
				top: 15rpx;
				// #ifdef MP-WEIXIN
				margin-top: 25rpx;
				//#endif
			}
		}

		.rightbox {
			background-color: #fde295;
			padding-bottom: 45rpx;
			margin-left: -25rpx;
			text-align: center;
			font-size: 30rpx;
			line-height: 125rpx;
			color: #d1a443;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txt_1 {
				width: 87%;
				height: 30rpx;
				background-color: #fff5da;
				font-size: 14rpx;
				position: relative;
			}

			.txt_2 {
				width: 55%;
				height: 30rpx;
				background-color: #fff5da;
				margin-left: -94rpx;
				font-size: 14rpx;
				position: relative;
			}

			.txt_3 {
				width: 87%;
				height: 30rpx;
				background-color: #fff5da;
				font-size: 14rpx;
				position: relative;
			}

			.txt_4 {
				width: 70%;
				height: 30rpx;
				background-color: #fff5da;
				margin-left: -49rpx;
				font-size: 14rpx;
				position: relative;
			}
		}
	}
</style>