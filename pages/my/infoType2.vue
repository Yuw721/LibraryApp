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
						<view v-if="param.education!=null">{{param.education}}学历</view>
						<view>{{param.entryTime}}</view>
						<view>这是我在湖南图书馆上班的第一天 </view>
					</view>
				</view>
				<view class='item2'>
					<view class='info2'>
						<view>截止到今天为止，</view>
						<view>我已经在湖南图书馆工作</view>
						<view>{{param.days}}天</view>
						<view v-if="param.professionalTitle!=null">获得{{param.professionalTitle}}职称</view>
					</view>
				</view>
				<view class='item3'>
					<view :class='"department"+index' v-for="(item,index) in departmentArr" :key='index+"-department"'>
						{{item}}
					</view>
				</view>
				<view class='item4'>
					<view :class='"duty"+index' v-for="(item,index) in dutyArr" :key='index+"-duty"'>{{item}}</view>
				</view>
				<view class='item5'>
					<view class='info5'>
						<view>
							<image src='../..static/imgs/simpleAward.png' class='simpleAward'></image>
							<text v-for="(item,index) in honorArr" :key='index+"-honor"'>“{{item}}”</text>
						</view>
					</view>
				</view>
				<view class='item6'>
					<view class='info6'>
						<view>{{slogan}}</view>
					</view>
				</view>
				<view class='item7'></view>
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
			console.log(this.param.department);
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
		},
	}
</script>


<style>
	.mainCom {
		width: 100%;
		color: #644024;
		font-size: 24upx;
		font-weight: bold;
		overflow: hidden;
	}

	.item1 {
		width: 100%;
		height: 405upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle1.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info1 {
		position: absolute;
		top: 151upx;
		left: 78upx;
		width: 250upx;
	}

	.item2 {
		width: 100%;
		height: 541upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle2.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info2 {
		position: absolute;
		top: 170upx;
		right: 36upx;
	}

	.item3 {
		width: 100%;
		height: 568upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle3.png") no-repeat center;
		background-size: 100% 100%;
	}

	.department0 {
		position: absolute;
		top: 230upx;
		left: 80upx;
	}

	.department1 {
		position: absolute;
		top: 298upx;
		left: 120upx;
	}

	.department2 {
		position: absolute;
		top: 366upx;
		left: 154upx;
	}

	.item4 {
		width: 100%;
		height: 614upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle4.png") no-repeat center;
		background-size: 100% 100%;
	}

	.duty0 {
		position: absolute;
		bottom: 340upx;
		right: 18upx;
		width: 130upx;
	}

	.duty1 {
		position: absolute;
		bottom: 138px;
		right: 22upx;
		width: 180upx;
	}

	.duty2 {
		position: absolute;
		bottom: 238upx;
		right: 40upx;
		width: 190upx;
	}

	.item5 {
		width: 100%;
		height: 552upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle5.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info5 {
		position: absolute;
		top: 144upx;
		left: 66upx;
	}

	.info5>view {
		padding-top: 6upx;
	}

	.info5>view>text {
		display: inline-block;
		width: 190upx;
		vertical-align: top;
	}

	.simpleAward {
		width: 23upx;
		height: 31upx;
		vertical-align: middle;
		margin-right: 10upx;
	}

	.item6 {
		width: 100%;
		height: 646upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle6.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info6 {
		position: absolute;
		top: 150upx;
		left: 10%;
		width: 80%;
		text-align: center;
	}

	.item7 {
		width: 100%;
		height: 636upx;
		position: relative;
		background: url("https://tsg.zydbai.com/static/img/fashionStyle7.png") no-repeat center;
		background-size: 100% 100%;
	}

	.info7 {
		position: absolute;
		top: 20upx;
		left: 0upx;
		width: 100%;
		text-align: center;
		font-size: 40upx;
		color: #e95154;
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
