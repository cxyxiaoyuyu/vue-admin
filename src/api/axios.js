// 二次封装axios

import axios from 'axios'
import config from '../config/index'
import Vue from 'vue'

// 设置配置
const baseUrl = process.env.NODE_ENV === 'development' 
  ? config.baseUrl.dev 
  : config.baseUrl.pro

class HttpRequest{
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  getInsideConfig(){
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
    return config 
  }
  interceptors(instance){
    // 请求拦截器 
    instance.interceptors.request.use(function(config){
      return config
    },function(error){
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(function(res){
      if(res.data.meta.status !== 200 && res.data.meta.status !== 201){
        Vue.prototype.$message({
          message: res.data.meta.msg,
          type: 'warning'
        }) 
        return
      }
      return res.data
    },function(error){
      return Promise.reject(error)
    })
  }

  request(options){
    // 请求
    // /api/getList /api/getHome
    
    const instance = axios.create()
    options = {...(this.getInsideConfig()),...options}
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)