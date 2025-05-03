<template>
    <div class="card bg-base-200 rounded-xl lg:rounded-3xl border-2 border-secondary text-center size-39 lg:size-84">
        <p id="title" class="relative top-5 pb-5 self-center text-xl font-semibold lg:mt-10">{{ title }}
        </p>
        <div class="flex flex-col items-center justify-center my-6 mt-2 lg:mt-12 ">
            <div :id="uniqueCounterId" class="text-xl font-bold text-primary lg:text-5xl">
                0
            </div>
            <div class="text-neutral/60 lg:text-2xl">
                {{ unit }}
            </div>
        </div>
        <p id="subtitle" class="absolute bottom-0 right-0 p-2 text-sm text-base-content/60 lg:text-lg lg:p-5">
            {{ note }}
        </p>
    </div>
</template>

<script>
import { CountUp } from 'countup.js';
export default {
    name: 'ProfileCardSmall',
    props: {
        title: String,
        displayNumber: Number,
        unit: String,
        note: String,
        counterId: {
            type: [String, Number],
            default: () => Math.random().toString(36).substring(2, 10)
        }
    },
    data() {
        return {
            counter: null,  // Keep track of the counter instance, lets you have multiple
            uniqueCounterId: `counter-${this.counterId}`
        }
    },
    mounted() {
        this.startCountUp();
    },
    watch: {
        displayNumber(newValue) {
            this.startCountUp(newValue);
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