import './assets/main.css'
import '@oruga-ui/theme-oruga/dist/scss/oruga-full.scss';

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import Oruga from '@oruga-ui/oruga-next'

const app = createApp(App)

app.use(router)
app.use(Oruga)

app.mount('#app')