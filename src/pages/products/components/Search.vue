<template>
  <form class="mb-7">
    <div class="flex">
      <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
      <button  @click="active = !active" id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
      <div v-if="active" id="dropdown" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; margin: 0; top: 50px; left: -15px;">
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
          <li v-for="(category, index) in categories" :key="index">
            <button :class="{'active': current === index}" @click="getCatAndAddClass(category, index)" type="button" class="category__btn inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
      <div class="relative w-full">
        <input @input="search(searchText)" v-model="searchText" type="search" @keydown="handleKeyPress($event, searchText)" id="search-dropdown" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required>
        <div v-if="searchText !== ''" @click="searchText = ''" class="close absolute p-2 inline-flex items-center justify-center text-gray-400 cursor-pointer">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <a @click="$emit('search', searchText)" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span class="sr-only">Search</span>
        </a>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from "vue";
import ProductService from "../../../services/ProductsService.js"
import router from '../../../main.js'
import { useRoute } from "vue-router/dist/vue-router";


const props = defineProps({
  searchText: {
    type: String,
    default: ''
  },
})

const active = ref(false)
let categories = ref([])
async function getCat () {
  let res = await ProductService.getAllProductsCategories()
  for (let item of res) {
    categories.value.push(item)
  }

  return categories
}

onMounted(async () => {
  await getCat()
})

const emit = defineEmits(['getCategory','search'])
const route = useRoute()
function handleKeyPress(e, searchText) {
  let key = e.keyCode || e.which;
  if (key === 13) { // Клавиша Enter
    e.preventDefault();
    emit('search', searchText)
  }
}
function search (searchText) {
  router.push({
    query: {
      q: searchText,
     // ...route.query
    }}
  )

  // route.query = searchText
  emit('search', searchText)
  // setTimeout(() => {
  //   emit('search', searchText)
  // },3000)
}
let current = ref (null)
async function getCategory (category) {
 await ProductService.getProductsOfACategory(category)
}

function getCatAndAddClass (category, index) {
  emit('getCategory', category)
  current.value = index
}

</script>

<style scoped>
.close {
  right: 45px;
  top: 1px;
}
</style>