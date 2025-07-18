import { createApp } from 'vue'
import './style.css'
import router from './router/router';
import VFragment from './components/EmptyWrapper/VFragment.vue';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons : {
    defaultSet : 'mdi'
  }
})

createApp(App)
    .use(router)
    .use(vuetify)
    .component('v-fragment', VFragment)
    .mount('#app');
