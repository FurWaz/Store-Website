<template>
    <div class="flex w-full h-fit min-h-[6em] justify-center items-center card">
        <div class="flex w-[50%] lg:w-[20%] h-fit items-center p-2 space-x-2">
            <div class="flex bg-slate-200 dark:bg-slate-800 rounded-md p-1">
                <UIcon name="i-heroicons-square-2-stack" class="w-7 h-7" />
            </div>
            <h3> {{ product.product.title }} </h3>
        </div>
        <div class="hidden lg:flex w-[50%] h-fit items-center p-2">
            <p> {{ product.product.description }} </p>
        </div>
        <div class="flex w-[25%] lg:w-[15%] h-fit justify-center items-center p-2">
            <div class="flex">
                <button @click="remove" class="flex justify-center items-center bg-slate-200 dark:bg-slate-600 rounded-l-md p-0.5 border-2 border-transparent" :class="canRemove()
                        ? 'hover:border-slate-300 hover:dark:border-slate-500 transition-all'
                        : 'opacity-50 cursor-default'
                    ">
                    <UIcon name="i-heroicons-minus" class="w-5 h-5" />
                </button>
                <div class="flex w-8 justify-center items-center bg-slate-300 dark:bg-slate-800">
                    <p class="text-md font-semibold text-center">
                        {{ product.quantity }}
                    </p>
                </div>
                <button @click="add" class="flex justify-center items-center bg-slate-200 dark:bg-slate-600 rounded-r-md p-0.5 border-2 border-transparent" :class="canAdd()
                        ? 'hover:border-slate-300 hover:dark:border-slate-500 transition-all'
                        : 'opacity-50 cursor-default'
                    ">
                    <UIcon name="i-heroicons-plus" class="w-5 h-5" />
                </button>
            </div>
        </div>
        <div class="flex w-[25%] lg:w-[15%] h-fit justify-center items-center p-2">
            <h3>{{ product.product.price }} €</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    product: {
        product: {
            id: number;
            title: string;
            description: string;
            price: number;
        };
        quantity: number;
    }
}>();

const emit = defineEmits<{
    (e: 'update', id: number): void;
    (e: 'remove', id: number): void;
}>();


function canAdd() {
    return props.product.quantity < 9;
}

function canRemove() {
    return props.product.quantity > 0;
}

function add() {
    // eslint-disable-next-line vue/no-mutating-props
    props.product.quantity = Math.min(9, props.product.quantity + 1);
    emit('update', props.product.product.id);

    updateProductQuantity();
}

function remove() {
    // eslint-disable-next-line vue/no-mutating-props
    props.product.quantity = Math.max(0, props.product.quantity - 1);
    emit('update', props.product.product.id);

    if (props.product.quantity === 0) {
        removeProductFromCart();
        return;
    }
    updateProductQuantity();
}

function updateProductQuantity() {
    API.RequestLogged(ROUTES.CART.PRODUCTS.UPDATE(props.product.product.id, props.product.quantity))
        .then((res) => {
            if (res.error) {
                console.error('Error updating product : ', res.message);
                return;
            }
        })
        .catch((error) => {
            console.error('Error updating product : ', error);
        });
}

function removeProductFromCart() {
    API.RequestLogged(ROUTES.CART.PRODUCTS.DELETE(props.product.product.id))
        .then((res) => {
            if (res.error) {
                console.error('Error removing product : ', res.message);
                return;
            }
            emit('remove', props.product.product.id);
        })
        .catch((error) => {
            console.error('Error removing product : ', error);
        });
}

</script>