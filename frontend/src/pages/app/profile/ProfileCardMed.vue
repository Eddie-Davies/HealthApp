<template>
    <div class="card bg-base-200 rounded-xl lg:rounded-3xl border-2 border-secondary h-40 w-84 lg:h-84 lg:w-174">
        <div class="text-center">
            <p class="font-semibold text-xl mt-5 lg:mt-15">{{ title }}</p>
            <CounterNumber class="mt-3 font-bold text-4xl text-primary lg:text-7xl lg:mt-10" :display-number="
                displayNumber
                "/>
            <p class="text-base-content/60 mt-5 lg:mt-20 lg:text-lg">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import CounterNumber from '../../../components/text/CounterNumber.vue';
export default {
    name: 'ProfileCardMed',
    components: {
        CounterNumber
    },
    props: {
        title: String,
        displayNumber: {
            type: [Object, String, Number],
        },
        message: String
    }
}
</script>