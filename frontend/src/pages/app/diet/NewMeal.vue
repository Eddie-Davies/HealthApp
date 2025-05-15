
<template>
    <div class="flex items-center justify-center py-4">
        <button class="btn btn-neutral" @click="goToNewMeal">Log New Meal</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'NewMeal',
    setup() {
        const router = useRouter();

        function goToNewMeal() {
            router.push('/home/diet/new');
        }

        return { goToNewMeal };
    }
};
</script>
