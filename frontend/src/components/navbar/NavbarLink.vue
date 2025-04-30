<template>
    <router-link :to="to" class="flex flex-col items-center text-center transition duration-300 ease-in-out hover:bg-base-100 rounded-xl px-3 py-2"

        :class="{'text-primary': isActive, 'text-base-content/60': !isActive}">
        <i :class="icon" class="mb-2 text-2xl transition-transform duration-350 ease-in-out transform hover:scale-120 hover:shadow-md"></i>
        <span class="text-xs">
            <slot></slot>
        </span>
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