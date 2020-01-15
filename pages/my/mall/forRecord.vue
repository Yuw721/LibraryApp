<template>
	<!-- 兑换记录 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">兑换记录</view>
			</view>
		</view>
		<view class="mainCom">
			<!-- <view class='noSrh' v-if='integralMallExchangeRecord.length <= 0'>
				<image src='../../../imgs/collect.png' class='srhImg'></image>
				<view class='noText'>暂无兑换记录哦~</view>
			</view> -->
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="itemInfo" v-for="(item, index) in integralMallExchangeRecord" :key="index">
					<view class="date b_b flex_b_c">
						<view>兑换日期：{{ item.gmtCreate }}</view>
						<view class="orange" v-if="item.status == 1">已使用</view>
						<view class="redColor" v-if="item.status == 0 && item.days < 1">已过期</view>
					</view>
					<view class="flex_b_c itemBox">
						<view class="flex_l_c">
							<image :src="item.pUrl" class="recordIcon"></image>
							<view class="recordName">{{ item.pName }}</view>
						</view>
						<view class="recordName">{{ item.pScore }}积分</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import app from '../../../public/app.js';
import com from '../../../public/com.js';
export default {
	data() {
		return {
			integralMallExchangeRecord: [], //积分数组
			pageCurrent: 1, // 当前页数
			pageSize: 10, // 一页多少条
			result: true ,//是否有搜索结果  true：有  false: 无
			hasMoreData: true
		};
	},
	onLoad() {
		this.getIntegralMallExchangeRecord();
	},
	methods: {
		scrollView() {
			let that = this;
			if (that.hasMoreData) {
				that.getIntegralMallExchangeRecord();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据'
				});
			}
		},
		// 获取积分详情
		getIntegralMallExchangeRecord() {
			uni.showToast({
				title: '加载中...',
				icon:"loading",
			})
			let that = this;
			var pageDTO = {
				pageCurrent: that.pageCurrent,
				pageSize: that.pageSize
			};
			app.basic.getAjaxData(com.user('getIntegralMallExchangeRecord'), pageDTO, 'POST').then(res => {
				uni.hideToast()
				if (res.data.status == true) {
					if (res.data.data.totalCount == 0) {
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
								that.integralMallExchangeRecord = that.integralMallExchangeRecord.concat(list);
							}
							that.hasMoreData = false
						} else {
							that.integralMallExchangeRecord = that.integralMallExchangeRecord.concat(list),
							 that.hasMoreData = true, 
							 that.pageCurrent = that.pageCurrent + 1;
						}
					}
				}
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.mainCom .itemInfo {
	width: 86%;
	padding: 5% 6%;
	box-shadow: 1px 1px 20px 5px #f7f7f7;
	margin: 40rpx 1%;
	border-radius: 20rpx;
}

.date {
	color: #474747;
	font-size: 26rpx;
	padding-bottom: 20rpx;
}

.itemBox {
	padding: 30rpx 0 0;
}

.recordIcon {
	width: 112rpx;
	height: 112rpx;
	margin-right: 24rpx;
}

.recordName {
	color: #3b3b3b;
	font-size: 30rpx;
	font-weight: 500;
}
</style>
