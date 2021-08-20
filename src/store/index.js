import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //公共变量
    state:{
        user:{
            name: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
            id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
            address: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).address,
        },

    },

    //公共方法
    mutations:{
        // 登录之后将user对象写入localStorage
        login(state,user){
            state.user = user
            window.localStorage.setItem('user',JSON.stringify(user));
        },
        logout (state) {
            window.localStorage.removeItem('user')
        },

    },

})
