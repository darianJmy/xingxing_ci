import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView'
import HomeView from '../components/HomeView'
import Upload from '../components/Upload/UploadView'

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
    component: HomeView,
    children: [
      { path: '/upload', component: Upload }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
