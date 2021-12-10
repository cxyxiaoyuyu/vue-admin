import Vue from 'vue'
import VueRouter from 'vue-router'

// const Login = () => import(/* webpackChunkName: "login_main_home" */ '../views/Login.vue')
const Main = () => import(/* webpackChunkName: "login_main_home" */ '../views/Main.vue')
const Home = () => import(/* webpackChunkName: "login_main_home" */ '../views/home/Home.vue')

const User = () => import (/* webpackChunkName: "usr_rights_role" */ '../views/user/User.vue')
const Rights = () => import (/* webpackChunkName: "usr_rights_role" */ '../views/rights/Rights.vue')
const Role = () => import (/* webpackChunkName: "usr_rights_role" */ '../views/rights/Role.vue')

const Categories = () => import (/* webpackChunkName: "cate_param" */ '../views/mall/Categories.vue')
const Params = () => import (/* webpackChunkName: "cate_param" */ '../views/mall/Params.vue')

const GoodsList = () => import (/* webpackChunkName: "goods_add" */ '../views/mall/GoodsList.vue')
const AddGoods = () => import (/* webpackChunkName: "goods_add" */ '../views/mall/AddGoods.vue')

const Order = () => import (/* webpackChunkName: "order_report" */ '../views/order/Order.vue')
const Report = () => import (/* webpackChunkName: "order_report" */ '../views/report/Report.vue')

// import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
// import Home from '../views/home/Home.vue'
// import User from '../views/user/User.vue'
// import Rights from '../views/rights/Rights.vue'
// import Role from '../views/rights/Role.vue'
// import Categories from '../views/mall/Categories.vue'
// import Params from '../views/mall/Params.vue'
// import GoodsList from '../views/mall/GoodsList.vue'
// import AddGoods from '../views/mall/AddGoods.vue'
// import Order from '../views/order/Order.vue'
// import Report from '../views/report/Report.vue'

// 解决路由重复
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import(/* webpackChunkName: "login_main_home" */'../views/Login.vue'),
    component: Login
  },
  {
    path: '/home',
    component: Main,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: "users",
        name: "users",
        component: User
      },
      {
        path: 'rights',
        name: 'rights',
        component: Rights      
      },
      {
        path: 'roles',
        name: 'roles',
        component: Role      
      },
      {
        path: 'categories',
        name: 'categories',
        component: Categories
      },
      {
        path: 'params',
        name: 'params',
        component: Params 
      },
      {
        path: 'goods',
        name: 'goods',
        component: GoodsList 
      },
      {
        path: 'goods/add',
        name: 'add-goods',
        component: AddGoods
      },
      {
        path: 'orders',
        name: 'orders',
        component: Order 
      },
      {
        path: 'reports',
        name: 'reports',
        component: Report
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  }
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})

export default router
