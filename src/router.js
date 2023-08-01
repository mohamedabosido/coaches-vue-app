import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import { i18n } from '../src/main.js';
import store from './store/index.js';
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
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en';
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && localStorage.getItem('token')) {
    next('/coaches');
  } else return next();
});
export default router;
