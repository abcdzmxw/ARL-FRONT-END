import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/role/pageList',
    method: 'get',
    params
  })
}
//查询当前登录用户的角色
export function roleObj(params) {
  return request({
    url: '/role/assignRoleList',
    method: 'get',
    params
  })
}
export function roleObj2(id) {
  return request({
    url: `/role/getUserRoleList?user_id=${id}`,
    method: 'get',
  })
}
// 全部角色 分配时列表
export function roleList() {
  return request({
    url: '/role/list',
    method: 'get',
  })
}

export function addObj(data) {
  return request({
    url: '/role/',
    method: 'post',
    data
  })
}

export function updateObj(data) {
  return request({
    url: `/role/`,
    method: 'patch',
    data
  })
}

export function delObj(data) {
  return request({
    url: `/role/`,
    method: 'delete',
    data
  })
}
