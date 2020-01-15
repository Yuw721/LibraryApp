<template>
	<!-- 通知广播 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">通知广播</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="detTit b_b">
				<view class="title">{{mail.title}}</view>
				<view class="miniWord">{{mail.createDate}}</view>
			</view>
			<view class="contentBox"><rich-text :nodes="mail.content"></rich-text></view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';

export default {
	data() {
		return {
			mailId: '',
			mail: ''
		};
	},
	onLoad(option) {
		this.mailId = option.mail;
		this.selectMailById()
	},
	methods: {
		selectMailById() {
			let param = {
				mail: this.mailId
			}
			app.basic.getAjaxData(com.notification('selectMailById'), param, 'GET').then(res => {
				for (var i = 0; i < res.data.data.length; i++) {
					res.data.data[0].content = res.data.data[0].content.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
				}
				this.mail = res.data.data;
			});
		},
		// 返回上一页
		backBtn() {
			uni.redirectTo({
				url: 'messageCenter'
			});
		}
	}
};
</script>

<style>
.detTit {
	width: 100%;
	padding: 50upx 0 12upx;
}

.title {
	font-size: 28upx;
	color: #2b2b2b;
	padding-bottom: 12upx;
}

.contentBox {
	padding-top: 24upx;
	font-size: 26upx;
	color: #666;
	line-height: 44upx;
}

.miniWord {
	font-size: 20upx;
	color: rgba(153, 153, 153, 1);
}
</style>
