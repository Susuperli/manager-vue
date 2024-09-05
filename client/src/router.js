import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/login/index.vue'
import Register from '@/pages/register/index.vue'

import Layout from '@/layout/index.vue'

import Home from '@/pages/home/index.vue'
import AI from '@/pages/ai/index.vue'
import Test from '@/pages/test/index.vue'

import ClockIn from '@/pages/clockIn/index.vue'

export const MAIN_NAME = 'main'

export const homeRouter = [{ path: '/home', name: 'home', component: Home, title: '首页' }]
export const menuRouter = [
  { path: '/ai', name: 'ai', component: AI, title: 'AI' },
  { path: '/test', name: 'test', component: Test, title: '测试' },
  { path: '/clock-in-pc', name: 'clockInPc', component: ClockIn, title: '打卡' }
]

export const mainRouter = [
  {
    path: '/',
    component: Layout,
    title: '首页',
    children: [...homeRouter, ...menuRouter]
  },
  { path: '/login', name: 'login', component: Login, title: '登录' },
  { path: '/register', name: 'register', component: Register, title: '注册' },
  { path: '/clock-in', name: 'clockIn', component: ClockIn, title: '打卡' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: mainRouter
})

export default router
