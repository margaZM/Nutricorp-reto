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
    path: '/shopping/client',
    name: 'Client',
    component: () => import('../views/Client.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/wrong-password',
    name: 'Modal-wrong',
    component: () => import('../components/ModalWrongPassword.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Modal-forgot',
    component: () => import('../components/ModalForgotPassword.vue'),
  },
  {
    path: '/register-success',
    name: 'Modal-register',
    component: () => import('../components/ModalRegister.vue'),
  },
  {
    path: '/ss',
    name: 'Modal-register',
    component: () => import('../components/ModalOrderCompleted.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router