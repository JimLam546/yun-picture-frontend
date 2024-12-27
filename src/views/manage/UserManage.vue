<template>
  <div id='UserManage'>
    <div class='searchForm'>
      <a-form
        :model='searchParam'
        autocomplete='off'
        layout='inline'
        name='horizontal_login'
        @click='changePage'
      >
        <a-form-item label='用户账号'>
          <a-input v-model:value='searchParam.userAccount' placeholder='请输入用户账号' allow-clear/>
        </a-form-item>

        <a-form-item label='用户昵称'>
          <a-input v-model:value='searchParam.username' placeholder='请输入用户昵称' allow-clear/>
        </a-form-item>

        <a-form-item>
          <a-button html-type='submit' type='primary' @click='search'>搜索</a-button>
        </a-form-item>
      </a-form>
    </div>

    <a-table
      :columns='columns'
      :data-source='userData'
      :pagination="pagination"
      @change='doTableChange'
      :row-key='record => record.id'
      :loading='loading'
      :scroll='{ x: 1400}'>
      <template #bodyCell='{ column, record }'>
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src='record.avatarUrl' style='max-width: 50px' />
        </template>
        <template v-if="column.dataIndex === 'gender'">
          <div v-if='record.gender === 1'>男</div>
          <div v-if='record.gender === 0'>女</div>
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <a-tag v-if="record.userRole === 'user'" color='blue'>普通用户</a-tag>
          <a-tag v-if="record.userRole === 'admin'" color='green'>管理员</a-tag>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button danger size='small' @click='deleteUser(record.id)'>删除</a-button>
        </template>
      </template>
    </a-table>
  </div>

  <!--删除确认弹出框-->
  <div>
    <a-modal v-model:open='open' cancel-text='取消' ok-text='确定' title='警告' @ok='handleOk'>
      <p>确定该删除用户吗?</p>
    </a-modal>
  </div>
</template>

<script lang='ts' setup>
import type { TableColumnsType } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { deleteUserUsingPost, userListByPageUsingPost } from '@/api/userController.ts'
import { computed, onMounted, reactive, ref } from 'vue'
import UserQueryRequest = API.UserQueryRequest
import UserVO = API.UserVO

const open = ref<boolean>(false)
const columns: TableColumnsType = [
  { title: 'id', dataIndex: 'id', key: 'name' },
  { title: '用户账号', dataIndex: 'userAccount', key: 'age' },
  { title: '用户昵称', dataIndex: 'username', key: '1', width: 150 },
  { title: '头像', dataIndex: 'avatarUrl', key: '2', width: 150 },
  { title: '性别', dataIndex: 'gender', key: '3', width: 150 },
  { title: '手机号', dataIndex: 'phone', key: '4', width: 150 },
  { title: '邮箱', dataIndex: 'email', key: '5' },
  { title: '角色', dataIndex: 'userRole', key: '6' },
  { title: '操作', dataIndex: 'operation', key: 'operation' }
]
const deleteUserId = ref<number>(0)
const total = ref<number>()
const searchParam = reactive<UserQueryRequest>({
  current: 1,
  pageSize: 10,
  userAccount: '',
  username: ''
})
const pagination = computed(() => ({
  pageNum: searchParam.current,
  total: total.value,
  pageSize: searchParam.pageSize,
  showSizeChanger: true,
  showTotal: () => `共${total.value}条`,
}))
const loading = ref(false)
const changePage = async () => {
  const res: any = await userListByPageUsingPost({ ...searchParam })
  if (res.code === 0) {
    userData.value = res.data.records
    total.value = parseInt(res.data.total)
    searchParam.current = res.data.pages
  } else {
    message.error('获取数据失败')
  }
  loading.value = false
}
const search = () => {
  searchParam.current = 1
  changePage()
}
const doTableChange = (page: any) => {
  loading.value = true
  searchParam.current = page.current
  searchParam.pageSize = page.pageSize
  changePage()
}
const userData = ref<UserVO[]>([])
const getUserList = async () => {
  const res: any = await userListByPageUsingPost({ ...searchParam })
  if (res.code === 0) {
    userData.value = res.data.records
    total.value = parseInt(res.data.total)
  } else {
    message.error('获取数据失败')
  }
  loading.value = false
}
const handleOk = async () => {
  const res: any = await deleteUserUsingPost({ id: deleteUserId.value })
  if (res.code === 0) {
    message.success('删除成功')
    await getUserList()
  } else {
    message.error('获取数据失败')
  }
  open.value = false
}
const deleteUser = async (id: number) => {
  deleteUserId.value = id
  open.value = true
}
onMounted(() => {
  loading.value = true
  getUserList()
})
</script>

<style scoped>
#UserManage {
}

.searchForm {
  margin-bottom: 20px
}
</style>
