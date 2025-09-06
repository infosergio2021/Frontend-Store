<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="container">
    <router-view />
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
