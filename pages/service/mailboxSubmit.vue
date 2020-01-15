<template>
	<!-- 提交成功 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">提交成功</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="infoBox">
				<image src="../../static/imgs/submit_ok.png" class="subImg"></image>
				<view>
					<text>
						您的文献传递请求已经成功提交，并为您转发到 全国图书馆参考咨询服务平台，如：深圳文献港、文献传递共享服务平台。
						文献传递服务是参与图书馆参考咨询服务的单位义务提供的公共文献服务，不能确保一定能获得全文，服务单位会将处理结果发送到您的邮箱
					</text>
					<text class="redCol">{{ email }}</text>
					<text>(特别提示：如您所填写的email邮箱地址有误，您将无法查收到所申请的内容!)</text>
				</view>
				<view>
					<view>提示：</view>
					<view>如果您长时间没收到邮件，请尝试以下方法：</view>
					<view>邮件可能被误识为垃圾邮件，请检查被过滤的邮件中是否有回复给您的信件；</view>
					<view>请更换邮件地址再次提交参考咨询申请。</view>
				</view>
			</view>
		</view>
		<view class="maxBtn" @click="know">知道了</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			email: ''
		};
	},
	onLoad(option) {
		this.email = option.email;
	},
	methods: {
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		know() {
			uni.switchTab({
				url: 'service'
			});
		}
	}
};
</script>

<style>
.subImg {
	display: block;
	width: 142upx;
	height: 122upx;
	margin: 0 auto 30upx;
}

.infoBox {
	padding: 6% 0 10upx;
	font-size: 26upx;
	color: #666;
	line-height: 60upx;
}
</style>
