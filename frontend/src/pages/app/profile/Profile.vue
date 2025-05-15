<template>
    <div class="">

        <!-- Page Title -->
        <PageHeader :title="$route.meta.title" />

        <h2 class="text-xl font-semibold text-center mt-8 text-base-content/90">
            <span><i class="fa-solid fa-user mr-1"></i></span>
            {{ username }}
        </h2>

        <!-- Member Since -->
        <p class="text-center mt-5 text-base-content/50">
            <span><i class="fa-solid fa-trophy mr-1"></i></span>
            Member since {{ memberSince }}
        </p>

        <!-- Main Card Layout -->
        <div class="mt-10 grid justify-items-center space-y-6">
            <!-- Top Centered Card -->
            <ProfileCard title="Current Weight" :displayNumber="weight" :secondaryNumber="targetWeight" unit="kg" />
            <!-- Two Side-by-Side Cards -->
            <ProfileCard title="Maintenance Calories" :displayNumber="kcalDailyRec" unit="kcal" :useDecimal="false" />
            <div class="grid grid-cols-2 gap-6">
                <ProfileCardSmall title="Calorie Intake" :displayNumber="calories" unit="kcal" note="(last 24hrs)" />
                <ProfileCardSmall title="Recent Exercise" :displayNumber="exercise" unit="minutes"
                    note="(last 24hrs)" />
            </div>
            <!-- Bottom Wide Card -->
            <ProfileCardMed title="Age" :displayNumber="age"
                :message="`${daysUntilBirthday} days until your next birthday`" />
            <!-- Bottom Wide Card pt 2-->
            <ProfileCardMed title="BMI" :displayNumber="bmi.toFixed(2)"
                :message="`Your BMI is ${bmi.toFixed(2)} – ${bmiStatus}`" class="mb-30" />
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import PageHeader from '../../../components/header/PageHeader.vue';
import ProfileCard from './ProfileCard.vue';
import ProfileCardSmall from './ProfileCardSmall.vue';
import ProfileCardMed from './ProfileCardMed.vue';

export default {
    name: 'Profile',
    components: {
        PageHeader,
        ProfileCard,
        ProfileCardSmall,
        ProfileCardMed
    },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            weight: 0,
            targetWeight: 0,
            calories: 0,
            kcalDailyRec: 0,
            height: 0,
            exercises: null,
            localExercises: null,
            exercise: 0, // temporary value,
            dob: 0, // change to null instead after implementing the rest.
            memberSince: '04/05/2025', // default to date this was implemented instead of 00/00/0000.
            gender: null
        }
    },
    async mounted() {
        try {
            const res = await axios.get('/kcal-intake');
            this.kcalDailyRec = res.data
            console.log('daily', this.kcalDailyRec)
        } catch (err) {
            console.error('Error fetching daily kcal rec:', err.response?.data);
        }
        // Get user Calories in last 24hrs
        try {
            const res = await axios.get('/recent-calories');
            this.calories = res.data
            // console.log(this.calories)
        } catch (err) {
            console.error('Error fetching last 24hr calories:', err.response?.data);
        }

        try {
            const res = await axios.get('/dob'); // temporarily returns age instead.
            this.dob = res.data;

        } catch (err) {
            console.error('Error fetching date of birth:', err.response?.data);
        }

        try {
            const res = await axios.get('/join-date'); // temporarily returns age instead.
            this.memberSince = res.data.joinDate;

        } catch (err) {
            console.error('Error fetching join-date:', err.response?.data);
        }

        try {
            const res = await axios.get('/weights');
            this.weight = res.data.weight
            this.targetWeight = res.data.targetWeight
            // console.log(this.weight, this.targetWeight)
        } catch (err) {
            console.error('Error fetching weight(s):', err.response?.data);
        }
        try {
            const res = await axios.get('/height');
            this.height = res.data
            console.log(this.height)
        } catch (err) {
            console.error('Error fetching height:', err.response?.data);
        }
        try {
            const res = await axios.get('/gender');
            this.gender = res.data.gender;
            console.log(this.gender);
        } catch (err) {
            console.error('Error fetching gender:', err.response?.data);
        }
        // Get last 24 hours of activity
        await this.fetchExercises();
        this.localExercises = this.exercises
        const duration = this.getTotalDurationLast24Hours(this.localExercises);
        this.exercise = duration
    },
    methods: {
        // gets the last 24hours of activity to display to the user.
        getTotalDurationLast24Hours(exerciseList) {
            const matchedActivities = [];
            const now = new Date();
            console.log('exercise list ', exerciseList)
            for (const exercise of exerciseList) {
                if (!Array.isArray(exercise.activities)) continue;

                const exerciseDate = new Date(exercise.date);
                const hoursAgo = (now - exerciseDate) / (1000 * 60 * 60);

                // only include exercises in the last 24 hours
                if (hoursAgo > 24) continue;

                const durationSeconds = exercise.durationMs / 10;

                matchedActivities.push(durationSeconds);
            }

            // calcualte totla seconds and convert to minutes
            let totalSeconds = 0;
            for (const seconds of matchedActivities) {
                totalSeconds += seconds;
            }
            const totalMinutes = Math.floor(totalSeconds / 60);

            return totalMinutes;
        },

        // EXERCISE FETCH STUFF
        async fetchExercises() {
            try {
                const res = await axios.get('/exercises', { withCredentials: true }); // ensure token is sent
                this.exercises = res?.data?.exercises.map(workout => ({
                    ...workout,
                    isMultiActivity: workout.activities.length > 1,
                    time: this.formatTime(workout.durationMs),
                    activitiesDetails: workout.activities.map(act => ({
                        activity: act.activityType[0]?.name || 'Unknown',
                        unit: act.activityType[0]?.unit || '',
                        integer: act.quantity
                    }))
                })) || [];
                console.log(this.exercises)
                return this
            } catch (err) {
                console.error('Failed to fetch exercises:', err);
            }
        },
        formatTime(ms) {
            if (!ms || typeof ms !== 'number') return '00:00.00';
            const minutes = Math.floor(ms / 60000);
            const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
            return `${String(minutes).padStart(2, '0')}:${seconds}`;
        }
    },
    computed: {
        // Convert date of birth into current age.
        age() {
            const today = new Date();
            const dob = new Date(this.dob);
            const age = today.getFullYear() - dob.getFullYear();
            const hasHadBirthday =
                today.getMonth() > dob.getMonth() ||
                (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
            return hasHadBirthday ? age : age - 1;
        },
        // Convert dob to days until next birthday
        daysUntilBirthday() {
            const today = new Date();
            const dob = new Date(this.dob);
            const birthdayThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

            if (birthdayThisYear < today) {
                birthdayThisYear.setFullYear(today.getFullYear() + 1);
            }
            const diffDays = Math.ceil((birthdayThisYear - today) / (1000 * 60 * 60 * 24));
            return diffDays;
        },
        // Convert weight to BMI
        bmi() {
            const heightMeters = this.height / 100;
            const bmi = this.weight / (heightMeters * heightMeters);
            return bmi;
        },
        bmiStatus() {
            const bmi = this.bmi;
            const gender = this.gender;

            if (!bmi || gender === null) return '';

            if (gender === true) { // male
                if (bmi < 18.5) return 'Underweight';
                if (bmi < 25.0) return 'Normal weight';
                if (bmi < 30.0) return 'Overweight';
                return 'Obese';
            } else if (gender === false) { // female
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
    },
}
</script>