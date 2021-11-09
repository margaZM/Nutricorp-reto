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
<<<<<<< HEAD
    path: '/categories',
    name: 'Category',
    component: () => import('../components/Category.vue'),
  },
=======
    path: '/balance',
    name: 'Balance',
    component: () => import('../components/AccountBalance.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/about',
    name: 'Client',
    component: () => import('../views/Client.vue'),
  },

>>>>>>> 7faa97cff8ee4412c6a96016f581eff5796e19d4
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
