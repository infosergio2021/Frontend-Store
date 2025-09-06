import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products',{
    state: () => ({
        products: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchProducts() {
            this.loading = true
            this.error = null
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                this.products = data
                .sort((a,b) => b.rating.rate - a.rating.rate)
                .slice(0,10)
            } catch(e){
                this.error = 'Error al cargar productos'
                console.error(e)
            } finally{
                this.loading = false
            }
        }
    }, 

    getters:{
        getById: (state) => (id) => state.products.find(p => String(p.id) === String(id))
    }
})