import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;
