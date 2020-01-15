<template>
	<!-- 戏剧知识列表 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">戏剧知识</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul" scroll-x>
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{ item.name }}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="knowledgeInfo">
					<view class="dramaItem flex_l_c" v-for="(item, index) in characterList" :key="index" @click="toDramaDet(item)">
						<image src="../../static/imgs/icon_drameBook.png" class="icon_drameBook"></image>
						<view class="omit tit">{{ item.source.dctitle }}</view>
						<view class="dot"></view>
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
			// tab栏
			tabArr: [
				{
					id: 1,
					name: '戏剧表演'
				},
				{
					id: 2,
					name: '戏剧音乐'
				},
				{
					id: 3,
					name: '舞台美术'
				},
				{
					id: 4,
					name: '演出技巧'
				},
				{
					id: 5,
					name: '演出习俗'
				},
				{
					id: 6,
					name: '其他'
				}
			],
			currentIndex: 0, // 选择tab栏下标
			condition: '',
			pageCurrent: 1,
			pageSize: 10,
			characterList: [],
			hasMoreData: true
		};
	},
	onLoad() {
		this.condition = uni.getStorageSync('name');
		this.getCharacter();
	},
	methods: {
		scrollView() {
			if (this.hasMoreData) {
				this.getCharacter();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据'
				});
			}
		},
		// 获取文摘戏剧知识信息
		getCharacter() {
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				fieldNames: ['dctitle'],
				condition: this.condition,
				fieldName: this.tabArr[this.currentIndex].name
			};
			app.basic.getAjaxData(com.enquiries('getCharacter'), pageDTO, 'POST').then(res => {
				if (res.data.status == true) {
					if (res.data.data.length == 0) {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据'
						});
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
								this.characterList = this.characterList.concat(list);
							}
							this.hasMoreDat = false;
						} else {
							this.characterList = this.characterList.concat(list);
							this.hasMoreData = true;
							this.pageCurrent = this.pageCurrent + 1;
						}
					}
				}
			});
		},
		// 戏剧详情
		toDramaDet(obj) {
			uni.setStorageSync("characterInfo", obj);
			uni.navigateTo({
				url: 'drama_det?type=0'
			});
		},
		// 点击tab栏
		tabClick(index) {
			this.characterList = [];
			this.currentIndex = index;
			this.pageCurrent = 1;
			this.getCharacter();
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.knowledgeInfo {
	padding: 120upx 0 0;
}
</style>
