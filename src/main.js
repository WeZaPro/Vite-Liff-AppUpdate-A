import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createGtm } from '@gtm-support/vue-gtm'

createApp(App)
  .use(
    createGtm({
      id: 'GTM-5Q53KCQ6', // GTM ID
    })
  )
  .use(router)
  .mount('#app')
