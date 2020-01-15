<template>
	<!-- 活动报名 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">活动报名</view>
				<view class="smallTit" @click="toMyActivities">我的活动</view>
			</view>
		</view>
		<view class="mainCom">
            <scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
                <view class='infoItem flex_l_e' @click="toActivityDet(item.id)" v-for="(item,index) in list"
                      :key="index">
                    <image src='../../static/imgs/tag.png' class='tagImg' v-if="item.newState == 0"></image>
                    <image :src="item.posterImage" class="bookImg" mode="aspectFit"></image>
                    <view class="info">
                        <view class='omit tit'>{{item.theme}}</view>
                        <view>活动时间：{{item.activityStratTime}}</view>
                        <view class="flex_b_e">
                            <view>已报名人数：
                                <text class="mainCol">{{item.applyNumberPeople}}</text>
                            </view>
                            <view class='buleBtn'>报名</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	export default {
		data() {
			return {
                pageCurrent: 1,
                pageSize: 10,
                list: [],
                hasMoreData: false
			}
        },
        onLoad(option) {

        },
        onShow() {
            this.pageCurrent = 1;
            this.list = [];
            this.hasMoreData = false;
            this.findActivityList();
        },
		methods: {
			// 我的活动
			toMyActivities() {
				uni.navigateTo({
					url: "myActivities"
				})
			},
			// 活动详情
            toActivityDet(id) {
				uni.navigateTo({
                    url: "../index/activity_det?id=" + id
				})
            },
            //获取正在进行的活动
            findActivityList() {
                var param = {
                    pageCurrent: this.pageCurrent,
                    pageSize: this.pageSize,
                };
                app.basic.getAjaxData(com.activity('activity_list'), param, "POST").then(res => {
                    var list = res.data.data.records;
                    if (list.length < this.pageSize) {
                        if (list.length === 0) {
                            wx.showToast({
                                icon: "none",
                                title: '暂无相关内容'
                            });
                        } else {
                            this.list = this.list.concat(list);
                        }
                        this.hasMoreData = false;

                    } else {
                        this.list = this.list.concat(list);
                        this.hasMoreData = true;
                        this.pageCurrent = this.pageCurrent + 1;
                    }
                })
            },
            //分页
            scrollView() {
                if (this.hasMoreData) {
                    this.findActivityList();
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '没有更多数据'
                    });
                }
            },
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	.tagImg {
        position: absolute;
        top: 0;
        left: 0;
        width: 90upx;
        height: 90upx;
        z-index: 1;
	}
</style>
