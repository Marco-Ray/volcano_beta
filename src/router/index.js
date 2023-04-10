import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Overview from '../views/Overview.vue';
import VolcanoViewLayout from '@/views/VolcanoViewLayout/index.vue';
import VolcanoView from '@/views/VolcanoViewLayout/VolcanoView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/Volcano/',
    name: 'VolcanoLayout',
    component: VolcanoViewLayout,
    children: [
      {
        path: '/Volcano/:type',
        name: 'Volcano',
        component: VolcanoView,
        meta: {
          index: 2,
          transitionName: '',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.hash) {
      if (to === from) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            });
          }, 600);
        });
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
          });
        }, 600);
      });
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: 'smooth' });
      }, 600);
    });
  },
});

export default router;
