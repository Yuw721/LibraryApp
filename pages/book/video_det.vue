<template>
	<!-- 视频详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">视频详情</view>
				<text class="iconfont icon-fenxiang shareBtn"></text>
			</view>
		</view>
		<view class="mainCom">
			<video
				id="myVideo"
				:src="playSrc"
				:autoplay="autoplayState"
				objectFit="fill"
				play-btn-position="center"
				show-fullscreen-btn="true"
				show-center-play-btn="true"
				enable-progress-gesture="true"
				show-play-btn="true"
				:initial-time="initialTime"
				@ended="videoEnd"
				@play="eventhandle"
				direction="-90"
				show-mute-btn="true"
				:title="type == 1 ? videoInfo.source.title : videoInfo.title"
				enable-play-gesture="true"
				@timeupdate="bindtimeupdate"
			></video>
			<view class="infoBox" v-if="type == 1">
				<view class="videoTit">{{ videoInfo.source.title }}</view>
				<view class="info">
					<text>类型：{{ videoInfo.source.typename }}</text>
					<!-- <text>演员：张三</text> -->
					<text>年代：{{ videoInfo.source.createtime }}</text>
				</view>
				<view class="info" v-if="videoInfoContent != '' && videoInfoContent != null">简介：{{ videoInfoContent }}</view>
			</view>

			<view class="infoBox" v-if="type == 2">
				<view class="videoTit">{{ videoInfo.title }}</view>
				<view class="info">
					<text>类型：{{ videoInfo.typename }}</text>
					<!-- <text>演员：张三</text> -->
					<text>年代：{{ videoInfo.createtime }}</text>
				</view>
				<view class="info" v-if="videoInfoContent != '' && videoInfoContent != null">简介：{{ videoInfoContent }}</view>
			</view>

			<view class="episode b_b20">
				<view class="infoTit">剧集</view>
				<view class="noFixed">
					<scroll-view class="scroll-ul" scroll-x>
						<view
							v-for="(item, index) in contentList"
							:key="index"
							@click="toVideoPlay(item)"
							:class="curIndex == item.part ? 'episodeItem episodeCur' : 'episodeItem'"
						>
							{{ item.part }}
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="videoBox" v-if="videoList.length > 0">
				<view class="flex_b_c plateBox p_b40">
					<view class="plateTitBox">
						<view>其他视频</view>
						<view class="plateLine"></view>
					</view>
					<view class="allBtn" @click="toVideoList">全部</view>
				</view>
				<view class="twoBox">
					<view v-for="(item, index) in videoList" :key="index" @click="toVideoDet(item)">
						<view class="videoImgBox">
							<view class="iconfont icon-bofang playIcon"></view>
							<image :src="item.source.imagepath" class="videoImg"></image>
						</view>
						<view class="omit2 tit">{{ item.source.title }}</view>
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
			playSrc: '',
			videoInfo: null,
			contentList: [],
			videoInfoContent: '',
			autoplayState: false,
			reasonIndex: 0,
			videoContext: null,
			networkType: '',
			type: '',
			initialTime: 0,
			timeupdate: 0,
			curIndex: 1,
			videoList: [],
			parentname: ''
		};
	},
	onLoad(option) {
		if (uni.getStorageSync('reasonIndex') != null && uni.getStorageSync('reasonIndex') != '') {
			this.reasonIndex = uni.getStorageSync('reasonIndex');
		}
		if (this.reasonIndex == 0) {
			var that = this;
			uni.getNetworkType({
				success: function(res) {
					console.log(res);
					that.networkType = res.networkType;
					if (that.networkType == 'wifi') {
						that.autoplayState = true;
					}
				}
			});
		} else {
			this.autoplayState = true;
		}
		console.log(option.type);
		this.type = option.type;
		if (this.type == 1) {
			this.videoInfo = uni.getStorageSync('videoInfo');
			this.contentList = JSON.parse(uni.getStorageSync('videoInfo').source.content);
			this.getVideoFile(this.contentList[0].vid);
			this.parentname = this.videoInfo.source.parentname;
		} else if (this.type == 2) {
			this.videoInfo = uni.getStorageSync('videoInfo');
			this.contentList = JSON.parse(uni.getStorageSync('videoInfo').content);
			this.curIndex = parseInt(uni.getStorageSync('videoInfo').lastNumber);
			this.playSrc = uni.getStorageSync('videoInfo').lastFile;
			this.initialTime = uni.getStorageSync('videoInfo').timeupdate;
			if (
				this.videoInfo.typename == '京剧' ||
				this.videoInfo.typename == '高甲戏' ||
				this.videoInfo.typename == '晋剧' ||
				this.videoInfo.typename == '话剧' ||
				this.videoInfo.typename == '双奖好戏' ||
				this.videoInfo.typename == '常德丝弦' ||
				this.videoInfo.typename == '闽剧' ||
				this.videoInfo.typename == '越剧' ||
				this.videoInfo.typename == '歌舞剧' ||
				this.videoInfo.typename == '梨园戏' ||
				this.videoInfo.typename == '祁东渔鼓' ||
				this.videoInfo.typename == '其他戏曲'
			) {
				this.parentname = '戏曲天地';
			} else if (this.videoInfo.typename == '纪念场馆' || this.videoInfo.typename == '湖南历史' || this.videoInfo.typename == '湖湘人物') {
				this.parentname = '湖湘文化';
			} else {
				this.parentname = '地方戏剧';
			}
		}
		this.getVideoContent();
		this.getVideo(this.parentname);
	},
	onReady() {
		this.videoContext = uni.createVideoContext('myVideo'); //视频管理组件
	},
	onHide() {
		this.saveUserPlayHistory();
	},
	onUnload() {
		this.saveUserPlayHistory();
	},
	methods: {
		// 视频列表
		toVideoList() {
			if (this.type == 1) {
				uni.setStorageSync('name', this.videoInfo.source.title);
			} else if (this.type == 2) {
				uni.setStorageSync('name', this.videoInfo.title);
			}
			uni.setStorageSync('parentname', this.parentname);
			uni.navigateTo({
				url: 'videoList'
			});
		},
		// 视频详情
		toVideoDet(item) {
			console.log(item);
			uni.setStorageSync('videoInfo', item);
			uni.navigateTo({
				url: 'video_det?type=1'
			});
		},
		// 返回上一页
		backBtn() {
			// this.saveUserPlayHistory()
			uni.navigateBack();
		},

		getVideoContent() {
			var param = '';
			if (this.type == 1) {
				var param = {
					seriesSourceId: this.videoInfo.source.id
				};
			} else if (this.type == 2) {
				var param = {
					seriesSourceId: this.videoInfo.vId
				};
			}

			app.basic.getAjaxData(com.enquiries('getVideoContent'), param, 'GET').then(res => {
				if (res.data.status == true) {
					this.videoInfoContent = res.data.data.content;
				}
				console.log(this.videoInfoContent);
			});
		},

		getVideoFile(obj) {
			this.initialTime = 0;
			var param = {
				contentsourceID: obj
			};
			app.basic.getAjaxData(com.enquiries('getVideoFile'), param, 'GET').then(res => {
				console.log(res);
				if (res.data.status == true) {
					this.playSrc = res.data.data.srcFileName;
				}
			});
		},
		toVideoPlay(obj) {
			console.log(obj);
			this.curIndex = parseInt(obj.part);
			this.getVideoFile(obj.vid);
		},

		videoEnd(res) {
			// 视频播放结束后执行的方法

			var that = this;

			console.log(that.curIndex);
			console.log(that.contentList.length);
			if (that.curIndex == that.contentList.length) {
				uni.showToast({
					title: '已播放完成',

					icon: 'loading',

					duration: 2500,

					mask: true
				});

				this.videoContext.pause(); //暂停
			} else {
				console.log('播放下一个视频');
				this.videoPlay();
			}
		},

		videoPlay() {
			var that = this;

			var videolLength = that.contentList.length;

			that.getVideoFile(that.contentList[that.curIndex].vid);

			that.curIndex = parseInt(that.curIndex) + 1;
		},
		eventhandle() {
			if (this.networkType != 'wifi' && this.reasonIndex == 0) {
				var that = this;
				uni.showModal({
					title: '温馨提示',
					content: '当前在非WIFI下是否继续播放',
					confirmColor: '#71AE91',
					success: function(res) {
						console.log(res);
						if (res.confirm) {
							that.videoContext.play(); //播放
							that.networkType = 'wifi';
						} else {
							that.videoContext.pause(); //暂停
						}
					}
				});
			}
		},
		bindtimeupdate(res) {
			if (parseInt(res.detail.currentTime) > 1) {
				this.timeupdate = parseInt(res.detail.currentTime) - 1;
			}
		},
		// 获取视频信息
		getVideo(obj) {
			var pageDTO = {
				pageCurrent: 1,
				pageSize: 4,
				fieldNames: ['title'],
				fieldName: obj,
				condition: this.type == 1 ? this.videoInfo.source.title : this.videoInfo.title
			};
			app.basic.getAjaxData(com.enquiries('getVideo'), pageDTO, 'POST').then(res => {
				uni.hideToast();
				if (res.data.status == true) {
					this.videoList = res.data.data.list;
				}
			});
		},

		// 保存播放历史
		saveUserPlayHistory: function() {
			var param = '';
			if (this.type == 1) {
				param = {
					vId: this.videoInfo.source.id,
					title: this.videoInfo.source.title,
					createtime: this.videoInfo.source.createtime,
					content: this.videoInfo.source.content,
					typename: this.videoInfo.source.typename,
					lastFile: this.playSrc,
					lastNumber: this.curIndex,
					imagepath: this.videoInfo.source.imagepath,
					timeupdate: this.timeupdate
				};
			} else if (this.type == 2) {
				param = {
					vId: this.videoInfo.vId,
					title: this.videoInfo.title,
					createtime: this.videoInfo.createtime,
					content: this.videoInfo.content,
					typename: this.videoInfo.typename,
					lastFile: this.playSrc,
					lastNumber: this.curIndex,
					imagepath: this.videoInfo.imagepath,
					timeupdate: this.timeupdate
				};
			}
			app.basic.getAjaxData(com.enquiries('saveUserPlayHistory'), param, 'POST').then(res => {});
		}
	}
};
</script>

<style>
.mainCom {
	width: 100%;
}

.mainCom video {
	width: 100%;
	height: 420upx;
}

.infoBox {
	padding: 5%;
	width: 90%;
}

.infoTit,
.videoTit {
	color: #2e2e2e;
	font-size: 28upx;
	font-weight: bold;
	padding: 10upx 0;
}

.videoTit {
	font-size: 34upx;
}

.info {
	color: #b5b5b5;
	font-size: 28upx;
	padding-top: 20upx;
}

.info text {
	padding-right: 20upx;
}

.episode {
	padding-left: 5%;
	padding-bottom: 40upx;
}

.episodeItem {
	display: inline-block;
	width: 92upx;
	height: 92upx;
	text-align: center;
	line-height: 92upx;
	background: #f3f3f3;
	box-shadow: 0px 0px 10px 1px #f3f1f1;
	margin: 24upx 14upx;
	border-radius: 10upx;
	color: #666666;
	font-size: 30upx;
}

.episodeCur {
	background: #197cb7;
	box-shadow: 0px 0px 10px 1px #b1ddf6;
	color: #fff;
}

.videoBox {
	width: 90%;
	margin: 40upx auto;
}
</style>
