// 漏洞风险
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/vuln/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/vuln/delete/`,
    method: 'post',
    data
  })
}
