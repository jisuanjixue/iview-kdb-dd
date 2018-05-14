import Vue from 'vue'
import iView from 'iview'
import router from './router'
import store from './store'
import Util from './libs/util'
import App from './app.vue'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})