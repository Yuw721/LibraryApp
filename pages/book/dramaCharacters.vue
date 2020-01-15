<template>
	<!-- 戏剧人物列表 -->
	<view class="characters">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">戏剧人物</view>
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
				<view class="threeBox knowledgeInfo">
					<view class="item" v-for="(item, index) in figureList" :key="index" @click="toDramaDet(item)">
						<view><image :src="item.source.picurl" class="headImg"></image></view>
						<view class="omit">{{ item.source.dctitle }}</view>
						<view class="omit">（{{ item.source.dcdates }}-{{ item.source.dcdatee }}）</view>
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
					name: '演员'
				},
				{
					id: 2,
					name: '演奏者'
				},
				{
					id: 3,
					name: '编剧'
				},
				{
					id: 4,
					name: '舞美灯光'
				},
				{
					id: 5,
					name: '导演'
				},
				{
					id: 6,
					name: '戏剧研究者'
				},
				{
					id: 7,
					name: '作曲'
				},
				{
					id: 8,
					name: '戏剧活动家'
				},
				{
					id: 9,
					name: '票友'
				}
			],
			currentIndex: 0, // 选择tab栏下标
			condition: '',
			pageCurrent: 1,
			pageSize: 15,
			figureList: [],
			hasMoreData: true
		};
	},
	onLoad() {
		this.condition = uni.getStorageSync('name');
		this.getFigure();
	},
	methods: {
		// 获取文摘戏剧知识信息
		getFigure: function() {
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				fieldNames: ['dctitle'],
				condition: this.condition,
				fieldName: this.tabArr[this.currentIndex].name
			};
			app.basic.getAjaxData(com.enquiries('getFigure'), pageDTO, 'POST').then(res => {
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
								this.figureList = this.figureList.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.figureList = this.figureList.concat(list);
							this.hasMoreData = true;
							this.pageCurrent = this.pageCurrent + 1;
						}
					}
				}
			});
		},
		// 戏剧详情
		toDramaDet(obj) {
			uni.setStorageSync('characterInfo',obj)
			uni.navigateTo({
				url: 'drama_det?type=1'
			});
		},
		// 点击tab栏
		tabClick(index) {
			this.currentIndex = index;
			this.pageCurrent = 1;
			this.figureList = [];
			this.getFigure();
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getFigure();
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
.knowledgeInfo {
	padding: 120upx 0 0;
}
.threeBox > view {
	height: 268upx;
}
</style>
