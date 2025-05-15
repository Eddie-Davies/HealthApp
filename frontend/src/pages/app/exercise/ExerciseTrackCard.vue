<template>
  <div class="card bg-base-200 rounded-box p-4 flex flex-col mb-4 relative">
    <!-- Delete button in top-right corner -->
    <button @click="deleteActivity" class="btn btn-sm btn-error btn-ghost rounded-2xl absolute top-2 right-2">
      Delete
    </button>

    <h1 class="text-lg font-semibold text-neutral/80 ml-2">{{ title }}</h1>

    <!-- Aligned activity row -->
    <div class="flex items-end mt-5 gap-5 xs:gap-2">
      <!-- Activity dropdown -->
      <div class="pr-2 xs:pr-1">
        <p class="text-neutral-400 mb-2 ml-2">Activity</p>
        <div class="flex items-center gap-2">
          <select v-model="editedActivityId" @change="handleActivityChange"
            class="select font-medium text-neutral bg-base-100 rounded-2xl px-3 text-center">
            <option disabled :value="null">Select an activity</option>
            <option v-for="(activity, index) in activityOptions" :key="activity._id" :value="activity._id">
              {{ activity.name }}
            </option>
            <option value="__custom__">➕ Make your own</option>
          </select>

          <button v-if="editedActivityId && editedActivity.name !== '__custom__'" @click="clearActivity"
            class="btn btn-xs btn-outline text-error px-2">
            ✕
          </button>
        </div>
      </div>

      <!-- Quantity input -->
      <div class="pr-2 xs:pr-1">
        <p class="text-neutral-400 mb-2 ml-2">Quantity</p>
        <input v-model="editedInteger"
          class="input font-medium text-neutral focus:outline-none focus:ring-0 border-none bg-base-100 rounded-2xl px-3 text-center"
          type="text" @blur="emitChanges" @keyup.enter="emitChanges" />
      </div>

      <!-- Unit display -->
      <div v-if="editedActivity && editedActivity.unit && editedActivity.name !== '__custom__'"
        class="flex items-center pr-2 self-center mt-6">
        <p class="text-neutral font-medium mt-2">{{ editedActivity.unit }}</p>
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
    unit: { type: String, default: '' },
    activityInstanceId: { type: String, required: true }
  },
  data() {
    return {
      editedActivityId: null,
      editedActivity: {},
      editedInteger: this.integer,
      activityOptions: []
    };
  },
  created() {
    this.syncWithProps();
    this.fetchActivityTypes();
  },
  methods: {
    //Sync with our props
    syncWithProps() {
      this.editedActivity = this.activity?.[0] || this.activity || {};
      this.editedActivityId = this.editedActivity._id || null;
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
    //fetching the activty types from the db
    async fetchActivityTypes() {
      try {
        const res = await axios.get('/activityTypes', { withCredentials: true });
        const types = res.data.activityTypes || [];
        this.activityOptions = types.map((a) => ({
          ...a,
          _id: a._id.toString()
        }));

        if (this.editedActivityId) {
          const match = this.activityOptions.find(a => a._id === this.editedActivityId.toString());
          if (match) {
            this.editedActivity = match;
          }
        }
      } catch (err) {
        console.error('Error fetching activity types:', err);
      }
    },
    handleActivityChange() {
      if (this.editedActivityId === '__custom__') {
        this.$router.push('/home/exercise/new/editActivityType');
      } else {
        const selected = this.activityOptions.find(a => a._id === this.editedActivityId);
        this.editedActivity = selected || {};
        this.emitChanges();
      }
    },
    clearActivity() {
      this.editedActivityId = null;
      this.editedActivity = {};
      this.emitChanges();
    },
    deleteActivity() {
      console.log('Emitting delete for activity instance _id:', this.activityInstanceId);
      this.$emit('deleteActivity', this.activityInstanceId || this.id || null);
    }
  },
  watch: {
    activity() {
      this.syncWithProps();
    },
    integer() {
      this.editedInteger = this.integer;
    }
  }
};
</script>
