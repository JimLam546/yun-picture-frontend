import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController.ts'
import accessEnum from '@/model/accessEnum.ts'

export const useLoginUserStore = defineStore('loginUser', () => {
  // 未登录时默认状态
  const loginUser = ref<any>({
    username: '未登录',
    userRole: accessEnum.NOT_LOGIN
  })

  async function fetchUserLogin() {
    const res: any = await getLoginUserUsingGet()
    if (res.code === 0 && res.data) {
      loginUser.value = res.data
    }
    // 请求失败则是原来初始化的值
  }

  // 设置登录用户的信息
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }
  return { loginUser, fetchUserLogin, setLoginUser }
})
