import Vue from 'vue'
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