<template>
	<!-- 文库检索 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">文库检索</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="retInfoBox">
				<image src="../../static/imgs/logo.png" class="logo"></image>
				<view class="title">湖南图书馆书库检索平台</view>
				<view class="flex_l_c retBox">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" placeholder="搜索..." class="retIpt" :value="searchWord" @input="search" @blur="search"></input>
				</view>
				<view class="retBtn" @click="retBtn">搜索</view>
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
			searchWord: ''
		};
	},
	onLoad(option) {},
	methods: {
		// 搜索
		retBtn() {
			if (this.searchWord.length == 0) {
				uni.showToast({
					title: '请输入查询内容',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			uni.navigateTo({
				url: 'libraryList?searchWord=' + this.searchWord
			});
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		search(e) {
			this.searchWord = e.detail.value;
			console.log(this.searchWord);
		}
	}
};
</script>

<style>
.mainCom {
	text-align: center;
	height: calc(100vh - 85px);
	background: url('https://tsg.zydbai.com/static/img/retrieval_bg.png') no-repeat center;
	background-size: 100% 100%;
}

.retInfoBox {
	padding-top: 200upx;
}

.logo {
	width: 204upx;
	height: 154upx;
}

.title {
	font-size: 32upx;
	color: #201917;
	padding: 20upx 0 42upx;
}

.retBox {
	width: 480upx;
	height: 80upx;
	text-align: left;
	border: 2upx solid #e0e0e0;
	margin: 0 auto;
	border-radius: 200upx;
	padding: 0 40upx;
}

.retrievalIcon {
	width: 24upx;
	height: 24upx;
	margin-right: 10upx;
}

.retIpt {
	width: 90%;
	height: 100%;
	font-size: 26upx;
}

.retBtn {
	width: 400upx;
	height: 80upx;
	line-height: 80upx;
	color: #fff;
	font-size: 30upx;
	background: #197cb7;
	border-radius: 48upx;
	margin: 60upx auto 0;
}
.srhIcon {
	color: #95959a;
	font-size: 40upx;
	margin: 0 10upx;
}
</style>
