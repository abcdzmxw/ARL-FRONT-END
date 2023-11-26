import request from '@/utils/request'

// 查询列表
export function getPage(params) {
  return request({
    url: `/policy/`,
    method: 'GET',
    params
  })
}
export function getObj(id) {
  return request({
    url: `/policy/?_id=${id}`,
    method: 'GET',
  })
}
//添加
export function addObj(data) {
  return request({
    url: '/policy/add/',
    method: 'POST',
    data
  })
}

//编辑
export function updateObj(data) {
  return request({
    url: '/policy/edit/',
    method: 'POST',
    data
  })
}

//删除
export function delObj(data) {
  return request({
    url: '/policy/delete/',
    method: 'POST',
    data
  })
}

// 任务下发
export function distributionObj(data) {
  return request({
    url: '/task/policy/',
    method: 'POST',
    data
  })
}

// ====== 字典
// 域名功能列表
export function dicDomainFunction() {
  return request({
    url: `/policy/get_domain_function`,
    method: 'GET',
  })
}

// poc配置
export function dicPocConfig() {
  return request({
    url: `/policy/get_poc_config`,
    method: 'GET',
  })
}

// 端口扫描类型
export function dicPortScanType() {
  return request({
    url: `/policy/get_port_scan_type`,
    method: 'GET',
  })
}

// 站点风险列表
export function dicSiteVuln() {
  return request({
    url: `/policy/get_site_vuln`,
    method: 'GET',
  })
}

// 弱口令爆破配置
export function dicWeakPassword() {
  return request({
    url: `/policy/get_weak_password`,
    method: 'GET',
  })
}

// 资产组
export function dicAsset(params){
  return request({
    url: `/asset_scope/`,
    method: 'GET',
    params
  })
}