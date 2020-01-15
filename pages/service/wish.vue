<template>
	<!-- 心愿单 -->
	<view id="bookDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">心愿单</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="flex_l_c">
				<image :src="dangBookInfo.img" mode="aspectFill" class="coverImg"></image>
				<view class="bookInfoBox">
					<view class="tit">{{ dangBookInfo.title }}</view>
					<view v-if="dangBookInfo.author != null">作者: {{ dangBookInfo.author }}</view>
					<view v-if="dangBookInfo.publish != null">出版日期：{{ dangBookInfo.publish }}</view>
					<view v-if="dangBookInfo.publishDate != null">出版社: {{ dangBookInfo.publishDate }}</view>
				</view>
			</view>
			<view class="hintText" v-if="dangBookInfo.detail != null">
				<text class="mainCol">简介:</text>

				<view class="synopsisBox" :class="iconShow && dangBookInfo.detail.length >= 100 ? 'omit3' : ''"><rich-text :nodes="dangBookInfo.detail"></rich-text></view>

				<view v-if="iconShow && dangBookInfo.detail.length >= 100" @click="showHead" class="seeAll flex_c_c">
					查看全部
					<text class="iconfont icon-xiangxia"></text>
				</view>

				<view v-if="!iconShow && dangBookInfo.detail.length >= 100" @click="showHead" class="seeAll flex_c_c">
					收起
					<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
			<view class="reasonBox">
				<view class="reasonItemTit">推荐理由：</view>
				<view class="reasonItemBox">
					<view :class="item.state == 1 ? 'reasonItemAct' : ''" :key="index" v-for="(item, index) in reasonList" @click="selectReason(index, item.name)">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		<view class="botBox flex_c_c"><view class="maxBtn" @click="submit">提交</view></view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			dangBookInfo: null,
			iconShow: true,
			reasonList: [],
			reasonArr: [],
			photo: []
		};
	},
	onLoad(option) {
		this.dangBookInfo = uni.getStorageSync('dangBookInfo');
		this.getSysReason();
	},
	methods: {
		//提交
		submit() {
			this.photo.push(this.dangBookInfo.img);
			console.log(this.photo);
			var serWishListDTO = {
				bookName: this.dangBookInfo.title,
				description: this.dangBookInfo.detail,
				author: this.dangBookInfo.author,
				publish: this.dangBookInfo.publish,
				publishDate: this.dangBookInfo.publishDate,
				isbn: this.dangBookInfo.isbn,
				price: this.dangBookInfo.price,
				productUrl: this.dangBookInfo.productUrl,
				reason: this.reasonArr,
				sourceType: 1,
				photo: this.photo
			};
			app.basic.getAjaxData(com.enquiries('savSerWishList'), serWishListDTO, 'POST').then(res => {
				if (res.data.status == true) {
					uni.showToast({
						title: '推荐成功',
						icon: 'success',
						duration: 2000,
						success() {
							setTimeout(function() {
								uni.navigateTo({
									url: 'bookSub'
								});
							}, 2000);
						}
					});
				}
			});
		},
		//选择日期后加样式
		selectReason: function(index, name) {
			this.reasonArr = [];
			if (this.reasonList[index].state == 1) {
				this.reasonList[index].state = 0;
			} else if (this.reasonList[index].state == 0) {
				this.reasonList[index].state = 1;
			}
			for (var i = 0; i < this.reasonList.length; i++) {
				if (this.reasonList[i].state == 1) {
					this.reasonArr.push(this.reasonList[i].name);
				}
			}
			this.reasonList = this.reasonList;
			console.log(this.reasonArr);
		},

		getSysReason() {
			app.basic.getAjaxData(com.enquiries('getSysReasonByState'), 'GET').then(res => {
				if (res.data.status == true) {
					this.reasonList = res.data.data;
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.msg,
						duration: 5000
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
		}
	}
};
</script>

<style>
.mainCom {
	width: 100%;
	padding-bottom: 180upx;
}

.hintText {
	color: #979797;
	font-size: 24rpx;
	padding: 40upx;
}

#bookDet .synopsisBox {
	width: 100%;
}

.reasonItemTit {
	color: #000000;
	font-size: 34rpx;
	padding: 22rpx 0 14rpx;
}

.reasonItemBox > view {
	display: inline-block;
	background: #f8f8f8;
	color: #666666;
	padding: 30rpx;
	margin: 20rpx 20rpx 0 0;
	font-size: 32rpx;
}

.reasonItemBox .reasonItemAct {
	background: #197cb7;
	color: #ffffff;
}

.reasonBox {
	padding: 40upx;
}
</style>
