<template>
	<!-- 高级检索 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">高级检索</view>
			</view>
		</view>
		<view class="mainCom">
			<view>
				<view class="srhTit">检索方式：</view>
				<view class="srhWord" :class="curNum == index ? 'wordAct' : ''" v-for="(item, index) in srhWord" :key="index" @click="selWord(index, item.englishName)">
					{{ item.name }}
				</view>
			</view>
			<view class="srhBox flex_l_c">
				<view class="srhIptBox flex_l_c">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" @input="search" placeholder="搜索…" class="srhIpt" :value="searchText" />
				</view>
				<view class="mainCol srhBtn" @click="searchBtn">搜索</view>
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
			fieldNames: ['title', 'author', 'publisher', 'classno', 'isbn'],
			srhWord: [
				{
					name: '任意词',
					state: false,
					englishName: ['title', 'author', 'publisher', 'classno', 'isbn']
				},
				{
					name: '书名',
					state: false,
					englishName: ['title']
				},
				{
					name: '作者',
					state: false,
					englishName: ['author']
				},
				{
					name: '出版社',
					state: false,
					englishName: ['publisher']
				},
				{
					name: '索书号',
					state: false,
					englishName: ['classno']
				},
				{
					name: 'ISBN',
					state: false,
					englishName: ['isbn']
				}
			],
			curNum: 0,
			searchText: ''
		};
	},
	onLoad() {},
	methods: {
		// searchBtn() {
		// 	uni.navigateTo({
		// 		url: 'bookSrhResults'
		// 	});
		// },
		selWord(index, name) {
			console.log(name);
			this.curNum = index;
			this.fieldNames = name;
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		// 获取搜索值
		search(e) {
			console.log(e.detail.value);
			this.searchText = e.detail.value;
		},

		searchBtn() {
			if (this.searchText == null || this.searchText == '') {
				uni.showToast({
					title: '请输入搜索内容!',
					icon: 'none'
				});
				return;
			}
			uni.setStorageSync('fieldNames', this.fieldNames);
			var insertQueryHistory = {
				queryName: this.searchText
			};
			app.basic.getAjaxData(com.enquiries('insertQueryHistory'), insertQueryHistory, 'GET').then(res => {
				uni.navigateTo({
					url: 'bookSrhResults?searchText=' + this.searchText
				});
			});
		}
	}
};
</script>

<style>
.srhBox {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
	font-size: 30upx;
	z-index: 2;
	padding: 40upx 0;
}

.srhTit {
	font-size: 30rpx;
	padding: 20rpx 0;
}

.srhWord {
	display: inline-block;
	background: #efefef;
	color: #171717;
	padding: 15rpx 56rpx;
	margin: 0 24rpx 20rpx 0;
	border-radius: 56rpx;
	font-size: 24rpx;
}

.wordAct {
	color: #fff;
	background: #197cb7;
}

.selItem {
	padding: 22rpx 0;
	font-size: 30rpx;
}
.srhBox .srhIptBox {
	width: 560upx;
}
</style>
