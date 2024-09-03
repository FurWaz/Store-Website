<template>
    <div class="show-up flex flex-col w-min h-fit p-3 bg-slate-700 border-2 border-slate-600 rounded-lg space-y-8">
        <div class="flex justify-center items-center">
            <div class="flex bg-slate-800 rounded-lg p-1.5">
                <Square2StackIcon class="w-10 h-10" />
            </div>
            <div class="px-4 flex flex-col justify-center items-start">
                <p class="whitespace-nowrap text-xl font-semibold">{{ product.name }}</p>
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
                <p class="text-lg font-semibold">{{ product.price }} €</p>
            </div>
            <ButtonView :to="`order/${product.id}`">
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
    }
});
</script>
