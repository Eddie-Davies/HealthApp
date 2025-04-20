<template>
  <div class="flex flex-col items-center">
    <div class="mt-6 w-full flex justify-center">
        <input
          v-model="newTitle"
          class="input input-ghost px-10 text-base-content text-4xl font-semibold text-left focus:outline-none focus:ring-0 border-none shadow-none"
          placeholder="Afternoon Run"
        />
    </div>
    <div class="mt-10 pr-80 text-2xl">
        Elapsed
        <div class=" text-2xl text-center text-neutral">
        {{ formatTime(timer) }}
     </div>
    </div>

    <div class="mt-3 w-full max-w-md">
        <ExerciseTrackCard
        v-for="(exercise, index) in exercises"
        :key="index"
        :title="exercise.title"
        :value="exercise.value"
        :unit="exercise.unit"
        @updateValue="updateValue"
        @updateUnit="updateUnit"
        />


    </div>
  
    <div class="w-full flex items-center justify-center py-4">
      <div class="relative flex items-center justify-center w-full pt-20">
        <div class="absolute left-1/2 transform -translate-x-full pr-16">
          <ExercisePlay @play="startTimer"/>
        </div>


        <ExerciseFinish @finishWorkout="finishWorkout" />
  
        <div class="absolute left-1/2 transform translate-x-full pl-1">
          <ExercisePause @pause="pauseTimer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseFinish from './ExerciseFinish.vue';
import ExerciseCard from './ExerciseCard.vue';
import ExerciseNew from './ExerciseNew.vue';
import ExercisePause from './ExercisePause.vue';
import ExercisePlay from './ExercisePlay.vue';
import ExerciseTrackCard from './ExerciseTrackCard.vue';

export default {
  name: 'ExerciseTrack',
  components: {
    ExerciseCard,
    ExerciseNew,
    ExerciseFinish,
    ExercisePlay,
    ExercisePause,
    ExerciseTrackCard,
  },

  data() {
    return {
      exercises: [
        { title: 'Distance', value: '2', unit: 'km' }
      ],
      timer: 0,
      timerInterval: null,
      isRunning: false,
      newTitle: ''
    };
  },

  methods: {
  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    }
  },
  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  },
  updateValue({ title, value }) {
    const ex = this.exercises.find((e) => e.title === title);
    if (ex) ex.value = value;
  },
  updateUnit({ title, unit }) {
    const ex = this.exercises.find((e) => e.title === title);
    if (ex) ex.unit = unit;
  },
  finishWorkout() {
    this.pauseTimer(); // stop the timer

    const completedWorkout = {
      title: this.newTitle || 'Untitled Workout',
      activity: 'Run',
      distance:
        this.exercises.find((e) => e.title === 'Distance')?.value +
        ' ' +
        (this.exercises.find((e) => e.title === 'Distance')?.unit || ''),
      time: this.formatTime(this.timer),
    };

    console.log('Workout finished:', completedWorkout);

    // Emit to parent
    this.$emit('workoutFinished', completedWorkout);
  }
  
}

};
</script>
