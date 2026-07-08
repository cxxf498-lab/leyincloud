import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/survey', name: 'Survey', component: () => import('../views/Survey.vue') },
  { path: '/result', name: 'Result', component: () => import('../views/Result.vue') },
  { path: '/history', name: 'History', component: () => import('../views/History.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
