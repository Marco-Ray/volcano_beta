import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Overview from '../views/Overview.vue';
import VolcanoViewLayout from '@/views/VolcanoViewLayout/index.vue';
import VolcanoView from '@/views/VolcanoViewLayout/VolcanoView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      transitionName: 'fade',
    },
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
    meta: {
      transitionName: 'fade',
    },
  },
  {
    path: '/volcano/',
    name: 'VolcanoLayout',
    component: VolcanoViewLayout,
    children: [
      {
        path: '/volcano/:type',
        name: 'Volcano',
        component: VolcanoView,
        meta: {
          transitionName: 'fade',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
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
