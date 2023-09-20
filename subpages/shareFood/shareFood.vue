<template>
	<view class="mainbox">
		<!-- 图片上传 -->
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title"></view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
					<view class="uni-uploader-body">

						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
									</image>
									<view class="img-delete-box" @tap="deImg(index)">
										<image class="img-delete-icon" lazy-load="true"
											src="../../static/icons/del1.png"></image>
									</view>
								</view>
							</block>
							<view class="uni-uploader__input-box" :style="'display:'+isOverNum">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 填写文字部分 -->
		<view style="margin-top: 10rpx;">
			<input class="uni-input" placeholder="填写标题会有更多赞哦~" placeholder-class="my-input-placeholder" />
			<view class="uline"></view>

			<textarea class="u-textinput" placeholder="添加粤菜介绍" placeholder-class="my-input-placeholder"
				placeholder-style="font-size:28rpx;" />
			<view class="uline"></view>

			<!-- 分类选择 -->
			<view class="selectBox" @click="bindPickerChange">
				<view>
					<text class="iconfont icon-gongneng" style="margin-right: 6rpx;"></text>
					<text>分类选择</text>
				</view>
				<view class="category">{{list[selectIndex].label}}</view>
				<text class="iconfont icon-xiangyoujiantou rightText"></text>
				<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
			</view>
			<view class="uline"></view>

			<!-- 定位选择 -->
			<view class="locateBox locate" @click="getLocation">
				<view class="topBox locate">
					<view>
						<text class="iconfont icon-address" style="margin-right: 6rpx;"
							:style="'color:'+textcolor"></text>
						<text :style="'color:'+textcolor">{{mainAddress}}</text>
					</view>
					<view class="rightText">
						<text>{{selectTxt}}</text>
						<text class="iconfont icon-xiangyoujiantou"></text>
					</view>
				</view>

				<view class="addressBox locate" v-show="isHasLocation">
					<text>{{longAddress}}</text>
				</view>
				<view class="uline" ></view>
			</view>
			
		</view>
		<div class="goods-carts">
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
				@buttonClick="buttonClick" style="margin-top: 10rpx;" />
		</div>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				selectTxt: '选择',
				isHasLocation: false,
				longAddress: '',
				mainAddress: '所在位置',
				textcolor: '',
				isOverNum: 'block',
				imageList: [],
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				countIndex: 8,
				show: false,
				selectIndex: 0,
				list: [{
						value: '0',
						label: '中国'
					},
					{
						value: '1',
						label: '美国'
					},
					{
						value: '2',
						label: '巴西'
					},
					{
						value: '3',
						label: '日本'
					}
				],
				options: [{
					icon: 'calendar',
					text: '存草稿'
				}],
				customButtonGroup1: [{
					text: '发布分享',
					backgroundColor: 'linear-gradient(90deg, #0aece6, #33d0f1)',
					color: '#fff'
				}]
			}
		},

		methods: {
			onClick(e) {
				uni.showToast({
					title: '已存为草稿',
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			getLocation() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						if (res.errMsg === 'chooseLocation:ok') {
							that.textcolor = ' #0ee7e6',
								that.mainAddress = res.name,
								that.longAddress = res.address,
								that.isHasLocation = true,
								that.selectTxt = '更换'
						}
						console.log(res);
					}
				});
			},
			bindPickerChange: function(e) {
				this.show = true
			},
			confirm(e) {
				this.selectIndex = e[0].value
				console.log(this.selectIndex)
			},
			deImg(index) {
				uni.showModal({
					content: "确定要删除这张照片吗？",
					success: (e) => {
						if (e.confirm) {
							this.imageList.splice(index, 1)
							console.log(this.imageList)
							if (this.imageList.length <= 8) {
								this.isOverNum = 'block';
							}
						}
					},
				})

			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			chooseImage: function() {
				let allImageUrl = []
				uni.chooseImage({
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList
						.length : this.count[this.countIndex],
					success: (res) => {
						if (res.tempFilePaths.length >= 9) {
							this.isOverNum = 'none'
						}

						const tempFilePaths = res.tempFilePaths;
						for (let i = 0; i < tempFilePaths.length; i++) {
							uni.uploadFile({
								url: 'http://192.168.100.125:3000/uniapi/upload',
								filePath: tempFilePaths[i],
								name: 'file',
								success: function(res) {
									allImageUrl.push(JSON.parse(res.data).data[0].data)
									console.log(allImageUrl)
									uni.setStorageSync('AllImageUrl', allImageUrl)
								},
								fail: (err) => {
									console.error(err);
								}
							});
						}

						this.imageList = [...this.imageList, ...res.tempFilePaths];
						console.log(this.imageList)

						if (this.imageList.length >= 9) {
							this.isOverNum = 'none'
						}
					},
				})
				if (this.imageList.length > 8) {
					this.isOverNum = 'none';
				} else if (this.imageList.length < 8) {
					this.isOverNum = 'block';
				}
			}
		}
	}
</script>

<style lang="scss">
	.mainbox {
		padding: 20rpx;

		.img-delete-box {
			width: 40rpx;
			height: 40rpx;
			background-color: rgba(92, 113, 136, 0.6);
			position: absolute;
			right: 0rpx;
			top: 0;
			display: flex;
			border-bottom-left-radius: 10rpx;

			.img-delete-icon {
				margin: auto;
				width: 60%;
				height: 60%;
			}
		}

	}

	.uline {
		border-bottom: 0.5rpx solid #e7e7e7 ;
		height: 1rpx;
		margin: 10rpx 0 10rpx 0;
	}

	.my-input-placeholder {
		color: #a0a0a0;
		font-size: 28rpx;
	}

	.u-textinput {
		padding: 0rpx 10rpx;
		line-height: 60rpx;
	}

	.selectBox {
		padding: 0rpx 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;

		.category {
			margin: auto;
			color: black;

		}

		.rightText {
			color: #a0a0a0;
		}

	}

	.locateBox {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		flex-direction: column;
        
		.locate{
			padding: 0rpx 10rpx;
		}
		.topBox {
			display: flex;
			justify-content: space-between;
		}

		.rightText {
			color: #a0a0a0;
		}

		.addressBox {
			width: 95%;
			margin: 0 auto;
			padding: 8rpx 25rpx;

			text {
				display: block;
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			border-radius: 15rpx;
			box-shadow: #c8c6c6 0rpx 0rpx 10rpx;
			margin-bottom: 30rpx;
		}

	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		z-index: 100;
		bottom: 10rpx;
		box-shadow: 0 -5px 5px -5px #e7e7e7;
	}
</style>