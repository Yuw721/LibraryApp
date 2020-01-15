<template>
	<!-- 个人成就 -->
	<view class="achievement">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">个人成就</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class="topInfoBox">
				<view class="flex_b_c">
					<view>
                        <view class="rankBox">
                            <text class="rank">LV{{userIntegralGrade.id}}</text>
                            /{{userIntegralGrade.gradeName}}
                        </view>
                        <view class="upgrade">升级还需{{userIntegralGrade.score-userIntegralGrade.gradeScore}}成长值</view>
					</view>
					<view>
                        <image :src="headPortrait" class="headImg"></image>
					</view>
				</view>
				<view class="upgradeBox">
					<view class=" flex_c_c">
						<image src="../../static/imgs/achievement_icon1.png" class="upgradeIocn1"></image>
						<view class="lineBox">
							<view class="line" :style="{width: lineWidth+'%'}"></view>
                            <image :src="headPortrait" class="headIocn" :style="{left: lineWidth+'%'}"></image>
						</view>
						<image src="../../static/imgs/achievement_icon2.png" class="upgradeIocn2"></image>
					</view>
					<view class="flex_b_c upgradeName">
                        <view>LV{{userIntegralGrade.id}}/{{userIntegralGrade.gradeName}}</view>
                        <view>LV{{userIntegralGrade.nextId}}/{{userIntegralGrade.nextName}}</Rview>
						</view>
					</view>
				</view>

			</view>
			<view class="gradeBox">
				<view class="threeBox">
                    <view v-for="item in gradeList" :key="item.gradeName">
                        <image :src="item.image" class="upgradeImg"></image>
                        <view class="gradeName getGradeName">{{item.gradeName}}</view>
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
                lineWidth: 50,
                userIntegralGrade: {
                    id: 4,
                    gradeScore: 529,
                    gradeName: '进士',
                    score: 600,
                    nextId: 5,
                    nextName: '探花'
                },
                gradeList: []
			}
		},
        onLoad() {
            this.getUserIntegralGrade();
            this.getUserGradeList();
        },
        computed: {
            ...mapState(['headPortrait'])
        },
		methods: {
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //获取用户积分
            getUserIntegralGrade() {
                app.basic.getAjaxData(com.user("getUserIntegralGrade"), null, "GET").then(res => {
                    this.userIntegralGrade = res.data.data;
                    this.lineWidth = this.userIntegralGrade.gradeScore / this.userIntegralGrade.score * 100
                })
            },
            //获取用户成就
            getUserGradeList() {
                app.basic.getAjaxData(com.user("getUserGradeList"), null, "GET").then(res => {
                    this.gradeList = res.data.data;
                })
            }
		}
	}
</script>


<style>
	page {
		background: #F8F8F8;
	}

	.achievement .statusBar,
	.achievement .titBar,
	.topInfoBox {
		background: linear-gradient(90deg, rgba(78, 78, 80, 1) 0%, rgba(49, 49, 49, 1) 100%);
	}

	.achievement .titBar {
		margin-top: -2upx;
	}

	.achievement .titBar .tit,
	.achievement .titBar .backBtn {
		color: #FFFFFF;
	}

	.achievement .mainCom {
		width: 100%;
		padding-top: 166upx;
	}

	.topInfoBox {
		padding: 30upx 58upx 100upx;
	}

	.headImg {
		width: 106upx;
		height: 106upx;
		border-radius: 87upx;
		border: 4upx solid rgba(255, 255, 255, 0.51);
	}

	.rankBox {
		color: #FFFFFF;
		font-size: 30upx;
	}

	.rank {
		font-size: 88upx;
	}

	.upgrade {
		color: #B3B3B4;
		font-size: 26upx;
	}

	.upgradeBox {
		background: rgba(255, 255, 255, 0.06);
		border-radius: 20upx;
		padding: 26upx;
		margin-top: 30upx;
	}

	.lineBox {
		width: 460upx;
		height: 22upx;
		background: rgba(255, 255, 255, 0.09);
		border-radius: 20upx;
		position: relative;
	}

	.lineBox .line {
		width: 260upx;
		height: 22upx;
		background: rgba(250, 199, 135, 1);
		border-radius: 20upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.lineBox .headIocn {
		width: 30upx;
		height: 30upx;
		border-radius: 87upx;
		border: 2upx solid rgba(248, 248, 248, 1);
		position: absolute;
		top: 50%;
		left: 260upx;
		margin-left: -8upx;
		transform: translateY(-50%);
	}

	.upgradeIocn1,
	.upgradeIocn2 {
		width: 64upx;
		height: 64upx;
		z-index: 1;
	}

	.upgradeIocn1 {
		margin-right: -8upx;
	}

	.upgradeIocn2 {
		margin-left: -8upx;
	}

	.upgradeName {
		font-size: 20upx;
		color: #828282;
	}

	.gradeBox {
		border-radius: 36upx;
		margin-top: -36upx;
		background: #f8f8f8;
		padding: 0 10px;
	}

	.upgradeImg {
		width: 136upx;
		height: 160upx;
	}

    .gradeBox .getGradeName {
		color: #FAC787;
	}

	.gradeName {
		padding: 4upx 0;
		font-size: 30upx;
		font-weight: bold;
		color: rgba(136, 136, 136, 1);
	}

	.getDate {
		font-size: 22upx;
		color: #BFBFBF;
	}

	.threeBox>view {
		height: auto;
		background: #F8F8F8;
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
		border-radius: 0px;
		margin-top: 50upx;
	}
</style>
