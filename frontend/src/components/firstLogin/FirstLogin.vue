<template>
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div class="bg-base-200 p-6 rounded-xl w-96">
            <h2 class="text-xl font-bold mb-4 text-center">
                Welcome to <span class="text-primary">Blossom</span>
            </h2>
            <form @submit.prevent="submitForm" class="space-y-3">
                <div>
                    <label class="block text-sm mb-1">Current Weight (kg)</label>
                    <input v-model.number="form.weight" type="number" class="input input-bordered w-full" required />
                </div>
                <div>
                    <label class="block text-sm mb-1">Height (cm)</label>
                    <input v-model.number="form.height" type="number" class="input input-bordered w-full" required />
                </div>
                <div>
                    <label class="block text-sm mb-1">Date of Birth</label>
                    <input v-model="form.date_of_birth" type="date" class="input input-bordered w-full" required />
                </div>
                <div>
                    <label class="block text-sm mb-1">Gender</label>
                    <select v-model="form.gender" class="select select-bordered w-full" required>
                        <option disabled value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm mb-1">Target Weight (kg)</label>
                    <input v-model.number="form.targetWeight" type="number" class="input input-bordered w-full"
                        required />
                </div>
                <div v-if="formErrors.length"
                    class="bg-error/10 border border-error text-error text-sm p-3 rounded mb-2">
                    <ul>
                        <li v-for="(error, index) in formErrors" :key="index">• {{ error }}</li>
                    </ul>
                </div>
                <div class="text-right pt-2">
                    <button type="submit" class="btn btn-primary btn-sm">Save</button>
                </div>
            </form>
            <div v-if="bmi" class="mt-4 p-4 bg-base-100 rounded-lg text-sm shadow">
                <p><strong>Your BMI:</strong> {{ bmi.toFixed(1) }}</p>
                <p class="mt-1" :class="bmiStatusClass">
                    Status: {{ bmiStatus }}
                </p>
            </div>

            <div v-if="healthyRange.min && form.targetWeight" class="mt-2 p-4 bg-base-100 rounded-lg text-sm shadow">
                <p>
                    <strong>Target Weight Check:</strong>
                    <span :class="isTargetHealthy ? 'text-success' : 'text-error'">
                        {{ isTargetHealthy ? 'Healthy' : 'Unhealthy' }} (Healthy Range: {{ healthyRange.min.toFixed(1)
                        }}–{{ healthyRange.max.toFixed(1) }} kg)
                    </span>
                </p>
                <p class="mt-1 text-sm italic text-gray-500">
                    {{ targetWeightMessage }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "FirstLogin",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                date_of_birth: '',
                gender: '',
                weight: null,
                height: null,
                targetWeight: null,
            },
            formErrors: []
        };
    },
    methods: {
        submitForm() {
            if (!this.isFormValid) {
                console.warn("Form has validation errors.");
                return;
            }

            const payload = { ...this.form };
            payload.gender = payload.gender === 'Male';
            const heightMeters = payload.height / 100;
            payload.bmi = payload.weight / (heightMeters * heightMeters);

            const token = localStorage.getItem('token');

            axios.put('/users/firstLogin', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log("User updated:", res.data);

                    // this.$emit('save', res.data.user);

                    window.location.reload(); //reload so that view dissapears when firstLogin is set to false by server
                })
                .catch(err => {
                    console.error("API error:", err);
                });
        }

    },
    computed: {
        isFormValid() {
            const { date_of_birth, gender, weight, height, targetWeight } = this.form;
            this.formErrors = [];

            if (!date_of_birth) {
                this.formErrors.push("Please enter your date of birth.");
            } else {
                const dob = new Date(date_of_birth);
                const age = new Date().getFullYear() - dob.getFullYear();
                if (age < 0 || age > 120) {
                    this.formErrors.push("Please enter a valid date of birth.");
                }
            }

            if (gender !== 'Male' && gender !== 'Female') {
                this.formErrors.push("Please select a gender.");
            }

            if (!weight || weight <= 0) {
                this.formErrors.push("Weight must be a positive number.");
            }

            if (!height || height <= 0) {
                this.formErrors.push("Height must be a positive number.");
            }

            if (!targetWeight || targetWeight <= 0) {
                this.formErrors.push("Target weight must be a positive number.");
            }

            return this.formErrors.length === 0;
        },
        //bmi claculation reference: https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
        bmi() {
            const { weight, height } = this.form;
            if (!weight || !height) return null;
            const heightMeters = height / 100;
            return weight / (heightMeters * heightMeters);
        },
        bmiStatus() {
            if (!this.bmi || !this.form.gender) return '';
            const bmi = this.bmi;
            const gender = this.form.gender;

            if (gender === 'Male') {
                if (bmi < 18.5) return 'Underweight';
                if (bmi < 25.0) return 'Normal weight';
                if (bmi < 30.0) return 'Overweight';
                return 'Obese';
            } else if (gender === 'Female') {
                if (bmi < 18.0) return 'Underweight';
                if (bmi < 24.0) return 'Normal weight';
                if (bmi < 29.0) return 'Overweight';
                return 'Obese';
            }

            return '';
        },
        bmiStatusClass() {
            const status = this.bmiStatus;
            if (status === 'Normal weight') return 'text-success';
            if (status === 'Underweight' || status === 'Overweight') return 'text-warning';
            if (status === 'Obese') return 'text-error';
            return '';
        },
        //healthy range calculation reference: https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html
        healthyRange() {
            const h = this.form.height;
            const gender = this.form.gender;
            if (!h || !gender) return { min: null, max: null };

            const meters = h / 100;

            if (gender === 'Male') {
                return {
                    min: 18.5 * meters * meters,
                    max: 24.9 * meters * meters,
                };
            } else if (gender === 'Female') {
                return {
                    min: 18.0 * meters * meters,
                    max: 23.9 * meters * meters,
                };
            }

            return { min: null, max: null };
        },
        isTargetHealthy() {
            const { targetWeight } = this.form;
            const { min, max } = this.healthyRange;
            if (!targetWeight || !min || !max) return null;
            return targetWeight >= min && targetWeight <= max;
        },
        targetWeightMessage() {
            const { targetWeight } = this.form;
            const { min, max } = this.healthyRange;
            if (!targetWeight || !min || !max) return '';

            if (targetWeight < min) {
                return `Your target weight is slightly below the healthy range. You might want to consider a slightly higher goal for better balance.`;
            }
            if (targetWeight > max) {
                return `Your target weight is a bit above the recommended range. A slightly lower goal could be beneficial for long-term health.`;
            }
            return `Your target weight is within a healthy range. Great job!`;
        }
    }
};
</script>