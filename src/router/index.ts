import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userLogin from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import UserManage from '@/views/manage/UserManage.vue'
import accessEnum from '@/model/accessEnum.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: UserRegisterView
    },
    {
      path: '/manage/user',
      name: 'manageUser',
      meta: {
        access: accessEnum.ADMIN,
      },
      component: UserManage
    }
  ]
})

export default router
