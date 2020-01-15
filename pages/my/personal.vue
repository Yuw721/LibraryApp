<template>
	<!-- 个人信息 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">个人信息</view>
			</view>
		</view>
		<view class='hidden mainCom'>
			<view class='flex_b_c infoBox' @click='changeHead'>
				<view class='explain'><text class='redCol'>*</text> 头像</view>
				<view>
					<image :src='userInfo.headPortrait' class='headImg'></image>
				</view>
			</view>
			<view class='flex_b_c infoBox'>
				<view class='explain'><text class='redCol'>*</text> 昵称</view>
				<input type="text" :value='userInfo.nickname' class='inputBox' @input="bindnickname"></input>
			</view>
			<view class='flex_b_c infoBox' v-if='userInfo.rdId != null && userInfo.rdId != ""'>
				<view class='explain'>借阅证号</view>
				<view>
					<text class='explain'>{{userInfo.rdId}}</text>
				</view>
			</view>
			<view class='flex_b_c infoBox'>
				<view class='explain'>手机号</view>
                <input type="number" :value='userInfo.phone' maxlength='11' class='inputBox' @input="bindphone"
                       @blur='textphone'></input>
			</view>
			<view class='flex_b_c infoBox' v-if='codeinfo'>
				<view class='flex_l_c'>
					<view class='infoCode'></view>
					<input class='codeIpt' type='number' maxlength='6' placeholder='验证码' :value='code' @input='codeIpt'></input>
				</view>
				<button class='buleBtn' @click="getTelcode" :disabled="disabled">{{codeTxt}}</button>
			</view>
			<view class='flex_b_c infoBox'>
				<view class='explain'>住址</view>
				<pickerAddress @change="bindRegionChange">{{text}}</pickerAddress>
			</view>
			<view class='maxBtn' @click='amend'>修改</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import pickerAddress from '../../components/pickerAddress/pickerAddress.vue';
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				userInfo: {
					headPortrait: 'https://wj.zydbai.com/FloNRz8SZDEqh_C6fxbTmL8d7ezl', // 头像
					nickname: '', // 昵称
					rdId: '', // 借阅证
					phone: '', // 手机号
					region: '',
				},
				codeinfo: false, // 验证码显示
				code: '', // 验证码
				disabled: false,
				codeTxt: "获取验证码",
				currentTime: "59",
				text: '请选择地址',
				phone: ''
			}
		},
		onLoad() {
            app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
                this.userInfo = res.data.data;
                var address = [];
                address.push(this.userInfo.sprovince);
                address.push(this.userInfo.scity);
                address.push(this.userInfo.sdistrict);
                this.userInfo.region = address;
                this.text = address.join('');
                this.phone = this.userInfo.phone;
                this.updateInfo(this.userInfo);
			})
		},
		methods: {
			...mapMutations(['updateInfo']),
			// 选择住址
			bindRegionChange(data) {
				this.userInfo.region = data.data;
				this.text = data.data.join('');
			},
			//获取验证码
			getTelcode() {
				var that = this;
				var param = {
					telNumber: this.userInfo.phone
				}
                app.basic.getAjaxData(com.common("getCode"), param, "GET").then(res => {
                })
				var currentTime = that.currentTime;
				that.disabled = true;
				that.codeTxt = currentTime + '秒';
				var interval = setInterval(function() {
					that.codeTxt = (currentTime - 1) + '秒';
					currentTime--;
					if (currentTime <= 0) {
						clearInterval(interval)
						that.codeTxt = '重新获取';
						that.currentTime = 59;
						that.disabled = false;
					}
				}, 1000)
			},
			// 选择头像
			changeHead() {
				var that = this;
				uni.chooseImage({
					count: 1,
                    success: function (res) {
						app.basic.getFileUrl(res.tempFilePaths[0]).then(res => {
							var imageUrl = JSON.parse(res.data).data;
							that.userInfo.headPortrait = imageUrl;
						})

					}
				});
			},
			//修改昵称
			bindnickname(e) {
				this.userInfo.nickname = e.detail.value
			},
			//输入验证码
			codeIpt(e) {
				this.code = e.detail.value
			},
			//输入手机号
			bindphone(e) {
				this.userInfo.phone = e.detail.value;
				if (this.userInfo.phone.length == 11) {
					this.textphone();
                } else {
                    this.codeinfo = false;
                }
			},
			//验证手机号
			textphone() {
				var phone = this.userInfo.phone;
                if (app.basic.validate(phone, app.basic.obj.phone)) {
					this.codeinfo = true;
				} else {
					uni.showToast({
						title: '手机号码格式错误！',
						icon: 'none'
					})
					this.codeinfo = false;
				}
				if (this.phone == this.userInfo.phone) {
					this.codeinfo = false;
				}
			},
			//修改
			amend() {
                var that = this;
				if (this.phone != this.userInfo.phone) {
					if (this.userInfo.phone.length != 11) {
						uni.showToast({
							title: '请输入手机号！',
							icon: 'none'
						})
						return;
					} else if (!this.codeinfo) {
						uni.showToast({
							title: '请输入正确的手机号！',
							icon: 'none'
						})
						return;
					} else if (this.codeinfo && this.code.length != 6) {
						uni.showToast({
							title: '请输入验证码！',
							icon: 'none'
						})
						return;
					}
				}
				var param = {
					sprovince: this.userInfo.region[0],
					scity: this.userInfo.region[1],
					sdistrict: this.userInfo.region[2],
					nickname: this.userInfo.nickname,
					phone: this.userInfo.phone,
					code: this.code,
					headPortrait: this.userInfo.headPortrait
				}
				app.basic.getAjaxData(com.user("updateinfo"), param, "POST").then(res => {
					if (res.data.status) {
						uni.setStorageSync('token', res.data.data);
                        app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
                            var userInfoRes = res.data.data
                            that.updateInfo(userInfoRes);
                            uni.switchTab({
                                url: 'my'
                            });
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
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
		width: 100%;
	}

	.infoBox {
		margin: auto 5%;
		width: 90%;
		height: 150upx;
		line-height: 150upx;
		border-bottom: 1upx solid #C7C7C7;
		font-size: 32upx;
	}

	.explain {
		color: #666666;
	}

	.headImg {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		vertical-align: middle;
	}

	.inputBox {
		text-align: right;
	}

	.buleBtn {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0;
	}

	.maxBtn {
		margin-top: 60upx;
	}
</style>
