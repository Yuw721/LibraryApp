<template>
	<!-- 支付记录 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">支付记录</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="warmPrompt" v-if="payHistoryInfo.length <= 0 && loadState">
				<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
				<view class="txt">亲，您暂无支付记录哦。</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="flex_l_c p_t30" v-for="(item, index) in payHistoryInfo" :key="index">
					<view class="iconfont icon-bi payIcon"></view>
					<view class="flex_b_c b_b inteItem">
						<view>
							<view class="itemName" v-if="item.logtype == 30207">借阅卡押金</view>
							<view class="itemName" v-if="item.logtype == 30020">延误费</view>
							<view class="itemName" v-if="item.logtype == 30021">污损罚款</view>
							<view class="itemName" v-if="item.logtype == 30022">丢失罚款</view>
							<view class="itemName" v-if="item.logtype == 30023">租书罚款</view>
							<view class="itemName" v-if="item.logtype == 30024">其它罚款</view>
							<view class="itemDate">{{ item.regtime }}</view>
						</view>
						<view class="itemPer">-{{ item.data4 }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			payHistoryInfo: [],
			loadState: false
		};
	},
	onLoad() {
		this.getPayHistoryInfo();
	},
	methods: {
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		//获取支付记录
		getPayHistoryInfo() {
			this.loadState = false;
			var pageDTO = { pageCurrent: 1, pageSize: 1000 };
			app.basic.getAjaxData(com.query('payHistory'), pageDTO, 'GET').then(res => {
				this.loadState = true;
				if (res.data.status) {
					this.payHistoryInfo = res.data.data;
				}
			});
		}
	}
};
</script>

<style>
.mainCom {
	width: 100%;
}
.payIcon {
	font-size: 90upx;
	color: #9b9b9b;
	margin-bottom: 16upx;
	margin-right: 10upx;
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
	padding-right: 20upx;
}
</style>
