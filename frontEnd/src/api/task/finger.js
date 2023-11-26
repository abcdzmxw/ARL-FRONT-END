// 指纹统计
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/stat_finger/`,
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
