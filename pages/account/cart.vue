<template>
    <div class="flex flex-col w-full h-full min-h-full max-h-full overflow-y-auto">
        <div class="flex flex-col w-full h-fit">
            <div class="show-up flex w-full h-fit pb-4 md:pb-6 md:pt-2 justify-center items-center space-x-4 md:space-x-8">
                <UIcon name="i-heroicons-shopping-cart" class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                <h1 class="text-center"> {{ $t('account.cart.title') }} </h1>
            </div>
            <div v-if="products && products?.length > 0" class="flex grow flex-col md:flex-row h-full min-h-0 max-h-full w-full">
                <div class="flex overflow-hidden transition-all" :class="step === 'view' ? 'h-full md:w-[100%]' : 'h-0 md:h-[100%] md:w-[0%]'">
                    <div class="show-right flex flex-col h-full w-full border-2 border-slate-200 dark:border-slate-600 rounded-md md:mr-2">
                        <div class="flex w-full h-fit bg-slate-200 dark:bg-slate-600 justify-center items-center p-2">
                            <h3 class="w-[50%] lg:w-[20%]">
                                {{ $t('account.cart.product.title') }}
                            </h3>
                            <h3 class="hidden lg:flex w-[50%]">
                                {{ $t('account.cart.product.description') }}
                            </h3>
                            <h3 class="w-[25%] lg:w-[15%] text-center">
                                {{ $t('account.cart.product.quantity') }}
                            </h3>
                            <h3 class="w-[25%] lg:w-[15%] text-center">
                                {{ $t('account.cart.product.price') }}
                            </h3>
                        </div>
                        <div class="flex grow w-full h-full max-w-full min-h-0 max-h-full overflow-auto">
                            <div class="flex flex-col space-y-2 w-full h-fit p-2">
                                <CartProductCard v-for="(product, index) in products" :key="index" :product="product"
                                    @remove="onProductRemoved" @update="refresh" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="show-left flex flex-row md:flex-col w-full md:min-w-[40%] lg:min-w-[25%] md:w-fit h-fit md:h-full border-2 border-slate-200 dark:border-slate-600 rounded-md" :class="step === 'view' ? 'mt-2 md:mt-0' : ''">
                    <div class="hidden md:flex w-full h-fit bg-slate-200 dark:bg-slate-600 justify-center items-center p-2">
                        <h3> {{ $t('account.cart.summary') }} </h3>
                    </div>
                    <div class="flex flex-col grow w-full min-h-0 max-h-full h-full md:h-fit justify-center md:justify-end p-2 md:p-4">
                        <div class="hidden md:flex flex-col grow justify-start min-h-0 h-full max-h-full overflow-auto">
                            <div v-for="(product, index) in products" :key="index"
                                class="flex justify-center items-center card p-2 my-2">
                                <div class="w-[40%]">
                                    <h3> {{ product.product.title }} </h3>
                                </div>
                                <div class="flex w-[30%] justify-center items-center">
                                    <p> {{ product.quantity }} x {{ product.product.price }} € </p>
                                </div>
                                <div class="flex w-[30%] justify-center items-center">
                                    <p> {{ Math.round(product.quantity * product.product.price * 100) / 100 }} € </p>
                                </div>
                            </div>
                        </div>
                        <span class="hidden md:flex h-0.5 w-full rounded-full bg-slate-200 dark:bg-slate-600 my-2 md:my-4" />
                        <div class="flex justify-between items-center w-full h-fit">
                            <h2> {{ $t('account.cart.total') }} </h2>
                            <div class="bg-slate-200 dark:bg-slate-600 rounded-md px-2 py-1">
                                <h3> {{ total }} </h3>
                            </div>
                        </div>
                    </div>
                    <span v-if="step === 'view'" class="hidden md:flex w-full h-1 bg-slate-200 dark:bg-slate-600" />
                    <div v-if="step === 'view'" class="flex w-full h-fit p-2 md:p-4">
                        <UButton @click="goToInformations" size="lg" class="w-full" :loading="viewContinueLoading">
                            <span class="w-full text-center">{{ $t('verbs.continue') }}</span>
                        </UButton>
                    </div>
                </div>
                <div class="overflow-hidden transition-all" :class="step !== 'view' ? 'h-full md:w-[100%] pt-2 md:pt-0' : 'h-0 md:h-[100%] md:w-[0%]'">
                    <div class="show-left flex grow flex-col overflow-auto h-full max-h-full min-h-0 md:h-full border-2 border-slate-200 dark:border-slate-600 rounded-md md:ml-2">
                        <div class="hidden md:flex w-full h-fit bg-slate-200 dark:bg-slate-600 justify-center items-center p-2">
                            <h3 class="overflow-hidden text-center transition-all" :class="step === 'informations' ? 'w-full' : 'w-0'">
                                {{ $t('account.cart.informations.title') }}
                            </h3>
                            <h3 class="overflow-hidden text-center transition-all" :class="step === 'payment' ? 'w-full' : 'w-0'">
                                {{ $t('account.cart.payment') }}
                            </h3>
                        </div>
                        <div class="flex justify-center items-center w-full h-min p-2 md:p-4 min-h-[25em]">
                            <div class="flex flex-col space-y-4 overflow-auto transition-all" :class="step === 'informations' ? 'w-full h-full' : 'w-0 h-0'">
                                <div>
                                    <h3 class="text-center"> {{ $t('account.cart.informations.my') }} </h3>
                                </div>
                                <UForm ref="form" :schema="userInformationsSchema" :state="userInformationsState" @submit="goToPayment"
                                    class="flex flex-col md:flex-row w-fit max-w-full p-4 card space-y-2 md:space-y-0 md:space-x-8 m-auto">
                                    <div class="flex flex-col justify-start items-start space-y-2 md:space-y-4">
                                        <UFormGroup :label="$t('account.cart.informations.lastName')" name="lastName" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.lastName" type="text" autocomplete="family-name"
                                                :placeholder="$t('account.cart.informations.lastName')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.firstName')" name="firstName" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.firstName" type="text" autocomplete="given-name"
                                                :placeholder="$t('account.cart.informations.firstName')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.email')" name="email" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.email" type="email" autocomplete="email"
                                                :placeholder="$t('account.cart.informations.email')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.phone')" name="phone" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.phone" type="phone" autocomplete="phone"
                                                :placeholder="$t('account.cart.informations.phone')" />
                                        </UFormGroup>
                                    </div>
                                    <div class="flex flex-col justify-start items-start space-y-2 md:space-y-4">
                                        <UFormGroup :label="$t('account.cart.informations.address')" name="address" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.address" type="text" autocomplete="street-address"
                                                :placeholder="$t('account.cart.informations.address')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.city')" name="city" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.city" type="text" autocomplete="address-level2"
                                                :placeholder="$t('account.cart.informations.city')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.postalCode')" name="postalCode" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.postalCode" type="text" autocomplete="postal-code"
                                                :placeholder="$t('account.cart.informations.postalCode')" />
                                        </UFormGroup>
                                        <UFormGroup :label="$t('account.cart.informations.country')" name="country" class="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center w-full">
                                            <UInput v-model="userInformationsState.country" type="text" autocomplete="country-name"
                                                :placeholder="$t('account.cart.informations.country')" />
                                        </UFormGroup>
                                    </div>
                                </UForm>
                                <UFormGroup :label="$t('account.cart.informations.save')" name="save" class="flex space-x-4 justify-center items-center mx-auto">
                                    <UCheckbox v-model="userInformationsState.saveInfos" class="pb-0.5" />
                                </UFormGroup>
                            </div>
                            <div class="flex flex-col h-fit justify-between items-center overflow-auto transition-all" :class="step === 'payment' ? 'w-full' : 'w-0'">
                                <h3 class="md:hidden overflow-hidden text-center transition-all mb-4" :class="step === 'payment' ? 'w-full' : 'w-0'">
                                    {{ $t('account.cart.payment') }}
                                </h3>
                                <div class="flex w-fit h-fit p-2 md:p-4 border-2 border-slate-600 rounded-md space-x-8">
                                    <StripeCard ref="CardStripe" v-if="step === 'payment'" :clientSecret="clientSecret" :userInformations="userInformationsState" />
                                </div>
                            </div>
                        </div>
                        <span class="hidden md:flex w-full h-0.5 bg-slate-200 dark:bg-slate-600" />
                        <div class="flex w-full h-fit p-2 md:p-4 justify-between">
                            <UButton leading icon="i-heroicons-chevron-left" @click="setStep(step === 'payment' ? 'informations' : 'view')" class="flex w-fit h-fit" variant="ghost" color="gray">
                                {{ $t('verbs.back') }}
                            </UButton>
                            <UButton trailing icon="i-heroicons-chevron-right" @click="goToPayment" class="flex w-fit h-fit" :loading="informationsContinueLoading || payementContinueLoading">
                                {{ $t('verbs.continue') }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="products && products?.length === 0" class="show-down flex flex-col w-full h-full justify-center items-center space-y-2 pt-8">
                <h2 class="text-center">{{ $t('account.cart.empty.title') }}</h2>
                <p class="text-center">{{ $t('account.cart.empty.description') }}</p>
                <div class="pt-8">
                    <UButton to="/products">
                        {{ $t('account.cart.empty.button') }}
                    </UButton>
                </div>
            </div>
            <div v-if="!products" class="show-down flex flex-col w-full h-full justify-center items-center space-y-2 pt-8">
                <h2 class="text-center">{{ $t('account.cart.loading.title') }}</h2>
                <p class="text-center">{{ $t('account.cart.loading.description') }}</p>
                <div class="pt-8">
                    <FwSpinner class="w-8 h-8" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { object, string, boolean, type InferType } from 'yup';
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const step = ref('');
const products = ref<null|any[]>(null);
const total = ref<string>('');
const clientSecret = ref<string>('');

const form = ref<any>(null);
const userInformationsSchema = object({
    lastName: string().required(t('account.cart.informations.specifyLastName')),
    firstName: string().required(t('account.cart.informations.specifyFirstName')),
    email: string().email().required(t('account.cart.informations.specifyEmail')),
    phone: string().required(t('account.cart.informations.specifyPhone')),
    address: string().required(t('account.cart.informations.specifyAddress')),
    city: string().required(t('account.cart.informations.specifyCity')),
    postalCode: string().required(t('account.cart.informations.specifyPostalCode')),
    country: string().required(t('account.cart.informations.specifyCountry')),
    saveInfos: boolean().required(),
});
type UserInformations = InferType<typeof userInformationsSchema>;

const userInformationsState = ref<UserInformations>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    saveInfos: false
});

const CardStripe = ref();

watch(() => route.fullPath, (value) => {
    const queryStep = new URLSearchParams(window.location.search).get('step');
    if (queryStep && queryStep !== step.value) {
        setStep(queryStep);
    }
});

onMounted(async () => {
    if (!import.meta.client) return;

    // If user is connected, try to fill its informations before all
    if (User.Current) {
        const res = await API.RequestLogged(ROUTES.USER.GET());
        if (res.error) {
            console.error('Error loading user : ', res.message);
        } else {
            const hasUserInfos = res.data.lastName !== null;
            if (hasUserInfos) {
                userInformationsState.value = {
                    lastName: res.data.lastName,
                    firstName: res.data.firstName,
                    email: res.data.email,
                    phone: res.data.phone,
                    address: res.data.address,
                    city: res.data.city,
                    postalCode: res.data.postalCode,
                    country: res.data.country,
                    saveInfos: hasUserInfos
                };
            }
        }
    }

    const urlStep = new URLSearchParams(window.location.search).get('step');
    if (!urlStep) setStep('view');
    else setStep(urlStep);

    fetchCart();
});

async function fetchCart() {
    const res = await API.RequestLogged(ROUTES.CART.GET());
    if (res.error) {
        console.error('Error loading cart : ', res.message);
        return;
    }

    products.value = res.data.products;
    refresh();
}

const viewContinueLoading = ref(false);
async function goToInformations() {
    viewContinueLoading.value = true;
    const res = await API.RequestLogged(ROUTES.USER.GET());
    if (res.error) {
        console.error('Error loading user : ', res.message);
        viewContinueLoading.value = false;
        return;
    }

    User.Current?.updateInformations(res.data);

    viewContinueLoading.value = false;
    setStep('informations');
}

const informationsContinueLoading = ref(false);
const payementContinueLoading = ref(false);
async function goToPayment(ev: any, btn: any) {
    // validate form before going to payment
    const isValid = await form.value.validate();
    if (!isValid) return;

    // If button pressed in payement step, we wanted to validate StripeCard
    if (step.value === 'payment') {
        if (!CardStripe) {
            console.error('Failed to get CardStripe ref');
            return;
        }
        payementContinueLoading.value = true;
        console.log(CardStripe, CardStripe.value, CardStripe.value?.handleSubmit);
        await (CardStripe as any).value.handleSubmit();
        payementContinueLoading.value = false;
        return;
    }

    informationsContinueLoading.value = true;
    // TODO : Pass the user informations to the request
    const res = await API.RequestLogged(ROUTES.CHECKOUT.START(userInformationsState.value));
    if (res.error) {
        console.error('Error starting checkout : ', res.message);
        informationsContinueLoading.value = false;
        return;
    }

    clientSecret.value = res.data.clientSecret;

    informationsContinueLoading.value = false;
    setStep('payment');
}

function onProductRemoved(id: number) {
    products.value = products.value?.filter((product) => product.product.id !== id) ?? [];
}

function refresh() {
    if (!products.value) return;

    const amount = products.value.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
    total.value = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

async function setStep(in_step: string) {
    step.value = in_step;
    router.push({ query: { step: in_step } });

    if (in_step === 'payment') {
        // check user infos first, if null go back to informations
        const isValid = await form.value?.validate() ?? false;
        if (!isValid) setStep('informations');
    }
}

</script>
