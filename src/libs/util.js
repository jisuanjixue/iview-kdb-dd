import axios from 'axios'
import Vue from 'vue'
import env from '../config/env'

let util = {};
Vue.config.productionTip = false
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
}
// 编辑器URL
util.UEDITORURL = '/static/ueditor1_4_3_3/'
const ajaxUrl = env === 'development' ?
    'http://mock.eolinker.com/sGMj1Zbaa82a6288472b83277d2ef960db78cb31d33681f?uri=':
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com'

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
Vue.prototype.$http = util.ajax

export default util;