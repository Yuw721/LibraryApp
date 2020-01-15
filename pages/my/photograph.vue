<template>
	<!-- 实名认证-拍照 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">实名认证</view>
			</view>
		</view>
		<view class='mainCom'>
			<view>
				<image mode="widthFix" :src="src" class='previewImg'></image>
				<button @click="onScanFace" class='photograph'>重新拍照</button>
			</view>
			<view class='red hintText' v-if='photographState'>无法识别您的人像信息，请重新拍照上传您的免冠人像照片</view>
			<view>
				<button @click="insert" class='photograph' v-if="!photographState">完成认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	import permijs from '../../static/js/permission.js'
	import app from '../../public/app.js';
	import com from '../../public/com.js';

	var lyBDFaceAuth;
	export default {
		data() {
			return {
				licenseIDStr: 'zyd-face-license-face-android',
				items: [{
					value: 'Eye',
					name: '眨眨眼',
					checked: 'true'
				},
					{
						value: 'Mouth',
						name: '张张嘴',
						checked: 'true'
					},
					{
						value: 'HeadLeft',
						name: '向左转头'
					},
					{
						value: 'HeadRight',
						name: '向右转头'
					},
					{
						value: 'HeadLeftOrRight',
						name: '左右摇头'
					},
					{
						value: 'HeadUp',
						name: '缓慢抬头'
					},
					{
						value: 'HeadDown',
						name: '缓慢低头'
					}
				],
				isLivenessRandom: 0,
				isSound: 1,
				frontBack: 0,
				txtColor: '#3987FD',
				bgColor: '#2F2F33',
				roundColor: '#3987FD',
				zoom: 0.75, //圆圈里的影像有黑边才传，没问题不要传（代码已适配，有些机型没测试到才会有问题），仅ios有效，iPhone0.7,iPad0.9

				src: 'https://wj.zydbai.com/photo.png',
				photographState: true,
				name: '',
				idNum: ''
			}
		},
		onLoad(option) {
			this.name = option.name;
			this.idNum = option.idNum;
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == "ios") {
				//权限
				// this.judgeIosPermission('camera');//相机

				this.licenseIDStr = "longyoung-face-ios";
			} else if (uni.getSystemInfoSync().platform == "android") {
				//权限
				this.requestAndroidPermission('android.permission.CAMERA'); //相机
				this.licenseIDStr = "zyd-face-license-face-android";
			}

			//引用插件
			lyBDFaceAuth = uni.requireNativePlugin('longyoung-BDFaceAuth');
			// #endif
			this.onScanFace();
		},
		methods: {
			//刷脸
			onScanFace() {
				self = this;

				var ary = [];
				for (var i = 0; i < this.items.length; i++) {
					var item = this.items[i];
					if (item.checked) {
						ary[i] = item.value;
					}
				}

				lyBDFaceAuth.scanFace({
					licenseID: this.licenseIDStr, //安卓，iOS后缀不一样
					actionAry: ary, //不传无动作
					isLivenessRandom: this.isLivenessRandom, //不传默认有序，0有序，1随机
					isSound: this.isSound, //不传默认有声音，0无声，1有声，iOS设置无效
					frontBack: this.frontBack, //不传默认前置，0前置，1后置
					txtColor: this.txtColor, //文字颜色
					bgColor: this.bgColor, //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
					roundColor: this.roundColor //圆的颜色
				}, result => {

					// self.imgBase64Str = "data:image/png;base64," + result.bestImgBase64.replace(/[\r\n]/g, ""); //显示图片
					//***不传base64的，看这里，使用 uni.uploadFile()上传服务器，没此需求的可以无视。
					var bitmapT = new plus.nativeObj.Bitmap('test');
					//加载base64图片
					bitmapT.loadBase64Data(result.bestImgBase64, function (res) {
						//保存base64图片
						bitmapT.save("_faceImg/face.png", {}, function (res) {
							bitmapT.clear(); //销毁bitmap对象
							app.basic.getFileUrl(res.target).then(res => {
								var imageUrl = JSON.parse(res.data).data;
								console.log(imageUrl);
								self.src = imageUrl;
								self.photographState = false;
							})
						}, function (res) {
							console.log("longyoung.save.fail=", res);
						});

					}, function (res) {
						console.log("longyoung.fail=", res);
					});
					//***不传base64的，看这里，使用 uni.uploadFile()上传服务器，没此需求的可以无视。

				});
			},

			//权限
			async requestAndroidPermission(permisionID) {
				var result = await permijs.requestAndroidPermission(permisionID);
				var strStatus;
				if (result == 1) {
					strStatus = "已获得授权";
				} else if (result == 0) {
					strStatus = "未获得授权";
					uni.showToast({
						title: "请打开权限，否则无法使用",
						icon: 'none'
					});
				} else {
					strStatus = "被永久拒绝权限";
					permijs.gotoAppPermissionSetting();
					uni.showToast({
						title: '请打开权限，否则无法使用',
						icon: 'none'
					});
				}
				console.log("lygg.strStatus=" + strStatus + ",result=" + result);
			},
			judgeIosPermission: function (permisionID) {
				var result = permijs.judgeIosPermission(permisionID)
				if (result) {
				} else {
					permijs.gotoAppPermissionSetting();
					uni.showToast({
						title: '请打开权限，否则无法使用',
						icon: 'none'
					});
				}
				console.log("lygg.result=" + result);
			},
			//完成实名认证
			insert() {
				var param = {
					idCardFront: this.src,
					idNum: this.idNum,
					name: this.name
				}
				app.basic.getAjaxData(com.common('insertCertification'), param, "POST").then(res => {
					uni.showModal({
						content: '您已完成实名认证,是否去绑定借阅证？',
						success: function (res) {
							//点击“确认”时打开设置页面
							if (res.confirm) {
								uni.reLaunch({
									url: 'binding',
								})
							}
							if (res.cancel) {
								uni.switchTab({
									url: 'my'
								})
							}
						}
					})
				})
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>


<style>
	.cartIpt {
		padding: 10upx 0;
	}

	.photoImgBox {
		width: 100%;
		height: 600upx;
		background: #eee;
		/* margin: 20upx auto; */
		/* border: 1upx dashed #fff; */
		position: relative;
	}

	.peploImg {
		width: 100%;
		height: 250upx;
	}

	.photoImg {
		width: 90%;
		height: 100%;
		margin-left: 5%;
	}

	.mainCom .maxBtn {
		width: 100%;
	}

	.upCardBox image {
		display: block;
		width: 90%;
		height: 370upx;
		margin: 0 auto;
	}

	.upCardHint {
		font-size: 28upx;
		margin-left: 5%;
		padding-top: 20upx;
	}

	.cardInfo {
		color: #6c727c;
		font-size: 24upx;
	}

	.cardInfo>view {
		padding-top: 40upx;
	}

	.photograph {
		background-color: #71AE91;
		color: #fff;
		margin-top: 20upx;
		font-size: 28upx;
	}

	.hintText {
		font-size: 32upx;
		padding-top: 20upx;
	}
</style>
