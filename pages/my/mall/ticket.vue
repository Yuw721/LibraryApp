<template>
	<!-- 券包 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">券包</view>
			</view>
		</view>
		<view class="mainCom">
			<!-- <view class='noSrh' v-if='integralMallExchangeRecord.length <= 0'>
				<image src='../../../imgs/collect.png' class='srhImg'></image>
				<view class='noText'>暂无券可使用哦~</view>
			</view> -->
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view v-for="(item, index) in integralMallExchangeRecord" :key="index" class="flex_l_c ticketItem" v-if="item.status == 0">
					<image :src="item.pUrl" class="ticketImg"></image>
					<view class="item flex_b_c">
						<view class="dot"></view>
						<view>
							<view class="name">{{ item.pName }}</view>
							<view class="date">{{ item.gmtCreate }}</view>
						</view>
						<view class="stateOk" v-if="item.status != 0">已使用</view>
						<view :class="item.days > 0 ? 'stateOk' : 'stateNo'" v-else>{{ item.days > 0 ? '剩余天数：' + item.days : '已过期' }}</view>
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
			result: true, //是否有搜索结果  true：有  false: 无
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
				pageSize: that.pageSize,
				key: 0
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
							(that.integralMallExchangeRecord = that.integralMallExchangeRecord.concat(list)), (that.hasMoreData = true), (that.pageCurrent = that.pageCurrent + 1);
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
.mainCom {
	width: 98%;
	padding-top: 180upx;
}

.ticketItem {
	width: 94%;
	margin: 20rpx auto;
	box-shadow: 1px 1px 10px 5px #f7f7f7;
	padding: 20rpx 0;
	position: relative;
}

.ticketItem .dot {
	width: 20upx;
	height: 24upx;
	border-radius: 50%;
	background: #f4f4f4;
	position: absolute;
	top: 50%;
	left: -6upx;
	transform: translateY(-50%);
}

.ticketImg {
	width: 80upx;
	height: 80upx;
	padding: 0 36upx 0 40upx;
}

.item {
	width: 70%;
}

.name {
	font-size: 28rpx;
	color: #4f4f4f;
	padding-bottom: 20rpx;
	font-weight: bold;
}

.date {
	font-size: 24rpx;
	color: #aaa;
}

.stateOk {
	font-size: 26rpx;
	color: #d86161;
}

.stateNo {
	font-size: 26rpx;
	color: #d1d1d1;
}
</style>
