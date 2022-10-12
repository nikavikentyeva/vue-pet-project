<template>
  <div>
    <product-card
      :item="product"
      class="mb-10"
    />
    <h3 class="text-center mb-4 text-2xl">Редактировать</h3>
    <div class="flex flex-col gap-8">
      <InputUpdate v-model="product.title" :product="product"/>
      <InputUpdate v-model="product.description" :product="product"/>
      <InputUpdate v-model="product.rating" :product="product"/>
      <InputUpdate v-model="product.price" :product="product"/>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./components/ProductCard.vue";
import InputUpdate from "./components/InputUpdate.vue";
import { onMounted,ref } from "vue";
import ProductService from "../../services/ProductsService";
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref({})
function pushData(data) {
  product.value = {
      title: data.title,
      price: data.price,
      rating: data.rating,
      mainImage: data.images[0],
      description: data.description,
      id: data.id
  }
}
onMounted(async () => {
  pushData(await ProductService.getSingle(route.params.id))
})
</script>

<style scoped>

</style>