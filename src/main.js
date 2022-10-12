import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: () => import('../src/pages/TodoList/TodoList.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../src/pages/products/Products.vue')
    },
    {
      path: '/product/:id',
      name: 'SingleProduct',
      component: () => import('../src/pages/products/SingleProduct.vue')
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: () => import('../src/pages/products/AddProduct.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../src/pages/Auth/Auth.vue')
    },
  ]
})
createApp(App).use(router).mount('#app')

export default router