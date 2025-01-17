<template>
    <div>
        <div v-if="checkout === undefined" class="show-up flex flex-col space-y-4 justify-center items-center p-2">
            <p class="text-2xl font-bold text-center">
                {{ $t('checkout.loading') }}
            </p>
            <FwSpinner class="w-8 h-8" />
        </div>
        <div v-if="checkout === null" class="show-up flex flex-col space-y-4 justify-center items-center p-2">
            <p class="text-2xl font-bold text-center">
                {{ $t('checkout.error.title') }}
            </p>
            <p class="text-xl font-semibold text-center">
                {{ $t('checkout.error.description') }}
            </p>
        </div>
        <div v-if="checkout !== undefined && checkout !== null"
            class="show-up flex flex-col space-y-32 justify-center items-center p-2">
            <div v-if="checkout.status.name === 'succeeded'" class="show-up flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    {{ $t('checkout.commandSuccess') }}
                </p>
                <p v-for="line in $t('checkout.commandSuccessDesc').split('\n')" class="text-lg md:text-xl font-semibold text-center">
                    {{ line }}
                </p>
            </div>
            <div v-if="checkout.status.name === 'failed'" class="show-up flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    {{ $t('checkout.commandFailed') }}
                </p>
                <p v-for="line in $t('checkout.commandFailedDesc').split('\n')" class="text-lg md:text-xl font-semibold text-center">
                    {{ line }}
                </p>
            </div>
            <div v-if="checkout.status.name === 'pending'" class="show-up flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    {{ $t('checkout.commandPending') }}
                </p>
                <p v-for="line in $t('checkout.commandPendingDesc').split('\n')" class="text-lg md:text-xl font-semibold text-center">
                    {{ line }}
                </p>
                <div class="pt-8">
                    <LoadingIcon class="w-8 h-8" />
                </div>
            </div>
            <div v-if="checkout.status.name === 'canceled'" class="show-up flex flex-col justify-center items-center">
                <p class="text-2xl md:text-3xl font-bold p-4 text-center">
                    {{ $t('checkout.commandCanceled') }}
                </p>
                <p v-for="line in $t('checkout.commandCanceledDesc').split('\n')" class="text-lg md:text-xl font-semibold text-center">
                    {{ line }}
                </p>
            </div>
            <UButton to="/" class="show-down">
                {{ $t('verbs.back') }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const checkout = ref<any>(undefined);

onMounted(async () => {
    const intentId = route.query.intentId ?? route.query.payment_intent;
    await fetchCheckout(intentId as string);
    if (checkout.value.status.name === 'pending') {
        setInterval(() => fetchCheckout(intentId as string), 1000);
    }
});

async function fetchCheckout(intentId: string) {
    const res = await API.RequestLogged(ROUTES.CHECKOUT.GET(intentId));
    if (res.error) {
        console.error(res.error);
        return;
    }

    checkout.value = res.data;
}

</script>
