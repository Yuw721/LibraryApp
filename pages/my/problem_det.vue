<template>
	<!-- 问题详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">问题详情</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="resultBox">
				<view class="resultTit">{{question.problem}}</view>
				<view @click="previewImg">
					<rich-text :nodes="answer"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			imgList: ['http://www.library.hn.cn/rgzn/gcfb/200911/W020130625392806576216.jpg', 'http://www.library.hn.cn/rgzn/gcfb/200911/W020130625393522644381.jpg'],
			question: null,
			answer: null,
			id: null
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.getQuestionInfo();
	},
	methods: {
		//获取问题详情
		getQuestionInfo: function() {
			var that = this;
			var param = {
				id: this.id
			};
			app.basic.getAjaxData(com.help('getQuestionInfo'), param, 'GET').then(res => {
				if (res.data.status == true) {
					that.question = res.data;
					if (res.data.data.id == 38) {
						that.imgList = res.data.data.remark.split(',');
					}
					var contentF = res.data.data.answer.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
					contentF = contentF.replace(/<table[^>]*>/gi, function(match, capture) {
						return match.replace(/width=\"(.*)\"/gi, '');
					});
					that.answer = contentF;
				}
			});
		},
		previewImg(event) {
			var that = this;
			console.log(that.imgList);
			if (that.imgList != undefined && that.imgList.length > 0) {
				var src = that.imgList[0]; //获取data-src
				uni.previewImage({
					current: src, // 当前显示图片的http链接
					urls: that.imgList // 需要预览的图片http链接列表
				});
			}
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.resultTit {
	font-size: 40upx;
	text-align: center;
	font-weight: bold;
	padding-bottom: 20upx;
}

.resultBox {
	font-size: 30upx;
	line-height: 50upx;
	padding-top: 40upx;
}
</style>
