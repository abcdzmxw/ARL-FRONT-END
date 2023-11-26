// 指纹信息.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/fingerprint/`,
    method: 'GET',
    params,
    isReturnNativeResponse:true
  })
}

// 添加
export function addObj(data) {
  return request({
    url: `/fingerprint/`,
    method: 'post',
    data
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/fingerprint/delete/`,
    method: 'post',
    data
  })
}

// 导出
export function exportObj(data) {
  return request({
    url: `/fingerprint/export/`,
    method: 'get',
    data,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}

// 上传
export function uploadObj(data) {
  return request({
    url: `/fingerprint/upload/`,
    method: 'post',
    data
  })
}