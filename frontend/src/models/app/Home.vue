<template>
  <Avatar initials="AL" />
  <PageHeader :title="$route.meta.title" />
  <router-view></router-view>
  <Navbar />
</template>

<script>
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar.vue';
import Avatar from '../../components/avatar/Avatar.vue';
import PageHeader from '../../components/header/PageHeader.vue'

export default {
  name: 'Home',
  components: {
      
      Avatar,
      PageHeader,
      Navbar
    },

  data() {
    return {
      user: null
    };
  },
  methods: {
    handleClick() {
      localStorage.removeItem('token'); // remove token when logged out
      this.user = null; // Reset user state
      this.$router.push('/login');
    }
  },

  async created() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login...');
        // this.$router.push('/login'); // Redirect if no token
        return;
      }

      const response = await axios.get('user');

      console.log('✅ User received:', response.data);
      this.user = response.data;
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      // this.$router.push('/login'); // Redirect on error
    }
  }
}
</script>


  <!-- <div v-if="!user" class="justify-center flex my-10">
    <router-link to="/login" class="btn btn-primary mr-10">Login</router-link>
    <router-link to="/signup" class="btn btn-secondary">Signup</router-link>
  </div>
  <div v-if="user" class="justify-center flex my-10">
    <a href="javascript:void(0)" @click="handleClick" class="btn btn-warning mr-10">Log Out</a>
  </div>
  <div>
    <h1 class="text-3xl font-bold">Welcome to the Home Page</h1>
    <p v-if="user">Hi, {{ user.first_name }} {{ user.last_name }}.<br> You have successfully logged into your account with
      the email {{ user.email }}.</p>
    <p v-if="!user">You aren't logged in.</p>
  </div> -->