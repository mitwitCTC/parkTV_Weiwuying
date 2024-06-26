import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import time from '../tools/time';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.prototype.$time = time

Vue.use(new VueSocketIO({
  debug: false,
  // 服务器端地址
  connection: '192.168.1.227/deerRudolph', // ip 依照各台多媒體機的 ip 修改
}))

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
