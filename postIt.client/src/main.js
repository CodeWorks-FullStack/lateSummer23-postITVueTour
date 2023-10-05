import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import './utils/SocketProvider.js'
// import vue3-tour library
import Vue3Tour from 'vue3-tour'
// import vue3-tour css
import 'vue3-tour/dist/vue3-tour.css'


const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  // NOTE make sure to add this before we mount the Vue application 
  // NOTE this brings in the vue3 tour components into our application
  .use(Vue3Tour)
  .mount('#app')
