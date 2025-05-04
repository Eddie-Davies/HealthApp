<template>
  <div class="card bg-base-300 rounded-box p-4 mb-4 ">
    <!-- Title and delete button -->
    <div class="flex justify-between items-center w-full">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <button 
        @click="handleDelete" 
        class="btn btn-sm btn-neutral"
      >
        <i class="fa-solid fa-xmark text-base-100"></i>
      </button>
    </div>
    
    <!-- Single activity display -->
    <div v-if="shouldShowSingleActivity" class="flex justify-between mt-4">
      <div class="text-base-content/80">
        <div class="text-sm opacity-60">Activity</div>
        <div>{{ activity }}</div>
      </div>
      <div class="text-base-content/80">
        <div class="text-sm opacity-60">Value</div>
        <div>{{ value }}</div>
      </div>
      <div class="text-base-content/80">
        <div class="text-sm opacity-60">Time</div>
        <div>{{ time }}</div>
      </div>
    </div>
    
    <!-- Multi-activity display -->
    <div v-else class="mt-4">
      <!-- Header row -->
      <div class="flex justify-between mb-2 border-b border-base-content/20 pb-1">
        <div class="text-sm font-medium opacity-60 w-1/3">Activity</div>
        <div class="text-sm font-medium opacity-60 w-1/3 text-center">Value</div>
        <div class="text-sm font-medium opacity-60 w-1/3 text-right">
          <span class="mr-4">Time: {{ time }}</span>
        </div>
      </div>
      
      <!-- Activity rows -->
      <div
        v-for="(activityItem, index) in displayActivities"
        :key="index"
        class="flex justify-between items-center py-1"
      >
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
    title: {
      type: String,
      default: 'Workout'
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
    // New props for multi-activity support
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
      // Show single activity if explicitly not multi-activity or if no activities details
      return !this.isMultiActivity || !this.activitiesDetails || this.activitiesDetails.length === 0;
    },
    displayActivities() {
      // Ensure we have a valid array to iterate over
      return this.activitiesDetails && this.activitiesDetails.length > 0 
        ? this.activitiesDetails 
        : [{ activity: this.activity, integer: '', unit: '' }];
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete');
    }
  },
  mounted() {
    // Debug: Log props when component mounts
    console.log('ExerciseCard mounted with props:', {
      isMultiActivity: this.isMultiActivity,
      activitiesDetails: this.activitiesDetails
    });
  }
};
</script>