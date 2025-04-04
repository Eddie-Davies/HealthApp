<template>
    <div class="flex justify-center">
        <div class="fixed bottom-0 flex h-29 w-screen items-center justify-around pb-2 bg-base-200 px-0.5 transition">
            <NavbarLink to="/home/goals" icon="fas fa-flag">Goals</NavbarLink>
            <NavbarLink to="/home/groups" icon="fas fa-users">Groups</NavbarLink>
            <NavbarLink to="/home/exercise" icon="fas fa-running">Exercise</NavbarLink>
            <NavbarLink to="/home/diet" icon="fas fa-utensils">Diet</NavbarLink>
        </div>
    </div>
</template>

<script>
import NavbarLink from './NavbarLink.vue';

export default {
    name: 'Navbar',
    components: { NavbarLink }
};
</script>
