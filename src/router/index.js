import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/RegisterForm.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/LoginForm.vue'),
  },
  {
    path: '/client',
    name: 'Client',
    component: () => import('../components/ClientForm.vue'),
  },
  {
    path: '/cards',
    name: 'Cards',
    component: () => import('../components/Cards.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../components/Tabla.vue'),

    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
