<template>
	<!-- 停车信息 -->
	<view id="cardBox">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">停车信息</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="topPart">
				<view class="flex_b_c cardTitBox">
					<view class="cardTit">
						<view class="actTit">停车信息</view>
						<view class="date">{{ parkingPaymentInfo.payTime }}</view>
					</view>
					<image src="../../static/imgs/payCar.png" class="payImg"></image>
				</view>
				<view class="parkInfo">
					<view class="flex_b_c">
						<view>进场时间</view>
						<view>{{ parkingPaymentInfo.entryTime }}</view>
					</view>
					<!-- <view class="flex_b_c">
						<view>出场时间</view>
						<view>{{parkingPaymentInfo.payTime}}</view>
					</view> -->
					<view class="flex_b_c activityPlaceBox">
						<view class="activityPlaceTit">停车地点</view>
						<view class="activityPlace">{{ parkingPaymentInfo.parkName }}</view>
					</view>
					<view class="flex_b_c">
						<view>停车总时间</view>
						<view>{{ parkingPaymentInfo.countTime }}整</view>
					</view>
					<view class="flex_b_c">
						<view>费用总计</view>
						<view>¥ {{ parkingPaymentInfo.payMoney }}.00</view>
					</view>
					<view class="flex_b_c b_t gross">
						<view>总金额</view>
						<view>¥ {{ parkingPaymentInfo.payMoney }}.00</view>
					</view>
				</view>
				<view class="flex_b_c">
					<view class="raduLeft"></view>
					<view class="line"></view>
					<view class="raduRight"></view>
				</view>
				<view class="charges">
					<view>停车场收费说明：</view>
					<view>缴费后请于规定时间离场，离场会自动抬杆。</view>
					<view>如找不到停车信息，请至相关缴费出等缴纳现金。</view>
				</view>
			</view>
			<view class="maxBtn" @click="pay">支付：¥ {{ parkingPaymentInfo.payMoney }}.00</view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			parkingPaymentInfo: null,
			payCarNum: ''
		};
	},
	onLoad(option) {
		this.parkingPaymentInfo = uni.getStorageSync('parkingPaymentInfo');
		this.payCarNum = uni.getStorageSync('payCarNum');
	},
	methods: {
		// 支付
		pay() {
			console.log(this.payCarNum);
			// uni.navigateToMiniProgram({
			// 	appId: 'wx54e676273869baa6',
			// 	path: 'pages/index/index?lotId=2817&lpn=' + this.payCarNum,
			// 	extraData: {},
			// 	envVersion: 'trial',
			// 	success(res) {
			// 		// 打开成功
			// 	}
			// });
			

			// uni.navigateTo({
			// 	url: 'paySucceed'
			// });
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
#cardBox .cardTit .actTit {
	font-size: 34upx;
	color: rgba(27, 39, 73, 1);
	line-height: 44upx;
}
</style>
