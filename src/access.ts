import router from '@/router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import accessEnum from '@/model/accessEnum.ts'
import { message } from 'ant-design-vue'

// 通过路由表的 meta 的 access 字段来控制哪些页面只有管理员能访问
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

  // 检查当前路由是否需要管理员权限
  const requiresAdmin = to.matched.some((record) => record.meta.access === accessEnum.ADMIN)

  if (requiresAdmin) {
    // 需要管理员权限
    if (loginUser.userRole === accessEnum.ADMIN) {
      next()
    } else {
      message.error('你没有权限访问')
      next(from.fullPath)
    }
  } else {
    // 不需要管理员权限，直接放行
    next()
  }
})
