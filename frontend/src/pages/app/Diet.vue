<template>
      <PageHeader :title="$route.meta.title" />
<div class="flex justify-center items-center text-center text-lg text-base-content/80 mt-20 pb-5">
    <div class="tooltip" data-tip="Click the button below :)">
        <button class="btn">Log New Meal</button>
    </div>
</div>
</template>

<script>
import PageHeader from '../../components/header/PageHeader.vue';

export default {
    name: 'Diet',
    components: {
        PageHeader
    }
}
</script>