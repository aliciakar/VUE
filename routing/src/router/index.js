import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/my',
      name: 'my view',
      component: () => import('../views/MyView.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NoShow.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/user',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/user/:id',
      name: 'User view',
      component: () => import('../views/SingleUserView.vue'),
      props: true
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title ?? 'Default Title'
})

export default router
