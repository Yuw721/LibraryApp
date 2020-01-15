<template>
	<!-- 馆员信息 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="prePage"></text>
				<view class="tit">馆员信息</view>
			</view>
		</view>
		<view class='mainCom' :style='"height:"+mainComHeight+"px"'>
			<view class='mainComInfo'>
				<view class='item1'>
					<view class='info1'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon1.png' class='numImg'></image>
						<view>{{param.entryTime}}</view>
						<view>{{param.name}}光荣成为图书馆馆员</view>
						<view v-if="param.education!=null">{{param.education}}学历</view>
					</view>
				</view>
				<view class='item2'>
					<view class='info2'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon2.png' class='numImg'></image>
						<view>迄今为止服务了{{param.days}}个日夜</view>
						<view v-if="param.states==1">于{{param.retireTime}}光荣退休</view>
						<view v-if="param.professionalTitle!=null">获得{{param.professionalTitle}}职称</view>
					</view>
				</view>
				<view class='item3'>
					<view class='item3NumImg'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon3.png' class='numImg'></image>
					</view>
					<view :class='"department"+index' v-for="(item,index) in departmentArr" :key='index+"-department"'>
						<image src='../../static/imgs/chineseArrowIcon1.png' class='chineseArrowIcon1'></image>
						<text>{{item}}</text>
					</view>
				</view>
				<view class='item4'>
					<view class='item4NumImg'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon4.png' class='numImg'></image>
					</view>
					<view :class='"duty"+index' v-for="(item,index) in dutyArr" :key='index+"-duty"'>
						<view>{{item}}</view>
						<image src='../../static/imgs/chineseArrowIcon2.png' class='chineseArrowIcon2'></image>
					</view>
				</view>
				<view class='item5'>
					<view class='item5NumImg'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon5.png' class='numImg'></image>
					</view>
					<view class='info5'>
						<view v-for="(item,index) in honorArr" :key='index+"-honor"'>“{{item}}”</view>
					</view>
				</view>
				<view class='item6'>
					<view class='item6NumImg'>
						<image src='https://tsg.zydbai.com/static/img/chineseIcon6.png' class='numImg'></image>
					</view>
					<view class='info6'>
						<view>{{slogan}}</view>
					</view>
					<view class='attention'>欢迎关注读者服务小程序</view>
				</view>
				<view class='flex_b_c recordNextBtnBox' v-if='showType == 1'>
					<view class='recordNextBtn' @click='over'>保存</view>
					<view class='recordNextBtn' @click='prePage'>返回</view>
				</view>
				<view class='flex_b_c recordNextBtnBox' v-if='showType == 2'>
					<view class='recordNextBtn' @click='shareBtn'>分享</view>
					<view class='recordNextBtn' @click='upInfo'>修改</view>
				</view>
			</view>
			<canvas style="width: 305px; height: 539px; margin-top:500px;" canvas-id="firstCanvas"></canvas>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';

	export default {
		data() {
			return {
				showType: null,
				param: null,
				departmentArr: [],
				dutyArr: [],
				honorArr: [],
				slogan: '',
				shareImg: '',
				mainComHeight: null,
				qrCode: '',
			}
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			let query = uni.createSelectorQuery();
			query.select('.mainComInfo').boundingClientRect(rect => {
				let height = rect.height;
				if (height > 0) {
					//设置高度跟宽度相同，然后应用到wxml中
					this.mainComHeight = height
					console.log(this.mainComHeight);
					return;
				}
			}).exec();
		},
		onLoad(option) {
			this.showType = option.type;
			this.param = JSON.parse(decodeURIComponent(option.param));
			this.departmentArr = this.param.department.split('#');
			this.dutyArr = this.param.job.split('#');
			this.honorArr = this.param.honour.split('#');
			this.slogan = this.param.watchword.split('#')[0];
			var that = this;
			var myQrcode = uni.getStorageSync('myQrcode');
			if (myQrcode == '' || myQrcode == null) {
				that.getCode();
			} else {
				that.qrCode = uni.getStorageSync('myQrcode');
			}
			this.getCanvas();
		},
		methods: {
			// 绘制图片
			getCanvas: function() {
				var that = this;
				// canvas绘制图片
				let windowWidth = 305; // 屏幕的宽度
				let windowHeight = 539; // 屏幕的高度
				var context = uni.createCanvasContext('firstCanvas');
				console.log(that.sysLibrarianArchivesInfo);
				uni.getImageInfo({
					src: 'https://wj.zydbai.com/infoType_shareBg.png',
					success: function(res) {
						console.log(res);
						context.drawImage(res.path, 0, 0, windowWidth, windowHeight);
						// 绘制昵称
						context.setFontSize(14);
						context.setFillStyle('#3A3A3A');
						context.setTextAlign('center');
						context.fillText(that.param.name, windowWidth / 2 + 18, 195);
						context.setFontSize(12);
						context.fillText('出版时间', windowWidth / 2 + 18, 240);
						context.fillText(that.param.entryTime, windowWidth / 2 + 18, 260);
						// 绘制二维码
						uni.getImageInfo({
							src: that.qrCode,
							success: function(res) {
								context.drawImage(res.path, windowWidth / 2 - 28, 275, 90, 90);
								context.draw();
								setTimeout(function() {
									uni.canvasToTempFilePath({
										canvasId: 'firstCanvas',
										success: function(res) {
											console.log(res.tempFilePath);
											that.shareImg = res.tempFilePath,
												console.log(that.shareImg);
										},
										fail: function(res) {
											console.log(res);
										}
									});
								}, 1000);
							}
						})
					}
				})
			},
			// 获取小程序码
			getCode: function() {
				var that = this;
				app.basic.getAjaxData(com.user('getQrcode'), {}, 'GET').then(res => {
					if (res.data.status) {
						uni.setStorageSync('myQrcode', res.data.data);
						that.qrCode = res.data.data;
					}
				});
			},
			// 返回上一页
			prePage() {
				uni.navigateBack();
			},
			// 完成
			over: function() {
				app.basic.getAjaxData(com.user("saveSysLibrarianArchives"), this.param, "POST").then(res => {
					if (res.data.status) {
						var that = this
						uni.showToast({
							title: '录入成功',
							icon: 'none',
							duration: 2000,
							success: function() {
								setTimeout(function() {
									//要延时执行的代码
									uni.switchTab({
										url: 'my',
									})
								}, 2000) //延迟时间
							}
						})
					} else {
						uni.showToast({
							title: '录入失败',
							icon: 'none',
							duration: 2000,
							success: function() {
								setTimeout(function() {
									//要延时执行的代码
									uni.switchTab({
										url: 'my',
									})
								}, 2000) //延迟时间
							}
						})
					}
				})
			},
			//修改
			upInfo() {
				uni.navigateTo({
					url: 'optionalModule?param=' + encodeURIComponent(JSON.stringify(this.param))
				})
			},
			//分享
			shareBtn() {
				var that = this;
				uni.share({
					provider: "weixin",
					type: 2,
					scene: "WXSenceTimeline",
					// imageUrl: "https://wj.zydbai.com/gyda.png",
					imageUrl: that.shareImg,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>


<style>
	.mainCom {
		width: 100%;
		color: #333;
		font-size: 32upx;
		overflow: hidden;
	}

	.numImg {
		width: 89upx;
		height: 61upx;
	}

	.item1 {
		width: 100%;
		height: 861upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle1.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info1 {
		position: absolute;
		top: 153upx;
		right: 41upx;
	}

	.item2 {
		width: 100%;
		height: 885upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle2.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info2 {
		position: absolute;
		top: 0upx;
		left: 68upx;
	}

	.item3 {
		width: 100%;
		height: 894upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle3.png") no-repeat center;
		background-size: 100% 100%;
	}

	.item3NumImg {
		position: absolute;
		top: 30upx;
		left: 198upx;
	}

	.department0 {
		position: absolute;
		top: 178upx;
		right: 212upx;
	}

	.department1 {
		position: absolute;
		top: 408upx;
		left: 270upx;
	}

	.department2 {
		position: absolute;
		bottom: 284upx;
		left: 270upx;
	}

	.chineseArrowIcon1 {
		width: 20upx;
		height: 36upx;
		vertical-align: middle;
		margin-right: 10upx;
	}

	.chineseArrowIcon2 {
		width: 38upx;
		height: 20upx;
	}

	.item4 {
		width: 100%;
		height: 822upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle4.png") no-repeat center;
		background-size: 100% 100%;
		text-align: center;
	}

	.item4NumImg {
		position: absolute;
		top: 20upx;
		left: 68upx;
	}

	.duty0 {
		position: absolute;
		top: 64upx;
		left: 240upx;
	}

	.duty1 {
		position: absolute;
		top: 120upx;
		right: 178upx;
	}

	.duty2 {
		position: absolute;
		top: 210upx;
		left: 24upx;
	}

	.duty3 {
		position: absolute;
		top: 324upx;
		right: 28upx;
	}

	.simpleZwThreeBox,
	.simpleZwThree {
		width: 251upx;
		height: 125upx;
	}

	.simpleZwTwoBox,
	.simpleZwTwo {
		width: 238upx;
		height: 125upx;
	}

	.dutyName1 {
		position: absolute;
		top: 34upx;
		left: 52upx;
	}

	.dutyName2 {
		position: absolute;
		top: 34upx;
		left: 50upx;
	}

	.dutyName3 {
		position: absolute;
		top: 34upx;
		left: 98upx;
	}

	.item5 {
		width: 100%;
		height: 583upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle5.png") no-repeat center;
		background-size: 100% 100%;
	}

	.item5NumImg {
		position: absolute;
		top: 0upx;
		left: 360upx;
	}

	.info5 {
		position: absolute;
		top: 80upx;
		left: 200upx;
	}

	.info5>view {
		padding-top: 10upx;
	}

	.item6 {
		width: 100%;
		height: 929upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/chineseStyle6.png") no-repeat center;
		background-size: 100% 100%;
	}

	.item6NumImg {
		position: absolute;
		top: 0;
		left: 103upx;
	}

	.info6 {
		position: absolute;
		top: 100upx;
		left: 103upx;
	}

	.attention {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 183upx;
		left: 0;
		color: #731215;
		font-size: 34upx;
	}

	.recordNextBtnBox {
		width: 90%;
		padding: 40upx 5%;
	}

	.recordNextBtn {
		width: 46%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		border-radius: 50upx;
		font-size: 30upx;
		background: #197cb7;
	}
</style>
