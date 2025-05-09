import { createRouter, createWebHistory } from 'vue-router';
import Landing from './pages/service/Landing.vue';
import Login from './pages/service/Login.vue';
import Signup from './pages/service/Signup.vue';
import ForgotPassword from './pages/service/ForgotPassword.vue';
import NewPassword  from './pages/service/NewPassword.vue';

import Home from './pages/app/Home.vue';
import Goals from './pages/app/goals/Goals.vue';
import Profile from './pages/app/profile/Profile.vue';
import Groups from './pages/app/groups/Groups.vue';
import Exercise from './pages/app/exercise/Exercise.vue';
import ExerciseTrack from './pages/app/exercise/ExerciseTrack.vue'
import EditActivityTypes from './pages/app/exercise/EditActivityTypes.vue';

import Diet from './pages/app/diet/Diet.vue';
import EditMeal from './pages/app/diet/EditMeal.vue'
import SelectItem from './pages/app/diet/SelectItem.vue'

const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: '/forgotpassword', component: ForgotPassword },
  { path: '/newpassword', component: NewPassword },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "goals", component: Goals, meta: {title: 'My Goals'}},
      { path: "groups", component: Groups, meta: {title: 'My Groups'} },
      { path: "profile", component: Profile, meta: {title: 'My Profile'} },
      { path: "exercise", component: Exercise, meta: {title: 'My Exercise'}},
      { path: '/home/exercise/new', component: ExerciseTrack },
      { path: '/home/exercise/:id', component: ExerciseTrack},
      { path: '/home/exercise/:exerciseId/editActivityType', component: EditActivityTypes},
      { path: "diet", component: Diet, meta: {title: 'My Diet'}},
      { path: '/home/diet/new', component: EditMeal },
      { path: '/home/diet/:id', component: EditMeal},
      { path: '/home/diet/:mealId/select/:type', component: SelectItem, props: true }
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(), // history mode stops the # prefixing the urls
  routes
});

export default router;