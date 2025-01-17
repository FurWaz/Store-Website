<template>
    <div id="stripe-div">

    </div>
</template>

<script lang="ts" setup>
declare const Stripe: any;

const props = defineProps<{
    clientSecret: string;
    userInformations: any;
}>();

const emit = defineEmits<{
    (e: 'error', error: any): void;
}>();

defineExpose({ handleSubmit });

const stripe = ref<any>(null);
const initialized = ref<boolean>(false);
const elements = ref<any>(null);

onMounted(() => {
    if (!import.meta.client) return;

    if (props.clientSecret) {
        initialize();
    }
});

async function loadStripeScript() {
    if (stripe.value) return;

    try {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.id = 'stripe-js';
            script.src = 'https://js.stripe.com/v3/';
            script.async = true;

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                reject(new Error('Stripe script failed to load.'));
            };

            document.head.appendChild(script);
        });
    } catch (error) {
        console.error('Failed to load Stripe script : ', error);
        return;
    }

    stripe.value = Stripe(import.meta.env.VITE_STRIPE_KEY);
}

async function initialize() {
    await loadStripeScript();

    if (initialized.value) return;
    initialized.value = true;

    const appearance = {
        theme: 'flat',
        variables: {
            colorPrimary: '#f97316',
            colorBackground: '#475569',
            colorText: '#e2e8f0',
            colorDanger: '#ef4444',
            fontFamily: 'Poppins, Helvetica, sans-serif',
            spacingUnit: '3px',
            borderRadius: '4px',
            // See all possible variables below
        },
    };
    elements.value = stripe.value.elements({ appearance, clientSecret: props.clientSecret });
    if (!elements.value) {
        console.error('Failed to initialize Stripe Elements');
        return;
    }

    const paymentElementOptions = {
        layout: "tabs",
        defaultValues: {
            billingDetails: {
                name: props.userInformations.name,
                email: props.userInformations.email,
                phone: props.userInformations.phone,
                address: {
                    line1: props.userInformations.address,
                    city: props.userInformations.city,
                    postalCode: props.userInformations.postalCode,
                    country: props.userInformations.country,
                    state: ''
                }
            }
        }
    };

    const paymentElement = elements.value.create("payment", paymentElementOptions);
    paymentElement.mount("#stripe-div");
}

async function handleSubmit() {
    const { error } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
            return_url: window.location.origin + "/checkout",
            receipt_email: 'fur.waz06@gmail.com'
        },
    });

    if (error) {
        console.error('Failed to confirm payment : ', error);
        emit('error', error);
        return;
    }
}
</script>