import { createRouter, createWebHistory } from 'vue-router';
import Landing from './components/Landing.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Home from './components/Home.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import newPassword  from './components/newPassword.vue';


const routes = [
  { path: '/', component: Landing },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/home', component: Home },
  { path: '/forgotpassword', component: ForgotPassword },
  {path: '/newpassword', component: newPassword}

];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;
