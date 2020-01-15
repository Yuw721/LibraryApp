<template>
	<!-- 我的收藏 -->
	<view class="taskList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">我的收藏</view>
			</view>
		</view>
		<view class="mainCom" id="bookList_det">
			<scroll-view class="scroll-ul b_t">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class="swiper" v-for="(item, index) in tabArr" :key="item">
					<view v-if='item == "书籍"'>
						<view class="warmPrompt" v-if="readList.length <= 0">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无收藏书籍哦。</view>
						</view>
						<view class="listBox">
							<view class="flex_l_c" v-for="(item,index) in readList" :key="index" @click="toBookDet(item.bookrecno)">
								<image :src="item.coverUrl?item.coverUrl:'https://wj.zydbai.com/zwt.png'" class="bookImg" mode="aspectFill"></image>
								<view class="flex_c_b bookInfo">
									<view class="omit2 tit">{{item.title}}</view>
									<view class="info">
										<view class="omit" v-if="item.author!='null'">作者: {{item.author}}</view>
										<view class="omit" v-if="item.publisher!='null'">出版社: {{item.publisher}}</view>
									</view>
								</view>
								<view class="iconfont icon-shenglvehao iocn" @click.stop="operation(index,0)"></view>
								<view class="removBtn" v-if="readIndex === index" @click.stop="removBook(index)">取消收藏</view>
							</view>
						</view>
					</view>
					<view v-if='item == "活动"'>
						<view class="warmPrompt" v-if="activityList.length <= 0">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无收藏活动哦。</view>
						</view>
						<view class='activityItem' @click="toActivityDet(item.id)" v-for="(item,index) in activityList" :key="index">
							<view class='omit2 tit'>{{item.theme}}</view>
							<view class="flex_b_c">
								<view>
									<view>活动时间：{{item.activityStratTime}}</view>
									<view>已报名人数：{{item.applyNumberPeople}}</view>
								</view>
								<view class="iconfont icon-shenglvehao iocn" @click.stop="operation(index,1)"></view>
								<view class="removBtn" v-if="activityIndex === index" @click.stop="removActivity(index)">取消收藏</view>
							</view>
						</view>
					</view>
					<view v-if='item == "书单"'>
						<view class="warmPrompt" v-if="bookList.length <= 0">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无收藏书单哦。</view>
						</view>
						<view class="m_t30 m_b30" v-for="(item,index) in bookList" v-bind:key='index'>
							<view class="bookListItem flex_l_t" @click="toBookListDet(item.id)">
								<view class="flex_l_c bookBox">
									<image :src="item.image" class="bookImg" mode='aspectFit'></image>
									<view class="line1"></view>
									<view class="line2"></view>
								</view>
								<view class="flex_c_b bookInfo">
									<view>
										<view class="bookTit omit2">{{item.name}}</view>
										<view class="flex_l_c">
											<image :src="item.headPortrait" class="authorImg"></image>
											<text class="omit authorName">{{item.nickname}}</text>
										</view>
									</view>
									<view class="flex_l_c bookNumBox">
										<view class="p_r20 flex_l_c">
											<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
											<text class="m_l10">{{item.bookSize}}本书</text>
										</view>
										<view class="flex_l_c">
											<text class="iconfont icon-zan"></text>
											<text class="m_l10">{{item.collectionCount}}人</text>
										</view>
									</view>
								</view>
								<view class="iconfont icon-shenglvehao iocn" @click.stop="operation(index,2)"></view>
								<view class="removBtn" v-if="bookIndex === index" @click.stop="removRead(index)">取消收藏</view>

							</view>
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
				tabArr: ['书籍', '活动', '书单'],
				currentIndex: 0, // 选择tab栏下标
				activityList: [],
				bookList: [],
				readList: [],
				bookIndex: '',
				activityIndex: '',
				readIndex: '',
			};
		},
		onLoad() {

		},
		onShow() {
			this.listMyActivity();
			this.listBookCollection();
			this.getFollowBookList();
		},
		methods: {
			// 取消收藏书籍
			removBook(index) {
				var param = {
					id: this.readList[index].id
				};
				app.basic.getAjaxData(com.user('deleteBookCollection'), param, "GET").then(res => {
					this.listBookCollection();
				})
			},
			// 取消收藏活动
			removActivity(index) {
				var param = {
					id: this.activityList[index].id
				};
				app.basic.getAjaxData(com.activity('collect'), param, "GET").then(res => {
					this.listMyActivity();
				})
			},
			// 取消收藏书单
			removRead(index) {
				var param = {
					listId: this.bookList[index].id,
				};
				app.basic.getAjaxData(com.enquiries('updateBookListNoFollow'), param, "GET").then(res => {
					this.getFollowBookList();
				})
			},
			// 操作
			operation(index, type) {
				if (type == 0) {
					if (this.readIndex === '') {
						this.readIndex = index;
					} else {
						this.readIndex = '';
					}
				} else if (type == 1) {
					if (this.activityIndex === '') {
						this.activityIndex = index;
					} else {
						this.activityIndex = '';
					}
				} else if (type == 2) {
					if (this.bookIndex === '') {
						this.bookIndex = index;
					} else {
						this.bookIndex = '';
					}
				}
			},
			// 书单详情
			toBookListDet(id) {
				uni.navigateTo({
					url: '../book/bookList_det?id=' + id
				});
			},
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
					url: '../book/book_det?id=' + id
				})
			},
			// 活动详情
			toActivityDet(id) {
				uni.navigateTo({
					url: '../index/activity_det?id=' + id
				});
			},
			// 点击tab栏
			tabClick(index) {
				this.bookIndex = '',
					this.activityIndex = '',
					this.readIndex = '',
					this.currentIndex = index;
			},
			// tab栏左右滑动
			tabChange(e) {
				this.bookIndex = '',
					this.activityIndex = '',
					this.readIndex = '',
					this.currentIndex = e.detail.current;
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//活动收藏
			listMyActivity() {
				var param = {
					pageCurrent: 1,
					pageSize: 9999
				}
				app.basic.getAjaxData(com.activity('listMyActivity'), param, "POST").then(res => {
					this.activityList = res.data.data.records;
				})
			},
			//书籍收藏
			listBookCollection() {
				var param = {
					pageCurrent: 1,
					pageSize: 999
				};
				app.basic.getAjaxData(com.user('listBookCollection'), param, "GET").then(res => {
					this.readList = res.data.data.records;
				})
			},
			//书单收藏
			getFollowBookList() {
				app.basic.getAjaxData(com.enquiries('getFollowBookList'), '', "GET").then(res => {
					this.bookList = res.data.data
				})
			},
		}
	};
</script>

<style>
	.taskList .scroll-ul .scroll-li {
		width: 33.33%;
		text-align: center;
		padding: 36upx 0 30upx 0;
	}

	#bookList_det .bookInfo .bookTit {
		color: #5d6378;
		font-size: 28upx;
	}

	#bookList_det .bookListItem .bookInfo {
		padding: 36upx 36upx 36upx 0;
		height: 188upx;
	}

	#bookList_det .iocn {
		position: absolute;
		bottom: 30upx;
		right: 20upx;
		color: #cccccc;
		font-weight: bold;
		font-size: 20px;
		z-index: 2;
	}

	#bookList_det .removBtn {
		right: 8upx;
	}
</style>
