<template>
	<!-- 延误缴费 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">延误缴费</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="warmPrompt" v-if="delayPayList.length <= 0 && loadState">
				<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
				<view class="txt">亲，您暂无延误缴费哦。</view>
			</view>
			<view class="infoItem flex_l_e" v-for="(item, index) in delayPayList" :key="index">
				<image :src="item.image" class="bookImg"></image>
				<view class="info">
					<view class="omit tit">{{ item.title }}</view>
					<view>到期时间：{{ item.regtime }}</view>
					<view class="flex_b_e">
						<view>
							延误时间：
							<text class="redCol">{{ item.days }}天</text>
						</view>
						<view class="buleBtn" @click="pay">缴费</view>
					</view>
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
			delayPayList: [],
			loadState: false
		};
	},
	onLoad(option) {
		this.getDelayPay();
	},
	methods: {
		getDelayPay() {
			this.loadState = false;
			app.basic.getAjaxData(com.payment('searchoverdue'), 'GET').then(res => {
				this.loadState = true;
				console.log(res);
				if (res.data.status) {
					this.delayPayList = res.data.data;
				}
			});
		},

		pay() {
			uni.showToast({
				title: '功能暂未开通',
				icon: 'none'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style></style>
