import { createRouter, createWebHistory } from 'vue-router';
import Landing from './components/Landing.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Home from './components/Home.vue';

import Goals from './components/Goals.vue';
import Groups from './components/Groups.vue';
import Exercise from './components/Exercise.vue';
import Diet from './components/Diet.vue';



const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "goals", component: Goals },
      { path: "groups", component: Groups },
      { path: "exercise", component: Exercise},
      { path: "diet", component: Diet},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;
