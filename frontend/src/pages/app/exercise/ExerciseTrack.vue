<template>
    <div>
        <ExerciseCancel/>
    </div>
</template>


<script>

    import ExerciseCancel from './ExerciseCancel.vue';
    import ExerciseCard from './ExerciseCard.vue'
    import ExerciseNew from './ExerciseNew.vue'

    export default {
        name: 'ExerciseTrack',
        components: { ExerciseCard, ExerciseNew, ExerciseCancel },
    };
</script>