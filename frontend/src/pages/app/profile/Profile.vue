<template>
    <PageHeader :title="$route.meta.title" />
    <div class="px-5 mt-5 ">
        <div class="grid grid-cols-1">
            <div class="card bg-base-200 rounded-xl h-60 w-auto"></div>
        </div>
        <div class="mt-5 grid grid-cols-2 gap-5">
            <div class="card bg-base-200 rounded-xl w-full h-60"></div>
            <div class="card bg-base-200 rounded-xl w-full h-60"></div>
        </div>
        <div class="mt-5 grid grid-cols-1">
            <div class="card bg-base-200 rounded-xl h-60 w-auto mb-25"></div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../../components/header/PageHeader.vue';

export default {
    name: 'Profile',
    components: {
        PageHeader
    }
}</script>