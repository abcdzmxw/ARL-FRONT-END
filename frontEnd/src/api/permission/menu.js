import request from '@/utils/request'

export function addObj(data) {
    return request({
        url: '/menu/add',
        method: 'post',
        data
    })
}

export function editObj(data) {
    return request({
        url: '/menu/edit',
        method: 'post',
        data
    })
}

export function delObj(id) {
    return request({
        url: `/menu/delete/${id}`,
        method: 'get'
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/menu/findOne/${id}`,
        method: 'get',
    })
}

// 所有菜单列表
export function getPage() {
    return request({
        url: '/menu/menuList',
        method: 'get'
    })
}