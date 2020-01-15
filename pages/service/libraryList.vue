<template>
	<!-- 文库检索列表 -->
	<view id="bookList_det">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">检索结果</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="srhBox flex_l_c">
					<view class="srhIptBox flex_l_c">
						<text class="iconfont icon-search-line srhIcon"></text>
						<input type="text" @input="search" :value="searchWord" placeholder="搜索" />
					</view>
					<view class="mainCol srhBtn" @click="listOne">搜索</view>
				</view>
				<view class="listBox">
					<view class="flex_l_t b_b" v-for="(item, index) in bookInfoList" :key="index" @click="toLibraryDet(item)">
						<image :src="'http://fx.fxhnst.superlib.net' + item.img" class="bookImg" mode="aspectFill"></image>
						<view class="bookInfo">
							<view class="omit2 tit">{{ item.rows[0] }}</view>
							<view class="info">
								<view class="omit">{{ item.rows[1] }}</view>
								<view class="omit">{{ item.rows[2] }}</view>
								<view class="omit">{{ item.rows[3] }}</view>
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
			searchWord: '',
			bookInfoList: [],
			hasMoreData: true,
			pageCurrent: 1,
			pageSize: 10
		};
	},
	onLoad(option) {
		this.searchWord = option.searchWord;
		this.list();
	},
	methods: {
		// 获取输入的搜索值
		search: function(e) {
			console.log(e);
			this.searchWord = e.detail.value;
		},
		// 详情
		toLibraryDet(obj) {
			var particulars = obj.particulars;
			var item = obj.rows[0];
			console.log(particulars);
			console.log(item);
			uni.navigateTo({
				url: 'library_det?item=' + item + '&particulars=' + particulars
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},

		list() {
			if (this.searchWord.length == 0) {
				uni.showToast({
					title: '请输入查询内容',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			app.basic.getAjaxData(com.query('searchList'), { searchWord: this.searchWord, page: this.pageCurrent }, 'post').then(res => {
				console.log(res.data.data.librarySearches);
				if (res.data.data.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '没有更多数据'
					});
					this.result = false;
				} else {
					var list = res.data.data.librarySearches;
					if (list.length < this.pageSize) {
						if (list.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '没有更多数据'
							});
						} else {
							this.bookInfoList = this.bookInfoList.concat(list);
						}
						this.hasMoreData = false;
					} else {
						this.bookInfoList = this.bookInfoList.concat(list);
						this.hasMoreData = true;
						this.pageCurrent = this.pageCurrent + 1;
					}
				}
			});
		},

		listOne: function() {
			(this.bookInfoList = []), (this.pageCurrent = 1), this.list();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.list();
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

#bookList_det .listBox .bookInfo {
	height: auto;
}
</style>
