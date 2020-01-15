<template>
	<!-- 视频列表 -->
	<view id="bookDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">视频列表</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="videoBox">
					<view class="twoBox">
						<view  v-for="(item, index) in videoList" :key="index" @click="toVideoDet(item)">
							<view class="videoImgBox">
								<view class="iconfont icon-bofang playIcon"></view>
								<image
									:src="item.source.imagepath"
									class="videoImg"
								></image>
							</view>
							<view class="omit tit">{{item.source.title}}</view>
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
			name: '',
			parentname: '',
			pageCurrent: 1,
			pageSize: 10,
			videoList: [],
			result: true, //是否有搜索结果  true：有  false: 无
			hasMoreData: true
		};
	},
	onLoad(option) {
		this.name = uni.getStorageSync('name');
		this.parentname = uni.getStorageSync('parentname');
		console.log(this.name);
		console.log(this.parentname);
		this.getVideo();
	},
	methods: {
		// 视频详情
		toVideoDet(item) {
			console.log(item)
			uni.setStorageSync("videoInfo", item);
			uni.navigateTo({
				url: 'video_det?type=1'
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		// 获取视频信息
		getVideo() {
			var pageDTO = {
				pageCurrent: this.pageCurrent,
				pageSize: this.pageSize,
				fieldNames: ['title'],
				fieldName: this.parentname,
				condition: this.name
			};
			app.basic.getAjaxData(com.enquiries('getVideo'), pageDTO, 'POST').then(res => {
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
								this.videoList = this.videoList.concat(list);
							}
							this.hasMoreData = false;
						} else {
							this.videoList = this.videoList.concat(list);
							(this.hasMoreData = true), (this.pageCurrent = this.pageCurrent + 1);
						}
					}
				}
			});
		},
		scrollView() {
			if (this.hasMoreData) {
				this.getVideo();
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
