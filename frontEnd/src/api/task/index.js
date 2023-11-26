// 任务信息.js
import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/task/`,
    method: 'GET',
    params,
    // isReturnNativeResponse:true
  })
}

// 添加
export function addObj(data) {
  return request({
    url: `/task/`,
    method: 'post',
    data
  })
}

//删除
export function delObj(data) {
  return request({
    url: `/task/delete/`,
    method: 'post',
    data
  })
}

//批量停止
export function batchStopObj(data) {
  return request({
    url: `/task/batch_stop/`,
    method: 'post',
    data
  })
}
//任务停止
export function stopObj(id) {
  return request({
    url: `/task/stop/${id}`,
    method: 'get',
  })
}

//任务通过策略下发
export function policyObj(data) {
  return request({
    url: `/task/policy/`,
    method: 'post',
    data
  })
}
//任务重启
export function restartObj(data) {
  return request({
    url: `/task/restart/`,
    method: 'post',
    data
  })
}

//任务同步到资产组
export function syncObj(data) {
  return request({
    url: `/task/sync/`,
    method: 'post',
    data
  })
}
//目标映反查资产分组
export function scopeObj(params) {
  return request({
    url: `/task/sync_scope/`,
    method: 'get',
    params
  })
}

// FOFA任务下发
export function fofaSubmitObj(data) {
  return request({
    url: `/task_fofa/submit`,
    method: 'post',
    data
  })
}
// FOFA测试连接
export function fofaTestObj(data) {
  return request({
    url: `/task_fofa/test`,
    method: 'post',
    data
  })
}

// 字典
export function dicDomainBruteType() {
  return request({
    url: `/task/get_domain_brute_type`,
    method: 'get',
  })
}
export function dicFunction() {
  return request({
    url: `/task/get_function`,
    method: 'get',
  })
}
export function dicPortScanType() {
  return request({
    url: `/task/get_port_scan_type`,
    method: 'get',
  })
}

// 批量导出
export function exportObj(type,data) {
  return request({
    url: `/batch_export/${type}/`,
    method: 'get',
    data,
    isNoCodeResponse:true,
    responseType:'blob'
  })
}
