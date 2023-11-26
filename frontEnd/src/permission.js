import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist


//页面刷新前重设刷新状态
window.onbeforeunload = function () {//刷新会触发这个事件
    // console.log("更改IsRefresh");
    sessionStorage.setItem("IsRefresh", false);//刷新状态改为false
};

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    // console.log('hasToken',hasToken)
    // console.log('beforeEach',to)
    if (hasToken) {
        // console.log('路由0')
        if (to.path === '/login') {
            // console.log('路由1')
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            // const hasRoles = store.getters.roles && store.getters.roles.length > 0
            // console.log('permission=>',store.getters.roles, hasRoles);

            /** begin old router方式 */
            // if (hasRoles) {
            //     next()
            // } else {
            //     try {
            //         const info = await store.dispatch('user/getInfo')
            //         const accessRoutes = await store.dispatch('permission/generateRoutes', ['admins'])
            //         router.addRoutes(accessRoutes)
            //         next({ ...to, replace: true })
            //     } catch (error) {
            //         await store.dispatch('user/resetToken')
            //         Message.error(error || 'Has Error')
            //         next(`/login?redirect=${to.path}`)
            //         NProgress.done()
            //     }
            // }
            /** end */

            if (JSON.parse(sessionStorage.getItem("IsRefresh"))) {
                next()
            } else {
                try {
                    const info = await store.dispatch('user/getInfo')
                    console.log(info)
                    const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin', 'editor'])
                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // console.log('路由3')
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // console.log('afterEach')
    NProgress.done()
})