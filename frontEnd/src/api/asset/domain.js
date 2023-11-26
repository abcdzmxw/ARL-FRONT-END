// 资产搜索-domain.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/domain/`,
    method: 'GET',
    params,
  })
}
//删除
export function delObj(data) {
  return request({
    url: `/domain/delete/`,
    method: 'post',
    data,
  })
}

// 导出
export function exportObj(params) {
  return request({
    url: `/domain/export/`,
    method: 'get',
    params,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}