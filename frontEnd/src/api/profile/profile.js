import request from '@/utils/request'

// 获取个人信息
export function getObj(id) {
    return request({
        url: `/person/getAdminInfo/${id}`,
        method: 'get',
    })
}

// 更新个人信息
export function editObj(data) {
    return request({
        url: '/person/update',
        method: 'post',
        data
    })
}

// 修改密码
export function setPwd(data) {
    return request({
        url: '/user/updatePassword',
        method: 'patch',
        data
    })
}

// 修改密码
export function setPwd2(data) {
    return request({
        url: '/user/change_pass',
        method: 'post',
        data
    })
}