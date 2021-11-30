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

import '@/filter/filter.js'

// 全局引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 树形表格
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)


// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
