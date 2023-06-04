import './assets/main.css'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import NcdotData from './components/NcdotData.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueGoogleMaps, {
  load: {
    key: `VITE_MAP_API`
  }
})
app.mount('#app')
