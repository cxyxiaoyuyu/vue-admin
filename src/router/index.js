import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Home from '../views/Main.vue'

// 解决路由重复
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location){
  return originPush.call(this,location).catch(err => err)
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
    component: Login,
  },
  {
    path: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: ()=>import('@/views/main/home.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: ()=>import('@/views/main/Goods.vue')
      },
      {
        path: "users",
        name: "users",
        component: ()=>import('@/views/main/user.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to,form,next)=>{
  if(to.path === '/login'){
    next()
  }
  if(sessionStorage.getItem('token')){
    next()
  }else{
    next('/login')
  }
})

export default router
