import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import router from './router'
// @ts-ignore
import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')

