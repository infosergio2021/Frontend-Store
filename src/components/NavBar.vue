<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '../stores/cart'

const atTop = ref(true)
const cart = useCartStore()

function handleScroll() {
  atTop.value = window.scrollY < 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['navbar', { 'navbar--translucent': !atTop }]">
    <div class="navbar__inner">
      <router-link to="/" class="brand">Frontend Store</router-link>
      <nav class="menu">
        <router-link to="/">Inicio</router-link>
        <router-link to="/carrito">Carrito
           <span v-if="cart.count" class="badge">{{ cart.count }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #333;
  color: #fff;
  padding: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar--scrolled {
  background-color: rgba(51, 51, 51, 0.8);
  backdrop-filter: blur(4px);
}

.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: bold;
  font-size: 1.4rem;
  text-decoration: none;
  color: #fff;
}

.menu {
  display: flex;
  gap: 1.2rem;
}

.menu a {
  color: #fff;
  text-decoration: none;
}

.menu a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.badge{
  display:inline-block;
  min-width: 1.5rem;
  padding: .1rem .4rem;
  margin-left: .4rem;
  border-radius: 999px;
  background:#ff4757;
  color:#fff;
  font-size: .9rem;
  text-align:center;
}

</style>