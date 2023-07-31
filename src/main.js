import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueI18n from 'vue-i18n'
import messages from './lang';

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);

app.use(router);
app.use(VueI18n);
app.mount('#app');
