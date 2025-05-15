<template>
  <div id='UserPersonalCenter'>
    <div class='title'>个人信息修改</div>
    <a-form
      :label-col='labelCol'
      :model='currentUser'
      :rules='rules'
      :wrapper-col='wrapperCol'
      class='personalForm'
      layout='horizontal'
      style='max-width: 400px'
      @finish='submitUpdate'
    >
      <a-form-item label='用户账号'>
        <a-input :value='currentUser.userAccount' disabled />
      </a-form-item>
      <a-form-item label='用户昵称' name='username'>
        <a-input v-model:value='currentUser.username' />
      </a-form-item>
      <a-form-item label='邮箱' name='email'>
        <a-input v-model:value='currentUser.email' />
      </a-form-item>
      <a-form-item label='手机号' name='phone'>
        <a-input v-model:value='currentUser.phone' />
      </a-form-item>
      <a-form-item label='重置密码'>
        <a-input v-model:value='currentUser.userPassword' />
      </a-form-item>
      <a-form-item label='头像上传'>
        <a-upload action='/upload.do' list-type='picture-card'>
          <div>
            <PlusOutlined />
            <div style='margin-top: 8px'>暂不实现</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col='{ span: 14, offset: 4 }'>
        <a-button html-type='submit' style='width: 80%' type='primary'>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts' setup>
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { updateUserUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import User = API.User

const labelCol = { style: { width: '100px' } }
const wrapperCol = { span: 14 }
const loginUserStore = useLoginUserStore()
const currentUser: User = reactive<User>({ ...loginUserStore.loginUser })
const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '不能为空', trigger: 'change' }
  ],
  email: [
    { required: true, message: '不能为空', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '不能为空', trigger: 'change' }
  ]
}
const submitUpdate = async () => {
  const res: any = await updateUserUsingPost(<API.UserUpdateRequest>{ ...currentUser })
  if (res.code === 0) {
    await loginUserStore.fetchUserLogin()
    message.success('个人信息修改成功')
  } else {
    message.error('信息修改失败,' + res.description)
  }
}
</script>

<style scoped>
.personalForm {
  margin: 0 auto;
}

.title {
  color: black;
  font-size: 18px;
  margin-bottom: 32px;
  margin-left: 16px;
}
</style>
