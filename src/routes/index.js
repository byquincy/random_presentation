import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView';

const routes = [
  {
    path: '/',
    component: MainView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});