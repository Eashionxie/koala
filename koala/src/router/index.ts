import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/dashboard/index.vue'),
    },
    {
      path: '/yima',
      name: 'yima',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/yima/index.vue'),
      meta: { title: '姨妈助手' }
    },
    {
      path: '/live',
      name: 'live',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/live/index.vue'),
      meta: { title: '直播' }
    }
  ]
})

export default router
