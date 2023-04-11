import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Overview from '../views/Overview.vue';
import VolcanoViewLayout from '@/views/VolcanoViewLayout/index.vue';
import VolcanoView from '@/views/VolcanoViewLayout/VolcanoView.vue';
import LearnMore from '@/views/LearnMore/index.vue';
import ContentView from '../views/LearnMore/ContentView.vue';
import ArticleViews from '../views/LearnMore/ArticleViews.vue';

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
  {
    path: '/LearnMore',
    name: 'LearnMore',
    component: LearnMore,
    meta: {
      index: 3,
      transitionName: '',
    },
    children: [
      {
        path: '',
        name: 'Content',
        component: ContentView,
        meta: {
          index: 4,
          transitionName: '',
        },
      },
      {
        path: '/Article',
        name: 'Article',
        component: ArticleViews,
        meta: {
          index: 5,
          transitionName: '',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
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
