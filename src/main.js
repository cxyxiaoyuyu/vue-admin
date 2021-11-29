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

Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = ('0' + (dt.getMonth()+1)).slice(-2)
  const d = ('0' + dt.getDate()).slice(-2)
  const hh = ('0' + dt.getHours()).slice(-2)
  const mm = ('0' + dt.getMinutes()).slice(-2)
  const nn = ('0' + dt.getSeconds()).slice(-2)
  return `${y}-${m}-${d} ${hh}:${mm}:${nn}`
})

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
