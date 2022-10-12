<template>
  <div v-if="list.length > 0" v-for="(item, index) in list" :key="index"  class="mb-7">
    <div class="p-6 mb-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <p v-if="!item.input" @click="pushInput(item)" class="cursor-pointer text-gray-700 text-base">
        {{(index + 1) + '.' + ' ' + item.task}}
      </p>
      <div v-if="item.input" class="flex items-center gap-3.5">
        <input v-model="item.task" type="text" placeholder="редактировать" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <Button @click="editTask(item, index)" :text="'Сохранить'"/>
      </div>
      <div class="close" @click="removeTask(index, item)">×</div>
      <div class="edit" @click="getSingle(item)">?</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps,onUnmounted} from "vue";
import ToDoServices from "../../../services/ToDoService";
import Button from "../../../components/Button.vue";
import InfinityScroll from "../../../InfinityScroll.js";
import throttle from "../../../throttle";

const props = defineProps({
  tasks: {
    type: Array,
    default: []
  },
})

let list = props.tasks

function pushToDo (data) {
  for (let todo of data.todos) {
    list.push({
      task: todo.todo,
      id: todo.id,
    })
    console.log(list)
  }
}

async function removeTask (index, item) {
  await ToDoServices.removeTask(item.id)
  list.splice(index,1)

  if (list.length < 3) {
    pushToDo(await ToDoServices.loadNextTask(InfinityScroll.calcSkip(3)))
  }
}
function pushInput(item) {
  item.input = true
}

async function editTask(item, i) {
  if (item.task === '' || item.task.length > 250) {
    alert ('Поле должно быть заполнено и содержать менее 250 символов')
    return
  }
  await ToDoServices.editTask(item.id, item.task)
  list[i].task = item.task
  item.input = false
}

onMounted(async () => {
  InfinityScroll.cleanup()
  pushToDo(await ToDoServices.getAll())

  window.addEventListener('scroll', infinityScroll)
  window.addEventListener('resize', infinityScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', infinityScroll)
  window.removeEventListener('resize', infinityScroll)
})

async function infinityScroll () {
  throttle(await InfinityScroll.checkPosition(async (num) => pushToDo(
    await ToDoServices.loadNextTask(num)
  )), 250)
}

async function getSingle (item) {
  let data = await ToDoServices.getSingle(item.id)
  alert(data.todo)
}

</script>

<style scoped>
</style>