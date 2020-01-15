<template>
	<!-- 文库详情 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">详情</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="infoBox">
				<view class="bookTit">{{ item }}</view>
				<view v-for="(item, index) in rowList" :key="index">{{ item }}</view>
				<!-- <view>【作者】 赵荣</view>
				<view>【学位名称】硕士</view>
				<view>【学位年度】2019</view>
				<view>【学位授予单位】 辽宁师范大学</view>
				<view>【导师姓名】 关慧良</view>
				<view>【分类号】J524.2 ( 艺术->工艺美术->中国工艺美术->工商工艺美术 )</view> -->
			</view>

			<view class="abstractBox b_b">
				<view>{{ englistName }}</view>
			</view>
			<view class="abstractBox b_b" id="bookDet">
				<view :class="iconShow && abstractInfo.length >= 100 ? 'omit3' : ''">{{ abstractInfo == null ? '' : abstractInfo }}</view>
				<view v-if="iconShow && abstractInfo.length >= 100" @click="showHead" class="seeAll flex_c_c">
					查看全部
					<text class="iconfont icon-xiangxia"></text>
				</view>
				<view v-if="!iconShow && abstractInfo.length >= 100" @click="showHead" class="seeAll flex_c_c">
					收起
					<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
			<view class="abstractBox">
				<view v-for="(item, index) in edrows" :key="index">{{item}}</view>
			</view>
		</view>
		<view class="botBox flex_c_c" v-if="emailStatus"><view class="maxBtn" @click="toMailbox">发送到邮箱</view></view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			iconShow: true, // 图标显示
			abstractInfo:
				'儿童经济在全球市场经济中占有很大比例,儿童品牌的发展与品牌包装的设计密不可分。良好的包装设计不仅可以反映品牌的属性,还能牢牢把握消费者的眼球。以往的儿童品牌包装设计,大多是商家站在成人的角度去考虑问题,认为售出的虽然是儿童的产品,购买的却是父母,包装设计缺乏儿童视角和特色。本文根据儿童认知事物的特征,成长的心理特点,以及视知觉发展规律作为依据,通过大量的文献调研,来分析儿童涂鸦所产生的画面效果。通过探索儿童消费心理的特点,设计出吸引儿童消费行为的品牌包装,是从设计的风格、结构、造型上设身处地的为儿童考虑,体现了设计中的人文关怀。生产儿童食品用品的关键是',
			particulars: '',
			item: '', //标题
			rowList: [],
			emailStatus: true,
			url: '',
			englistName: '',
			edrows: []
		};
	},
	onLoad(option) {
		this.particulars = option.particulars;
		this.item = option.item;
		this.searchInfoByDetail();
	},
	methods: {
		searchInfoByDetail() {
			var data = {
				particulars: this.particulars
			};
			var that = this;
			app.basic.getAjaxData(com.query('searchInfoByDetail'), data, 'POST').then(res => {
				console.log(res.data.data);
				var a = res.data.data;
				that.url = a.particulars;
				that.rowList = a.rows;
				that.abstractInfo = a.remark;
				that.englistName = a.englistName;
				that.edrows = a.edRows;
				if (a.particulars == null) {
					that.emailStatus = false;
				}
			});
		},
		// 发送到邮箱
		toMailbox() {
			uni.setStorageSync('bookUrl',this.url)
			uni.navigateTo({
				url: 'mailbox'
			});
		},
		// 内容显示隐藏
		showHead() {
			if (this.iconShow) {
				this.iconShow = false;
			} else {
				this.iconShow = true;
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
.mainCom {
	padding-bottom: 190upx;
}

.infoBox {
	width: 100%;
	padding: 36upx 0;
	line-height: 44upx;
	color: #979797;
	font-size: 26upx;
}

.infoBox > view {
	margin-bottom: 10upx;
}

.bookTit {
	font-size: 40upx;
	color: #000;
	font-weight: bold;
}

.abstractBox {
	font-size: 24rpx;
	color: #757575;
	padding: 20rpx 0;
	line-height: 44rpx;
}
</style>
