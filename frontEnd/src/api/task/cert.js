// SSL证书
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/cert/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/cert/delete/`,
    method: 'post',
    data
  })
}
