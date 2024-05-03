import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlusIcon from './plugins/elementPlusIcon'
import installIcons from '@/plugins/icons'
import i18n from '@/local'
import installFilter from '@/filters'
import installDirective from '@/directives'
import './permission'
import '@/styles/index.scss'

const _ = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ {
  constructor(callback) {
    callback = debounce(callback, 20)
    super(callback)
  }
}

const debounce = (callback, delay) => {
  let tid
  return function () {
    const ctx = self
    tid && clearTimeout(tid)
    tid = setTimeout(() => {
      callback.apply(ctx, arguments)
    }, delay)
  }
}

const app = createApp(App)
installElementPlusIcon(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
