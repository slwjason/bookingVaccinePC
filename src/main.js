// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import common from '../static/js/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {VueJsonp} from 'vue-jsonp'


Vue.config.productionTip = false

// 设置反向代理，前端请求默认发送到 http://localhost:3000
var axios = require('axios')

axios.defaults.baseURL = 'http://192.168.43.102:3000'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
//将公共方法放入原型对象中
Vue.prototype.common = common
Vue.use(ElementUI)
Vue.use(VueJsonp)


//使用钩子函数判断路由是否需要拦截（钩子函数在路由前进行判断
router.beforeEach((to,form,next)=>{
  // 跳转页面的同时加载菜单
  if (to.meta.requireAuth){
    if(store.state.user.name){
      next()
    }else{
      //首先判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）。
      next({
        path:'login',
        // query:{redirect:to.fullPath} // 将目的路由地址存到login的query中（重定向）
      })
    }
  }else{
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
