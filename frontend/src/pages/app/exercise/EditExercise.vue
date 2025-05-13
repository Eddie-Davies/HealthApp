<template>
    <div class="px-4 py-6">
        <PageHeader title="Start Exercise" />
        <ExerciseNew @start="handleStart" />
    </div>
</template>

<script>
import ExerciseNew from './ExerciseNew.vue';
import PageHeader from '../../../components/header/PageHeader.vue';

export default {
    components: { ExerciseNew, PageHeader },
    methods: {
        handleStart() {
            this.$router.push('/home/exercise');
        }
    }
};
</script>