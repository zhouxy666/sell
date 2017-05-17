// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import AMap from 'vue-amap'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
import Food from '@/components/food/food'
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: 'e2592b77d16da67df53b352025685edc',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
/* eslint-disable no-new */

const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller},
  {path: '/food', component: Food}
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'tabActive'
})
new Vue({
  el: '#app',
  // components: { App },
  render: h => h(App),
  router
})

