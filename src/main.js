import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

import './assets/css/global.css'
import './assets/font_3532176_54g5m8jgbtu/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://10.50.7.15:8081/api/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
const app = createApp(App)
installElementPlus(app)
app.use(router).mount('#app')
