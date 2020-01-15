<template>
	<!-- 书籍在馆信息 -->
	<view id="bookDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书籍在馆信息</view>
				<text class="iconfont icon-fenxiang shareBtn"></text>
			</view>
		</view>
		<view class="mainCom">
			<view class="flex_l_c">
				<image :src="bookInfo.bookreptile.coverUrl" mode="aspectFill" class="coverImg"></image>
				<view class="bookInfoBox">
					<view class="tit">{{bookInfo.title}}</view>
					<view v-if="bookInfo.author!=null">作者: {{bookInfo.author}}</view>
					<view v-if="bookInfo.pubdate!=null">出版日期：{{bookInfo.pubdate}}</view>
					<view v-if="bookInfo.publisher!=null">出版社: {{bookInfo.publisher}}</view>
					<view v-if="bookInfo.typename!=null">文献类型：{{bookInfo.typename}}</view>
					<view v-if="bookInfo.classno!=null">索书号：{{bookInfo.classno}}</view>
				</view>
			</view>
			<!-- 书籍信息 -->
			<view class="noFixed">
				<scroll-view class="scroll-ul">
					<view class="flex_b_c">
						<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
							<view :class="index == currentIndex ? 'cur' : ''">{{item.name}}</view>
							<view class="line" v-if="index == currentIndex"></view>
						</view>
					</view>
				</scroll-view>
				<view v-for="(item, index) in tabArr" :key="item.name">
					<view v-if="index == currentIndex && item.name != '馆藏信息'">
						<view class="synopsisBox b_b">
							<view :class="iconShow && item.info.length >= 100? 'omit3':''">
								<rich-text :nodes="item.info"></rich-text>
							</view>
						</view>
						<view v-if="iconShow && item.info.length >= 100" @click="showHead" class="seeAll flex_c_c">查看全部<text class='iconfont icon-xiangxia'></text></view>
						<view v-if="!iconShow && item.info.length >= 100" @click="showHead" class="seeAll flex_c_c">收起<text class='iconfont icon-xiangshang'></text></view>
					</view>
					<view v-if="index == currentIndex && item.name == '馆藏信息'" class="synopsisBox">
						<view class='detTit' v-if='collectionList.length==0'>馆藏信息正在更新中.请稍后</view>
						<view class='inTheInfo' v-else>
							<view class='flex_b_c'>
								<view>索书号</view>
								<view>所在馆</view>
								<view>馆藏地点</view>
								<view>状态</view>
							</view>
							<view class='flex_b_c' v-for="(item, index) in collectionList" :key="index">
								<view>{{item.callno==null?"暂无":item.callno}}</view>
								<view>{{item.simplename==null?"暂无":item.simplename}}</view>
								<view>{{item.name==null?"暂无":item.name}}</view>
								<view>{{item.statename==null?"暂无":item.statename}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 其他人在看 -->
			<view class="p_tb40">
				<view class="flex_b_c plateBox w90">
					<view class="plateTitBox">
						<view>其他人在看</view>
						<view class="plateLine"></view>
					</view>
				</view>
				<view class="threeBox w90">
					<view v-for="(item, index) in recommendedList" :key="index" @click="toBookDet(item.bookrecno)">
						<view>
							<image :src="item.bookreptile.coverUrl" mode="aspectFit" class="bookImg"></image>
						</view>
						<view class="omit tit">{{item.title}}</view>
						<view class="omit author" v-if="item.author!=null">{{item.author}}</view>
					</view>
				</view>
			</view>

			<view class="botBox flex_l_c">
                <view class="collect" @click="collection">
                    <text class="iconfont icon-xinheart280 collectIcon" :class="isCollection?'redCol':''"></text>
				</view>
				<view class="borderBtn">预约</view>
				<view class="solidBtn" @click="addBookList">加入书单</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<view class='popUpBox' v-if='popUpShow'>
			<view class='popUpShade'></view>
			<view class='popUpCom'>
				<view class='flex_b_c b_b addBookListBox'>
					<view class='addBookListTit'>收藏到书单</view>
					<view class='buleHollowBtn' @click="toNewBook">新建书单</view>
				</view>
				<view class='addBookListMain'>
					<view class='noSrh' v-if='bookList.length <= 0'>
						<image src='../../static/imgs/collect.png' class='srhImg'></image>
						<view class='noText'>暂无书单哦~</view>
					</view>
					<view @click='choose(index)' class='flex_b_c addBookListItem' v-for="(item, index) in bookList" :key='index'>
						<view class='flex_l_c'>
							<image :src='item.image' class='addBookListCover' mode='aspectFit'></image>
							<view>
								<view class='listItemTit omit'>{{item.name}}</view>
								<view class='listItemCount'>共{{item.bookSize}}本书</view>
								<view class='listItemCount'>{{item.collectionCount}}人点赞</view>
							</view>
						</view>
						<view>
                            <view class='iconfont icon-xuanzhong selIocnAct' v-if='idx===index'></view>
							<view class='iconfont icon-yuanquan selIocn' v-else></view>
						</view>
					</view>
				</view>
				<view class='flex_b_c botBox'>
					<view class='closeBtn' @click.stop='closePopUp'>取消</view>
					<view class='agreeBtn' @click.stop='insertBookList'>添加到书单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				// 馆藏信息
				collectionList: [],
				// tab栏
				tabArr: [],
				currentIndex: 0, // 选择tab栏下标
				iconShow: true, // 图标显示
				id: '',
				bookInfo: {},
				recommendedList: [],
				strings: '',
				popUpShow: false,
                idx: '',
                bookList: [],
                isCollection: false
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getBibliosDetails();
			this.listHodingSearch();
			this.recommended();
		},
        onShow() {
            this.popUpShow = false;
        },
		methods: {
			// 新建书单
			toNewBook() {
                var param = {
                    bookId: this.bookInfo.bookrecno,
                    bookName: this.bookInfo.title,
                    bookImage: this.bookInfo.bookreptile.coverUrl,
                    author: this.bookInfo.author,
                    pubdate: this.bookInfo.pubdate,
                    publisher: this.bookInfo.publisher,
                    typename: this.bookInfo.typename,
                    classno: this.bookInfo.classno
                }
				uni.navigateTo({
                    url: 'newBook?item=' + encodeURIComponent(JSON.stringify(param))
				})
			},
			// 加入书单
			addBookList() {
                this.getBookList();
				this.popUpShow = true;
			},
			// 取消加入书单
			closePopUp() {
				this.popUpShow = false;
			},
            //加入书单
            insertBookList() {
                if (this.bookList.length == 0) {
                    uni.showToast({
                        title: '请新建书单!',
                        icon: 'none'
                    })
                    return;
                } else if (this.idx === '') {
                    uni.showToast({
                        title: '请选择书单!',
                        icon: 'none'
                    })
                    return;
                }
                var param = {
                    bookListId: this.bookList[this.idx].id,
                    bookId: this.bookInfo.bookrecno,
                    bookName: this.bookInfo.title,
                    bookImage: this.bookInfo.bookreptile.coverUrl,
                    author: this.bookInfo.author,
                    pubdate: this.bookInfo.pubdate,
                    publisher: this.bookInfo.publisher,
                    typename: this.bookInfo.typename,
                    classno: this.bookInfo.classno
                }
                app.basic.getAjaxData(com.enquiries('insertBookListDetail'), param, "POST").then(res => {
                    if (res.data.status) {
                        uni.showToast({
                            title: '添加成功!',
                            icon: 'none'
                        })
                        this.popUpShow = false
                    } else {
                        uni.showToast({
                            title: '书籍已存在,添加失败!',
                            icon: 'none'
                        })
                    }
                })
            },
			// 选择书单
			choose: function(index) {
                if (this.idx === '') {
					this.idx = index;
                } else {
                    this.idx = '';
                }
			},
			// 书籍详情
			toBookDet(id) {
				uni.navigateTo({
					url: 'book_det?id=' + id
				})
			},
			// 内容显示隐藏
			showHead: function() {
				if (this.iconShow) {
					this.iconShow = false;
				} else {
					this.iconShow = true;
				}
			},
			// 点击tab栏
			tabClick(index) {
				this.currentIndex = index;
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取书籍信息
			getBibliosDetails() {
				var param = {
					bookrecno: this.id
				};
				app.basic.getAjaxData(com.bigdata('getBibliosDetails'), param, "GET").then(res => {
					var book = res.data.data;
					if (book.bookreptile.summary != null && book.bookreptile.summary != '') {
						this.tabArr.push({
							name: "内容简介",
							info: book.bookreptile.summary
						})
					}
					if (book.bookreptile.authorIntroduction != null && book.bookreptile.authorIntroduction != '') {
						this.tabArr.push({
							name: "作者简介",
							info: book.bookreptile.authorIntroduction
						})
					}
					if (book.bookreptile.catalog != null && book.bookreptile.catalog != '') {
						this.tabArr.push({
							name: "图书目录",
							info: book.bookreptile.catalog
						})
					}
					if (book.bookreptile.previewContent != null && book.bookreptile.previewContent != '') {
						this.tabArr.push({
							name: "试读信息",
							info: book.bookreptile.previewContent
						})
					}
					this.bookInfo = book;

				})

			},
			//馆藏信息
			listHodingSearch() {
				var listHodingSearch = {
					bookrecno: this.id
				};
				app.basic.getAjaxData(com.query('listHodingSearch'), listHodingSearch, "GET").then(res => {
					this.collectionList = res.data.data;
					if (this.collectionList.length > 0) {
						this.tabArr.push({
							name: "馆藏信息"
						})
					}

				})
			},
			//其他人还在看
			recommended() {
				var param = {
					bookrecno: this.id,
					type: 3,
					size: 3
				};
				app.basic.getAjaxData(com.bigdata('knnRecommen'), param, "POST").then(res => {
					this.recommendedList = res.data.data;
				})
			},
            //是否收藏
            getCountBookCollection() {
                var param = {
                    bookrecno: this.id,
                    type: 3
                };
                app.basic.getAjaxData(com.user('countBookCollection'), param, "GET").then(res => {
                    if (res.data.data > 0) {
                        this.isCollection = true;
                    }
                })
            },
            //点击收藏
            collection() {
                if (this.isCollection) {
                    this.removecollect();
                } else {
                    this.collect();
                }
            },
            //收藏
            collect: function () {
                var param = {
                    bookrecno: this.id,
                    type: 3
                };
                app.basic.getAjaxData(com.user('insertBookCollection'), param, "GET").then(res => {
                    if (res.data.status) {
                        this.isCollection = true;
                    }
                })
            },
            //取消收藏
            removecollect() {
                var param = {
                    bookrecno: this.id,
                    type: 3
                };
                app.basic.getAjaxData(com.user('deleteBookCollectionByType'), param, "GET").then(res => {
                    if (res.data.status) {
                        this.isCollection = false;
                    }
                })
            },
            //获取书单列表
            getBookList() {
                app.basic.getAjaxData(com.enquiries('getBookList'), '', "GET").then(res => {
                    this.bookList = res.data.data;
                })
            },
		}
	}
</script>

<style>
	.mainCom {
		width: 100%;
		padding-bottom: 160upx;
	}

	/* 弹窗 */

	.popUpBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 98;
	}

	.popUpShade {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: #000;
		opacity: 0.5;
		z-index: 98;
	}

	.popUpCom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 90%;
		background: #fff;
		z-index: 99;
		border-radius: 20upx 20upx 0 0;
		padding: 5%;
	}

	.popUpCom .closeIconBox {
		text-align: right;
	}

	.popUpCom .closeIcon {
		font-size: 50upx;
	}

	.selBookListCount {
		padding: 20upx;
	}

	.addBookListBox {
		padding-bottom: 26upx;
	}

	.addBookListTit {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
	}

	.addBookListMain {
		height: 500upx;
		overflow-y: scroll;
		padding-bottom: 120upx;
	}

	.addBookListItem {
		padding: 25upx 0;
	}

	.addBookListCover {
		width: 140upx;
		height: 114upx;
		border-radius: 12upx;
	}

	.listItemTit {
		font-size: 30upx;
		color: #222;
		padding-left: 32upx;
		padding-bottom: 10upx;
		width: 340upx;
	}

	.listItemCount {
		font-size: 20upx;
		color: #666;
		padding-left: 32upx;
	}

	.addBookListMain .selIocn {
		font-size: 50upx;
		color: #aca7a7;
	}

	.addBookListMain .selIocnAct {
		font-size: 50upx;
		color: #197cb7;
	}

	.noSrh {
		padding-top: 120upx;
	}

    .mainCom .collect .redCol {
        color: #F2004F;
    }
</style>
