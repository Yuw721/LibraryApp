<template>
	<!-- 服务 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<view class="topTit">服务</view>
				<image src="../../static/imgs/icon_my12.png" class="helpIcon" @click="goHelp"></image>
			</view>
		</view>
		<view class="mainCom">
			<view class="serviceBox">
				<view class="itemBox plateBox p_tb40" v-for="(item, index) in menuList" :key="item.name">
					<view class="plateTitBox m_b20">
						<view>{{ item.name }}</view>
						<view class="plateLine"></view>
					</view>
					<view class="s_b_l item">
						<view v-on:click="serviceFun(itemName.method)" v-for="(itemName, indexList) in item.childList" :key="itemName.name">
							<image :src="itemName.icon" :class="'icon' + itemName.method"></image>
							<view>{{ itemName.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				menuList: []
			};
		},
		onLoad() {
			this.getMenuInfo();
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			//获取服务功能
			getMenuInfo: function() {
				var that = this;
				var param = {
					id: 30
				};
				app.basic.getAjaxData(com.common('getMenuInfo'), param, 'GET').then(res => {
					console.log(res);
					// for(var i = 0; i < res.data.data.length; i++) {
					// 	for(var j = 0; j < res.data.data[i].childList.length; j++) {
					// 		res.data.data[i].childList[j].method = "icon"+res.data.data[i].childList[j].method;
					// 	}
					// }
					that.menuList = res.data.data;
				});
			},

			serviceFun: function(type) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				console.log(type);
				if (type == 1) {
					// 一键续借
					uni.navigateTo({
						url: 'renew'
					});
				} else if (type == 2) {
					// 就近借还书
					this.naer();
				} else if (type == 3) {
					// 网上书房
					this.netBookRoom();
				} else if (type == 4) {
					// 停车缴费
					uni.navigateTo({
						url: 'car'
					});
				} else if (type == 5) {
					// 延误缴费
					uni.navigateTo({
						url: 'delayPay'
					});
				} else if (type == 6) {
					// 支付记录
					uni.navigateTo({
						url: 'payRecord'
					});
				} else if (type == 7) {
					// 书籍预约
					uni.navigateTo({
						url: 'bookSub'
					});
				} else if (type == 8) {
					// 我的预约
					this.goMyser();
					// uni.navigateTo({
					// 	url: 'mySub'
					// });
				} else if (type == 9) {
					// 活动报名
					uni.navigateTo({
						url: 'activityApply'
					});
				} else if (type == 10) {
					// 书籍检索
					uni.navigateTo({
						url: 'bookRetrieval'
					});
				} else if (type == 11) {
					// 历史活动
					uni.navigateTo({
						url: 'historicalAct'
					});
				} else if (type == 12) {
					// 书库检索
					uni.navigateTo({
						url: 'libraryRetrieval'
					});
				}
			},
			// 就近借还书
			naer() {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						uni.setStorageSync('nearbyAera', res);
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.navigateTo({
							url: 'nearby'
						});
					},
					fail: res => {
						uni.showToast({
							title: '请打开GPS定位',
							icon: 'none'
						});
					}
				});
			},

			//网上书房
			netBookRoom() {
				// #ifdef APP-PLUS
				plus.share.getServices(
					function(res) {
						var sweixin = null;
						for (var i = 0; i < res.length; i++) {
							var t = res[i];
							if (t.id == 'weixin') {
								sweixin = t;
							}
						}
						if (sweixin) {
							sweixin.launchMiniProgram({
								id: 'gh_61425dd75f2d' // 要跳转小程序的原始ID
								// path: 'mine/pages/myInfo/readerCard/readerCard?libcode=hunan&type=externalMinia&ucardno=' + rdid,
							});
						}
					},
					function(res) {
						console.log(JSON.stringify(res));
					}
				);
				// #endif
			},
			// 我的预约
			goMyser: function() {
				app.basic.getAjaxData(com.enquiries('sub'), 'GET').then(res => {
					if (res.data.status) {
						uni.navigateTo({
							url: 'mySub'
						});
					} else {
						uni.showModal({
							title: '温馨提示',
							content: '未绑定借阅证，绑定？',
							confirmColor: '#71AE91',
							success: function(res) {
								console.log(res);
								if (res.confirm) {
									uni.navigateTo({
										url: '../my/bindCard'
									});
								}
							}
						});
					}
				});
			},
			goHelp() {
				uni.navigateTo({
					url: '../my/helpFeedback'
				})
			},
		}
	};
</script>

<style>
	.topTit {
		color: #020202;
		font-size: 46upx;
		font-weight: bold;
		padding-left: 48upx;
	}

	.helpIcon {
		width: 44upx;
		height: 44upx;
		margin-right: 42upx;
	}

	.s_b_l {
		border-left: 2upx solid #f5f5f5;
	}

	.serviceBox {
		padding-bottom: 40upx;
	}

	.line {
		width: 10upx;
		height: 24upx;
		background: #71ae91;
		border-radius: 4upx;
	}

	.lineTit {
		font-size: 30upx;
		font-weight: bold;
		color: #253858;
		padding-left: 10upx;
	}

	.item {
		margin-top: 20upx;
		height: 200upx;
	}

	.item>view {
		display: inline-block;
		width: 33%;
		height: 100%;
		border-right: 2upx solid #f5f5f5;
		border-bottom: 2upx solid #f5f5f5;
		border-top: 2upx solid #f5f5f5;
		font-size: 24upx;
		font-weight: 500;
		color: #939393;
		text-align: center;
		vertical-align: top;
	}

	.item>view>image {
		margin-top: 40upx;
	}

	.item>view>view {
		padding-top: 20upx;
	}

	.icon1 {
		width: 48upx;
		height: 42upx;
	}

	.icon2 {
		width: 42upx;
		height: 50upx;
	}

	.icon3 {
		width: 52upx;
		height: 52upx;
	}

	.icon4 {
		width: 62upx;
		height: 52upx;
	}

	.icon5 {
		width: 54upx;
		height: 54upx;
	}

	.icon6 {
		width: 44upx;
		height: 52upx;
	}

	.icon7 {
		width: 52upx;
		height: 44upx;
	}

	.icon8 {
		width: 52upx;
		height: 44upx;
	}

	.icon9 {
		width: 48upx;
		height: 48upx;
	}

	.icon10 {
		width: 56upx;
		height: 44upx;
	}

	.icon11 {
		width: 54upx;
		height: 50upx;
	}

	.icon12 {
		width: 56upx;
		height: 48upx;
	}

	.item_img {
		width: 100%;
		height: 200upx;
	}
</style>
