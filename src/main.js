import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import '@/assets/js/svg.js'

// 开发环境下 引入mockjs
if(process.env.NODE_ENV === 'development'){
  require('@/api/mock.js')
}

import http from 'axios'
Vue.prototype.$http = http

// 全局引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
