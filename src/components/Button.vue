<template>
  <a class="text-center cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{text}}</a>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: 'Создать'
  }
})
</script>

<style scoped>

</style>