<template>
  <div>
    <!-- Dark backdrop/close click listener -->
    <div class="absolute inset-0 bg-black/80 z-40" @click.self="$emit('close')"></div>

    <!-- Dropdown Menu -->
    <div :class="[
      'fixed right-0 mt-2 bg-base-200 rounded-lg py-2 z-50 shadow-lg mr-3',
      scrollBHidden ? 'mr-6' : ''
    ]">
      <div class="cursor-pointer block px-4 py-2 hover:bg-base-100/60">
        <i class="fa-solid fa-sun mr-2"></i>Light Mode
      </div>
      <router-link to="/home/settings" class="block px-4 py-2 hover:bg-base-100/60">
        <i class="fa-solid fa-gear mr-2"></i>Settings
      </router-link>
      <router-link to="/login" class="block px-4 py-2 text-red-500 hover:bg-base-100/60" @click="logout">
        <i class="fa-solid fa-right-from-bracket mr-2"></i>Logout
      </router-link>
    </div>
  </div>
</template>




<script>
export default {
  name: 'AvatarDropdown',
  data() {
    return {
      scrollBHidden: false
    }
  },
  mounted() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 1){
      this.scrollBHidden = true
    }
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.marginRight = `${scrollBarWidth}px`;
  },
  beforeUnmount() {
    document.documentElement.style.overflow = '';
    document.documentElement.style.marginRight = '';
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.user = null
    }
  }
}
</script>
