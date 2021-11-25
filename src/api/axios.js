// 二次封装axios

import axios from 'axios'
import config from '../config/index'

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
      header: {
      }
    }
    return config 
  }
  interceptors(instance){
    // 请求拦截器 
    instance.interceptors.request.use(function(config){
      console.log(config,'config')
      return config
    },function(error){
      console.log(error,'error')
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(function(response){
      console.log(response,'response')
      return response
    },function(error){
      console.log(error,'error')
      return Promise.reject(error)
    })
  }

  request(options){
    // 请求
    // /api/getList /api/getHome
    
    const instance = axios.create()
    options = {...(this.getInsideConfig()),...options}
    console.log('拦截。。',options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)