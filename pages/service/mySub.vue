<template>
	<!-- 我的预约 -->
	<view class="taskList">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">我的预约</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul b_t">
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<swiper class="swiper-box" :current="currentIndex" @change="tabChange">
				<swiper-item class="swiper">
					<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 150px)">
						<view class="warmPrompt" v-if="searchreslist.length <= 0 && loadState">
							<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
							<view class="txt">亲，暂无书籍预约哦。</view>
							<text class="linkBtn" @click="toBookSub">去预约</text>
						</view>
						<view class="infoItem flex_l_e" v-for="(item, index) in searchreslist" :key="index">
							<image :src="item.image" class="bookImg"></image>
							<view class="info">
								<view class="omit tit">{{ item.title }}</view>
								<view class="omit" v-if="item.state == 1 || item.state == 2">预取书点：{{ item.name }}</view>
								<view class="omit">条形码：{{ item.barcode }}</view>
								<view class="subState">
									<view class="mainCol" v-if="item.state == 0">已取消预约</view>
									<view class="subSucceed" v-if="item.state == 1">
										<view class="mainCol">预约成功</view>
										<view class="buleHollowBtn" @click="cancel(item)">取消预约</view>
									</view>
									<view class="mainCol" v-if="item.state == 2">分配状态</view>
									<view class="mainCol" v-if="item.state == 3">成功取书</view>
									<view class="mainCol" v-if="item.state == 4">超期未取</view>
									<view class="mainCol" v-if="item.state == 5">取消回库</view>
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
			// tab栏
			tabArr: ['书籍'],
			currentIndex: 0, // 选择tab栏下标
			pageCurrent: 1,
			pageSize: 10,
			searchreslist: [],
			gjSearch: null,
			jpSearch: null,
			hasMoreData: true,
			loadState: false
		};
	},
	onLoad() {
		this.tabClick(this.currentIndex);
	},
	methods: {
		// 去预约
		toBookSub() {
			uni.navigateTo({
				url: 'bookSub'
			});
		},

		// 点击tab栏
		tabClick(index) {
			this.currentIndex = index;
			if (this.currentIndex == 0) {
				this.getReservation();
			} else if (this.currentIndex == 1) {
				this.gj_search(0);
			} else if (this.currentIndex == 2) {
				this.gj_search(1);
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
		},
		getReservation() {
			this.loadState = false;
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize
			};
			app.basic.getAjaxData(com.query('getReservation'), pageDTO, 'POST').then(res => {
				this.loadState = true;
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
						if (list.length < this.pageSize) {
							if (list.length == 0) {
								uni.showToast({
									icon: 'none',
									title: '没有更多数据'
								});
							} else {
								this.searchreslist = this.searchreslist.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.searchreslist = this.searchreslist.concat(list);
							this.hasMoreData = true;
							this.pageCurrent = this.pageCurrent + 1;
						}
					}
				}
			});
		},

		//古籍家谱预约查询
		gj_search(type) {
			var that = this;
			var param = {
				type: type
			};
			app.basic.getAjaxData(com.enquiries('gj_search'), param, 'GET').then(res => {
				if (res.data.status == true) {
					if (type == 0) {
						this.gj_search = res.data.data;
					}
					if (type == 1) {
						this.jp_search = res.data.data;
					}
				}
			});
		},
		/**
		 * 古籍家谱预约取消
		 */
		cancel_order(id, type) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定取消预约吗？',
				confirmColor: '#71AE91',
				success: function(sm) {
					if (sm.confirm) {
						var param = {
							id: id
						};
						app.basic.getAjaxData(com.enquiries('gj_cancel'), param, 'GET').then(res => {
							if (res.data.status == true) {
								uni.showToast({
									title: '取消成功',
									icon: 'success'
								});
								that.gj_search(type);
							} else {
								uni.showToast({
									title: 'res.data.msg',
									icon: 'none'
								});
							}
						});
					} else if (sm.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		/**
		 * 古籍家谱预约未通过删除
		 */
		del_order(id, type) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定删除吗？',
				confirmColor: '#71AE91',
				success: function(sm) {
					if (sm.confirm) {
						var param = {
							id: id
						};
						app.basic.getAjaxData(com.enquiries('gj_cancel'), param, 'GET').then(res => {
							if (res.data.status == true) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								});
								that.gj_search(type);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						});
					} else if (sm.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		/**
		 * 古籍家谱预约修改
		 */
		update_order(id, type) {
			var that = this;
			var param = {
				id: id
			};
			app.basic.getAjaxData(com.enquiries('getOrderById'), param, 'GET').then(res => {
				if (res.data.status == true) {
					var odata = {
						bookId: res.data.data.bookId,
						bookName: res.data.data.bookName,
						idCardBack: res.data.data.idCardBack,
						idCardFront: res.data.data.idCardFront,
						cardNumber: res.data.data.cardNumber,
						cardName: res.data.data.cardName,
						unitMaterial: res.data.data.unitMaterial,
						applicationReason: res.data.data.applicationReason,
						id: res.data.data.id,
						applicationTime: res.data.data.applicationTime,
						approvalState: res.data.data.approvalState
					};
					if (type == 0) {
						// uni.setStorageSync('ancient_order', odata);
						// uni.navigateTo({
						// 	url: '../ancient/affirm_sub'
						// });
					}
					if (type == 1) {
						// uni.setStorageSync('familytree_order', odata);
						// uni.navigateTo({
						// 	url: '../familytree/affirm_sub'
						// });
					}
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},
		// 取消预约
		cancel(e) {
			var that = this;
			// 给出确认提示框
			uni.showModal({
				title: '提示',
				content: '确定要取消预约这本书吗？',
				confirmColor: '#71AE91',
				success: function(res) {
					// wx.showLoading({
					//   title: '请稍后...',
					// })
					if (res.confirm) {
						var cancelreserve = {
							rdid: e.rdid,
							barcode: e.barcode
						};
						app.basic.getAjaxData(com.enquiries('cancelreserve'), cancelreserve, 'POST').then(res => {
							if (res.data.status) {
								(that.pageCurrent = 1), (that.searchreslist = []);
								// 重新加载数据
								that.getReservation();
								uni.showToast({
									title: res.data.data[0].message,
									icon: 'success',
									duration: 2000
								});
							}
						});
					}
				}
			});
		},
		scrollView() {
			if (this.hasMoreData) {
				this.tabClick(this.currentIndex);
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
.taskList .scroll-ul .scroll-li {
	width: 100%;
	text-align: center;
	padding: 36upx 0 30upx 0;
}

.subState {
	float: right;
	padding-top: 15rpx;
}

.subSucceed > view {
	display: inline-block;
}

.subSucceed > view:first-of-type {
	margin-right: 20rpx;
}
</style>
