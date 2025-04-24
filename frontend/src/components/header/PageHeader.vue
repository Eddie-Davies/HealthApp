<template>
  <h1 v-if="!hideHeader" class="flex text-4xl mt-15 justify-center text-center font-regular">
    {{ title }}
  </h1>
</template>

<script>
import emitter from '/src/eventBus';

export default {
  name: 'PageHeader',
  props: {
    title: String,
  },
  data() {
    return {
      hideHeader: false
    };
  },
  mounted() {
    emitter.on('toggle-navbar', (hide) => {
      // When navbar is hidden, also hide the header
      this.hideHeader = hide;
    });
  },
  beforeUnmount() {
    emitter.off('toggle-navbar');
  }
}
</script>