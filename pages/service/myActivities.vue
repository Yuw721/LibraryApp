<template>
	<!-- 我的活动 -->
	<view class="taskList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">我的活动</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul b_t">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{item}}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class='swiper'>
					<view class="warmPrompt" v-if="signActivityList.length==0">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，您暂无报名活动哦。</view>
						<view class="linkBtn" @click="toActivityApply">去报名</view>
					</view>
					<view class='infoItem flex_l_e' @click="toActivityDet(item.id)" v-for="(item,index) in signActivityList" :key="item.id">
						<image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
						<view class="info">
							<view class='omit tit'>{{item.theme}}</view>
							<view>活动时间：{{item.activityStratTime}}</view>
							<view class="flex_b_e">
								<view>已报名人数：<text class="mainCol">{{item.applyNumberPeople}}</text></view>
								<view class='grayBtn'>已报名</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item class='swiper'>
					<view class="warmPrompt" v-if="pastActivityList.length==0">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，您暂无参加任何活动哦。</view>
						<view class="linkBtn" @click="toActivityApply">去报名</view>
					</view>
					<view class='infoItem flex_l_e' @click="toActivityDet(item.id)" v-for="(item,index) in pastActivityList" :key="item.id">
						<image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
						<view class="info">
							<view class='omit tit'>{{item.theme}}</view>
							<view>活动时间：{{item.activityStratTime}}</view>
							<view class="flex_b_e">
								<view>已报名人数：<text class="mainCol">{{item.applyNumberPeople}}</text></view>
								<view class='grayBtn'>已报名</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				// tab栏
				tabArr: ["已报名的活动", "往期活动"],
				currentIndex: 0, // 选择tab栏下标
				signActivityList: [], //已报名活动
				pastActivityList: [], //往期活动
			}
		},
		onLoad() {},
		onShow() {
			this.signActivityList = [];
			this.pastActivityList = [];
			this.getMyActivity();
		},
		methods: {
			// 去报名
			toActivityApply() {
				uni.navigateTo({
					url: "activityApply"
				})
			},
			// 活动详情
			toActivityDet(id) {
				uni.navigateTo({
					url: "../index/activity_det?id=" + id
				})
			},
			// 点击tab栏
			tabClick(index) {
				this.currentIndex = index;
			},
			// tab栏左右滑动
			tabChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取我的活动
			getMyActivity() {
				app.basic.getAjaxData(com.activity('getMyActivity'), null, "GET").then(res => {
					var data = res.data.data;
					data.forEach((item) => {
						if (item.activityState == 3) {
							this.pastActivityList.push(item);
						} else {
							this.signActivityList.push(item);
						}
					})
				})
			},
		}
	}
</script>

<style>
	.taskList .scroll-ul .scroll-li {
		width: 50%;
		text-align: center;
		padding: 36upx 0 30upx 0;
	}
</style>
