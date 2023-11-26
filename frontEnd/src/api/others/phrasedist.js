// api for 用户管理>用户管理
import request from '@/utils/request'


// 创建
export function addObj(data) {
    return request({
        url: '/phraseDist/add',
        method: 'post',
        data
    })
}
// 编辑
export function editObj(data) {
    return request({
        url: `/phraseDist/update`,
        method: 'post',
        data
    })
}

// 删除 
export function delObj(id) {
    return request({
        url: `/phraseDist/delete/${id}`,
        method: 'get',
    })
}

// 详情
export function getObj(id) {
    return request({
        url: `/phraseDist/detail/${id}`,
        method: 'get',
    })
}

// 列表
export function getPage(data) {
    return request({
        url: '/phraseDist/phraseList',
        method: 'post',
        data
    })
}

// 类目树状数组
export function getFlod() {
    return request({
        url: '/phraseDist/flod',
        method: 'get',
    })
}