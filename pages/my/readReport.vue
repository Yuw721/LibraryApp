<template>
    <!-- 个人阅读报告单 -->
    <view>
        <view class="topBar">
            <view class="statusBar"></view>
            <view class="titBar flex_b_c">
                <text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
                <view class="tit">个人阅读报告单</view>
            </view>
        </view>
        <view class='mainCom'>
            <view class="swiper-cont container-fill">
                <view class="scroll-fullpage" @touchstart="scrollTouchstart" @touchend="scrollTouchend"
                      :style='"transform:translateY(-"+scrollindex*100+"%); margin-top:"+ margintop+"px"'>
                    <view class="section section01" :class="scrollindex==0?'active':''">
                        <view class='cont'>
                            <view class='info1'>
                                <image src='https://tsg.zydbai.com/static/img/knowledgeNum1.png' class='numImg'></image>
                                <view>我于{{readerInfo.createdate}}在湖南图书馆办理了借阅证，立志做一个爱知识、 爱阅读的好青年。</view>
                            </view>
                            <image src='../../static/imgs/arrowsIcon.png' class='arrowsImg'></image>
                        </view>
                    </view>
                    <view class="section section02" :class="scrollindex==1?'active':''">
                        <view class='info2'>
                            <image src='https://tsg.zydbai.com/static/img/knowledgeNum2.png' class='numImg'></image>
                            <view>在这条路上总有大多诱惑，束缚我。 阻碍我。</view>
                        </view>
                        <image src='../../static/imgs/arrowsIcon.png' class='arrowsImg2'></image>
                    </view>
                    <view class="section section03" :class="scrollindex==2?'active':''" v-if="isPavilion">
                        <view class='cont'>
                            <view class='info3'>
                                <image src='https://tsg.zydbai.com/static/img/knowledgeNum3.png' class='numImg'></image>
                                <view>最近一年经过自己坚持不懈的努力；</view>
                                <view v-if="borrowInfo.inXtCount>0">坚持到馆{{borrowInfo.inXtCount}}次；</view>
                                <view v-if="borrowInfo.borrowCount>0">已借阅{{borrowInfo.borrowCount}}册次；</view>
                            </view>
                            <image src='../../static/imgs/arrowsIcon.png' class='arrowsImg'></image>
                        </view>
                    </view>
                    <view class="section section03_2" :class="scrollindex==2?'active':''" v-if="!isPavilion">
                        <view class='cont'>
                            <view class='info3_2'>
                                <image src='https://tsg.zydbai.com/static/img/knowledgeNum3.png' class='numImg'></image>
                                <view>和我同龄的人都在读</view>
                                <image src='http://img3x1.ddimg.cn/84/5/1061587281-1_w_2.jpg' class='coverImg'></image>
                                <view class='bookName'>《解忧杂货店》</view>
                            </view>
                            <image src='../../static/imgs/arrowsIcon.png' class='arrowsImg'></image>
                        </view>
                    </view>
                    <view class="section section04" :class="scrollindex==3?'active':''" v-if="isTitle">
                        <view class='cont'>
                            <view class='info4'>
                                <image src='https://tsg.zydbai.com/static/img/knowledgeNum4(1).png'
                                       class='numImg'></image>
                                <view>获得</view>
                                <image :src='titleGrade' class='info4Img'></image>
                                <view>称号</view>
                            </view>
                        </view>
                    </view>
                    <view class="section section04_2" :class="scrollindex==3?'active':''" v-if="!isTitle">
                        <view class='cont'>
                            <view class='info4_2'>
                                <image src='https://tsg.zydbai.com/static/img/knowledgeNum4(2).png'
                                       class='numImg4'></image>
                                <view>不忘初心，砥砺前行；</view>
                                <view>续写我与湘图的故事。</view>
                            </view>
                        </view>
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
                scrollindex: 0, //当前页面的索引值
                totalnum: 4, //总共页面数
                starty: 0, //开始的位置x
                endy: 0, //结束的位置y
                critical: 40, //触发翻页的临界值
                margintop: 0, //滑动下拉距离
                isPavilion: false, //是否有到馆次数  true：有； false：无
                isTitle: false, //是否有称号  true：有； false：无
                titleGrade: 'https://wj.zydbai.com/grade1.png',
                qrCode: '',
                nickName: '',
                userRdId: '',
                rdId: '',
                readerInfo: {},
                borrowInfo: {}
            }
        },
        onLoad() {
            this.getReaderInfo();
            this.getBorrowInfo();
        },
        methods: {
            scrollTouchstart: function (e) {
                let py = e.touches[0].pageY;
                this.starty = py;
            },
            scrollTouchend: function (e) {
                let py = e.changedTouches[0].pageY;
                let d = this.data;
                this.endy = py;
                console.log(e.changedTouches[0].pageY, this.starty);
                if (py - this.starty > this.critical && this.scrollindex > 0) {
                    this.scrollindex = this.scrollindex - 1;
                } else if (py - this.starty < -(this.critical) && this.scrollindex < this.totalnum - 1) {
                    this.scrollindex = this.scrollindex + 1;
                }
                this.starty = 0;
                this.endy = 0;
                this.margintop = 0;
            },
            //获取读者信息
            getReaderInfo() {
                var param = {
                    rdId: this.rdId
                }
                app.basic.getAjaxData(com.bigdata("getReaderInfo"), param, "GET").then(res => {
                    this.readerInfo = res.data.data
                })
            },
            //获取借阅情况
            getBorrowInfo() {
                var param = {
                    rdId: this.rdId
                }
                app.basic.getAjaxData(com.bigdata("getBorrowInfo"), param, "GET").then(res => {
                    var data = res.data.data;
                    if (data.inXtCount != 0 || data.borrowCount != null) {
                        this.isPavilion = true
                    }
                    this.borrowInfo = data
                    if (data.borrowCount < 20 && data.borrowCount >= 15) {
                        this.isTitle = true
                        this.titleGrade = 'https://wj.zydbai.com/grade1.png';
                    } else if (data.borrowCount >= 20 && data.borrowCount < 25) {
                        this.isTitle = true
                        this.titleGrade = 'https://wj.zydbai.com/grade2.png';
                    } else if (data.borrowCount >= 25) {
                        this.isTitle = true
                        this.titleGrade = 'https://wj.zydbai.com/grade3.png';
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
        height: 100%;
        background: fff;
        color: #282828;
    }

    .nav {
        box-shadow: 0px 0px 0px 0px transparent;
    }

    .mainCom {
        height: calc(100vh - 85px);
        width: 100%;
    }

    .container {
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0;
        align-items: initial;
        justify-content: first baseline;
    }

    .container-fill {
        height: 100%;
        overflow: hidden;
    }

    .scroll-fullpage {
        height: 100%;
    }

    .section {
        height: 100%;
        color: #0e357f;
        font-size: 32upx;
        line-height: 54upx;
    }

    .active .cont {
        -webkit-animation-duration: 1.8s;
        animation-duration: 1.8s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
    }

    .cont {
        width: 100%;
        height: 100%;
    }

    .numImg {
        width: 238upx;
        height: 68upx;
        margin-bottom: 20upx;
    }

    .arrowsImg,
    .arrowsImg2 {
        width: 40upx;
        height: 50upx;
        position: absolute;
        bottom: 50upx;
        left: 50%;
        transform: translateX(-50%);
    }

    .arrowsImg2 {
        bottom: 120upx;
    }

    .section01 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg1.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .info1,
    .info2,
    .info3 {
        position: absolute;
        top: 60upx;
        left: 86upx;
        width: 68%;
    }

    .section02 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg2.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .info2 {
        left: 140upx;
    }

    .section03 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg3.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .info3 {
        left: 170upx;
    }

    .section03_2 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg3 (2).png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .info3_2 {
        position: absolute;
        top: 60upx;
        left: 15%;
        width: 70%;
    }

    .coverImg {
        width: 334upx;
        height: 500upx;
        display: block;
        margin: 40upx auto;
    }

    .section03_2 .bookName {
        text-align: center;
    }

    .section04 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg4.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .info4 {
        position: absolute;
        top: 60upx;
        left: 15%;
        width: 70%;
    }

    .info4 .numImg {
        padding-left: 50upx;
    }

    .info4 > view {
        text-align: center;
    }

    .info4Img {
        width: 100%;
        height: 170upx;
        margin: 20upx auto;
        display: block;
    }

    .section04_2 {
        background: url("https://tsg.zydbai.com/static/img/knowledge_bg4 (2).png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }

    .numImg4 {
        width: 393upx;
        height: 68upx;
        margin-bottom: 20upx;
    }

    .info4_2 {
        position: absolute;
        top: 60upx;
        left: 140upx;
    }
</style>
