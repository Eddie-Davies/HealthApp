<template>
      <PageHeader :title="$route.meta.title" />
<div class="mt-20 px-4 pb-16 flex flex-col items-center">
    <DietNew />  
</div>
</template>

<script>
import DietNew from './DietNew.vue'

export default {
    name: 'Diet',
    components: {
        DietNew
    }
}
</script>