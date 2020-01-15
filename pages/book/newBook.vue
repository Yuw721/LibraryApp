<template>
	<!-- 新建书单 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">新建书单</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='selTagHint'>最多选择三个标签，让其他人更容易发现你的书单</view>
			<view class='b_b languageBox' v-for="(itemName, idx) in languageArr" :key="idx">
				<view class='tagsTit'>{{itemName.label.sourceName}}</view>
				<view class='language'>
                    <view :class='item.state==1?"mainCol":""' v-for="(item, index) in itemName.childLabel" :key="index"
                          @click='selTags(idx,index)'>{{item.sourceName}}
                    </view>
				</view>
			</view>
			<picker class='selItem' @change="signSel" :value="signIndex" :range="signArr">
				<view class='flex_b_c b_b infoBox'>
					<view>标记</view>
					<view class='flex_c_c'>
						{{signArr[signIndex]}}
						<view class='iconfont icon-iconfonti intoIcon'></view>
					</view>
				</view>
			</picker>
			<view class='flex_b_c b_b infoBox'>
				<view>书单名预览</view>
				<view class='selItem'>
					{{name}}{{suffix}}
				</view>
			</view>
			<view>
				<view>
					<view class='flex_b_c infoBox'>
						<view>私密设置</view>
						<view class="body-view">
							<switch color="#197cb7" @change="switchChange" />
						</view>
					</view>
					<view class='setHint'>该书单未来有关注者后，将无法设为私密</view>
				</view>
			</view>
		</view>
		<view class='maxBtn' @click='confirmAndAdd'>确认并添加</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
    import {
        mapState
    } from 'vuex';
	export default {
		data() {
			return {
				// 标记
				signArr: ['无', '个人昵称'],
				signIndex: 0,
				name: '',
				privater: 0,
				suffix: '的书单',
                languageArr: [],
				labelArr: [],
                item: null
			};
		},
        onLoad(option) {
            if (option.item) {
                this.item = JSON.parse(decodeURIComponent(option.item));
            }
            this.getLabelList();
        },
        computed: {
            ...mapState(['userName'])
		},
		methods: {
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //获取标签
            getLabelList() {
                app.basic.getAjaxData(com.common('getLabelList'), '', "GET").then(res => {
                    this.languageArr = res.data.data
                })
            },
            //获取私密性
            switchChange(e) {
                if (e.detail.value) {
                    this.privater = 1
                } else {
                    this.privater = 0
                }
            },
            //选择标签
            selTags(idx, index) {
                var labelArr = [];
                var name = '';
                if (this.languageArr[idx].childLabel[index].state == 1) {
                    this.languageArr[idx].childLabel[index].state = 0;
                } else if (this.languageArr[idx].childLabel[index].state == 0) {
                    if (this.labelArr.length > 2) {
                        uni.showToast({
                            title: '最多选择三个标签!',
                            icon: 'none'
                        })
                        return;
                    }
                    this.languageArr[idx].childLabel[index].state = 1;
                }
                for (var x in this.languageArr) {
                    for (var y in this.languageArr[x].childLabel) {
                        if (this.languageArr[x].childLabel[y].state == 1) {
                            labelArr.push(this.languageArr[x].childLabel[y].sourceName);
                            name += this.languageArr[x].childLabel[y].sourceName;
                        }
                    }
                }
                this.labelArr = labelArr;
                this.name = name;
            },
            //标记选择
            signSel(e) {
                console.log(e.detail.value)
                if (e.detail.value != 0) {
                    this.suffix = "的书单(" + this.userName + ")"
                } else {
                    this.suffix = "的书单"
                }
            },
            //提交书单
            confirmAndAdd() {
                if (this.name == '') {
                    uni.showToast({
                        title: '请选择书单标签!',
                        icon: 'none'
                    })
                    return;
                }
                var param = {
                    sign: '用户书单',
                    privater: this.privater,
                    name: this.name + this.suffix
                }
                app.basic.getAjaxData(com.enquiries('insertBookList'), param, "POST").then(res => {
                    var bookListId = res.data.data;
                    if (this.item != null) {
                        this.item.bookListId = bookListId;
                        app.basic.getAjaxData(com.enquiries('insertBookListDetail'), this.item, "POST").then(res => {
                            if (res.data.status) {
                                uni.redirectTo({
                                    url: 'bookList_det?id=' + bookListId
                                })
                            } else {
                                wx.showToast({
                                    title: '添加失败!',
                                    icon: 'none'
                                })
                            }
                        })
                    } else {
                        uni.redirectTo({
                            url: 'bookList_det?id=' + bookListId
                        })
                    }
                })
            },
		}
	};
</script>

<style>
	.infoBox {
		padding: 40upx 0 20upx 0;
	}

	.infoBox>view:first-of-type {
		color: #172434;
		font-size: 32upx;
	}

	.selItem {
		color: #6C6C6C;
		font-size: 28upx;
	}

	.intoIcon {
		color: #6C6C6C;
		font-size: 40upx;
	}

	.setHint {
		color: #666666;
		font-size: 32upx;
		padding-bottom: 30upx;
	}

    .refreshIcon {
		width: 48upx;
		height: 48upx;
		margin-left: 16upx;
		vertical-align: middle;
	}

	.languageBox {
		padding: 30upx 0;
	}

	.tagsTit {
		color: #172434;
		font-size: 32upx;
		text-align: center;
		padding-bottom: 20upx;
	}

	.language>view {
		display: inline-block;
		width: 16.666%;
		font-size: 24upx;
		text-align: center;
	}

	.selTagHint {
		color: #6C6C6C;
		font-size: 24upx;
		text-align: center;
		padding: 20upx 0;
	}
</style>
