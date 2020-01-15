<template>
	<!-- 文旅云注册 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">文旅云注册</view>
			</view>
		</view>
		<view class='mainCom'>
			<!-- 文旅云绑定 -->
			<view>
				<view class='item'>
					<input type='number' placeholder='手机号' maxlength='11' :value='cardNum'
						   @input="cardNumInput"></input>
				</view>
				<view class='item'>
					<input type='password' placeholder='密码' :value='cardPwd' @input='cardPwdInput'></input>
				</view>
				<view class='item'>
					<input type='password' placeholder='确认密码' :value='cardPwd2' @input='cardPwd2Input'></input>
				</view>
				<view class='flex_b_c item'>
					<input type='text' class='code' placeholder='验证码' :value='code' @input='codeInput'></input>
					<button class='buleBtn' @click="getTelcode" :disabled='codeState'>{{codeTxt}}</button>
				</view>
				<view class='maxBtn' @click='bindingCard'>注册</view>
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
				cardNum: "", //账号
				cardPwd: "", //密码
				cardPwd2: "", //密码2
				code: "", //验证码
				disabled: false,
				codeState: false,
				codeTxt: "获取验证码",
				currentTime: "59",
				phoneStatus: false, //手机号检验

			};
		},
		onLoad(option) {
			this.cost = option.cost;
			this.activityInfo = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			//输入手机号
			cardNumInput(e) {
				this.cardNum = e.detail.value;
				if (app.basic.validate(this.cardNum, app.basic.obj.phone)) {
					this.phoneStatus = true
				} else {
					this.phoneStatus = false
				}
			},
			// 输入密码
			cardPwdInput(e) {
				this.cardPwd = e.detail.value
			},
			// 输入密码
			cardPwd2Input(e) {
				this.cardPwd2 = e.detail.value
			},
			//输入验证码
			codeInput(e) {
				this.code = e.detail.value
			},
			//获取验证码
			getTelcode() {
				var that = this;
				if (this.cardNum === "") {
					uni.showToast({
						title: '手机号码不能为空',
						icon: 'none'
					})
					return;
				} else if (!this.phoneStatus) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return;
				}
				var param = {
					mobile: this.cardNum
				}
				app.basic.getAjaxData(com.query("sendSmsCode"), param, "GET").then(res => {
					var currentTime = that.currentTime;
					that.disabled = true;
					that.codeTxt = currentTime + '秒';
					var interval = setInterval(function () {
						that.codeTxt = (currentTime - 1) + '秒';
						currentTime--;
						if (currentTime <= 0) {
							clearInterval(interval)
							that.codeTxt = '重新获取';
							that.currentTime = 59;
							that.disabled = false;
						}
					}, 1000)
				})
			},
			//注册
			bindingCard() {
				var that = this;
				if (this.cardNum === "") { //账号为空
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				} else if (this.cardPwd === "") {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				} else if (this.cardPwd2 != this.cardPwd) {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: 'none'
					})
					return;
				} else if (this.code === "") {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}

				uni.showModal({
					title: '提示',
					content: '确定注册文旅云账号吗？',
					success: function (res) {
						if (res.confirm) {
							var param = {
								username: that.cardNum,
								userpwd: that.cardPwd,
								smscode: that.code
							}
							app.basic.getAjaxData(com.query('doRegister'), param, "GET").then(res => {
								if (res.data.status == true) {
									uni.redirectTo({
										url: 'activityPay?cost=' + that.cost +
												"&item=" + encodeURIComponent(JSON.stringify(that.activityInfo))
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				})
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
		width: 100%;
		padding-top: 240upx;
	}

	.mainCom .maxBtn {
		margin-top: 60upx;
	}

	.item {
		width: 90%;
		margin: auto 5%;
		color: #6c727c;
		border-bottom: 1upx solid #c7c7c7;
		margin-bottom: 20upx;
	}

	.itemError {
		width: 90%;
		margin: auto 5%;
		color: #f00;
		border-bottom: 1upx solid #f00;
		margin-bottom: 20upx;
	}

	.hint {
		padding-top: 14upx;
		font-size: 24upx;
	}

	.mainCom input {
		width: 80%;
		font-size: 32upx;
		color: #333;
		padding: 20upx 0;
	}

	.pwdIcon {
		color: #c6cbd4;
	}

	.mainCom .bindingHint {
		font-size: 30upx;
		margin: 0 5% 45upx;
	}

	.bigTit {
		font-size: 40upx;
		font-weight: bold;
		margin: 0 5%;
	}

	.getCode {
		background: #fff;
		border: none;
		outline: none;
		width: 45%;
		font-size: 30 rpx;
	}

	.mainCom .item .code {
		width: 52%;
	}

	.buleBtn {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0;
	}
</style>
