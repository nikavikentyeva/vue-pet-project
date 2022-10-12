<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex justify-between">
      <h1>Products</h1>
      <router-link to="/addProduct">
        <Button :text="'Добавить новый продукт'"/>
      </router-link>
    </div>
    <Search @search="searchProduct" @getCategory="getCat" :search-text="text"/>
    <div :style="active ? false : {display: 'none'}">По вашему запросу ничего не найдено</div>
    <div class="grid grid-cols-3 gap-5">
      <div v-for="(item, index) in list" :key="index">
        <router-link
          :to="{ name: 'SingleProduct', params: { id: item.id }}">
          <product-card :item="item"/>
        </router-link>
        <div @click="removeProduct(item,index)" class="close text-2xl">×</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./components/ProductCard.vue";
import Search from "./components/Search.vue";
import { onMounted, onUnmounted, ref } from "vue";
import ProductService from "../../services/ProductsService.js";
import InfinityScroll from "../../InfinityScroll.js";
import throttle from "../../throttle";
import router from "../../main";
import { useRoute } from "vue-router/dist/vue-router";
import Button from "../../components/Button.vue";


const active = ref(false)
const text = ref('')
const list = ref([])
function pushData(data) {
  for (let item of data.products) {
    list.value.push({
      title: item.title,
      price: item.price,
      rating: item.rating,
      mainImage: item.images[0],
      description: item.description,
      category: item.category,
      id: item.id
    })
  }
}

async function searchProduct (searchText) {
  let data = await ProductService.all(searchText)
  list.value = []
  await pushData(data)
  text.value = searchText
  active.value = list.value.length < 1;
}
const route = useRoute()
onMounted(async () => {
  InfinityScroll.cleanup()

  if (text.value === '') {
    await pushData(await ProductService.all())
    window.addEventListener('scroll', infinityScroll)
    window.addEventListener('resize', infinityScroll)
  }
  await searchProduct(route.query.q)
  if (route.query.category !== undefined) {
    await getCat(route.query.category)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', infinityScroll)
  window.removeEventListener('resize', infinityScroll)
})

async function infinityScroll () {
  throttle(await InfinityScroll.checkPosition(async (num) => pushData(
    await ProductService.all(text.value, num)
  )), 250)
}

async function removeProduct(item,index) {
  let data = await ProductService.removeProduct(item.id)
  alert ('Удален:' + data.title)
  list.value.splice(index,1)
  // list.value = []
  // pushData(await ProductService.all())
}

async function getCat (category) {
  await router.push({
    query: {
      category: category,
    //  ...route.query
    }}
  )
  list.value = []
  pushData(await ProductService.getProductsOfACategory(category))
}
</script>

<style scoped>

</style>