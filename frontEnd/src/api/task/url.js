// url信息
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/url/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/site/delete/`,
    method: 'post',
    data
  })
}

// 导出
export function exportObj(params) {
  return request({
    url: `/url/export/`,
    method: 'get',
    params,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}