import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import User from '@/scripts/User';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/order/:id', name: 'order', component: () => import('../views/AddProduct.vue') },
        { path: '/account', name: 'account', component: () => import('../views/AccountView.vue') },
        { path: '/account/cart', name: 'account-cart', component: () => import('../views/CartView.vue') },
        { path: '/account/orders', name: 'account-orders', component: () => import('../views/OrdersView.vue') },
        { path: '/checkout', name: 'account-checkout', component: () => import('../views/CheckoutView.vue') },

        { path: '/:catchAll(.*)', name: 'not-found', component: () => import('../views/NotFound.vue') }
    ]
});

router.beforeEach((to, from, next) => {
    if (!User.CurrentUser && to.path.startsWith('/account')) {
        next({ name: 'home' });
    } else {
        next();
    }
});

export default router;
