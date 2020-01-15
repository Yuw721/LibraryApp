<template>
	<!-- 帮助与反馈 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">帮助与反馈</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="srhBox flex_l_c">
				<view class="srhIptBox flex_l_c">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" @input="search" :value="searchText" placeholder="搜索" class="srhIpt" @click="forSrh" />
				</view>
				<view class="mainCol srhBtn" @click="searchBtn">{{ srhBtn }}</view>
			</view>
			<!-- 历史搜索 -->
			<view class="pullDownBox" v-if="history_content">
				<view class="flex_b_c b_b" v-for="(item, index) in list" :key="index">
					<view @click="getQueryName(item.question)">
						<text class="iconfont icon-shizhong tiemIcon"></text>
						<text>{{ item.question }}</text>
					</view>
					<view class="iconfont icon-guanbi1" @click="deleteOne(item.id)"></view>
				</view>
				<view :v-if="clean_history" class="mainCol clearBtn" @click="deleteAll" v-if="list.length > 0">清空历史记录</view>
			</view>
			<view v-if="hotList">
				<view class="tit">热门问题</view>
				<view class="qusItem">
					<view v-for="(item, index) in hotQuestionList" :key="index" @click="questionInfo(item.id)">{{ item.problem }}</view>
				</view>
			</view>
			<view v-if="hotList">
				<view class="tit">常见问题</view>
				<view>
					<view class="flex_b_c problemItem" v-for="(item, index) in commonQuestionList" :key="index" @click="questionInfo(item.id)">
						<view>{{ item.problem }}</view>
						<view class="iconfont icon-you- intoIcon"></view>
					</view>
				</view>
			</view>
			<view class="flex_b_c problemItem" v-if="hotList"  @click="aboutApp">
				<view class="tit">关于APP</view>
				<view class="iconfont icon-you- intoIcon"></view>
			</view>

			<!-- 搜索有结果 -->
			<view class="resultBox" v-if="resultShow">
				<view v-for="(item, index) in resultList" :key="index" @click="questionInfo(item.source.id)">
					<view class="b_b question">{{ item.source.problem }}</view>
				</view>
			</view>
			<!-- 搜索无结果 -->
			<view class="warmPrompt" v-if="resultList.length <= 0 && resultShow">
				<image src="../../static/imgs/search.png" class="srhImg"></image>
				<view class="txt">搜索不到任何结果哦</view>
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
				srhBtn: '取消', // 搜索按钮
				hisShow: false, // 历史搜索
				resultShow: false, // 搜索结果
				searchText: '',
				list: [],
				hotQuestionList: [],
				commonQuestionList: [],
				resultList: [],
				result: true, //是否有搜索结果  true：有  false: 无
				srhIndex: 0,
				history_content: false,
				clean_history: false,
				hotList: true
			};
		},
		onLoad(option) {
			this.getCommonQuestion();
			this.getHotQuestion();
		},
		methods: {
			// 关于APP
			aboutApp() {
				uni.navigateTo({
					url: 'aboutApp'
				})
			},
			/**
			 * 删除
			 */
			deleteOne: function(id) {
				var param = {
					id: id
				};
				app.basic.getAjaxData(com.help('problem_history_del'), param, 'GET').then(res => {
					if (res.data.status == true) {
						this.search_history();
					}
				});
			},
			/**
			 * 清空
			 */
			deleteAll: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定要清空吗？',
					confirmColor: '#71AE91',
					success: function(sm) {
						if (sm.confirm) {
							app.basic.getAjaxData(com.help('problem_history_dels'), null, 'GET').then(res => {
								if (res.data.status == true) {
									that.search_history();
								}
							});
						} else if (sm.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getQueryName(obj) {
				this.searchfunc(obj);
			},
			/**
			 * 搜索方法
			 */
			searchfunc: function(text) {
				var that = this;
				var param = {
					pageCurrent: 1,
					pageSize: 10,
					condition: text
				};
				app.basic.getAjaxData(com.help('problem_search'), param, 'POST').then(res => {
					this.history_content = false;
					this.clean_history = false;
					this.resultList = [];
					this.srhBtn = '取消';
					this.hotList = false;
					this.resultShow = true;
					//无搜索结果
					this.search_history();
					this.resultList = res.data.data.list;
				});
			},
			//搜索
			searchBtn: function() {
				console.log(this.srhBtn);
				if (this.srhBtn == '搜索') {
					this.searchfunc(this.searchText);
				} else if (this.srhBtn == '取消') {
					this.result = true;
					this.history_content = true;
					this.resultList = [];
					this.searchText = '';
					this.history_content = false;
					this.clean_history = false;
					this.hotList = true;
				}
			},
			search: function(e) {
				console.log(e.detail.value);
				this.searchText = e.detail.value;
				if (e.detail.value == '') {
					this.srhBtn = '取消';
				} else {
					this.srhBtn = '搜索';
				}
			},
			/**
			 * 问题搜索历史查询方法
			 */
			search_history: function() {
				var param = {
					pageCurrent: 1,
					pageSize: 10
				};
				app.basic.getAjaxData(com.help('problem_history_search'), param, 'POST').then(res => {
					if (res.data.status == true) {
						this.list = res.data.data.records;
						if (res.data.data.total > 0 && this.history_content) {
							this.clean_history = true;
						} else {
							this.clean_history = false;
						}
					}
				});
			},
			forSrh() {
				this.history_content = true;
				this.search_history();
			},
			/**
			 * 获取热门问题
			 */
			getHotQuestion: function() {
				var param = {
					pageCurrent: 1,
					pageSize: 4
				};
				app.basic.getAjaxData(com.help('listHotQuestion'), param, 'POST').then(res => {
					if (res.data.status == true) {
						this.hotQuestionList = res.data.data.records;
					}
				});
			},
			/**
			 * 获取常见问题
			 */
			getCommonQuestion: function() {
				app.basic.getAjaxData(com.help('listCommonQuestion'), '', 'GET').then(res => {
					if (res.data.status == true) {
						this.commonQuestionList = res.data.data;
					}
				});
			},
			// 问题详情
			questionInfo(id) {
				uni.navigateTo({
					url: 'problem_det?id=' + id
				});
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			}
		}
	};
</script>

<style>
	.mainCom {
		padding-top: 300upx;
	}

	/* 热门问题 */
	.mainCom .tit {
		font-size: 40upx;
		color: #000;
		font-weight: bold;
		padding: 22upx 0 30upx 0;
	}

	.qusItem>view {
		display: inline-block;
		border: 1upx solid #f0efef;
		color: #444444;
		font-size: 28upx;
		border-radius: 42upx;
		padding: 20upx 30upx;
		margin-right: 24upx;
		margin-bottom: 28upx;
	}

	.problemItem {
		color: #3e3e3e;
		font-size: 28upx;
		padding: 32upx 0;
		border-bottom: 1upx solid #f3f3f3;
	}

	.resultBox {
		color: #3e3e3e;
		font-size: 30upx;
	}

	.question {
		padding: 30upx 0;
	}

	.answerBox>view {
		padding: 25upx 0 25upx 100upx;
	}
</style>
