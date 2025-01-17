<template>
    <div class="flex flex-col overflow-y-auto min-h-0 max-h-full">
        <div class="show-down flex w-full h-fit justify-center items-center py-8">
            <div class="flex space-x-4 h-fit w-fit justify-center items-center">
                <FwIcon class="w-24 h-24" />
                <h1 class="text-4xl font-bold"> {{ $t('store.title') }} </h1>
            </div>
        </div>

        <div class="flex flex-col w-full px-4 md:w-2/3 lg:w-1/2 flex-col mx-auto space-y-24 pb-4">
            <div class="show-right flex w-full h-fit justify-between items-center">
                <div class="w-fit h-fit space-y-4">
                    <h2 class="text-2xl"> Tous les produits FurWaz en <span class="highlight">un seul et même endroit</span> ! </h2>
                    <div class="space-y-2">
                        <p> Une plateforme centralisée pour la gestion de tous les produits FurWaz. </p>
                        <p> Un seul compte, un seul mot de passe, un seul panier, un seul endroit ! </p>
                    </div>
                </div>
                <div class="hidden md:flex w-fit h-fit">
                    <UIcon name="i-heroicons-map-pin" class="w-32 h-32" />
                </div>
            </div>

            <div class="show-left flex w-full h-fit justify-between items-center">
                <div class="hidden md:flex w-fit h-fit">
                    <UIcon name="i-heroicons-shield-check" class="w-32 h-32" />
                </div>
                <div class="w-fit h-fit space-y-4">
                    <h2 class="text-2xl"> Des paiements <span class="highlight">sécurisés</span> ! </h2>
                    <div class="space-y-2">
                        <p> Des paiements sûrs et sécurisés de bout en bout grâce à <a href="https://stripe.com"><i>Stripe</i></a>. </p>
                        <p> Vos données sont en sécurité et ne seront jamais partagées avec des tiers. </p>
                    </div>
                </div>
            </div>

            <div class="show-right flex w-full h-fit justify-between items-center">
                <div class="w-fit h-fit space-y-4">
                    <h2 class="text-2xl"> La gestion de vos informations en <span class="highlight">un clic</span> ! </h2>
                    <div class="space-y-2">
                        <p> Contrôlez vos informations personnelles et informations de paiement depuis une page unique. </p>
                        <p> Une expérience utilisateur simplifiée pour une utilisation plus agréable des services FurWaz. </p>
                    </div>
                </div>
                <div class="hidden md:flex w-fit h-fit">
                    <UIcon name="i-heroicons-users" class="w-32 h-32" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UIcon } from '#components';

const route = useRoute()
const { t } = useI18n();

useSeoMeta({
    title: `${t('store.title')} - ${t('home.title')}`,
    description: `${t('home.description')}`,
    ogTitle: `${t('store.title')} - ${t('home.title')}`,
    ogDescription: `${t('home.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://store.furwaz.com' + route.fullPath
});

</script>

<style>
.highlight {
    @apply text-primary;
}

i {
    @apply text-primary;
}
</style>