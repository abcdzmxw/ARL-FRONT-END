// api for 用户管理>用户管理
import request from '@/utils/request'


// 创建
export function addObj(data) {
    return request({
        url: '/users/add',
        method: 'post',
        data
    })
}
// 编辑
export function editObj(data) {
    return request({
        url: `/users/edit`,
        method: 'post',
        data
    })
}

// 删除
export function delObj(id) {
    return request({
        url: `/users/del/${id}`,
        method: 'get',
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/users/detail/${id}`,
        method: 'get',
    })
}

// 列表
export function getPage(data) {
    return request({
        url: '/users/list',
        method: 'post',
        data
    })
}

// 用户认证
export function approveObj(data) {
    return request({
        url: '/users/approve',
        method: 'post',
        data
    })
}

// 违约扣除保证金
export function deductObj(data) {
    return request({
        url: '/users/deduct',
        method: 'post',
        data
    })
}

// 出价记录
export function bidObj(data) {
    return request({
        url: '/users/bidRecord',
        method: 'post',
        data
    })
}

// 字典  "enterprise_type"：企业类型  "main_business"：主营业务
export function getDic() {
    return request({
        url: `/users/getEnterprise`,
        method: 'get',
    })
}