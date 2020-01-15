<template>
	<!-- 榜单列表 -->
	<view id='list'>
		<view class="topBar">
			<view class="statusBar" :class='"bg"+index'></view>
			<view class="titBar flex_l_c" :class='"bg"+index'>
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
			</view>
		</view>
		<view class="mainCom crunchies">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="listTit" :class='"bg"+index'>{{name}}</view>
				<view class="crunchiesBox">
					<view class="crunchiesItem">
						<view class="flex_l_c" v-for="(itemC, indexC) in list" :key="itemC.bookName" @click="toBookDet(itemC.bookId)">
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
                name: '',
				index: 0,
                id: '',
                list: [],
                hasMoreData: false,
                pageCurrent: 1,
                pageSize: 10
			}
		},
		onLoad(options) {
            this.index = options.id % 7;
            this.id = options.id;
            this.name = options.name;
        },
        onShow() {
            this.list = [];
            this.pageCurrent = 1;
            this.getBookRankPage();
		},
		methods: {
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
                    url: '../book/book_det?id=' + id
				})
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //获取榜单书籍
            getBookRankPage() {
                var param = {
                    id: this.id,
                    current: this.pageCurrent,
                    size: this.pageSize
                }
                app.basic.getAjaxData(com.enquiries('getBookRankPage'), param, "GET").then(res => {
                    var list = res.data.data.records;
                    if (list.length < this.pageSize) {
                        if (list.length === 0) {
                            uni.showToast({
                                icon: "none",
                                title: '没有更多数据'
                            });
                        } else {
                            this.list = this.list.concat(list)
                        }
                        this.hasMoreData = false
                    } else {
                        this.list = this.list.concat(list)
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1
                    }
                })
            },
            //分页信息
            scrollView() {
                if (this.hasMoreData) {
                    this.getBookRankPage();
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
	#list .mainCom {
		width: 100%;
		padding-top: 166upx;
	}
	
	#list .titBar {
		margin-top: -2upx;
	}

	#list .titBar .backBtn {
		color: #fff;
	}
	
	#list .crunchies .crunchiesBox {
		padding-top: 40upx;
	}

	#list .listTit {
		font-size: 54upx;
		font-weight: bold;
		color: #fff;
		padding: 58upx 46upx;
	}

	#list .crunchiesItem>view {
        padding: 28 upx 0;
	}

	#list .bg0 {
		background: linear-gradient(90deg, rgba(13, 106, 162, 1) 0%, rgba(46, 140, 195, 1) 100%);
	}

	#list .bg1 {
		background: linear-gradient(270deg, rgba(206, 192, 164, 1) 0%, rgba(176, 162, 134, 1) 100%);
	}

	#list .bg2 {
		background: linear-gradient(270deg, rgba(157, 149, 149, 1) 0%, rgba(145, 129, 129, 1) 100%);
	}

	#list .bg3 {
		background: linear-gradient(270deg, rgba(91, 150, 153, 1) 0%, rgba(68, 114, 116, 1) 100%);
	}

	#list .bg4 {
		background: linear-gradient(90deg, rgba(116, 125, 152, 1) 0%, rgba(142, 154, 188, 1) 100%);
	}

	#list .bg5 {
		background: linear-gradient(270deg, rgba(138, 209, 176, 1) 0%, rgba(113, 174, 145, 1) 100%);
	}

	#list .bg6 {
		background: linear-gradient(270deg, rgba(94, 152, 213, 1) 0%, rgba(66, 113, 163, 1) 100%);
	}
</style>
