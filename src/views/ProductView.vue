<script setup>
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { onMounted, computed  } from 'vue'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const store = useProductsStore()
const cart = useCartStore()

const id = route.params.id

onMounted(() => {
  // por si recargás desde /producto/3 directamente
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})

const product = computed(() => store.getById(id))

function addToCart() {
  if(product.value) cart.add(product.value, 1);
}

</script>

<template>
  <section v-if="product">
    <div class="detalle-producto">
      <img :src="product.image" :alt="product.title" />
      <div class="detalle-info">
        <h1>{{ product.title }}</h1>
        <p class="precio">$ {{ product.price.toFixed(2) }}</p>
        <p class="rating">⭐ {{ product.rating?.rate }} ({{ product.rating?.count }} votos)</p>
        <p class="descripcion">{{ product.description }}</p>
        <button class="btn" @click="addToCart">Agregar al carrito</button>
      </div>
    </div>
  </section>
  <p v-else>Cargando producto...</p>
</template>

<style scoped>
.detalle-producto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
.detalle-producto img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
}
.detalle-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.precio {
  font-size: 1.8rem;
  font-weight: bold;
}
.rating {
  color: #777;
}
.descripcion {
  font-size: 1.2rem;
  line-height: 1.6;
}
.btn {
  background: #333;
  color: white;
  padding: 0.8rem 1.4rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .detalle-producto {
    grid-template-columns: 1fr;
  }
}
</style>
