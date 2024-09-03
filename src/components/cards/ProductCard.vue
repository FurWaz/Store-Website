<template>
    <div class="show-up flex flex-col w-min h-fit m-4 p-3 bg-slate-700 border-2 border-slate-600 rounded-lg space-y-8">
        <div class="flex justify-center items-center">
            <div class="flex bg-slate-800 rounded-lg p-1.5">
                <Square2StackIcon class="w-10 h-10" />
            </div>
            <div class="px-4 flex flex-col justify-center items-start">
                <p class="whitespace-nowrap text-xl font-semibold"> {{ product.name }} </p>
                <p class="text-md font-semibold text-slate-400">{{ app?.name }}</p>
            </div>
        </div>
        <div>
            <p class="text-md font-semibold">
                {{ product.description }}
            </p>
        </div>
        <div class="flex justify-between items-center">
            <div class="px-2">
                <p class="text-lg font-semibold"> {{ product.price }} € </p>
            </div>
            <ButtonView @click="addProductToCart">
                <p class="text-md font-semibold px-1">Ajouter</p>
                <ShoppingCartIcon class="w-6 h-6" />
            </ButtonView>
        </div>
    </div>
</template>

<script lang="ts">
import { ShoppingCartIcon, Square2StackIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import ButtonView from '@/components/inputs/ButtonView.vue';
import ROUTES from '@/scripts/routes';
import { API } from '@/scripts/API';

export default defineComponent({
    name: 'ProductCard',
    components: {
        Square2StackIcon,
        ShoppingCartIcon,
        ButtonView
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            app: null as any
        };
    },
    mounted() {
        this.app = { name: 'FullBowody' };
        this.$forceUpdate();
    },
    methods: {
        async addProductToCart() {
            const res = await API.RequestLogged(ROUTES.CART.ADD(this.product.id, 1));
            if (res.error) {
                console.error('Error adding product to cart : ', res.message);
                return;
            }
            this.$router.push('/account/cart');
        }
    }
});
</script>