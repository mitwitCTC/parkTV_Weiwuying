import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import time from '../tools/time';
import VueSocketIO from 'vue-socket.io'
import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$time = time

Vue.use(new VueSocketIO({
  debug: false,
  // 服务器端地址
  connection: 'localhost/deerRudolph', // 打包時要把 "localhost/" 拿掉
}))

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
