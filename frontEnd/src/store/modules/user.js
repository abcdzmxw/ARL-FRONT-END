import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, getCurrUser, setCurrUser, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    profile: {},
    currUser: JSON.parse(getCurrUser()) || {},
    introduction: '',
    roles: [],
    menuList: [], // 菜单列表
}

const mutations = {
    SET_Profile: (state, profile) => {
        state.profile = profile
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_MENU: (state, menuList) => {
        state.menuList = menuList
    },
    SET_CURR_USER: (state, info) => {
        state.currUser = info
        setCurrUser(info)
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password, validate_code, user_key } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password, validate_code, user_key })
                .then(response => {
                    // console.log('login', response)
                    let { data } = response
                    if (data.code == 200) {
                        console.log('login success=>', data)
                        let Token = data.token
                        let currUser = {
                            username: data.username,
                            name: data.name
                        }
                        setCurrUser(currUser)
                        setToken(Token)
                        commit('SET_TOKEN', Token)
                        commit('SET_CURR_USER', currUser)
                        commit('SET_NAME', data.username)
                        resolve()
                    } else {
                        reject(data.message)
                    }
                }).catch(error => {
                    // console.log('login error', error)
                    reject(error)
                })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {

                let { data } = response
                if (!data) {
                    reject('验证失败，请重新登录.')
                }
                commit('SET_MENU', data)
                commit('SET_ROLES', ['foo']) // ==TODO
                sessionStorage.setItem("IsRefresh", true); // 用来标识刷新页面
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            logout().then((res) => {
                console.log('logout 0', res)
                if (res.code == 200) {
                    console.log('logout success');
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    localStorage.clear()
                    sessionStorage.clear()
                    console.log('clear local session');
                    removeToken()
                    resetRouter()
                    dispatch('tagsView/delAllViews', null, { root: true })
                    resolve()
                }
            }).catch(error => {
                reject(error)
                console.log('logout error')
            }).finally(() => {
                console.log('logout finally')
                localStorage.clear()
                sessionStorage.clear()
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}