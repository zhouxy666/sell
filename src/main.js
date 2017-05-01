// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from '@/components/tab/goods'
import Ratings from '@/components/tab/ratings'
import Seller from '@/components/tab/seller'

Vue.use(VueRouter)
/* eslint-disable no-new */

const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller}
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'tabActive'
})
new Vue({
  el: '#app',
  components: { App },
  router
})

