import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {createI18n } from 'vue-i18n'
import messages from './lang';

//Global components
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

export const i18n =  createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);

app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');