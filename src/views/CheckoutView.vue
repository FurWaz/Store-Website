<template>
    <div class="flex grow flex-col w-full h-full justify-center items-center">
        <div v-if="checkout === undefined" class="flex flex-col space-y-4 justify-center items-center p-2">
            <p class="text-2xl font-bold text-center">
                <GetText file="checkout" code="loading" />
            </p>
            <LoadingIcon class="w-8 h-8" />
        </div>
        <div v-if="checkout === null" class="flex flex-col space-y-4 justify-center items-center p-2">
            <p class="text-2xl font-bold text-center">
                <GetText file="checkout" code="error" />
            </p>
            <p class="text-xl font-semibold text-center">
                <GetText file="checkout" code="errorDesc" />
            </p>
        </div>
        <div v-if="checkout !== undefined && checkout !== null"
            class="show-up flex flex-col space-y-32 justify-center items-center p-2">
            <div v-if="checkout.status.name === 'succeeded'" class="flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    <GetText file="checkout" code="commandSuccess" />
                </p>
                <p class="text-lg md:text-xl font-semibold text-center">
                    <GetText file="checkout" code="commandSuccessDesc" />
                </p>
            </div>
            <div v-if="checkout.status.name === 'failed'" class="flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    <GetText file="checkout" code="commandFailed" />
                </p>
                <p class="text-lg md:text-xl font-semibold text-center">
                    <GetText file="checkout" code="commandFailedDesc" />
                </p>
            </div>
            <div v-if="checkout.status.name === 'pending'" class="flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    <GetText file="checkout" code="commandPending" />
                </p>
                <p class="text-lg md:text-xl font-semibold text-center">
                    <GetText file="checkout" code="commandPendingDesc" />
                </p>
                <div class="pt-8">
                    <LoadingIcon class="w-8 h-8" />
                </div>
            </div>
            <div v-if="checkout.status.name === 'canceled'" class="flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    <GetText file="checkout" code="commandCanceled" />
                </p>
                <p class="text-lg md:text-xl font-semibold text-center">
                    <GetText file="checkout" code="commandCanceledDesc" />
                </p>
            </div>
            <ButtonView to="/" class="show-down">
                <p class="whitespace-nowrap font-semibold px-1">
                    <GetText file="checkout" code="backHome" />
                </p>
            </ButtonView>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import User from '@/scripts/User';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';

import {

} from '@heroicons/vue/24/outline';
import LoadingIcon from '@/components/cards/LoadingIcon.vue';
import ButtonView from '@/components/inputs/ButtonView.vue';
import GetText from '@/components/inputs/GetText.vue';

export default defineComponent({
    name: 'OrdersView',
    components: {
        LoadingIcon,
        ButtonView,
        GetText
    },
    setup() {
        return {
            User,
            checkout: undefined as any
        };
    },
    async mounted() {
        let intentId = this.$route.query.intentId ?? this.$route.query.payment_intent;
        await this.fetchCheckout(intentId as string);
        if (this.checkout.status.name === 'pending') {
            setInterval(() => this.fetchCheckout(intentId as string), 1000);
        }
    },
    methods: {
        async fetchCheckout(intentId: string) {
            const res = await API.RequestLogged(ROUTES.CHECKOUT.GET(intentId));
            if (res.error) {
                console.error(res.error);
                return;
            }

            this.checkout = res.data;
            this.$forceUpdate();
        }
    }
});
</script>
