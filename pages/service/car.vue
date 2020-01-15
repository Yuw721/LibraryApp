<template>
	<!-- 停车缴费 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">停车缴费</view>
			</view>
		</view>
		<view class="mainCom">
			<view>
				<view class="srhCar flex_b_c">
					<view class="flex_l_c srhCarIpt" @click="focusIpt">
						<view>
							<text class="keyItem" v-for="(item, index) in srhArr" :key="index">{{ item }}</text>
						</view>
						<view class="cursor" v-if="cursorShow"></view>
					</view>
					<view v-if="srhCarBtnState" class="srhCarBtn" @click="srhCarBtn">查询</view>
					<view v-if="!srhCarBtnState" class="srhCarBtn1">查询</view>
				</view>
				<view class="chargeBox">
					<view class="srhHistory" v-if="srhHistoryShow">
						<view class="b_b" v-for="(item, index) in carNumList" :key="index" @click="srhCarBtnByHistory(item.carNum)" v-if="srhCarBtnState">{{ item.carNum }}</view>
						<view class="b_b" v-for="(item, index) in carNumList" :key="index" v-if="!srhCarBtnState">{{ item.carNum }}</view>
					</view>
					<view>
						<text class="iconfont icon-icon- chargeIcon"></text>
						停车场收费说明：
					</view>
					<view>缴费后请于规定时间离场，离场会自动抬杆。</view>
					<view>如找不到停车信息，请至相关缴费出等缴纳现金。</view>
				</view>
			</view>
			<!-- 牌头键盘 -->
			<view class="brandKey" v-if="brandShow">
				<view class="closeBrand" @click="closeBrand">关闭</view>
				<view class="flex_c_c brandBox">
					<view @click="selBtand('京')">京</view>
					<view @click="selBtand('沪')">沪</view>
					<view @click="selBtand('粤')">粤</view>
					<view @click="selBtand('津')">津</view>
					<view @click="selBtand('冀')">冀</view>
					<view @click="selBtand('豫')">豫</view>
					<view @click="selBtand('云')">云</view>
					<view @click="selBtand('辽')">辽</view>
					<view @click="selBtand('黑')">黑</view>
					<view @click="selBtand('湘')">湘</view>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selBtand('皖')">皖</view>
					<view @click="selBtand('鲁')">鲁</view>
					<view @click="selBtand('新')">新</view>
					<view @click="selBtand('苏')">苏</view>
					<view @click="selBtand('浙')">浙</view>
					<view @click="selBtand('赣')">赣</view>
					<view @click="selBtand('鄂')">鄂</view>
					<view @click="selBtand('桂')">桂</view>
					<view @click="selBtand('甘')">甘</view>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selBtand('晋')">晋</view>
					<view @click="selBtand('蒙')">蒙</view>
					<view @click="selBtand('陕')">陕</view>
					<view @click="selBtand('吉')">吉</view>
					<view @click="selBtand('闽')">闽</view>
					<view @click="selBtand('贵')">贵</view>
					<view @click="selBtand('渝')">渝</view>
					<view @click="selBtand('川')">川</view>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selBtand('青')">青</view>
					<view @click="selBtand('藏')">藏</view>
					<view @click="selBtand('琼')">琼</view>
					<view @click="selBtand('宁')">宁</view>
					<view @click="selBtand('使')">使</view>
					<view class="delBrand" @click="delTxt"><text class="iconfont icon-jianpanshanchu"></text></view>
				</view>
			</view>

			<!-- 数字字母键盘 -->
			<view class="brandKey" v-if="numShow">
				<view class="closeBrand" @click="closeNum">关闭</view>
				<view class="flex_c_c brandBox">
					<button @click="selLetter('1')" :disabled="numDis">1</button>
					<button @click="selLetter('2')" :disabled="numDis">2</button>
					<button @click="selLetter('3')" :disabled="numDis">3</button>
					<button @click="selLetter('4')" :disabled="numDis">4</button>
					<button @click="selLetter('5')" :disabled="numDis">5</button>
					<button @click="selLetter('6')" :disabled="numDis">6</button>
					<button @click="selLetter('7')" :disabled="numDis">7</button>
					<button @click="selLetter('8')" :disabled="numDis">8</button>
					<button @click="selLetter('9')" :disabled="numDis">9</button>
					<button @click="selLetter('0')" :disabled="numDis">0</button>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selLetter('Q')">Q</view>
					<view @click="selLetter('W')">W</view>
					<view @click="selLetter('E')">E</view>
					<view @click="selLetter('R')">R</view>
					<view @click="selLetter('T')">T</view>
					<view @click="selLetter('Y')">Y</view>
					<view @click="selLetter('U')">U</view>
					<view @click="selLetter('O')">O</view>
					<view @click="selLetter('P')">P</view>
					<view @click="selLetter('A')">A</view>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selLetter('S')">S</view>
					<view @click="selLetter('D')">D</view>
					<view @click="selLetter('F')">F</view>
					<view @click="selLetter('G')">G</view>
					<view @click="selLetter('H')">H</view>
					<view @click="selLetter('J')">J</view>
					<view @click="selLetter('K')">K</view>
					<view @click="selLetter('L')">L</view>
					<view @click="selLetter('X')">X</view>
					<view @click="selLetter('Z')">Z</view>
				</view>
				<view class="flex_c_c brandBox">
					<view @click="selLetter('C')">C</view>
					<view @click="selLetter('V')">V</view>
					<view @click="selLetter('B')">B</view>
					<view @click="selLetter('N')">N</view>
					<view @click="selLetter('M')">M</view>
					<button @click="selLetter('港')" :disabled="otherDis">港</button>
					<button @click="selLetter('澳')" :disabled="otherDis">澳</button>
					<button @click="selLetter('学')" :disabled="otherDis">学</button>
					<view class="delBrand" @click="delTxt"><text class="iconfont icon-jianpanshanchu"></text></view>
				</view>
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
			brandShow: false,
			numShow: false,
			cursorShow: false,
			srhArr: ['输入车牌查询停车费'],
			numDis: true,
			otherDis: true,
			carNum: '',
			srhHistoryShow: false,
			carNumList: [],
			srhCarBtnState: true
		};
	},
	onLoad(option) {},
	methods: {
		// 查询
		srhCarBtn() {
			console.log(this.srhArr);
			if (this.srhArr.length == 0 || this.srhArr[0] == '输入车牌查询停车费') {
				uni.showToast({
					title: '请输入车牌号',
					icon: 'none'
				});
				return;
			} else if (this.srhArr.length < 7) {
				uni.showToast({
					title: '车牌号格式错误',
					icon: 'none'
				});
				return;
			} else {
				this.srhCarBtnState = false;
				this.carNum = this.srhArr.join('');
				var param = {
					plateNo: this.carNum,
					type: 0
				};
				app.basic.getAjaxData(com.payment('getParkingPaymentInfo'), param, 'POST').then(res => {
					this.srhCarBtnState = true;
					if (res.data.status == true) {
						uni.setStorageSync('payCarNum', this.carNum);
						uni.setStorageSync('parkingPaymentInfo', res.data.data);
						uni.navigateTo({
							url: 'carPay'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				});
			}
		},

		srhCarBtnByHistory(obj) {
			var str = [];
			for (var i = 0; i < obj.length; i++) {
				str.push(obj[i]);
			}
			this.srhCarBtnState = false;
			this.carNum = obj;
			this.srhArr = str;
			console.log(this.srhArr);
			console.log(this.carNum);
			var param = {
				plateNo: this.carNum,
				type: 1
			};
			console.log(param);
			app.basic.getAjaxData(com.payment('getParkingPaymentInfo'), param, 'POST').then(res => {
				this.srhCarBtnState = true;
				if (res.data.status == true) {
					uni.setStorageSync('payCarNum', this.carNum);
					uni.setStorageSync('parkingPaymentInfo', res.data.data);
					uni.navigateTo({
						url: 'carPay'
					});
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},
		// 获取点击字母值
		selLetter: function(text) {
			var txt = text;
			this.numDis = false;
			let lastTxt = this.srhArr[this.srhArr.length - 1];
			if (this.srhArr.length < 8 && lastTxt != '港' && lastTxt != '澳' && lastTxt != '学') {
				var arr = this.srhArr;
				arr.push(txt);
				this.srhArr = arr;
			}
			if (this.srhArr.length >= 6) {
				this.otherDis = false;
			}
			console.log(this.srhArr);
		},
		// 删除输入文字
		delTxt() {
			var arr = this.srhArr;
			arr.pop();
			this.srhArr = arr;
			console.log(this.srhArr.length);
			if (this.srhArr.length < 1) {
				this.brandShow = true;
				this.numShow = false;
			}
			if (this.srhArr.length <= 5) {
				this.otherDis = true;
			}
			if (this.srhArr.length <= 1) {
				this.numDis = true;
			}
		},
		// 获取点击牌头值
		selBtand(text) {
			var arr = this.srhArr;
			arr.push(text);
			this.srhArr = arr;
			this.brandShow = false;
			this.numShow = true;
			console.log(this.srhArr);
		},
		// 关闭牌头键盘
		closeBrand() {
			this.brandShow = false;
		},
		// 关闭数字字母键盘
		closeNum() {
			this.numShow = false;
		},
		// 输入框聚焦
		focusIpt() {
			this.cursorShow = true;
			this.srhArr = [];
			if (!this.brandShow && !this.numShow) {
				this.brandShow = true;
				this.numShow = false;
			} else if (this.numShow && !this.brandShow) {
				this.numShow = true;
				this.brandShow = false;
			}
			this.getSerCarNum();
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},

		// 获取历史输入车牌
		getSerCarNum() {
			app.basic.getAjaxData(com.payment('getSerCarNum'), 'GET').then(res => {
				if (res.data.status == true) {
					this.carNumList = res.data.data;
					if (this.carNumList.length > 0) {
						this.srhHistoryShow = true;
					}
				}
			});
		}
	}
};
</script>

<style>
.srhCar {
	width: 100%;
	background: #f8fafd;
	margin-top: 150upx;
	border-radius: 44upx;
	font-size: 28upx;
}

.cursor {
	width: 3upx;
	height: 30upx;
	background-color: #197cb7;
	animation: focus 1s infinite;
	margin-left: 10upx;
}

/* 光标动画 */
@keyframes focus {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}

.keyItem {
	padding: 0 5upx;
}

.srhCarIpt {
	width: 70%;
	color: #aaaaab;
	padding: 10upx 20upx;
}

.srhCarBtn {
	width: 30%;
	text-align: center;
	border-radius: 44upx;
	background: #197cb7;
	color: #fff;
	padding: 16upx 0;
}

.srhCarBtn1 {
	width: 30%;
	text-align: center;
	border-radius: 44upx;
	background: #aaaaab;
	color: #fff;
	padding: 16upx 0;
}

.chargeBox {
	position: relative;
	font-size: 24upx;
	color: #bebebe;
	padding: 20upx;
	line-height: 50upx;
}

.srhHistory {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
}

.srhHistory > view {
	padding: 20upx;
	font-size: 28upx;
	color: #aaaaab;
}

.chargeIcon {
	color: #197cb7;
}

.brandKey {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.closeBrand {
	background: #fff;
	text-align: right;
	color: #197cb7;
	padding: 10upx 30upx;
	font-size: 30upx;
}

.brandBox {
	background: #e1e3e7;
}

.brandBox > view {
	background: #fff;
	width: 60upx;
	text-align: center;
	line-height: 90upx;
	margin: 10upx 6upx;
	box-shadow: 0 4upx 4upx #d7d7d7;
	border-radius: 10upx;
}

.brandBox > button {
	width: 60upx;
	line-height: 90upx;
	margin: 10upx 6upx;
	padding: 0;
	background: #fff;
}

.brandBox .delBrand {
	width: 90upx;
	background: #c4c8cf;
}
</style>
