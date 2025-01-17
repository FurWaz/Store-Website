<template>
    <div class="show-up flex flex-col w-64 h-96 card p-2 space-y-2"
        :class="disabled ? 'text-slate-500 dark:text-slate-400 pointer-events-none' : ''"
    >
        <div class="flex w-full h-32 bg-slate-200 dark:bg-slate-600 rounded overflow-hidden">
            <img class="w-full h-full object-cover" :src="product.image" :class="disabled? 'opacity-50': ''" />
        </div>
        <h3> {{ product.title }} </h3>
        <div class="flex flex-col grow space-y-1">
            <p v-for="line in product.description.split('\n')"> {{ line }} </p>
        </div>
        <div class="flex justify-between items-center">
            <div class="bg-slate-200 dark:bg-slate-800 py-1 px-2 rounded">
                <p> {{ product.price }} € </p>
            </div>
            <UButton :disabled="disabled" :to="`/order?id=${product.id}`">
                {{ $t('products.addToCart') }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    product: {
        id: number;
        title: string;
        description: string;
        image: string;
        price: number;
        available?: boolean;
    };
}>();

const disabled = ref(props.product.available === false);

</script>
