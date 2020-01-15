<template>
	<!-- 关于APP意见反馈 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">关于APP意见反馈</view>
			</view>
		</view>
		<view class="mainCom">
			<view>
				<view class="tit">关于APP意见反馈</view>
				<textarea placeholder="请描述您使用APP遇到的问题或您的建议" :value="concent" @input="bindTextAreaBlur" class="area"></textarea>
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
			concent: ''
		};
	},
	onLoad(option) {},
	methods: {
		/**
		 * 提交反馈
		 */
		submit: function() {
			var that = this;
			var concent = this.concent;
			if (concent == '') {
				uni.showToast({
					title: '请输入反馈内容',
					icon: 'none'
				});
				return;
			}
			var param = {
				feedback: that.concent
			};
			app.basic.getAjaxData(com.help('feedback_save'), param, 'POST').then(res => {
				if (res.data.status == true) {
					that.concent = '';
					// this.prePage()
					uni.showToast({
						title: '反馈成功',
						icon: 'success',
						duration: 2000,
						success() {
							setTimeout(function() {
								that.backBtn();
							}, 2000);
						}
					});
				}
			});
		},

		/**
		 * 获取反馈内容
		 */
		bindTextAreaBlur: function(e) {
			this.concent = e.detail.value;
			console.log(this.concent);
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.mainCom .tit {
	color: #333333;
	font-size: 30upx;
	padding: 42upx 0 14upx;
}

.ipt,
.area {
	width: 90%;
	background: #f2f2f2;
	color: #999999;
	font-size: 24upx;
	padding: 36upx 28upx;
}
</style>
