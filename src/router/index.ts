import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routesRecords from './routes';

const routes: Array<RouteRecordRaw> = routesRecords;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition): any {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.hash) {
    if (from && from.name === to.name && from.path === to.path) {
      next(false);
      return;
    }
  }

  next();
});

router.afterEach(async (to) => {});

export default router;
