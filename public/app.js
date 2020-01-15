var basic = {

	headArr: [
		"https://",
		"wss://"
	],
	count: 0,
	// 环境域名
	envArr: [
		// '10.10.10.154:9997/',
		'tsg.zydbai.com/'
	],
	// ajax请求封装
	getAjaxData: function(service, param, type) { // 接口名称，参数（对象），请求方法（GET,POST）
		var that = this;
		that.addShowLoadingCount();
		var url = that.headArr[0] + that.envArr[0] + service;
		var token = uni.getStorageSync('token');
		return new Promise((resolve, reject) => {
			uni.request({
				url: url, // 仅为示例，并非真实的接口地址
				method: type,
				data: param,
				header: {
					'Authorization': token
				},
				success: function(res) {
					resolve(res)
				},
				fail: function(res) {
					reject(res);
				},
				complete: function() {
					that.removeShowLoadingCount();
				}
			})
		})
	},
	//图片上传
	getFileUrl: function(file) {
		var that = this;
		that.addShowLoadingCount();
		var token = uni.getStorageSync('token');
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: this.headArr[0] + this.envArr[0] + 'common/service-common/upload',
				filePath: file,
				name: 'file',
				header: {
					'Authorization': token
				},
				success: function(res) {
					resolve(res)
				},
				fail: function(res) {
					reject(res);
				},
				complete: function() {
					that.removeShowLoadingCount();
				}
			})
		})
	},
	addShowLoadingCount() {
		if (this.count == 0) {
			uni.showLoading({
				title: 'Loading'
			})
		}
		this.count++;
	},
	removeShowLoadingCount() {
		this.count--;
		if (this.count == 0) {
			uni.hideLoading();
		}
	},
	// 主色调
	mainCol: '#197CB7',

	obj: {
		email: '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$',
		phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
		passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
	},
	//验证
	validate(data, reg) {
		var temp = new RegExp(reg);
		return temp.test(data)
	},
	//跳转登录页
	goTOLogin() {
		uni.navigateTo({
			url: '/pages/my/login'
		})
	}
}

export default {
	basic
}
