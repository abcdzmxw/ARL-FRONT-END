// Poc信息.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/poc/`,
    method: 'GET',
    params,
    isReturnNativeResponse:true
  })
}

// 更新
export function syncObj() {
  return request({
    url: `/poc/sync/`,
    method: 'GET',
  })
}

// 清空
export function emptyObj() {
  return request({
    url: `/poc/delete/`,
    method: 'GET',
  })
}