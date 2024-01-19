import '@/assets/scss/styles.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import plugin from './plugins';
import store from './stores';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(plugin);
app.mount('#app');
