<template>
	<!-- 我的 -->
	<view class="my">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_r_c">
				<image src="../../static/imgs/icon_my1.png" class="icon1" @click="set"></image>
			</view>
		</view>
		<view class="mainCom">
			<view class="flex_b_c userBox">
				<view class="flex_l_c" @click="tologin">
					<image :src="headPortrait" class="headImg"></image>
					<view>
						<view class="name omit">{{ userName }}</view>
						<view class="hint" v-if="!hasLogin">点击头像登录或注册</view>
					</view>
				</view>
				<view class="center" @click="toPersonal" v-if="hasLogin">
					<text>个人中心</text>
					<text class="iconfont icon-you- centerIon"></text>
				</view>
			</view>
			<view class="flex_b_c muneBox">
				<view class="flex_l_c" @click="toAchievement">
					<image src="../../static/imgs/icon_my2.png" class="icon2"></image>
					<view>个人成就</view>
				</view>
				<view class="line"></view>
				<view class="flex_l_c" @click="toIntegral">
					<image src="../../static/imgs/icon_my3.png" class="icon2"></image>
					<view>积分商城</view>
				</view>
				<view class="line"></view>
				<view class="flex_l_c" @click="toReadReport">
					<image src="../../static/imgs/icon_my4.png" class="icon2"></image>
					<view>阅读报告单</view>
				</view>
			</view>
			<view class="muneItem">
				<view class="flex_b_c" @click="toBindCard">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my5.png" class="iocn5"></image>
						<view>我的借阅证</view>
					</view>
					<view class="flex_r_c">
						<view class="nowBanding">立即绑定</view>
						<view class="iconfont icon-you- intoIcon"></view>
					</view>
				</view>
				<view class="flex_b_c" @click="toRealNameProtocol">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my6.png" class="iocn6"></image>
						<view>实名认证</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
			</view>
			<view class="muneItem">
				<view class="flex_b_c" @click="toCollect">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my7.png" class="iocn7"></image>
						<view>我的收藏</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
				<view class="flex_b_c" @click="browseHistory">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my8.png" class="iocn8"></image>
						<view>浏览历史</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
			</view>
			<view class="muneItem" v-if="libDataShow" @click="through">
				<view class="flex_b_c">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my9.png" class="iocn9"></image>
						<view>馆长直通车</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
				<view class="flex_b_c" v-if="libShow" @click="toInformationEntry">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my10.png" class="iocn10"></image>
						<view>馆员人事档案</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
			</view>
			<view class="muneItem" @click="share">
				<view class="flex_b_c">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my11.png" class="iocn11"></image>
						<view>分享与关注</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
				</view>
				<view class="flex_b_c" @click="toHelpFeedback">
					<view class="flex_l_c">
						<image src="../../static/imgs/icon_my12.png" class="iocn12"></image>
						<view>帮助与反馈</view>
					</view>
					<view class="iconfont icon-you- intoIcon"></view>
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
				libShow: false,
				libDataShow: false
			};
		},
		onLoad() {},
		onShow() {
			this.getUserLibRoot();
			this.getUserLibDataRoot();
		},
		computed: {
			...mapState(['hasLogin', 'userName', 'headPortrait'])
		},
		methods: {
			// 分享与关注
			share() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'share'
				})
			},
			// 馆长直通车
			through() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				this.getToData();
				// uni.navigateTo({
				// 	url: 'todayToSee'
				// });
			},
			// 馆员人事档案
			toInformationEntry() {
				app.basic.getAjaxData(com.user('getSysLibrarianArchives'), 'GET').then(res => {
					if (res.data.data == null) {
						uni.navigateTo({
							url: 'informationEntry'
						});
					} else {
						var param = res.data.data;
						uni.navigateTo({
							url: 'infoType' + param.templateNo + '?type=2&param=' + encodeURIComponent(JSON.stringify(param))
						});
					}
				});
			},
			// 帮助与反馈
			toHelpFeedback() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'helpFeedback'
				});
			},
			// 个人阅读报告单
			toReadReport() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'readReport'
				});
			},
			// 个人成就
			toAchievement() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'achievement'
				});
			},
			// 实名认证
			toRealNameProtocol() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				app.basic.getAjaxData(com.common('countCertification'), null, 'GET').then(res => {
					if (res.data.data > 0) {
						uni.navigateTo({
							url: 'realNamePicture'
						});
					} else {
						uni.navigateTo({
							url: 'realNameProtocol'
						});
					}
				});
			},
			// 绑定借阅证
			toBindCard() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'bindCard'
				});
			},
			// 我的收藏
			toCollect() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'collect'
				});
			},
			// 个人信息
			toPersonal() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'personal'
				});
			},
			// 浏览历史
			browseHistory() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'browseHistory'
				});
			},
			// 设置
			set() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'set'
				});
			},
			// 登录
			tologin() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			// 积分商城
			toIntegral() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'mall/integral'
				});
			},
			getUserLibRoot: function() {
				var param = {
					source: '馆员人事档案'
				};
				app.basic.getAjaxData(com.user('getUserRoot'), param, 'GET').then(res => {
					this.libShow = res.data.status;
				});
			},

			getUserLibDataRoot: function() {
				var param = {
					source: '馆长直通车'
				};
				app.basic.getAjaxData(com.user('getUserRoot'), param, 'GET').then(res => {
					this.libDataShow = res.data.status;
				});
			},
			//获取今日到馆人数
			getToData: function() {
				app.basic.getAjaxData(com.bigdata('getInXtCount'), null, 'POST').then(res => {
					var todayData = 0;
					var inNum = 0;
					if (res.data.status) {
						todayData =
							Math.abs(parseInt(res.data.data.DataList[0].countIn)) +
							Math.abs(parseInt(res.data.data.DataList[1].countIn)) +
							Math.abs(parseInt(res.data.data.DataList[2].countIn)) +
							Math.abs(parseInt(res.data.data.CONUTLIST[0].countIn));
						// var todayData = res.data.data.todayPavilion;
						inNum =
							Math.abs(parseInt(res.data.data.DataList[0].countIn) - parseInt(res.data.data.DataList[0].countOut)) +
							Math.abs(parseInt(res.data.data.DataList[1].countIn) - parseInt(res.data.data.DataList[1].countOut)) +
							Math.abs(parseInt(res.data.data.DataList[2].countIn) - parseInt(res.data.data.DataList[2].countOut)) +
							Math.abs(parseInt(res.data.data.CONUTLIST[0].countIn) - parseInt(res.data.data.CONUTLIST[0].countOut));
					}
					app.globalData.nowInLibraryCount = inNum;
					uni.navigateTo({
						url: 'todayToSee?todayInCount=' + todayData
					});
				});
			}
		}
	};
</script>

<style>
	.mainCom {
		width: 100%;
	}
</style>
