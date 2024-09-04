<template>
    <div class="flex flex-col w-full h-full min-h-0 max-h-full">
        <div class="show-up flex w-full h-fit p-4 pb-2 md:p-6 justify-center items-center space-x-4 md:space-x-8">
            <ShoppingCartIcon class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
            <h1 class="text-center text-xl md:text-2xl lg:text-4xl font-bold">
                <GetText file="cart" code="title" />
            </h1>
        </div>
        <div v-if="products && products.length > 0"
            class="flex flex-col md:flex-row h-full min-h-0 max-h-full w-full p-2 md:p-4">
            <div class="overflow-hidden transition-all duration-500 ease-out-expo"
                :class="step === 'view' ? 'h-[100%] md:w-[100%]' : 'h-[0%] md:h-[100%] md:w-[0%]'">
                <div class="show-right flex flex-col h-full border-4 border-slate-600 rounded-md md:mr-4">
                    <div class="flex w-full h-fit bg-slate-600 justify-center items-center p-2">
                        <p class="w-[50%] lg:w-[20%] text-xl font-bold">
                            <GetText file="cart" code="product" />
                        </p>
                        <p class="hidden lg:flex w-[50%] text-xl font-bold">
                            <GetText file="cart" code="description" />
                        </p>
                        <p class="w-[25%] lg:w-[15%] text-xl font-bold text-center">
                            <GetText file="cart" code="quantity" />
                        </p>
                        <p class="w-[25%] lg:w-[15%] text-xl font-bold text-center">
                            <GetText file="cart" code="price" />
                        </p>
                    </div>
                    <div class="flex w-full h-full max-w-full min-h-0 max-h-full overflow-auto">
                        <div class="flex flex-col space-y-2 w-full h-fit p-2">
                            <CartProductCard v-for="(product, index) in products" :key="index" :product="product"
                                @remove="onProductRemoved" @update="refresh" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="show-left flex flex-row md:flex-col w-full md:min-w-[40%] lg:min-w-[25%] md:w-fit h-fit md:h-full border-4 border-slate-600 rounded-md"
                :class="step === 'view' ? 'mt-2 md:mt-0' : ''">
                <div class="hidden md:flex w-full h-fit bg-slate-600 justify-center items-center p-2">
                    <p class="text-xl font-bold">
                        <GetText file="cart" code="summary" />
                    </p>
                </div>
                <div
                    class="flex flex-col grow w-full min-h-0 max-h-full h-full md:h-fit justify-center md:justify-end p-2 md:p-4">
                    <div class="hidden md:flex flex-col grow justify-start min-h-0 h-full max-h-full overflow-auto">
                        <div v-for="(product, index) in products" :key="index"
                            class="flex justify-center items-center border-2 border-slate-600 rounded-md p-2 my-2">
                            <div class="w-[40%]">
                                <p class="text-lg font-bold">
                                    {{ product.product.name }}
                                </p>
                            </div>
                            <div class="flex w-[30%] justify-center items-center">
                                <p class="text-lg font-semibold">
                                    {{ product.quantity }} x {{ product.product.price }} €
                                </p>
                            </div>
                            <div class="flex w-[30%] justify-center items-center">
                                <p class="text-lg font-semibold">
                                    {{ product.quantity * product.product.price }} €
                                </p>
                            </div>
                        </div>
                    </div>
                    <span class="hidden md:flex h-1 w-full rounded-full bg-slate-600 my-2 md:my-4" />
                    <div class="flex justify-between w-full h-fit">
                        <p class="text-xl md:text-3xl font-bold">
                            <GetText file="cart" code="total" />
                        </p>
                        <p class="text-lg md:text-2xl font-semibold ml-8 px-4 rounded-md bg-slate-600 text-center">
                            {{ total }}
                        </p>
                    </div>
                </div>
                <span v-if="step === 'view'" class="hidden md:flex w-full h-1 bg-slate-600" />
                <div v-if="step === 'view'" class="flex w-full h-fit p-2 md:p-4">
                    <ButtonView @click="goToInformations" class="flex w-full h-fit text-orange-500">
                        <p class="text-md font-semibold">
                            <GetText file="verbs" code="continue" />
                        </p>
                    </ButtonView>
                </div>
            </div>
            <div class="overflow-hidden transition-all duration-500 ease-out-expo"
                :class="step !== 'view' ? 'h-[100%] md:w-[100%] pt-2 md:pt-0' : 'h-[0%] md:h-[100%] md:w-[0%]'">
                <div
                    class="show-left flex flex-col overflow-auto h-full max-h-full min-h-0 md:h-full border-4 border-slate-600 rounded-md md:ml-4">
                    <div class="hidden md:flex w-full h-fit bg-slate-600 justify-center items-center p-2">
                        <p class="text-xl font-bold overflow-hidden text-center transition-all duration-500 ease-out-expo"
                            :class="step === 'informations' ? 'w-full' : 'w-0'">
                            <GetText file="cart" code="informations" />
                        </p>
                        <p class="text-xl font-bold overflow-hidden text-center transition-all duration-500 ease-out-expo"
                            :class="step === 'payment' ? 'w-full' : 'w-0'">
                            <GetText file="cart" code="payment" />
                        </p>
                    </div>
                    <div class="flex grow w-full min-h-0 max-h-full h-fit p-2 md:p-4">
                        <div class="flex flex-col space-y-4 overflow-scroll transition-all duration-500 ease-out-expo"
                            :class="step === 'informations' ? 'w-full' : 'w-0'">
                            <div>
                                <p class="text-lg font-semibold text-center">
                                    <GetText file="cart" code="informationsTitle" />
                                </p>
                            </div>
                            <div
                                class="flex flex-col md:flex-row w-fit max-w-full p-4 border-2 border-slate-600 rounded-md space-y-2 md:space-y-0 md:space-x-8 m-auto">
                                <div class="flex flex-col justify-start items-start space-y-4">
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="lastName" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="lastname"
                                            :value="User.CurrentUser?.lastName || ''" autocomplete="family-name"
                                            placeholder="cart::lastName" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="firstName" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="firstname"
                                            :value="User.CurrentUser?.firstName || ''" autocomplete="given-name"
                                            placeholder="cart::firstName" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="email" />
                                        </p>
                                        <InputView @input="updateIdForm" type="email" name="email"
                                            :value="User.CurrentUser?.email || ''" autocomplete="email"
                                            placeholder="cart::email" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="phone" />
                                        </p>
                                        <InputView @input="updateIdForm" type="phone" name="phone"
                                            :value="User.CurrentUser?.phone || ''" autocomplete="phone"
                                            placeholder="cart::phone" />
                                    </div>
                                </div>
                                <span class="w-1 h-full bg-slate-600 rounded-full" />
                                <div class="flex flex-col justify-start items-start space-y-4">
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="address" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="address"
                                            :value="User.CurrentUser?.address || ''" autocomplete="street-address"
                                            placeholder="cart::address" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="city" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="city"
                                            :value="User.CurrentUser?.city || ''" autocomplete="address-level2"
                                            placeholder="cart::city" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="zip" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="zip"
                                            :value="User.CurrentUser?.postalCode || ''" autocomplete="postal-code"
                                            placeholder="cart::zip" />
                                    </div>
                                    <div class="flex space-x-4 justify-between items-center w-full">
                                        <p class="text-md font-semibold">
                                            <GetText file="cart" code="country" />
                                        </p>
                                        <InputView @input="updateIdForm" type="text" name="country"
                                            :value="User.CurrentUser?.country || ''" autocomplete="country-name"
                                            placeholder="cart::country" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-4 m-auto">
                                <p class="text-lg font-semibold text-center">
                                    <GetText file="cart" code="saveInfos" />
                                </p>
                                <InputView type="checkbox" name="save" />
                            </div>
                        </div>
                        <div class="flex justify-center overflow-auto transition-all duration-500 ease-out-expo"
                            :class="step === 'payment' ? 'w-full' : 'w-0'">
                            <div
                                class="flex w-fit h-fit p-2 md:p-4 border-2 border-slate-600 rounded-md space-x-8 m-auto">
                                <StripeCard ref="stripe-card" v-if="step === 'payment'" :clientSecret="clientSecret"
                                    :userInformations="userInformations" />
                            </div>
                        </div>
                    </div>
                    <span class="hidden md:flex w-full h-1 bg-slate-600" />
                    <div class="flex w-full h-fit p-2 md:p-4 justify-between">
                        <ButtonView @click="setStep(step === 'payment' ? 'informations' : 'view')"
                            class="flex w-fit h-fit">
                            <ChevronLeftIcon class="w-6 h-6" />
                            <p class="text-md font-semibold">
                                <GetText file="verbs" code="back" />
                            </p>
                        </ButtonView>
                        <ButtonView :disabled="disableContinue" @click="goToPayment"
                            class="flex w-fit h-fit text-orange-500">
                            <p class="text-md font-semibold">
                                <GetText file="verbs" code="continue" />
                            </p>
                            <ChevronRightIcon class="w-6 h-6" />
                        </ButtonView>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="products && products.length === 0"
            class="show-down flex flex-col grow w-full h-full justify-center items-center space-y-2 p-2">
            <p class="text-2xl font-semibold text-center">
                <GetText file="cart" code="emptyCart" />
            </p>
            <p class="text-lg font-semibold text-center">
                <GetText file="cart" code="emptyCartDesc" />
            </p>
            <div class="show-down flex pt-16">
                <ButtonView to="/">
                    <p class="text-md font-semibold">
                        <GetText file="cart" code="emptyCartBtn" />
                    </p>
                </ButtonView>
            </div>
        </div>
        <div v-if="!products"
            class="show-down flex flex-col grow w-full h-full justify-center items-center space-y-2 p-2">
            <p class="text-2xl font-semibold text-center">
                <GetText file="cart" code="loadingCart" />
            </p>
            <p class="text-lg font-semibold text-center">
                <GetText file="cart" code="loadingCartDesc" />
            </p>
            <div class="pt-8">
                <LoadingIcon class="w-8 h-8" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonView from '@/components/inputs/ButtonView.vue';
import User from '@/scripts/User';

import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline';
import CartProductCard from '@/components/cards/CartProductCard.vue';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';
import InputView from '@/components/inputs/InputView.vue';
import StripeCard from '@/components/cards/StripeCard.vue';
import GetText from '@/components/inputs/GetText.vue';
import LoadingIcon from '@/components/cards/LoadingIcon.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        ShoppingCartIcon,
        ButtonView,
        CartProductCard,
        ChevronRightIcon,
        ChevronLeftIcon,
        InputView,
        StripeCard,
        GetText,
        LoadingIcon
    },
    setup() {
        const queryStep = new URLSearchParams(window.location.search).get('step');

        return {
            User,
            products: null as any[] | null,
            total: '',
            clientSecret: '',
            step: queryStep,
            disableContinue: false,
            userInformations: null as any
        };
    },
    async mounted() {
        this.setStep('view');

        this.fetchCart();
        this.updateIdForm();
    },
    watch: {
        $route() {
            const queryStep = new URLSearchParams(window.location.search).get('step');
            if (queryStep && queryStep !== this.step) {
                this.setStep(queryStep);
            }
        }
    },
    methods: {
        async fetchCart() {
            const res = await API.RequestLogged(ROUTES.CART.GET());
            if (res.error) {
                console.error('Error loading cart : ', res.message);
                return;
            }

            this.products = res.data.products;
            this.refresh();
            this.$forceUpdate();
        },
        async goToInformations(ev: any, btn: any) {
            btn.setLoading(true);
            const res = await API.RequestLogged(ROUTES.USER.GET());
            if (res.error) {
                console.error('Error loading user : ', res.message);
                btn.setLoading(false);
                return;
            }

            User.CurrentUser?.update(res.data);
            this.updateIdForm();
            this.$forceUpdate();

            btn.setLoading(false);
            this.setStep('informations');
        },
        async goToPayment(ev: any, btn: any) {
            if (this.step === 'payment') {
                const StripeCard = this.$refs['stripe-card'] as any;
                if (!StripeCard) {
                    console.error('Failed to get StripeCard ref');
                    return;
                }
                btn.setLoading(true);
                await StripeCard.handleSubmit();
                btn.setLoading(false);
                return;
            }

            this.updateIdForm();

            btn.setLoading(true);
            // TODO : Pass the user informations to the request
            const res = await API.RequestLogged(ROUTES.CHECKOUT.START(this.userInformations));
            if (res.error) {
                console.error('Error starting checkout : ', res.message);
                btn.setLoading(false);
                return;
            }

            this.clientSecret = res.data.clientSecret;

            btn.setLoading(false);
            this.setStep('payment');
        },
        async onProductRemoved(id: number) {
            this.products = this.products?.filter((product) => product.product.id !== id) ?? [];
            this.$forceUpdate();
        },
        refresh() {
            const amount = this.products?.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
            this.total = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            }).format(amount);
            this.$forceUpdate();
        },
        setStep(step: string) {
            this.step = step;
            this.$forceUpdate();
        },
        updateIdForm() {
            const inputs = [
                { name: 'lastName', input: 'input[name="lastname"]' },
                { name: 'firstName', input: 'input[name="firstname"]' },
                { name: 'email', input: 'input[name="email"]' },
                { name: 'phone', input: 'input[name="phone"]' },
                { name: 'address', input: 'input[name="address"]' },
                { name: 'city', input: 'input[name="city"]' },
                { name: 'postalCode', input: 'input[name="zip"]' },
                { name: 'country', input: 'input[name="country"]' }
            ].map((obj) => ({ name: obj.name, input: document.querySelector(obj.input) as HTMLInputElement }));

            if (!inputs || inputs.some((input) => !input.input)) {
                this.disableContinue = true;
                this.$forceUpdate();
                return;
            }

            const data = inputs.reduce((acc, input) => {
                acc[input.name] = input.input.value;
                return acc;
            }, {} as Record<string, string>);

            this.userInformations = {
                ...data,
                saveInfos: (document.querySelector('input[name="save"]') as any)?.checked ?? false
            }

            const filled = Object.values(data).every((value) => value && value.length > 0);
            this.disableContinue = !filled;

            this.$forceUpdate();
        }
    }
});
</script>
