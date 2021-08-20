import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from "../components/Register";
import Point from "../components/point"
import Appointment from "../components/appointment"
import Code from "../components/code"
import Inoculation from "../components/inoculation"
import Dashboard from "../components/dashboard/admin/index"
import Index from "../components/index"
import Vaccine from "../components/vaccine"
//配置对路由参数进行加密和解密
import { stringifyQuery, parseQuery } from "../utils/query";

Vue.use(Router)


export default new Router({
  mode: 'history',
  stringifyQuery: stringifyQuery,
  parseQuery: parseQuery,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/point',
          name: 'point',
          component: Point,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/vaccine',
          name: 'Vaccine',
          component: Vaccine,
          meta: {
            requireAuth: true
          }
        },
      ]
    },

    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,

    },
    {
      path: '/appointment',
      name: 'appointment',
      component: Appointment,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/inoculation',
      name: 'inoculation',
      component: Inoculation,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/code',
      name: 'code',
      component: Code,

    },

  ]
})
