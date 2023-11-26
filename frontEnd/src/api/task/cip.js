// c段
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/cip/`,
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
