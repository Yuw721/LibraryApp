<template>
	<!-- 实名认证 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">实名认证</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='verify'>
				<view class="b_b">
					<view>姓名</view>
                    <input type='text' placeholder='请输入姓名' v-model="name"></input>
				</view>
				<view class="b_b">
					<view>身份证</view>
                    <input type='idcard' placeholder='请输入身份证号' v-model="IDnum"></input>
				</view>
				<view :class='phoneStatus?"b_b":"b_b_r"'>
					<view>手机号</view>
                    <input type='number' maxlength='11' placeholder='请输入手机号' :value="phone" @input="bindphone"
                           @blur='textphone'></input>
				</view>
				<view class='b_b'>
					<view>验证码</view>
					<view class='flex_b_c'>
                        <input type='number' maxlength='6' placeholder='请输入验证码' v-model="code"></input>
						<button class='buleBtn' @click="getTelcode" :disabled='codeState'>{{codeTxt}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="maxBtn" @click='overAgree'>下一步</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				name: "", // 姓名
				IDnum: "", // 身份证号
				phone: "", // 手机号
                phoneStatus: false, //手机号检验
				code: "", // 验证码
				codeState: false,
				codeTxt: "获取验证码",
				currentTime: "60",
			}
		},
		onLoad() {},
		methods: {
            // 返回上一页
            backBtn() {
                uni.navigateBack();
            },
            //输入手机号
            bindphone(e) {
                this.phone = e.detail.value;
                if (this.phone.length == 11) {
                    this.textphone();
                } else {
                    this.phoneStatus = false;
                }
            },
            //验证手机号
            textphone() {
                var phone = this.phone;
                if (app.basic.validate(phone, app.basic.obj.phone)) {
                    this.phoneStatus = true;
                } else {
                    uni.showToast({
                        title: '手机号码格式错误！',
                        icon: 'none'
                    })
                    this.phoneStatus = false;
                }
            },
            //获取验证码
            getTelcode() {
                if (this.phoneStatus) {
                    var that = this;
                    var param = {
                        telNumber: this.phone
                    }
                    app.basic.getAjaxData(com.common("getCode"), param, "GET").then(res => {
                    })
                    var currentTime = that.currentTime;
                    that.codeState = true;
                    that.codeTxt = currentTime + '秒';
                    var interval = setInterval(function () {
                        that.codeTxt = (currentTime - 1) + '秒';
                        currentTime--;
                        if (currentTime <= 0) {
                            clearInterval(interval)
                            that.codeTxt = '重新获取';
                            that.currentTime = 59;
                            that.codeState = false;
                        }
                    }, 1000)
                } else {
                    uni.showToast({
                        title: '手机号码格式错误！',
                        icon: 'none'
                    })
                }
            },
            //下一步
			overAgree() {
                if (this.name == null || this.name == '') {
                    uni.showToast({
                        title: '请输入姓名',
                        icon: 'none'
                    })
                    return;
                } else if (this.IDnum == null || this.IDnum == '') {
                    uni.showToast({
                        title: '请输入身份证',
                        icon: 'none'
                    })
                    return;
                } else if (this.phone == null || this.phone == '') {
                    uni.showToast({
                        title: '请输入手机号',
                        icon: 'none'
                    })
                    return;
                } else if (!this.phoneStatus) {
                    uni.showToast({
                        title: '请输入正确的手机号码',
                        icon: 'none'
                    })
                    return;
                } else if (this.code == null || this.code == '') {
                    uni.showToast({
                        title: '请输入验证码',
                        icon: 'none'
                    })
                    return;
                }
                this.checkPhone();
            },
            //身份证校验
            checkIdNum: function () {
                var that = this;
                var parms = {
                    idCard: this.IDnum,
                    name: this.name
                }
                app.basic.getAjaxData(com.common('verifyIdCard'), parms, "GET").then(res => {
                    if (res.data.status == true) {
                        if (res.data.data.status == '01') {
                            uni.redirectTo({
                                url: 'photograph?name=' + that.name + '&idNum=' + that.IDnum
                            })
                        } else {
                            uni.showToast({
                                title: res.data.data.msg,
                                icon: 'none'
                            })
                            return;
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        return;
                    }
				})
			},
            //校验手机号
            checkPhone: function () {
                var param = {
                    telNumber: this.phone,
                    code: this.code
                }
                app.basic.getAjaxData(com.common('updateUserPhone'), param, "GET").then(res => {
                    if (res.data.status) {
                        uni.setStorageSync('token', res.data.data);
                        this.checkIdNum();
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
			},
		}
	}
</script>


<style>
	.mainCom {
		padding-top: 240upx;
	}

	.maxBtn {
		margin-top: 40upx;
	}

	.verify>view {
		padding: 10upx 0;
		color: #6C727C;
		font-size: 24upx;
	}

	.verify>view input {
		color: #999999;
		font-size: 32upx;
		padding: 14upx 0;
	}

	.buleBtn {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0;
	}
</style>
