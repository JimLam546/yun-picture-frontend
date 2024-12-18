<template>
  <div id="globalHeader">
    <a-row :wrap='false'>
      <a-col flex="180px">
        <RouterLink to="/">
          <div class="title-bar">
            <img alt="logo" class="logo" src="../assets/favicon.ico" style="height: 48px" />
            <div class="title">Jim云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" :items="items" mode="horizontal" @click='doMenuClick' />
      </a-col>
      <a-col flex='100px'>
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.username ?? '无名字' }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from "vue-router";
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { helloUsingGet } from '../../servers/api/basicController.ts'
import { helloUsingPost, userUsingGet } from '@/api/basicController.ts'

const current = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://gitee.com/jim-lam', target: '_blank' }, '代码仓库'),
    title: '代码仓库',
  },
])
const router = useRouter();
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  });
};
// 监听路由的变化，更新当前选中的菜单高亮（否则刷新后高亮小消失）
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})
const loginUserStore = useLoginUserStore();
loginUserStore.fetchUserLogin()
console.log(userUsingGet())
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
</style>

