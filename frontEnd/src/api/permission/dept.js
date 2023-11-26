// api for 系统管理>部门管理
import request from '@/utils/request'

// 部门注册
export function addObj(data) {
    return request({
        url: '/dept/add',
        method: 'post',
        data
    })
}
// 部门编辑
export function editObj(data) {
    return request({
        url: `/dept/edit`,
        method: 'post',
        data
    })
}

// 删除 
export function delObj(id) {
    return request({
        url: `/dept/del/${id}`,
        method: 'get',
    })
}

// 详情
export function getObj(data) {
    return request({
        url: `/dept/detail`,
        method: 'post',
        data
    })
}

// 列表
export function getPage(data) {
    return request({
        url: '/dept/list',
        method: 'post',
        data
    })
}