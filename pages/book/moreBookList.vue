<template>
	<!-- 书单列表 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">{{title}}</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="p_b30" v-for="(item, index) in bookList" :key="item.id" @click="toBookListDet(item.id)">
				<view class="bookListItem flex_l_t">
					<view class="flex_l_c bookBox">
						<view class="bookImgBox">
							<image :src="item.image" class="bookImg" mode='aspectFit'></image>
						</view>
						<view class="line1"></view>
						<view class="line2"></view>
					</view>
					<view class="flex_c_b bookInfo">
						<view>
							<view class="bookTit omit2">{{item.name}}</view>
							<view class="flex_l_c">
								<image :src="item.headPortrait" class="authorImg"></image>
								<text class="authorName">{{item.nickname}}</text>
							</view>
						</view>
						<view class="flex_l_c bookNumBox">
							<view class="p_r20 flex_l_c">
								<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
								<text class="m_l10">{{item.bookSize}}本书</text>
							</view>
							<view class="flex_l_c">
								<text class="iconfont icon-zan"></text>
								<text class="m_l10">{{item.collectionCount}}人</text>
							</view>
						</view>
					</view>
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
				title: '',
				type: null,
				bookList: [],
			};
		},
		onLoad(option) {
			this.type = option.type;
			if (option.type == 0) {
				this.title = '我的书单';
				this.getBookList();
			} else if (option.type == 1) {
				this.title = '收藏书单';
				this.getFollowBookList();
			}
		},
		methods: {
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取我的书单
			getBookList() {
				app.basic.getAjaxData(com.enquiries('getBookList'), '', "GET").then(res => {
					this.bookList = res.data.data;
				})
			},
			//获取我收藏的书单
			getFollowBookList() {
				app.basic.getAjaxData(com.enquiries('getFollowBookList'), '', "GET").then(res => {
					this.bookList = res.data.data;
				})
			},
			//跳转书籍详情
			toBookListDet(id) {
				uni.navigateTo({
					url: 'bookList_det?id=' + id
				})
			},
		}
	};
</script>

<style></style>
