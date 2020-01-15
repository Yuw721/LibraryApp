<template>
	<!-- 启动页 -->
	<view class="bootBox">
		<image src="../../static/imgs/boot.png" class="bootImg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			// 跳转到首页
			setTimeout(function() {
				uni.switchTab({
					url: "index"
				})
			},3000)
		},
		methods: {
		}
	}
</script>


<style>
	.bootBox {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}
	.bootImg {
		width: 100%;
		height: 100%;
	}
</style>
