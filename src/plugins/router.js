import Vue from 'vue';
import VueRouter from 'vue-router';

import components from '@/components';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: components.MainPage,
  },
  {
    path: '/course/:id',
    component: components.CorsePage,
    props: true
  },
  {
    path: '/login',
    component: components.LoginPage
  },
  {
    path: '/admin/login',
    component: components.AdminLoginPage
  },
  {
    path: '/register',
    component: components.RegisterPage
  },
  {
    path: '/course/:id/lesson/:lessons_id/theory',
    component: components.CourseTheory,
    props: true
  },
  {
    path: '/course/:id/lesson/:lessons_id/practice',
    component: components.CoursePractice,
    props: true
  },
  {
    path: '/courses',
    component: components.AuthorCourses,
    props: true
  },
  {
    path: '/certificates',
    component: components.UserCertificates
  },
  {
    path: '/certificate/:id',
    component: components.UserCertificate,
    props: true
  },
  {
    path: '/admin/users',
    component: components.AdminUsers
  },
  {
    path: '/admin/courses',
    component: components.AdminCourses
  },
  {
    path: '*',
    component: components.NotFoundPage
  }
];

const options = {
  routes,
  mode: 'history',
};

export default new VueRouter(options);
