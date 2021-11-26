import axios from './axios'

export const login = (data) => {
  return axios.request({
    url: 'login',
    method: 'post',
    data
  })
}

export const getMenuList = () => {
  return axios.request({
    url: 'menus',
    method: 'get'
  })
}

export const getUserList = (queryInfo) => {
  return axios.request({
    url: 'users',
    method: 'get',
    params: queryInfo
  })
}

export const changeUserState = (userInfo) => {
  return axios.request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  })
}

export const addUser = (userInfo) => {
  return axios.request({
    url: 'users',
    method: 'post',
    data: userInfo
  })
}

export const editUser = (userInfo) => {
  return axios.request({
    url: `users/${userInfo.id}`,
    method: 'put',
    data: {
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}

export const deleteUser = (id) => {
  return axios.request({
    url: `users/${id}`,
    method: 'delete',
  })
}

export const getHomeTableData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}