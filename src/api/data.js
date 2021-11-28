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

// 分配角色
export function allotRole(userId,selectedRoleId){
  return axios.request({
    url: `users/${userId}/role`,
    method: 'put',
    data: {
      rid: selectedRoleId
    }
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

// 获取商品分类
export function getCateList(queryInfo){
  return axios.request({
    url: 'categories',
    method: 'get',
    params: queryInfo
  })
}

export function getParentCateList(){
  return axios.request({
    url: 'categories',
    method: 'get',
    params: { type: 2}
  })
}

export function addCate(cateInfo){
  return axios.request({
    url: 'categories',
    method: 'post',
    data: cateInfo
  })
}

export function editCate(cat_id,cat_name){
  return axios.request({
    url: `categories/${cat_id}`,
    method: 'put',
    data: {
      cat_name
    }
  })
}

export function deleteCate(cate_id){
  return axios.request({
    url: `categories/${cate_id}`,
    method: 'delete'
  })
}


