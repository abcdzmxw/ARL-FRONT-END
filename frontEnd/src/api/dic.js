// 字典
import request from '@/utils/request'

// 域名爆破类型字典
export function dicDomainBruteType() {
    return request({
        url: '/task/get_domain_brute_type',
        method: 'get',
    })
}

// 功能列表字典
export function dicFunction() {
    return request({
        url: '/task/get_function',
        method: 'get',
    })
}

// 任务端口扫描类型字典
export function dicTaskPortScanType() {
    return request({
        url: '/task/get_port_scan_type',
        method: 'get',
    })
}
