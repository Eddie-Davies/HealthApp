import { createRouter, createWebHistory } from 'vue-router';
import Landing from './pages/service/Landing.vue';
import Login from './pages/service/Login.vue';
import Signup from './pages/service/Signup.vue';

import Home from './pages/app/Home.vue';
import Goals from './pages/app/goals/Goals.vue';
import Groups from './pages/app/Groups.vue';
import Exercise from './pages/app/exercise/Exercise.vue';
import ExerciseTrack from './pages/app/exercise/ExerciseTrack.vue';
import Diet from './pages/app/Diet.vue';



const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "goals", component: Goals, meta: { title: "My Goals" } },
      
      { path: "groups", component: Groups, meta: { title: "My Groups" } },

      { path: "exercise", name: 'Exercise', component: Exercise, meta: { title: "My Exercise" } },


      { path: "diet", component: Diet, meta: { title: "My Diet" } },
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;
