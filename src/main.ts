import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

// 异步函数
async function asyncRegister() {
    // 异步注册引入
    const createPinia  = (await import('pinia')).createPinia()
    app.use(createPinia)
    const router = (await import('@/router')).default
    app.use(router)
    app.mount('#app')
}
asyncRegister()
