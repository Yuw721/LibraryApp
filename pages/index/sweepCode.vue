<template>
	<!-- 扫码借书 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">扫码借书</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='topPart'>
				<view class='botInfo'>
					<view class='topTit'>翻开图书封面扫描内页条码</view>
					<image src='../../static/imgs/sweep.png' class='sweepImg'></image>
					<view class='promptBox'>
						<view class='promptTit'>温馨提示：</view>
						<view class='promptText'>
							<view>1、使用本功能，需进行“实名认证”和“绑定借阅证”。</view>
							<view>2、已借阅到的书籍，可在“书籍借阅”和“书架”中进行查看。</view>
						</view>
					</view>
				</view>
				<view class='flex_b_c btnBotBox'>
					<view class='raduLeft'></view>
					<view class='btn' @click="scanCode" v-if='bindState'>扫描条码</view>
					<view class='btn' @click="binding" v-if='!bindState'>绑定借阅证</view>
					<view class='raduRight'></view>
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
				bindState: true
			}
		},
		onLoad() {},
		methods: {
			// 绑定借阅证
			binding() {
				uni.navigateTo({
					url: '../my/bindCard'
				});
			},
			// 扫描条码
			scanCode() {
				uni.navigateTo({
					url: 'bookInfo'
				})();
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},

		}
	}
</script>


<style>
	page {
		background: #F0F0F0;
	}

	.mainCom {
		width: 100%;
	}

	.topPart {
		width: 92%;
		margin: 30upx auto 0;
		height: calc(100vh - 100px);
		background: #fff;
		border-radius: 20upx 20upx 0 0;
		position: relative;
	}

	.parkInfo {
		text-align: center;
		padding: 60upx 0 40upx;
	}

	.logoImg {
		width: 180upx;
		height: 122upx;
	}

	.raduLeft,
	.raduRight {
		width: 20upx;
		height: 30upx;
		background: linear-gradient(to left, #e6e6e6, #f1f1f1);
		border-radius: 0 50% 50% 0;
	}

	.raduRight {
		border-radius: 50% 0 0 50%;
	}

	.line {
		width: 85%;
		border-bottom: 1upx dashed #d3d3d3;
	}

	.botInfo {
		padding: 80upx 0 0upx;
	}

	.topTit {
		color: #666;
		font-size: 32upx;
		font-weight: bold;
		padding-bottom: 60upx;
		text-align: center;
	}

	.sweepImg {
		width: 448upx;
		height: 560upx;
		display: block;
		margin: 0 auto 40upx;
	}

	.promptBox {
		padding: 0 100upx;
	}

	.promptTit {
		color: #ff1313;
		font-size: 28upx;
	}

	.promptText {
		color: #bebebe;
		font-size: 28upx;
		line-height: 40upx;
	}

	.btn {
		width: 80%;
		margin: 0 auto;
		text-align: center;
		padding: 24upx 0;
		color: #fff;
		font-size: 36upx;
		background: #197cb7;
		border-radius: 50upx;
		box-shadow: 0px 6px 16px 0px rgba(25, 124, 183, 0.31);
	}

	.btnBotBox {
		padding-top: 40upx;
	}
</style>
