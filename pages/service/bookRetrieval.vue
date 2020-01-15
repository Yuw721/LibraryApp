<template>
	<!-- 书籍检索 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">书籍检索</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="srhBox flex_l_c">
				<view class="srhIptBox flex_l_c">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" @input="search" placeholder="搜索…" focus="true" class="srhIpt" @click="forSrh" :value="searchText" />
				</view>
				<view class="mainCol srhBtn" @click="searchBtn">{{ srhBtn }}</view>
			</view>

			<!-- 默认最初显示 -->
			<view v-if="defShow">
				<image class="searchImg" src="../../static/imgs/retrieval.png"></image>
				<view class="text_c"><view class="linkBtn" @click="toAdvancedSrh">高级检索</view></view>
			</view>

			<!-- 历史搜索 -->
			<view class="pullDownBox" v-if="hisShow">
				<view class="flex_b_c b_b" v-for="(item, index) in list" :key="index">
					<view @click.stop="getQueryName(item.queryName)">
						<text class="iconfont icon-shizhong tiemIcon"></text>
						<text>{{ item.queryName }}</text>
					</view>
					<view class="iconfont icon-guanbi1" @click="deleteOne(item.queryName)"></view>
				</view>
				<view class="mainCol clearBtn" @click="deleteAll">清空历史记录</view>
			</view>

			<!-- 搜索联想 -->
			<view class="pullDownBox" v-if="conShow">
				<view class="flex_b_c b_b" v-for="(item, index) in list2" :key="index">
					<view @click.stop="getQueryName(item.source.title)">
						<text class="iconfont icon-shizhong tiemIcon"></text>
						<text>{{ item.source.title }}</text>
					</view>
				</view>
				<view class="text_c"><text class="linkBtn" @click="toAdvancedSrh">高级检索</text></view>
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
			srhBtn: '取消',
			defShow: true, // 默认显示
			hisShow: false, // 历史搜索显示
			conShow: false, // 搜索联想显示
			searchText: '',
			fieldNames: ['title'],
			list: [],
			list2: []
		};
	},
	onLoad() {},
	methods: {
		getHistoryList: function() {
			app.basic.getAjaxData(com.enquiries('listQueryHistory'), '', 'GET').then(res => {
				this.list = res.data.data;
			});
		},
		// 搜索历史、联想
		getQueryName(obj) {
			this.searchFun(obj);
			this.srhBtn = '取消';
			this.hisShow = false;
			this.defShow = false;
			this.conShow = false;
		},

		// 获取搜索值
		search: function(e) {
			console.log(e.detail.value);
			this.searchText = e.detail.value;
			if (e.detail.value == '') {
				this.srhBtn = '取消';
				this.hisShow = true;
				this.defShow = false;
				this.conShow = false;
			} else {
				this.srhBtn = '搜索';
				this.hisShow = false;
				this.defShow = false;
				this.conShow = true;
				var listQueryBook = {
					pageCurrent: 1,
					pageSize: 10,
					condition: this.searchText,
					fieldNames: this.fieldNames
				};
				app.basic.getAjaxData(com.enquiries('listQueryBook'), listQueryBook, 'POST').then(res => {
					if (res.data.data.totalCount == 0) {
						this.result = false;
					} else {
						this.list2 = res.data.data.list;
					}
				});
			}
		},

		// 点击搜索按钮
		searchBtn: function() {
			if (this.srhBtn == '取消') {
				this.hisShow = false;
				this.defShow = true;
			} else {
				this.searchFun(this.searchText);
			}
		},

		searchFun(text) {
			uni.setStorageSync('fieldNames', this.fieldNames);
			var insertQueryHistory = {
				queryName: text
			};
			app.basic.getAjaxData(com.enquiries('insertQueryHistory'), insertQueryHistory, 'GET').then(res => {
				// uni.redirectTo({
				//   url: 'result?searchText=' + text + '&state=1',
				// })
				uni.navigateTo({
					url: 'bookSrhResults?searchText=' + text
				});
			});
		},
		// 点击搜索框
		forSrh() {
			this.getHistoryList();
			this.hisShow = true;
			this.defShow = false;
			this.conShow = false;
		},
		// 高级检索
		toAdvancedSrh() {
			uni.navigateTo({
				url: 'advancedSrh'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
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
			});
		}
	}
};
</script>

<style>
.mainCom {
	width: 100%;
	padding-top: 300upx;
}

.searchImg {
	display: block;
	margin: 108upx auto 60upx;
	width: 202upx;
	height: 158upx;
}
</style>
