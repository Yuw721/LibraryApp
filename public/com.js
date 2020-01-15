var common = { //公共服务
    autoLogin: "service-common/app/autoLogin",
    login: "service-common/auth/htlogin",
    authorization: "service-common/app/authorization",
    findSysPubSourcebByTypeCode: "service-common/sysPubSource/findSysPubSourcebByTypeCode", //查找字典资源
    getAreaNameCode: "service-common/sysPubSource/getAreaNameCode", // 更具省市区查找下标
    checkIdCard: "service-common/onlineCard/checkIdCard", // 身份证验证
    getCode: "service-common/onlineCard/sendSmsMessage", // 获取手机验证码
    verifyIdCard: "service-common/onlineCard/verifyIdCard", //实名认证
    faceDetect: "service-common/onlineCard/faceDetect", // 人脸检测
    checkFaceDetect: "service-common/onlineCard/checkFaceDetect", //人脸检测
    insertCertification: "service-common/sysUserCertification/insertCertification", //插入认证信息
    countCertification: "service-common/sysUserCertification/countCertification", // 查询认证信息条数
    getVolunteerSys: "service-common/sysPubSource/getVolunteerSys", // 获取志愿者注册的字典资源
    getLabelList: "service-common/sysPubSource/getLabelList", // 获取字典标签列表
    getPubSourceByid: "service-common/sysPubSource/getPubSourceByid", //获取活动地点
    verificationPhone: "service-common/sysPubSource/verificationPhone", //验证手机号
    updateUserPhone: "service-common/onlineCard/updateUserPhone", //修改用户手机号
    files: "service-common/upload", //上传图片
    getQRC: "service-common/getQRCode", //获取二维码
    getMenuInfo: "service-common/sysMenu/getMenuInfo", //获取功能服务
    getSmallRoutineQRCode: "service-common/getSmallRoutineQRCode", //生成二維碼
}

var payment = { // 支付
    query: "tuling/query",
    searchoverdue: "service-payment/payMent/searchoverdue", // 查询滞纳金
    payHistory: "service-payment/payMent/payHistory", // 查询支付记录
    getParkingPaymentInfo: "service-payment/payMent/GetParkingPaymentInfo", // 停车费账单查询接口
    payParkingFee2: "service-payment/payMent/payCarFee", // 停车费账单支付同步接口
    getSerCarNum: "service-payment/payMent/getSerCarNum", //获取车牌号码
}

var reservation = { // 我的预约




}
var bigdata = { //大数据
    getSevenData: "service-bigdata/wxbigdata/getSevenData", //获取近7天的数据
	getInXtCount: "service-bigdata/libraryReadTime/getInXtCount", //获取当前在馆人数的数据
    getToData: "service-bigdata/wxbigdata/getToData", //获取今日看板的数据
    getSevenDataPie: "service-bigdata/wxbigdata/getSevenDataPie",
    getPieData: "service-bigdata/wxbigdata/getPieData", //获取今日看板的饼图数据 到馆借阅人数
    getBibliosDetails: "service-bigdata/biblios/getBibliosDetails", // 获取书籍详情
    getBookRecommendation: "service-bigdata/bookRecommendation/getBookRecommendation", //获取小编推荐
    pageBookRecommendation: "service-bigdata/bookRecommendation/pageBookRecommendation", //获取小编推荐列表
    knnRecommen: "service-bigdata/PortrayalRecommend/knnRecommen", //获取书籍详情页相关推荐
    getPortrayalBook: "service-bigdata/PortrayalRecommend/getPortrayalBook", //获取首页您可能喜欢
    saveBrowse: "service-bigdata/LatelyUserPortrayal/saveBrowse", //插入最近浏览画像
    getYesterdayInXtCount: "service-bigdata/libraryReadTime/getYesterdayInXtCount", //获取昨日到馆人数
    searchBorrowCountInOutToday: "service-bigdata/libraryReadTime/searchBorrowCountInOutToday", //获取今日昨日借还书记录
    getApiData: "service-bigdata/commen/getApiData", //数据看板公共接口
    getTodaySystem: "service-bigdata/onLineVisit/getTodaySystem", //官网小程序pvuv
    getWjCountToday: "service-bigdata/wxbigdata/getWjCountToday", //获取网借图书数
    getReaderInfo: "service-bigdata/breader/getReaderInfo", //个人知识清单获取读者信息
    getBorrowInfo: "service-bigdata/breader/getBorrowInfo", //个人知识清单获取借阅信息
}

var user = { // 用户
	userIntegral: "service-user/sysUserIntegralDetail/userIntegral", //每日登录
	getTask: "service-user/integralMallTask/getTask", //获取任务
	userShareIntegral: "service-user/sysUserIntegralDetail/userShareIntegral", //用户推广获取积分
	updateinfo: "service-user/updateinfo", //更新用户信息
	getinfo: "service-user/getinfo", //获取用户信息
    getRdIdCode: "service-user/getRdIdCode", //获取rdidcode
	findSysUserByToken: "service-user/findSysUserByToken", //根据token获取用户信息
	binding: "service-user/binding", //绑定
	unbinding: "service-user/unbinding", //解绑
	listBookCollection: "service-user/VolunteerActiveCollection/listBookCollection", //获取用户收藏书籍
	deleteBookCollection: "service-user/VolunteerActiveCollection/deleteBookCollection", //删除用户收藏书籍
	countBookCollection: "service-user/VolunteerActiveCollection/countBookCollection", //获取用户收藏书籍的收藏数
	insertBookCollection: "service-user/VolunteerActiveCollection/insertBookCollection", //书籍收藏
	deleteBookCollectionByType: "service-user/VolunteerActiveCollection/deleteBookCollectionByType", //根据类型删除用户收藏书籍
	findUserCertificationByUserId: "service-user/sysUserCertificationService/findUserCertificationByUserId", //查找用户认证信息
	findUserById: "service-user/findUserById", //获取用户信息
	getQrcode: "service-user/getQrcode", //获取用户信息
	updateUserCertification: "service-user/sysUserCertificationService/updateUserCertification", //解除实名认证
	updateRdidCode: "service-user/updateRdidCode",
	getSysUserIntegral: "service-user/sysUserIntegral/getSysUserIntegral",
	getSysUserIntegralDetail: "service-user/sysUserIntegralDetail/getSysUserIntegralDetail",
	getGrade: "service-user/sysUserGrade/getGrade",
	getIntegralMallCommodityList: "service-user/integralMallCommodity/getIntegralMallCommodityList",
	exchange: "service-user/integralMallExchangeRecord/exchange",
	getIntegralMallExchangeRecord: "service-user/integralMallExchangeRecord/getIntegralMallExchangeRecord",
	getExchangeRecord: "service-user/integralMallExchangeRecord/getExchangeRecord", //获取核销信息
	writeOffExchangeRecord: "service-user/integralMallExchangeRecord/writeOffExchangeRecord", //核销商品
	saveSysLibrarianArchives: "service-user/sysLibrarianArchives/saveSysLibrarianArchives", //保存馆员信息
	getSysLibrarianArchives: "service-user/sysLibrarianArchives/getSysLibrarianArchives", //根据用户id查询档案信息
	getUserLibRoot: "service-user/sysLibrarianArchives/getUserLibRoot", //根据用户id查询档案信息
	getUserRoot: "service-user/sysLibrarianArchives/getUserRoot", // 根据手机号获取权限
	getSysPubSource: "service-user/sysLibrarianArchives/getSysPubSource", //根据用户id查询档案信息
	getSysLibQrCode: "service-user/sysLibrarianArchives/getSysLibQrCode", // 获取馆员档案分享二维码
	getBookBrowsingHistory: "service-user/userBrowsingHistory/getBookBrowsingHistory", // 获取书籍浏览记录
	getBookListBrowsingHistory: "service-user/userBrowsingHistory/getBookListBrowsingHistory", // 获取书单浏览记录
	getSerActivityBasicsBrowsingHistory: "service-user/userBrowsingHistory/getSerActivityBasicsBrowsingHistory", // 获取活动浏览记录
    getUserIntegralGrade: "service-user/sysUserIntegral/getUserIntegralGrade", //获取用户积分
    getUserGradeList: "service-user/sysUserGrade/getUserGradeList", //获取用户成就
}

// var file = { // 文件处理
//   files: "service-files/upload",  //上传图片
//   getQRC: "service-files/getQRCode",//获取二维码
// }

var activity = { // 活动
    activity_list: "service-volunteer/activity/findActivityList", //获取活动列表
    getActivityInfoById: "service-volunteer/activity/getActivityInfoById", //获取活动信息
    getEnrollInfo: "service-volunteer/activity/getEnrollInfo", //获取报名信息
    whetherEnroll: "service-volunteer/activity/whetherEnroll", //获取活动是否报名
    updateActivityView: "service-volunteer/activity/updateActivityView", //更新浏览量
    getMyActivity: "service-volunteer/activity/getMyActivity", //我的活动
    listBookMyActivity: "service-volunteer/activity/listBookMyActivity", //书架我的活动
    getUserInfo: "service-volunteer/activity/getUserInfo", //获取用户信息
    enroll: "service-volunteer/activity/enroll", //报名
    getActivityEnrollInfo: "service-volunteer/activity/getActivityEnrollInfo", //获取活动报名二维码信息
    cancelApple: "service-volunteer/activity/cancelApple", //取消活动
    isCollect: "service-volunteer/activity/isCollect", //是否收藏
    collect: "service-volunteer/activity/collect", //收藏
    signed: "service-volunteer/activity/signed", //签到
    listHistoryActivity: "service-volunteer/activity/listHistoryActivity", //历史活动
    listMyActivity: "service-volunteer/activity/listMyActivity", //我的收藏活动
    listIndexActivity: "service-volunteer/activity/listIndexActivity", //首页活动
    getSerActivityBasics: "service-volunteer/activity/getSerActivityBasics", //获取活动
    findActivityListBySite: "service-volunteer/activity/findActivityListBySite" // 扫活动地址二维码获取活动信息
}

var log = { // 操作日志

}

var notification = { // 消息推送
    isReadCont: "service-notification/mailboxInformation/isReadCont", //获取未读消息条数
    selectMailList: "service-notification/mailboxInformation/selectMailList", //获取信息列表
    selectMailById: "service-notification/mailboxInformation/selectMailById", //根据id获取消息详情
    selectRestMessage: "service-notification/mailboxInformation/selectRestMessage" //获取一条最新的消息
}

var borrow = { // 借阅服务
    renew: "service-borrow/borrow/renew",
    listTopCategory: "service-borrow/category/listTopCategory", //获取书籍一级分类
    listTowCategory: "service-borrow/category/listTowCategory", //获取书籍二级分类
    listTowCategoryBook: "service-borrow/borrow/listTowCategoryBook", //获取书籍二级分类
    listHotBook: "service-borrow/hotbook/listHotBook", //热门书籍
}

var enquiries = { // 馆内查询
    exhibitionfindbyid: "service-enquiries/exhibition/findbyid", //获取展览信息
    exhibition: "service-enquiries/exhibition/selectexhibition", //展览查询
    insertQueryHistory: "service-enquiries/bookQueryHistory/insertQueryHistory",
    listQueryHistory: "service-enquiries/bookQueryHistory/listQueryHistory", //查找书目检索查询历史
    deleteQueryHistory: "service-enquiries/bookQueryHistory/deleteQueryHistory", //删除书目检索查询历史
    deleteAllQueryHistory: "service-enquiries/bookQueryHistory/deleteAllQueryHistory", //删除书目检索查询历史
    getLastBookList: "service-enquiries/bookList/getLastBookList", //获取书房我的书单
    getLastFollowBookList: "service-enquiries/bookFollowList/getLastFollowBookList", // 获取书房关注的书单
    getBookListInfo: "service-enquiries/bookList/getBookListInfo", // 获取书房信息
    deleteBookListDetail: "service-enquiries/bookListDetail/deleteBookListDetail", // 删除书籍
    updateBookListIntroduction: "service-enquiries/bookList/updateBookListIntroduction", // 放弃
    updateBookListLabel: "service-enquiries/bookList/updateBookListLabel", // 修改书单标签
    getBookLabel: "service-enquiries/bookList/getBookLabel", //获取书单里的书籍标签
    getBookList: "service-enquiries/bookList/getBookList", // 获取书单列表
    insertBookListDetail: "service-enquiries/bookList/insertBookListDetail", // 添加书籍到书单
    insertBookList: "service-enquiries/bookList/insertBookList", //新建书单
    getFollowBookList: "service-enquiries/bookFollowList/getFollowBookList", // 获取关注书单
    listBookList: "service-enquiries/bookList/listBookList", // 获取书单列表
    deleteBookList: "service-enquiries/bookList/deleteBookList", //删除书单
    updateBookListNoFollow: "service-enquiries/bookFollowList/updateBookListNoFollow", // 取消书单关注
    updateBookListFollow: "service-enquiries/bookFollowList/updateBookListFollow", // 关注书单
    updateBookListCollection: "service-enquiries/bookCollectionList/updateBookListCollection", //书单点赞
    updateBookListNoCollection: "service-enquiries/bookCollectionList/updateBookListNoCollection", // 取消点赞
    listPopularBookList: "service-enquiries/bookList/listPopularBookList", // 热门书单
    listBookListBanner: "service-enquiries/banner/listBookListBanner", // 获取书单banner
    getSysNotificationNoticeById: "service-enquiries/sysNotificationNotice/getSysNotificationNoticeById", // 获取通知公告外部链接信息
    listHotListBook: "service-enquiries/bookRankList/listHotListBook", //获取热门榜单
    listBookRankList: "service-enquiries/bookRankList/listBookRankList", // 书籍榜单列表
    getBookRankList: "service-enquiries/bookRankList/getBookRankList", // 获取榜单信息
    getBookRankPage: "service-enquiries/bookRankList/getBookRankPage", //获取榜单分页
    savSearchHistory: "service-enquiries/searchHistory/savSearchHistory", // 保存首页搜索历史
    getHostSearchHistory: "service-enquiries/searchHistory/getHostSearchHistory", // 获取热门搜索历史
    getSearchHistoryByUserId: "service-enquiries/searchHistory/getSearchHistoryByUserId", //获取用户搜索历史
    findGenealogyAncient: "service-enquiries/book/findGenealogyAncient", // 获取古籍家谱
    findBook: "service-enquiries/book/findBook", //书目检索
    listQueryBook: "service-enquiries/book/listQueryBook", //智能提示书目
    getFreeSpaceNum: "service-enquiries/parkcar/getFreeSpaceNum", //获取剩余车
    getReadingRoomBiblios: "service-enquiries/readingRoomBiblios/getReadingRoomBiblios", //获取阅览室
    findHoldingBook: "service-enquiries/readingRoomBiblios/findHoldingBook", //获取馆藏书籍信息
    getReadingRoomInfo: "service-enquiries/readingRoomBiblios/getReadingRoomInfo", //获取阅览室信息
    orderBook: "service-enquiries/book/findOrderBook", // 搜索预约书籍
    getOrderBookRank: "service-enquiries/book/getOrderBookRank", // 获取前十预约书籍
    searchreslist: "service-enquiries/serBookOrder/searchreslist", //查询所有预约书籍信息
    cancelreserve: "service-enquiries/serBookOrder/cancelreserve", //取消书籍预约
    registerreserve: "service-enquiries/serBookOrder/registerreserve", // 预约书籍
    savSerWishList: "service-enquiries/serWishList/savSerWishList", // 提交心愿单
    getSysReasonByState: "service-enquiries/serWishList/getSysReasonByState", //获取心愿单理由
    getSerBookOrder: "service-enquiries/serBookOrder/getSerBookOrder", //查询正在预约的书籍
    findMyAncientOrder: "service-enquiries/serAncientOrder/findMyAncientOrder", //查找用户预约的古籍家谱信息
    sub: "service-enquiries/serBookOrder/sub", //查询是否绑定借阅证
    gj_search: "service-enquiries/serAncientOrder/myOrder", //查找用户预约的古籍家谱信息
    gj_cancel: "service-enquiries/serAncientOrder/cancelOrder", //取消古籍家谱预约
    orderInfo: "service-enquiries/serAncientOrder/orderInfo", //查询用户古籍家谱预约信息
    insert: "service-enquiries/serAncientOrder/insert", //提交古籍家谱申请信息
    getOrderById: "service-enquiries/serAncientOrder/getOrderById", //根据ID获取古籍家谱预约信息
    getBookByDangDang: "service-enquiries/serWishList/getBookByDangDang", //从当当获取心愿单书籍信息
    renew: "service-enquiries/borrow/renew", //续借
    renewBooks: "service-enquiries/borrow/renewBooks", //一键续借
    listTopCategory: "service-enquiries/category/listTopCategory", //获取书籍一级分类
    listTowCategory: "service-enquiries/category/listTowCategory", //获取书籍二级分类
    listTowCategoryBook: "service-enquiries/borrow/listTowCategoryBook", //获取书籍二级分类
    listHotBook: "service-enquiries/hotbook/listHotBook", //热门书籍
    listNearbyBookAddress: "service-enquiries/nearbyBookAddress/listNearbyBookAddress", //就近借还书
    getCharacter: "service-enquiries/trsWcm/getCharacter", //分页获取文摘戏剧知识信息
    getFigure: "service-enquiries/trsWcm/getFigure", //分页获取文摘戏剧知识信息
    getVideo: "service-enquiries/trsWcm/getVideo", //分页获取视频信息
    getVideoContent: "service-enquiries/trsWcm/getVideoContent", //获取视频简介信息
    getVideoFile: "service-enquiries/trsWcm/getVideoFile", //获取视频文件信息
    saveUserPlayHistory: "service-enquiries/trsWcm/saveUserPlayHistory", //保存播放历史
    getUserPlayHistory: "service-enquiries/trsWcm/getUserPlayHistory", //获取播放历史
    getUserPlayHistoryLastPlay: "service-enquiries/trsWcm/getUserPlayHistoryLastPlay", //查询用户最后播放的视频
    getRedWcmmetatableobject: "service-enquiries/trsWcm/getRedWcmmetatableobject", //分页搜索自建资源红色库信息
    getIntangibleHeritageWcmmetatableobject: "service-enquiries/trsWcm/getIntangibleHeritageWcmmetatableobject", //分页搜索自建资源非遗库信息
    getWcmmetatableorganization: "service-enquiries/trsWcm/getWcmmetatableorganization", //分页搜索古村镇信息
	getPlayHistory: "service-enquiries/trsWcm/getPlayHistory", //分页搜索古村镇信息
}

var volunteer = { // 志愿者
    updateByVolunteerId: "service-volunteer/volunteer/updateByVolunteerId", //根据志愿者id修改密码
    chekcTelById: "service-volunteer/volunteer/chekcTelById", //根据id检查用户手机号
    punchCard: "service-volunteer/volunteerPunchCard/punchCard", //打卡
    getPunchTEXbyId: "service-volunteer/volunteerPunchCard/getPunchTEXbyId", //根据打卡id获取这次打卡的基本信息
    getVolunteerRestActivePunch: "service-volunteer/volunteerPunchCard/getVolunteerRestActivePunch", //根据志愿者id获取最近一次的打卡记录
    getVolunteerActiveTrajectory: "service-volunteer/volunteerActive/getVolunteerActiveTrajectory", //根据志愿者id和活动id获取志愿者活动轨迹
    getVolunteerActived: "service-volunteer/volunteerActive/getVolunteerActived", //根据志愿者的id返回我的志愿者活动中的已完成tab的信息
    getVolunteerActiveStatuByUserUp: "service-volunteer/volunteerActiveUp/getVolunteerActiveStatuByUserUp", //志愿者活动报名状态
    getVolunteerActiveBycode: "service-volunteer/volunteerActive/getVolunteerActiveBycode", // 志愿者根据code查询活动的各种信息
    volunteerListByuserIdCount: "service-volunteer/volunteer/volunteerListByuserId/0", //更具用户id查询志愿者conut
    volunteerListByuserId: "service-volunteer/volunteer/volunteerListByuserId/1", //更具用户id查询志愿者list
    getVolunteerById: "service-volunteer/volunteer/getVolunteerById", //根据volunteerId 查找volunteer对象
    binduser: "service-volunteer/volunteer/binduser/0", //志愿者绑定
    unbinduser: "service-volunteer/volunteer/binduser/1", //志愿者解绑
    checkinfor: "service-volunteer/volunteer/checkInfo", //检查身份信息
    insert: "service-volunteer/volunteer/insert", //注册和修改志愿者
    listForMyGroup: "service-volunteer/volunteerGroup/listForMyGroup", // 我的志愿者团队
    insertGroup: "service-volunteer/volunteerGroup/insertGroup", // 新建志愿者团队
    getGroupDetail: "service-volunteer/volunteerGroup/getGroupDetail", // 获取志愿者团队信息
    countPeopleGroup: "service-volunteer/volunteerGroup/countPeopleGroup", // 获取志愿者团队人数
    listGroup: "service-volunteer/volunteerGroup/listGroup", // 志愿者团队列表
    listGroupPeople: "service-volunteer/volunteerGroupPeople/listGroupPeople", // 志愿者团队人员
    updateGroupLiable: "service-volunteer/volunteerGroupPeople/updateGroupLiable", // 修改志愿者团队负责人
    deleteGroupLiable: "service-volunteer/volunteerGroupPeople/deleteGroupLiable", // 删除志愿者团队负责人
    updatePeopleExamine: "service-volunteer/volunteerGroupPeople/updatePeopleExamine", //志愿者团队成员批量通过审核
    deletePeopleExamine: "service-volunteer/volunteerGroupPeople/deletePeopleExamine", // 志愿者团队成员批量拒绝审核
    insertGroupPeople: "service-volunteer/volunteerGroupPeople/insertGroupPeople", //申请加入志愿者团队
    getGroupPeople: "service-volunteer/volunteerGroupPeople/getGroupPeople", //获取单个志愿者团队用户信息
    listVolunteerActive: "service-volunteer/volunteerActive/listVolunteerActive", //查找志愿者活动
    updateActiveBrowse: "service-volunteer/volunteerActive/updateActiveBrowse", //志愿者活动浏览量增加
    updateActiveCollection: "service-volunteer/volunteerActive/updateActiveCollection", //志愿者活动感兴趣量增加
    getVolunteerActive: "service-volunteer/volunteerActive/getVolunteerActive", //获取志愿者活动详细信息
    insertActiveUp: "service-volunteer/volunteerActiveUp/insertActiveUp", //添加志愿者活动人员
    insertFreezingRecord: "service-volunteer/volunteerFreezingRecord/insertFreezingRecord", //志愿者冻结
    updateFreezingRecord: "service-volunteer/volunteerFreezingRecord/updateFreezingRecord", //修改志愿者冻结状态
    deleteGroup: "service-volunteer/volunteerGroup/deleteGroup", //解散志愿者团队
    listPeopleByUserId: "service-volunteer/volunteer/listPeopleByUserId", //根据用户ID获取志愿者信息
    listPeopleByVolunteerId: "service-volunteer/volunteer/listPeopleByVolunteerId", //根据用户ID获取志愿者信息
    getPeopleByVolunteerId: "service-volunteer/volunteer/getPeopleByVolunteerId", //根据志愿者id获取志愿者信息
    deleteActiveCollection: "service-volunteer/volunteerActiveCollection/deleteActiveCollection", //根据用户ID获取志愿者信息
    getVolunteerActiveList: "service-volunteer/volunteerActive/getVolunteerActiveList", //查找志愿者活动
    countFreezingRecord: "service-volunteer/volunteerFreezingRecord/countFreezingRecord" //志愿者是否冻结
}

var help = { // 帮助与反馈
    feedback_save: "service-volunteer/sysFeedback/save", // 提交反馈
    problem_search: "service-volunteer/sysProblem/getSearchProblemPage", // 搜索问题
    problem_history_search: "service-volunteer/sysQusetionHistory/search", //获取搜索问题历史
    problem_history_del: "service-volunteer/sysQusetionHistory/del", // 删除搜索问题历史
    problem_history_dels: "service-volunteer/sysQusetionHistory/delAll", // 清空搜索问题历史
    getQuestionInfo: "service-volunteer/sysProblem/getQuestionInfo", //获取问题详情
    listHotQuestion: "service-volunteer/sysProblem/listHotQuestion", // 获取热门问题
    listCommonQuestion: "service-volunteer/sysProblem/listCommonQuestion", // 获取常见问题
}

var bill = { // 知识账单
    insertbookReadingHistory: "service-bill//bookReadingHistory/insertHistory", //新增阅读历史
    updateBookReadingHistory: "service-bill//bookReadingHistory/updateBookReadingHistory", //更新
    getBookReadingHistoryByMonth: "service-bill//bookReadingHistory/getBookReadingHistoryByMonth", //查询当月下每天阅读书籍数量
    getBookReadingHistoryByDate: "service-bill//bookReadingHistory/getBookReadingHistoryByDate", //查询某年某月某天阅读的书籍
    selectStudy: "service-bill//bookReadingHistory/selectStudy", //获取学习时长(天数)
    selcetContinuousStudy: "service-bill//bookReadingHistory/selcetContinuousStudy", //获取连续学习天数
    insertLog: "service-bill//bookReadingHistory/insertLog", //插入日志
}

var pay = { // 缴费
    binding: "user/binding", //示例
}

var query = { // query
    getCode: "service-query/librarySearch/getCode", //获取验证码
    gofirst: "service-query/librarySearch/gofirst", //------
    submit: "service-query/librarySearch/submit", //提交书库检索
    searchList: "service-query/librarySearch/searchList", //书库检索,查询搜索list
    searchInfoByDetail: "service-query/librarySearch/searchInfoByDetail", //书库检索,详情
    findBorrow: "service-query/biblios/findBorrow", //获取借阅书籍
    searchBorrowWxToday: "service-query/biblios/searchBorrowWxToday", //查询今日借阅数
    searchBorrowWxTodayOne: "service-query/wxBigdata/searchBorrowWxToday",
    // selectLoansCount: "service-query/bigdata/selectLoansCount",//馆藏饼状图 借阅办卡数据
    payHistory: "service-query/logCir/payHistory", // 查询支付记录
    listHodingSearch: "service-query/holding/listHodingSearch", //查询馆藏信息
    getHodingByBarcode: "service-query/holding/getHodingByBarcode", //根据barcode查询预取书点
    countUserByPhone: "service-query/ydzzUser/countUserByPhone", //获取文旅云账号
    bindYdzzUser: "service-query/sysUserYdzz/bindYdzzUser", //一键绑定文旅云用户
    countYdzzUser: "service-query/sysUserYdzz/countYdzzUser", //获取用户是否绑定文旅云
    doLogin: "service-query/ydzzUser/doLogin", //绑定文旅云账号
    sendSmsCode: "service-query/ydzzUser/sendSmsCode", //发送文旅云短信验证码
    doRegister: "service-query/ydzzUser/doRegister", //注册文旅云账号
    getReservation: "service-query/reservation/getReservation", // 根据读者证获取分页获取预约记录
    getRes: "service-query/reservation/getRes", // 根据读者证查询登记成功或者分配状态的预约记录
    getResCount: "service-query/reservation/getResCount", // 根据barcode查询读者是否预约了该书籍
    getHoldingInfoByBarcode: "service-query/holding/getHoldingInfoByBarcode", //根据条形码获取书籍信息
    loanbook: "service-query/holding/loanbook", //扫码借书
    // recommended: "service-query/recommen/recommended", //书籍详情页相关推荐
}

function commonFun(param) {
    for (var x in common) {
        if (param == x) {
            return "common/" + common[x];
        }
    }
}

function paymentFun(param) {
    for (var x in payment) {
        if (param == x) {
            return "payment/" + payment[x];
        }
    }
}

function reservationFun(param) {
    for (var x in reservation) {
        if (param == x) {
            return "reservation/" + reservation[x];
        }
    }
}

function userFun(param) {
    for (var x in user) {
        if (param == x) {
            return "user/" + user[x];
        }
    }
}

function fileFun(param) {
    for (var x in file) {
        if (param == x) {
            return "files/" + file[x];
        }
    }
}

function bigdataFun(param) {
    for (var x in bigdata) {
        if (param == x) {
            return "bigdata/" + bigdata[x];
        }
    }
}

function activityFun(param) {
    for (var x in activity) {
        if (param == x) {
            return "volunteer/" + activity[x];
        }
    }
}

function logFun(param) {
    for (var x in log) {
        if (param == x) {
            return "log/" + log[x];
        }
    }
}

function notificationFun(param) {
    for (var x in notification) {
        if (param == x) {
            return "notification/" + notification[x];
        }
    }
}

function borrowFun(param) {
    for (var x in borrow) {
        if (param == x) {
            return "borrow/" + borrow[x];
        }
    }
}

function enquiriesFun(param) {
    for (var x in enquiries) {
        if (param == x) {
            return "enquiries/" + enquiries[x];
        }
    }
}

function volunteerFun(param) {
    for (var x in volunteer) {
        if (param == x) {
            return "volunteer/" + volunteer[x];
        }
    }
}

function helpFun(param) {
    for (var x in help) {
        if (param == x) {
            return "volunteer/" + help[x];
        }
    }
}

function billFun(param) {
    for (var x in bill) {
        if (param == x) {
            return "bill/" + bill[x];
        }
    }
}

function payFun(param) {
    for (var x in payFun) {
        if (param == x) {
            return "payFun/" + payFun[x];
        }
    }
}

function queryFun(param) {
    for (var x in query) {
        if (param == x) {
            return "query/" + query[x];
        }
    }
}


function excavateFun(param) {
    for (var x in excavate) {
        if (param == x) {
            return "excavate/" + excavate[x];
        }
    }
}


export default {
    common: commonFun, // 公共
    payment: paymentFun, // 支付
    reservation: reservationFun, // 我的预约
    user: userFun, // 用户
    file: fileFun, // 文件处理
    activity: activityFun, // 活动
    log: logFun, // 操作日志
    notification: notificationFun, // 消息推送
    borrow: borrowFun, // 借阅服务
    enquiries: enquiriesFun, // 馆内查询
    volunteer: volunteerFun, // 志愿者
    help: helpFun, // 帮助与反馈
    bill: billFun, // 知识账单
    pay: payFun, // 缴费
    query: queryFun, // query
    excavate: excavateFun, //excavate
    bigdata: bigdataFun, // 公共
}
