<template>
    <div class="flex justify-center">
        <div class="fixed bottom-0 flex h-16 w-screen items-center justify-around bg-gray-500 px-0.5 transition">
            <NavbarLink to="/goals" icon="fas fa-flag">Goals</NavbarLink>
            <NavbarLink to="/groups" icon="fas fa-users" />
            <NavbarLink to="/exercise" icon="fas fa-running" />
            <NavbarLink to="/food" icon="fas fa-utensils" />
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
