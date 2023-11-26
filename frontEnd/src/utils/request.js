import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
let isReturnNativeResponse = false //直接返回response是否不带data
let isNoCodeResponse = false //返回response是否没有code
// request interceptor
service.interceptors.request.use(
  config => {
    isReturnNativeResponse = config.isReturnNativeResponse ? true : false
    isNoCodeResponse = config.isNoCodeResponse ? true : false

    if (store.getters.token) {
      // config.headers['Authorization'] = getToken()
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (isNoCodeResponse) {
      console.log('isNoCodeResponse',isNoCodeResponse)
      return response
    }
    if (res.code !== 200) { // 登录失败
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 401 || res.code === 403) {
        // to re-login
        MessageBox.confirm('您已登出，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else { // 请求成功 返回res
      return !isReturnNativeResponse ? res : response
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
