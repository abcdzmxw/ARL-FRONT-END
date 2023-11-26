import { asyncRoutes, constantRoutes } from '@/router'
const _import = require('@/router/_import_' + process.env.NODE_ENV) //获取组件的方法
console.log('env.NODE_ENV=>', process.env.NODE_ENV)
import Layout from '@/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

//方法一：后端返回全部路由，前端控制。 || 方法二：登录时后端返回用户对应的路由，采用方法二更安全些
/**
 * Use meta.role to determine if the current user has permission  
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        console.log('roles=>', roles);

        return new Promise(resolve => {
            let accessedRoutes
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            // accessedRoutes = [{
            //     path: '/permission',
            //     component: Layout,
            //     redirect: '/permission/menu',
            //     alwaysShow: true, // will always show the root menu
            //     name: 'Permission',
            //     meta: {
            //         title: '系统管理',
            //         icon: 'el-icon-s-tools',
            //         roles: [] // you can set roles in root nav
            //     },
            // }]
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}