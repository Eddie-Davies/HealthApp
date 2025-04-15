<template>
    <PageHeader :title="$route.meta.title" />
<p>Hello from Groups</p>
</template>

<script>
import PageHeader from '../../components/header/PageHeader.vue';

export default {
  name: 'Groups',
  components: {
      PageHeader
  }
}
</script>