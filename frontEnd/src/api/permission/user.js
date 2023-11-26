// api for 系统管理>用户管理
import request from '@/utils/request'

// 用户注册
export function addObj(data) {
    return request({
        url: '/admin/register',
        method: 'post',
        data
    })
}
// 用户编辑
export function editObj(data) {
    return request({
        url: `/admin/update`,
        method: 'post',
        data
    })
}

// 用户删除
export function delObj(id) {
    return request({
        url: `/admin/del/${id}`,
        method: 'get'
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/admin/getAdminInfo/${id}`,
        method: 'get',
    })
}

// 用户列表
export function getPage(data) {
    return request({
        url: '/admin/list',
        method: 'post',
        data
    })
}

// 获取用户角色列表
export function getRoles() {
    return request({
        url: '/admin/getRoles',
        method: 'post'
    })
}