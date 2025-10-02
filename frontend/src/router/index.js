import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/guest/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/guest/RegisterView.vue'),
    },
    {
      path: '/task-manager',
      name: 'task-manager',
      component: () => import('@/views/auth/TaskManager.vue'),
    },
    // Add a default redirect
    {
      path: '/',
      redirect: '/login'
    }
  ],
})

export default router