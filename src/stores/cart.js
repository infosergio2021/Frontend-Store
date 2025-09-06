import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items:[]
    }),

    getters: {
        count: (s) => s.items.reduce((acc,i)=> acc + i.qty,0),
        subtotal: (s) => s.items.reduce((acc,i) => acc + i.price * i.qty, 0),
        detailed: (s) => s.items
    },

    actions: {
        add( product,qty = 1 ){
            const idx = this.items.findIndex( i => i.id === product.id)
            if(idx >= 0){
                this.items[idx].qty += qty
            } else {
                this.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    qty
                })
            }
            this.persist()
        },
        remove(productId){
            this.items = this,this.items.filter(i => i.id !==productId)
            this.persist()
        },
        setQty(productId,qty){
            const item = this.items.find( i => i.id !== productId)
            if(!item) return
            item.qty = Math.max(1,qty)
            this.persist()
        },
        clear(){
            this.items = []
            this.persist()
        },
        persist(){
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        load(){
            const saved = localStorage.getItem('cart')
            if(saved) this.items = JSON.parse(saved)
        }
    }

})