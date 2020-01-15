<script>
	import app from './public/app.js';
	import com from './public/com.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			this.autoLogin();

			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
			this.subscribe();
			this.subscribeAll();
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations(['login', 'logout', 'updateInfo']),
			//自动登录
			autoLogin() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						var userId = res.data.id;
						var param = {
							id: userId
						}
						console.log(param);
						app.basic.getAjaxData(com.common('autoLogin'), param, 'GET').then(res => {
							var token = res.data.data;
							uni.setStorage({
								key: 'token',
								data: token,
								success() {
									app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
										var userInfoRes = res.data.data
										if (userId != undefined && userId != 53) {
											that.login(userInfoRes);
										} else {
											that.updateInfo(userInfoRes);
										}
									})
								}
							});
						});
					},
					fail: () => {
						var param = {
							id: 53
						}
						app.basic.getAjaxData(com.common('autoLogin'), param, 'GET').then(res => {
							var token = res.data.data;
							uni.setStorage({
								key: 'token',
								data: token,
								success() {
									that.logout();
								}
							})
						})
					}
				});
			},
			subscribe() {
				app.basic.getAjaxData(com.user('getinfo'), null, 'POST').then(res => {
					let userInfo = res.data.data;
					this.$GoEasy.subscribe({
						channel: 'channel' + userInfo.id, //替换为您自己的channel
						onSuccess: function() {
							console.log(this.channel);
						},
						onMessage: function(message) {
							console.log(message.content);
							uni.showToast({
								title: message.content,
								icon: 'none'
							});
						}
					});
				});
			},
			subscribeAll() {
				this.$GoEasy.subscribe({
					channel: 'channelAll', //替换为您自己的channel
					onSuccess: function() {
						console.log(this.channel);
					},
					onMessage: function(message) {
						console.log(message.content);
						uni.showToast({
							title: message.content,
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	/* 顶部导航 */
	.topBar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.statusBar {
		height: 60upx;
		width: 100%;
		background: #000000;
		z-index: 100;
	}

	.titBar {
		height: 110upx;
		width: 100%;
		background: #ffffff;
		position: relative;
	}

	.titBar .backBtn {
		color: #999999;
		margin-left: 50upx;
		font-size: 40upx;
		font-weight: bold;
	}

	.titBar .shareBtn {
		color: #999999;
		margin-right: 50upx;
		font-size: 48upx;
		font-weight: bold;
	}

	.titBar .tit {
		color: #020202;
		font-size: 34upx;
		font-weight: bold;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.titBar .smallTit {
		color: #333333;
		font-size: 26upx;
		margin-right: 38upx;
	}

	/* 板块标题 */
	.plateBox .plateTitBox {
		display: inline-block;
		color: #020202;
		font-size: 30upx;
		font-weight: bold;
		position: relative;
		/* margin: 58upx 0 34upx; */
	}

	.plateBox .plateLine {
		width: 100%;
		height: 20upx;
		background: #b1ddf6;
		position: absolute;
		bottom: 0;
		z-index: -1;
	}

	.plateBox .allBtn {
		color: #8d92a3;
		font-size: 22upx;
		/* margin: 58upx 0 34upx; */
	}

	.plateBox .newBtn {
		color: #6a6a6a;
		font-size: 24upx;
	}

	.plateBox .newBtn .icon-jia {
		margin-right: 8upx;
		font-size: 28upx;
	}

	/* 遮罩层 */

	.shadeBox {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 97;
	}

	.shadeBox .shade {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 98;
	}

	.shadeBox .shadeCont {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		z-index: 99;
		text-align: center;
	}

	.shadeBox .shadeDet {
		width: 90%;
		height: 66%;
		margin: 10% auto 0;
		background: #fff;
		border-radius: 20upx;
		padding-top: 60upx;
	}

	/* 底部定位 */
	.botBtnBoxFix {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.09);
	}

	/* 底部按钮 */
	.maxBtn,
	.maxBdBtn {
		width: 90%;
		height: 86upx;
		line-height: 86upx;
		text-align: center;
		color: #fff;
		background: #197cb7;
		border: 2upx solid #197cb7;
		box-shadow: 0px 3px 8px 0px rgba(25, 124, 183, 0.31);
		border-radius: 8upx;
		margin: 22upx auto;
		font-size: 30upx;
		font-weight: 500;
	}

	.maxBdBtn {
		background: #fff;
		border: 2upx solid #197cb7;
		color: #197cb7;
	}

	.buleBtn,
	.grayBtn {
		width: 124upx;
		height: 42upx;
		text-align: center;
		font-size: 24upx;
		color: rgba(255, 255, 255, 1);
		line-height: 42upx;
		background: rgba(25, 124, 183, 1);
		box-shadow: 0px 4px 7px 0px rgba(25, 124, 183, 0.14);
		border-radius: 44upx;
	}

	.grayBtn {
		background: rgba(216, 216, 216, 1);
		box-shadow: 0px 8px 30px 0px rgba(227, 227, 227, 0.37);
	}

	/* 底部双按钮 */
	.botBox .closeBtn,
	.botBox .agreeBtn {
		width: 44%;
		font-size: 32upx;
		padding: 30upx 0;
		margin: 0 3%;
		text-align: center;
		border-radius: 8upx;
	}

	.botBox .closeBtn {
		border: 1upx solid #f2f2f2;
		color: #197CB7;
	}

	.botBox .agreeBtn {
		color: #fff;
		background: #197CB7;
	}

	.buleHollowBtn {
		width: 180upx;
		height: 52upx;
		background: #fff;
		color: #197CB7;
		border: 1upx solid #197CB7;
		text-align: center;
		line-height: 52upx;
		border-radius: 24upx;
		font-size: 20upx;
	}

	/* 主内容 */
	.mainCom {
		width: 90%;
		margin: 0 auto;
		padding-top: 170upx;
		position: relative;
	}

	/* 主色调 */
	.mainCol {
		color: #197cb7;
	}

	.redCol {
		color: #F2004F;
	}

	/* 外间距 */
	.m_t30 {
		margin-top: 30upx;
	}

	.m_t40 {
		margin-top: 40upx;
	}

	.m_b30 {
		margin-bottom: 30upx;
	}

	.m_b20 {
		margin-bottom: 20upx;
	}

	.m_l10 {
		margin-left: 10upx;
	}

	/* 内间距 */
	.p_r20 {
		padding-right: 20upx;
	}

	.p_tb40 {
		padding: 40upx 0;
	}

	.p_b30 {
		padding-bottom: 30upx;
	}

	.p_t30 {
		padding-top: 30upx;
	}

	.p_b40 {
		padding-bottom: 40upx;
	}

	.p_t40 {
		padding-top: 40upx;
	}

	/* 边框 */
	.b_b {
		border-bottom: 2upx solid #ededed;
	}

	.b_b_r {
		border-bottom: 1upx solid red;
	}

	.b_r {
		border-right: 2upx solid #ededed;
	}

	.b_t {
		border-top: 2upx solid #ededed;
	}

	.b_b20 {
		border-bottom: 20upx solid #eeeef0;
	}

	/* 无结果 */

	.noSrh {
		margin: 0 auto;
		text-align: center;
		padding-top: 164upx;
	}

	.srhImg {
		width: 282upx;
		height: 208upx;
	}

	.noText {
		color: #999;
		font-size: 30upx;
		padding-top: 50upx;
	}

	/* 宽度 */
	.w90 {
		width: 90%;
		margin: 0 auto;
	}

	/* 弹性布局 */
	.flex_b_c {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex_l_e {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.flex_b_e {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.flex_c_c {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex_l_c {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flex_r_c {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.flex_t_b {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.flex_l_t {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.flex_l_b {
		display: flex;
		justify-content: flex-start;
		align-content: space-between;
	}

	.flex_c_b {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/* 文字对齐 */
	.text_c {
		text-align: center;
	}

	.text_l {
		text-align: left;
	}

	.text_r {
		text-align: right;
	}

	/* 左右滑动分类 */
	.scroll-ul {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		display: flex;
		position: fixed;
		left: 0;
		top: 168upx;
		background: #fff;
		z-index: 99;
	}

	.scroll-ul .scroll-li {
		display: inline-block;
		padding: 20upx 30upx;
		font-size: 28upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #97989a;
		font-weight: 600;
	}

	.scroll-ul .scroll-li .cur {
		font-size: 36upx;
		color: #020202;
	}

	.scroll-ul .scroll-li .line {
		width: 32upx;
		height: 6upx;
		background: #197cb7;
		border-radius: 4upx;
		margin: 4upx auto;
	}

	.swiper-box {
		padding-top: 110upx;
		height: 78vh;
		overflow: scroll;
	}

	.swiper-box .swiper {
		position: absolute;
		overflow: scroll;
	}

	scroll-view [style*='overflow']::-webkit-scrollbar {
		display: none;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.omit {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.omit2 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.omit3 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	/* 搜索 */
	.srhBox {
		position: fixed;
		top: 170upx;
		left: 0;
		width: 100%;
		background: #fff;
		font-size: 30upx;
		z-index: 2;
		padding: 28upx 20upx;
	}

	.srhBox .srhIptBox {
		width: 600upx;
		height: 72upx;
		background: rgba(243, 243, 244, 1);
		border-radius: 36upx;
	}

	.srhBox .srhIcon {
		color: #95959A;
		font-size: 40upx;
		margin: 0 10upx;
	}

	.srhBox .srhBtn {
		font-size: 32upx;
		margin-left: 20upx;
	}

	.linkBtn {
		color: #197cb7;
		font-size: 28upx;
		display: inline-block;
		margin: 20upx auto 0;
		border-bottom: 2upx solid #197cb7;
	}

	/* 缺省页 */
	.warmPrompt {
		margin: 0 auto;
		text-align: center;
		padding-top: 164upx;
		color: #CCCCCC;
		font-size: 26upx;
	}

	.warmPrompt .noInfoImg {
		width: 348upx;
		height: 356upx;
	}

	.warmPrompt .noNetImg {
		width: 348upx;
		height: 294upx;
	}

	.warmPrompt .solidBtn {
		width: 250upx;
		border-radius: 4upx;
		margin: 90upx auto 0;
	}

	/* 轮播图 */
	.bannerBox {
		width: 100%;
		height: 240upx;
		border-radius: 18upx;
	}

	.bannerBox .slide-image {
		width: 100%;
		height: 100%;
		border-radius: 18upx;
	}

	/* 书籍图片 */
	.bookImg {
		width: 144upx;
		height: 188upx;
		border-radius: 12upx;
		background: #ffffff;
		border: 2upx solid rgba(237, 237, 237, 1);
	}

	/* 一排三块布局 */
	.threeBox,
	.twoBox {
		display: flex;
		flex-wrap: wrap;
	}

	.threeBox>view {
		width: 26%;
		height: 332upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.06);
		border-radius: 6upx;
		text-align: center;
		padding: 0 2%;
		margin: 30upx 5% 0 0;
	}

	.threeBox>view:nth-of-type(3n) {
		margin-right: 0;
	}

	.threeBox .bookImg {
		margin-top: 32upx;
		border: none;
	}

	.threeBox .tit {
		color: #5d6378;
		font-size: 24upx;
		font-weight: 600;
		padding: 14upx 0 10upx;
	}

	.threeBox .author {
		color: #999999;
		font-size: 22upx;
	}

	/* 一排二块布局 */
	.twoBox>view {
		width: 47%;
		/* background: rgba(255, 255, 255, 1); */
		/* box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.06); */
		margin: 0 30upx 30upx 0;
	}

	.twoBox>view:nth-of-type(2n) {
		margin-right: 0;
	}

	/* 本周活动预告 */
	.weekAct {
		background: linear-gradient(180deg, rgba(234, 249, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
		border-radius: 16upx;
		font-size: 20upx;
		font-weight: 300;
		color: rgba(102, 102, 102, 1);
		padding: 36upx;
	}

	.weekAct .info {
		width: 402upx;
		padding-right: 34upx;
	}

	.weekAct .info>view {
		line-height: 36upx;
	}

	.weekAct .tit {
		font-size: 30upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding-bottom: 12upx;
	}

	.weekAct .img {
		width: 162upx;
		height: 108upx;
	}

	/* 小编推荐 */
	.recommend {
		background-image: url('~@/static/imgs/index_bg.png');
		background-size: 100% 100%;
		width: 100%;
		height: 314upx;
		color: #999999;
		font-size: 22upx;
		margin-top: 30upx;
	}

	.recommend .bookImg {
		border: none;
		margin: 0 32upx;
		background: transparent;
	}

	.recommend .info {
		width: 62%;
	}

	.recommend .tit {
		font-size: 32upx;
		font-weight: 600;
		color: rgba(59, 66, 87, 1);
		margin-bottom: 12upx;
	}

	.recommend .authorBox {
		padding-top: 18upx;
	}

	.recommend .author {
		font-weight: 600;
		font-size: 20upx;
	}

	.recommend .seeBtn {
		width: 120upx;
		height: 44upx;
		background: rgba(124, 194, 234, 1);
		box-shadow: 0px 4px 7px 0px rgba(25, 124, 183, 0.14);
		border-radius: 26upx;
		text-align: center;
		line-height: 44upx;
		color: #ffffff;
		font-size: 18upx;
	}

	/* 书单 */
	.bookListItem {
		width: 98%;
		margin: 0 auto;
		border-radius: 8px;
		background: #ffffff;
		position: relative;
		box-shadow: inset 0px -3px 5px 0px rgba(0, 0, 0, 0.06);
	}

	.bookListItem .bookBox {
		margin: 36upx;
	}

	.bookListItem .bookBox .line1,
	.bookListItem .bookBox .line2 {
		width: 18upx;
		height: 166upx;
		background: #f0f0f0;
		border: 2upx dashed rgba(215, 215, 215, 1);
		border-left: none;
		border-radius: 0 12upx 12upx 0;
	}

	.bookListItem .bookBox .line2 {
		height: 138upx;
		background: #fafafa;
		border: 2upx dashed rgba(215, 215, 215, 1);
	}

	.bookListItem .bookInfo {
		padding: 36upx 36upx 36upx 0;
		height: 188upx;
	}

	.bookListItem .bookTit {
		color: #5d6378;
		font-size: 28upx;
		font-weight: 600;
	}

	.bookListItem .authorImg {
		width: 28upx;
		height: 30upx;
		border-radius: 50%;
		margin: 16upx 14upx 0 0;
	}

	.bookListItem .authorName {
		color: #999999;
		font-size: 24upx;
		margin-top: 16upx;
		width: 240upx;
		display: inline-block;
	}

	.bookListItem .bookNumBox {
		color: #666666;
		font-size: 18upx;
	}

	.bookListItem .icon_book {
		width: 28upx;
		height: 24upx;
	}

	.bookListItem .icon-zan {
		font-size: 28upx;
		color: #e4e1e1;
	}

	/* 榜单 */
	.noFixed .scroll-ul {
		position: relative;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.crunchies .crunchiesBox {
		width: 90%;
		margin: 0 auto;
	}

	.crunchiesItem>view {
		padding-bottom: 56upx;
	}

	.crunchies .numBox {
		width: 26px;
		text-align: center;
		font-size: 48upx;
		color: #d0d0d0;
		font-weight: 600;
	}

	.crunchies .numImg {
		width: 48upx;
		height: 40upx;
	}

	.crunchies .bookImg {
		margin: 0 38upx;
	}

	.crunchies .tit {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		padding-bottom: 12upx;
	}

	.crunchies .info {
		color: #8d92a3;
		font-size: 20upx;
		width: 58%;
	}

	.crunchies .seeAll {
		font-size: 22upx;
		color: #8d92a3;
		text-align: center;
	}

	/* 悦读--视频 */
	.videoBox .videoImgBox {
		position: relative;
	}

	.videoBox .videoImg {
		width: 318upx;
		height: 180upx;
		border-radius: 10upx;
	}

	.videoBox .playIcon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 60upx;
		z-index: 1;
	}

	.videoBox .tit {
		font-size: 24upx;
		color: #5d6378;
		margin: 10upx 0;
	}

	/* 戏剧知识 */
	.dramaItem {
		width: 97%;
		height: 130upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 10px 1px rgba(231, 231, 231, 1);
		border-radius: 6upx;
		margin: 0 auto 20upx;
		color: #5d6378;
		font-size: 26upx;
		position: relative;
	}

	.dramaItem .icon_drameBook {
		width: 44upx;
		height: 36upx;
		margin: 0 24upx 0 44upx;
	}

	.dramaItem .tit {
		width: 75%;
	}

	.dramaItem .dot {
		width: 20upx;
		height: 24upx;
		border-radius: 50%;
		background: #f4f4f4;
		position: absolute;
		top: 50%;
		right: -6upx;
		transform: translateY(-50%);
	}

	/* 戏剧人物 */
	.characters .headImg {
		height: 142upx;
		width: 142upx;
		border-radius: 50%;
		margin-bottom: 14upx;
		margin-top: 20upx;
	}

	.characters .item {
		color: #5d6378;
		font-size: 20upx;
	}

	/* 古村古镇 */
	.town .dramaItem .lineBar {
		width: 6upx;
		height: 60upx;
		margin: 0 20upx 0 36upx;
		background: rgba(208, 202, 176, 1);
	}

	.town .dramaItem .info {
		width: 85%;
	}

	.town .dramaItem .tit {
		color: #494949;
		font-size: 26upx;
		font-weight: 600;
		margin-bottom: 8upx;
		width: 100%;
	}

	.town .dramaItem .addr {
		color: #b4b4b4;
		font-size: 22upx;
	}

	.intangible .twoBox>uni-view {
		box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.06);
	}

	.intangible .icon {
		width: 80upx;
		height: 80upx;
		margin: 24upx 34upx;
	}

	.intangible .tit {
		width: 90upx;
		color: #5d6378;
		font-size: 24upx;
		padding-left: 28upx;
	}

	.finished .dot {
		width: 8upx;
		height: 8upx;
		background: rgba(51, 51, 51, 1);
		border-radius: 50%;
		margin: 40upx 12upx 20upx 20upx;
	}

	.finished .goodsItem>view {
		height: 128upx;
		color: #333333;
		font-size: 24upx;
		font-weight: 600;
		background: #f4fbfd;
	}

	.finished .tit {
		margin: 26upx 0;
		width: 78%;
		line-height: 34upx;
	}

	.finished .goodsItem>view:nth-of-type(2),
	.finished .goodsItem>view:nth-of-type(5) {
		background: #fffcf7;
	}

	.finished .goodsItem>view:nth-of-type(3),
	.finished .goodsItem>view:nth-of-type(6) {
		background: #fff6f5;
	}

	/* 书架 */
	.readBooks .threeBox>view {
		box-shadow: 0 0 0 0 #ffffff;
		height: auto;
		padding: 0;
		width: 30%;
		text-align: left;
		margin: 20px 5% 0 0;
	}

	.readBooks .threeBox>view:nth-of-type(3n) {
		margin-right: 0;
	}

	.readBooks .bookImg {
		width: 180upx;
		height: 236upx;
		margin-top: 0;
		border: 2upx solid rgba(237, 237, 237, 1);
	}

	.readBooks .threeBox .tit {
		padding: 7px 0 0;
	}

	.list0 .moreBtn {
		width: 100%;
		height: 72upx;
		line-height: 72upx;
		text-align: center;
		color: #999999;
		font-size: 24upx;
		background: rgba(249, 249, 249, 1);
		border-radius: 4px;
	}

	/* 书单详情 */
	#bookList_det .top {
		background-image: url('~@/static/imgs/bookListDet_bg.png');
		background-size: 100% 100%;
		width: 100%;
		padding: 30upx 0;
	}

	#bookList_det .top .bookListItem {
		background: transparent;
		box-shadow: 0 0 0 0 transparent;
	}

	#bookList_det .bookListItem .bookInfo {
		height: auto;
		padding: 0;
		width: 58%;
	}

	#bookList_det .seeNum {
		color: #999999;
		font-size: 20upx;
		margin-top: 8px;
	}

	#bookList_det .btnBox>view {
		color: #020202;
		font-size: 22upx;
		background: #ffffff;
		border-radius: 8upx;
		padding: 20upx 30upx;
		margin-top: 24upx;
		margin-right: 20upx;
		border: 2upx solid rgba(245, 245, 245, 1);
	}

	#bookList_det .btnBox>view:last-of-type {
		margin-right: 0;
	}

	#bookList_det .btnBox .iconfont {
		font-size: 24upx;
		margin-right: 16upx;
	}

	#bookList_det .btnBox .icon-shanchu {
		font-size: 32upx;
	}

	#bookList_det .btnBox .delBtn {
		padding: 20upx 52upx;
	}

	#bookList_det .bookInfo .bookTit {
		color: #333333;
		font-size: 44upx;
	}

	#bookList_det .listBox>view {
		width: 90%;
		margin: 0 auto;
		padding: 40upx 0;
		position: relative;
		border-bottom: 2upx solid #f7f7f7;
	}

	#bookList_det .listBox .bookInfo {
		height: 188upx;
		width: 62%;
		margin-left: 40upx;
	}

	#bookList_det .listBox .tit {
		color: #020202;
		font-size: 28upx;
		font-weight: bold;
	}

	#bookList_det .listBox .info {
		color: #999999;
		font-size: 22upx;
	}

	#bookList_det .listBox .iocn {
		position: absolute;
		bottom: 30upx;
		right: 0;
		color: #cccccc;
		font-weight: bold;
		font-size: 20px;
		z-index: 2;
	}

	#bookList_det .removBtn {
		width: 210upx;
		height: 88upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
		border-radius: 4upx;
		position: absolute;
		bottom: -64upx;
		right: 0;
		text-align: center;
		line-height: 88upx;
		color: #333333;
		font-size: 26upx;
		z-index: 4;
	}

	/* 我的 */
	.my .icon1 {
		width: 46upx;
		height: 42upx;
		margin-right: 44upx;
	}

	.my .userBox {
		padding-left: 56upx;
	}

	.my .headImg {
		width: 124upx;
		height: 124upx;
		margin-right: 40upx;
		border-radius: 50%;
	}

	.my .name {
		font-size: 52upx;
		color: #020202;
		font-weight: bold;
		margin-bottom: 20upx;
		width: 360upx;
	}

	.my .hint {
		font-size: 26upx;
		color: #999999;
	}

	.my .center {
		background: linear-gradient(to right, #87c7eb, #a2ddff);
		width: 148upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		color: #ffffff;
		font-size: 18upx;
		border-radius: 40upx 0 0 40upx;
	}

	.my .centerIon {
		font-size: 24upx;
		color: #ffffff;
	}

	.my .icon2 {
		width: 52upx;
		height: 52upx;
		margin-right: 8upx;
	}

	.my .muneBox {
		box-shadow: 0 0 26upx 0 rgba(0, 0, 0, 0.04);
		color: #2b2b2b;
		font-size: 24upx;
		padding: 40upx 32upx;
		border-radius: 66upx;
		margin: 52upx 34upx 22upx;
		font-weight: bold;
	}

	.my .muneBox .line {
		width: 2upx;
		height: 42upx;
		background: #ededed;
	}

	.my .muneItem>view {
		margin-left: 58upx;
		padding: 30upx 36upx 30upx 0;
		color: #2b2b2b;
		font-size: 28upx;
		font-weight: bold;
		border-bottom: 2upx solid #f7f7f7;
	}

	.my .muneItem>view:last-of-type {
		margin-left: 0;
		padding: 30upx 36upx 30upx 58upx;
		border-bottom: 22upx solid #eeeef0;
	}

	.my .iocn5 {
		width: 36upx;
		height: 36upx;
		margin-right: 48upx;
	}

	.my .iocn6 {
		width: 36upx;
		height: 30upx;
		margin-right: 46upx;
	}

	.my .iocn7 {
		width: 34upx;
		height: 36upx;
		margin-right: 50upx;
	}

	.my .iocn8 {
		width: 38upx;
		height: 38upx;
		margin-right: 46upx;
	}

	.my .iocn9 {
		width: 42upx;
		height: 26upx;
		margin-right: 40upx;
	}

	.my .iocn10 {
		width: 38upx;
		height: 38upx;
		margin-right: 44upx;
	}

	.my .iocn11 {
		width: 38upx;
		height: 36upx;
		margin-right: 44upx;
	}

	.my .iocn12 {
		width: 40upx;
		height: 36upx;
		margin-right: 42upx;
	}

	.my .intoIocn {
		font-size: 44upx;
		color: #95a0b6;
		font-weight: 400;
	}

	.my .nowBanding {
		font-size: 24upx;
		color: #999999;
		font-weight: 400;
	}

	/* 书库列表 */
	.libraryList .bookListItem {
		box-shadow: 0 0 0 0 #fff;
		border-bottom: 2upx solid #f7f7f7;
	}

	/* 书籍详情 */
	#bookDet .mainCom>view {
		border-bottom: 20upx solid #eeeef0;
	}

	#bookDet .mainCom>view:last-of-type {
		border-bottom: none;
	}

	#bookDet .coverImg {
		width: 230upx;
		height: 300upx;
		margin: 40upx;
	}

	.bookInfoBox {
		color: #999999;
		font-size: 22upx;
		width: 400upx;
		margin: 40upx 0;
	}

	.bookInfoBox>view {
		line-height: 36upx;
	}

	.bookInfoBox .tit {
		color: #3a3d4a;
		font-size: 38upx;
		font-weight: bold;
		margin-bottom: 14upx;
		line-height: 52upx;
	}

	#bookDet .scroll-ul {
		width: 90%;
		margin: 0 auto;
	}

	#bookDet .scroll-ul .scroll-li {
		padding: 10px 6px;
	}

	#bookDet .scroll-ul .scroll-li .cur {
		font-size: 28upx;
	}

	.botBox {
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 24upx 0;
		box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.09);
	}

	.botBox .collect {
		width: 88upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 50%;
		text-align: center;
		background: #ececec;
		margin: 0 46upx;
	}

	.botBox .collectIcon {
		color: #8d92a3;
		font-size: 36upx;
	}

	.borderBtn {
		width: 210upx;
		height: 80upx;
		border-radius: 10px;
		border: 2upx solid #197cb7;
		color: #197cb7;
		font-size: 30upx;
		text-align: center;
		line-height: 80upx;
		font-weight: bold;
	}

	.solidBtn {
		width: 300upx;
		height: 80upx;
		border-radius: 10px;
		border: 2upx solid #197cb7;
		background: #197cb7;
		color: #ffffff;
		font-size: 30upx;
		text-align: center;
		line-height: 80upx;
		font-weight: bold;
		margin: 0 28upx;
	}

	#bookDet .synopsisBox {
		width: 90%;
		margin: 0 auto;
		font-size: 28upx;
		color: #999999;
	}

	#bookDet .synopsisBox>view {
		margin: 40upx 0;
	}

	#bookDet .seeAll {
		color: #8d92a3;
		font-size: 22upx;
		padding: 34upx 0;
	}

	#bookDet .seeAll .iconfont {
		font-size: 40upx;
		margin-left: 12upx;
	}

	#bookDet .inTheInfo>view>view {
		width: 24%;
		text-align: center;
		padding: 20upx 0;
	}

	#bookDet .detTit {
		font-size: 28upx;
		color: #999999;
	}

	/* 积分商城 */
	.integral .statusBar {
		background: #0068a8;
	}

	.integral .titBar {
		background: #0068a8;
	}

	.integral .backBtn {
		color: #ffffff;
		margin-left: 50upx;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 56px;
	}

	.integral .topBox {
		background-image: url('~@/static/imgs/integral_bg.png');
		background-size: 100% 100%;
		width: 100%;
		height: 430upx;
		position: relative;
	}

	.integral .topBox .tasks {
		width: 100%;
		height: 236upx;
	}

	.integral .muneBox {
		width: 90%;
		margin: 0 auto;
		box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.04);
		border-radius: 7px;
		background: #fff;
		position: absolute;
		bottom: -180upx;
		left: 5%;
	}

	.integral .muneBox>view {
		color: #5c5f66;
		font-size: 24upx;
		text-align: center;
		margin: 38upx 44upx;
	}

	.integral .muneBox .iconImg {
		width: 136upx;
		height: 104upx;
	}

	.integral .exchange {
		padding-top: 200upx;
	}

	.integral .exchange .plateTitBox {
		font-size: 36upx;
	}

	.integral .smallIconImg {
		width: 72upx;
		height: 72upx;
		margin-right: 40upx;
	}

	.integral .goodsName {
		color: #2a2a2a;
		font-size: 28upx;
		font-weight: bold;
	}

	.integral .goodsInt {
		color: #999999;
		font-size: 24upx;
	}

	.integral .twoBox>view {
		width: 49.5%;
		margin: 0;
	}

	.integral .twoBox>view:nth-of-type(2n) {
		border-right: none;
	}

	.integral .twoBox>view:nth-of-type(2n) .smallIconImg {
		margin-right: 0upx;
	}

	.integral .twoBox>view:nth-of-type(2n) .goodsItem {
		margin-left: 40upx;
	}

	/* 活动项 */
	.activityItem {
		padding: 34upx;
		margin: 30upx auto;
		font-size: 24upx;
		color: #999999;
		position: relative;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04);
		border-radius: 20upx;
	}

	.activityItem .tit {
		color: #020202;
		font-size: 28upx;
		font-weight: bold;
		margin-bottom: 14upx;
	}

	/* 活动详情 */
	#actDet {
		font-size: 24upx;
		color: #757575;
		line-height: 48upx;
	}

	#actDet .bannerImg {
		width: 100%;
		height: 280upx;
		border-radius: 10upx;
		margin-top: 40upx;
	}

	#actDet .topInfo {
		margin: 30upx 0;
	}

	#actDet .actItemTit {
		font-size: 28upx;
		color: #197CB7;
	}

	#actDet .actTit {
		font-size: 36upx;
		color: rgba(33, 33, 33, 1);
	}

	#actDet .state {
		padding: 18upx 0;
	}

	#actDet .state>view {
		padding-right: 60upx;
	}

	#actDet .hide {
		height: 120upx;
		overflow: hidden;
	}

	#actDet .headBox {
		display: inline-block;
		width: 82upx;
		height: 82upx;
		overflow: hidden;
		border-radius: 50%;
		border: 1upx solid #F54B64;
		margin: 30upx 30upx 0 0;
	}

	#actDet .headBox image {
		width: 80%;
		height: 80%;
		border-radius: 50%;
		margin: 10%;
	}

	#actDet .applyHead>view:nth-child(6n) {
		margin-right: 0;
	}

	#actDet .headImg {
		width: 66upx;
		height: 66upx;
		border-radius: 50%;
		margin: 8upx;
	}

	#actDet .downIcon {
		text-align: center;
		font-size: 60upx;
		color: #9B9B9B;
	}

	.infoItem {
		padding: 34upx;
		margin: 30upx auto;
		font-size: 24upx;
		color: #A6A6A6;
		box-shadow: 0px 8px 30px 0px rgba(227, 227, 227, 0.37);
		border-radius: 20upx;
		position: relative;
	}

	.infoItem .info {
		width: 70%;
		padding-left: 14px;
		line-height: 44upx;
	}

	.infoItem .info .tit {
		font-size: 32upx;
		color: #000000;
		margin-bottom: 10upx;
	}

	.infoItem .press {
		width: 290upx;
	}

	/* 报名结果 */
	.applyResult {
		font-size: 28upx;
		color: rgba(78, 80, 83, 1);
		line-height: 48upx;
	}

	.applyResult .mainCom {
		width: 80%;
	}

	.applyResult .accepted {
		font-size: 64upx;
		line-height: 90upx;
		font-weight: bold;
		padding-top: 70upx;
	}

	.applyResult .become {
		color: rgba(204, 204, 204, 1);
		line-height: 60upx;
	}

	.applyResult image {
		display: block;
		width: 452upx;
		height: 372upx;
		margin: 48upx auto;
	}

	.applyResult .come {
		text-align: center;
	}

	.applyResult .element {
		width: 350upx;
		text-align: left;
		margin: 0 auto;
	}

	.applyResult .maxBtn {
		position: fixed;
		bottom: 40upx;
		left: 5%;
	}

	/* 卡片样式 */
	#cardBox .topPart {
		width: 95%;
		margin: 30upx auto 0;
		box-shadow: 2px 2px 20px 7px #F4F4F4;
	}

	#cardBox .cardTitBox {
		padding: 74upx 0;
	}

	#cardBox .cardTit {
		border-left: 16upx solid #197cb7;
		line-height: 50upx;
		padding: 0 34upx;
		font-size: 34upx;
		color: #1B2749;
	}

	#cardBox .actTit {
		color: #7F8592;
		font-size: 22upx;
		padding-bottom: 16upx;
	}

	#cardBox .cardTit .date {
		font-size: 22upx;
		color: #7F8592;
	}

	#cardBox .payImg {
		width: 84upx;
		height: 74upx;
		margin-right: 46upx;
	}

	#cardBox .parkInfo,
	.charges {
		padding: 0 30upx;
		font-size: 24upx;
		color: #BEBEBE;
		line-height: 80upx;
	}

	#cardBox .parkInfo>view>view:last-of-type {
		color: #1B2749;
	}

	#cardBox .gross {
		padding: 20upx 0 40upx;
		margin-top: 20upx;
	}

	#cardBox .raduLeft,
	#cardBox .raduRight {
		width: 20upx;
		height: 30upx;
		background: linear-gradient(to left, #E6E6E6, #F1F1F1);
		border-radius: 0 50% 50% 0;
	}

	#cardBox .raduRight {
		border-radius: 50% 0 0 50%;
	}

	#cardBox .line {
		width: 100%;
		border-bottom: 1upx dashed #C6C6C6;
	}

	#cardBox .charges {
		padding-top: 40upx;
		line-height: 40upx;
		height: 160upx;
		box-shadow: 0 0px 20px 7px #F4F4F4;
	}

	#cardBox .activityPlaceBox {
		width: 100%;
	}

	#cardBox .activityPlaceTit {
		width: 25%;
		text-align: left;
	}

	#cardBox .activityPlace {
		width: 75%;
		line-height: 40upx;
		text-align: right;
	}

	#cardBox .maxBtn {
		width: 95%;
		margin-top: 50upx;
	}

	/* 下拉框 */
	.pullDownBox {
		width: 90%;
		margin: 0 auto;
		color: #3E3E3E;
		font-size: 28upx;
	}

	.pullDownBox .tiemIcon {
		color: #9B9B9B;
		font-size: 30upx;
		padding-right: 20upx;
	}

	.pullDownBox>view>view:first-of-type {
		width: 90%;
		/* padding: 35upx 0; */
		line-height: 100upx;
		height: 100upx;
	}

	.pullDownBox .clearBtn {
		text-align: center;
		font-size: 28upx;
		padding: 30upx 0;
	}

	/* 协议 */
	.protocol>view {
		font-size: 22upx;
		color: #666;
		line-height: 50upx;
	}

	.protocol .tit {
		font-size: 26upx;
		color: #666;
		font-weight: bold;
	}

	/* 书籍信息 */
	#bookInfo,
	.sweep_bg {
		height: 100vh;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	#bookInfo .statusBar,
	#bookInfo .titBar {
		background: transparent;
	}

	#bookInfo .backBtn,
	#bookInfo .tit {
		color: #fff;
	}

	#bookInfo .infoBox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		width: 84%;
		padding: 50upx 20upx;
		font-size: 34upx;
		border-radius: 24upx;
	}
</style>
