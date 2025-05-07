<template>
  <div class="card bg-base-300 rounded-box p-4 flex flex-col mb-4">
    <h1 class="text-lg font-semibold text-neutral/80">{{ title }}</h1>
    <div class="flex text-center mt-5 gap-5 xs:gap-2">
      <div class="pr-2 xs:pr-1">
        <p class="text-neutral-400 mb-2">Activity</p>
        <select v-model="editedActivity" @change="handleActivityChange"
          class="select font-medium text-neutral bg-base-100 rounded-2xl px-3 text-center">
          <option disabled :value="null">Select an activity</option>
          <option v-for="(activity, index) in activityOptions" :key="index" :value="activity">
            {{ activity.name }}
          </option>
          <option :value="{ name: '__custom__' }">➕ Make your own</option>
        </select>
      </div>
      <div class="pr-2 xs:pr-1">
        <p class="text-neutral-400 mb-2">Quantity</p>
        <input v-model="editedInteger"
          class="input font-medium text-neutral focus:outline-none focus:ring-0 border-none bg-base-100 rounded-2xl px-3 text-center"
          type="text" @blur="emitChanges" @keyup.enter="emitChanges" />
      </div>
      <div v-if="editedActivity && editedActivity.unit && editedActivity.name !== '__custom__'"
        class="flex items-center pr-2">
        <p class="text-neutral font-medium">{{ editedActivity.unit }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ExerciseTrackCard',
  props: {
    activity: { type: Object, default: () => ({ name: '', unit: '' }) },
    title: { type: String, default: 'New Exercise' },
    integer: { type: String, default: '0' },
    unit: { type: String, default: '' }
  },
  data() {
    return {
      editedActivity: this.activity,
      editedInteger: this.integer,
      activityOptions: [],
    };
  },
  created() {
    this.syncWithProps();
    this.fetchActivityTypes();
  },
  methods: {
    syncWithProps() {
      this.editedActivity = this.activity;
      this.editedInteger = this.integer;
    },
    emitChanges() {
      this.$emit('updateActivity', {
        title: this.title,
        activity: this.editedActivity
      });
      this.$emit('updateInteger', {
        title: this.title,
        integer: this.editedInteger
      });
    },
    async fetchActivityTypes() {
      try {
        const res = await axios.get('/activityTypes', { withCredentials: true });
        const types = res.data.activityTypes || [];
        this.activityOptions = types;
      } catch (err) {
        console.error('Error fetching activity types:', err);
      }
    },
    handleActivityChange() {
      if (this.editedActivity.name === '__custom__') {
        this.$router.push('/home/exercise/new/editActivityType');
      } else {
        this.emitChanges();
      }
    }
  },
  watch: {
    activity() {
      this.syncWithProps();
    },
    integer() {
      this.syncWithProps();
    }
  }
};
</script>