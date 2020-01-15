<template>
	<!-- 填写邮箱 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">填写邮箱</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="infoBox">
				<view class="hint">文献（论文）下载，需要您提供邮箱地址；请提供 有效的邮箱地址。</view>
				<view class="tit">填写邮箱</view>
				<view class="flex_b_c" :class="emailinfo ? 'b_b' : 'b_b_r'"><input type="text" placeholder="邮箱" class="emailIpt" @input="mailIpt" /></input></view>
				<view class="flex_b_c b_b">
					<input type="text" placeholder="验证码" class="codeIpt" @input="codeIpt" /></input>
					<image :src="imageCode" @click="getCode" class="codeImg"></image>
				</view>
			</view>
		</view>
		<view class="maxBtn" @click="submit">提交</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			imageCode: '',
			email: '',
			emailinfo: true,
			code: '',
			//正则校验
			obj: {
				email: '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$',
				phone: '^[1][3,4,5,6,7,8,9][0-9]{9}$',
				passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
			}
		};
	},
	onLoad(option) {
		this.getCode();
		this.gofirst();
	},
	methods: {
		gofirst() {
			var url = uni.getStorageSync('bookUrl');
			app.basic.getAjaxData(com.query('gofirst'), { particulars: url }, 'post').then(res => {
				console.log(res);
			});
		},

		//获取验证码
		getCode() {
			var that = this;
			app.basic.getAjaxData(com.query('getCode'), null, 'post').then(res => {
				console.log(res);
				var base64 = res.data;
				base64 = base64.replace(/[\r\n]/g, '');
				that.imageCode = 'data:image/png;base64,' + base64;
			});
		},
		// 提交
		submit() {
			if (this.email.length == 0) {
				uni.showToast({
					title: '请输入邮箱！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}

			if (this.code.length == 0) {
				uni.showToast({
					title: '请输入验证码！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			var librarySearchDTO = {
				code: this.code,
				email: this.email
			};
			var that = this;
			app.basic.getAjaxData(com.query('submit'), librarySearchDTO, 'post').then(res => {
				var a = '';
				a = res.data.data;
				if (res.data.status) {
					if (a.indexOf('成功') > 0) {
						uni.showToast({
							title: '咨询提交成功',
							icon: 'none',
							duration: 2000
						});
						uni.navigateTo({
							url: 'mailboxSubmit?email=' + that.email
						});
					} else {
						uni.showToast({
							title: res.data.data,
							icon: 'none',
							duration: 2000,
							success: function() {
								setTimeout(function() {
									//要延时执行的代码
									that.getCode();
								}, 2000); //延迟时间
							}
						});
					}
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 输入验证码
		codeIpt(e) {
			this.code = e.detail.value;
		},
		//邮箱
		mailIpt(e) {
			this.email = e.detail.value;
			var temp = this.validate(e.detail.value, this.obj.email);
			this.emailinfo = temp;
			if (this.email == '') {
				this.emailinfo = true;
			}
			console.log(temp);
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		validate: function(data, reg) {
			var temp = new RegExp(reg);
			return temp.test(data);
		}
	}
};
</script>

<style>
.infoBox {
	padding: 5% 0;
}

.hint {
	line-height: 60upx;
	font-size: 30upx;
	color: #000;
}

.infoBox .tit {
	font-size: 40upx;
	color: #333;
	font-weight: bold;
	padding: 40upx 0 0;
}

.emailIpt,
.codeIpt {
	padding: 30upx 0 20upx;
}

.codeIpt {
	padding: 30upx 0 0upx;
}

.codeImg {
	width: 202upx;
	height: 78upx;
	margin: 30upx 0 10upx;
}
</style>
