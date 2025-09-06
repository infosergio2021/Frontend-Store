import { createRouter, createWebHistory } from 'vue-router';

const HomeView =  () => import('./../views/HomeView.vue');
const ProductView = () => import('./../views/ProductView.vue');
const CartView = () =>  import('./../views/CartView.vue')


const routes = [
    {path: '/', name:'home', component: HomeView},
    {path: '/producto/:id', name:'producto', component: ProductView, props:true },
    { path: '/carrito', name: 'carrito', component: CartView },
    {path: '/:pathMatch(.*)*',name:'404',component: {template: '<p>404 - Página no encontrada</p>'}}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top:0 })
});

export default router;