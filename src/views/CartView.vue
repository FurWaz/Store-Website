<template>
    <div class="flex flex-col w-full h-full">
        <div class="show-up flex w-full h-fit p-6 justify-center items-center space-x-4 md:space-x-8">
            <ShoppingCartIcon class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
            <h1 class="text-center text-xl md:text-2xl lg:text-4xl font-bold">
                Mon panier
            </h1>
        </div>
        <div v-if="products.length" class="flex flex-col md:flex-row grow h-full w-full p-4 md:space-x-4">
            <div class="show-right flex flex-col grow w-full h-full border-4 border-slate-600 rounded-md">
                <div class="flex w-full h-fit bg-slate-600 justify-center items-center p-2">
                    <p class="w-[50%] md:w-[20%] text-xl font-bold">
                        Nom
                    </p>
                    <p class="hidden md:flex w-[50%] text-xl font-bold">
                        Description
                    </p>
                    <p class="w-[25%] md:w-[15%] text-xl font-bold text-center">
                        Quantité
                    </p>
                    <p class="w-[25%] md:w-[15%] text-xl font-bold text-center">
                        Prix
                    </p>
                </div>
                <div class="flex w-full h-full max-w-full max-h-full overflow-auto">
                    <div class="flex flex-col space-y-2 w-full h-fit p-2">
                        <CartProductCard v-for="(product, index) in products" :key="index" :product="product"
                            @remove="onProductRemoved" @update="refresh" />
                    </div>
                </div>
            </div>
            <div
                class="show-left flex flex-row md:flex-col w-full md:min-w-[25%] md:w-fit h-fit md:h-full border-4 border-slate-600 rounded-md">
                <div class="hidden md:flex w-full h-fit bg-slate-600 justify-center items-center p-2">
                    <p class="text-xl font-bold">
                        Récapitulatif
                    </p>
                </div>
                <div class="flex grow w-full h-full md:h-fit items-center md:items-end p-4">
                    <div class="flex justify-between w-full h-fit">
                        <p class="text-xl md:text-3xl font-bold">Total</p>
                        <p class="text-lg md:text-2xl font-semibold pl-8"> {{ total }} </p>
                    </div>
                </div>
                <span class="hidden md:flex w-full h-1 bg-slate-600" />
                <div class="flex w-full h-fit p-4">
                    <ButtonView class="flex w-full h-fit p-2 text-orange-500">
                        <p class="text-md font-semibold"> Continuer </p>
                    </ButtonView>
                </div>
            </div>
        </div>
        <div v-else class="show-down flex flex-col grow w-full h-full justify-center items-center space-y-2">
            <p class="text-2xl font-semibold">Votre panier est vide !</p>
            <p class="text-lg font-semibold">Ajoutez des produits pour continuer.</p>
            <div class="show-down flex pt-16">
                <ButtonView to="/">
                    <p class="text-md font-semibold"> Retourner à l'accueil </p>
                </ButtonView>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonView from '@/components/inputs/ButtonView.vue';
import User from '@/scripts/User';

import {
    ShoppingCartIcon
} from '@heroicons/vue/24/outline';
import CartProductCard from '@/components/cards/CartProductCard.vue';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';

export default defineComponent({
    name: 'HomeView',
    components: {
        ShoppingCartIcon,
        ButtonView,
        CartProductCard
    },
    setup() {
        return {
            User,
            products: [] as any[],
            total: ''
        };
    },
    async mounted() {
        this.fetchCart();
    },
    methods: {
        async fetchCart() {
            const res = await API.RequestLogged(ROUTES.CART.GET());
            if (res.error) {
                console.error('Error loading cart : ', res.message);
                return;
            }

            this.products = res.data.products;
            this.refresh();
            this.$forceUpdate();
        },
        async onProductRemoved(id: number) {
            this.products = this.products.filter((product) => product.product.id !== id);
            this.$forceUpdate();
        },
        refresh() {
            const amount = this.products.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
            this.total = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
            this.$forceUpdate();
        }
    }
});
</script>
