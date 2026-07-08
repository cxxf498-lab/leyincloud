import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import router from './router/index.js'
import AppIcons from './components/AppIcons.vue'

const app = createApp(App)

app.component('AppIcons', AppIcons)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.mount('#app')
