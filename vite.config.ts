import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/a-message-from-the-stars/',
  plugins: [
    vue(),
    vuetify({autoImport: true}),
    VueI18nPlugin({}),
  ],
})
