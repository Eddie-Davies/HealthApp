<template>
  <div @click="$emit('edit') "class="cursor-pointer card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
    <!-- Top: Eaten + Remaining -->
    <div class="flex justify-between w-full">
      <div>
        <p :class="colour" class="font-semibold">{{ completed.label }}</p> 
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">{{ completed.value }}</h1>
        <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">{{ unit }}</p>

        <p :class="colour" class="font-semibold mt-3">{{ remaining.label }}</p>
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">{{ remaining.value }}</h1>
        <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">{{ unit }}</p>
      </div>
      <!-- Vertical Progress Bar -->
      <div class="flex flex-col items-center justify-end">
        <p class="mb-1 text-neutral-400">{{ target }}</p>
        <div class="w-4 h-20 lg:h-28 bg-neutral-200/10 rounded-full overflow-hidden relative">

          <div class="absolute bottom-0 w-full rounded-full overflow-hidden"
            :class="{
              'bg-gradient-to-t from-secondary to-primary': colour === 'text-secondary',
              'bg-gradient-to-t from-green-400 to-green-600': colour === 'text-success',
              'bg-gradient-to-t from-sky-400 to-sky-600': colour === 'text-info',
              'bg-gradient-to-t from-amber-400 to-amber-600': colour === 'text-warning',
              'bg-gradient-to-t from-rose-400 to-rose-600': colour === 'text-error',
            }"
            :style="{ height: progressPercentage + '%', transition: 'height 0.5s ease' }">
        </div>
      </div>
        <span v-if="sport" class="pt-1"><i class="text-neutral-200/70 fa-solid fa-person-running"></i></span>
        <span v-else="sport" class="pt-1"><i class="text-neutral-200/70 fa-solid fa-flag text-sm"></i></span>


      </div>
    </div>
    <!-- Bottom: Date -->
    <div v-if="parsedDate > Date.now() && !isComplete">
      <div class="flex justify-start items-center text-xs text-neutral-400 lg:-mt-3 mt-3">
        <p>{{ formattedDate }}</p>
      </div>
    </div>
    <div v-else-if="isComplete">
      <div class="flex justify-start items-center text-xs text-success lg:-mt-3 mt-3">
        <p>{{ formattedDate }}</p>
        <span class="fa-solid fa-check ml-1.5 mt-0.5"></span>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-start items-center text-xs text-error lg:-mt-3 mt-3">
        <p>{{ formattedDate }}</p>
        <span class="fa-solid fa-clock ml-1.5 mt-0.5"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalCard',
  props: {
    target: {
      type: Number,
      default: 100
    },
    progress: {
      type: Number,
      default: 0
    },
    progressLabel: {
      type: String,
      default: 'Done'
    },
    remainingLabel: {
      type: String,
      default: 'Remaining'
    },
    unit: {
      type: String,
      default: 'units'
    },
    date: {
      type: [Date, String],
      default: () => new Date()
    },
    sport: {
      type: Boolean,
      default: false
    },
    colour: {
      type: String,
      default: 'text-success'
    }
  },
  computed: {
    isComplete(){
      return this.target === this.progress;
    },
    completed() {
      return {
        label: this.progressLabel,
        value: this.progress
      };
    },
    remaining() {
      return {
        label: this.remainingLabel,
        value: this.target - this.progress
      };
    },
    progressPercentage() {
      return (this.progress / this.target) * 100;
    },
    parsedDate() {
      const parsed = new Date(this.date);
      return isNaN(parsed.getTime()) ? new Date() : parsed; // fallback if invalid
    },
    formattedDate() {
      const date = this.parsedDate;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }

}
</script>