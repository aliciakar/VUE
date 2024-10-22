import ForecastView from '@/views/ForecastView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForecastView,
    },
    {
      path: '/locations',
      name: 'Locations',
      component: () => import('../views/LocationsView.vue'),
    },
    {
      path: '/forecast/:location',
      name: 'forecast',
      component: ForecastView,
      props: true,
    },
  ],
})

export default router
