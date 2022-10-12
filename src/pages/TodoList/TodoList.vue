<template>
  <div class="container">
    <h1>Todo List</h1>
    <form action="" class="flex flex-col gap-3 mb-10">
      <textarea v-model="task" placeholder="Добавить todo" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      <Button @click="addTask()" :text="'Создать'"/>
      <Button @click="getRandom()" :text="'Random'"/>
    </form>
    <Task :tasks="list"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Task from "../TodoList/components/Task.vue"
import ToDoServices from "../../services/ToDoService.js"
import Button from "../../components/Button.vue"

const list = ref ([])
const task = ref('')

async function addTask () {
  if (task.value === '' || task.value.length > 250) {
    alert ('Поле должно быть заполнено и содержать менее 250 символов')
    return
  }
  await ToDoServices.addTask(task.value)

  list.value.unshift({
    task: task.value,
    id: 1
  })
  task.value = ''
}

async function getRandom () {
  let task = await ToDoServices.getRandom()
  alert(task.todo)
}
</script>

<style scoped>

</style>