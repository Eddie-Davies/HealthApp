import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './axios'

import router from './router'

createApp(App).use(router).mount('#app')