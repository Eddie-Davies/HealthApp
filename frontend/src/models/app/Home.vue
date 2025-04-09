<template>
  <div v-cloak>
    <!-- Main content when user data is available -->
    <div v-if="user">
      <Avatar :initials="getIntials()" />
      <PageHeader :title="$route.meta.title" />
      <router-view></router-view>
      <Navbar />
    </div>

    <!-- Loading state while data is being fetched -->
    <div v-else-if="loading" class="flex h-screen">
      <p class="m-auto text-lg">Fetching user data...</p>
    </div>

    <!-- Fallback when there's no user and loading is complete -->
    <div v-else class="flex flex-col items-center justify-center h-screen p-3 space-y-4 bg-base-200">
      <h1
        class="text-4xl font-bold bg-gradient-to-r from-secondary via-primary to-warning inline-block text-transparent bg-clip-text absolute top-4 left-1/2 transform -translate-x-1/2">
        Blossom
      </h1>
      <div class="card bg-base-100 w-100 shadow-2xl">
        <div class="card-body">
          <h2 class="card-title text-center flex justify-center">Please log in or create a new account.</h2>
          <div class="card-actions justify-center">
            <div class="flex mt-5 space-x-4">
              <router-link to="/login" class="btn btn-secondary">
                Login
              </router-link>
              <router-link to="/signup" class="btn btn-primary">
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Blossom title positioned near the top -->


    </div>
  </div>
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
      user: null,
      loading: true // Added loading state
    };
  },
  methods: {
    handleClick() {
      localStorage.removeItem('token'); // Remove token when logged out
      this.user = null; // Reset user state
      this.$router.push('/login');
    },
    getIntials() {
      if (this.user && this.user.first_name && this.user.last_name) {
        const full_name = this.user.first_name + ' ' + this.user.last_name;
        // Take the first letter of each word and return them as initials
        const initials = full_name.split(' ').map(word => word[0].toUpperCase()).join('');
        return initials;
      }
      return 'error'; // Return empty string if user data is not available
    }
  },

  async created() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token was found.');
        return;
      }

      const response = await axios.get('user');

      console.log('✅ User received:', response.data);
      this.user = response.data;
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
    } finally {
      this.loading = false; // Stop loading after data is fetched
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