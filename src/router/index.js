import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' // 直
// import Home from '../views/tvView.vue' // 橫

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
