<template>
	<view class="main-Location"  >
		<view class="search">
			<text class="iconfont  icon-sousuo searIcon"></text>
			<input type="text" placeholder="输入城市" v-model="searchCity" @input="search">
		</view>
		<view v-show="isShow">
			<!-- 字母区域 -->
			<view class="Location-Letter">
				<view hover-class="Click-Latter" @tap="getLetter('ScrollTop')">*</view>
				<view v-for="(l,i) in LatterName" :key="i" hover-class="Click-Latter" @tap="getLetter(l)"
					:style="{'color': LetterId === l ? '#4662D9' : '#5c5c5c','border-radius':LetterId === l ? '50px':'','background-color':LetterId === l ? '#e9e9e9':''}">
					{{l}}
				</view>
			</view>

			<view class="ynq-AutoLocation u_flex jcsb">
				<view class="ynq-AutoAddress">
					<text class="iconfont icon-dingwei" style="color: #898989;margin-left: 15rpx;"></text>
					<text class="ynq ynq-dizhi"></text>
					<text>当前定位城市：</text>
					<text>{{CityName}}</text>
				</view>
			</view>

			<scroll-view scroll-y="true" class="ynq-ScrollView" :scroll-into-view="LetterId" >

				<!-- 热门城市 -->
				<view class="ynq-HotCity" id="ScrollTop">
					<view class="ynq-HotCityTitle">
						<text class="ynq ynq-fire"></text>
						<text style="color:#898989;">热门城市</text>
					</view>
					<view class="ynq-HotCityList flex">
						<text class="radius-3" @tap="getStorage(item)" v-for="(item,index) in HotCity"
							:key="index">{{item}}</text>
					</view>
				</view>
				<!-- 城市列表 -->
				<view class="ynq-CityList">
					<block v-for="(item,index) in CityList" :key="index">
						<view class="ynq-CityLetter" :id="item.initial">{{item.initial}}</view>
						<view class="ynq-CityLine">
							<text @tap="getStorage(item_city.name)" v-for="(item_city,name_index) in item.list"
								:key="name_index">{{item_city.name}}</text>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<view v-show="!isShow" class="searchList">
			<view class="line"></view>
			<view v-if="notNull==true" class="resultList" v-for="(item,index) in searchResult " :key="index"
				@tap="getStorage(item)">
				{{item}}
			</view>
			<view v-if="notNull==false" class="notFound">
				<image src="../../static/icons/notfound.png"></image>
				<text>暂无搜索结果</text>
			</view>
		</view>
	</view>
</template>

<script>
	var cityData = require('../../city.json')
	var pages = getCurrentPages();
	var currPage = pages[pages.length - 1]; //当前页面
	var prevPage = pages[pages.length - 2]; //上一个页面
	export default {
		data() {
			return {
				notNull: true,
				searchResult: '',
				isShow: true,
				searchCity: '',
				CityName: '北京',
				HotCity: ['北京', '上海', '天津', '重庆', '广州', '深圳', '成都', '杭州'],
				LatterName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				CityList: cityData.city,
				LetterId: '',
			}
		},
		
		onLoad() {
			this.getCityName()
		},
		
		onUnload() {
			uni.removeStorageSync('city')
		},
		//监听软键盘的搜索按钮点击的
		onNavigationBarSearchInputConfirmed() {
			if (this.searchCity === "") {
				return uni.showToast({
					title: "关键词不能为空",
					icon: "none"
				})
			}
			this.search();
		},
		methods: {
			
			
			//判断关键词是否为空和跳转页面的
			search() {
				if (this.searchCity === "") {
					this.isShow = true
				} else {
					this.isShow = false
					var list = this.CityList.flatMap(item => item.list)
					var resList = []
					list.forEach(item => {
						resList.push(item.name)
					})
					this.searchResult = resList.filter(item => item.includes(this.searchCity));
					if (this.searchResult.length != 0) {
						this.notNull = true
					} else if (this.searchResult.length == 0) {
						this.notNull = false
					}
					console.log(this.searchResult)
				}
				uni.hideKeyboard();
			},
			//获取定位点
			getLetter(name) {
				this.LetterId = name

			},
			//存储城市缓存
			getStorage(Name) {
				uni.setStorage({
					key: 'City_Name',
					data: Name
				})
				this.CityName = Name
				//跳转返回
				let object = {
					name: Name,
				};
				//#ifdef APP-PLUS
				prevPage.$vm.otherFun(object)
				// #endif

				//#ifdef MP-WEIXIN||H5
				uni.$emit('CityName', {
					name: Name
				})
				// #endif

				uni.navigateBack()
			},
			//获得城市缓存
			getCityName() {
				let _that = this;
				setTimeout(function() {
					uni.getStorage({
						key: 'City_Name',
						success(res) {
							_that.CityName = res.data
						}
					})
				}, 500)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main-Location {
		height: 100vh;
	}

	.search {
		width: 92%;
		height: 30px;
		display: flex;
		margin: 0 auto;
		margin-top: 10rpx;
		margin-bottom: 5rpx;
		justify-content: flex-start;
		align-items: center;
		background-color: #F7F7F7;
		border-radius: 6rpx;

		.searIcon {
			margin-top: 4rpx;
			margin-right: 10rpx;
			margin-left: 20rpx;
		}

		text {
			font-size: 13px;
			color: #B3B3B3;
		}

		input {
			font-size: 13px;

		}
	}

	.searchList {
		padding-top: 18rpx;

		.line {
			width: 100%;
			height: 1rpx;
			background-color: #f7f7f7;
		}

		.resultList {
			width: 92%;
			height: 60rpx;
			line-height: 60rpx;
			margin: 0 auto;
			padding-left: 10rpx;
			font-size: 26rpx;
			border-bottom: 2rpx solid #f7f7f7;
		}

		.notFound {
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 30%;
				height: 25%;
			}

			text {
				font-size: 20rpx;
				color: #d0d7e0;
			}
		}
	}


	.ynq-AutoLocation {
		width: calc(100% - 40rpx);
		border-bottom: 1px solid #f7f7f7;
		padding: 25rpx 20rpx;
		margin-bottom: 20rpx;

		text.ynq {
			font-size: 32rpx;
			margin-right: 10rpx;
		}

		text {
			font-size: 30rpx;
		}
	}

	.ynq-HotCity {
		padding: 20rpx;
	}

	.ynq-HotCityTitle {
		padding: 0rpx 0rpx;

		text.ynq {
			margin-right: 10rpx;
			color: #ff0000;
			font-size: 32rpx;
		}

		text {
			font-size: 30rpx;
		}
	}

	.ynq-HotCityList {
		padding: 20rpx 0 0 0;
		flex-wrap: wrap !important;

		text {
			width: 110rpx;
			display: inline-block;
			text-align: center;
			border: #f5f5f5 solid 4rpx;
			background: #ffffff;
			border-radius: 5rpx;
			font-size: 26rpx;
			margin: 10rpx;
			padding: 15rpx 10rpx;
		}
	}

	.Location-Letter {
		position: fixed;
		right: 5rpx;
		top: 180rpx;
		width: 30rpx;
		z-index: 100;

		view {
			display: block;
			width: 30rpx;
			text-align: center;
			height: 35rpx;
			line-height: 35rpx;
			font-size: 22rpx;
			transition: ease .3s;
			-webkit-transition: ease .3s;
		}
	}

	.ynq-CityList {
		padding: 0px 40rpx 0 20rpx;

		.ynq-CityLetter {
			line-height: 30rpx;
			height: 40rpx;
			font-size: 24rpx;
			border-bottom: 1px solid #f7f7f7;
			padding-left: 10rpx;
			color: #909090;
		}

		.ynq-CityLine {
			margin: 20rpx 0px;

			text {
				display: block;
				line-height: 60rpx;
				padding: 0px 10rpx;
				font-size: 30rpx;
				color: #767676;

				&:nth-child(even) {
					background-color: rgba(200, 200, 200, .12);
				}
			}
		}
	}

	.ynq-ScrollView {
		height: calc(100vh - 160rpx);
	}

	.Click-Latter {
		font-size: 30rpx !important;
	}

	.jcsb {
		justify-content: space-between;
	}

	.u_flex {
		display: flex;
	}
</style>