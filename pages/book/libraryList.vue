<template>
	<!-- 书库列表 -->
	<view class="libraryList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_l_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书库列表</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul b_b" scroll-x>
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{item.name}}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item v-for="(item, index) in tabArr" :key="item.name" class="swiper">
					<view class="p_b30 p_t30">
						<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
							<view class="p_b30" v-for="(itemC, indexC) in bookList" :key="indexC">
								<view class="bookListItem flex_l_t" @click="toBookDet(itemC.bookrecno)">
									<view class="flex_l_c bookBox">
										<view class="bookImgBox">
											<image :src="itemC.coverUrl" class="bookImg" mode='aspectFit'></image>
										</view>
									</view>
									<view class="bookInfo">
										<view class="bookTit omit2">{{itemC.title}}</view>
										<view class="authorName omit" v-if="itemC.author!='null'">作者：{{itemC.author}}</view>
										<view class="authorName omit" v-if="itemC.publisher!='null'">出版社：{{itemC.publisher}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
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
				tabArr: [],
				currentIndex: 0, // 选择tab栏下标
				id: '',
				towCategoryName: '',
				pageCurrent: 1,
				pageSize: 10,
				bookList: [],
				hasMoreData: false
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.listTowCategory();
		},
		methods: {
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
					url: 'book_det?id=' + id
				})
			},
			// 点击tab栏
			tabClick(index) {
				this.currentIndex = index;
				this.pageCurrent = 1;
				this.bookList = [];
				this.towCategoryName = this.tabArr[index].name;
				this.getTowcategoryBook();
			},
			// tab栏左右滑动
			tabChange(e) {
				this.currentIndex = e.detail.current;
				this.pageCurrent = 1;
				this.bookList = [];
				this.towCategoryName = this.tabArr[e.detail.current].name;
				this.getTowcategoryBook();
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取二级菜单
			listTowCategory() {
				var obj = {
					id: this.id
				}
				app.basic.getAjaxData(com.enquiries('listTowCategory'), obj, "GET").then(res => {
					this.tabArr = res.data.data;
					this.towCategoryName = res.data.data[0].name;
					this.getTowcategoryBook();
				})
			},
			getTowcategoryBook() {
				var param = {
					pageCurrent: this.pageCurrent,
					pageSize: this.pageSize,
					condition: this.towCategoryName
				}
				app.basic.getAjaxData(com.enquiries('listTowCategoryBook'), param, "POST").then(res => {
					var allBook = res.data.data.records;
					if (allBook.length < this.pageSize) {
						if (allBook.length === 0) {
							wx.showToast({
								icon: "none",
								title: '暂无相关内容'
							});
						} else {
							this.bookList = this.bookList.concat(allBook);
						}
						this.hasMoreData = false;
					} else {
						this.bookList = this.bookList.concat(allBook);
						this.hasMoreData = true;
						this.pageCurrent = this.pageCurrent + 1;
					}
				})
			},
			//分页信息
			scrollView() {
				if (this.hasMoreData) {
					this.getTowcategoryBook();
				} else {
					uni.showToast({
						icon: 'none',
						title: '没有更多数据'
					});
				}
			},
		}
	}
</script>

<style>
</style>
