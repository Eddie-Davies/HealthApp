<template>
  <div class="card bg-base-300 rounded-box p-4 flex flex-col mb-4">
    <!-- Top: Title -->
    <h1 class="text-lg font-semibold text-neutral/80">{{ title }}</h1>
    <!-- Activity Details -->
    <div class="flex text-center mt-3 gap-5 xs:gap-2">
      <div class="pr-5 xs:pr-2">
        <p class="text-neutral-400">Activity</p>
        <input
          v-model="editedActivity"
          class="input font-medium text-neutral focus:outline-none focus:ring-0 border-none bg-base-100 rounded-full px-3 text-center"
          type="text"
          @blur="emitChanges"
        />
      </div>
      <div class="pr-5 xs:pr-2">
        <p class="text-neutral-400">Integer</p>
        <input
          v-model="editedInteger"
          class="input font-medium text-neutral focus:outline-none focus:ring-0 border-none bg-base-100 rounded-full px-3 text-center"
          type="text"
          @blur="emitChanges"
          @keyup.enter="emitChanges"
        />
      </div>
      <div>
        <p class="text-neutral-400">Unit</p>
        <input
          v-model="editedUnit"
          class="input font-medium text-neutral focus:outline-none focus:ring-0 border-none bg-base-100 rounded-full px-3 text-center"
          type="text"
          @blur="emitChanges"
          @keyup.enter="emitChanges"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExerciseTrackCard',
  props: {
    activity: {
      type: String,
      default: 'Run'
    },
    title: {
      type: String,
      default: 'New Exercise'
    },
    integer: {
      type: String,
      default: '0'
    },
    unit: {
      type: String,
      default: 'km'
    }
  },
  data() {
    return {
      editedActivity: this.activity,
      editedInteger: this.integer,
      editedUnit: this.unit,
    };
  },
  created() {
    this.syncWithProps();
  },
  methods: {
    syncWithProps() {
      this.editedActivity = this.activity;
      this.editedInteger = this.integer;
      this.editedUnit = this.unit;
    },
    emitChanges() {
      this.$emit('updateActivity', { title: this.title, activity: this.editedActivity });
      this.$emit('updateInteger', { title: this.title, integer: this.editedInteger });
      this.$emit('updateUnit', { title: this.title, unit: this.editedUnit });
    }
  },
  watch: {
    // Update local variables when props change
    activity() {
      this.syncWithProps();
    },
    integer() {
      this.syncWithProps();
    },
    unit() {
      this.syncWithProps();
    }
  }
};
</script>

