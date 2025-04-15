<template>
      <PageHeader :title="$route.meta.title" />
<p>Hello from diet</p>
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