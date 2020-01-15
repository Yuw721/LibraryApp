<template>
	<!-- 书单详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_l_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
			</view>
		</view>
		<view id="bookList_det" class="mainCom">
			<view class="top">
				<view class="bookListItem flex_l_c">
					<view class="flex_l_c bookBox">
						<image :src="bookListInfo.bookListVO.image" class="bookImg" mode='aspectFit'></image>
						<view class="line1"></view>
						<view class="line2"></view>
					</view>
					<view class="bookInfo">
						<view>
							<view class="bookTit">{{bookListInfo.bookListVO.name}}</view>
							<view class="flex_b_c">
								<view class="flex_l_c">
									<image :src="bookListInfo.bookListVO.headPortrait" class="authorImg"></image>
									<text class="authorName">{{bookListInfo.bookListVO.nickname}}</text>
								</view>
                                <!-- <view class="seeNum">1514人看过</view> -->
							</view>
						</view>
						<!-- 自己创建的书单 -->
						<view class="flex_l_c btnBox" v-if="bookListInfo.bookListVO.userId == id">
							<view class="delBtn" @click="deleteBookList">
								<text class="iconfont icon-shanchu"></text>
								<text>删除</text>
							</view>
						</view>
						<!-- 别人的书单 -->
						<view class="flex_l_c btnBox" v-else>
							<view @click="collection">
								<text class="iconfont icon-like-b" :class="bookListInfo.bookListVO.collectionCount==0?'':'redCol'"></text>
								<text>点赞 {{bookListInfo.bookListVO.collectionSum}}</text>
							</view>
							<view @click="follows">
								<text class="iconfont icon-xinheart280" :class="bookListInfo.bookListVO.followCount==0?'':'redCol'"></text>
								<text>收藏 {{bookListInfo.bookListVO.followSum}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="listBox">
				<view class="flex_l_c" v-for="(bookItem,index) in bookListInfo.bookListDetail" :key="bookItem.id" @click="toBookDet(bookItem.bookId)">
					<image :src="bookItem.bookImage" class="bookImg" mode="aspectFill"></image>
					<view class="flex_c_b bookInfo">
						<view class="omit2 tit">{{bookItem.bookName}}</view>
						<view class="info">
							<view class="omit" v-if="bookItem.author!=null">作者: {{bookItem.author}}</view>
							<view class="omit" v-if="bookItem.pubdate!=null">出版日期：{{bookItem.pubdate}}</view>
							<view class="omit" v-if="bookItem.publisher!=null">出版社: {{bookItem.publisher}}</view>
						</view>
					</view>
					<view class="iconfont icon-shenglvehao iocn" @click.stop="operation(index)" v-if="bookListInfo.bookListVO.userId == id"></view>
					<view class="removBtn" v-if="currentIndex === index" @click.stop="removList(index)">移出书单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				bookListId: '',
				bookListInfo: {},
				currentIndex: ''
			}
		},
		computed: {
			...mapState(['id'])
		},
		onLoad(option) {
			this.bookListId = option.id;
			this.getBookListInfo();
		},
		methods: {
			// 移出书单
			removList(index) {
				var param = {
					id: this.bookListInfo.bookListDetail[index].id
				}
				app.basic.getAjaxData(com.enquiries('deleteBookListDetail'), param, "GET").then(res => {
					this.getBookListInfo();
				})
			},
			// 操作
			operation(index) {
				if (this.currentIndex === '') {
					this.currentIndex = index;
				} else {
					this.currentIndex = '';
				}
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取书单详细信息
			getBookListInfo() {
				var param = {
					id: this.bookListId
				}
				app.basic.getAjaxData(com.enquiries('getBookListInfo'), param, "GET").then(res => {
					this.bookListInfo = res.data.data;
				})
			},
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
					url: 'book_det?id=' + id
				})
			},
			//删除书单
			deleteBookList() {
				var that = this;
				uni.showModal({
					content: "确定删除此书单吗",
					success: (res) => {
						if (res.confirm) {
							var param = {
								id: this.bookListId
							}
							app.basic.getAjaxData(com.enquiries('deleteBookList'), param, "GET").then(res => {
								that.backBtn();
							})
						}
					}
				})
			},
			collection() {
				if (this.bookListInfo.bookListVO.collectionCount === 0) {
					this.collect();
				} else {
					this.removecollect();
				}
			},
			//点赞
			collect() {
				var param = {
					listId: this.bookListId,
				};
				app.basic.getAjaxData(com.enquiries('updateBookListCollection'), param, "GET").then(res => {
					this.bookListInfo.bookListVO.collectionCount = 1;
					this.bookListInfo.bookListVO.collectionSum++;
				})
			},
			//取消点赞
			removecollect() {
				var param = {
					listId: this.bookListId,
				};
				app.basic.getAjaxData(com.enquiries('updateBookListNoCollection'), param, "GET").then(res => {
					this.bookListInfo.bookListVO.collectionCount = 0;
					this.bookListInfo.bookListVO.collectionSum--;
				})
			},
			follows() {
				if (this.bookListInfo.bookListVO.followCount === 0) {
					this.follow();
				} else {
					this.removefollow();
				}
			},
			//收藏
			follow() {
				var param = {
					listId: this.bookListId,
				};
				app.basic.getAjaxData(com.enquiries('updateBookListFollow'), param, "GET").then(res => {
					this.bookListInfo.bookListVO.followCount = 1;
					this.bookListInfo.bookListVO.followSum++;
				})
			},
			//取消收藏
			removefollow() {
				var param = {
					listId: this.bookListId,
				};
				app.basic.getAjaxData(com.enquiries('updateBookListNoFollow'), param, "GET").then(res => {
					this.bookListInfo.bookListVO.followCount = 0;
					this.bookListInfo.bookListVO.followSum--;
				})
			},
		}
	}
</script>


<style>
	.mainCom {
		width: 100%;
	}
</style>
