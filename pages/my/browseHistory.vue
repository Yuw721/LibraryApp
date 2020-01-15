<template>
	<!-- 浏览历史 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">浏览历史</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul" scroll-x>
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item.name }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class="swiper" v-for="(item, index) in tabArr" :key="item.name">
					<view v-if="item.name == '书籍'">
						<view class="warmPrompt" v-if="bookBrowsingHistory && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，您暂无浏览书籍哦。</view>
						</view>
						<view class="flex_l_c" v-if="todayBookBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">今天</view>
						</view>
						<view class="timingItem" v-if="todayBookBrowsingHistory.length > 0">
							<view class="p_b50" v-for="(item, index) in todayBookBrowsingHistory" :key="index">
								<view class="flex_l_t" @click="toBookDet(item.bookrecno)">
									<view class="flex_l_c bookBox"><image :src="item.bookreptile.coverUrl" class="bookImg" mode="aspectFit"></image></view>
									<view class="bookInfo">
										<view class="bookTit omit2">{{ item.title }}</view>
										<view class="authorName omit">作者：{{ item.author }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="flex_l_c" v-if="yesterdayBookBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">昨天</view>
						</view>
						<view class="timingItem" v-if="yesterdayBookBrowsingHistory.length > 0">
							<view class="p_b30" v-for="(item, index) in yesterdayBookBrowsingHistory" :key="index">
								<view class="bookListItem flex_l_t" @click="toBookDet(item.bookrecno)">
									<view class="flex_l_c bookBox"><image :src="item.bookreptile.coverUrl" class="bookImg" mode="aspectFit"></image></view>
									<view class="bookInfo">
										<view class="bookTit omit2">{{ item.title }}</view>
										<view class="authorName omit">作者：{{ item.author }}</view>
									</view>
								</view>
							</view>

							<view class="noMoreHis">没有更多历史了</view>
						</view>
					</view>
					<view v-if="item.name == '书单'">
						<view class="warmPrompt" v-if="bookListBrowsingHistory && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，您暂无浏览书单哦。</view>
						</view>
						<view class="flex_l_c" v-if="todayBookListBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">今天</view>
						</view>
						<view class="timingItem" v-if="todayBookListBrowsingHistory.length > 0">
							<view class="p_b30" v-for="(item, index) in todayBookListBrowsingHistory" :key="index">
								<view class="bookListItem flex_l_t" @click="toBookListDet(item.bookListVO.id)">
									<view class="flex_l_c bookBox">
										<image :src="item.bookListVO.image" class="bookImg" mode="aspectFit"></image>
										<view class="line1"></view>
										<view class="line2"></view>
									</view>
									<view class="flex_c_b bookInfo">
										<view>
											<view class="bookTit omit2">{{ item.bookListVO.name }}</view>
											<view class="flex_l_c">
												<image :src="item.bookListVO.headPortrait" class="authorImg"></image>
												<text class="omit authorName">{{ item.bookListVO.nickname }}</text>
											</view>
										</view>
										<view class="flex_l_c bookNumBox">
											<view class="p_r20 flex_l_c">
												<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
												<text class="m_l10">{{ item.bookListDetail.length }}本书</text>
											</view>
											<view class="flex_l_c">
												<text class="iconfont icon-zan"></text>
												<text class="m_l10">{{ item.bookListVO.collectionSum }}人</text>
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- <view class="noMoreHis">没有更多历史了</view> -->
						</view>
						<view class="flex_l_c" v-if="yesterdayBookListBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">昨天</view>
						</view>
						<view class="timingItem" v-if="yesterdayBookListBrowsingHistory.length > 0">
							<view class="p_b30" v-for="(item, index) in yesterdayBookListBrowsingHistory" :key="index">
								<view class="bookListItem flex_l_t" @click="toBookListDet(item.bookListVO.id)">
									<view class="flex_l_c bookBox">
										<image :src="item.bookListVO.image" class="bookImg" mode="aspectFit"></image>
										<view class="line1"></view>
										<view class="line2"></view>
									</view>
									<view class="flex_c_b bookInfo">
										<view>
											<view class="bookTit omit2">{{ item.bookListVO.name }}</view>
											<view class="flex_l_c">
												<image :src="item.bookListVO.headPortrait" class="authorImg"></image>
												<text class="omit authorName">{{ item.bookListVO.nickname }}</text>
											</view>
										</view>
										<view class="flex_l_c bookNumBox">
											<view class="p_r20 flex_l_c">
												<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
												<text class="m_l10">{{ item.bookListDetail.length }}本书</text>
											</view>
											<view class="flex_l_c">
												<text class="iconfont icon-zan"></text>
												<text class="m_l10">{{ item.bookListVO.collectionSum }}人</text>
											</view>
										</view>
									</view>
								</view>
							</view>

							<view class="noMoreHis">没有更多历史了</view>
						</view>
					</view>

					<view v-if="item.name == '活动'">
						<view class="warmPrompt" v-if="serActivityBasicsHistory && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，您暂无浏览活动哦。</view>
						</view>
						<view class="flex_l_c" v-if="todaySerActivityBasicsBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">今天</view>
						</view>
						<view class="timingItem" v-if="todaySerActivityBasicsBrowsingHistory.length > 0">
							<view class="p_b30">
								<view class="infoItem flex_l_e" v-for="(item, index) in todaySerActivityBasicsBrowsingHistory" :key="index" @click="toActivityDet(item.id)">
									<image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
									<view class="info">
										<view class="omit tit">{{ item.theme }}</view>
										<view>活动时间：{{ item.activityStratTime }}</view>
										<view class="flex_b_e">
											<view>
												已报名人数：
												<text class="mainCol">{{ item.applyNumberPeople }}</text>
											</view>
											<view class="buleBtn">报名</view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="flex_l_c" v-if="yesterdaySerActivityBasicsBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">昨天</view>
						</view>
						<view class="timingItem" v-if="yesterdaySerActivityBasicsBrowsingHistory.length > 0">
							<view class="p_b30">
								<view class="infoItem flex_l_e" v-for="(item, index) in yesterdaySerActivityBasicsBrowsingHistory" :key="index" @click="toActivityDet(item.id)">
									<image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
									<view class="info">
										<view class="omit tit">{{ item.theme }}</view>
										<view>活动时间：{{ item.activityStratTime }}</view>
										<view class="flex_b_e">
											<view>
												已报名人数：
												<text class="mainCol">{{ item.applyNumberPeople }}</text>
											</view>
											<view class="buleBtn">报名</view>
										</view>
									</view>
								</view>
							</view>

							<view class="noMoreHis">没有更多历史了</view>
						</view>
					</view>

					<view v-if="item.name == '视频'">
						<view class="warmPrompt" v-if="voideBasicsHistory && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，您暂无浏览视频哦。</view>
						</view>
						<view class="flex_l_c" v-if="todayVoideBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">今天</view>
						</view>
						<view class="timingItem videoBox" v-if="todayVoideBrowsingHistory.length > 0">
							<view class="twoBox">
								<view v-for="(item, index) in todayVoideBrowsingHistory" :key="index" @click="toVideoDet(item)">
									<view class="videoImgBox">
										<view class="iconfont icon-bofang playIcon"></view>
										<image :src="item.imagepath" class="videoImg"></image>
									</view>
									<view class="omit tit">{{ item.title }} 第 {{ item.lastNumber }} 集</view>
								</view>
							</view>
						</view>

						<view class="flex_l_c" v-if="yesterdayVoideBrowsingHistory.length > 0">
							<view class="dot"></view>
							<view class="timing">昨天</view>
						</view>
						<view class="timingItem videoBox" v-if="yesterdayVoideBrowsingHistory.length > 0">
							<view class="twoBox">
								<view v-for="(item, index) in yesterdayVoideBrowsingHistory" :key="index" @click="toVideoDet(item)">
									<view class="videoImgBox">
										<view class="iconfont icon-bofang playIcon"></view>
										<image
											:src="item.imagepath"
											class="videoImg"
										></image>
									</view>
									<view class="omit tit">{{ item.title }} 第 {{ item.lastNumber }} 集</view>
								</view>
							</view>
							<view class="noMoreHis">没有更多历史了</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			// tab栏
			tabArr: [
				{
					name: '书籍'
				},
				{
					name: '书单'
				},
				{
					name: '活动'
				},
				{
					name: '视频'
				}
			],
			currentIndex: 0, // 选择tab栏下标
			todayBookBrowsingHistory: [],
			yesterdayBookBrowsingHistory: [],
			theDayBeforeYesterdayBookBrowsingHistory: [],
			todayBookListBrowsingHistory: [],
			yesterdayBookListBrowsingHistory: [],
			theDayBeforeYesterdayBookListBrowsingHistory: [],
			bookBrowsingHistory: true,
			bookListBrowsingHistory: true,
			todaySerActivityBasicsBrowsingHistory: [],
			yesterdaySerActivityBasicsBrowsingHistory: [],
			theDayBeforeYesterdaySerActivityBasicsBrowsingHistory: [],
			serActivityBasicsHistory: true,
			todayVoideBrowsingHistory: [],
			yesterdayVoideBrowsingHistory: [],
			theDayBeforeYesterdayVoideBrowsingHistory: [],
			voideBasicsHistory: true,
			loadState: false
		};
	},
	onLoad() {
		// if (this.currentIndex == 0) {
		// 	this.getBookBrowsingHistory('today');
		// 	this.getBookBrowsingHistory('yesterday');
		// 	this.getBookBrowsingHistory('theDayBeforeYesterday');
		// } else if (this.currentIndex == 1) {
		// 	this.getBookListBrowsingHistory('today');
		// 	this.getBookListBrowsingHistory('yesterday');
		// 	this.getBookListBrowsingHistory('theDayBeforeYesterday');
		// }
	},
	onShow() {
		this.tabClick(this.currentIndex);
	},
	methods: {
		// 视频详情
		toVideoDet(item) {
			uni.setStorageSync('videoInfo', item);
			uni.navigateTo({
				url: '../book/video_det?type=2'
			});
		},
		// 活动详情
		toActivityDet(id) {
			uni.navigateTo({
				url: '../index/activity_det?id=' + id
			});
		},
		// 获取书籍浏览历史
		getBookBrowsingHistory(obj) {
			this.loadState = false;
			var param = {
				type: 1,
				date: obj
			};
			app.basic.getAjaxData(com.user('getBookBrowsingHistory'), param, 'GET').then(res => {
				this.loadState = true;
				console.log(res);
				if (res.data.status == true) {
					if (obj == 'today') {
						this.todayBookBrowsingHistory = res.data.data;
					} else if (obj == 'yesterday') {
						this.yesterdayBookBrowsingHistory = res.data.data;
					} else if (obj == 'theDayBeforeYesterday') {
						this.theDayBeforeYesterdayBookBrowsingHistory = res.data.data;
					}
				}
				console.log(this.todayBookBrowsingHistory);
				console.log(this.yesterdayBookBrowsingHistory);
				console.log(this.theDayBeforeYesterdayBookBrowsingHistory);
				if (this.todayBookBrowsingHistory.length > 0 || this.yesterdayBookBrowsingHistory.length > 0) {
					this.bookBrowsingHistory = false;
				}
			});
		},

		getPlayHistory(obj) {
			this.loadState = false;
			var param = {
				date: obj
			};
			app.basic.getAjaxData(com.enquiries('getPlayHistory'), param, 'GET').then(res => {
				this.loadState = true;
				if (res.data.status == true) {
					if (obj == 'today') {
						this.todayVoideBrowsingHistory = res.data.data;
					} else if (obj == 'yesterday') {
						this.yesterdayVoideBrowsingHistory = res.data.data;
					} else if (obj == 'theDayBeforeYesterday') {
						this.theDayBeforeYesterdayVoideBrowsingHistory = res.data.data;
					}
				}
				if (this.todayVoideBrowsingHistory.length > 0 || this.yesterdayVoideBrowsingHistory.length > 0) {
					this.voideBasicsHistory = false;
				}
			});
		},
		// 获取书单浏览历史
		getBookListBrowsingHistory(obj) {
			this.loadState = false;
			var param = {
				type: 2,
				date: obj
			};
			app.basic.getAjaxData(com.user('getBookListBrowsingHistory'), param, 'GET').then(res => {
				this.loadState = true;
				if (res.data.status == true) {
					if (obj == 'today') {
						this.todayBookListBrowsingHistory = res.data.data;
					} else if (obj == 'yesterday') {
						this.yesterdayBookListBrowsingHistory = res.data.data;
					} else if (obj == 'theDayBeforeYesterday') {
						this.theDayBeforeYesterdayBookListBrowsingHistory = res.data.data;
					}
				}
				if (this.todayBookListBrowsingHistory.length > 0 || this.yesterdayBookListBrowsingHistory.length > 0) {
					this.bookListBrowsingHistory = false;
				}
			});
		},

		// 获取活动浏览历史
		getSerActivityBasicsBrowsingHistory(obj) {
			this.loadState = false;
			var param = {
				type: 3,
				date: obj
			};
			app.basic.getAjaxData(com.user('getSerActivityBasicsBrowsingHistory'), param, 'GET').then(res => {
				this.loadState = true;
				if (res.data.status == true) {
					if (obj == 'today') {
						this.todaySerActivityBasicsBrowsingHistory = res.data.data;
					} else if (obj == 'yesterday') {
						this.yesterdaySerActivityBasicsBrowsingHistory = res.data.data;
					} else if (obj == 'theDayBeforeYesterday') {
						this.theDayBeforeYesterdaySerActivityBasicsBrowsingHistory = res.data.data;
					}
				}
				if (this.todaySerActivityBasicsBrowsingHistory.length > 0 || this.yesterdaySerActivityBasicsBrowsingHistory.length > 0) {
					this.serActivityBasicsHistory = false;
				}
			});
		},
		// 书单详情
		toBookListDet(id) {
			uni.navigateTo({
				url: '../book/bookList_det?id=' + id
			});
		},
		// 书籍详情
		toBookDet(bookrecno) {
			uni.navigateTo({
				url: '../book/book_det?id=' + bookrecno
			});
		},
		// 点击tab栏
		tabClick(index) {
			this.currentIndex = index;
			this.browsingHistory = true;
			if (this.currentIndex == 0) {
				this.getBookBrowsingHistory('today');
				this.getBookBrowsingHistory('yesterday');
				// this.getBookBrowsingHistory('theDayBeforeYesterday');
			} else if (this.currentIndex == 1) {
				this.getBookListBrowsingHistory('today');
				this.getBookListBrowsingHistory('yesterday');
				// this.getBookListBrowsingHistory('theDayBeforeYesterday');
			} else if (this.currentIndex == 2) {
				this.getSerActivityBasicsBrowsingHistory('today');
				this.getSerActivityBasicsBrowsingHistory('yesterday');
				// this.getSerActivityBasicsBrowsingHistory('theDayBeforeYesterday')
			} else if (this.currentIndex == 3) {
				this.getPlayHistory('today');
				this.getPlayHistory('yesterday');
				// this.getPlayHistory('theDayBeforeYesterday')
			}
		},
		// tab栏左右滑动
		tabChange(e) {
			this.currentIndex = e.detail.current;
			this.tabClick(this.currentIndex);
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.infoItem {
	margin: 0 auto;
}

.dot {
	width: 20upx;
	height: 20upx;
	border: 4upx solid rgba(51, 51, 51, 1);
	border-radius: 50%;
}

.timing {
	color: #5d6378;
	font-size: 24upx;
	margin-left: 40upx;
	font-weight: bold;
}

.timingItem {
	border-left: 2upx dashed #898989;
	margin-left: 12upx;
	padding: 14px 0 0 22px;
}

.noMoreHis {
	color: #cccccc;
	font-size: 24upx;
	padding-top: 40upx;
}

.bookListItem .authorName {
	width: 360upx;
}

.videoBox .videoImg {
	width: 100%;
	height: 160upx;
}
</style>
