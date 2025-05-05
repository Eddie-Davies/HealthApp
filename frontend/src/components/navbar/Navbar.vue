<template>
    <div class="flex justify-center relative z-10">
        <div class="fixed bottom-0 flex h-20 w-screen items-center justify-around pb-0 bg-base-200 px-0.5 transition">
            <NavbarLink to="/home/goals" icon="fas fa-flag">Goals</NavbarLink>
            <NavbarLink to="/home/groups" icon="fas fa-users">Groups</NavbarLink>
            <NavbarLink to="/home/profile" icon="fas fa-circle-user">Profile</NavbarLink>
            <NavbarLink to="/home/exercise" icon="fas fa-running">Exercise</NavbarLink>
            <NavbarLink to="/home/diet" icon="fas fa-utensils">Diet</NavbarLink>
        </div>
    </div>
</template>

<script>
import NavbarLink from './NavbarLink.vue';
export default {
  name: 'Navbar',
  components: { NavbarLink },
  props: {
    hideNavbar: {
      type: Boolean,
      default: false
    }
  }
};
</script>