<template>
    <div class="flex flex-col items-center":class="{'text-blue-500': isActive, 'text-gray-400': !isActive}">
        <i :class="icon" class="text-2xl"></i>
        <slot class="block"></slot>
    </div>
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
