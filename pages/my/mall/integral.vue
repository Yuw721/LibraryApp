<template>
	<!-- 积分 -->
	<view class="integral">
		<!-- <view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
			</view>
		</view> -->
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="topBox">
					<view class="iconfont icon-fanhui backBtn" @click="backBtn"></view>
					<view class="tasks" @click="toTaskList"></view>
					<view class="flex_b_c muneBox">
						<view @click="toIntegralDet">
							<image src="../../../static/imgs/integral_icon1.png" class="iconImg"></image>
							<view>积分{{ sysUserIntegral.totalUseScore }}</view>
						</view>
						<view @click="toForRecord">
							<image src="../../../static/imgs/integral_icon2.png" class="iconImg"></image>
							<view>兑换记录</view>
						</view>
						<view @click="toTicket">
							<image src="../../../static/imgs/integral_icon3.png" class="iconImg"></image>
							<view>券包</view>
						</view>
					</view>
				</view>
				<view class="exchange w90">
					<view class="flex_b_c plateBox p_tb40">
						<view class="plateTitBox">
							<view>积分兑换</view>
							<view class="plateLine"></view>
						</view>
					</view>
					<view class="twoBox">
						<view class="flex_b_c b_b b_r b_t p_tb40" v-for="(item, index) in integralMallCommodityList" :key="item.name" @click="toForDet(item)">
							<view class="goodsItem">
								<view class="goodsName">{{ item.name }}</view>
								<view class="goodsInt">{{ item.score }}积分</view>
							</view>
							<image :src="item.image" class="smallIconImg"></image>
						</view>
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
			sysUserIntegral: null,
			integralMallCommodityList: [],
			result: true, //是否有搜索结果  true：有  false: 无
			pageCurrent: 1,
			pageSize: 10,
			hasMoreData: true
		};
	},
	onLoad() {},
	onShow() {
		this.integralMallCommodityList = [],
		this.getSysUserIntegral();
		this.getIntegralMallCommodityList();
	},
	onHide() {},
	methods: {
		scrollView() {
			if (this.hasMoreData) {
				this.getIntegralMallCommodityList();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据'
				});
			}
		},
		// 获取个人积分
		getSysUserIntegral() {
			uni.showToast({
				icon: 'loading',
				title: '加载中...'
			});
			app.basic.getAjaxData(com.user('getSysUserIntegral'), {}, 'GET').then(res => {
				uni.hideToast();
				if (res.data.status) {
					uni.setStorageSync('sysUserIntegral', res.data.data);
					this.sysUserIntegral = res.data.data;
				}
			});
		},

		// 获取商品列表
		getIntegralMallCommodityList() {
			uni.showToast({
				icon: 'loading',
				title: '加载中...'
			});
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize
			};
			app.basic.getAjaxData(com.user('getIntegralMallCommodityList'), pageDTO, 'POST').then(res => {
				uni.hideToast();
				if (res.data.status == true) {
					if (res.data.totalCount == 0) {
						this.result = false;
					} else {
						var list = res.data.data.records;
						console.log(res.data.data.records);
						if (list.length < this.pageSize) {
							if (list.length === 0) {
								uni.showToast({
									icon: 'none',
									title: '没有更多数据'
								});
							} else {
								this.integralMallCommodityList = this.integralMallCommodityList.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.integralMallCommodityList = this.integralMallCommodityList.concat(list);
							this.hasMoreData = true;
							this.pageCurrent = this.pageCurrent + 1;
						}
					}
					console.log(this.integralMallCommodityList);
				}
			});
		},
		// 兑换详情
		toForDet(obj) {
			console.log(obj)
			uni.setStorageSync('integralMallCommodity',obj)
			uni.navigateTo({
				url: 'for_det'
			});
		},
		// 券包
		toTicket() {
			uni.navigateTo({
				url: 'ticket'
			});
		},
		// 兑换记录
		toForRecord() {
			uni.navigateTo({
				url: 'forRecord'
			});
		},
		// 积分详情
		toIntegralDet() {
			uni.navigateTo({
				url: 'integral_det'
			});
		},
		// 任务列表
		toTaskList() {
			uni.navigateTo({
				url: './taskList'
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
	width: 100%;
	padding-top: 0;
}
</style>
