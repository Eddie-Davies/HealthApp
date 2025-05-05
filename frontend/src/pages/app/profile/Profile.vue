<template>
    <div class="">
        <!-- Page Title -->
        <PageHeader :title="$route.meta.title" />

        <!-- Member Since -->
        <p class="text-center mt-10 text-base-content/50">
            <span><i class="fa-solid fa-trophy mr-1"></i></span>
            Member since {{ memberSince }}
        </p>

        <!-- Main Card Layout -->
        <div class="mt-10 grid justify-items-center space-y-6">
            <!-- Top Centered Card -->
            <ProfileCard
                title="Current Weight"
                :displayNumber="weight"
                :secondaryNumber="targetWeight"
                unit="kg"
                />
            <!-- Two Side-by-Side Cards -->
            <div class="grid grid-cols-2 gap-6">
                <ProfileCardSmall
                    title="Calorie Intake"
                    :displayNumber ="calories"
                    unit="kcal"
                    note="(last 24hrs)"
                    />
                <ProfileCardSmall
                    title="Recent Exercise"
                    :displayNumber="exercise"
                    unit="minutes"
                    note="(last 24hrs)"
                    />
            </div>
            <!-- Bottom Wide Card -->
            <ProfileCardMed 
                title="Age"
                :displayNumber="age"
                :message="`${daysUntilBirthday} days until your next birthday`"/>
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
    data(){
        return {
            weight: 0,
            targetWeight: 0,
            calories: 0,
            exercise: 50, // temporary value,
            dob: 0, // change to null instead after implementing the rest.
            memberSince: '04/05/2025' // default to date this was implemented instead of 00/00/0000.

        }
    },
    async mounted() {
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
        }

    }
}
</script>