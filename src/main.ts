import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

app.use(createVuetify({
    components,
    directives,
}))

app.mount('#app')
