<template>
	<!-- 红色故址列表 -->
	<view class="characters">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">红色故址</view>
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
					<view class="item" v-for="(item, index) in redWcmmetatableobject" :key="index" @click="toDramaDet(item)">
						<view><image :src="item.source.picurl" class="headImg"></image></view>
						<view class="omit2">{{ item.source.dctitle }}</view>
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
					name: '革命活动旧址'
				},
				{
					id: 2,
					name: '名人故居'
				},
				{
					id: 3,
					name: '纪念场所'
				}
			],
			currentIndex: 0, // 选择tab栏下标
			pageCurrent: 1,
			pageSize: 15,
			name: '',
			redWcmmetatableobject: [],
			fieldName: '',
			hasMoreData: true
		};
	},
	onLoad(option) {
		this.currentIndex = option.type;
		this.name = uni.getStorageSync('name');
		this.getRedWcmmetatableobject();
	},
	methods: {
		// 获取自建资源红色库信息
		getRedWcmmetatableobject: function() {
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				fieldNames: ['dctitle'],
				condition: this.name,
				fieldName: this.tabArr[this.currentIndex].name
			};
			app.basic.getAjaxData(com.enquiries('getRedWcmmetatableobject'), pageDTO, 'POST').then(res => {
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
								this.redWcmmetatableobject = this.redWcmmetatableobject.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.redWcmmetatableobject = this.redWcmmetatableobject.concat(list);
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
				url: 'drama_det?type=2'
			});
		},
		// 点击tab栏
		tabClick(index) {
			this.currentIndex = index;
			this.pageCurrent = 1;
			this.redWcmmetatableobject = [];
			this.getRedWcmmetatableobject();
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getRedWcmmetatableobject();
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
	height: 288upx;
}
</style>
