<template>
  <div>
    <div :id="uniqueCounterId">
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
    counterId: {
      type: [String, Number],
      default: () => Math.random().toString(36).substring(2, 10)
    },
    runOnce: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      counter: null,
      uniqueCounterId: `counter-${this.counterId}`,
      animationCount: 0  // to make sure it doesn't run more than twice in total
    }
  },
  mounted() {
    this.startCountUp(true); // always animate the first time.
    this.animationCount = 1;  // set animation count to 1
  },
  watch: {
    displayNumber(newValue) {
      // only animate for the first two (would be 1, but we count the launch twice)**
      if (this.animationCount < 2) {
        this.startCountUp(true);
        this.animationCount++;
      } else {
        // ** if runOnce is true, skip animation, otherwise animate normally
        if (!this.runOnce) {
          this.startCountUp(true);  // animate when updated.
        } else {
          this.startCountUp(false); // Skip animation if runOnce is true
        }
      }
    }
  },
  methods: {
    getDecimalPlaces(num) {
      const str = num.toString();
      const decimalIndex = str.indexOf('.');
      return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    },
    startCountUp(animate = true) {
      this.$nextTick(() => {
        //delete previous counter if it exists
        if (this.counter) {
          this.counter.reset();
        }

        // change options, always show decimals (if exists), if no animation, duration = instant/0.
        const options = {
          decimalPlaces: this.getDecimalPlaces(this.displayNumber),
          duration: animate ? 2 : 0  // Duration for animation
        };

        // create a new counter instance using above options.
        this.counter = new CountUp(this.uniqueCounterId, this.displayNumber, options);

        // start the counter animation as long as no errors
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
