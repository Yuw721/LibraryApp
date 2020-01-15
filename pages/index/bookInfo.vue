<template>
	<!-- 书籍信息 -->
	<view id="bookInfo">
		<image src='../../static/imgs/sweep_bg.png' class='sweep_bg'></image>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书籍信息</view>
			</view>
		</view>
		<view>
			<view class='infoBox' v-if="type == 0">
				<view class='topInfo'>
					<view>aaa，您好！</view>
					<view>请确认您需借阅书籍信息：</view>
				</view>
				<view class='info'>
					<view class='flex_t_b'>
						<view>书籍名称：</view>
						<view>《啊啊啊啊啊》</view>
					</view>
					<view class='flex_t_b'>
						<view>条码号：</view>
						<view>XT123156</view>
					</view>
					<view class='flex_t_b'>
						<view>作者：</view>
						<view>啊啊啊啊啊</view>
					</view>
					<view class='flex_t_b'>
						<view>阅览室：</view>
						<view>啊啊啊啊啊</view>
					</view>
					<view class='flex_t_b'>
						<view>状态：</view>
						<view>啊啊啊啊啊</view>
					</view>
				</view>
				<view class='maxBtn' @click='borrow'>确认借阅（{{currentTime}}S）</view>
				<view class='maxBtn noBorrow' @click='noBorrow'>这不是我要借的书</view>
				<view class='matters'>
					<view>注意事项：</view>
					<view>请在规定时间内，确认是否借阅此书籍。</view>
					<view>若在规定时间内，无法确认借阅，系统将默认 取消借阅。</view>
				</view>
			</view>
			<!-- 借阅成功 -->
			<view class='infoBox stateBox' v-if="type == 1">
				<view class="iconfont icon-xuanzhong borrow_ok"></view>
				<!-- <image src='../../static/imgs/borrow_ok.png' class='borrow_ok'></image> -->
				<view class='infoTit'>借阅成功</view>
				<view class='tip'>根据借阅规则，您还能借阅1本书。</view>
				<view class='maxBtn' @click='continueBorrow'>继续借阅</view>
				<view class='maxBtn noBorrow' @click='toLook'>去书架查看</view>
			</view>
			<!-- 借阅失败 -->
			<view class='infoBox stateBox' v-if="type == 2">
				<image src='../../static/imgs/borrow_no.png' class='borrow_no'></image>
				<view class='stateFlase'>该书已被预约，暂不外借</view>
				<view class='maxBtn noBorrow' @click='exchange'>换一本书</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';

	export default {
		data() {
			return {
				currentTime: 30,
				interval: null,
				type: 0, // 0：书籍信息 1：借阅成功 2：借阅失败
			}
		},
		onLoad() {
			var that = this;
			var currentTime = that.currentTime;
			var interval = setInterval(function() {
				that.currentTime = currentTime - 1;
				currentTime--;
				if (currentTime <= 0) {
					clearInterval(interval);
					uni.redirectTo({
						url: 'sweepCode',
					})
				}
			}, 1000)
			this.interval = interval;
		},
		methods: {
			// 去书架查看
			toLook() {
				uni.switchTab({
					url: '../book/book'
				})
			},
			// 继续借阅
			continueBorrow() {
				this.type = 0;
				uni.redirectTo({
					url: 'sweepCode',
				})
			},
			// 换一本书
			exchange() {
				this.type = 0;
				uni.redirectTo({
					url: 'sweepCode',
				})
			},
			// 确认借阅
			borrow() {
				clearInterval(this.interval);
				this.type = 1; // 借阅成功
				// this.type = 2; // 借阅失败
			},
			// 这不是我要借的书
			noBorrow() {
				clearInterval(this.interval);
				this.type = 0;
				uni.redirectTo({
					url: 'sweepCode',
				})
			},
			// 返回上一页
			backBtn() {
				clearInterval(this.interval);
				uni.navigateBack();
			},
		}
	}
</script>


<style>
	.topInfo {
		padding-bottom: 38upx;
		color: #33333d;
	}

	.info {
		border-top: 3upx dashed #eaeef3;
		padding-top: 28upx;
	}

	.info>view {
		padding: 20upx 0;
	}

	.info>view>view:first-of-type {
		width: 30%;
	}

	.info>view>view:last-of-type {
		width: 70%;
		text-align: right;
	}

	.maxBtn {
		width: 100%;
		margin: 40upx auto;
	}

	.noBorrow {
		background: #eaeef3;
		color: #657183;
		border: 2upx solid #eaeef3;
		box-shadow: 0 0 0 0 #eaeef3;
	}

	.matters {
		color: #197cb7;
		padding: 20upx;
		font-size: 28upx;
	}

	.stateBox {
		text-align: center;
	}

	.infoBox .borrow_ok {
		font-size: 120upx;
		color: #197cb7;
		/* width: 122upx;
	  height: 122upx; */
	}

	.borrow_no {
		width: 122upx;
		height: 122upx;
	}

	.infoBox .infoTit {
		font-size: 56upx;
		color: #33333D;
		padding: 10upx 0 30upx;
	}

	.stateFlase {
		font-size: 36upx;
		color: rgb(155, 176, 204);
		padding: 30upx 0 30upx;
	}

	.infoBox .tip {
		font-size: 30upx;
		color: #7B8A9D;
	}
</style>
