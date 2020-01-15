<template>
	<!-- 首页 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
		</view>
		<view class="mainCom">
			<view class="flex_b_c p_tb40">
				<view>
					<view class="logoName">湖南图书馆</view>
					<view class="slogan">记忆里与好书的美丽邂逅</view>
				</view>
				<view class="flex_r_c">
					<view class="msgBox" @click="toMessageCenter">
						<text class="iconfont icon-xiaoxi"></text>
						<text v-if="count > 0" class="dot"></text>
					</view>
					<view class="iconfont icon-xinbaniconshangchuan-" @click="toSearch"></view>
				</view>
			</view>
			<!-- 轮播图 -->
			<view>
				<swiper class="bannerBox" indicator-dots='true' indicator-active-color='#FFFFFF' v-if='bookrackBanner.length != 0'
				 circular='true' autoplay="true" interval="3000" duration="1000">
					<block v-for="(item, index) in bookrackBanner" :key="index">
						<swiper-item @click="bannerClick(item)">
							<image :src="item.image" class="slide-image">
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- 主按钮 -->
			<view class="p_tb40 flex_b_c indexMune">
				<view v-for="(item,index) in menuList" :key='index' @click="indexFun(item.method)">
					<image :src='item.icon' :class="item.method"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
			<!-- 本周活动预告 -->
			<view class="weekAct flex_b_c" @click="toWeekActivity" v-if="indexActivityList.length>0">
				<view class="info">
					<view class="tit">湖南图书馆本周活动预告</view>
					<view class="omit" v-for="(item,index) in indexActivityList" :key='item.theme'>
						{{index+1}}. {{item.theme}}
					</view>
				</view>
				<view>
					<image :src="indexActivityImage" class="img" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 您可能喜欢 -->
			<view class="p_tb40" v-if="portrayalBook.length>0">
				<view class="flex_b_c plateBox">
					<view class="plateTitBox">
						<view>您可能喜欢</view>
						<view class="plateLine"></view>
					</view>
					<view class="allBtn" @click="toBookList(0)">全部</view>
				</view>
				<view class="threeBox">
					<view @click="toBookDet(item.bookrecno)" v-for="item in portrayalBook" v-bind:key="item.bookrecno">
						<view>
							<image :src="item.bookreptile.coverUrl" mode="aspectFit" class="bookImg"></image>
						</view>
						<view class="omit tit">{{item.title}}</view>
						<view class="omit author" v-if="item.author!=null">{{item.author}}</view>
					</view>
				</view>
			</view>
			<!-- 小编推荐 -->
			<view class="p_tb40">
				<view class="flex_b_c plateBox">
					<view class="plateTitBox">
						<view>小编推荐</view>
						<view class="plateLine"></view>
					</view>
					<view class="allBtn" @click="toBookList(1)">全部</view>
				</view>
				<view class="recommend flex_l_c" @click="toBookDet(bookRecommendation.bookrecno)">
					<view>
						<image :src="bookRecommendation.bookreptile.coverUrl" mode="aspectFit" class="bookImg"></image>
					</view>
					<view class="info">
						<view class="omit tit">{{bookRecommendation.title}}</view>
						<view class="omit3" v-if="bookRecommendation.bookreptile.summary!=null && bookRecommendation.bookreptile.summary!=''">
							书籍简介：<rich-text :nodes="bookRecommendation.bookreptile.summary"></rich-text>
						</view>
						<view class="flex_b_c authorBox">
							<view class="author" v-if="bookRecommendation.author!=null">作者：{{bookRecommendation.author}}</view>
							<!-- <view class="seeBtn">立即查看</view> -->
						</view>
					</view>
				</view>
			</view>
			<!-- 推荐书单 -->
			<view class="p_tb40">
				<view class="flex_b_c m_b30 plateBox">
					<view class="plateTitBox">
						<view>推荐书单</view>
						<view class="plateLine"></view>
					</view>
					<view class="allBtn" @click="getAllBookList()">全部</view>
				</view>
				<view>
					<view class="p_b30" v-for="(item,index) in bookList" v-bind:key='index'>
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
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 榜单 -->
		<view class="crunchies noFixed">
			<view class="p_b30 plateBox">
				<scroll-view class="scroll-ul" scroll-x>
					<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
						<view class="plateTitBox" v-if="index == currentIndex">
							<view>{{item.name}}</view>
							<view class="plateLine"></view>
						</view>
						<view v-if="index != currentIndex">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="crunchiesBox">
				<view v-for="(item, index) in tabArr" :key="item.name" v-if="index == currentIndex" class="crunchiesItem">
					<view class="flex_l_c" v-for="(itemC, indexC) in item.list" :key="itemC.bookName" @click="toBookDet(itemC.bookId)">
						<view class="numBox">
							<image src="../../static/imgs/icon_num1.png" class="numImg" v-if="indexC == 0"></image>
							<image src="../../static/imgs/icon_num2.png" class="numImg" v-if="indexC == 1"></image>
							<image src="../../static/imgs/icon_num3.png" class="numImg" v-if="indexC == 2"></image>
							<view v-if="indexC>2">{{indexC+1}}</view>
						</view>
						<image :src="itemC.bookImage" mode="aspectFit" class="bookImg"></image>
						<view class="info">
							<view class="omit tit">{{itemC.bookName}}</view>
							<view class="omit" v-if="itemC.author!=null">作者：{{itemC.author}}</view>
							<view class="omit" v-if="itemC.pubdate!=null">出版日期：{{itemC.pubdate}}</view>
							<view class="omit" v-if="itemC.publisher!=null">出版社：{{itemC.publisher}}</view>
							<view class="omit" v-if="itemC.typename!=null">文献类型：{{itemC.typename}}</view>
							<view class="omit" v-if="itemC.classno!=null">索书号：{{itemC.classno}}</view>
						</view>
					</view>
					<view class="seeAll" @click="seeList(item.id,item.name)">查看全部榜单</view>
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
				mainCol: app.basic.mainCol, // 主色调
				// banner
				bookrackBanner: [],
				// tab栏
				tabArr: [],
				currentIndex: 0, // 选择tab栏下标
				menuList: [],
				portrayalBook: [],
				bookList: [],
				bookRecommendation: {},
				indexActivityList: [],
				indexActivityImage: null,
				count: 0,
			}
		},
		onLoad() {
			this.getMenuInfo();
			this.getBookRecommendation();
		},
		onShow() {
			this.listPopularBookList();
			this.getPortrayalBook();
			this.listBookListBanner();
			this.listHotListBook();
			this.listIndexActivity();
			this.searchEmailCount();
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			// 消息中心
			toMessageCenter() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'messageCenter'
				})
			},
			// 搜索
			toSearch() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'search'
				})
			},
			// 查看全部榜单
			seeList(id, name) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'listTheList?id=' + id + '&name=' + name
				})
			},
			// 书籍列表
			toBookList(type) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'booksList?type=' + type
				})
			},
			// 本周活动预告
			toWeekActivity() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'week_activity'
				})
			},
			// 书籍详情
			toBookDet(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: '../book/book_det?id=' + id
				})
			},

			// 点击tab栏
			tabClick(index) {
				this.currentIndex = index;
			},

			// 书单详情
			toBookListDet(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: '../book/bookList_det?id=' + id
				});
			},

			//获取首页功能
			getMenuInfo: function() {
				var param = {
					id: 24
				}
				app.basic.getAjaxData(com.common('getMenuInfo'), param, "GET").then(res => {
					this.menuList = res.data.data;
				})
			},
			indexFun(methods) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				if (methods == 'scanQrCode') {
					this.scanQrCode();
				} else if (methods == 'myCode') {
					this.myCode();
				} else if (methods == 'netBookRoom') {
					this.netBookRoom();
				} else if (methods == 'keyRenew') {
					this.keyRenew();
				} else if (methods == 'scan') {
					this.scan();
				}
			},
			// 扫码借书
			scan() {
				uni.navigateTo({
					url: 'sweepCode'
				})
			},
			//扫一扫
			scanQrCode() {
				uni.scanCode({
					success: function(res) {
						var result = res.result;

						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				})
				console.log("扫一扫");
			},
			//免证进馆
			myCode() {
				uni.navigateTo({
					url: 'freeCard'
				})
			},
			//网上书房
			netBookRoom() {
				// #ifdef APP-PLUS
				plus.share.getServices(
					function(res) {
						var sweixin = null;
						for (var i = 0; i < res.length; i++) {
							var t = res[i];
							if (t.id == 'weixin') {
								sweixin = t;
							}
						}
						if (sweixin) {
							sweixin.launchMiniProgram({
								id: 'gh_61425dd75f2d', // 要跳转小程序的原始ID
								// path: 'mine/pages/myInfo/readerCard/readerCard?libcode=hunan&type=externalMinia&ucardno=' + rdid,
							});
						}
					},
					function(res) {
						console.log(JSON.stringify(res));
					}
				);
				// #endif
			},
			//一键续借
			keyRenew() {
				uni.navigateTo({
					url: '../service/renew'
				})
			},
			//推荐书单
			listPopularBookList() {
				app.basic.getAjaxData(com.enquiries('listPopularBookList'), '', "GET").then(res => {
					this.bookList = res.data.data
				})
			},
			//您可能喜欢
			getPortrayalBook() {
				var param = {
					page: 1,
					pageSize: 6,
					size: 10,
					type: 1
				}
				app.basic.getAjaxData(com.bigdata('getPortrayalBook'), param, "GET").then(res => {
					if (res.data.status == true) {
						this.portrayalBook = res.data.data
					}
				})
			},
			//获取首页banner图
			listBookListBanner() {
				var param = {
					displayColumn: 1
				}
				app.basic.getAjaxData(com.enquiries('listBookListBanner'), param, "GET").then(res => {
					this.bookrackBanner = res.data.data;
				})

			},
			//小编推荐
			getBookRecommendation() {
				app.basic.getAjaxData(com.bigdata('getBookRecommendation'), null, "GET").then(res => {
					this.bookRecommendation = res.data.data[0];
				})
			},
			//获取热门榜单
			listHotListBook() {
				app.basic.getAjaxData(com.enquiries('listHotListBook'), null, "GET").then(res => {
					this.tabArr = res.data.data;
				})
			},
			//获取首页本周活动
			listIndexActivity() {
				var param = {
					limit: 3
				}
				app.basic.getAjaxData(com.activity('listIndexActivity'), param, "GET").then(res => {
					this.indexActivityList = res.data.data;
					this.indexActivityImage = res.data.data[0].posterImage;
				})
			},
			//banner页跳转
			bannerClick(item) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				console.log(item)
				if (item.type == 4) {
					//书籍
					this.toBookDet(item.dataId);
				} else if (item.type == 3) {
					//书单
					this.toBookListDet(item.dataId);
				}
			},
			//跳转全部书单
			getAllBookList() {
				uni.setStorageSync('bookcurrentIndex', 1);
				uni.switchTab({
					url: '../book/book'
				})
			},
			searchEmailCount: function() {
				//查询条数
				app.basic.getAjaxData(com.notification("isReadCont"), null, "GET").then(res => {
					console.log(res.data);
					// count: 1
					this.count = res.data.data
				});
			},
		}
	}
</script>


<style>
	.mainCom {
		padding-top: 60upx;
	}

	.logoName {
		font-size: 46upx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(2, 2, 2, 1);
	}

	.slogan {
		font-size: 22upx;
		font-family: PingFangSC-Light, PingFang SC;
		font-weight: 300;
		color: rgba(102, 102, 102, 1);
		padding-top: 16upx;
	}

	.icon-xiaoxi,
	.icon-xinbaniconshangchuan- {
		font-size: 68upx;
		color: #000;
	}

	.msgBox {
		position: relative;
		margin-right: 42upx;
	}

	.msgBox .dot {
		position: absolute;
		top: 6upx;
		right: 0;
		width: 8upx;
		height: 8upx;
		background: rgba(255, 55, 55, 1);
		border-radius: 50%;
	}

	.bannerBox {
		height: 320upx;
	}

	.indexMune {
		text-align: center;
		color: #5C5F66;
		font-size: 12px;
		width: 90%;
		margin: 0 auto;
	}

	.indexMune image {
		margin-bottom: 20upx;
	}

	.indexMune .scanQrCode {
		width: 62upx;
		height: 52upx;
	}

	.indexMune .myCode {
		width: 58upx;
		height: 56upx;
	}

	.indexMune .netBookRoom {
		width: 74upx;
		height: 70upx;
	}

	.indexMune .keyRenew {
		width: 64upx;
		height: 64upx;
	}

	.plateTitBox {
		font-size: 36upx;
	}
</style>
