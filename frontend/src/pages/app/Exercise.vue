<template>
    <PageHeader :title="$route.meta.title" />
<p>Hello from exercise</p>
</template>

<script>
import PageHeader from '../../components/header/PageHeader.vue';

export default {
  name: 'Exercise',
  components: {
      PageHeader
  }
}
</script>