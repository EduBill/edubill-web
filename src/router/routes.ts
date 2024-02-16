import { RouteRecordRaw } from 'vue-router';

// Layouts
import Blank from '@/views/layouts/Blank.vue';
import Layout from '@/views/layouts/Layout.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import('@/views/pages/login/PageLogin.vue'),
        name: 'Login',
        meta: { title: '로그인' },
      },
      {
        path: '/home',
        component: () => import('@/views/pages/home/PageHome.vue'),
        name: 'Home',
        meta: { title: '홈', auth: true },
      },
      {
        path: '/signup',
        component: () => import('@/views/pages/login/PageSignUp.vue'),
        name: 'Signup',
        meta: { title: '회원가입' },
      },
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
