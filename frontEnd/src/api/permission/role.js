// api for 系统管理>角色管理
import request from '@/utils/request'

// 角色创建
export function addObj(data) {
    return request({
        url: '/role/add',
        method: 'post',
        data
    })
}
// 角色编辑
export function editObj(data) {
    return request({
        url: `/role/update`,
        method: 'post',
        data
    })
}

// 删除 
export function delObj(id) {
    return request({
        url: `/role/delete/${id}`,
        method: 'get',
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/role/find/${id}`,
        method: 'get',
    })
}

// 列表
export function getPage(data) {
    return request({
        url: '/role/list',
        method: 'post',
        data
    })
}

// 获取角色等级
export function getRoleLevel() {
    return request({
        url: '/role/keyPrefix',
        method: 'get',
    })
}