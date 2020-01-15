<template>
	<!-- 任务列表 -->
	<view class="taskList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">任务列表</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul b_b b_t">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{item}}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class='swiper'>
					<view class="swiperItemBox">
						<view class='flex_b_c itemTask' v-for="(item, index) in noviceTask" :key="index">
							<view>
								<view class='taskName'>{{item.name}} + {{item.score}}</view>
								<view class='explain'>{{item.remark}}，上限{{item.flag}}次</view>
								<view class='flex_l_c'>
									<view class='progressBox'>
										<progress :percent="item.counts/item.flag*100" :color="mainCol" />
									</view>
									<text class='progressNum mainCol'>{{item.counts==null?0:item.counts}}/{{item.flag}}</text>
								</view>
							</view>
							<view class='btnBox'>
								<view v-if="item.counts == item.flag">已完成</view>
								<view class='toFinish' v-if="item.counts != item.flag">未完成</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item class='swiper'>
					<view class="swiperItemBox">
						<view class='flex_b_c itemTask' v-for="(item, index) in dailyTask" :key="index">
							<view>
								<view class='taskName'>{{item.name}} +{{item.score}}</view>
								<view class='explain'>{{item.remark}}，每日上限{{item.flag}}次</view>
								<view class='flex_l_c'>
									<view class='progressBox'>
										<progress :percent="item.counts/item.flag*100" :color="mainCol" />
									</view>
									<text class='progressNum mainCol'>{{item.counts==null?0:item.counts}}/{{item.flag}}</text>
								</view>
							</view>
							<view class='btnBox'>
								<view v-if="item.counts == item.flag">已完成</view>
								<view class='toFinish' v-if="item.counts != item.flag">未完成</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import app from '../../../public/app.js';
	import com from '../../../public/com.js';
	export default {
		data() {
			return {
				// tab栏
				tabArr: ["新手任务", "日常任务"],
				currentIndex: 0, // 选择tab栏下标
				noviceTask: [], //新手任务
				dailyTask: [], //日常任务
				mainCol: app.basic.mainCol, // 主色调
			}
		},
		onLoad() {
			let that = this;
			this.getNoviceTask();
			this.getDailyTask();
		},
		methods: {
			//获取新手任务
			getNoviceTask: function() {
				let that = this;
				var param = {
					type: 1
				}
				app.basic.getAjaxData(com.user("getTask"), param, "GET").then(res => {
					that.noviceTask = res.data.data;
				});
			},

			//获取日常任务
			getDailyTask: function() {
				let that = this;
				var param = {
					type: 2
				}
				app.basic.getAjaxData(com.user("getTask"), param, "GET").then(res => {
					that.dailyTask = res.data.data;
				});
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
		}
	}
</script>

<style>
	.mainCom {
		width: 100%;
	}
	
	
	.taskList .scroll-ul .scroll-li {
		width: 50%;
		text-align: center;
		padding: 36upx 0 30upx 0;
	}
	
	.taskList .scroll-ul .scroll-li:first-of-type view:first-of-type {
		border-right: 2upx solid #EDEDED;
	}

	.swiperItemBox {
		width: 90%;
		margin: 0 auto;
		padding: 40upx 0;
	}

	.itemTask {
		padding: 30upx 0 10upx;
	}

	.taskName {
		font-size: 30upx;
		color: #3B3B3B;
		font-weight: bold;
	}

	.explain {
		color: #9B9B9B;
		font-size: 22upx;
		padding-bottom: 20upx;
	}

	.progressBox {
		width: 250upx;
	}

	.progressNum {
		font-size: 22upx;
		padding-left: 16upx;
	}

	.btnBox>view {
		font-size: 28upx;
		padding: 12upx 36upx;
		color: #fff;
		background: #197CB7;
		border-radius: 44upx;
		box-shadow: 0px 3px 8px 0px rgba(25, 124, 183, 0.31);
	}

	.btnBox .toFinish {
		background: #7CC2EA;
	}
</style>
