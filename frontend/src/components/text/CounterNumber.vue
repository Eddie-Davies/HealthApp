<template>
  <div>
    <div :id="uniqueCounterId" class="text-xl font-bold text-primary lg:text-5xl">
      0
    </div>
  </div>
</template>

<script>
import { CountUp } from 'countup.js';

export default {
  name: 'CounterNumber',
  props: {
    displayNumber: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: ''
    },
    counterId: {
      type: [String, Number], // allows you to provide your own incase i need to in future.
      default: () => Math.random().toString(36).substring(2, 10)
    }
  },
  data() {
    return {
      counter: null,
      uniqueCounterId: `counter-${this.counterId}`
    }
  },
  mounted() {
    this.startCountUp();
  },
  watch: {
    displayNumber(newValue) {
      this.startCountUp();
    }
  },
  methods: {
    startCountUp() {
      this.$nextTick(() => {
        // delete previous counter if it exists
        if (this.counter) {
          this.counter.reset();
        }
        // make new counter with the uid
        this.counter = new CountUp(this.uniqueCounterId, this.displayNumber);
        
        if (!this.counter.error) {
          this.counter.start();
        } else {
          console.error(this.counter.error);
        }
      });
    }
  }
}
</script>