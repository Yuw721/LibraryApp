<template>
	<!-- 兑换详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">兑换详情</view>
			</view>
		</view>
		<view class="mainCom">
			<view>
				<image
					:src="integralMallCommodity.remark"
					class="topBanner"
					mode="aspectFit"
					v-if="integralMallCommodity.remark != null && integralMallCommodity.remark != ''"
				></image>
				<view class="date b_b">卡券名称</view>
				<view class="flex_t_b itemBox">
					<view class="flex_l_c">
						<image :src="integralMallCommodity.image" class="recordIcon"></image>
						<view>
							<view class="recordName">{{ integralMallCommodity.name }}</view>
							<view class="recordPer">{{ integralMallCommodity.score }}积分</view>
						</view>
					</view>
					<view class="repertory">库存：{{ integralMallCommodity.stock }}</view>
				</view>
			</view>
			<view>
				<view class="date b_b">兑换须知</view>
				<view class="detInfo">
					<view>
						1、使用积分兑换的产品一旦兑换完成，不支持取消兑换，积分不予退还，请在兑换前谨慎选择兑换产品。若因不可抗力，导致订单无法交易成功，订单将被取消，积分将返还回原支付账户。
					</view>
					<view>
						2、请如实、正确填写收货地址，产品发出前如有问题及时找官方人员沟通修改，如因用户提供地址有误造成产品无法递送而退回的，视为用户自动放弃该产品，积分不予退还。
					</view>
					<view>3、本小程序将在兑换成功10个工作日内安排快递产品，用户可在个人中心查看发货状态。</view>
					<view>4、用户收到产品后，需严格遵守相关法律和产品使用说明，产品使用中造成的人身、财产损失与本小程序无关。</view>
					<view>
						5、用户在获得产品所有权后，本小程序不对产品做出任何担保（包括但不限于：产品质量，使用期限）和提供售后保障，如遇质量问题，用户需自行与产品生产商进行沟通，本小程序亦不对该沟通提供相应支持（包括但不限于：协助用户沟通，提供产品发票）。
					</view>
					<view>6、积分商城所有商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</view>
					<view>7、本小程序有权根据运营情况调整产品所需积分值。</view>
					<view>8、如遇恶意刷积分情况，本小程序有权取消该用户兑换资格并进行积分清零等处罚。</view>
				</view>
			</view>
		</view>
		<view class="botBtnBoxFix">
			<view
				class="maxBtn"
				v-if="sysUserIntegral.totalUseScore >= integralMallCommodity.score && integralMallCommodity.stock >= 1 && loadState == false"
				@click="exchange(integralMallCommodity)"
			>
				立即兑换
			</view>
			<view class="maxBtn" v-if="sysUserIntegral.totalUseScore < integralMallCommodity.score">积分不足</view>
			<view class="maxBtn" v-if="integralMallCommodity.stock < 1">库存不足</view>
		</view>
	</view>
</template>

<script>
import app from '../../../public/app.js';
import com from '../../../public/com.js';
export default {
	data() {
		return {
			integralMallCommodity: null,
			sysUserIntegral: null,
			loadState: false
		};
	},
	onLoad() {
		this.integralMallCommodity = uni.getStorageSync('integralMallCommodity');
		this.sysUserIntegral = uni.getStorageSync('sysUserIntegral');
	},
	methods: {
		//兑换
		exchange(obj) {
			uni.showToast({
				title: '兑换中...',
				icon:"loading",
			})
			let that = this
			console.log(obj);
			that.loadState = true;
			var param = {
				commodityId: obj.id,
				score: obj.score,
				stock: obj.stock,
				validityTerm: obj.validityTerm
			}
			app.basic.getAjaxData(com.user('exchange'), param, 'POST').then(res => {
				uni.hideToast()
				if (res.data.status == true) {
					uni.showToast({
						title: '兑换成功',
						icon: 'none',
						duration: 2000,
						success: function() {
							setTimeout(function() {
								that.loadState = false
								//要延时执行的代码
								uni.navigateBack({
									delta: 1
								});
							}, 2000); //延迟时间
						}
					});
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000,
						success: function() {
							setTimeout(function() {
								that.loadState = false
								//要延时执行的代码
							}, 2000); //延迟时间
						}
					});
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
	padding-bottom: 140upx;
}
.topBanner {
	width: 100%;
	height: 210upx;
	border-radius: 16upx;
	margin-bottom: 26upx;
}

.mainCom > view {
	width: 86%;
	padding: 5% 6%;
	box-shadow: 1px 1px 20px 5px #f7f7f7;
	margin: 40upx 1%;
	border-radius: 20upx;
}

.date {
	color: #474747;
	font-size: 26upx;
	padding-bottom: 20upx;
}

.itemBox {
	padding: 30upx 0 0;
}

.recordIcon {
	width: 112upx;
	height: 112upx;
	margin-right: 24upx;
}

.recordName {
	color: #3b3b3b;
	font-size: 34upx;
	font-weight: bold;
	padding-bottom: 10upx;
}

.recordPer {
	color: #3b3b3b;
	font-size: 30upx;
}

.repertory {
	color: #999999;
	font-size: 24upx;
	padding-top: 10upx;
}

.detInfo {
	color: #474747;
	font-size: 20upx;
	padding-top: 20upx;
}

.detInfo > view {
	line-height: 44upx;
	padding-bottom: 16upx;
}

.limitTxt {
	color: #fb3f4a;
	font-size: 26upx;
}
</style>
