<template>
    <div class="flex w-full h-fit px-4 py-2 justify-stat items-center space-x-8 border-b-4 border-slate-800">
        <div class="flex space-x-4 justify-center items-center">
            <IconCard class="w-10 h-10" :animate="false" :clickable="false" />
            <h1 class="text-xl font-bold"> Store </h1>
        </div>
        <div class="flex grow w-full h-fit space-x-8 justify-center items-center">

        </div>
        <div class="flex w-fit h-fit justify-center items-center">
            <div v-if="User.CurrentUser" class="flex w-fit h-fit justify-center items-center">
                <button @click="logout"
                    class="p-1 rounded-md bg-slate-600 border-2 border-transparent hover:border-slate-500 transition-all">
                    <div class="flex space-x-2">
                        <p class="whitespace-nowrap font-semibold px-1">
                            {{ User.CurrentUser.pseudo }}
                        </p>
                        <UserIcon class="w-6 h-6" />
                    </div>
                </button>
            </div>
            <div v-else class="flex w-fit h-fit justify-center items-center">
                <button @click="login"
                    class="p-1 rounded-md bg-slate-600 border-2 border-transparent hover:border-slate-500 transition-all">
                    <p class="whitespace-nowrap font-semibold px-1">
                        Se connecter
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCard from './cards/IconCard.vue';
import User from '@/scripts/User';
import FurWazPortal from '@/scripts/FurWazPortal';

import {
    UserIcon
} from '@heroicons/vue/24/outline';

export default defineComponent({
    name: 'HeaderView',
    components: {
        IconCard,
        UserIcon
    },
    setup() {
        return {
            User
        };
    },
    methods: {
        logout() {
            User.Forget();
        },
        login() {
            const portal = new FurWazPortal();
            portal.on('success', async (data) => {
                const user = new User({ ...data.user, token: data.token });
                user.save();
                await user.fetch();
                this.$forceUpdate();
            });
            portal.on('error', (error) => {
                console.error("Failed to login user :", error);
            });
            portal.on('ready', () => {
                portal.open('popup');
            });
        }
    }
});
</script>
