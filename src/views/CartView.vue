<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<template>
  <section>
    <h1>Carrito</h1>
    <div v-if="cart.items.length === 0">Tu carrito está vacío</div>

    <ul v-else class="cart-list">
      <li v-for="item in cart.detailed" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div class="info">
          <h4>{{ item.title }}</h4>
          <p>$ {{ (item.price * item.qty).toFixed(2) }} ({{ item.qty }} × {{ item.price }})</p>
          <div class="actions">
            <button @click="cart.setQty(item.id, item.qty - 1)">-</button>
            <span>{{ item.qty }}</span>
            <button @click="cart.setQty(item.id, item.qty + 1)">+</button>
            <button @click="cart.remove(item.id)">Quitar</button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="cart.items.length" class="summary">
      <p><strong>Subtotal:</strong> $ {{ cart.subtotal.toFixed(2) }}</p>
      <button @click="cart.clear()">Vaciar carrito</button>
    </div>
  </section>
</template>

<style scoped>
.cart-list{ display:grid; gap:1rem; margin-top:1rem; }
.cart-item{ display:flex; gap:1rem; align-items:center; padding:1rem; border:1px solid #eee; border-radius:10px; background:#fff; }
.cart-item img{ width:72px; height:72px; object-fit:contain; }
.actions button{ margin-right:.5rem; }
.summary{ margin-top:1.5rem; }
</style>
