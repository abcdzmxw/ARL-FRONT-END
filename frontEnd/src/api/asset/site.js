// 资产搜索-站点.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/site/`,
    method: 'GET',
    params,
  })
}

// 导出
export function exportObj(params) {
  return request({
    url: `/site/export/`,
    method: 'get',
    params,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/site/delete/`,
    method: 'post',
    data,
  })
}

// 站点标签添加
export function addObj_tag(data) {
  return request({
    url: `/site/add_tag/`,
    method: 'post',
    data,
  })
}
// 站点标签删除
export function delObj_tag(data) {
  return request({
    url: `/site/delete_tag/`,
    method: 'post',
    data,
  })
}