import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/stores/views/guest/LoginView.vue'),
      
    },

    {
      path: '/',
      name: 'TaskManager',
      component: () => import('@/stores/views/auth/TaskManager.vue'),
      
    }
  ],
})

export default router
