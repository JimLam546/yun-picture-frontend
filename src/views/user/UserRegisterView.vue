<template>
  <div id='UserLogin'>
    <div class='title'>智能云图库-用户注册</div>
    <div class='desc'>一款智能协同类项目</div>
    <a-form
      :model='loginFormState'
      :rules='rules'
      autocomplete='off'
      name='basic'
      @finish='onFinish'
      @finishFailed='onFinishFailed'
    >
      <a-form-item
        name='userAccount'
      >
        <a-input v-model:value='loginFormState.userAccount' placeholder='请输入账号' />
      </a-form-item>

      <a-form-item
        name='username'
      >
        <a-input v-model:value='loginFormState.username' placeholder='请输入昵称' />
      </a-form-item>

      <a-form-item
        name='userPassword'
      >
        <a-input-password v-model:value='loginFormState.userPassword' placeholder='请输入密码' />
      </a-form-item>

      <a-form-item
        name='checkPassword'
      >
        <a-input-password v-model:value='loginFormState.checkPassword' placeholder='请再次输入密码' />
      </a-form-item>

      <div class='tips'>已有账号？
        <RouterLink to='/user/login'>
          去登录
        </RouterLink>
      </div>

      <a-form-item>
        <a-button html-type='submit' style='width: 100%' type='primary'>注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'

const userLoginStore = useLoginUserStore()
const key = 'updatable'
const router = useRouter()

interface LoginFormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
}

const loginFormState = reactive<LoginFormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})
// 点击注册后触发的回调事件
const onFinish = async (values: any) => {
  await handlerLogin()
}
const handlerLogin = async () => {
  message.loading({ content: '注册中...', key, duration: 0 })
  const res = await userRegisterUsingPost({ ...loginFormState })
  if (res.code === 0 && res.data) {
    // 注册成功
    message.success({ content: '注册成功', key, duration: 2 })
    await router.push({
      path: '/user/login',
      replace: true
    })
    return
  }
  message.error({ content: res.description, key, duration: 2 })
}
const onFinishFailed = (errorInfo: any) => {
  message.warn('请按要求填写账号密码!')
}
// 检查两次密码输入是否一致（配合 rules）
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码!')
  } else if (value !== loginFormState.userPassword) {
    return Promise.reject('两次密码输入不一致')
  } else {
    return Promise.resolve()
  }
}
const rules: Record<string, Rule[]> = {
  userAccount: [{ required: true, message: '请输入账号!' }, { min: 8, message: '账号长度不能小于8位' }],
  username: [{ required: true, message: '请输入昵称!' }],
  userPassword: [{ required: true, message: '请输入密码!' }, { min: 8, message: '密码长度不能小于8位' }],
  checkPassword: [{ validator: validatePass, trigger: 'change' }]
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
