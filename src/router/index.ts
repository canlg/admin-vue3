import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {useUserInfoStore} from '@/stores/userinfo.store'

const userInfoStore = useUserInfoStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home/admin-home'
    },
    {
      path: '/home',
      name:'home',
      component: HomeView,
      // 路由懒加载示范
      // component : ()=> import("../views/HomeView.vue")
      children:[
        {
          path:'admin-home',
          name:'admin-home',
          component:()=>import('@/components/home/AdminHome.vue')
        },{
          path:'users',
          name:'users',
          component:()=>import('@/components/users/UserManagement.vue')
        },{
          path:'goods',
          name:'goods',
          component:()=>import('@/components/goods/GoodsManagement.vue')
        }
      ]
    },
     {
      path: '/login',
      name:'login',
      // 不需要拦截的页面
      meta:{
        noAuth : true
      },
      // 路由懒加载
      component : ()=> import('@/views/LoginView.vue')
    },
    

  ]
})
// 路由前置守卫
router.beforeEach((to, from , next) => {
  if(to.meta.noAuth || userInfoStore.authFormLocal()){
    next()
  }else{
    router.push('/login')
  }
})
export default router
