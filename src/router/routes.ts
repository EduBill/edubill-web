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
        path: '/payManage',
        component: () =>
          import('@/views/pages/paymentManage/PagePayManagement.vue'),
        name: 'PayManage',
        meta: { title: '회원가입' },
      },
      {
        path: '/payManage/payDetail',
        component: () =>
          import('@/views/pages/paymentManage/PaymentListDetailPage.vue'),
        name: 'PayDetail',
        meta: { title: '납부내역 상세' },
      },
      {
        path: '/payManage/unknownList',
        component: () =>
          import('@/views/pages/paymentManage/UnknownPaymentListPage.vue'),
        name: 'unknownList',
        meta: { title: '미확인내역' },
      },
      {
        path: '/payManage/manualInput',
        component: () =>
          import('@/views/pages/paymentManage/manualInputPage.vue'),
        name: 'manualInput',
        meta: { title: '수동입력' },
      },
      {
        path: '/studentManage',
        component: () =>
          import('@/views/pages/studentManage/CourseManagePage.vue'),
        name: 'studentManage',
        meta: { title: '수강관리' },
      },
      {
        path: '/studentManage/addNewStudent',
        component: () =>
          import('@/views/pages/studentManage/StudentManagePage.vue'),
        name: 'addNewStudent',
        meta: { title: '수강관리' },
      },
      {
        path: '/studentManage/classDetail',
        component: () =>
          import('@/views/pages/studentManage/ClassDetailPage.vue'),
        name: 'classDetail',
        meta: { title: '상세반정보' },
      },
      {
        path: '/studentManage/newClass',
        component: () =>
          import('@/views/pages/studentManage/AddNewClassPage.vue'),
        name: 'newClass',
        meta: { title: '새로운반추가' },
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
