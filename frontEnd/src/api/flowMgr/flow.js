// 漏洞管理.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/flow/pageList`,
    method: 'GET',
    params
  })
}

// 查询审核列表
export function getAdminPage(params) {
  return request({
    url: `/flow/admin/pageList`,
    method: 'GET',
    params
  })
}

// 查询
export function getObj(id) {
  return request({
    url: `/flow/${id}`,
    method: 'GET',
    params
  })
}

//添加
export function addObj(data) {
  return request({
    url: '/flow/',
    method: 'POST',
    data
  })
}
//修改
export function updateObj(data) {
  return request({
    url: `/flow/`,
    method: 'PATCH',
    data
  })
}
//删除
export function delObj(data) {
  return request({
    url: `/flow/`,
    method: 'DELETE',
    data
  })
}

//提交记录
export function submitObj(id,data) {
  return request({
    url: `/flow/submit/${id}`,
    method: 'patch',
    data
  })
}

//审核记录
export function processObj(id,data) {
  return request({
    url: `/flow/process/${id}`,
    method: 'patch',
    data
  })
}