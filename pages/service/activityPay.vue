<template>
	<!-- 信息确认 -->
	<view id="cardBox">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">信息确认</view>
			</view>
		</view>
		<view class="mainCom">
			<view class='topPart'>
				<view class='flex_b_c cardTitBox'>
					<view class='cardTit'>
						<view class="actTit">活动名称</view>
						<view>{{activityInfo.theme}}</view>
					</view>
				</view>
				<view class='parkInfo'>
					<view class='flex_b_c'>
						<view>活动时间</view>
						<view>{{activityInfo.activityStratTime}}</view>
					</view>
					<view class='flex_b_c activityPlaceBox'>
						<view class='activityPlaceTit'>活动地点</view>
						<view class='activityPlace'>{{activityInfo.site}}</view>
					</view>
					<view class='flex_b_c'>
						<view>报名人</view>
						<view>{{userName}}</view>
					</view>
					<view class='flex_b_c'>
						<view>联系电话</view>
						<view>{{phone?phone:'暂无'}}</view>
					</view>
					<view class='flex_b_c b_b'>
						<view>活动费用</view>
						<view>¥ {{cost}}</view>
					</view>
					<view class='flex_b_c gross'>
						<view>总金额</view>
						<view>¥ {{cost}}</view>
					</view>
				</view>
				<view class='flex_b_c'>
					<view class='raduLeft'></view>
					<view class='line'></view>
					<view class='raduRight'></view>
				</view>
				<view class='charges'>
					<view>活动说明：</view>
					<view>{{cost == 0?'本活动为免费活动，请确认参与人信息。一旦报名成功后，请按时参加活动。'
                        :'本活动为收费活动，线下支付。一旦报名成功后，请按时参加活动。'}}
					</view>
				</view>
			</view>
			<view class='maxBtn' @click='pay'>确认信息</view>
		</view>
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
				cost: null,
				activityInfo: null
			}
		},
		onLoad(option) {
			this.cost = option.cost;
			this.activityInfo = JSON.parse(decodeURIComponent(option.item));
		},
		computed: {
			...mapState(['userName', 'phone'])
		},
		methods: {
			// 确认信息
			pay() {
				var param = {
					id: this.activityInfo.id
				};
				app.basic.getAjaxData(com.activity('enroll'), param, "POST").then(res => {
					if (res.data.status == true) {
						uni.redirectTo({
							url: 'activitiesIn?id=' + this.activityInfo.id
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
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

</style>
