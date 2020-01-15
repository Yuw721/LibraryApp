<template>
	<!-- 馆员信息录入 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">馆员信息录入</view>
			</view>
		</view>
		<view class='hidden mainCom'>
			<view>
				<view class='tit'>你现在的身份？</view>
				<view class='flex_b_c'>
					<view class='selBox' @click='selIdentity(0)'>
						<view class='checkedBox'>
							<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="identityType == 0"></image>
						</view>
						<image src='../../static/imgs/record_pavilion.png' class='recordImg'></image>
						<view class='recordTit'>在馆员工</view>
					</view>
					<view class='selBox' @click='selIdentity(1)'>
						<view class='checkedBox'>
							<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="identityType == 1"></image>
						</view>
						<image src='../../static/imgs/record_retire.png' class='recordImg'></image>
						<view class='recordTit'>已退休</view>
					</view>
				</view>
			</view>
			<view>
				<view class='tit'>你的性别</view>
				<view class='flex_b_c'>
					<view class='selBox' @click='selSex(0)'>
						<view class='checkedBox'>
							<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="sexType == 0"></image>
						</view>
						<image src='../../static/imgs/record_man.png' class='recordManImg'></image>
						<view class='recordTit'>男性</view>
					</view>
					<view class='selBox' @click='selSex(1)'>
						<view class='checkedBox'>
							<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="sexType == 1"></image>
						</view>
						<image src='../../static/imgs/record_woman.png' class='recordWomanImg'></image>
						<view class='recordTit'>女性</view>
					</view>
				</view>
			</view>
			<view class='selDate b_b'>
				<picker mode="date" @change="bindDateChange">
					<view class='flex_b_c'>
						<view class='tit'>入馆工作时间</view>
						<view class='flex_l_c'>
							<view>{{date}}</view>
							<view class='iconfont icon-you- intoIcon'></view>
						</view>
					</view>
				</picker>
			</view>
			<view class='botBox flex_c_c'>
				<view class="maxBtn" @click="next">下一步</view>
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
				date: '',
				identityType: null, // 馆员身份  0：在馆；1：退休
				sexType: null, // 馆员性别  0：男性；1：女性
			}
		},
		onLoad() {},
		methods: {
			// 下一步
			next() {
                if (this.identityType == null) {
                    uni.showToast({
                        title: '请选择身份',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }

                if (this.sexType == null) {
                    uni.showToast({
                        title: '请选择性别',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                if (this.date == '') {
                    uni.showToast({
                        title: '请选择日期',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else {
                    if (new Date(this.date) > new Date()) {
                        uni.showToast({
                            title: '请选择正确日期',
                            icon: 'none',
                            duration: 2000
                        })
                        return
                    }
                }

				uni.navigateTo({
                    url: 'basicInformation?identityType=' + this.identityType +
                        '&sexType=' + this.sexType + '&date=' + this.date
				})
			},
			// 选择身份
			selIdentity: function(type) {
				this.identityType = type
			},

			// 选择性别
			selSex: function(type) {
				this.sexType = type
			},
			// 选择入馆工作时间
			bindDateChange: function(e) {
				this.date = e.detail.value;
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>


<style>
	page {
		background: #f2f2f2;
	}

	.mainCom .tit {
		font-size: 32upx;
		color: #1d1e2c;
		padding: 40upx 0 30upx;
	}

	.selBox {
		width: 302upx;
		height: 260upx;
		background: #fff;
		text-align: center;
		box-shadow: 1px 1px 10px 2px #f4f4f4;
		border-radius: 24upx;
	}

	.checkedBox {
		text-align: right;
		padding: 16upx 16upx 0 0;
		height: 48upx;
	}

	.checkedImg {
		width: 48upx;
		height: 48upx;
	}

	.recordImg {
		width: 106upx;
		height: 98upx;
	}

	.recordTit {
		color: #1d1e2c;
		font-size: 30upx;
		padding-top: 18upx;
	}

	.recordManImg {
		width: 132upx;
		height: 56upx;
		margin-top: 40upx;
	}

	.recordWomanImg {
		width: 110upx;
		height: 90upx;
	}

	.selDate {
		padding: 10upx 0 0;
	}
</style>
