import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WelcomeView from '../views/WelcomeView.vue';
import axios from 'axios';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
  )}`;

  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
