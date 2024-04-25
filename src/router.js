import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/home/index.vue'
import Login from '@/pages/login/index.vue'

const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
