<template>
	<!-- 搜索结果 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_l_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="srhBox flex_l_c">
					<view class="srhIptBox flex_l_c">
						<text class="iconfont icon-search-line srhIcon"></text>
						<input type="text" @input="search" :value="searchText" placeholder="搜索…" class="srhIpt" @click="forSrh" />
					</view>
                    <view class="mainCol srhBtn" @click="searchBtn(1)">{{ srhBtn }}</view>
				</view>
			</view>
		</view>
		<view class='mainCom'>
			<scroll-view class="scroll-ul">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class="swiper">
					<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 150px)">
                        <view class="warmPrompt" v-if="bookList.length==0">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无相关内容哦。</view>
                        </view>
                        <view class="p_b30" v-else>
                            <view class="bookListItem flex_l_t" @click="toBookDet(item.source.bookrecno)"
                                  v-for="item in bookList" :key='item.source.bookrecno'>
								<view class="flex_l_c bookBox">
									<view class="bookImgBox">
                                        <image :src="item.source.bookreptile.coverUrl" class="bookImg"
                                               mode='aspectFit'></image>
									</view>
								</view>
								<view class="bookInfo">
                                    <view class='omit2 bookTit'>{{item.source.title}}</view>
                                    <view class='omit authorName'>作者: {{item.source.author?item.source.author:'无'}}
                                    </view>
                                    <view class='omit authorName'>出版社:
                                        {{item.source.publisher?item.source.publisher:'无'}}
                                    </view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper">
					<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
                        <view class="warmPrompt" v-if="activeList.length==0">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无相关内容哦。</view>
                        </view>
                        <view v-else>
                            <view class="infoItem flex_l_e" @click="toActivityDet(item.id)" v-for="item in activeList"
                                  :key='item.id'>
                                <image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
                                <view class="info">
                                    <view class="omit tit">{{item.theme}}</view>
                                    <view>活动时间：{{item.activityStratTime}}</view>
                                    <view>报名人数: {{item.applyNumberPeople}}/{{item.maxNumberPeople}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
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
                srhBtn: '搜索', // 搜索按钮
				searchText: '',
				// tab栏
				tabArr: ['书籍', '活动'],
				currentIndex: 0, // 选择tab栏下标
                pageCurrent: 1,
                pageSize: 10,
                hasMoreData: false,
                bookList: [],
                activeList: []
			}
		},
        onLoad(option) {
            this.searchText = option.title;
            this.searchBtn(2);
        },
		methods: {
			// 活动详情
            toActivityDet(id) {
				uni.navigateTo({
                    url: 'activity_det?id=' + id
				});
			},
			// 书籍详情
            toBookDet(id) {
				uni.navigateTo({
                    url: '../book/book_det?id=' + id
				})
            },
            //搜索
            searchBtn(val) {
                if (this.searchText === '') {
                    uni.showToast({
                        title: '请输入要搜索的关键词',
                        icon: 'none'
                    })
                    return;
                }
                if (val == 1) {
                    var param = {
                        title: this.searchText
                    }
                    app.basic.getAjaxData(com.enquiries("savSearchHistory"), param, "POST").then(res => {
                    })
                }
                if (this.currentIndex == 0) {
                    this.getBook();
                } else if (this.currentIndex == 1) {
                    this.getActivity();
                }
            },
			// 点击tab栏
			tabClick(index) {
                if (this.currentIndex != index) {
                    this.currentIndex = index;
                    this.pageCurrent = 1;
                    this.hasMoreData = false;
                    this.bookList = [];
                    this.activeList = [];
                    this.searchBtn(2);
                }

			},
			// tab栏左右滑动
			tabChange(e) {
                this.tabClick(e.detail.current);
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //文本输入框
            search(e) {
                this.searchText = e.detail.value;
                if (this.searchText === '') {
                    this.srhBtn = '取消'
                } else {
                    this.srhBtn = '搜索'
                }
            },
            //搜索书籍
            getBook() {
                var findBook = {
                    pageCurrent: this.pageCurrent,
                    pageSize: this.pageSize,
                    condition: this.searchText,
                    fieldNames: ["title"],
                };
                app.basic.getAjaxData(com.enquiries('findBook'), findBook, "POST").then(res => {
                    var bookList = res.data.data.list;
                    if (bookList.length < this.pageSize) {
                        if (bookList.length === 0) {
                            uni.showToast({
                                icon: "none",
                                title: '暂无相关内容'
                            });
                        } else {
                            this.bookList = this.bookList.concat(bookList);
                        }
                        this.hasMoreData = false;

                    } else {
                        this.bookList = this.bookList.concat(bookList);
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1;
                    }
                })
            },
            //获取活动
            getActivity() {
                var param = {
                    pageCurrent: this.pageCurrent,
                    pageSize: this.pageSize,
                    name: this.searchText,
                };
                app.basic.getAjaxData(com.activity('getSerActivityBasics'), param, "POST").then(res => {
                    var activeList = res.data.data.records;
                    if (activeList.length < this.pageSize) {
                        if (activeList.length === 0) {
                            uni.showToast({
                                icon: "none",
                                title: '暂无相关内容'
                            });
                        } else {
                            this.activeList = this.activeList.concat(activeList);
                        }
                        this.hasMoreData = false;
                    } else {
                        this.activeList = this.activeList.concat(activeList);
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1;
                    }
                })
            },
            //分页信息
            scrollView() {
                if (this.hasMoreData) {
                    if (this.currentIndex == 0) {
                        this.getBook();
                    } else if (this.currentIndex == 1) {
                        this.getActivity();
                    }

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
	.scroll-ul {
		top: 172upx;
	}

    .scroll-ul .scroll-li {
		width: 50%;
		text-align: center;
		padding: 36upx 0 30upx 0;
	}

	.srhBox {
		position: relative;
		top: 0;
		left: 0;
		width: 80%;
		padding: 0;
		margin-left: 20upx;
	}

    .srhBox .srhIptBox {
		width: 400upx;
	}
</style>
