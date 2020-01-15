<template>
	<!-- 馆长直通车 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">馆长直通车</view>
			</view>
		</view>
		<view class='mainCom'>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>


<style>

</style>
