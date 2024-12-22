import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController.ts'

export const useLoginUserStore = defineStore('loginUser', () => {
  // 未登录时默认状态
  const loginUser = ref<any>({
    username: '未登录'
  })

  async function fetchUserLogin() {
    const res: any = await getLoginUserUsingGet()
    if (res.code === 0 && res.data) {
      loginUser.value = res.data;
    }
    // setTimeout(() => {
    //   loginUser.value = {username: "jim", id: 1}
    // }, 3000)
  }

  // 设置登录用户的信息
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  return { loginUser, fetchUserLogin, setLoginUser }
})
