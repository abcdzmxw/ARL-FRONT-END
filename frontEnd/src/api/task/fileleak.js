// 文件泄露
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/fileleak/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/fileleak/delete/`,
    method: 'post',
    data
  })
}
