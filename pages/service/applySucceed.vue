<template>
	<!-- 报名成功 -->
	<view class="applyResult">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">报名成功</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='accepted'>恭喜您，报名成功！</view>
			<view class='become'>您已经成功报名了《4·23世界读书日一起读书吧》活动。</view>
			<image src='../../static/imgs/succeed.png'></image>
			<view class="come">
				<view>活动时间</view>
				<view>2019年4月29日9:00~2019年5月6日17:30</view>
				<view>湖请准时参加活动</view>
			</view>
		</view>
		<view class='maxBtn' @click="toActivitiesIn">查看详情</view>
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
			// 查看详情
			toActivitiesIn() {
				uni.navigateTo({
					url: 'activitiesIn'
				});
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
