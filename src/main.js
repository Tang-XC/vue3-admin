import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installElementPlusIcon from './plugins/elementPlusIcon'
import installIcons from '@/plugins/icons'
import '@/styles/index.scss'

const app = createApp(App)
installElementPlus(app)
installElementPlusIcon(app)
installIcons(app)
app.use(store).use(router).mount('#app')
