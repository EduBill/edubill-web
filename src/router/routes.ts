import { RouteRecordRaw } from 'vue-router';

// Layouts
import Blank from '@/views/layouts/Blank.vue';
import Layout from '@/views/layouts/Layout.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/:catchAll(.*)',
        component: Blank,
        children: [
          {
            path: '/:catchAll(.*)',
            component: () => import('@/views/errors/Error.vue'),
            name: 'Exception',
            meta: { title: 'Exception' },
          },
        ],
      },
    ],
  },
];

export default routes;
