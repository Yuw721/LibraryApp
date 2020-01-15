<template>
	<!-- 验证码 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
			</view>
		</view>
		<view class="mainCom">
			<view class="topTit">验证码</view>
			<view class="phoneBox flex_b_c">
				<view>已发送至 131****1225</view>
				<button class="relSend" :disabled="btnDisabled" @click="sendCode"><text>重新获取</text><text class="m_l10" v-if="btnDisabled">{{secondStr}}s</text></button>
			</view>
			<view>
				<view class="code-input-main">
					<view class="inputLine flex_b_c">
						<view>
							<input class="input-item" :class="codeIndex == 0? 'curBd':''" maxlength="1" :value="code[0]"></input>
							<view class="cursor" v-if="codeIndex == 0"></view>
						</view>
						<view>
							<input class="input-item" :class="codeIndex == 1? 'curBd':''" maxlength="1" :value="code[1]"></input>
							<view class="cursor" v-if="codeIndex == 1"></view>
						</view>
						<view>
							<input class="input-item" :class="codeIndex == 2? 'curBd':''" maxlength="1" :value="code[2]"></input>
							<view class="cursor" v-if="codeIndex == 2"></view>
						</view>
						<view>
							<input class="input-item" :class="codeIndex == 3? 'curBd':''" maxlength="1" :value="code[3]"></input>
							<view class="cursor" v-if="codeIndex == 3"></view>
						</view>
						<view>
							<input class="input-item" :class="codeIndex == 4? 'curBd':''" maxlength="1" :value="code[4]"></input>
							<view class="cursor" v-if="codeIndex == 4"></view>
						</view>
						<view>
							<input class="input-item" :class="codeIndex == 5? 'curBd':''" maxlength="1" :value="code[5]"></input>
							<view class="cursor" v-if="codeIndex == 5"></view>
						</view>
					</view>
					<input @input="inputEvent" class="code-input-input" v-model="code" maxlength="6" type="number" focus />
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
				code: "", // 验证码
				codeIndex: 0, // 验证码下标
				btnDisabled: false, // 按钮置灰
				secondStr: 59, // 秒数
				clear: null, // 定时器
			}
		},
		onLoad() {},
		methods: {
			// 获取验证码
			sendCode() {
				var that = this;
				console.log(1111111);
				that.btnDisabled = true;
				that.clear = setInterval(function() {
					if (that.btnDisabled && that.secondStr > 1) {
						--that.secondStr;
					} else {
						clearInterval(that.clear);
						that.btnDisabled = false;
						that.secondStr = 59;
					}
				}, 1000);
			},
			// 输入验证码
			inputEvent(res) {
				console.log("input 1 input code  components : ", res.detail.value);
				this.codeIndex = res.detail.value.length;
				console.log(this.codeIndex);
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	.mainCom {
		width: 85%;
	}

	.topTit {
		color: #020202;
		font-size: 60upx;
		font-weight: bold;
		padding-top: 80upx;
	}

	.phoneBox {
		color: #999999;
		font-size: 24upx;
		padding: 20upx 0 80upx;
	}

	.cursor {
		width: 3upx;
		height: 50upx;
		background-color: #333333;
		animation: focus 1s infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* 光标动画 */
	@keyframes focus {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.relSend {
		width: 196upx;
		height: 66upx;
		line-height: 66upx;
		text-align: center;
		border: 2upx solid #EDEDED;
		border-radius: 10upx;
		margin: 0;
		padding: 0;
		color: #CCCCCC;
		font-size: 24upx;
		background: #fff;
	}

	.code-input-input {
		height: 200upx;
		position: absolute;
		width: 100%;
		outline: none;
		color: transparent;
		text-shadow: 0 0 0 transparent;
		width: 300%;
		margin-left: -100%;
		background: #00000000;
	}

	.code-input-main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 200upx;
	}

	.input-item {
		width: 88upx;
		height: 108upx;
		font-size: 40upx;
		background: #FFFFFF;
		text-align: center;
		border-radius: 8upx;
		color: #333;
		border: 2upx solid #D5D5D5;
	}

	.inputLine .curBd {
		border: 2upx solid #197CB7;
	}

	.inputLine {
		width: 100%;
	}

	.inputLine>view {
		position: relative;
	}
</style>
