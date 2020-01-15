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
            <image :src="idCardFront" class="cardImg" mode='aspectFit'></image>
			<view class="maxBtn" @click="update">解除绑定</view>
			<view class="hintText mainCol">注：一个月仅能解绑一次</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
                idCardFront: ''
			}
		},
        onLoad() {
            this.findUserCertificationByUserId();
        },
		methods: {
            findUserCertificationByUserId() {
                app.basic.getAjaxData(com.user('findUserCertificationByUserId'), "", "POST").then(res => {
                    if (res.data.status) {
                        this.idCardFront = res.data.data.idCardFront
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })

            },
            //解除绑定
            update: function () {
                uni.showModal({
                    title: '提示',
                    content: '确定要解除实名认证吗？',
                    success: function (res) {
                        if (res.confirm) {
                            app.basic.getAjaxData(com.user('updateUserCertification'), "", "POST").then(res => {
                                if (res.data.status) {
                                    uni.setStorageSync('token', res.data.data);
                                    uni.navigateBack();
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
			},
		}
	}
</script>


<style>
	.cardImg {
		display: block;
		width: 90%;
		margin: 30upx auto;
	}

	.hintText {
		font-size: 26upx;
		padding: 10upx 5%;
		text-align: center;
	}
</style>
