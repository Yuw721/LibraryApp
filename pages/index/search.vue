<template>
	<!-- 搜索 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">搜索</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class="srhBox flex_l_c">
				<view class="srhIptBox flex_l_c">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" @input="search" :value="searchText" placeholder="搜索…" class="srhIpt" @click="forSrh" />
				</view>
				<view class="mainCol srhBtn" @click="searchBtn">{{ srhBtn }}</view>
			</view>
			<view>
				<view class='srhTit'>热门搜索</view>
				<view class='srhItemBox'>
                    <view @click='searchDes(item.title)' v-for="item in hostSearchHistory" :key='item.title'>
                        {{item.title}}
                    </view>
				</view>
			</view>
			<view>
				<view class='srhTit'>最近搜索</view>
				<view class='srhItemBox'>
                    <view @click='searchDes(item.title)' v-for="item in searchHistory" :key='item.title'>
                        {{item.title}}
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
				srhBtn: '取消', // 搜索按钮
				searchText: '',
                searchHistory: [],
                hostSearchHistory: []
			}
		},
        onLoad() {
            this.getHostSearchHistory();
            this.getSearchHistoryByUserId();
        },
		methods: {
            search(e) {
                this.searchText = e.detail.value;
                if (this.searchText === '') {
                    this.srhBtn = '取消'
                } else {
                    this.srhBtn = '搜索'
                }
            },
			// 搜索历史
            searchDes(title) {
				uni.navigateTo({
                    url: 'searchResult?title=' + title
				})
			},
			//搜索
			searchBtn() {
                if (this.searchText === '') {
                    uni.showToast({
                        icon: "none",
                        title: '请输入要搜索的关键词'
                    });
                    return;
                }
                var param = {
                    title: this.searchText
                }
                app.basic.getAjaxData(com.enquiries("savSearchHistory"), param, "POST").then(res => {
                    if (res.data.status == true) {
                        uni.navigateTo({
                            url: 'searchResult?title=' + this.searchText
                        })
                    }
                })

			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
            //获取热门搜索
            getHostSearchHistory() {
                app.basic.getAjaxData(com.enquiries("getHostSearchHistory"), "", "GET").then(res => {
                    if (res.data.status == true) {
                        this.hostSearchHistory = res.data.data
                    }
                })
            },
            //获取用户搜索
            getSearchHistoryByUserId() {
                app.basic.getAjaxData(com.enquiries("getSearchHistoryByUserId"), "", "GET").then(res => {
                    if (res.data.status == true) {
                        this.searchHistory = res.data.data
                    }
                })
            },
		}
	}
</script>


<style>
	.mainCom {
		padding-top: 300upx;
	}

	.srhTit {
		padding: 10upx 0 40upx;
		font-size: 32upx;
		color: #333333;
	}

	.srhItemBox>view {
		display: inline-block;
		border: 1upx solid #F0F0F0;
		color: #505050;
		font-size: 32upx;
		padding: 20upx 46upx;
		margin: 0 24upx 24upx 0;
		border-radius: 40upx;
		word-break: break-all;
	}
</style>
