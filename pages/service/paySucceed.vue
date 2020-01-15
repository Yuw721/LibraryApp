<template>
	<!-- 支付成功 -->
	<view class="applyResult">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">支付成功</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='accepted'>停车费支付成功！</view>
			<view class='become'>您已经成功缴纳停车费。</view>
			<image src='../../static/imgs/succeed.png'></image>
			<view>温馨提示：</view>
			<view>支付成功够，请在30分钟内驾驶车辆离开停车场。如超时，费用照常计算。</view>
		</view>
		<view class='maxBtn' @click="gotIt">知道了</view>
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
			// 知道了
			gotIt() {
				uni.switchTab({
					url:'service'
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
</style>
