<template>
	<!-- 历史活动 -->
	<view class="taskList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">历史活动</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul b_t">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class="swiper">
					<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
						<view class="warmPrompt" v-if="list.length <= 0 && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无历史活动哦。</view>
						</view>
						<view class="infoItem flex_l_e" v-for="(item, index) in list" :key="index" @click="toActivityDet(item)">
							<image :src="item.posterImage ? item.posterImage : '../../../imgs/zwt.png'" class="bookImg" mode="aspectFit"></image>
							<view class="info">
								<view class="omit tit">{{ item.theme }}</view>
								<view>活动时间：{{ item.activityStratTime }}</view>
								<view>
									活动状态：
									<text class="redCol" v-if="item.enrollState == 0 || item.enrollState == 1">火爆</text>
									<text class="mainCol" v-if="item.enrollState == 2">一般</text>
									<text class="mainCol" v-if="item.enrollState == 3">空闲</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>

				<swiper-item class="swiper">
					<view class="warmPrompt" v-if="momentList.length <= 0">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，暂无精彩瞬间哦。</view>
					</view>
					<view class="infoItem flex_l_e" v-for="(item, index) in momentList" :key="index" @click="toActivityDet(item)">
						<image :src="item.posterImage ? item.posterImage : '../../../imgs/zwt.png'" mode="aspectFit"></image>
						<view class="info">
							<view class="omit tit">{{ item.theme }}</view>
							<view>活动时间：{{ item.activityStratTime }}</view>
							<view>
								活动状态：
								<text class="redCol" v-if="item.enrollState == 0 || item.enrollState == 1">火爆</text>
								<text class="mainCol" v-if="item.enrollState == 2">一般</text>
								<text class="mainCol" v-if="item.enrollState == 3">空闲</text>
							</view>
						</view>
					</view>
					<!-- <image src="../../static/imgs/collect.png"></image> -->
					<!-- <view class="infoItem flex_l_e" @click="toActivityDet">
							<image src="http://img3x0.ddimg.cn/54/10/23642640-1_w_7.jpg" class="bookImg"></image>
							<view class="info">
								<view class="omit tit">w那些渐渐喜欢上人的日子那些渐渐喜欢上人的日子</view>
								<view>活动时间：2019年5月30号</view>
								<view>
									活动状态：
									<text class="mainCol">一般</text>
								</view>
							</view>
						</view> -->
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
			tabArr: ['全部活动', '精彩瞬间'],
			currentIndex: 0, // 选择tab栏下标
			pageCurrent: 1,
			pageSize: 10,
			list: [],
			momentList: [],
			loadState: false
		};
	},
	onLoad() {
		this.tabClick(this.currentIndex);
	},
	methods: {
		// 活动详情
		toActivityDet(item) {
			uni.navigateTo({
				url: '../index/activity_det?id=' + item.id
			});
		},
		//
		// 点击tab栏
		tabClick(index) {
			this.list = [];
			this.currentIndex = index;
			this.pageCurrent = 1;
			if (this.currentIndex == 0) {
				this.getHistotyActivityFun();
			}
		},
		// tab栏左右滑动
		tabChange(e) {
			this.currentIndex = e.detail.current;
			this.tabClick(this.currentIndex);
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		/**
		 * 获取历史活动
		 */
		getHistotyActivityFun() {
			this.loadState = false;
			var that = this;
			var param = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize
			};
			app.basic.getAjaxData(com.activity('listHistoryActivity'), param, 'POST').then(res => {
				this.loadState = true;
				if (res.data.status == true) {
					if (res.data.data.total == 0) {
						that.result = false;
					} else {
						var list = res.data.data.records;
						if (list.length < that.pageSize) {
							if (list.length === 0) {
								uni.showToast({
									icon: 'none',
									title: '没有更多数据'
								});
							} else {
								that.list = that.list.concat(list);
							}
							that.hasMoreData = false;
						} else {
							that.list = that.list.concat(list);
							that.hasMoreData = true;
							that.pageCurrent = that.pageCurrent + 1;
						}
					}
					console.log(that.list);
				}
			});
		},
		scrollView() {
			if (this.hasMoreData) {
				if (this.currentIndex == 0) {
					this.getHistotyActivityFun();
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据'
				});
			}
		}
	}
};
</script>

<style>
.taskList .scroll-ul .scroll-li {
	width: 50%;
	text-align: center;
	padding: 36upx 0 30upx 0;
}
</style>
