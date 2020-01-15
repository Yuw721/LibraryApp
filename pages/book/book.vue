<template>
	<!-- 悦读 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="srhBox flex_l_c" @click="searchBookAndActive">
				<view class="srhIptBox flex_l_c">
					<text class="iconfont icon-search-line srhIcon"></text>
					<input type="text" :value="name" @input.stop="search" placeholder="搜索…" class="srhIpt" />
				</view>
				<view class="mainCol srhBtn" @click.stop="searchBookList">搜索</view>
			</view>
		</view>
		<view class="mainCom">
			<scroll-view class="scroll-ul" scroll-x>
				<view class="scroll-li" v-for="(item, index) in tabArr" :key="item.name" @click="tabClick(index)">
					<view :class="index == currentIndex ? 'cur' : ''">{{item.name}}</view>
					<view class="line" v-if="index == currentIndex"></view>
				</view>
			</scroll-view>
			<view class="warmPrompt" v-if="!isNet">
				<image src="../../static/imgs/no_net.png" class="noNetImg"></image>
				<view class="txt">亲，网络不给力，请检查网络，稍后再试哦。</view>
				<view class="solidBtn">重新加载</view>
			</view>
			<swiper v-if="isNet" class="swiper-box" :current="currentIndex" @change="tabChange">
				<!-- 书架 -->
				<swiper-item class='swiper'>
					<!-- 轮播图-->
					<view class="p_b40">
						<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='bookrackBanner.length != 0'
						 circular='true' autoplay="true" interval="3000" duration="1000">
							<block v-for="(item, index) in bookrackBanner" :key="index">
								<swiper-item @click="bannerClick(item)">
									<image :src="item.image" class="slide-image">
								</swiper-item>
							</block>
						</swiper>
					</view>
					<!-- 没有登录 -->
					<view class="warmPrompt" v-if="!hasLogin">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，你还没有登录哦。</view>
						<view class="mainSmallBtn" @click="toLogin">点击登录</view>
					</view>
					<!-- 没有绑定借阅证 -->
					<view class="warmPrompt" v-if="hasLogin && !isBinding">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，你还没有绑定借阅证哦。</view>
						<view class="solidBtn" @click="bindCard">绑定借阅证</view>
					</view>
					<!-- 没有任何与个人相关的内容 -->
					<view class="warmPrompt" v-if="hasLogin && !isCom && isBinding">
						<image src="../../static/imgs/no_info.png" class="noInfoImg"></image>
						<view class="txt">亲，快去充实你的书架把。</view>
						<view class="solidBtn">预约书籍</view>
					</view>
					<view class="list0 p_b30" v-if="hasLogin && isBinding && isCom">
						<!-- 在读书籍 -->
						<view class="p_b40 readBooks" v-if="onlineBooklist.length!=0">
							<view class="flex_b_c plateBox">
								<view class="plateTitBox">
									<view>在读书籍</view>
									<view class="plateLine"></view>
								</view>
							</view>
							<view class="threeBox">
								<view @click="toBookDet(item.bookRecno)" v-for="(item,index) in onlineBooklist" :key='index'>
									<view>
										<image :src="item.img" mode="aspectFit" class="bookImg"></image>
									</view>
									<view class="omit2 tit">{{item.title}}</view>
								</view>
							</view>
						</view>
						<!-- 预约书籍 -->
						<view class="p_b40" v-if="serBookOrder.length!=0">
							<view class="flex_b_c m_b30 plateBox">
								<view class="plateTitBox">
									<view>预约书籍</view>
									<view class="plateLine"></view>
								</view>
								<!-- <view class="allBtn">全部</view> -->
							</view>
							<view>
								<view class="p_b30" v-for="(item,index) in serBookOrder" :key="index">
									<view class="bookListItem flex_l_t" @click="toBookDet(item.bookrecno)">
										<view class="flex_l_c bookBox">
											<view class="bookImgBox">
												<image :src="item.image" class="bookImg" mode='aspectFit'></image>
											</view>
										</view>
										<view class="bookInfo">
											<view class="bookTit omit2">{{item.title}}</view>
											<view class="authorName omit" v-if="item.author!=null">作者：{{item.author}}</view>
											<view class="authorName omit" v-if="item.pubdate!=null">出版社：{{item.pubdate}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 参与活动 -->
						<view class="videoBox p_b40" v-if="activityList.length>0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>参与活动</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toMyActivities">全部</view>
							</view>
							<view class="twoBox">
								<view v-for="(item,index) in activityList" :key="index" @click="toActiveDet(item.id)">
									<view class="videoImgBox">
										<image :src="item.posterImage" class="videoImg"></image>
									</view>
									<view class="omit2 tit">{{item.theme}}</view>
								</view>
							</view>
						</view>
						<!-- 我的书单 -->
						<view class="p_b40" v-if="myBookList!=null">
							<view class="flex_b_c m_b30 plateBox">
								<view class="plateTitBox">
									<view>我的书单</view>
									<view class="plateLine"></view>
								</view>
								<view class="newBtn" @click="toNewBook">
									<text class="iconfont icon-jia"></text>
									新建书单
								</view>
							</view>
							<view>
								<view class="p_b30">
									<view class="bookListItem flex_l_t" @click="toBookListDet(myBookList.id)">
										<view class="flex_l_c bookBox">
											<view class="bookImgBox">
												<image :src="myBookList.image" class="bookImg" mode='aspectFit'></image>
											</view>
											<view class="line1"></view>
											<view class="line2"></view>
										</view>
										<view class="flex_c_b bookInfo">
											<view>
												<view class="bookTit omit2">{{myBookList.name}}</view>
												<view class="flex_l_c">
													<image :src="myBookList.headPortrait" class="authorImg"></image>
													<text class="authorName omit">{{myBookList.nickname}}</text>
												</view>
											</view>
											<view class="flex_l_c bookNumBox">
												<view class="p_r20 flex_l_c">
													<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
													<text class="m_l10">{{myBookList.bookSize}}本书</text>
												</view>
												<view class="flex_l_c">
													<text class="iconfont icon-zan"></text>
													<text class="m_l10">{{myBookList.collectionCount}}人</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="moreBtn" @click="toMoreBookList(0)">更多</view>
							</view>
						</view>
						<!-- 收藏书单 -->
						<view class="p_b40" v-if="myFollowBookList!=null">
							<view class="flex_b_c m_b30 plateBox">
								<view class="plateTitBox">
									<view>收藏书单</view>
									<view class="plateLine"></view>
								</view>
							</view>
							<view>
								<view class="p_b30">
									<view class="bookListItem flex_l_t" @click="toBookListDet(myFollowBookList.id)">
										<view class="flex_l_c bookBox">
											<view class="bookImgBox">
												<image :src="myFollowBookList.image" class="bookImg" mode='aspectFit'></image>
											</view>
											<view class="line1"></view>
											<view class="line2"></view>
										</view>
										<view class="flex_c_b bookInfo">
											<view>
												<view class="bookTit omit2">{{myFollowBookList.name}}</view>
												<view class="flex_l_c">
													<image :src="myFollowBookList.headPortrait" class="authorImg"></image>
													<text class="authorName">{{myFollowBookList.nickname}}</text>
												</view>
											</view>
											<view class="flex_l_c bookNumBox">
												<view class="p_r20 flex_l_c">
													<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
													<text class="m_l10">{{myFollowBookList.bookSize}}本书</text>
												</view>
												<view class="flex_l_c">
													<text class="iconfont icon-zan"></text>
													<text class="m_l10">{{myFollowBookList.collectionCount}}人</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="moreBtn" @click="toMoreBookList(1)">更多</view>
							</view>
						</view>

					</view>
				</swiper-item>
				<!-- 书单 -->
				<swiper-item class='swiper'>
					<view class="list1 p_b30">
						<view class="p_b30">
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='booklistBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in booklistBanner" :key="index">
									<swiper-item @click="bannerClick(item)">
										<image :src="item.image" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view>
							<scroll-view scroll-y="true" @scrolltolower="scrollView" style="height:calc(100vh - 85px)">
								<view class="p_b30" v-for="(item, index) in bookList" :key="item.id" @click="toBookListDet(item.id)">
									<view class="bookListItem flex_l_t">
										<view class="flex_l_c bookBox">
											<view class="bookImgBox">
												<image :src="item.image" class="bookImg" mode='aspectFit'></image>
											</view>
											<view class="line1"></view>
											<view class="line2"></view>
										</view>
										<view class="flex_c_b bookInfo">
											<view>
												<view class="bookTit omit2">{{item.name}}</view>
												<view class="flex_l_c">
													<image :src="item.headPortrait" class="authorImg"></image>
													<text class="authorName">{{item.nickname}}</text>
												</view>
											</view>
											<view class="flex_l_c bookNumBox">
												<view class="p_r20 flex_l_c">
													<image src="../../static/imgs/icon_book.png" class="icon_book"></image>
													<text class="m_l10">{{item.bookSize}}本书</text>
												</view>
												<view class="flex_l_c">
													<text class="iconfont icon-zan"></text>
													<text class="m_l10">{{item.collectionCount}}人</text>
												</view>
											</view>
										</view>
									</view>
								</view>

							</scroll-view>
						</view>
					</view>
				</swiper-item>
				<!-- 书库 -->
				<swiper-item class='swiper'>
					<view class="list2 p_b30">
						<view class="p_b30">
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='stackroomBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in stackroomBanner" :key="index">
									<swiper-item @click="bannerClick(item)">
										<image :src="item.image" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="threeBox p_b30">
							<view v-for="(item,index) in topCategorylist" :key="index" @click="toLibraryList(item.id)">
								<view>
									<image :src="item.img" mode="aspectFit" class="bookImg"></image>
								</view>
								<view class="omit tit">{{item.name}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 视频 -->
				<swiper-item class='swiper'>
					<view class="list3 p_b30">
						<view>
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='videoBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in videoBanner" :key="item">
									<swiper-item>
										<image :src="item" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="videoBox p_t40" v-if="xqtdVideoList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>戏曲天地</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toVideoList('戏曲天地')">全部</view>
							</view>
							<view class="twoBox">
								<view v-for="(item, index) in xqtdVideoList" :key="index" @click="toVideoDet(item)">
									<view class="videoImgBox">
										<view class="iconfont icon-bofang playIcon"></view>
										<image :src="item.source.imagepath" class="videoImg"></image>
									</view>
									<view class="omit tit">{{item.source.title}}</view>
								</view>
							</view>
						</view>

						<view class="videoBox p_t40" v-if="dfxjVideoList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>地方戏剧</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toVideoList('地方戏剧')">全部</view>
							</view>
							<view class="twoBox">
								<view v-for="(item, index) in dfxjVideoList" :key="index" @click="toVideoDet(item)">
									<view class="videoImgBox">
										<view class="iconfont icon-bofang playIcon"></view>
										<image :src="item.source.imagepath" class="videoImg"></image>
									</view>
									<view class="omit tit">{{item.source.title}}</view>
								</view>
							</view>
						</view>

						<view class="videoBox p_t40" v-if="hxwhVideoList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>湖湘文化</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toVideoList('湖湘文化')">全部</view>
							</view>
							<view class="twoBox">
								<view v-for="(item, index) in hxwhVideoList" :key="index" @click="toVideoDet(item)">
									<view class="videoImgBox">
										<view class="iconfont icon-bofang playIcon"></view>
										<image :src="item.source.imagepath" class="videoImg"></image>
									</view>
									<view class="omit tit">{{item.source.title}}</view>
								</view>
							</view>
						</view>


					</view>
				</swiper-item>
				<!-- 戏剧 -->
				<swiper-item class='swiper'>
					<view class="list4 p_b30">
						<view>
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='dramaBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in dramaBanner" :key="item">
									<swiper-item>
										<image :src="item" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="p_t40" v-if="characterList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>戏剧知识</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toDramaList">全部</view>
							</view>
							<view class="dramaItem flex_l_c" v-for="(item, index) in characterList" :key="index" @click="toDramaDet(0,item)">
								<image src="../../static/imgs/icon_drameBook.png" class="icon_drameBook"></image>
								<view class="omit tit">{{item.source.dctitle}}</view>
								<view class="dot"></view>
							</view>
						</view>
						<view class="p_t40 characters">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>戏剧人物</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toDramaCharacters">全部</view>
							</view>
							<view class="threeBox">
								<view class="item" v-for="(item, index) in figureList" :key="index" @click="toDramaDet(1,item)">
									<view>
										<image :src="item.source.picurl" class="headImg"></image>
									</view>
									<view class="omit">{{item.source.dctitle}}</view>
									<view class="omit">（{{item.source.dcdates}}-{{item.source.dcdatee}}）</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 红色故址 -->
				<swiper-item class='swiper'>
					<view class="list5 p_b30">
						<view>
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='oldsiteBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in oldsiteBanner" :key="item">
									<swiper-item>
										<image :src="item" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="characters p_t40" v-if="revolutionarySiteList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>革命活动旧址</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toRedOberoiList(0)">全部</view>
							</view>
							<view class="threeBox">
								<view class="item" v-for="(item, index) in revolutionarySiteList" :key="index" @click="toDramaDet(2,item)">
									<view v-if="item.source.picurl != null">
										<image :src="item.source.picurl" class="headImg"></image>
									</view>
									<view v-else>
										<image src="https://wj.zydbai.com/classify_zwt.png" class="headImg"></image>
									</view>
									<view class="omit2">{{item.source.dctitle}}</view>
								</view>
							</view>
						</view>

						<view class="characters p_t40" v-if="residenceList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>名人故居</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toRedOberoiList(1)">全部</view>
							</view>
							<view class="threeBox">
								<view class="item" v-for="(item, index) in residenceList" :key="index" @click="toDramaDet(2,item)">
									<view v-if="item.source.picurl != null">
										<image :src="item.source.picurl" class="headImg"></image>
									</view>
									<view v-else>
										<image src="https://wj.zydbai.com/classify_zwt.png" class="headImg"></image>
									</view>
									<view class="omit2">{{item.source.dctitle}}</view>
								</view>
							</view>
						</view>

						<view class="characters p_t40" v-if="anniversaryList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>纪念场所</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toRedOberoiList(2)">全部</view>
							</view>
							<view class="threeBox">
								<view class="item" v-for="(item, index) in anniversaryList" :key="index" @click="toDramaDet(2,item)">
									<view v-if="item.source.picurl != null">
										<image :src="item.source.picurl" class="headImg"></image>
									</view>
									<view v-else>
										<image src="https://wj.zydbai.com/classify_zwt.png" class="headImg"></image>
									</view>
									<view class="omit2">{{item.source.dctitle}}</view>
								</view>
							</view>
						</view>

					</view>
				</swiper-item>
				<!-- 古村古镇 -->
				<swiper-item class='swiper'>
					<view class="list6 p_b30">
						<view>
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='townBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in townBanner" :key="item">
									<swiper-item>
										<image :src="item" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="p_t40 town" v-if="ancientVillageList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>古村</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toTownList(0)">全部</view>
							</view>
							<view class="dramaItem flex_l_c" v-for="(item, index) in ancientVillageList" :key="index" @click="toDramaDet(3,item)">
								<view class="lineBar"></view>
								<view class="info">
									<view class="omit tit">{{item.source.title}}</view>
									<view class="omit addr">{{item.source.description}}</view>
								</view>
							</view>
						</view>

						<view class="p_t40 town" v-if="ancientTownList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>古镇</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toTownList(1)">全部</view>
							</view>
							<view class="dramaItem flex_l_c" v-for="(item ,index) in ancientTownList" :key="index" @click="toDramaDet(3,item)">
								<view class="lineBar"></view>
								<view class="info">
									<view class="omit tit">{{item.source.title}}</view>
									<view class="omit addr">{{item.source.description}}</view>
								</view>
							</view>
						</view>

						<view class="p_t40 town" v-if="ancientBuildingList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>古名居</view>
									<view class="plateLine"></view>
								</view>
								<view class="allBtn" @click="toTownList(2)">全部</view>
							</view>
							<view class="dramaItem flex_l_c" v-for="(item, index) in ancientBuildingList" :key="index" @click="toDramaDet(3,item)">
								<view class="lineBar"></view>
								<view class="info">
									<view class="omit tit">{{item.source.title}}</view>
									<view class="omit addr">{{item.source.description}}</view>
								</view>
							</view>
						</view>

					</view>
				</swiper-item>
				<!-- 非遗实物 -->
				<swiper-item class='swiper'>
					<view class="list7 p_b30">
						<view>
							<swiper class="bannerBox" indicator-dots='true' :indicator-active-color='mainCol' v-if='intangibleBanner.length != 0'
							 circular='true' autoplay="true" interval="3000" duration="1000">
								<block v-for="(item, index) in intangibleBanner" :key="item">
									<swiper-item>
										<image :src="item" class="slide-image">
									</swiper-item>
								</block>
							</swiper>
						</view>
						<view class="p_t40 intangible" v-if="toolList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>工具</view>
									<view class="plateLine"></view>
								</view>
								<!-- <view class="allBtn">全部</view> -->
							</view>
							<view class="twoBox">
								<view class="flex_b_c" v-for="(item, index) in toolList" :key="index" @click="toDramaDet(4,item)">
									<view class="tit">{{item.source.dctitle}}</view>
									<image src="../../static/imgs/icon_tool.png" class="icon"></image>
								</view>
							</view>
						</view>

						<view class="p_t40 intangible" v-if="propList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>道具</view>
									<view class="plateLine"></view>
								</view>
								<!-- <view class="allBtn">全部</view> -->
							</view>
							<view class="twoBox">
								<view class="flex_b_c" v-for="(item, index) in propList" :key="index" @click="toDramaDet(4,item)">
									<view class="tit">{{item.source.dctitle}}</view>
									<image src="../../static/imgs/icon_prop.png" class="icon"></image>
								</view>
							</view>
						</view>

						<view class="p_t40 finished" v-if="manufacturedList.length > 0">
							<view class="flex_b_c plateBox p_b40">
								<view class="plateTitBox">
									<view>制成品</view>
									<view class="plateLine"></view>
								</view>
								<!-- <view class="allBtn">全部</view> -->
							</view>
							<view class="twoBox goodsItem">
								<view class="flex_l_t" v-for="(item, index) in manufacturedList" :key="index" @click="toDramaDet(4,item)">
									<view class="dot"></view>
									<view class="tit omit2">{{item.source.dctitle}}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import app from '../../public/app.js';
	import com from '../../public/com.js';
	import {
		mapMutations,
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				// tab栏
				tabArr: [{
						id: 1,
						name: "书架",
					},
					{
						id: 2,
						name: "书单",
					},
					{
						id: 3,
						name: "书库",
					},
					{
						id: 4,
						name: "视频",
					},
					{
						id: 5,
						name: "戏剧",
					},
					{
						id: 6,
						name: "红色故址",
					},
					{
						id: 7,
						name: "古村古镇",
					},
					{
						id: 8,
						name: "非遗实物",
					},
				],
				currentIndex: 0, // 选择tab栏下标
				mainCol: app.basic.mainCol, // 主色调
				// 书架banner
				bookrackBanner: [],
				// 书单banner
				booklistBanner: [],
				// 书库banner
				stackroomBanner: [],
				// 视频banner
				videoBanner: [],
				// 戏剧banner
				dramaBanner: [],
				// 红色故址banner
				oldsiteBanner: [],
				// 古村古镇banner
				townBanner: [],
				// 非遗实物banner
				intangibleBanner: [],
				isNet: true, // 是否有网
				isBinding: true, // 是否绑定借阅证
				isCom: false, // 是否有相关内容
				name: '',
				hasMoreData: false,
				xqtdVideoList: [],
				dfxjVideoList: [],
				hxwhVideoList: [],
				bookListCurrentPage: 1,
				bookListPageSize: 10,
				bookList: [],
				characterList: [],
				figureList: [],
				revolutionarySiteList: [],
				residenceList: [],
				anniversaryList: [],
				ancientVillageList: [],
				ancientTownList: [],
				ancientBuildingList: [],
				manufacturedList: [],
				propList: [],
				toolList: [],
				topCategorylist: [],
				column: 2,
				onlineBooklist: [],
				serBookOrder: [],
				activityList: [],
				myBookList: null,
				myFollowBookList: null,
				fieldName: ['title']
			}
		},
		onLoad(options) {
			// this.getNetStatus();
			// this.tabClick(this.currentIndex);
		},
		onShow() {
			console.log(uni.getStorageSync('bookcurrentIndex'))
			if (uni.getStorageSync('bookcurrentIndex') != '') {
				this.currentIndex = uni.getStorageSync('bookcurrentIndex');
				uni.removeStorageSync('bookcurrentIndex');

			}
			this.getNetStatus();
			this.tabClick(this.currentIndex);

		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['updateInfo']),
			// 古村古镇列表
			toTownList(type) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync("name", this.name);
				uni.navigateTo({
					url: 'townList?type=' + type
				})
			},
			// 红色故址列表
			toRedOberoiList(type) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync('name', this.name)
				uni.navigateTo({
					url: 'redOberoiList?type=' + type
				})
			},
			// 戏剧详情
			toDramaDet(type, obj) { // type: 0戏剧知识；1戏剧人物；2红色故址；3古村古镇；4非遗实物
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync("characterInfo", obj);
				uni.navigateTo({
					url: 'drama_det?type=' + type
				})
			},
			// 戏剧知识列表
			toDramaList() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync("name", this.name);
				uni.navigateTo({
					url: 'dramaList'
				})
			},
			// 戏剧人物列表
			toDramaCharacters() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync("name", this.name);
				uni.navigateTo({
					url: 'dramaCharacters'
				})
			},
			// 搜索
			searchBookList() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				if (this.currentIndex == 0) {
					this.searchBookAndActive();
				} else if (this.currentIndex == 1) {
					this.bookListCurrentPage = 1;
					this.bookList = [];
					this.getBookList();

				} else if (this.currentIndex == 2) {
					this.findBook();
				} else if (this.currentIndex == 3) {
					this.getVideo('戏曲天地')
					this.getVideo('地方戏剧')
					this.getVideo('湖湘文化')
				} else if (this.currentIndex == 4) {
					this.getCharacter()
					this.getFigure()
				} else if (this.currentIndex == 5) {
					this.getRedWcmmetatableobject('革命活动旧址')
					this.getRedWcmmetatableobject('名人故居')
					this.getRedWcmmetatableobject('纪念场所')
				} else if (this.currentIndex == 6) {
					this.getWcmmetatableorganization('文化名村(寨)')
					this.getWcmmetatableorganization('文化名镇')
					this.getWcmmetatableorganization('居住建筑')
				} else if (this.currentIndex == 7) {
					this.getIntangibleHeritageWcmmetatableobject('373')
					this.getIntangibleHeritageWcmmetatableobject('372')
					this.getIntangibleHeritageWcmmetatableobject('374')
				}
			},

			search(e) {

				this.name = e.detail.value;

			},
			getNetStatus() {
				let that = this
				//监听网络状态变化
				uni.onNetworkStatusChange(function(res) {
					console.log(res)
					that.isNet = res.isConnected
					console.log(res.isConnected); //当前是否有网络连接
					console.log(res.networkType); //网络类型
				});
			},
			getBindingCode() {
				app.basic.getAjaxData(com.user('getinfo'), null, "POST").then(res => {
					var userInfoRes = res.data.data
					if (userInfoRes.rdId != undefined && userInfoRes.rdId != null) {
						this.isBinding = true
					} else {
						this.isBinding = false
					}
					this.updateInfo(userInfoRes);
				})

			},
			// 视频列表
			toVideoList(parentname) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.setStorageSync('name', this.name)
				uni.setStorageSync('parentname', parentname)
				uni.navigateTo({
					url: 'videoList'
				})
			},
			// 视频详情
			toVideoDet(item) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				console.log(item)
				uni.setStorageSync("videoInfo", item);
				uni.navigateTo({
					url: 'video_det?type=1'
				})
			},
			// 书单更多
			toMoreBookList(type) { //type 0：我的书单  1：收藏书单
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'moreBookList?type=' + type
				})
			},
			// 书籍详情
			toBookDet(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'book_det?id=' + id
				})
			},
			//活动详情
			toActiveDet(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: '../index/activity_det?id=' + id
				})
			},
			// 书库列表
			toLibraryList(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'libraryList?id=' + id
				});
			},
			// 书单详情
			toBookListDet(id) {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'bookList_det?id=' + id
				});
			},
			// 参与活动全部
			toMyActivities() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: '../service/myActivities'
				})
			},
			// 新建书单
			toNewBook() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: 'newBook'
				})
			},
			// 点击tab栏
			tabClick(index) {
				console.log(index)
				this.currentIndex = index;
				this.name = ''
				if (this.currentIndex == 0) {
					this.column = 2;
					this.isCom = false;
					this.listBookListBanner();
					this.getBindingCode()
					this.findBorrow();
					this.getSerBookOrder();
					this.listMyActivity();
					this.getLastBookList();
					this.getLastFollowBookList();
				} else if (this.currentIndex == 1) {
					this.column = 3;
					this.listBookListBanner();
					this.getBookList();
				} else if (this.currentIndex == 2) {
					this.column = 4;
					this.listBookListBanner();
					this.listTopCategory();
				} else if (this.currentIndex == 3) {
					console.log("视频")
					this.getVideo('戏曲天地')
					this.getVideo('地方戏剧')
					this.getVideo('湖湘文化')
				} else if (this.currentIndex == 4) {
					console.log("戏剧")
					this.getCharacter()
					this.getFigure()
				} else if (this.currentIndex == 5) {
					console.log("红色故址")
					this.getRedWcmmetatableobject('革命活动旧址')
					this.getRedWcmmetatableobject('名人故居')
					this.getRedWcmmetatableobject('纪念场所')
				} else if (this.currentIndex == 6) {
					console.log("古村镇")
					this.getWcmmetatableorganization('文化名村(寨)')
					this.getWcmmetatableorganization('文化名镇')
					this.getWcmmetatableorganization('居住建筑')
				} else if (this.currentIndex == 7) {
					console.log("非遗实物")
					this.getIntangibleHeritageWcmmetatableobject('373')
					this.getIntangibleHeritageWcmmetatableobject('372')
					this.getIntangibleHeritageWcmmetatableobject('374')
				}

			},
			// 获取视频信息
			getVideo: function(obj) {
				uni.showToast({
					title: "加载中...",
					icon: "loading"
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 4,
					fieldNames: ["title"],
					fieldName: obj,
					condition: this.name
				}
				app.basic.getAjaxData(com.enquiries('getVideo'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						if (obj == '戏曲天地') {
							this.xqtdVideoList = res.data.data.list
						} else if (obj == '地方戏剧') {
							this.dfxjVideoList = res.data.data.list
						} else if (obj == '湖湘文化') {
							this.hxwhVideoList = res.data.data.list
						}

					}
				})
			},
			// tab栏左右滑动
			tabChange(e) {
				this.tabClick(e.detail.current);
				// this.currentIndex = e.detail.current;
			},
			//分页信息
			scrollView() {
				if (this.hasMoreData) {
					if (this.currentIndex == 1) {
						this.getBookList();
					}

				} else {
					uni.showToast({
						icon: 'none',
						title: '没有更多数据'
					});
				}
			},
			//获取书单分页
			getBookList() {
				var param = {
					currentPage: this.bookListCurrentPage,
					pageSize: this.bookListPageSize,
					name: this.name
				}
				app.basic.getAjaxData(com.enquiries('listBookList'), param, "GET").then(res => {
					var allBookList = res.data.data.records;
					if (allBookList.length < this.bookListPageSize) {
						if (allBookList.length === 0) {
							uni.showToast({
								icon: "none",
								title: '暂无相关内容'
							});
						} else {
							this.bookList = this.bookList.concat(allBookList);
						}
						this.hasMoreData = false;

					} else {
						this.bookList = this.bookList.concat(allBookList);
						this.hasMoreData = true;
						this.bookListCurrentPage = this.bookListCurrentPage + 1;
					}
				})
			},
			// 获取文摘戏剧人物信息
			getFigure: function() {
				uni.showToast({
					title: '加载中...',
					icon: 'loading'
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 6,
					fieldNames: ["dctitle"],
					condition: this.name
				}
				app.basic.getAjaxData(com.enquiries('getFigure'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						this.figureList = res.data.data.list
					}
				})
			},

			// 获取文摘戏剧知识信息
			getCharacter: function() {
				uni.showToast({
					title: '加载中...',
					icon: 'loading'
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 3,
					fieldNames: ["dctitle"],
					condition: this.name
				}
				app.basic.getAjaxData(com.enquiries('getCharacter'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						this.characterList = res.data.data.list
					}
				})
			},
			// 获取自建资源红色库信息
			getRedWcmmetatableobject: function(obj) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading'
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 6,
					fieldNames: ["dctitle"],
					condition: this.name,
					fieldName: obj
				}
				app.basic.getAjaxData(com.enquiries('getRedWcmmetatableobject'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						if (obj == '革命活动旧址') {
							this.revolutionarySiteList = res.data.data.list
						} else if (obj == '名人故居') {
							this.residenceList = res.data.data.list
						} else if (obj == '纪念场所') {
							this.anniversaryList = res.data.data.list
						}

					}
				})
			},
			//获取古村镇信息列表
			getWcmmetatableorganization: function(obj) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading'
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 3,
					fieldNames: ["title"],
					fieldName: obj,
					condition: this.name
				}
				app.basic.getAjaxData(com.enquiries('getWcmmetatableorganization'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						if (obj == '文化名村(寨)') {
							this.ancientVillageList = res.data.data.list
						} else if (obj == '文化名镇') {
							this.ancientTownList = res.data.data.list
						} else if (obj == '居住建筑') {
							this.ancientBuildingList = res.data.data.list
						}
					}
				})
			},

			// 获取自建资源非遗库信息
			getIntangibleHeritageWcmmetatableobject: function(obj) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading'
				})
				var pageDTO = {
					pageCurrent: 1,
					pageSize: 100,
					fieldNames: ["dctitle"],
					condition: this.name,
					fieldName: obj
				}
				app.basic.getAjaxData(com.enquiries('getIntangibleHeritageWcmmetatableobject'), pageDTO, "POST").then(res => {
					uni.hideToast()
					if (res.data.status == true) {
						if (obj == '372') {
							this.toolList = res.data.data.list
						} else if (obj == '373') {
							this.propList = res.data.data.list
						} else {
							this.manufacturedList = res.data.data.list
						}

					}
				})
			},

			//获取书库列表
			listTopCategory() {
				app.basic.getAjaxData(com.enquiries('listTopCategory'), '', "GET").then(res => {
					this.topCategorylist = res.data.data;
				})
			},

			//获取banner页
			listBookListBanner() {
				var param = {
					displayColumn: this.column
				}
				app.basic.getAjaxData(com.enquiries('listBookListBanner'), param, "GET").then(res => {
					if (this.column == 2) {
						this.bookrackBanner = res.data.data
					} else if (this.column == 3) {
						this.booklistBanner = res.data.data
					} else if (this.column == 4) {
						this.stackroomBanner = res.data.data
					}
				})
			},
			//banner页跳转
			bannerClick(item) {
				console.log(item)
				if (item.type == 4) {
					//书籍
					this.toBookDet(item.dataId);
				} else if (item.type == 3) {
					//书单
					this.toBookListDet(item.dataId);
				}
			},
			//获取当前在读书籍
			findBorrow() {
				app.basic.getAjaxData(com.query('findBorrow'), '', "GET").then(res => {
					this.onlineBooklist = res.data.data;
					if (this.onlineBooklist.length > 0) {
						this.isCom = true;
					}
				})
			},
			// 获取预约的书籍
			getSerBookOrder() {
				app.basic.getAjaxData(com.query('getRes'), null, "GET").then(res => {
					this.serBookOrder = res.data.data;
					if (this.serBookOrder.length > 0) {
						this.isCom = true;
					}
				})
			},
			//获取参加的活动
			listMyActivity() {
				var param = {
					pageCurrent: 1,
					pageSize: 2,
				};
				app.basic.getAjaxData(com.activity('listBookMyActivity'), param, "POST").then(res => {
					this.activityList = res.data.data;
					if (this.activityList.length > 0) {
						this.isCom = true;
					}
				})
			},
			//获取我的书单
			getLastBookList() {
				app.basic.getAjaxData(com.enquiries('getLastBookList'), '', "GET").then(res => {
					this.myBookList = res.data.data;
					if (this.myBookList != null) {
						this.isCom = true;
					}
				})
			},
			//获取我收藏的书单
			getLastFollowBookList() {
				app.basic.getAjaxData(com.enquiries('getLastFollowBookList'), '', "GET").then(res => {
					this.myFollowBookList = res.data.data;
					if (this.myFollowBookList != null) {
						this.isCom = true;
					}
				})
			},
			//跳转登录页
			toLogin() {
				uni.navigateTo({
					url: '../my/login'
				})
			},
			//跳转绑定借阅证
			bindCard() {
				if (!this.hasLogin) {
					app.basic.goTOLogin();
					return;
				}
				uni.navigateTo({
					url: '../my/bindCard'
				})
			},
			//搜索书籍
			findBook() {
				uni.setStorageSync('fieldNames', this.fieldName);
				uni.navigateTo({
					url: '../service/bookSrhResults?searchText=' + this.name
				})
			},
			//搜索书籍和活动
			searchBookAndActive() {
				if (this.currentIndex == 0) {
					uni.navigateTo({
						url: '../index/search'
					})
				}
			}
		}
	}
</script>

<style>
	.srhBox {
		top: 60upx;
	}

	.swiper-box {
		height: 70vh;
	}

	.threeBox {
		width: 98%;
		margin: 0 auto;
	}

	/* 书库 */
	.list2 .threeBox>view {
		height: 312upx;
	}

	/* 戏剧 */
	.list4 .threeBox>view {
		height: 268upx;
	}

	/* 红色故址 */
	.list5 .threeBox>view {
		height: 288upx;
	}
</style>
