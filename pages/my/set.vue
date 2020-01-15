<template>
	<!-- 设置 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">设置</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='flex_b_c b_b infoBox m_t40'>
				<view class="f_w">视频自动播放</view>
				<picker class='wifi flex_r_c' @change="selItem" :value="playIndex" :range="playArr">
					<text>{{playArr[playIndex]}}</text>
					<text class='iconfont icon-you- intoIcon'></text>
				</picker>
			</view>
			<!-- <view class='flex_b_c b_b infoBox'>
				<view class="f_w">消息通知</view>
				<view class="body-view">
					<switch @change="switchChange" />
				</view>
			</view> -->
			<view class='flex_c_c infoBox m_t40'>
				<view class="f_w" @click="exit">退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				playArr: ['仅WIFI下', '数据流量和WIFI下'], //视频自动播放项
				playIndex: 0, //视频自动播放项-下标
			}
		},
		onLoad() {
			this.playIndex = uni.getStorageSync('reasonIndex')
		},
		methods: {
			...mapMutations(['logout']),
			// 视频自动播放选择
			selItem(e) {
				this.playIndex = e.detail.value;
				uni.setStorageSync('reasonIndex', this.playIndex)
			},
			// 消息通知
			switchChange(e) {
				console.log('携带值为', e.detail.value)
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//退出登录
			exit() {
				this.logout();
				var param = {
					id: 53
				}
				app.basic.getAjaxData(com.common('autoLogin'), param, 'GET').then(res => {
					var token = res.data.data;
					uni.setStorage({
						key: 'token',
						data: token,
						success() {
							uni.reLaunch({
								url: 'my'
							})
						}
					});
				})

			},

		}
	}
</script>


<style>
	page {
		background-color: #EEEEF0;
	}

	.mainCom {
		width: 100%;
	}

	.infoBox {
		padding: 0 40upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #172434;
		background: #fff;
	}

	.wifi {
		color: #6C6C6C;
		font-size: 24upx;
		width: 50%;
	}

	.icon {
		font-size: 50upx;
		color: #95A0B6;
	}
</style>
