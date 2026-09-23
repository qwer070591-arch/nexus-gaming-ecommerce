import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css' // 引入全域 Reset 樣式

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')