<template>
  <form class="flex">
    <input @input="changeValue" v-model="dataValue" type="text" placeholder="редактировать" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <Button @click="edit(product)" :text="'Изменить'"/>
  </form>
</template>

<script setup>
import {defineProps, defineEmits,computed} from "vue";
import Button from "../../../components/Button.vue";
import ProductService from "../../../services/ProductsService";

const props = defineProps({
  product: {
    type: Object,
    default: () => {}
  },
  modelValue: {
    type: [String, Number],
    default: '',
  }
})

const emit = defineEmits(['update:modelValue', 'onChanges'])
const updateInput = (event) => {
  emit('update:modelValue', event.target.value)
}
const changeValue = (event) => {
  updateInput(event)
}

const dataValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
async function edit (item) {
  if (item.title === '' || item.title.length > 250) {
    alert ('Поле должно быть заполнено и содержать менее 250 символов')
    return
  }
  await ProductService.edit(item.id, item.task)
}
</script>

<style scoped>

</style>