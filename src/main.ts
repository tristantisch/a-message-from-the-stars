import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createI18n } from 'vue-i18n'

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
});

app.use(createVuetify({
    components,
    directives,
}));
app.use(pinia);
app.use(i18n);

app.mount('#app');
