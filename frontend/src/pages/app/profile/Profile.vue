<template>
    <div class="">
        <!-- Page Title -->
        <PageHeader :title="$route.meta.title" />

        <!-- Member Since -->
        <p class="text-center mt-10 text-base-content/50">
            <span><i class="fa-solid fa-trophy mr-1"></i></span>
            Member since 20/05/2025
        </p>

        <!-- Main Card Layout -->
        <div class="mt-10 grid justify-items-center space-y-6">
            <!-- Top Centered Card -->
            <ProfileCard />
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
            <ProfileCardMed/>
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
            calories: 0,
            exercise: 50
        }
    },
    async mounted() {
        // Get user Calories in last 24hrs
        try {
            const res = await axios.get('/recent-calories');
            this.calories = res.data
            console.log(this.calories)
        } catch (err) {
            console.error('Error fetching last 24hr calories:', err.response?.data);
        }
    }
}
</script>