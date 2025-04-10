<template>
    <h1 class="flex text-4xl mt-15 justify-center text-center font-regular">
        {{ title }}
        </h1>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
  }
}
</script>