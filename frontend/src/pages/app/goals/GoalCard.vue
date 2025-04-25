<template>
  <div @click="$emit('edit') "class="card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
    <!-- Top: Eaten + Remaining -->
    <div class="flex justify-between w-full">
      <div>
        <p class="text-success">{{ completed.label }}</p>
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">{{ completed.value }}</h1>
        <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">{{ unit }}</p>
        <p class="text-success mt-3">{{ remaining.label }}</p>
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">{{ remaining.value }}</h1>
        <p class="text-neutral-400 leading-none mt-0.5 lg:mt-1">{{ unit }}</p>
      </div>
      <!-- Vertical Progress Bar -->
      <div class="flex flex-col items-center justify-end">
        <p class="mb-1 text-neutral-400">{{ target }}</p>
        <div class="w-4 h-20 bg-neutral-200/20 rounded-full overflow-hidden relative">
          <div
            class="absolute bottom-0 w-full bg-gradient-to-t from-accent via- to-warning rounded-full"
            :style="{ height: progressPercentage + '%' }">
          </div>
        </div>
        <span>0</span>
      </div>
    </div>
    <!-- Bottom: Date -->
    <div v-if="parsedDate > Date.now()">
      <div class="flex justify-start items-center text-xs text-neutral-400 lg:mt-2 mt-4">
        <p>{{ formattedDate }}</p>

      </div>
    </div>
    <div v-else>
      <div class="flex justify-start items-center text-xs text-error lg:mt-2 mt-4">
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
    }
  },
  computed: {
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