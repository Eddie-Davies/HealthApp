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
                <ProfileCardSmall/>
                <ProfileCardSmall/>
            </div>

            <!-- Bottom Wide Card -->
            <ProfileCardMed/>

        </div>
    </div>
</template>
  

<script>
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
    }
}</script>