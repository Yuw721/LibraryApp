<template>
	<!-- 积分详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">积分详情</view>
			</view>
		</view>
		<view class="mainCom">
			<!-- <view class="warmPrompt">
				<image src="../../../static/imgs/no_info.png" class="noInfoImg"></image>
				<view class="txt">亲，您暂无积分记录哦。</view>
			</view> -->
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="flex_l_c p_t30" v-for="(item, index) in sysUserIntegralDetail" :key="index">
					<image src="../../../static/imgs/integral_icon10.png" class="itemIcon"></image>
					<view class="flex_b_c b_b inteItem">
						<view>
							<view class="itemName">{{ item.typeName }}</view>
							<view class="itemDate">{{ item.gmtCreate }}</view>
						</view>
						<view class="itemPer">{{ item.type == 1 ? '+' + item.score : item.score }}</view>
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
			sysUserIntegralDetail: [], //积分数组
			pageCurrent: 1, // 当前页数
			pageSize: 10, // 一页多少条
			result: true ,//是否有搜索结果  true：有  false: 无
			hasMoreData:true,
		};
	},
	onLoad() {
		this.getSysUserIntegralDetail();
	},
	methods: {
		scrollView() {
			let that = this
			if (that.hasMoreData) { 
			      that.getSysUserIntegralDetail();
			    } else {
			      uni.showToast({
			        icon: "none",
			        title: '没有更多数据'
			      })
			    }
		},
		// 获取积分详情
		getSysUserIntegralDetail() {
			uni.showToast({
				title: '加载中...',
				icon:"loading",
			})
			let that = this;
			var pageDTO = {
				pageCurrent: that.pageCurrent,
				pageSize: that.pageSize
			};
			app.basic.getAjaxData(com.user('getSysUserIntegralDetail'), pageDTO, 'POST').then(res => {
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
								that.sysUserIntegralDetail = that.sysUserIntegralDetail.concat(list)
							}
							that.hasMoreData = false
						} else {
							that.sysUserIntegralDetail = that.sysUserIntegralDetail.concat(list), 
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
.itemIcon {
	width: 60upx;
	height: 60upx;
	margin-right: 16upx;
}
.inteItem {
	width: 86%;
}
.itemName {
	color: #000000;
	font-size: 32upx;
	padding-bottom: 16upx;
	font-weight: bold;
}
.itemDate {
	color: #a6a6a6;
	font-size: 24upx;
	padding-bottom: 28upx;
}
.itemPer {
	color: #000000;
	font-size: 32upx;
}
</style>
