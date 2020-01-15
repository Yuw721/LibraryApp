<template>
	<!-- 预约确认 -->
	<view id="bookDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">预约确认</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="b_b topBox">
				<view class="topTit">{{ userInfo.rdname }}，您好。您预约的书籍为：</view>
				<view class="flex_l_c">
					<image :src="orderBookInfo.image" mode="aspectFill" class="coverImg"></image>
					<view class="bookInfoBox">
						<view class="tit">{{ orderBookInfo.title }}</view>
						<view>作者: {{ orderBookInfo.author == null ? '无' : orderBookInfo.author }}</view>
						<view>出版社: {{ orderBookInfo.publisher == null ? '无' : orderBookInfo.publisher }}</view>
						<!-- <view class='subInfo'>
							<view class='mainCol'>当前预约号已到10号</view>
							<view class='subBtn'>您的预约号：18号</view>
						</view> -->
					</view>
				</view>
				<view class="hintText" v-if="orderBookInfo.introductio != null">
					<text class="mainCol">简介:</text>

					<view class="synopsisBox" :class="iconShow && orderBookInfo.introductio.length >= 100 ? 'omit3' : ''">
						<rich-text :nodes="orderBookInfo.introductio"></rich-text>
					</view>

					<view v-if="iconShow && orderBookInfo.introductio.length >= 100" @click="showHead" class="seeAll flex_c_c">
						查看全部
						<text class="iconfont icon-xiangxia"></text>
					</view>

					<view v-if="!iconShow && orderBookInfo.introductio.length >= 100" @click="showHead" class="seeAll flex_c_c">
						收起
						<text class="iconfont icon-xiangshang"></text>
					</view>
				</view>
				<view class="hintText b_b">
					<text class="mainCol">温馨提示：</text>
					每人仅限预约一本书籍。多人预约同一本书，预约的顺序按先后排列，第一预约人先借，依次类推。
				</view>
				<view class="mainCol affiemTxt" v-if="cout == 0">您是否确认预约《{{ orderBookInfo.title }}》？</view>
			</view>
		</view>
		<view class="botBox flex_c_c" v-if="cout == 0">
			<view class="closeBtn" @click="backBtn">取消</view>
			<view class="agreeBtn" @click="bookSubmit(orderBookInfo)" v-if="!loadState">确认提交</view>
			<view class="agreeBtn" v-if="loadState">确认提交</view>
		</view>

		<view class="botBox flex_c_c" v-if="cout > 0">
			<view class="closeBtn" @click="backBtn">取消</view>
			<view class="agreeBtn" @click="cancel(orderBookInfo)" v-if="!loadState">取消预约</view>
			<view class="agreeBtn" v-if="loadState">取消预约</view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			loadState: false,
			iconShow: true,
			orderBookInfo: null,
			userInfo: null,
			cout: 0
		};
	},
	onLoad(option) {
		this.orderBookInfo = uni.getStorageSync('orderBookInfo');
		this.userInfo = uni.getStorageSync('searchOrderuserInfo');
		this.getResCount();
	},
	methods: {
		// 确认提交
		bookSubmit(obj) {
			this.loadState = true;
			var that = this;
			var registerReserve = {
				barcode: obj.barcode
			};
			app.basic.getAjaxData(com.enquiries('registerreserve'), registerReserve, 'POST').then(res => {
				this.loadState = false;
				if (res.data.status) {
					uni.setStorageSync('bookSersubmitInfo', obj);
					uni.setStorageSync('resBookSersubmInfo', res.data.data[0]);

					uni.navigateTo({
						url: 'subSucceed'
					});
				} else {
					uni.showToast({
						title: res.data.data[0].message,
						icon: 'none'
					});
				}
			});
		},
		// 内容显示隐藏
		showHead: function() {
			if (this.iconShow) {
				this.iconShow = false;
			} else {
				this.iconShow = true;
			}
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		getResCount() {
			var param = {
				barcode: this.orderBookInfo.barcode
			};
			app.basic.getAjaxData(com.query('getResCount'), param, 'GET').then(res => {
				if (res.data.status) {
					this.cout = res.data.data;
				}
			});
		},

		// 取消预约
		cancel(obj) {
			var that = this;
			// 给出确认提示框
			uni.showModal({
				title: '提示',
				content: '确定要取消预约这本书吗？',
				confirmColor: '#71AE91',
				success: function(res) {
					// wx.showLoading({
					//   title: '请稍后...',
					// })
					if (res.confirm) {
						that.loadState = true;
						var cancelreserve = {
							rdid: that.userInfo.rdid,
							barcode: obj.barcode
						};
						app.basic.getAjaxData(com.enquiries('cancelreserve'), cancelreserve, 'POST').then(res => {
							that.loadState = false;
							if (res.data.status) {
								uni.showToast({
									title: res.data.data[0].message,
									icon: 'success',
									duration: 2000,
									success: function() {
										setTimeout(function() {
											//要延时执行的代码
											uni.navigateBack({
												delta: 1
											});
										}, 2000); //延迟时间
									}
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.mainCom {
	padding-bottom: 180upx;
}
.topTit {
	color: #333333;
	font-weight: bold;
	font-size: 30rpx;
	padding: 30rpx 0 0;
}

.subInfo {
	text-align: center;
	font-size: 28rpx;
	padding-top: 10upx;
	font-weight: bold;
}

.subBtn {
	width: 100%;
	color: #fff;
	background: #197cb7;
	border-radius: 96rpx;
	padding: 14rpx 0;
	margin-top: 14upx;
	font-weight: 400;
}

.hintText {
	color: #979797;
	font-size: 24rpx;
	padding: 10px 0;
}

#bookDet .synopsisBox {
	width: 100%;
}

#bookDet .seeAll {
	padding: 10upx 0;
}
.affiemTxt {
	font-size: 28upx;
	padding-top: 30upx;
}
</style>
