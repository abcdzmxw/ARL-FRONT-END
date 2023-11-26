import { asyncRoutes, constantRoutes } from '@/router'
const _import = require('@/router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param {Array} asyncRouterMap
 * @returns
 */

function filterAsyncRouter(asyncRouterMap) {
    // console.log('11.3.1', asyncRouterMap)
    let accessedRouters
    if (asyncRouterMap && asyncRouterMap.length == 0) {
        return accessedRouters = []
    }
    accessedRouters = asyncRouterMap && asyncRouterMap.filter(route => {
        route.meta = {
            title: route.name,
            roles: ['admin', 'editor'],
            icon:route.icon
        }

        if (route.component) {
            if (route.component === 'Layout') { //Layout组件特殊处理
                route.component = Layout
            } else {
                route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    // console.log('11.3.9', accessedRouters)
    return accessedRouters
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    let tempArr = window.localStorage.getItem(name)
    let menuList = [] // 处理数组todo
    return menuList
}
//处理返回的菜单数组
function transArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        // console.log('i,item',i,item)
        item.name = item.menu_name
        item.path = item.click_uri
        item.component = item.route
        item.hidden = false
        item.meta = {
            title:item.menu_name,
            noCache:false,
            icon:item.icon
        }
        delete item.click_uri
        delete item.route

        if(item.secondMenuList){
            let children = [...item.secondMenuList]
            item.children = transArr(children)
            delete item.secondMenuList
        }
    }
    // console.log('transArr end',arr)
    return arr
}

// state,mutations, actions
const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        // console.log('mutations SET_ROUTES=>',routes)
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes( { commit, state,rootState }, roles) {
        // console.log('state.menuList---->', rootState.user.menuList)
        // console.log('@@ 11. 0',transArr(rootState.user.menuList))
        // console.log('@@ 11. 1')
        return new Promise(resolve => {
            let accessedRoutes;
            // accessedRoutes = filterAsyncRouter(getObjArr('menuList'))
            accessedRoutes = filterAsyncRouter(transArr(rootState.user.menuList))
            // console.log('111111111 accessedRoutes=>', accessedRoutes)
            // console.log('xx=>1',commit)
            commit('SET_ROUTES', accessedRoutes)
            // console.log('xx=>2')
            // console.log('SET_ROUTES',accessedRoutes)
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