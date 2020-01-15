import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		id: 53,
		userName: '未登录',
		headPortrait: 'https://wj.zydbai.com/icon_prop.png',
		phone: '',
		rdId: null,
		rdIdCode: null
	},
	mutations: {
		updateInfo(state, provider) {
			state.id = provider.id;
			state.userName = provider.nickname;
			state.phone = provider.phone;
			state.headPortrait = provider.headPortrait;
			state.rdId = provider.rdId;
			state.rdIdCode = provider.rdidCode;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		login(state, provider) {
			state.hasLogin = true;
			state.id = provider.id;
			state.userName = provider.nickname;
			state.phone = provider.phone;
			state.headPortrait = provider.headPortrait;
			state.rdId = provider.rdId;
			state.rdIdCode = provider.rdidCode;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.id = 53;
			state.userName = "未登录";
			state.headPortrait = "https://wj.zydbai.com/icon_prop.png";
			state.phone = '';
			state.rdId = null;
			state.rdIdCode = null;
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	}
})

export default store
