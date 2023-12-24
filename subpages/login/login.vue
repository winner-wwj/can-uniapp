<template>
	<view>
		<view class="">
			<view class="logo-box">
				<view class="content">
					<image src="../../static/logo.png" class="logo"></image>
					<text class="title">粤滋味</text>
				</view>
				<text class="childTitle">探&nbsp;&nbsp;&nbsp;索&nbsp;&nbsp;新&nbsp;&nbsp;味&nbsp;&nbsp;&nbsp;蕾</text>
			</view>
		</view>
		<view>
			<button class="iconfont icon-weixin wechat-login-button" @click='login'>&nbsp;&nbsp;微信授权一键登录</button>
			<button class="phone-login-button" @click='login'>手机号码登录/注册</button>
		</view>
		<view>
			<checkbox-group @change="agree" class="bottom-radio" :style="newStyle">
				<checkbox :value="isChecked" color="#2bd5ef" style="transform:scale(0.7)" />
				我已阅读并同意
				<navigator url="/pages/questionType/questionType" class="btnblue">《用户服务协议》</navigator>
				<text style="margin-right: 10rpx;">和</text>
				<navigator url="/pages/questionType/questionType" class="btnblue">《隐私政策》</navigator>
			</checkbox-group>
		</view>

	</view>
</template>


<script>
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				token:'',
				isChecked: true,
				state: false,
				newStyle: ''
			};
		},
		onLoad() {

		},
		methods: {
			agree(e) {
				this.state = e.detail.value[0]
			},
			login() {

				let that = this
				if (!that.state) {
					uni.showToast({
						title: '请阅读并同意平台服务协议及隐私协议',
						icon: 'none'
					});
					that.newStyle = 'animation: slide 1s ease-in-out 3 '
				} else {
					that.newStyle = ''
					// 获取用户信息
					uni.getUserProfile({
						desc: '登录后可同步数据',
						success: async (obj) => {
							uni.login({
								provider: 'weixin',
								success: async (res) => {
									console.log(res)
									that.code = res.code;
									if (res.errMsg == 'login:ok') {
										uni.showLoading({
										  title: "粤滋味",
										  mask: true
										});
										$http.request({
											url: '/login',
											method: 'POST',
											data: {
												code: that.code
											},
										}).then(res1 => {
											uni.hideLoading()
											that.userInfo = obj.userInfo;
											console.log(that.userInfo, '用户信息');
											that.token= res1.data.token
											uni.setStorageSync('loginToken', res1.data
												.token)
											uni.setStorageSync('userInfo', that.userInfo)
											if (res1.data.token) {
												uni.showToast({
													icon: 'success',
													title: res1.msg,
													duration: 6000,
													success: () => {
														uni.switchTab({
															url: '/pages/my/my'
														})
													}
												});

											}

										})
									    .catch(err=>{
											uni.hideLoading()
											uni.showToast({
												icon: 'error',
												title: err,
												duration: 3000,							
											});
											console.log(err)
										})
									}
								}
							})

						}
					})

				}

			},
		}
	}
</script>

<style lang="scss">
	@keyframes shake {
		0% {
			transform: translateX(0);
		}

		10%,
		90% {
			transform: translateX(-5px);
		}

		20%,
		80% {
			transform: translateX(5px);
		}

		30%,
		50%,
		70% {
			transform: translateX(-3px);
		}

		40%,
		60% {
			transform: translateX(3px);
		}

		100% {
			transform: translateX(0);
		}
	}

	.animate-shake {
		animation: shake 0.5s;
	}

	.wechat-login-button {
		display: block;
		width: 80%;
		height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		text-decoration: none;
		background: linear-gradient(to right, rgb(51, 208, 241), rgb(7, 236, 228));
		border: none;
		border-radius: 50rpx;
		cursor: pointer;
	}

	.phone-login-button {
		display: block;
		width: 80%;
		height: 80rpx;
		font-size: 30rpx;
		color: #020202;
		text-align: center;
		text-decoration: none;
		background: #fff;
		border: 1rpx solid #d5d5d5;
		border-radius: 50rpx;
		cursor: pointer;
		margin-top: 30rpx;
	}

	.logo-box {
		width: 100%;
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 0.5rpx solid black;
			padding-bottom: 20rpx;

			.logo {
				width: 90rpx;
				height: 90rpx;
				border-radius: 20rpx;

			}

			.title {
				font-size: 65rpx;
				font-family: 楷体;
				font-weight: bolder;
				margin-left: 5rpx;
			}

		}

		.childTitle {
			display: block;
			text-align: left;
			font-family: 楷体;
			font-size: 30rpx;
			margin-top: 20rpx;
		}
	}

	.bottom-radio {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 25rpx;
		position: absolute;
		bottom: 60rpx;
		// left: 50%;
		// transform: translateX(-50%);

		.btnblue {
			color: #458dd2;
		}

	}

	@keyframes slide {
		0% {
			transform: translateX(0);
		}

		50% {
			transform: translateX(-20rpx);
		}

		100% {
			transform: translateX(0);
		}
	}
</style>