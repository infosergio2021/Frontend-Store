<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const store = useProductsStore()

onMounted(()=>{
  store.fetchProducts()
  console.log('productos cargados:', store.products)
})

</script>

<template>
  <section>
    <h1>Top Productos</h1>
    <div v-if="store.loading">Cargando productos...</div>
    <div v-else-if="store.error">{{  store.error }}</div>
    <div v-else class="grid">
      <ProductCard v-for="product in store.products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}
</style>