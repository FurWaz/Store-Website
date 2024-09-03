<template>
    <div class="flex w-full h-fit min-h-[6em] justify-center items-center border-2 border-slate-600 rounded-md">
        <div class="flex w-[50%] lg:w-[20%] h-fit items-center p-2 space-x-2">
            <div class="flex bg-slate-800 rounded-md p-1">
                <Square2StackIcon class="w-7 h-7" />
            </div>
            <p class="text-md font-semibold">
                {{ product.product.name }}
            </p>
        </div>
        <div class="hidden lg:flex w-[50%] h-fit items-center p-2">
            <p class="text-md font-semibold">
                {{ product.product.description }}
            </p>
        </div>
        <div class="flex w-[25%] lg:w-[15%] h-fit justify-center items-center p-2">
            <div class="flex">
                <button @click="remove" class="bg-slate-600 rounded-l-md p-0.5 border-2 border-transparent" :class="canRemove
                        ? 'hover:border-slate-500 transition-all'
                        : 'opacity-50 cursor-default'
                    ">
                    <MinusIcon class="w-5 h-5" />
                </button>
                <div class="flex w-8 justify-center items-center bg-slate-800">
                    <p class="text-md font-semibold text-center">
                        {{ product.quantity }}
                    </p>
                </div>
                <button @click="add" class="bg-slate-600 rounded-r-md p-0.5 border-2 border-transparent" :class="canAdd
                        ? 'hover:border-slate-500 transition-all'
                        : 'opacity-50 cursor-default'
                    ">
                    <PlusIcon class="w-5 h-5" />
                </button>
            </div>
        </div>
        <div class="flex w-[25%] lg:w-[15%] h-fit justify-center items-center p-2">
            <p class="text-md font-semibold">{{ product.product.price }} €</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';

import { PlusIcon, MinusIcon, Square2StackIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    name: 'CartProductCard',
    components: {
        PlusIcon,
        MinusIcon,
        Square2StackIcon
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        canAdd() {
            return this.product.quantity < 9;
        },
        canRemove() {
            return this.product.quantity > 0;
        }
    },
    methods: {
        add() {
            // eslint-disable-next-line vue/no-mutating-props
            this.product.quantity = Math.min(9, this.product.quantity + 1);
            this.$forceUpdate();
            this.$emit('update', this.product.product.id);

            this.updateProductQuantity();
        },
        remove() {
            // eslint-disable-next-line vue/no-mutating-props
            this.product.quantity = Math.max(0, this.product.quantity - 1);
            this.$forceUpdate();
            this.$emit('update', this.product.product.id);

            if (this.product.quantity === 0) {
                this.removeProductFromCart();
                return;
            }
            this.updateProductQuantity();
        },
        updateProductQuantity() {
            API.RequestLogged(
                ROUTES.CART.PRODUCTS.UPDATE(this.product.product.id, this.product.quantity)
            )
                .then((res) => {
                    if (res.error) {
                        console.error('Error updating product : ', res.message);
                        return;
                    }
                })
                .catch((error) => {
                    console.error('Error updating product : ', error);
                });
        },
        removeProductFromCart() {
            API.RequestLogged(ROUTES.CART.PRODUCTS.DELETE(this.product.product.id))
                .then((res) => {
                    if (res.error) {
                        console.error('Error removing product : ', res.message);
                        return;
                    }
                    this.$emit('remove', this.product.product.id);
                })
                .catch((error) => {
                    console.error('Error removing product : ', error);
                });
        }
    }
});
</script>
