<template>
	<!-- 书籍列表 -->
	<view class="libraryList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_l_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">{{pageTit}}</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="p_b30" v-for="(item, index) in bookList" :key="index">
					<view class="bookListItem flex_l_t" @click="toBookDet(item.bookrecno)">
						<view class="flex_l_c bookBox">
							<view class="bookImgBox">
                                <image :src="item.bookreptile.coverUrl?item.bookreptile.coverUrl:'https://wj.zydbai.com/zwt.png'"
                                       class="bookImg"
                                       mode='aspectFit'></image>
							</view>
						</view>
						<view class="bookInfo">
                            <view class='omit2 bookTit' v-if="type==0">{{item.title}}</view>
                            <view class='omit2 bookTit' v-else>{{item.bookName}}</view>
							<view class='omit authorName' v-if='item.author!=null'>作者: {{item.author}}</view>
							<view class='omit authorName' v-if='item.pubdate!=null'>出版日期: {{item.pubdate}}</view>
							<view class='omit authorName' v-if='item.publisher!=null'>出版社: {{item.publisher}}</view>
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
				type: '', //类型  0：您可能喜欢   1：小编推荐
				pageTit: '',
                bookList: [],
                hasMoreData: false,
                pageCurrent: 1,
                pageSize: 10
			}
		},
		onLoad(options) {
			this.type = options.type;
			if (options.type == 0) {
				this.pageTit = '您可能喜欢'
			} else if (options.type == 1) {
				this.pageTit = '小编推荐'
			}
		},
        onShow() {
            this.bookList = [];
            this.pageCurrent = 1;
            if (this.type == 0) {
                this.getPortrayalBook();
            } else {
                this.pageBookRecommendation();
            }
        },
		methods: {
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
                    url: '../book/book_det?id=' + id
                })
            },
            //获取您可能喜欢
            getPortrayalBook() {
                var param = {
                    page: this.pageCurrent,
                    pageSize: this.pageSize,
                    size: 10,
                    type: 2
                }
                app.basic.getAjaxData(com.bigdata('getPortrayalBook'), param, "GET").then(res => {
                    var list = res.data.data;
                    if (list.length < this.pageSize) {
                        if (list.length === 0) {
                            uni.showToast({
                                icon: "none",
                                title: '没有更多数据'
                            });
                        } else {
                            this.bookList = this.bookList.concat(list)
                        }
                        this.hasMoreData = false
                    } else {
                        this.bookList = this.bookList.concat(list)
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1
                    }
                })
            },
            //小编推荐
            pageBookRecommendation() {
                var param = {
                    current: this.pageCurrent,
                    size: this.pageSize,
                }
                app.basic.getAjaxData(com.bigdata('pageBookRecommendation'), param, "GET").then(res => {
                    var list = res.data.data.records;
                    if (list.length < this.pageSize) {
                        if (list.length === 0) {
                            uni.showToast({
                                icon: "none",
                                title: '没有更多数据'
                            });
                        } else {
                            this.bookList = this.bookList.concat(list)
                        }
                        this.hasMoreData = false
                    } else {
                        this.bookList = this.bookList.concat(list)
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1
                    }
				})
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //分页信息
            scrollView() {
                if (this.hasMoreData) {
                    if (this.type == 0) {
                        this.getPortrayalBook();
                    } else {
                        this.pageBookRecommendation();
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
	.bookListItem .bookInfo {
		padding: 36upx 0;
		height: auto;
	}
</style>
