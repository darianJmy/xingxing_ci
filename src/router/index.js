import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView'
import HomeView from '../components/HomeView'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
