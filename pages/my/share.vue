<template>
	<!-- 分享卡片 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">分享卡片</view>
			</view>
		</view>
		<view class="mainCom">
			<canvas style="width: 100%; height: 80vh" canvas-id="firstCanvas"></canvas>
			<view class="tui-loading-row" v-if="loadState">
				<view class="tui-loading-cell">
					<view class="circle-line">
						<text></text>
						<text></text>
						<text></text>
						<text></text>
						<text></text>
						<text></text>
						<text></text>
						<text></text>
					</view>
				</view>
			</view>
			<view class="shareHint buleHollowBtn" @click="saveImg" v-if="!loadState">分享</view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			qrCode: '',
			headImage: 'https://wj.zydbai.com/FloNRz8SZDEqh_C6fxbTmL8d7ezl',
			nickName: '',
			shareUserId: '',
			shareImg: '',
			loadState: true,
			todayShareImg: ''
		};
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var date = new Date();
		var day = date.getDay();
		var todayImg = 'https://wj.zydbai.com/shareCard' + day + '.png';
		console.log(todayImg);
		let windowWidth = uni.getSystemInfoSync().windowWidth; // 屏幕的宽度
		let windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度
		let windowH = windowHeight / 2 + windowHeight / 3;
		var that = this;
		console.log(that.headImage);
		// 使用 uni.createContext 获取绘图上下文 context
		var context = uni.createCanvasContext('firstCanvas');
		//将网络图片转成本地路径
		uni.getImageInfo({
			src: todayImg,
			success: function(res) {
				context.drawImage(res.path, 0, 0, windowWidth, windowH);
				uni.getImageInfo({
					src: that.headImage,
					success: function(res) {
						context.save();
						context.beginPath();
						context.arc(60 / 2 + 26, 60 / 2 + windowH - 104, 60 / 2, 0, Math.PI * 2, false);
						context.clip();
						context.drawImage(res.path, 26, windowH - 104, 60, 60);
						context.restore();
						// 绘制昵称
						context.setFontSize(16);
						context.setFillStyle('#000');
						context.setTextAlign('left');
						context.fillText('推荐您关注小程序', 100, windowH - 120 + 42);
						context.fillText('快来湘图“掘金”', 100, windowH - 94 + 42);
						console.log(that.qrCode);
						uni.getImageInfo({
							src: that.qrCode,
							success: function(res) {
								context.drawImage(res.path, windowWidth - 100, windowH - 110, 75, 75);
								context.draw();
								if (that.qrCode != '' && that.qrCode != null) {
									setTimeout(function() {
										uni.canvasToTempFilePath({
											canvasId: 'firstCanvas',
											success: function(res) {
												// that.shareImg = res.tempFilePath;
												console.log(res.tempFilePath);
												that.shareImg = res.tempFilePath;
												that.loadState = false;
											},
											fail: function(res) {
												console.log(res);
											}
										});
									}, 1000);
								}
							}
						});
					}
				});
			}
		});
	},
	onLoad(option) {
		var that = this;
		that.headImage = uni.getStorageSync('userInfo').headPortrait
		var myQrcode = uni.getStorageSync('myQrcode');
		if (myQrcode == '' || myQrcode == null) {
			that.getCode();
		} else {
			that.qrCode = uni.getStorageSync('myQrcode');
		}
		// this.headImage = uni.getStorageSync('locationheadportait'),
	},
	methods: {
		saveImg() {
			var that = this;
			uni.share({
				provider: 'weixin',
				type: 2,
				scene: 'WXSenceTimeline',
				imageUrl: that.shareImg,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
			// uni.saveImageToPhotosAlbum({
			// 	filePath: that.shareImg,
			// 	success: function(res) {
			// 		console.log(res);
			// 	},
			// })
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		getCode: function() {
			var that = this;
			app.basic.getAjaxData(com.user('getQrcode'), {}, 'GET').then(res => {
				if (res.data.status) {
					uni.setStorageSync('myQrcode', res.data.data);
					that.qrCode = res.data.data;
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

.shareHint {
	position: fixed;
	bottom: 2vh;
	left: 50%;
	transform: translate(-50%);
	font-size: 28upx;
	width: 50%;
	text-align: center;
}

/* 加载动画 */
.tui-loading-row {
	width: 100%;
	display: table;
	table-layout: fixed;
}

.tui-loading-cell {
	width: 100%;
	display: table-cell;
	text-align: center;
}

/*动画一：单个渐变  */
.circle-line {
	width: 100upx;
	height: 100upx;
	display: inline-block;
	position: relative;
}

.circle-line text {
	display: block;
	width: 50%;
	height: 5upx;
	opacity: 0.7;
	position: absolute;
	top: calc(50% - 2.5upx);
	left: 0px;
	transform-origin: center right;
	animation: circle 1.5s linear infinite;
}

.circle-line text::before {
	content: '';
	display: block;
	width: 15upx;
	height: 5upx;
	position: absolute;
	top: 0;
	right: 10upx;
	background-color: #71ae91;
}

.circle-line text:nth-child(1) {
	transform: rotate(0deg);
	animation-delay: 0.2s;
}

.circle-line text:nth-child(2) {
	transform: rotate(45deg);
	animation-delay: 0.4s;
}

.circle-line text:nth-child(3) {
	transform: rotate(90deg);
	animation-delay: 0.6s;
}

.circle-line text:nth-child(4) {
	transform: rotate(135deg);
	animation-delay: 0.8s;
}

.circle-line text:nth-child(5) {
	transform: rotate(180deg);
	animation-delay: 1s;
}

.circle-line text:nth-child(6) {
	transform: rotate(225deg);
	animation-delay: 1.2s;
}

.circle-line text:nth-child(7) {
	transform: rotate(270deg);
	animation-delay: 1.4s;
}

.circle-line text:nth-child(8) {
	transform: rotate(315deg);
	animation-delay: 1.6s;
}

@keyframes circle {
	0% {
		opacity: 0.05;
	}

	100% {
		opacity: 0.9;
	}
}
</style>
