import request from '@/utils/request'

export function getPolicy() {
    return request({
        url: '/aliyun/oss/policy',
        method: 'get'
    })
}

export function ossCb(url, data) {
    return request({
        url: url,
        method: 'post',
        data
    })
}