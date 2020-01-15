<template>
	<!-- 书籍预约 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书籍预约</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="srhBox flex_l_c">
					<view class="srhIptBox flex_l_c">
						<text class="iconfont icon-search-line srhIcon"></text>
						<input type="text" @input="search" :value="searchText" placeholder="请输入书籍名称" class="srhIpt" @click="forSrh" />
					</view>
					<view class="mainCol srhBtn" @click="searchBtn">{{ srhBtn }}</view>
				</view>
				<!-- 历史搜索 -->
				<view class="pullDownBox" v-if="hisShow">
					<view class="flex_b_c b_b" v-for="(item, index) in list" :key="index">
						<view @click="getQueryName(item.queryName)">
							<text class="iconfont icon-shizhong tiemIcon"></text>
							<text>{{ item.queryName }}</text>
						</view>
						<view class="iconfont icon-guanbi1" @click="deleteOne(item.queryName)"></view>
					</view>
					<view class="mainCol clearBtn" @click="deleteAll" v-if="list.length > 0">清空历史记录</view>
				</view>
				<!-- 搜索联想 -->
				<view class="pullDownBox" v-if="conShow">
					<view class="flex_b_c b_b" v-for="(item, index) in list2" :key="index" @click="getQueryName2(item.source.title)">
						<view>
							<text class="iconfont icon-shizhong tiemIcon"></text>
							<text>{{ item.source.title }}</text>
						</view>
					</view>
				</view>
				<view class="warm" v-if="userInfoStatu">
					<view>温馨提示：书籍预约必须持有借阅证，证上未借满文献。</view>
					<text class="linkBtn"  @click="goBing">绑定借阅证</text>
				</view>
				<!-- 搜索结果列表 -->
				<view class="infoItem flex_l_e" v-if="srhResultList" v-for="(item, index) in searchOrderBookInfo" :key="index"
				 @click="toBookAffirmSub(item.source)">
					<image :src="item.source.image" class="bookImg"></image>
					<view class="info">
						<view class="omit tit">{{ item.source.title }}</view>
						<view class="omit">作者:{{ item.source.author != null ? item.source.author : '暂无' }}</view>
						<view class="flex_b_e">
							<view class="omit press">出版社: {{ item.source.publisher != null ? item.source.publisher : '暂无' }}</view>
							<view :class="item.source.barcode == null ? 'grayBtn' : 'buleBtn'">{{ item.source.barcode == null ? '暂不能预约' : '预约' }}</view>
						</view>
					</view>
				</view>
				<!-- 默认列表 -->
				<view v-if="defaultList" class="infoItem flex_l_e" v-for="(item, index) in orderBookInfo" :key="index" @click="toBookAffirmSub(item)">
					<image :src="item.image" class="bookImg"></image>
					<view class="info">
						<view class="omit tit">{{ item.title }}</view>
						<view class="omit">作者: {{ item.author == null ? '暂无' : item.author }}</view>
						<view class="flex_b_e">
							<view class="omit press">出版社: {{ item.publisher == null ? '暂无' : item.publisher }}</view>
							<view class="buleBtn">预约</view>
						</view>
					</view>
				</view>
				<view class="srhIconBox" v-if="retrieval" @click="toStackRoom">
					<view class="srhIconBoxCom">
						<text class="iconfont icon-search-line srhIcon"></text>
						<view>书库检索</view>
					</view>
				</view>
				<view class="warm flex_c_c notFind" v-if="retrieval">
					<view>没找到？</view>
					<text class="linkBtn">书库检索</text>
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
				srhBtn: '取消', // 搜索按钮
				hisShow: false, // 历史搜索
				conShow: false, // 联想搜索
				srhResultList: false, // 搜索结果列表
				defaultList: true, // 默认列表
				userInfoStatu: true, // 是否绑定借阅证
				searchOrderuserInfo: null,
				page: 1,
				orderBookInfo: [],
				searchOrderBookInfo: [],
				retrieval: false,
				result: true,
				pageCurrent: 1,
				pageSize: 10,
				hasMoreData: true,
				searchText: '',
				list: [],
				list2: [{
					queryName: '111'
				}]
			};
		},
		onLoad(option) {
			this.searchUserInfo();
			this.getOrderBookRank();
		},
		methods: {
			goBing(){
				uni.navigateTo({
					url:'../my/bindCard'
				})
			},
			// 书库检索
			toStackRoom() {
				console.log(this.searchOrderuserInfo)
				if(this.searchOrderuserInfo == null){
					uni.showModal({
					        title: '温馨提示',
					        content: '未绑定借阅证，绑定？',
					        confirmColor: '#71AE91',
					        success: function(res) {
					          console.log(res)
					          if (res.confirm) {
					            uni.navigateTo({
					              url: '../my/bindCard',
					            })
					          }
					        }
					      })
				}else{
					uni.navigateTo({
						url: 'stackRoom?searchText=' + this.searchText
					})
				}
				
			},
			//搜索
			searchBtn() {
				if (this.srhBtn == '搜索') {
					var searchText = this.searchText;
					this.searchOrderBookInfo = [];
					this.result = true;
					this.pageCurrent = 1;
					this.hisShow = false;
					this.conShow = false;
					this.srhResultList = true;
					this.defaultList = false;
					this.srhBtn = '取消';
					var insertQueryHistory = {
						queryName: this.searchText
					};
					app.basic.getAjaxData(com.enquiries('insertQueryHistory'), insertQueryHistory, 'GET').then(res => {});
					this.searchfunc(searchText);
				} else if (this.srhBtn == '取消') {
					this.searchText = '';
					this.hisShow = false;
					this.conShow = false;
					this.srhResultList = false;
					this.defaultList = true;
				}
			},

			search(e) {
				console.log(e.detail.value);
				this.searchText = e.detail.value;
				wx.setStorageSync('searchText', e.detail.value);
				if (e.detail.value == '') {
					this.srhBtn = '取消';
					this.hisShow = false;
					this.conShow = false;
					this.defaultList = true;
					this.srhResultList = true;
				} else {
					this.srhBtn = '搜索';
					this.hisShow = false;
					this.conShow = true;
					this.defaultList = false;
					this.srhResultList = false;
				}
				var pageDTO = {
					pageCurrent: this.pageCurrent,
					pageSize: 10,
					condition: e.detail.value,
					fieldNames: ['title'],
					key: 2
				};
				app.basic.getAjaxData(com.enquiries('orderBook'), pageDTO, 'POST').then(res => {
					if (res.data.status == true) {
						if (res.data.data.totalCount == 0) {
							this.result = false;
						} else {
							this.list2 = res.data.data.list;
						}
					}
				});
			},

			// 点击搜索框
			forSrh: function() {
				this.hisShow = true;
				this.conShow = false;
				// this.srhResultList = false;
				// this.defaultList = false;
				this.getHistoryList();
			},
			// 预约
			toBookAffirmSub(obj) {
				if (this.searchOrderuserInfo == null) {
					// uni.showModal({
					//   title: '温馨提示',
					//   content: '未绑定借阅证，绑定？',
					//   confirmColor: '#71AE91',
					//   success: function(res) {
					//     console.log(res)
					//     if (res.confirm) {
					//       uni.redirectTo({
					//         url: '../../../my/borrow_card/binding_card?type=2',
					//       })
					//     }
					//   }
					// })
				} else {
					uni.setStorageSync('searchOrderuserInfo', this.searchOrderuserInfo);
					var that = this;
					uni.setStorageSync('orderBookInfo', obj);
					uni.navigateTo({
						url: 'bookAffirmSub'
					});
				}
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			/**
			 * 查询个人信息
			 */
			searchUserInfo() {
				app.basic.getAjaxData(com.enquiries('sub'), 'GET').then(res => {
					if (res.data.status) {
						this.searchOrderuserInfo = res.data.data;
						if (this.searchOrderuserInfo != null) {
							this.userInfoStatu = false;
						}
					}
				});
			},

			/**
			 * 默认列表
			 */
			getOrderBookRank() {
				this.defaultList = true;
				this.srhResultList = false;
				var page = {
					page: this.page
				};
				app.basic.getAjaxData(com.enquiries('getOrderBookRank'), page, 'GET').then(res => {
					console.log(res.data.data);
					if (res.data.status) {
						if (res.data.data.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '没有更多数据'
							});
							this.result = false;
						} else {
							var list = res.data.data;
							if (list.length < 10) {
								if (list.length == 0) {
									uni.showToast({
										icon: 'none',
										title: '没有更多数据'
									});
								} else {
									this.orderBookInfo = this.orderBookInfo.concat(list);
								}
								this.hasMoreData = false;
							} else {
								this.orderBookInfo = this.orderBookInfo.concat(list);
								this.hasMoreData = true;
								this.page = this.page + 1;
							}
						}
					}
				});
			},

			getHistoryList() {
				app.basic.getAjaxData(com.enquiries('listQueryHistory'), '', 'GET').then(res => {
					this.list = res.data.data;
				});
			},
			deleteOne(e) {
				var deleteQueryHistory = {
					queryName: e
				};
				app.basic.getAjaxData(com.enquiries('deleteQueryHistory'), deleteQueryHistory, 'GET').then(res => {
					this.getHistoryList();
				});
			},

			deleteAll() {
				app.basic.getAjaxData(com.enquiries('deleteAllQueryHistory'), '', 'GET').then(res => {
					this.getHistoryList();
					this.hisShow = false;
				});
			},

			getQueryName(e) {
				this.pageCurrent = 1;
				this.searchText = e;
				this.srhBtn = '取消';
				this.hisShow = false;
				this.conShow = false;
				this.defaultList = false;
				this.srhResultList = true;
				this.searchOrderBookInfo = [];
				this.result = true;
				this.searchfunc(e);
			},

			getQueryName2(obj) {
				this.pageCurrent = 1;
				this.searchText = obj;
				this.srhBtn = '取消';
				this.hisShow = false;
				this.conShow = false;
				this.defaultList = false;
				this.srhResultList = true;
				this.searchOrderBookInfo = [];
				this.result = true;
				this.searchfunc(obj);
			},

			/**
			 * 搜索方法
			 */
			searchfunc: function(text) {
				var pageDTO = {
					pageCurrent: this.pageCurrent,
					pageSize: 10,
					condition: text,
					fieldNames: ['title'],
					key: 1
				};
				app.basic.getAjaxData(com.enquiries('orderBook'), pageDTO, 'POST').then(res => {
					this.retrieval = true;
					if (res.data.status == true) {
						if (res.data.data.totalCount == 0) {
							this.result = false;
						} else {
							var list = res.data.data.list;
							if (list.length < this.pageSize) {
								if (list.length == 0) {
									uni.showToast({
										icon: 'none',
										title: '没有更多数据'
									});
								} else {
									this.searchOrderBookInfo = this.searchOrderBookInfo.concat(list);
								}
								this.hasMoreData = false;
							} else {
								this.searchOrderBookInfo = this.searchOrderBookInfo.concat(list);
								this.hasMoreData = true;
								this.pageCurrent = this.pageCurrent + 1;
							}
						}
					}
				});
			},
			scrollView() {
				if (this.hasMoreData) {
					if (this.srhResultList) {
						this.searchfunc(this.searchText);
					} else {
						this.getOrderBookRank();
					}
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
	.mainCom {
		width: 100%;
		padding-top: 300upx;
	}

	.infoItem {
		width: 82%;
	}

	.warm {
		width: 100%;
		padding: 22upx 0;
		text-align: center;
		line-height: 44upx;
		font-size: 26upx;
		color: #a6a6a6;
		background: #f3f3f4;
	}

	.linkBtn {
		margin-top: 0;
	}

	.notFind .linkBtn {
		margin: 0;
	}

	.srhIconBox {
		position: fixed;
		bottom: 20%;
		right: 50upx;
		width: 120upx;
		height: 120upx;
		text-align: center;
		line-height: 100upx;
		color: #fff;
		background: linear-gradient(to right, #197cb7, #197cb7);
		border-radius: 50%;
		font-size: 24upx;
	}

	.srhIconBoxCom {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.srhIconBoxCom>view {
		position: absolute;
		bottom: -5upx;
		left: 0;
		width: 100%;
	}

	.srhIconBoxCom .srhIcon {
		position: absolute;
		top: -10upx;
		left: 40upx;
		font-size: 44upx;
	}
</style>
