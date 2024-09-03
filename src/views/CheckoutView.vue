<template>
    <div class="flex grow flex-col w-full h-full justify-center items-center">
        <div v-if="checkout === undefined" class="flex flex-col space-y-4 justify-center items-center">
            <p class="text-2xl font-bold">Récupération de la commande</p>
            <LoadingIcon class="w-8 h-8" />
        </div>
        <div v-if="checkout === null" class="flex flex-col space-y-4 justify-center items-center">
            <p class="text-2xl font-bold">Woops !</p>
            <p class="text-xl font-semibold">Impossible de récupérer la commande :/</p>
        </div>
        <div v-if="checkout !== undefined && checkout !== null"
            class="show-up flex flex-col space-y-32 justify-center items-center">
            <div v-if="checkout.status.name === 'succeeded'" class="flex flex-col justify-center items-center">
                <p class="text-3xl font-bold p-4">Commande validée ! ✨</p>
                <p class="text-xl font-semibold">Tout s'est bien passé.</p>
                <p class="text-xl font-semibold">Merci pour votre achat, et à bientôt !</p>
            </div>
            <div v-if="checkout.status.name === 'failed'" class="flex flex-col justify-center items-center">
                <p class="text-3xl font-bold p-4">Commande échouée 😢</p>
                <p class="text-xl font-semibold">Quelque chose ne s'est pas bien passé.</p>
                <p class="text-xl font-semibold">Veuillez réessayer plus tard.</p>
            </div>
            <div v-if="checkout.status.name === 'pending'" class="flex flex-col justify-center items-center">
                <p class="text-3xl font-bold p-4">En attente de validation ...</p>
                <p class="text-xl font-semibold">Votre commande est en cours de traitement.</p>
                <p class="text-xl font-semibold">Revenez plus tard pour voir son statut.</p>
            </div>
            <div v-if="checkout.status.name === 'canceled'" class="flex flex-col justify-center items-center">
                <p class="text-3xl font-bold p-4">Commande annulée</p>
                <p class="text-xl font-semibold">Votre commande a été annulée.</p>
                <p class="text-xl font-semibold">Veuillez réessayer plus tard.</p>
            </div>
            <ButtonView to="/" class="show-down">
                <p class="whitespace-nowrap font-semibold px-1">Revenir à l'accueil</p>
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

export default defineComponent({
    name: 'OrdersView',
    components: {
        LoadingIcon,
        ButtonView
    },
    setup() {
        return {
            User,
            checkout: undefined as any
        };
    },
    mounted() {
        let intentId = this.$route.query.intentId ?? this.$route.query.payment_intent;
        this.fetchCheckout(intentId as string);
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
