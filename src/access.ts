import router from '@/router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import accessEnum from '@/model/accessEnum.ts'
import { message } from 'ant-design-vue'

let firstLoadLoginUser = true
router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser
  // 确保刷新后，向后端获取一次用户数据到全局状态管理
  if (firstLoadLoginUser) {
    await loginUserStore.fetchUserLogin()
    loginUser = loginUserStore.loginUser
    firstLoadLoginUser = false
  }
  router.getRoutes().forEach(route => {
    if (to.path === route.path) {
      if (route.meta.access && route.meta.access === accessEnum.ADMIN) {
        if (loginUser.userRole === accessEnum.ADMIN) {
          next()
        } else {
          next(from.fullPath);
          message.error('你没有权限访问')
          return
        }
      } else {
        // 访问页面不需要管理员权限则直接放行
        next()
      }
    }
  })
  // next()
})
