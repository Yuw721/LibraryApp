<template>
	<!-- 免证入馆 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">免证入馆</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='topPart'>
				<view class='parkInfo'>
					<image src='../../static/imgs/logo.png' class='logoImg'></image>
				</view>
				<view class='flex_b_c'>
					<view class='raduLeft'></view>
					<view class='line'></view>
					<view class='raduRight'></view>
				</view>
				<view class='codeBox'>
					<view class="qrcode">
						<image :src='head' class='qrcodeImg'></image>
					</view>
					<view class='botInfo'>
						<view class='scanTit'>进馆扫码</view>
						<view class='scanHint'>二维码对准扫描口，建议高度5厘米。</view>
						<view class='scanHint'>
							<text class='mainCol'>0{{minute}}:{{second}}</text>后刷新二维码
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
    import qrcode from '../../static/js/wxqrcode.js';
	export default {
		data() {
			return {
                head: "",
				timer: '',
				minute: '1',
				second: '59',
			}
		},
		onLoad() {
			let that = this;
            this.getCode();
			var minute = that.minute;
			var second = that.second;
			that.timer = setInterval(function() {
				second--;
				if (second < 10) {
					second = '0' + second;
				}
				that.second = second;
				if (second == 0 && minute > 0) {
					minute--;
					that.minute = minute;
					that.second = '59';
					second = that.second;
				}
				if (that.minute == 0 && that.second == 0) {
                    that.getCode();
					that.minute = '1';
					that.second = '59';
					minute = that.minute;
					second = that.second;
				}
			}, 1000)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            getCode: function () {
                var that = this;
                app.basic.getAjaxData(com.user("findUserById"), {}, "POST").then(res => {
                    if (res.data.data != null) {
                        let img = qrcode.createQrCodeImg(res.data.data, {
                            size: parseInt(320)
                        })
                        this.head = img;
                    }
                });
            },
		}
	}
</script>


<style>
	page {
		background: #f0f0f0;
	}

	.topPart {
		width: 85%;
		margin: 30rpx auto 0;
		box-shadow: 2px 2px 20px 7px #f4f4f4;
		height: calc(100vh - 100px);
		background: #fff;
		border-radius: 20rpx;
		position: relative;
	}

	.parkInfo {
		text-align: center;
		padding: 40rpx 0 20rpx;
	}

	.logoImg {
		width: 180rpx;
		height: 122rpx;
	}

	.raduLeft,
	.raduRight {
		width: 20rpx;
		height: 30rpx;
		background: linear-gradient(to left, #e6e6e6, #f1f1f1);
		border-radius: 0 50% 50% 0;
	}

	.raduRight {
		border-radius: 50% 0 0 50%;
	}

	.line {
		width: 85%;
		border-bottom: 1rpx dashed #d3d3d3;
	}


	.codeBox {
		text-align: center;
		padding-top: 120rpx;
	}

	.qrcode>canvas,
	.qrcodeImg {
		width: 320rpx;
		height: 320rpx;
		margin: 0 auto;
	}

	.botInfo {
		text-align: center;
		padding-bottom: 30rpx;
	}

	.scanTit {
		font-size: 36rpx;
		color: #333;
		padding-bottom: 10rpx;
	}

	.scanHint {
		font-size: 28rpx;
		color: #666;
		line-height: 52rpx;
	}
</style>
