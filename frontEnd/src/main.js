import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import Avue from '@smallwei/avue' //Avue框架及样式
import '@smallwei/avue/lib/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import { loadStyle, filterForm } from './utils/util'
//空值过滤器
Vue.prototype.filterForm = filterForm

import * as filters from './filters' // global filters
import basicContainer from './components/basic-container/main'
Vue.component('basicContainer', basicContainer)

Vue.use(Element, {
    size: Cookies.get('size') || 'mini', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'
Vue.use(VXEUtils, XEUtils, {mounts: ['cookie']})
// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


Vue.config.productionTip = false
window.Avue = Avue
Vue.use(Avue)

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})