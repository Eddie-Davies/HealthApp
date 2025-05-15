<template>
  <div class="card bg-base-200 rounded-box p-4 hover:bg-base-200/60 cursor-pointer" @click="goToEditPage">
    <button @click.stop="handleDelete" class="absolute right-4 btn btn-sm btn-neutral">
      <i class="fa-solid fa-xmark text-base-100"></i>
    </button>
      <!-- Title, Edit & Delete -->
      <div class="flex justify-between items-center w-full mb-1">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold">{{ exerciseName }}</h3>
        </div>

      </div>

      <!-- Timestamp -->
      <p class="text-sm text-gray-500 mb-2">{{ formattedDate }}</p>

      <!-- Single activity display -->
      <div v-if="shouldShowSingleActivity" class="flex justify-between">
        <div class="text-base-content/80">
          <div class="text-sm opacity-60">Activities</div>
          <div>{{ activities }}</div>
        </div>
        <div class="text-base-content/80">
          <div class="text-sm opacity-60">Value</div>
          <div>{{ value }}</div>
        </div>
        <div class="text-base-content/80">
          <div class="text-sm opacity-60">Unit</div>
          <div>{{ unit }}</div>
        </div>
        <div class="text-base-content/80">
          <div class="text-sm opacity-60">Time</div>
          <div>{{ time }}</div>
        </div>
      </div>

      <!-- Multi-activity display -->
      <div v-else class="mt-2">
        <div class="flex justify-between mb-2 border-b border-base-content/20 pb-1">
          <div class="text-sm font-medium opacity-60 w-1/3">Activity</div>
          <div class="text-sm font-medium opacity-60 w-1/3 text-center">Value</div>
          <div class="text-sm font-medium opacity-60 w-1/3 text-right">
            <span class="mr-4">Time: {{ time }}</span>
          </div>
        </div>
        <div v-for="(activityItem, index) in displayActivities" :key="index"
          class="flex justify-between items-center py-1">
          <div class="w-1/3 text-base-content/80">{{ activityItem.activity }}</div>
          <div class="w-1/3 text-center text-base-content/80">{{ activityItem.integer }} {{ activityItem.unit }}</div>
          <div class="w-1/3"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ExerciseCard',
  props: {
    exerciseId: {
      type: String,
      required: true
    },
    exerciseName: {
      type: String,
      required: true
    },
    activity: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: '00:00.00'
    },
    createdAt: {
      type: [String, Date],
      required: true
    },
    activitiesDetails: {
      type: Array,
      default: () => []
    },
    isMultiActivity: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldShowSingleActivity() {
      return this.activitiesDetails.length === 0 && !this.isMultiActivity;
    },
    displayActivities() {
      return this.activitiesDetails?.length
        ? this.activitiesDetails
        : [{ activity: this.activity, integer: '', unit: '' }];
    },
    formattedDate() {
      const date = new Date(this.createdAt);
      if (!date) return 'Unknown Date';
      if (isNaN(date)) return 'Invalid Date';

      return date.toLocaleString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete');
    },
    goToEditPage() {
      this.$router.push(`/home/exercise/${this.exerciseId}`);
    }
  }
};
</script>
