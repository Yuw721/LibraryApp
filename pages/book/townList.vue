<template>
	<!-- 古村古镇列表 -->
	<view class="town">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">{{ title }}</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="dramaItem flex_l_c" v-for="(item, index) in dataList" :key="index" @click="toDramaDet(item)">
					<view class="lineBar"></view>
					<view class="info">
						<view class="omit tit">{{ item.source.title }}</view>
						<view class="omit addr">{{ item.source.description }}</view>
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
			type: 0,
			title: '',
			name: '',
			fieldName: '',
			dataList: [],
			pageCurrent: 1,
			pageSize: 10,
			hasMoreData: true
		};
	},
	onLoad(option) {
		this.name = uni.getStorageSync('name');
		if (option.type) {
			this.type = option.type;
			if (option.type == 0) {
				this.title = '古村';
				this.fieldName = '文化名村(寨)';
			}
			if (option.type == 1) {
				this.title = '古镇';
				this.fieldName = '文化名镇';
			}
			if (option.type == 2) {
				this.title = '古名居';
				this.fieldName = '居住建筑';
			}
		}
		this.getWcmmetatableorganization();
	},
	methods: {
		//获取古村镇信息列表
		getWcmmetatableorganization: function() {
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				fieldNames: ['title'],
				fieldName: this.fieldName,
				condition: this.name
			};
			app.basic.getAjaxData(com.enquiries('getWcmmetatableorganization'), pageDTO, 'POST').then(res => {
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
								this.dataList = this.dataList.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.dataList = this.dataList.concat(list);
							this.hasMoreData = true;
							this.pageCurrent = this.pageCurrent + 1;
						}
					}
				}
			});
		},
		// 戏剧详情
		toDramaDet(obj) {
			uni.setStorageSync('characterInfo', obj);
			uni.navigateTo({
				url: 'drama_det?type=3'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getWcmmetatableorganization();
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

<style></style>
