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

export const getRightsList = () => {
  return axios.request({
    url: 'rights/list',
    method: 'get'
  })
}

export const getRoleList = () => {
  return axios.request({
    url: 'roles',
    method: 'get'    
  })
}

export function addRole(roleInfo){
  return axios.request({
    url: 'roles',
    method: 'post',
    data: roleInfo
  })
}

export const editRole = (roleInfo) => {
  return axios.request({
    url: `roles/${roleInfo.id}`,
    method: 'put',
    data: {
      roleName: roleInfo.roleName,
      roleDesc: roleInfo.roleDesc
    }
  })
}

export function deleteRole(id){
  return axios.request({
    url: `roles/${id}`,
    method: 'delete'
  })
}

export function deleteRoleRight(roleId,rightId){
  return axios.request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 获取所有权限
export function getRightTree(){
  return axios.request({
    url: 'rights/tree',
    method: 'get'
  })
}

// 分配权限
export function allotRights(roleId,roleIdsStr){
  return axios.request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids: roleIdsStr
    }
  })
}


