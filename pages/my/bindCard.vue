<template>
	<!-- 我的借阅证 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">我的借阅证</view>
			</view>
		</view>
		<view class="mainCom">
			<!-- 未绑定借阅证 -->
			<view v-if='bindingCardShow'>
				<view @click="banding" class='bindingBox flex_c_c'>
					<view>
						<view class='iconBox'>
							<text class='iconfont icon-jia1 addIcon'></text>
						</view>
						<view class='hint'>您还没有绑定借阅证，请点击绑定</view>
					</view>
				</view>
				<view class="text_c">
					<view class="linkBtn">还没有借阅证，请点击这里申请</view>
				</view>
			</view>
			<!-- 已绑定借阅证 -->
			<view v-else>
				<view class='cardImgBox'>
					<image src='../../static/imgs/borrow.png' class='cardImg'></image>
					<view class="barcode">
						<image :src='rdIdCode' class='barcodeImg'></image>
					</view>
				</view>
				<view class='link' @click='bindingCard'>
					<view class='linkBtn'>解除绑定</view>
				</view>
				<view class='warmPrompt'>
					<view class='blue'>温馨提示：</view>
					<view>此页面包含个人信息，请勿泄漏，以免造成不必要的损失。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
                bindingCardShow: true,
                rdIdCode: ''
			}
		},
		onLoad() {

		},
		onShow() {
            this.getUserInfo();
		},
		methods: {
			...mapMutations(['updateInfo']),
			// 解除绑定
			bindingCard() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定要解除借阅证绑定吗？',
                    success: function (res) {
						if (res.confirm) {
							app.basic.getAjaxData(com.user("unbinding"), {}, "POST").then(res => {
								var token = res.data.data;
								uni.setStorageSync('token', token);
								that.banding();
							})
						}
					}
				})
			},
            getUserInfo() {
                app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
                    var userInfoRes = res.data.data;
                    if (userInfoRes.rdId != null && userInfoRes.rdId != undefined) {
                        this.bindingCardShow = false;
                        if (userInfoRes.rdidCode == null) {
                            app.basic.getAjaxData(com.user("getRdIdCode"), null, "POST").then(res => {
                                if (res.data.status) {
                                    var token = res.data.msg;
                                    uni.setStorageSync('token', token);
                                    userInfoRes.rdidCode = res.data.data;
                                }
                            })
                        }
                        this.updateInfo(userInfoRes);
                        this.rdIdCode = userInfoRes.rdidCode;
                    }
                })
            },
			// 绑定
			banding() {
				app.basic.getAjaxData(com.user("findUserCertificationByUserId"), {}, "POST").then(res => {
					if (res.data.status && res.data.data.idNum != null) {
						uni.navigateTo({
							url: 'binding'
						})
						return;
					}
					uni.showModal({
						content: '绑定借阅证需实名认证，是否去实名认证？',
                        success: function (res) {
							if (res.confirm) {
								uni.navigateTo({
									url: 'binding'
								})
							}
						}
					})
				})

			},
			// 返回上一页
			backBtn() {
                uni.switchTab({
                    url: 'my'
                })
			},
		}
	}
</script>


<style>
	page {
		height: 100%;
	}

	.mainCom {
		width: 100%;
		height: calc(100vh - 85px);
		background: #efefef;
	}

	.bindingBox {
		width: 94%;
		margin: 10% auto;
		height: 340upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 22px 28px -20px rgba(174, 193, 247, 1);
		border-radius: 20upx;
		text-align: center;
	}

	.iconBox {
		width: 100upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		border-radius: 50%;
		background: #e4ecfe;
		margin: 0 auto;
	}

	.addIcon {
		color: #fff;
		font-size: 50upx;
	}

	.hint {
		color: #253858;
		font-size: 20upx;
		padding-top: 30upx;
	}

	.cardImgBox {
		position: relative;
	}

	.cardImg {
		width: 96%;
		margin: 5% 2%;
		height: 390upx;
		border-radius: 20upx;
	}

	.barnum {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		color: #24253d;
	}

	/* 条码 */

	.barcode>canvas,
	.barcodeImg {
		width: 520upx;
		height: 130upx;
		position: absolute;
		bottom: 28%;
		left: 16%;
	}

	.qrcode {
		height: 420upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.qrcode>canvas {
		width: 420upx;
		height: 420upx;
	}

	.link {
		text-align: center;
		background: #fff;
		padding: 20upx 0;
		width: 94%;
		margin: 0 auto;
		border-radius: 8upx;
	}

	.link .linkBtn {
		margin-top: 0;
	}

	.warmPrompt {
		width: 90%;
		font-size: 24upx;
		color: #bebebe;
		text-align: left;
		margin: 0 auto;
		padding: 20px 0;
	}
</style>
