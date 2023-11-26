// nuclei
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/nuclei_result/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/nuclei_result/delete/`,
    method: 'post',
    data
  })
}
