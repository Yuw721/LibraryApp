<template>
	<!-- 登录 -->
	<view>
		<image src="../../static/imgs/login_bg.png" class="loginBg"></image>
		<view class="loginBtnBox">
			<view class="maxBtn" @click="weixinLogin">微信登录</view>
			<!-- <view class="maxBdBtn" @click="phoneLogin">手机号登录</view> -->
			<view class="around" @click="aroundBtn">随便看看</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			...mapMutations(['login']),
			// 手机登录
			phoneLogin() {
				uni.navigateTo({
					url: "phoneLogin"
				})
			},
			// 随便看看
			aroundBtn() {
				uni.switchTab({
					url: "../index/index"
				})
			},
			//微信登录
			weixinLogin() {
				let that = this;
				uni.login({
					provider: "weixin",
					success(loginRes) {
						uni.getUserInfo({
							provider: 'weixin',
							success(infoRes) {
								app.basic.getAjaxData(com.common('authorization'), infoRes.userInfo, "POST").then(res => {
									let token = res.data.data;
									let msg = res.data.msg;
									uni.setStorage({
										key: 'token',
										data: token,
										success() {
                                            app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
                                                var userInfoRes = res.data.data
                                                that.login(userInfoRes);
                                                uni.showToast({
                                                    title: msg,
                                                    icon: 'success',
                                                    success() {
                                                        uni.switchTab({
                                                            url: 'my'
                                                        })
                                                    }
                                                })
											})
										}
									})
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.loginBg {
		display: block;
		width: 674upx;
		height: 832upx;
		margin: 0 auto 0;
		padding-top: 208upx;
	}

	.loginBtnBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.maxBdBtn {
		margin: 36upx auto;
	}

	.around {
		text-align: center;
		color: #999999;
		font-size: 24upx;
		margin-bottom: 20upx;
	}
</style>
