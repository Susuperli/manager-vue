import './assets/main.css'

import { createApp } from 'vue'
import VConsole from 'vconsole'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router.js'

// 仅在开发环境使用 vConsole
if (process.env.NODE_ENV === 'development') {
  const vConsole = new VConsole()
}

const app = createApp(App)

app.use(router).use(ElementPlus).mount('#app')
