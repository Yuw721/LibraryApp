<template>
	<!-- 书库检索 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书库检索</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="warm stackRoomHint">已为您在互联网书库找到以下类似书籍，您可以推荐到图书馆，将有神秘小礼物送到您哦。</view>
				<view class="infoItem flex_l_e" v-for="(item, index) in dangBook" :key="index" @click="recommend(item)">
					<image :src="item.img" class="bookImg"></image>
					<view class="info">
						<view class="omit tit">{{ item.title }}</view>
						<view class="flex_b_e">
							<view class="omit2 press">简介: {{ item.detail ? item.detail : '无' }}</view>
							<view class="buleBtn">推荐</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			title: '',
			pageIndex: 1,
			list: [],
			result: true,
			dangBook: [],
			hasMoreData: true
		};
	},
	onLoad(option) {
		this.title = option.searchText;
		this.getBookByDangDang();
	},
	methods: {
		getBookByDangDang() {
			var searchDangBookDTO = {
				title: this.title,
				pageIndex: this.pageIndex
			};
			app.basic.getAjaxData(com.enquiries('getBookByDangDang'), searchDangBookDTO, 'POST').then(res => {
				if (res.data.status == true) {
					if (res.data.data.length == 0) {
						this.result = false;
					} else {
						var list = res.data.data;
						if (list.length < this.pageIndex) {
							if (list.length == 0) {
								uni.showToast({
									icon: 'none',
									title: '没有更多数据'
								});
							} else {
								this.dangBook = this.dangBook.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.dangBook = this.dangBook.concat(list);
							this.hasMoreData = true;
							this.pageIndex = this.pageIndex + 1;
						}
					}
				}
			});
		},
		// 推荐
		recommend(obj) {
			uni.setStorageSync('dangBookInfo', obj)
			uni.navigateTo({
				url: 'wish'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getBookByDangDang();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据'
				});
			}
		}
	}
};
</script>

<style>
.stackRoomHint {
	line-height: 44upx;
	font-size: 26upx;
	color: #a6a6a6;
	background: #f3f3f4;
	padding: 23rpx;
}

.mainCom {
	width: 100%;
}

.infoItem {
	width: 82%;
}
</style>
