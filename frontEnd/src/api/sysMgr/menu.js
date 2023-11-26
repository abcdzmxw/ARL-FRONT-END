import request from '@/utils/request'

// 查询菜单列表
export function getPage(params) {
  return request({
    url: `/menu/pageList`,
    method: 'GET',
    params
  })
}

// 查询全部菜单 角色分配菜单
export function getAllMenu(params) {
  return request({
    url: `/menu/list`,
    method: 'GET',
    params
  })
}

// 一级菜单列表
export function getFirstLevelMenuList() {
  return request({
    url: '/menu/getAllFirstLevelMenuList',
    method: 'GET'
  })
}

// 查询用户菜单列表
export function getUserMenuList() {
  return request({
    url: '/menu/getUserMenuList',
    method: 'GET'
  })
}

// 查询角色拥有的菜单列表
export function assignObj(roleId) {
  return request({
    url: `/menu/assignMenu/${roleId}`,
    method: 'GET'
  })
}
//给角色分配菜单
export function assignMenu(role_id,data) {
  return request({
    url: `/menu/assignMenu/${role_id}`,
    method: 'PATCH',
    data
  })
}

//添加菜单
export function addObj(data) {
  return request({
    url: '/menu/',
    method: 'POST',
    data
  })
}
//修改菜单
export function updateObj(data) {
  return request({
    url: `/menu/`,
    method: 'PATCH',
    data
  })
}
//删除菜单
export function delObj(data) {
  return request({
    url: `/menu/`,
    method: 'DELETE',
    data
  })
}
