<template>
	<!-- 活动详情 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">活动详情</view>
			</view>
		</view>
		<view class="mainCom">
			<image :src="activityInfo.posterImage" class='bannerImg' mode='aspectFit'></image>
			<view class="b_b topInfo">
				<view class="actItemTit">活动名称</view>
				<view class="actTit">{{activityInfo.theme}}</view>
				<view class="flex_l_c state">
					<view><text>活动状态：</text><text class="redCol">{{activityInfo.enrollState}}</text></view>
					<view><text>报名状态：</text><text class="redCol">{{activityInfo.activityState}}</text></view>
				</view>
			</view>
			<view>
				<view class='actItemTit'>活动时间：</view>
				<view>{{activityInfo.activityStratTime}}~{{activityInfo.activityEndTime}}</view>
				<view class='actItemTit'>报名时间：</view>
				<view>{{activityInfo.applyStratTime}}~{{activityInfo.applyEndTime}}</view>
				<view class='actItemTit' v-if="activityInfo.organizer!=null">组织者：</view>
				<view v-if="activityInfo.organizer!=null">{{activityInfo.organizer}}</view>
				<view class='actItemTit'>联系电话：</view>
				<view>{{activityInfo.activityPhone}}</view>
				<view class='actItemTit'>活动地点：</view>
				<view>{{activityInfo.pName+activityInfo.cName+activityInfo.aName+activityInfo.site}}</view>
				<view class="flex_l_c">
					<view class='actItemTit'>活动人数：</view>
					<view>{{activityInfo.maxNumberPeople}}</view>
				</view>
				<view class='actItemTit'>报名要求：</view>
				<view>性别：{{activityInfo.sexRestriction}}</view>
				<view class='actItemTit'>活动内容：</view>
				<view>
					<rich-text :nodes="content"></rich-text>
				</view>
			</view>
			<view>
				<view class='actItemTit b_t p_t30 m_t30'>已报名人数（{{activityInfo.applyNumberPeople}}/{{activityInfo.maxNumberPeople}})</view>
				<view class='applyHead' :class='iconShow ? "hide":""'>
                    <view class='headBox' v-for="item in activityInfo.enrollInfo" :key="item.name">
						<image :src='item.img'></image>
					</view>
				</view>
				<view class='iconfont icon-xiangxia downIcon' v-if="iconShow" @click='showHead'></view>
				<view class='iconfont icon-xiangshang downIcon' v-if="!iconShow" @click='showHead'></view>
			</view>
		</view>
		<view class="botBox flex_l_c">
            <view class="collect" @click="collect">
                <text class="iconfont icon-xinheart280 collectIcon" :class="iscollect?'redCol':''"></text>
			</view>
            <view class="solidBtn" v-if="whether && !isSignIn" @click="enrollView">已报名</view>
            <view class="solidBtn" v-else-if="whether && isSignIn" @click="enrollView">已签到</view>
            <view class="solidBtn"
                  v-else-if="!whether && activityInfo.activityState=='报名中' && activityInfo.applyNumberPeople>=activityInfo.maxNumberPeople">
                报名人数已满
            </view>
            <view class="solidBtn" @click="nowApply"
                  v-else-if="!whether &&activityInfo.activityState=='报名中' && activityInfo.applyNumberPeople<activityInfo.maxNumberPeople">
                立即报名
            </view>
            <view class="solidBtn" v-else>{{activityInfo.activityState}}</view>
		</view>
		<!-- 选票弹窗 -->
		<view class='popUpBox' v-if='popUpShow'>
			<view class='popUpShade'></view>
			<view class='popUpCom'>
				<view class='closeIconBox' @click='closePopUp'>
					<text class='iconfont icon-guanbi closeIcon' @click='closePopUp'></text> </view>
				<view class='b_b actInfo'>
                    <view class='actTit'>{{activityInfo.theme}}</view>
					<view class='actItemTit'>活动时间：</view>
                    <view>{{activityInfo.activityStratTime}}~{{activityInfo.activityEndTime}}</view>
					<view class='actItemTit'>活动地点：</view>
                    <view>{{activityInfo.pName+activityInfo.cName+activityInfo.aName+activityInfo.site}}</view>
				</view>
				<view class='ticketBox'>
					<view>票价</view>
                    <view :class='currentIndex==index?"ticket actTicket":"ticket"' v-for="(item,index) in ticketInfo"
                          :key="item.remark"
                          @click="ticketClick(index)">
                        <view class='price'>￥{{item.cost}}元</view>
                        <view class='explain'>{{item.remark}}票</view>
					</view>
				</view>
				<view class='maxBtn' @click="confirmPay">确定</view>
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
				iconShow: true,
				popUpShow: false, // 弹窗
				id: null,
				activityInfo: null,
                content: null,
                currentIndex: 0,
                ticketInfo: [{
                    cost: 0.00,
                    remark: '免费'
                }],
                isSignIn: false,
                whether: false,
                iscollect: false
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.getActivityInfo();
            this.whetherEnroll();
            this.getCollect();
		},
		methods: {
			// 确定报名
			confirmPay() {
                app.basic.getAjaxData(com.query('countYdzzUser'), '', "GET").then(res => {
                    if (res.data.status == true) {
                        uni.navigateTo({
                            url: '../service/activityPay?cost=' + this.ticketInfo[this.currentIndex].cost +
                                "&item=" + encodeURIComponent(JSON.stringify(this.activityInfo))
                        })
                    } else {
                        uni.navigateTo({
                            url: '../service/accessAccount?cost=' + this.ticketInfo[this.currentIndex].cost +
                                "&item=" + encodeURIComponent(JSON.stringify(this.activityInfo))
                        })
                    }
				})
			},
			// 立即报名
			nowApply() {
				this.popUpShow = true;
			},
			// 关闭弹窗
			closePopUp() {
				this.popUpShow = false;
			},
			// 报名头像展开
			showHead: function() {
				if (this.iconShow) {
					this.iconShow = false;
				} else {
					this.iconShow = true;
				}
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			//获取活动详情
			getActivityInfo() {
				var param = {
					id: this.id
				};
				app.basic.getAjaxData(com.activity('getActivityInfoById'), param, "GET").then(res => {
					this.activityInfo = res.data.data;
					this.content = this.activityInfo.introduce.replace(/style/gi, 'alt').replace(/\<img/gi,
						'<img style="width:100%;height:auto" ');
					if (this.activityInfo.sexRestriction == 0) {
						this.activityInfo.sexRestriction = "女";
					} else if (this.activityInfo.sexRestriction == 1) {
						this.activityInfo.sexRestriction = "男";
					} else {
						this.activityInfo.sexRestriction = "不限";
					}
                    if (this.activityInfo.ticketInfo.length > 0) {
                        this.ticketInfo = this.activityInfo.ticketInfo;
                    }
				})
			},
            //票价选择
            ticketClick(index) {
                this.currentIndex = index;
            },
            //获取用户是否报名
            whetherEnroll() {
				var param = {
					id: this.id
				};
                app.basic.getAjaxData(com.activity('whetherEnroll'), param, "POST").then(res => {
                    if (res.data.status == true) {
                        if (res.data.data == null) {
                            this.whether = false;
                        } else {
                            this.whether = true;
                            if (res.data.data.applyState == 1) {
                                this.isSignIn = true;
                            }
                        }
                    }
                })
            },
            //获取报名信息
            enrollView() {
                uni.navigateTo({
                    url: '../service/activitiesIn?id=' + this.id
				})
			},
            /**
             *是否收藏
             */
            getCollect() {
                var that = this
                var param = {
                    id: this.id
                };
                app.basic.getAjaxData(com.activity('isCollect'), param, "GET").then(res => {
                    if (res.data.status == true) {
                        that.iscollect = true
                    } else {
                        that.iscollect = false
                    }
                })
            },
            //收藏
            collect() {
                var that = this
                var param = {
                    id: this.id
                };
                app.basic.getAjaxData(com.activity('collect'), param, "GET").then(res => {
                    if (res.data.status == true) {
                        if (that.iscollect) {
                            that.iscollect = false;
                        } else {
                            that.iscollect = true;
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            }
		}
	}
</script>

<style>
	.mainCom {
		padding-bottom: 160upx;
	}

	.solidBtn {
		width: 530upx;
		border-radius: 4upx;
		margin: 0;
	}

	/* 弹窗 */

	.popUpBox {
        z-index: 98;
	}

	.popUpShade {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #000;
        opacity: 0.5;
        z-index: 99;
	}

	.popUpCom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 90%;
        background: #fff;
        z-index: 100;
        border-radius: 20 upx 20 upx 0 0;
        padding: 5%;
	}

	.popUpCom .closeIconBox {
        text-align: right;
	}

	.popUpCom .closeIcon {
        font-size: 50 upx;
	}

	.popUpCom .actInfo {
        padding: 0 0 20 upx 0;
	}

	.ticketBox {
        margin-top: 20 upx;
        height: 490 upx;
        overflow-y: scroll;
	}

	.ticket {
        margin-top: 20 upx;
	}

	.ticket>view {
        border: 1 upx solid #c7c7c7;
        display: inline-block;
        padding: 20 upx 0;
        text-align: center;
	}

	.actTicket>view {
        border: 1 upx solid #197CB7;
        color: #197CB7;
	}

	.ticket .price {
        border-right: none;
        width: 24%;
	}

	.ticket .explain {
        width: 70%;
    }

    .botBox .collect .redCol {
        color: #F2004F;
    }
</style>
