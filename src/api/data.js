import axios from './axios'

export const login = (data) => {
  return axios.request({
    url: 'login',
    method: 'post',
    data
  })
}

export const getMenu = () => {
  return axios.request({
    url: 'menu',
    method: 'get'
  })
}



export const getHomeTableData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}