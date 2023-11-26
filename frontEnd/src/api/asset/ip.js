// 资产搜索-站点.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/ip/`,
    method: 'GET',
    params,
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/ip/delete/`,
    method: 'post',
    data,
  })
}

// 导出
export function exportObj(params) {
  return request({
    url: `/ip/export/`,
    method: 'get',
    params,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}

