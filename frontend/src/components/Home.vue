<template>
  <div>
      <h1>Welcome to the Home Page</h1>
      <p v-if="users.length === 0">Loading users...</p>
      <ul v-else>
          <li v-for="user in users" :key="user._id">
              {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
name: 'Home',
data() {
  return {
    users: []
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

    const response = await axios.get('getUsers');

    console.log('✅ Users received:', response.data);
    this.users = response.data;
  } catch (error) {
    console.error('❌ Error fetching users:', error.response?.data || error.message);
    this.$router.push('/login'); // Redirect on error
  }
}
}
</script>
