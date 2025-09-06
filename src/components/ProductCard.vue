<script setup>
import { useCartStore } from '../stores/cart';

const props = defineProps({
    product:{
        type: Object,
        required: true
    }
})

const cart = useCartStore()
function addToCart(){
    cart.add(prop.product, 1)
}

</script>


<template>
    <article class="card-producto">
        <div class="contenido-card">
            <img :src="product.image" :alt="product.title"/>
            <h4>{{ product.title }}</h4>
            <p class="precio">$ {{ product.price.toFixed(2) }}</p>
            <p class="rating">⭐ {{ product.rating?.rate || 0 }} ({{ product.rating?.count || 0 }})</p>
        </div>


        <div class="card-accciones">
            <router-link class="ver-detalle" :to="`/producto/${product.id}`">Ver detalle</router-link>
            <button class="agregar-carrito" @click="addToCart">Agregar</button>
        </div>
    </article>
</template>

<style scoped>
.card-producto{
    border: 1px solid #ccc;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease;
}

.card-producto:hover{
    transform: translateY(-4px);
}

.contenido-card{
    padding: 1rem;
    text-align: center;
}

.contenido-card img {
    max-height: 180px;
    object-fit: contain;
    margin: 0 auto 1rem;
}

.rating{
    font-size: 0.9rem;
    font-size: 1.2rem;
}

.rating{
    font-size: 0.9rem;
    color: #777;
}

.card-acciones{
    display:flex;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid #eee;
}

.ver-detalle, .agregar-carrito{
    background: #333;
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-decoration: none;
    border:none;
    cursor: pointer;
}

.ver-detalle:hover, .agregar-carrito:hover {
    background: #000;
}

</style>