<template>
    <div class="border-2 border-secondary card bg-base-200 rounded-xl lg:rounded-3xl h-60 w-84 lg:h-84 lg:w-174">
        <div class="text-center">
            <p class="font-semibold text-xl mt-10">{{ title }}<span class="text-neutral/60 ml-2">({{ unit }})</span></p>
            <CounterNumber class="mt-6 font-bold text-5xl text-primary lg:text-7xl lg:mt-10"
                :display-number="formattedDisplayNumber" :runOnce="true" />
            <!-- <h1 >{{  }}</h1> -->
        </div>

        <div class="absolute bottom-0 w-full flex justify-evenly items-center mb-3 p-2">
            <button @click="decrement" class="btn btn-secondary lg:h-15 w-1/3"><i
                    class="fa-solid fa-minus"></i></button>

            <select v-if="this.unit == 'kg'" v-model="step"
                class="select select-ghost font-bold text-base-content/69 text-center w-1/4">
                <option value="0.1">0.1</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="10">10</option>

            </select>
            <select v-if="this.unit == 'kcal'" v-model="step"
                class="select select-ghost font-bold text-base-content/69 text-center w-1/4">

                <option value="1">1</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="500">500</option>
                <option value="1000">1000</option>




            </select>

            <button @click="increment" class="btn btn-secondary w-1/3 lg:h-15 "><i
                    class="fa-solid fa-plus"></i></button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CounterNumber from '../../../components/text/CounterNumber.vue';
export default {
    name: 'ProfileCard',
    components: {
        CounterNumber
    },
    props: {
        title: String,
        displayNumber: {
            type: Number,
            default: 0
        },
        secondaryNumber: Number,
        unit: String,
        useDecimal: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        formattedDisplayNumber() {
            return this.useDecimal
                ? this.localDisplayNumber.toFixed(1)
                : Math.round(this.localDisplayNumber).toString();
        }
    },
    data() {
        return {
            step: 1,
            localDisplayNumber: 0,
        }
    },
    mounted() {
        // console.log("Display Number", this.displayNumber);
        this.localDisplayNumber = this.displayNumber;
    },
    watch: {
        displayNumber: {
            immediate: true,
            handler(newValue) {
                // console.log("Display Number changed:", newValue);
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
            if (this.unit == 'kg') {
                try {
                    await axios.post('/weight', {
                        value: this.localDisplayNumber,
                    });
                } catch (error) {
                    console.error('Failed to update backend:', error);
                }
            } else if (this.unit == 'kcal') {
                console.log('attempting post request')
                try {
                    await axios.post('/kcal-intake', {
                        dailyCalorieIntake: this.localDisplayNumber,
                    });
                    console.log(this.localDisplayNumber)
                } catch (error) {
                    console.error('Failed to update backend:', error);
                }
            }

        }
    }
}
</script>