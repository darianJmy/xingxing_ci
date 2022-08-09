import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView'
import HomeView from '../components/HomeView'
import WelcomeView from '../components/WelcomeView'
import UploadView from '../components/Upload/UploadView'
import ServiceManage from '../components/ServiceGov/ServiceManageView'
import ProjectManage from '../components/ServiceGov/ProjectManageView'
import SitSettingView from '../components/ServiceGov/SitSettingView'
import SbxSettingView from '../components/ServiceGov/SbxSettingView'

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
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: WelcomeView },
      { path: '/upload', component: UploadView },
      { path: '/serviceManage', component: ServiceManage },
      { path: '/projectManage', component: ProjectManage },
      { path: '/sitSetting', component: SitSettingView },
      { path: '/sbxSetting', component: SbxSettingView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
