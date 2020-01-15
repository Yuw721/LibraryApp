<template>
	<!-- 本周活动 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">本周活动</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='activityItem' @click="toActivityDet(item.id)" v-for="(item,index) in activityList" :key="index">
				<view class='omit2 tit'>{{item.theme}}</view>
				<view class="flex_b_c">
					<view>
						<view>活动时间：{{item.activityStratTime}}</view>
						<view>已报名人数：{{item.applyNumberPeople}}</view>
					</view>
					<view class='buleBtn'>报名</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				activityList: []
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.getActivityList();
		},
		methods: {
			// 活动详情
			toActivityDet(id) {
				uni.navigateTo({
					url: "activity_det?id=" + id
				})
			},
			//获取本周活动
			getActivityList() {
				var param = {
					limit: 10000
				}
				app.basic.getAjaxData(com.activity('listIndexActivity'), param, "GET").then(res => {
					this.activityList = res.data.data
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
