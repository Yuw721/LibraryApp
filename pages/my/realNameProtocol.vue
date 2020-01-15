<template>
	<!-- 实名认证须知 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">实名认证须知</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='protocol'>
				<view class='tit'>一、用户申请实名认证，授权湖南图书馆读者服务小程序对用户身份信息进行认证。</view>
				<view class='tit'>二、为更好的享受湖南图书馆读者服务小程序提供的服务，用户知晓并同意：</view>
				<view>1.湖南图书馆读者服务小程序有权基于服务的需要向合法保存有本人信息的机构采集本人信息（包括由湖南图书馆有权将本人在使用其服务过程中提交或产生的信息提供给湖南图书馆），用于验证本人信息的真实性。</view>
				<view>2、用户授权湖南图书馆读者服务小程序，可根据湖南图书馆读者服务小程序的查询指令，向湖南图书馆读者服务小程序提供相关信息的真实性判断结果。</view>
				<view class='tit'>三、用户了解：</view>
				<view>1、对上述资料的审核是基于对用户信息安全的考虑，根据相关监管部门的要求进行，湖南图书馆读者服务小程序不会将上述资料用于其他目的或者向第三人透露。</view>
				<view>2、同一身份证件只能用于一个湖南图书馆读者服务小程序账户实名认证，湖南图书馆读者服务小程序不会通过使用已被其他账户认证的身份证件进行认证的申请。若身份证件被其他用户占用，可以向湖南图书馆读者服务小程序工作人员进行申诉。</view>
				<view>3、若上述资料发生变化，湖南图书馆读者服务小程序将重新对上述资料进行审核。</view>
				<view class='tit'>四、用户同意：因用户未提供正确信息而造成用户本人或他人的损失，用户承担相应责任。此情形包括但不限于：</view>
				<view>1、提供的姓名、身份证件、银行账户不相符，导致功能无法正常使用；</view>
				<view>2、其他可能造成用户或他人损失的情形。</view>
			</view>
			<view class='flex_b_c botBox'>
				<view class='closeBtn' @click='backBtn'>关闭</view>
				<view class='agreeBtn' @click='agreeBtn'>同意并继续</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			// 同意并继续
			agreeBtn() {
                uni.redirectTo({
					url: 'realName'
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
		padding-bottom: 170upx;
	}
</style>
