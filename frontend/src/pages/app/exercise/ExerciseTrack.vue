<template>
    <p>Hello from ExerciseTrack</p>
</template>


<script>

    import ExerciseCard from './ExerciseCard.vue'
    import ExerciseNew from './ExerciseNew.vue'

    export default {
        name: 'ExerciseTrack',
        components: { ExerciseCard, ExerciseNew },
    };
</script>