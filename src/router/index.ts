import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import User from '@/scripts/User';
import FurWazPortal from '@/scripts/FurWazPortal';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/order/:id', name: 'order', component: () => import('../views/AddProduct.vue') },
        { path: '/account', name: 'account', component: () => import('../views/AccountView.vue') },
        { path: '/account/cart', name: 'account-cart', component: () => import('../views/CartView.vue') },
        // { path: '/account/orders', name: 'account-orders', component: () => import('../views/OrdersView.vue') },
        // { path: '/account/infos', name: 'account-infos', component: () => import('../views/InfosView.vue') },
        { path: '/checkout', name: 'account-checkout', component: () => import('../views/CheckoutView.vue') },

        { path: '/:catchAll(.*)', name: 'not-found', component: () => import('../views/NotFound.vue') }
    ]
});

router.beforeEach((to, from, next) => {
    if (FurWazPortal.catchRedirectLogin(async (data: any) => {
        const user = new User({ ...data.user, token: data.token });
        await user.fetch();
        user.save();
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.location.href = url.href;
    })) return;

    if (!User.CurrentUser && to.path.startsWith('/account')) {
        next({ name: 'home' });
    } else {
        next();
    }
});

export default router;
