<template>
  <div @click="$emit('edit') "
    class="cursor-pointer card bg-base-300 rounded-box p-4 size-38 lg:size-50 flex flex-col justify-between shrink-0 lg:text-lg text-sm">
    <!-- Top: Eaten + Remaining -->
    <div class="flex justify-between w-full">
      <div>
        <p :class="colour" class="font-semibold">{{ completed.label }}</p>
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">
          <span v-if="type == 'activity' && remainingLabel == 'Under'">{{ targetDisplay }}</span>
          <span v-else>{{ completed.value }}</span>
        </h1>
        <p class="text-neutral/60 leading-none mt-0.5 lg:mt-1">{{ unit }}</p>

        <p :class="colour" class="font-semibold mt-3">{{ remaining.label }}</p>
        <h1 class="lg:text-lg text-base font-semibold text-neutral/80 leading-none mt-0.5">{{ remaining.value }}</h1>
        <p class="text-neutral/60 leading-none mt-0.5 lg:mt-1">
          <span v-if="type == 'activity' && remainingLabel == 'Under'">time</span>
          <span v-else-if="type=='activity' && remainingLabel == 'Left'">this {{ timePeriodDisplay }}</span>
          <span v-else>{{ unit }}</span>
        </p>
      </div>
      <!-- Vertical Progress Bar -->
      <div class="flex flex-col items-center justify-end">
        <p class="mb-1 text-neutral/60">{{ targetDisplay }}</p>
        <div class="w-4 h-20 lg:h-28 bg-neutral-200/10 rounded-full overflow-hidden relative">

          <div class="absolute bottom-0 w-full rounded-full overflow-hidden" :class="{
              'bg-gradient-to-t from-secondary to-primary': colour === 'text-secondary',
              'bg-gradient-to-t from-green-400 to-green-600': colour === 'text-success',
              'bg-gradient-to-t from-sky-400 to-sky-600': colour === 'text-info',
              'bg-gradient-to-t from-amber-400 to-amber-600': colour === 'text-warning',
              'bg-gradient-to-t from-rose-400 to-rose-600': colour === 'text-error',
            }" :style="{ height: progressPercentage + '%', transition: 'height 0.5s ease' }">
          </div>
        </div>

        <span v-if="type == 'diet'" class="pt-1"><i class="text-neutral-200/70 fa-solid fa-utensils"></i></span>
        <span v-else-if="type == 'activity'" class="pt-1"><i
            class="text-neutral-200/70 fa-solid fa-person-running"></i></span>
        <span v-else class="pt-1"><i class="text-neutral-200/70 fa-solid fa-flag text-sm"></i></span>


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
    type: {
      type: String,
      default: 'custom'
    },
    maintainanceKcal: {
      type: Number,
      default: 0
    },
    currentWeight: {
      type: Number,
      default: 0,
    },
    trackFrom: {
      type: Number,
      default: 0,
    },
    lastDayKcal: {
      type: Number,
      default: 0
    },
    time: {
      type: String,
    },
    colour: {
      type: String,
      default: 'text-primary'
    },
    exercises: {
      type: Object,
      
    },
    createdDate :{
      type: [Date, String],
      default: () => new Date()
    }
  },
  data() {
    return {
      localExercises: []
    }
  },

  computed: {
    timePeriodDisplay() {
      return this.time.toLowerCase()
    },
    dynamicProgress() {
      if (this.type === 'diet') {
        let diff = 0;
        if (this.progressLabel === 'Gain Weight') {
          diff = this.currentWeight - this.trackFrom;
          if (diff > this.smartRemaining) diff = this.smartRemaining;

        } else if (this.progressLabel === 'Lose Weight') {
          diff = this.trackFrom - this.currentWeight;
          if (diff > this.smartRemaining) diff = this.smartRemaining;

        } else if (this.progressLabel === 'Less Calories' || this.progressLabel === 'More Calories') {
          return this.lastDayKcal
        }

        if (diff < 0) diff = 0;
        return diff;
      }

      else if (this.type === 'activity') {
        const matchedActivities = [];

        const createdDate = new Date(this.createdDate);
        const now = new Date();

        const isMatchingActivity = (activity) => {
          return Array.isArray(activity.activityType) &&
            activity.activityType.some(type => type.name === this.progressLabel);
        };

        const collectMatchingActivities = () => {
          for (const exercise of this.localExercises) {
            console.log("Running with localExercises:", this.localExercises);
            if (!Array.isArray(exercise.activities)) continue;

            for (const activity of exercise.activities) {
              if (!isMatchingActivity(activity)) continue;

              const type = activity.activityType.find(t => t.name === this.progressLabel);
              const exerciseDate = new Date(exercise.date);
              const durationSeconds = exercise.durationMs / 10; // not actually ms, so only need to div by 10.

              matchedActivities.push({
                date: exerciseDate,
                quantity: activity.quantity,
                durationSeconds
              });

              console.log('Exercise found', type.name, type._id);
              console.log('found match');
              console.log('date', exerciseDate);
              console.log('quantity', type.name, activity.quantity);
              console.log('exercise time', durationSeconds);
              console.log('createdDate', createdDate);

              // Remaining or Under goal evaluation
              if (this.remainingLabel === 'Remaining') {
                if (activity.quantity >= this.target && createdDate < exerciseDate) {
                  return this.target;
                }
              }

              if (this.remainingLabel === 'Under') {
                const targetTimeS = this.timeStringToSeconds(this.remaining.value);
                if (
                  activity.quantity >= this.target &&
                  createdDate < exerciseDate &&
                  durationSeconds < targetTimeS
                ) {
                  return this.target;
                }
              }
            }
          }
        };

        const handleLeftComparison = () => {
          const filterByTime = (activities) => {
            const hoursIn = {
              Day: 24,
              Week: 168,
              Month: 720,
            }[this.time] || 168;

            return activities.filter(({ date }) => {
              const diffHours = (now - date) / (1000 * 60 * 60);
              return diffHours <= hoursIn;
            });
          };

          const filtered = filterByTime(matchedActivities);
          console.log(`Filtered activities for ${this.time || 'Week'}:`, filtered.length);

          return filtered.length >= this.target ? this.target : filtered.length;
        };

        // Execute
        const earlyReturn = collectMatchingActivities();
        if (earlyReturn !== undefined) return earlyReturn;

        if (this.remainingLabel === 'Left') {
          console.log('Processing Left goal comparison with', matchedActivities.length, 'matched activities');
          return handleLeftComparison();
        }

        // Default fallback
        return 0;
      }


      // After collecting all matches, implement "Left" comparison

      return this.progress;
    },

    totalDailyCals() {

      if (this.progressLabel == 'Less Calories') {
        return this.maintainanceKcal - this.target
      }
      else if (this.progressLabel == 'More Calories') {
        return this.maintainanceKcal + this.target
      }
    },
    targetDisplay() {
      const value = (this.type === 'diet' && this.isCalorieGoal)
        ? this.totalDailyCals
        : this.target;

      return this.abbreviateNumber(value);
    },
    smartRemaining() {
      const value = (this.type === 'diet' && this.isCalorieGoal)
        ? this.totalDailyCals
        : this.target;

      return value;
    },



    progressPercentage() {
      // console.log('target display', this.targetDisplay)
      // console.log('target', this.target)

      // Round it only now. This means the progress can show if you are over but the bars colours are correct.
      return Math.min(100, (this.dynamicProgress / this.smartRemaining) * 100);
    },


    isCalorieGoal() {
      return (this.progressLabel == 'More Calories' || this.progressLabel == 'Less Calories')
    },
    isWeightGoal() {
      return (this.progressLabel == 'Gain Weight' || this.progressLabel == 'Lose Weight')
    },

    isComplete() {
      const isTargetMet = this.smartRemaining <= this.dynamicProgress;

      if (this.progressLabel === 'Less Calories') {
        return !isTargetMet;
      }

      return isTargetMet;
    },

    completed() {
      return {
        label: this.progressLabel,
        value: this.dynamicProgress
      };
    },
    remaining() {
      let returnVal = this.smartRemaining - this.dynamicProgress
      if ((this.type == 'diet') && (this.progressLabel == 'Gain Weight' || this.progressLabel == 'Lose Weight')) {
        returnVal = Math.round(returnVal * 10) / 10
        returnVal = Math.max(0, returnVal)
      } else if ((this.type == 'activity') && (this.remainingLabel == 'Under')) {
        returnVal = this.time
      }
      return {
        label: this.remainingLabel,
        value: returnVal
      }
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
    },
  },

  methods: {
    abbreviateNumber(value) {
      if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
      return value.toString();
    },
    timeStringToSeconds(timeStr) {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      return (hours * 3600) + (minutes * 60) + seconds;
    },
  },
  watch: {
    // watcher required to stop loading glitches. Sometimes it won't be there on load
    exercises: {
      handler(newVal) {
        if (this.type === 'activity' && Array.isArray(newVal) && newVal.length > 0) {
          this.localExercises = [...newVal]; // make a safe copy
        }
      },
      immediate: true, // ensures it runs on component mount too
      deep: true 
    }
  }

}

</script>