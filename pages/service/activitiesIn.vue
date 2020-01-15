<template>
	<!-- 活动签到 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">活动签到</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='flex_b_c info b_b'>
				<view>
					<view class='tit'>{{appleInfo.title}}</view>
					<view class='tiem'>活动时间：{{appleInfo.start}}-{{appleInfo.end}}</view>
				</view>
				<view class='grayBtn' v-if="appleInfo.state == 2">已结束</view>
			</view>
			<view class='flex_b_c info b_b'>
				<view>报名人</view>
				<view>{{appleInfo.name}}</view>
			</view>
			<view class='flex_b_c info b_b'>
				<view>手机号</view>
				<view>{{appleInfo.phone}}</view>
			</view>
			<view class='flex_b_c info b_b'>
				<view class='activityPlaceTit'>活动地点</view>
				<view class='activityPlace'>{{appleInfo.address}}</view>
			</view>
			<image :src='appleInfo.qrcode' class='codeImg'></image>
			<view class='hint'>活动负责人扫描二维码进行活动签到</view>
		</view>
		<!-- <view class='maxBtn'>取消报名</view> -->
		<view class='maxBtn'>取消报名</view>
		<!-- 活动结束时显示 -->
		<!-- <view class='maxBtn'>反馈</view> -->
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				id: null,
				appleInfo: {}
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getAppleInfo();
		},
		methods: {

			//获取报名信息
			getAppleInfo() {
				var param = {
					id: this.id
				};
				app.basic.getAjaxData(com.activity('getActivityEnrollInfo'), param, "GET").then(res => {
					this.appleInfo = res.data.data;
					console.log(this.appleInfo);
				})
			},
			// 返回上一页
			backBtn() {
                uni.navigateBack()
			},
		}
	}
</script>

<style>
	.info {
		padding: 40upx 0;
		font-size: 30upx;
		color: #666666;
	}

	.info .tit {
		width: 540upx;
		color: #000;
		font-weight: bold;
	}

	.info .tiem {
		width: 540upx;
		padding-top: 10upx;
		font-size: 24upx;
		color: #9B9B9B;
	}

	.codeImg {
		display: block;
		width: 400upx;
		height: 400upx;
		margin: 44upx auto 32upx;
	}

	.hint {
		width: 100%;
		text-align: center;
		color: #FA7268;
		font-size: 32upx;
	}

	.activityPlaceTit {
		width: 25%;
		text-align: left;
	}

	.activityPlace {
		width: 75%;
		line-height: 44upx;
		text-align: right;
	}

	.info .grayBtn {
		color: #FFFFFF;
		background: linear-gradient(90deg, rgba(255, 187, 0, 1) 0%, rgba(255, 216, 108, 1) 100%);
	}

	.maxBtn {
		margin-top: 80upx;
	}
</style>
