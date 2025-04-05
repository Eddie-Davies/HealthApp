<template>
    <router-link :to="to" class="flex flex-col items-center" :class="{'text-primary': isActive, 'text-base-content/60': !isActive}">
        <i :class="icon" class="mb-2 text-3xl"></i>
        <slot class=""></slot>
    </router-link>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'NavbarLink',
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute();
        const isActive = computed(() => route.path === props.to);
        return { isActive };
    }
};
</script>