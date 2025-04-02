<template>
  <div class="min-h-screen bg-white text-neutral">
    <!-- "Navbar" -->
    <div class="navbar bg-white text-black">
      <div class="flex-1 px-2 text-lg font-bold">Blossom</div>
      <div class="flex-none">
        <button class="btn btn-outline btn-black">Login</button>
      </div>
    </div>

    <!-- Statement -->
    <div class="hero min-h-[50vh] bg-white text-center">
      <div class="hero-content flex flex-col">
        <h1 class="text-4xl font-bold text-black">Blossom with Strength, Thrive in Health</h1>
        <p class="py-4">Set fitness goals, track meals, and manage exercise routines in one place.</p>
        <button class="btn bg-[#0e7afe] text-white mt-2 border-0">Get Started</button>
      </div>
    </div>

    <!-- Features (Can change to another component if want to) -->
    <div class="carousel w-full py-4 bg-white text-neutral">
      <div id="slide1" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Exercise Tracking</h2>
          <p>Log workouts, set goals, and monitor progress easily.</p>
        </div>
        <a href="#slide2" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
      <div id="slide2" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Food Logging</h2>
          <p>Keep track of calories and meals to stay on top of nutrition.</p>
        </div>
        <a href="#slide3" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
      <div id="slide3" class="carousel-item w-full flex flex-col items-center">
        <div class="card w-80 bg-white shadow-md p-6">
          <h2 class="text-xl font-semibold text-neutral">Group Management</h2>
          <p>Create and join groups to work out with friends and family.</p>
        </div>
        <a href="#slide1" class="btn btn-circle mt-4 bg-[#0e7afe] text-white border-0">❯</a>
      </div>
    </div>

    <!-- Sign up (bottom of page) -->
    <div class="text-center py-4">
      <h2 class="text-2xl font-bold text-neutral">Join Now and Stay Fit!</h2>
      <button class="btn bg-[#0e7afe] text-white mt-2 border-0">Sign Up</button>
    </div>

  </div>
// Move the above code to landing.vue. 
  <div v-if="!user" class="justify-center flex my-10">
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
  </div>


</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
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
        this.$router.push('/login'); // Redirect if no token
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
