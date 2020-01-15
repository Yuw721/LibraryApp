<template>
	<!-- 报名失败 -->
	<view class="applyResult">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">报名失败</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='accepted'>抱歉，报名失败！</view>
			<view class='become'>您没有报名《4·23世界读书日一起读书吧》活动。</view>
			<image src='../../static/imgs/defeated.png'></image>
			<view class="element">
				<view>导致报名的因素：</view>
				<view>1、未开通网上支付功能。</view>
				<view>2、密码错误。</view>
				<view>3、限额超限。</view>
				<view>4、网络通讯问题。</view>
			</view>
			<view class='maxBtn' @click="toHelp">帮助与反馈</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {}
		},
		onLoad(option) {},
		methods: {
			// 帮助与反馈
			toHelp() {},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>

</style>
