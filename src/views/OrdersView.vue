<template>
    <div class="flex grow flex-col w-full h-full">
        <div class="show-up flex flex-col md:flex-row w-full h-fit p-12 justify-center items-center md:space-x-8">
            <UserCircleIcon class="w-16 h-16 md:w-24 md:h-24" />
            <h1 class="text-center text-3xl md:text-4xl lg:text-6xl font-bold">
                {{ User.CurrentUser?.pseudo }}
            </h1>
        </div>
        <div class="flex grow h-full w-full justify-center items-start">
            <div class="flex flex-col w-fit space-y-4 p-4 justify-center items-center">
                <RouterLink v-for="(option, index) in options" :key="index" :to="option.to"
                    class="show-up flex justify-stat items-center space-x-2 w-full h-fit border-2 border-slate-600 rounded-md p-2 px-4"
                    :style="`animation-delay: ${index + 1}00ms`">
                    <component :is="option.icon" class="w-6 h-6" />
                    <p class="flex grow whitespace-nowrap font-semibold px-1 pr-8">
                        {{ option.name }}
                    </p>
                    <ChevronRightIcon class="w-6 h-6" />
                </RouterLink>
            </div>
        </div>
        <div class="flex p-4 justify-center">
            <ButtonView @click="logout" class="show-down">
                <p class="whitespace-nowrap font-semibold px-1">Se déconnecter</p>
            </ButtonView>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import User from '@/scripts/User';
import ButtonView from '@/components/inputs/ButtonView.vue';

import {
    ChevronRightIcon,
    UserCircleIcon,
    ShoppingCartIcon,
    IdentificationIcon,
    ArchiveBoxIcon
} from '@heroicons/vue/24/outline';

export default defineComponent({
    name: 'OrdersView',
    components: {
        UserCircleIcon,
        ChevronRightIcon,
        ButtonView
    },
    setup() {
        return {
            User,
            options: [
                { icon: ShoppingCartIcon, name: 'Mon panier', to: '/account/cart' },
                { icon: ArchiveBoxIcon, name: 'Mes commandes', to: '/account/orders' },
                { icon: IdentificationIcon, name: 'Mes informations', to: '/account/infos' }
            ]
        };
    },
    methods: {
        logout() {
            User.Forget();
        }
    }
});
</script>
