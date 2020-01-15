<template>
	<!-- 戏剧详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">{{ title }}</view>
			</view>
		</view>
		<view class="mainCom" v-if="type == 0 || type == 1 || type == 2 || type == 4">
			<view class="knowledgeTit">{{ characterInfo.source.dctitle }}</view>
			<image v-if="type == 1 || type == 2" src="http://hnhsjy1.txhn.net/image/hsjy/TP/S//yzdbt/1546.jpg" class="personImg"></image>
			<view class="knowledgeInfo"><rich-text :nodes="characterInfo.source.dcdescriptionh"></rich-text></view>
			<view class="knowledgeType b_t" v-if="type != 4">来源：{{ type == 1 || type == 2 ? characterInfo.source.dcsource : characterInfo.source.dcpublisher }}</view>
		</view>

		<view class="mainCom" v-if="type == 3">
			<view class="knowledgeTit">{{ characterInfo.source.title }}</view>
			<!-- <image v-if="type == 1 || type == 2" src="http://hnhsjy1.txhn.net/image/hsjy/TP/S//yzdbt/1546.jpg" class="personImg"></image> -->
			<view class="knowledgeInfo">
				<rich-text :nodes="characterInfo.source.descriptionh"></rich-text></view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';

export default {
	data() {
		return {
			title: '详情',
			type: null, // type: 0戏剧知识；1戏剧人物；2红色故址；3古村古镇；4非遗实物
			characterInfo: null
		};
	},
	onLoad(option) {
		this.characterInfo = uni.getStorageSync('characterInfo');
		this.type = option.type;
		if (option.type == 0) {
			this.title = '戏剧知识';
		} else if (option.type == 1) {
			this.title = '戏剧人物';
		} else if (option.type == 2) {
			this.title = '红色故址';
		} else if (option.type == 3) {
			this.title = '古村古镇';
			let str = this.characterInfo.source.descriptionh;
			this.characterInfo.source.descriptionh = str.replace(/BORDER-TOP-WIDTH: 0px\"  style=\"/gi, 'BORDER-TOP-WIDTH: 0px;').replace(/<FONT size=\+0>/gi, '').replace(/<\/FONT>/gi, '');
		} else if (option.type == 4) {
			this.title = '非遗实物';
			let str = this.characterInfo.source.dcdescriptionh
			// let a = str.replace(/pt/gi,'px').replace(/<font style=\"line-height: 200%;\">/gi, '').replace(/<\/font>/gi, '').replace(/<o:p style=\"line-height: 200%;\">/gi, '').replace(/<\/o:p>/gi, '').replace(/<font style=\"font-size: 12px; line-height: 200%;\">/gi, '').replace(/<\/font>/gi, '').replace(/<font face=\"宋体\" style=\"line-height: 200%; text-align: justify;\">/gi, '').replace(/<\/font>/gi, '').replace(/<font face=\"宋体\" style="line-height: 200%;\">/gi, '').replace(/<\/font>/gi, '').replace(/<o:p>/gi, '');
			
			
			let a = str.replace(/pt/gi,'px').replace(/<\/?font[^>]*>/gi,"").replace(/<\/?o:p[^>]*>/gi,"")
			
			this.characterInfo.source.dcdescriptionh = a
		}
	},
	methods: {
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.mainCom {
	text-align: center;
}
.knowledgeTit {
	font-size: 38upx;
	font-weight: bold;
	color: #000;
	padding: 20upx 0 10upx;
}

.personImg {
	width: 200upx;
	height: 200upx;
	border-radius: 50%;
}

.knowledgeInfo {
	font-size: 28upx;
	color: #333333;
	padding: 20upx;
	line-height: 50upx;
	text-align: justify;
	text-align-last: left;
}

.knowledgeType {
	font-size: 32upx;
	color: #333333;
	padding: 30upx;
}
</style>
