<template>
	<!-- 消息中心 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">消息中心</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="warmPrompt" v-if="list.length <= 0 && loadState">
				<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
				<view class="txt">亲，您暂无消息哦。</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
				<view class="flex_t_b msgItem" v-for="(item, index) in list" :key="index" @click="toMsgDet(item.id)">
					<view class="flex_l_t">
						<view class="dot" v-if="item.readStatus == 2"></view>
						<view>
							<view class="infoTit omit">{{ item.title }}</view>
							<rich-text :nodes="item.content"></rich-text>
						</view>
					</view>
					<view class="miniWord">{{ item.createDate }}</view>
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
			pageCurrent: 1,
			pageSize: 10,
			list: [],
			hasMoreData: true,
			loadState: false
		};
	},
	onLoad() {
		this.search();
	},
	onShow() {
		
		
	},
	methods: {
		toMsgDet(id) {
			uni.redirectTo({
				url: 'message_det?mail=' + id
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		search: function() {
			var that = this;
			that.loadState = false;
			let param = {
				pageCurrent: that.pageCurrent,
				pageSize: that.pageSize
			};
			app.basic.getAjaxData(com.notification('selectMailList'), param, 'GET').then(res => {
				that.loadState = true;
				if (res.data.status == true) {
					if (res.data.total == 0) {
						that.result = false;
					} else {
						var list = res.data.data.records;
						console.log(res.data.data.records);
						if (list.length < that.pageSize) {
							if (list.length === 0) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '没有更多数据'
								// });
							} else {
								for (var i = 0; i < list.length; i++) {
									if (list[i].content == null) {
										list[i].content = '';
									}
									var content=that.removeHTMLTag(list[i].content);
									list[i].content =content.length<=10?content:content.substr(0, 10)+"...";
								}
								that.list = that.list.concat(list);
							}
							that.hasMoreData = false;
						} else {
							for (var i = 0; i < list.length; i++) {
								if (list[i].content == null) {
									list[i].content = '';
								}
								var content=that.removeHTMLTag(list[i].content);
								list[i].content =content.length<=10?content:content.substr(0, 10)+"...";
							}
							that.list = that.list.concat(list);
							that.hasMoreData = true;
							that.pageCurrent = that.pageCurrent + 1;
						}
					}
					console.log(that.list);
				}
			});
		},
		/*移除HTML标签代码*/
		  removeHTMLTag(str) {
		    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
		    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
		    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		    str = str.replace(/ /ig, ''); //去掉 
		    return str;
		  },
		scrollView() {
			if (this.hasMoreData) {
				this.search();
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
.msgItem {
	border-bottom: 1upx solid #c7c7c7;
	font-size: 24upx;
	padding: 42upx 0;
	color: #999999;
}

.iconBox {
	width: 80upx;
	height: 80upx;
	text-align: center;
	line-height: 80upx;
	border-radius: 50%;
	background: linear-gradient(to top, #71ae91, #73cb60);
	margin-right: 32upx;
}

.iconBox text {
	font-size: 40upx;
	color: #fff;
}

.msgItem .infoTit {
	color: #2b2b2b;
	width: 380upx;
	padding-bottom: 10upx;
	font-size: 28upx;
}

.inform {
	color: #999999;
	width: 420upx;
	font-size: 24upx;
}

.dot {
	background: #ff3737;
	width: 20upx;
	height: 20upx;
	border-radius: 50%;
	margin: 10upx 12upx 0 0;
}

.miniWord {
	font-size: 20upx;
	color: rgba(153, 153, 153, 1);
}
</style>
