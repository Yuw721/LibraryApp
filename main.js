import Vue from 'vue'
import App from './App'
import "./static/css/iconfont.css"
import store from './store'
import GoEasy from 'goeasy-1.0.3.js'

Vue.prototype.$GoEasy=new GoEasy({
  host:'hangzhou.goeasy.io',//应用所在的区域地址，杭州：hangzhou.goeasy.io，新加坡：singapore.goeasy.io
  appkey: "BC-6cd0adf1ba3243858701fc72c6ba7b68",//替换为您的应用appkey
  onConnected: function() {
      console.log('连接成功！')
  },
  onDisconnected: function() {
      console.log('连接断开！')
  },
  onConnectFailed: function(error) {
      console.log('连接失败或错误！')
  }
});



Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
