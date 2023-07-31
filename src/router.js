import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import { i18n } from '../src/main.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      name: 'coaches',
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          props: true,
        }, // /coaches/c1/contact
      ],
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en';
  return next();
});
export default router;
