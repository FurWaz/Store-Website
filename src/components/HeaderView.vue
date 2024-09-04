<template>
    <div class="flex w-full h-fit px-4 py-2 justify-stat items-center space-x-8 border-b-4 border-slate-800">
        <RouterLink to="/" class="flex space-x-4 justify-center items-center">
            <IconCard class="w-10 h-10" :animate="false" />
            <h1 class="text-xl font-bold">
                <GetText file="home" code="store" />
            </h1>
        </RouterLink>
        <div class="flex grow w-full h-fit space-x-8 justify-center items-center"></div>
        <div class="flex w-fit h-fit justify-center items-center">
            <div v-if="User.CurrentUser" class="flex w-fit h-fit justify-center items-center">
                <ButtonView to="/account">
                    <p class="whitespace-nowrap font-semibold px-1">
                        {{ User.CurrentUser.pseudo }}
                    </p>
                    <UserIcon class="w-6 h-6" />
                </ButtonView>
            </div>
            <div v-else class="flex w-fit h-fit justify-center items-center">
                <ButtonView @click="login">
                    <p class="whitespace-nowrap font-semibold px-1">
                        <GetText file="verbs" code="logIn" />
                    </p>
                </ButtonView>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCard from './cards/IconCard.vue';
import User from '@/scripts/User';
import FurWazPortal from '@/scripts/FurWazPortal';
import ButtonView from './inputs/ButtonView.vue';

import { UserIcon } from '@heroicons/vue/24/outline';
import GetText from './inputs/GetText.vue';

export default defineComponent({
    name: 'HeaderView',
    components: {
        IconCard,
        UserIcon,
        ButtonView,
        GetText
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
                console.error('Failed to login user :', error);
            });
            portal.on('ready', () => {
                portal.open('popup');
            });
        }
    }
});
</script>
