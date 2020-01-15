<template>
	<!-- 选择模板 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">选择模板</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='flex_l_c moduleBoxItem'>
				<view>
					<view class='moduleBox' @click='selModule(0)'>
						<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="moduleType == 0"></image>
						<image src='../../static/imgs/record_module1.png' class='moduleImg'></image>
						<view class='moduleName'>中国风</view>
					</view>
					<view class='preview' @click='preView0'>预览</view>
				</view>
				<view>
					<view class='moduleBox' @click='selModule(1)'>
						<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="moduleType == 1"></image>
						<image src='../../static/imgs/record_module2.png' class='moduleImg'></image>
						<view class='moduleName'>简约风</view>
					</view>
					<view class='preview' @click='preView1'>预览</view>
				</view>
				<view>
					<view class='moduleBox' @click='selModule(2)'>
						<image src='../../static/imgs/record_checked.png' class='checkedImg' v-if="moduleType == 2"></image>
						<image src='../../static/imgs/record_module3.png' class='moduleImg'></image>
						<view class='moduleName'>时尚潮</view>
					</view>
					<view class='preview' @click='preView2'>预览</view>
				</view>
			</view>
			<view class='maxBtn' @click='over'>完成</view>
			<text class='skip' @click='skipBtn'>重做</text>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
				moduleType: null, // 模板风格  0：中国风；1：简约风；2：时尚潮
				param: null,
			}
		},
        onLoad(option) {
            this.param = JSON.parse(decodeURIComponent(option.param));
            console.log(this.param);
        },
		methods: {
			// 选择模板
			selModule(type) {
				this.moduleType = type
			},

			// 预览
			preView0() {
                this.param.templateNo = 0
				uni.navigateTo({
                    url: 'infoType0?type=1&param=' + encodeURIComponent(JSON.stringify(this.param)),
				})
			},

			preView1() {
                this.param.templateNo = 1
				uni.navigateTo({
                    url: 'infoType1?type=1&param=' + encodeURIComponent(JSON.stringify(this.param)),
				})
			},

			preView2() {
                this.param.templateNo = 2
				uni.navigateTo({
                    url: 'infoType2?type=1&param=' + encodeURIComponent(JSON.stringify(this.param)),
                })
            },
            // 重做
            skipBtn() {
                uni.navigateTo({
                    url: 'informationEntry',
				})
			},
            // 完成
            over: function () {
                if (this.moduleType == null) {
                    uni.showToast({
                        title: '请选择模板',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                this.param.templateNo = this.moduleType
                app.basic.getAjaxData(com.user("saveSysLibrarianArchives"), this.param, "POST").then(res => {
                    if (res.data.status) {
                        var that = this
                        uni.showToast({
                            title: '录入成功',
                            icon: 'none',
                            duration: 2000,
                            success: function () {
                                setTimeout(function () {
                                    //要延时执行的代码
                                    uni.switchTab({
                                        url: 'my',
                                    })
                                }, 2000) //延迟时间
                            }
                        })
                    } else {
                        uni.showToast({
                            title: '录入失败',
                            icon: 'none',
                            duration: 2000,
                            success: function () {
                                setTimeout(function () {
                                    //要延时执行的代码
                                    uni.switchTab({
                                        url: 'my',
                                    })
                                }, 2000) //延迟时间
                            }
                        })
                    }
                })
            },

			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>


<style>
	page {
		background: #f2f2f2;
	}

    .mainCom {
		padding-top: 230upx;
	}

	.moduleBox {
		width: 202upx;
		height: 310upx;
		text-align: center;
		padding: 26upx 0;
		position: relative;
		background: #fff;
		border-radius: 24upx;
	}

	.checkedImg {
		width: 48upx;
		height: 48upx;
		position: absolute;
		right: 16upx;
		top: 16upx;
		z-index: 2;
	}

	.moduleImg {
		width: 146upx;
		height: 258upx;
	}

	.moduleName {
		font-size: 30upx;
		color: #1d1e2c;
		padding-top: 16upx;
	}

	.preview {
		width: 120upx;
		margin: 0 auto;
		height: 64upx;
		text-align: center;
		line-height: 64upx;
		color: #9fb0c5;
		font-size: 28upx;
		border: 1upx solid #dadfe6;
		border-radius: 200upx;
		margin-top: 30upx;
	}

	.maxBtn {
		position: fixed;
		bottom: 180upx;
		left: 5%;
	}

	.skip {
		position: fixed;
		bottom: 80upx;
		left: 50%;
		transform: translateX(-50%);
		color: #71ae91;
		font-size: 32upx;
	}

	.moduleBoxItem>view {
		margin-right: 30upx;
	}
</style>
