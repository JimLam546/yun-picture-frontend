import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userLogin from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import UserManage from '@/views/manage/UserManage.vue'
import accessEnum from '@/model/accessEnum.ts'
import UserPersonalCenter from '@/views/user/UserPersonalCenter.vue'
import ImageGalleryView from '@/views/ImageGalleryView.vue'
import ImageDetailView from '@/views/ImageDetailView.vue'
import UploadImageView from '@/views/UploadImageView.vue'

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
      component: userLogin,
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: UserRegisterView,
    },
    {
      path: '/manage/user',
      name: 'manageUser',
      meta: {
        access: accessEnum.ADMIN,
      },
      component: UserManage,
    },
    {
      path: '/user/personal',
      name: 'personalCenter',
      component: UserPersonalCenter,
    },
    {
      path: '/gallery',
      name: 'imageGallery',
      component: ImageGalleryView,
    },
    {
      path: '/image/:id',
      name: 'imageDetail',
      component: ImageDetailView,
    },
    {
      path: '/upload',
      name: 'uploadImage',
      component: UploadImageView,
    },
  ],
})

export default router
