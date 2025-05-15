<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="180px">
        <RouterLink to="/">
          <div class="title-bar">
            <img alt="logo" class="logo" src="../assets/favicon.ico" style="height: 48px" />
            <div class="title">Jim云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          :items="items"
          mode="horizontal"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="180px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <div class="user-info">
                <a-avatar :size="32" :src="loginUserStore.loginUser.avatarUrl" />
                <span class="username" :title="loginUserStore.loginUser.username || '无名字'">
                  {{ loginUserStore.loginUser.username || '无名字' }}
                </span>
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <a href="/user/personal">个人中心</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1" @click="logout">
                    <LoginOutlined />
                    注销
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button href="/user/login" type="primary">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { HomeOutlined, LoginOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'
import accessEnum from '@/model/accessEnum.ts'

const current = ref<string[]>([])
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/upload',
    icon: () => h(UploadOutlined),
    label: '上传图片',
    title: '上传图片',
  },
  {
    key: '/manage/user',
    label: '用户管理',
    title: '用户管理',
    access: accessEnum.ADMIN,
  },
  // {
  //   key: 'others',
  //   label: h('a', { href: 'https://gitee.com/jim-lam', target: '_blank' }, '代码仓库'),
  //   title: '代码仓库'
  // }
]
const filterMenus = (menus: MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (menu.access === accessEnum.ADMIN) {
      return loginUserStore.loginUser.userRole === accessEnum.ADMIN
    } else {
      return true
    }
  })
}
const items = computed<MenuProps['items']>(() => filterMenus(originItems))
const router = useRouter()
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}
// 监听路由的变化，更新当前选中的菜单高亮（否则刷新后高亮小消失）
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})
const loginUserStore = useLoginUserStore()
loginUserStore.fetchUserLogin()
const logout = async () => {
  const res: any = await userLogoutUsingPost()
  if (res.code === 0) {
    loginUserStore.setLoginUser({ username: '未登录' })
    await router.push({
      path: '/user/login',
      replace: true,
    })
  }
}
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-login-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.user-info {
  display: flex;
  height: 50px;
  width: 120px;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  border-radius: 16px;
  padding: 2px 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.user-info:hover {
  background: #e6e8eb;
}

.username {
  margin-left: 8px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
}
</style>
