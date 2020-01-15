<template>
	<!-- 书籍预约成功 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书籍预约成功</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="accepted">书籍预约成功！</view>
			<view class="become">
				您好，成功预约《{{bookSersubmitInfo.title}}》。预取书点：
				<text class="mainCol">{{libName?libName:'湘图'}}</text>
				。您的排号为
				<text class="mainCol">{{resBookSersubmInfo.rank}}号</text>
				，您前面还有
				<text class="mainCol">{{resBookSersubmInfo.rank - 1}}位</text>
				读者。
			</view>
			<image src="../../static/imgs/succeed.png"></image>
			<view>温馨提示：</view>
			<view>1.工作人员向你发出预约取书通知（微信服务号、E-mail）后，请在6天内来馆办理借阅手续。</view>
			<view>2.我们将把您预约成功的图书放置于单独的预约书架，让您享受便捷的借阅服务。</view>
			<view>3.若当年4次逾期不取，则系统自动停止您当年的预约。</view>
		</view>
		<view class="maxBtn" @click="gotIt">知道了</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			bookSersubmitInfo: null,
			rank: 0,
			libName: null,
			resBookSersubmInfo: null
		};
	},
	onLoad(option) {
		this.bookSersubmitInfo = uni.getStorageSync('bookSersubmitInfo');
		this.resBookSersubmInfo = uni.getStorageSync('resBookSersubmInfo');
		this.getHoding()
	},
	methods: {
		// 知道了
		gotIt() {
			uni.switchTab({
				url: 'service'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},

		// 获取取书地点
		getHoding() {
			var barCode = {
				barCode: this.bookSersubmitInfo.barcode
			};
			app.basic.getAjaxData(com.query('getHodingByBarcode'), barCode, 'GET').then(res => {
				this.libName = res.data.name;
			});
		}
	}
};
</script>

<style>
.applyResult .maxBtn {
	position: relative;
	bottom: 0;
	left: 0;
}
</style>
