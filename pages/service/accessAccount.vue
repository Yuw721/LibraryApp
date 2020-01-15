<template>
	<!-- 文旅云绑定 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">文旅云绑定</view>
			</view>
		</view>
		<view class="mainCom">
			<view>
				<view v-if='isBinding'>
					<view class='bindingHint'>
						<text>您的手机号：{{wlyUserName}}已注册文旅云账户， 点击进行</text>
						<text class='applyLink' @click="bind">一键绑定</text>
					</view>
					<view class='bigTit'>绑定文旅云其他账户</view>
				</view>
				<view v-if='!isBinding'>
					<view class='bindingHint'>绑定文旅云账户，享受更多服务。</view>
					<view class='bigTit'>绑定文旅云账户</view>
				</view>
				<view :class='numError?"itemError":"item"'>
					<input type='number' placeholder='手机号' maxlength='11' :value='cardNum'
						   @input="cardNumInput"></input>
				</view>
				<view :class='pwdError?"itemError":"item"'>
					<view class='flex_b_c' v-if='pwdShow'>
						<input type='password' placeholder='请输入密码' :value='cardPwd' @input='cardPwdInput'></input>
						<text class='iconfont icon-chakanmima pwdIcon' @click='showPwd'></text>
					</view>
					<view class='flex_b_c' v-else>
						<input type='text' placeholder='请输入密码' :value='cardPwd' @input='cardPwdInput'></input>
						<text class='iconfont icon-noseepwd pwdIcon' @click='showPwd'></text>
					</view>
				</view>
				<view class='botBox flex_b_c'>
					<view class='closeBtn' @click="accessRegister">注册新账户</view>
					<view class='agreeBtn' @click='bindingCard'>绑定</view>
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
				pwdShow: true, //是否显示密码
				numError: false, //账号错误
				pwdError: false, //密码错误
				cardNum: "", //账号
				cardPwd: "", //密码
				isBinding: true,
				wlyid: '',
				wlyUserName: ''
			};
		},
		onLoad(option) {
			this.cost = option.cost;
			this.activityInfo = JSON.parse(decodeURIComponent(option.item));
			this.countUserByPhone();
		},
		methods: {
			//输入密码
			cardPwdInput(e) {
				this.pwdError = false;
				this.cardPwd = e.detail.value;
			},
			//输入账号
			cardNumInput(e) {
				this.cardNum = e.detail.value;
				this.numError = false;
			},
			// 注册新账户
			accessRegister() {
				uni.redirectTo({
					url: 'accessRegister?cost=' + this.cost +
							"&item=" + encodeURIComponent(JSON.stringify(this.activityInfo))
				})
			},
			//获取是否注册文旅云
			countUserByPhone() {
				app.basic.getAjaxData(com.query('countUserByPhone'), '', "GET").then(res => {
					if (res.data.status == true) {
						var username = res.data.data.username;
						this.isBinding = true;
						this.wlyid = res.data.data.id;
						this.wlyUserName = username.substring(0, 3) + '****' + username.substring(7)
					} else {
						this.isBinding = false
					}
				})
			},
			// 查看密码
			showPwd() {
				if (this.pwdShow) {
					this.pwdShow = false
				} else {
					this.pwdShow = true
				}
			},
			//绑定文旅云账号
			bind() {
				var param = {
					id: this.wlyid
				}
				app.basic.getAjaxData(com.query('bindYdzzUser'), param, "GET").then(res => {
					if (res.data.status == true) {
						uni.redirectTo({
							url: 'activityPay?cost=' + this.cost +
									"&item=" + encodeURIComponent(JSON.stringify(this.activityInfo))
						})
					}
				})
			},
			//绑定文旅云
			bindingCard() {
				if (this.cardNum === "") {
					this.numError = true;
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				} else if (this.cardPwd === "") { //密码为空
					this.pwdError = true;
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				}

				var param = {
					username: this.cardNum,
					password: this.cardPwd
				}
				app.basic.getAjaxData(com.query('doLogin'), param, "GET").then(res => {
					if (res.data.status == true) {
						uni.redirectTo({
							url: 'activityPay?cost=' + this.cost +
									"&item=" + encodeURIComponent(JSON.stringify(this.activityInfo))
						})
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: 'none'
						})
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
</style>
