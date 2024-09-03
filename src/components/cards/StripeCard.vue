<template>
    <div id="stripe-div">

    </div>
</template>

<script lang="ts">
import 'https://js.stripe.com/v3/';
import { defineComponent } from 'vue';

declare const Stripe: any;

export default defineComponent({
    name: 'StripeCard',
    props: {
        clientSecret: {
            type: String,
            required: true
        },
        userInformations: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            stripe: Stripe(import.meta.env.VITE_STRIPE_KEY),
            initialized: false,
            elements: null as any
        };
    },
    mounted() {
        if (this.clientSecret) this.initialize();
    },
    methods: {
        async initialize() {
            if (this.initialized) return;
            this.initialized = true;

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
            this.elements = this.stripe.elements({ appearance, clientSecret: this.clientSecret });
            if (!this.elements) {
                console.error('Failed to initialize Stripe Elements');
                return;
            }

            const paymentElementOptions = {
                layout: "tabs",
                defaultValues: {
                    billingDetails: {
                        name: this.userInformations.name,
                        email: this.userInformations.email,
                        phone: this.userInformations.phone,
                        address: {
                            line1: this.userInformations.address,
                            city: this.userInformations.city,
                            postalCode: this.userInformations.postalCode,
                            country: this.userInformations.country,
                            state: ''
                        }
                    }
                }
            };

            const paymentElement = this.elements.create("payment", paymentElementOptions);
            paymentElement.mount("#stripe-div");
        },
        async handleSubmit() {
            const elements = this.elements;
            const { error } = await this.stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + "/checkout",
                    receipt_email: 'fur.waz06@gmail.com'
                },
            });

            if (error) {
                console.error('Failed to confirm payment : ', error);
                this.$emit('error', error);
                return;
            }
        }
    }
});
</script>