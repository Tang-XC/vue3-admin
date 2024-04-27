import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlusIcon from './plugins/elementPlusIcon'
import installIcons from '@/plugins/icons'
import i18n from '@/local'
import './permission'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
installElementPlusIcon(app)
installIcons(app)
app.use(store).use(router).use(i18n).mount('#app')
