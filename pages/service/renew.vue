<template>
	<!-- 一键续借 -->
	<view id="actDet">
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">一键续借</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="warmPrompt" v-if="booklist.length <= 0">
				<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
				<view class="txt">亲，您暂无续借书籍哦。</view>
			</view>
			<view class="infoItem flex_l_e" v-for="(item, index) in booklist" :key="index">
				<image :src="item.img == '' ? 'https://wj.zydbai.com/zwt.png' : item.img" class="bookImg"></image>
				<view class="info">
					<view class="omit tit">{{ item.title }}</view>
					<view>到期时间：{{ item.returnTime }}</view>
					<view class="flex_b_e">
						<view>
							剩余时间：
							<text :class="item.days <= 3 ? 'redCol' : 'mainCol'">{{ item.days == null ? 0 : item.days }}天</text>
						</view>
						<view :class="item.count == 1 ? 'buleBtn' : 'grayBtn'" @click="renew(item)">续借</view>
					</view>
				</view>
			</view>
		</view>
		<view class="botBox flex_c_c"  v-if="yikey"><view class="solidBtn" @click="batchRenew">一键续借</view></view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			booklist: [],
			yikey: false
		};
	},
	onLoad(option) {},
	onShow() {
		this.getBorrow();
	},
	methods: {
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		},
		/**
		 * 获取借阅书
		 */
		getBorrow() {
			var that = this;
			app.basic.getAjaxData(com.query('findBorrow'), 'GET').then(res => {
				if (res.data.status == true) {
					console.log(res.data);

					this.booklist = res.data.data;
					if (that.booklist.length != 0) {
						this.yikey = true;
					}
				} else {
					// if (res.data.code == 0){
					//   util.toast("请先绑定借阅证", "none")
					// }
					// else{
					//   util.toast("系统错误", "none")
					// }
				}
			});
		},
		/**
		 * 续借
		 */
		renew(e) {
			var that = this;
			console.log(e);
			var barCode = e.barcode;
			var title = e.title;
			var classno = e.classno;
			var borrowtime = e.borrowTime;
			var returntime = e.returnTime;
			var bookRecno = e.bookRecno;
			var count1 = e.count1;
			console.log(count1);
			var param = null;
			if (count1) {
				param = {
					barCode: barCode,
					opUser: 'wjskuser',
					borrowTime: borrowtime,
					returnTime: returntime,
					title: title,
					classno: classno
				};
			} else {
				param = {
					barCode: barCode,
					opUser: 'xt',
					borrowTime: borrowtime,
					returnTime: returntime,
					title: title,
					classno: classno
				};
			}
			console.log(param);
			app.basic.getAjaxData(com.enquiries('renew'), param, 'POST').then(res => {
				if (res.data.status == true) {
					uni.showToast({
						title: '续借成功',
						icon: 'success'
					});
					this.getBorrow();
				} else {
					uni.showToast({
						title: '本书已超过续借次数',
						icon: 'none'
					});
				}
			});
		},
		/**
		 * 一键续借
		 */
		batchRenew() {
			var that = this;
			var arr = this.booklist;
			var params = [];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].count == 1) {
					var param = {
						barCode: arr[i].barcode,
						opUser: arr[i].count1 ? 'wjskuser' : 'xt',
						borrowTime: arr[i].borrowTime,
						returnTime: arr[i].returnTime,
						title: arr[i].title,
						classno: arr[i].classno
					};
					params.push(param);
				}
			}
			console.log(params);
			if (params.length == 0) {
				uni.showToast({
					title: '本书已超过续借次数',
					icon: 'none'
				});
				return;
			}

			var bookParams = {
				list: params
			};
			app.basic.getAjaxData(com.enquiries('renewBooks'), bookParams, 'POST').then(res => {
				if (res.data.status == true) {
					uni.showToast({
						title: '续借成功',
						icon: 'success'
					});
					this.getBorrow();
				} else {
					uni.showToast({
						title: '本书已超过续借次数',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.mainCom {
	padding-bottom: 160upx;
}

.solidBtn {
	width: 645upx;
	border-radius: 4upx;
	margin: 0;
}
</style>
