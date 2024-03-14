import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './style.css'
import './index.css'
import store from './store/store';
import './demos/ipc'

  loadFonts()
  // If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
  // import './demos/node'
  createApp(App)
    .use(store)
    .use(vuetify)
    .mount('#app')
    .$nextTick(() => {
      postMessage({ payload: 'removeLoading' }, '*')
    });
  
