// api for 用户管理>用户管理
import request from '@/utils/request'


// 创建
export function addObj(data) {
    return request({
        url: '/document/add',
        method: 'post',
        data
    })
}
// 编辑
export function editObj(data) {
    return request({
        url: `/document/edit`,
        method: 'post',
        data
    })
}

// 删除 
export function delObj(id) {
    return request({
        url: `/document/delete/${id}`,
        method: 'get',
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/document/detail/${id}`,
        method: 'get',
    })
}

// 列表
export function getPage(data) {
    return request({
        url: '/document/list',
        method: 'post',
        data
    })
}