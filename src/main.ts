import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/firebase';
import router from './router';

createApp(App)
    .use(router)
    .mount('#app');
