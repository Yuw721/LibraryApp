<template>
	<!-- 手机登录 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
			</view>
		</view>
		<view class="mainCom">
			<view class="topTit">手机号码</view>
			<view class="b_b">
				<input type="number" v-model="phone" placeholder="请输入手机号码"/>
			</view>
			<view class="maxBtn" @click="toCode">获取验证码</view>
		</view>
		<view class="loginBtnBox flex_c_c">
			<view class="iocnBox"><text class="iconfont icon-weixin"></text></view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				phone: ""
			}
		},
		onLoad() {},
		methods: {
			// 验证码
			toCode() {
				uni.navigateTo({
					url: 'code'
				})
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	.mainCom {
		width: 85%;
	}
	.mainCom input {
		padding-bottom: 28upx;
	}
	.mainCom .maxBtn {
		width: 100%;
		margin-top: 84upx;
	}
	.topTit {
		color: #020202;
		font-size: 60upx;
		font-weight: bold;
		padding: 80upx 0;
	}
	
	.iocnBox {
		width: 90upx;
		height: 90upx;
		border: 2upx solid #EDEDED;
		border-radius: 50%;
		text-align: center;
		line-height: 90upx;
	}
	
	.iocnBox .iconfont {
		font-size: 50upx;
		color: #07AD42;
	}
	
	.loginBtnBox {
		position: fixed;
		bottom: 120upx;
		left: 0;
		width: 100%;
	}
</style>
