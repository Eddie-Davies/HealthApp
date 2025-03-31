<template>
  <div>
      <h1>Welcome to the Home Page</h1>
      <p v-if="user">Hi, {{user.first_name}} {{user.last_name}}. You are logged into your account with the email {{ user.email }}.</p>
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
async created() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found, redirecting to login...');
      this.$router.push('/login'); // Redirect if no token
      return;
    }

    const response = await axios.get('user');

    console.log('✅ User received:', response.data);
    this.user = response.data;
  } catch (error) {
    console.error('❌ Error fetching user:', error.response?.data || error.message);
    // this.$router.push('/login'); // Redirect on error
  }
}
}
</script>
