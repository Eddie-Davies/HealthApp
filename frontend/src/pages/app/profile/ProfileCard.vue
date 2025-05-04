<template>
    <div class="border-2 border-secondary card bg-base-200 rounded-xl lg:rounded-3xl h-65 w-84 lg:h-84 lg:w-174">
                <div class="text-center">
                    <p class="font-semibold text-xl mt-10">{{ title }}<span class="text-neutral/60 ml-2">({{ unit }})</span></p>
                    <h1 class="mt-6 font-bold text-5xl text-primary lg:text-7xl lg:mt-10">{{ localDisplayNumber.toFixed(1) }}</h1>
                    <div class="tooltip tooltip-bottom" data-tip="Change your target weight in the goals page"> 
                        <!-- TODO: Change above to non hardcoded later. -->
                        <div class="mt-1 font-medium text-sm text-neutral/60 lg:text-xl lg:mt-3">(Target: <span class="font-semibold text-primary/80"> {{ secondaryNumber }}{{ unit }}</span>)</div>
                    </div>
                </div>

                <div class="absolute bottom-0 w-full flex justify-evenly items-center mb-3 p-2">
                    <button @click="decrement" class="btn btn-secondary lg:h-15 w-1/3"><i class="fa-solid fa-minus"></i></button>

                    <select v-model="step" class="select select-ghost font-bold text-base-content/69 text-center w-1/4">
                        <option value="0.1">0.1</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                    </select>

                    <button @click="increment" class="btn btn-secondary w-1/3 lg:h-15 "><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ProfileCard',
    props: {
        title: String,
        displayNumber: {
            type: Number,
            default: 0
        },
        secondaryNumber: Number,
        unit: String,
    },
    data() {
        return {
            step: 1,
            localDisplayNumber: 0,
        }
    },
    mounted() {
        console.log("Display Number", this.displayNumber);
        this.localDisplayNumber = this.displayNumber;
    },
    watch: {
        displayNumber: {
            immediate: true,
            handler(newValue) {
                console.log("Display Number changed:", newValue);
                this.localDisplayNumber = newValue;
            }
        }
    },
    methods: {
        increment() {
            this.localDisplayNumber = parseFloat((this.localDisplayNumber + parseFloat(this.step)).toFixed(1));
            this.updateBackend();
        },
        decrement() {
            this.localDisplayNumber = parseFloat((this.localDisplayNumber - parseFloat(this.step)).toFixed(1));
            this.updateBackend();
        },

        async updateBackend() {
        try {
            await axios.post('/weight', {
            value: this.localDisplayNumber,
            });
        } catch (error) {
            console.error('Failed to update backend:', error);
        }
        }
    }
}
</script>