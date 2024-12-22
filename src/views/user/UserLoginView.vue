<template>
  <div id='UserLogin'>
    <div class='title'>智能云图库-用户登录</div>
    <div class='desc'>一款智能协同类的项目</div>
    <a-form
      :model='loginFormState'
      autocomplete='off'
      name='basic'
      @finish='onFinish'
      @finishFailed='onFinishFailed'
    >
      <a-form-item
        :rules="[{ required: true, message: '请输入账号!' },
        {min: 8, message: '账号长度不能小于8位'}]"
        name='userAccount'
      >
        <a-input v-model:value='loginFormState.userAccount' placeholder='请输入账号' />
      </a-form-item>

      <a-form-item
        :rules="[{ required: true, message: '请输入密码!' },{min: 8, message: '密码长度不能小于8位'}]"
        name='userPassword'
      >
        <a-input-password v-model:value='loginFormState.userPassword' placeholder='请输入密码' />
      </a-form-item>

      <div class='tips'>没有账号？
        <RouterLink to='/user/register'>
        去注册
        </RouterLink>
      </div>

      <a-form-item>
        <a-button html-type='submit' style='width: 100%' type='primary'>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLoginUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const userLoginStore = useLoginUserStore()
const key = 'updatable'
const router = useRouter()

interface LoginFormState {
  userAccount: string;
  userPassword: string;
}

const loginFormState = reactive<LoginFormState>({
  userAccount: '',
  userPassword: ''
})
// 点击登录后触发的回调事件
const onFinish = async (values: any) => {
  await handlerLogin()
}
const handlerLogin = async () => {
  message.loading({ content: '登录中...', key, duration: 0 })
  const res = await userLoginUsingPost({ ...loginFormState })
  if (res.code === 0 && res.data) {
    // 登录成功
    message.success({ content: '登录成功', key, duration: 2 })
    await userLoginStore.fetchUserLogin()
    await router.push({
      path: '/',
      replace: true
    })
    return
  }
  message.error(res.description)
}
const onFinishFailed = (errorInfo: any) => {
  message.warn('请按要求填写账号密码!')
}
</script>

<style scoped>
#UserLogin {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}

.desc {
  text-align: center;
  color: #bbb;
  margin-bottom: 16px;
  font-size: 16px;
}

.tips {
  color: #bbb;
  margin-bottom: 16px;
  text-align: right;
}
</style>
