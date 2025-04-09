import { createRouter, createWebHistory } from 'vue-router';
import Landing from './models/service/Landing.vue';
import Login from './models/service/Login.vue';
import Signup from './models/service/Signup.vue';

import Home from './models/app/Home.vue';
import Goals from './models/app/goals/Goals.vue';
import Groups from './models/app/Groups.vue';
import Exercise from './models/app/Exercise.vue';
import Diet from './models/app/Diet.vue';



const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "goals", component: Goals, meta: {title: 'My Goals'}},
      { path: "groups", component: Groups, meta: {title: 'My Groups'} },
      { path: "exercise", component: Exercise, meta: {title: 'My Exercise'}},
      { path: "diet", component: Diet, meta: {title: 'My Diet'}},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;
