<template>
	<!-- 搜索结果 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">搜索结果</view>
			</view>
		</view>
		<view class="mainCom">
			<!-- 搜索无结果 -->
			<view class="warmPrompt" v-if="list.length <= 0 && loadState">
				<image src="../../static/imgs/search.png" class="srhImg"></image>
				<view class="txt">搜索不到任何结果哦</view>
				<view class="text_c"><text class="linkBtn" @click="toAdvancedSrh">高级检索</text></view>
			</view>
			<view>
				<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
					<view class="flex_b_c filtrateBox" v-if="list.length > 0 && loadState">
						<view v-for="(item, index) in filtrateList" :key="index" class="buleHollowBtn" :class="orderStatus == index ? 'actHollowBtn' : ''" @click="query(index)">
							{{ item.name }}
						</view>
					</view>
					<view v-for="(item, index) in list" :key="index">
						<view class="flex_l_c infoItem" @click="toBookDet(item.source)">
							<image class="bookImg" :src="item.source.bookreptile.coverUrl" mode="aspectFit"></image>
							<view class="info">
								<view class="flex_b_c">
									<view class="tit omit2">{{ item.source.title }}</view>
									<view class="buleHollowBtn">在馆信息</view>
								</view>
								<view class="omit" v-if="item.source.author != null">作者：{{ item.source.author }}</view>
								<view class="omit" v-if="item.source.pubdate != null">出版日期：{{ item.source.pubdate }}</view>
								<view class="omit" v-if="item.source.publisher != null">出版社：{{ item.source.publisher }}</view>
								<view class="omit" v-if="item.source.typename != null">文献类型：{{ item.source.typename }}</view>
								<view class="omit" v-if="item.source.classno != null">索书号：{{ item.source.classno }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
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
			orderStatus: 0,
			orderStr: '',
			searchText: '',
			filtrateList: [
				{
					name: '默认',
					value: ''
				},
				{
					name: '借阅量',
					value: 'ordersum'
				},
				{
					name: '出版时间',
					value: 'pubdate'
				}
			],
			pageCurrent: 1,
			pageSize: 10,
			curIndex: 0,
			hasMoreData: true,
			loadState: false,
			list: []
		};
	},
	onLoad(option) {
		this.searchText = option.searchText;
		this.getList();
	},
	methods: {
		getList() {
			this.loadState = false;
			var findBook = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				condition: this.searchText,
				fieldNames: uni.getStorageSync('fieldNames'),
				orderStr: this.orderStr
			};
			app.basic.getAjaxData(com.enquiries('findBook'), findBook, 'POST').then(res => {
				this.loadState = true;
				if (res.data.data.totalCount == 0) {
					this.result = false;
				} else {
					var list = res.data.data.list;
					if (list.length < this.pageSize) {
						if (list.length === 0) {
							uni.showToast({
								icon: 'none',
								title: '没有更多数据'
							});
						} else {
							this.list = this.list.concat(list);
						}
						this.hasMoreData = false;
					} else {
						this.list = this.list.concat(list);
						this.hasMoreData = true;
						this.pageCurrent = this.pageCurrent + 1;
					}
				}
			});
		},

		// 书籍详情
		toBookDet(obj) {
			console.log(obj);
			uni.setStorageSync('bookInfoDetail', obj);
			uni.navigateTo({
				url: '../book/book_det?id=' + obj.bookrecno
			});
		},
		query(index) {
			this.orderStatus = index;
			this.orderStr = this.filtrateList[index].value;
			this.pageCurrent = 1;
			this.list = [];
			this.getList();
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getList();
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
.filtrateBox {
	padding: 40upx 0 10upx;
}

.filtrateBox > view {
	width: 30%;
}

.filtrateBox .actHollowBtn {
	background: #197cb7;
	color: #fff;
}

.infoItem .buleHollowBtn {
	width: 139upx;
	height: 43upx;
	line-height: 43upx;
	border-radius: 24upx;
}
.infoItem .info .tit {
	width: 290upx;
}
</style>
