<template>
	<!-- 绑定借阅证 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">绑定借阅证</view>
			</view>
		</view>
		<view class='mainCom'>
			<!-- 绑定借阅证 -->
			<view>
				<view :class='numError?"itemError":"item"'>
					<view class='hint'>借阅证号</view>
					<input type='number' placeholder='请输入借阅证号' maxlength='9' :value='cardNum' @input="cardNumInput"></input>
				</view>
				<view :class='pwdError?"itemError":"item"'>
					<view class='hint'>密码</view>
					<view class='flex_b_c' v-if='pwdShow'>
						<input type='password' placeholder='请输入密码' :value='cardPwd' maxlength='9' @input='cardPwdInput'></input>
						<text class='iconfont icon-chakanmima pwdIcon' @click='showPwd'></text>
					</view>
					<view class='flex_b_c' v-else>
						<input type='text' placeholder='请输入密码' :value='cardPwd' @input='cardPwdInput'></input>
						<text class='iconfont icon-noseepwd pwdIcon' @click='showPwd'></text>
					</view>
				</view>
				<view class='mainCol bindingHint'>温馨提示：初始密码为888888或出生年月日8位数。</view>
			</view>
		</view>
		<view class='maxBtn' @click='bindingCard'>绑定</view>
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
				pwdShow: true, //是否显示密码
				numError: false, //账号错误
				pwdError: false, //密码错误
				// 借阅证
				cardNum: "", //证号
				cardPwd: "", //密码
			}
		},
		onLoad() {},
		methods: {
			...mapMutations(['updateInfo']),
			// 查看密码
			showPwd: function() {
				if (this.pwdShow) {
					this.pwdShow = false;
				} else {
					this.pwdShow = true;
				}
			},
			cardNumInput(e) {
				this.cardNum = e.detail.value
			},
			cardPwdInput(e) {
				this.cardPwd = e.detail.value
			},
			// 返回上一页
			backBtn() {
                uni.switchTab({
                    url: 'my'
                })
			},
			bindingCard() {
				if (this.cardNum.length == 0) {
					uni.showToast({
						title: '读者证不能为空',
						icon: 'none'
					})
					return;
				} else if (this.cardPwd.length == 0) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					return;
				}
				var data = {
					rdId: this.cardNum,
					password: this.cardPwd
				}

				app.basic.getAjaxData(com.user("binding"), data, "POST").then(res => {
					uni.setStorageSync('token', res.data.data);
					uni.navigateTo({
						url: 'bindCard'
					})
				})
			},
		}
	}
</script>


<style>
	.mainCom {
		padding-top: 240upx;
	}

	.item {
		color: #6C727C;
		border-bottom: 1upx solid #C7C7C7;
		margin-bottom: 20upx;
	}

	.itemError {
		color: #FF0000;
		border-bottom: 1upx solid #FF0000;
		margin-bottom: 20upx;
	}

	.hint {
		padding-top: 14upx;
		font-size: 24upx;
	}

	.mainCom input {
		width: 80%;
		font-size: 32upx;
		color: #333333;
		padding: 20upx 0;
	}

	.pwdIcon {
		color: #C6CBD4;
	}

	.link {
		margin-top: 60upx;
	}

	.bindingHint {
		font-size: 26upx;
		padding: 20upx 0;
	}
</style>
