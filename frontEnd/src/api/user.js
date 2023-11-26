import request from '@/utils/request'

export function login(data) {
    return request({
        // url: '/user/login', //不需要验证码
        url: '/user/login2', //要验证码
        method: 'post',
        data
    })
}

//
export function getCaptcha() {
    return request({
        url: '/user/captcha',
        method: 'get',
    })
}

// 获取登录用户菜单列表
export function getInfo() {
    return request({
        url: '/menu/getUserMenuList',
        method: 'get',
    })
}


//退出登录
export function logout(){
    return request({
        url: '/user/logout',
        method: 'get',
    })
}

//==============用户管理===

// 用户id查询用户详情
export function getObj(user_id){
    return request({
        url: `/user/${user_id}`,
        method: 'get',
    })
}
// 管理员给用户重置密码
export function resetPsw(data){
    return request({
        url: `/user/reset_password`,
        method: 'post',
        data
    })
}

// 用户修改自己密码
export function changePsw(data){
    return request({
        url: `/user/change_pass`,
        method: 'post',
        data
    })
}

// 查询用户列表
export function getPage(params){
    return request({
        url: `/user/pageList`,
        method: 'get',
        params
    })
}

// 给用户分配角色
export function assignObj(user_id,data){
    return request({
        url: `/user/assignRole/${user_id}`,
        method: 'patch',
        data
    })
}

// 管理员添加用户
export function addObj(data){
    return request({
        url: `/user/`,
        method: 'post',
        data
    })
}

// 管理员修改用户
export function updateObj(data){
    return request({
        url: `/user/`,
        method: 'patch',
        data
    })
}

// 管理员删除用户
export function delObj(data){
    return request({
        url: `/user/`,
        method: 'delete',
        data
    })
}