<template>
    <div class="flex flex-col w-full h-full overflow-auto">
        <div class="show-up flex flex-col md:flex-row w-full h-fit p-12 justify-center items-center md:space-x-8">
            <IconCard class="w-20 h-20 md:w-32 md:h-32" :clickable="false" />
            <h1 class="text-center text-3xl md:text-4xl lg:text-6xl font-bold">
                <GetText file="home" code="store" />
            </h1>
        </div>
        <div class="flex w-full h-fit justify-center items-center space-x-2 px-4">
            <InputView class="max-w-full w-80" name="search" placeholder="verbs::search" />
            <ButtonView @click="search">
                <MagnifyingGlassIcon class="w-6 h-6" />
            </ButtonView>
        </div>
        <div class="flex flex-wrap justify-center items-center p-4">
            <ProductCard v-for="(product, index) in products" :key="index" :product="product"
                class="m-4 md:m-6 lg:m-8" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCard from '@/components/cards/IconCard.vue';
import InputView from '@/components/inputs/InputView.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import ButtonView from '@/components/inputs/ButtonView.vue';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';
import ProductCard from '@/components/cards/ProductCard.vue';
import GetText from '@/components/inputs/GetText.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        IconCard,
        InputView,
        ButtonView,
        MagnifyingGlassIcon,
        ProductCard,
        GetText
    },
    setup() {
        return {
            input: null as HTMLInputElement | null,
            products: [] as any[]
        };
    },
    mounted() {
        this.input = document.querySelector('input[name="search"]') as HTMLInputElement;
        this.input.focus();
        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') this.search();
        });
    },
    methods: {
        async search() {
            if (!this.input) return;

            this.products = [];
            this.$forceUpdate();

            const res = await API.Request(ROUTES.STORE.PRODUCTS.GET());
            if (res.error) {
                console.error('Error loading products : ', res.message);
                return;
            }

            this.products = res.data.products;
            this.$forceUpdate();
        }
    }
});
</script>
