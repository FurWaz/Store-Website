<template>
    <div class="flex flex-col grow justify-start items-center pt-4 px-2 space-y-8 overflow-y-auto">
        <div class="show-down flex flex-col w-fit min-w-0 max-w-full h-fit justify-center items-center card p-2 space-y-8 min-w-[20em]">
            <h2 class="w-full text-center">
                {{ $t('account.informations.myAccount') }}
            </h2>
            <div class="flex space-x-4 justify-center items-center card w-fit p-2">
                <div class="flex w-fit h-full justify-center items-center">
                    <UIcon name="i-heroicons-user" class="w-10 h-10" />
                </div>
                <div class="flex flex-col w-fit h-full justify-center items-start">
                    <h3> {{ User.Current?.pseudo ?? '- - - - - - -' }} </h3>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 md:space-x-8">
                <UButton color="red" variant="outline" @click="removeAccountPopup = true" leading icon="i-heroicons-trash">
                    {{ $t('account.informations.deleteAccount.button') }}
                </UButton>
                <UButton @click="User.Forget()">
                    {{ $t('verbs.logout') }}
                </UButton>
            </div>
        </div>
        <div class="show-down flex flex-col w-fit min-w-0 max-w-full h-fit justify-center items-center card p-2 space-y-8 min-w-[20em]">
            <h2 class="w-full text-center">
                {{ $t('account.informations.myInfos') }}
            </h2>
            <UForm ref="form" :schema="userInformationsSchema" :state="userInformationsState" @submit="updateInfos"
                class="flex flex-col w-fit max-w-full p-4 card space-y-2 m-auto">
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
            <UAlert
                v-show="updateError" @close="updateError = null" :title="updateError ?? ''"
                variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
            />
            <UAlert
                v-show="updateSuccess" @close="updateSuccess = null" :title="updateSuccess ?? ''"
                variant="subtle" color="green" class="show-down" icon="i-heroicons-information-circle"
                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'green', variant: 'ghost', padded: false }"
            />
            <div class="flex flex-col md:flex-row md:justify-between w-full space-y-2 md:space-y-0 md:space-x-8">
                <UButton color="red" variant="outline" @click="removeInfosPopup = true" leading icon="i-heroicons-trash">
                    {{ $t('account.informations.deleteInfos.button') }}
                </UButton>
                <UButton @click="updateInfos" :disabled="updateButtonDisabled || !isUserInfosModified" :loading="updateButtonLoading">
                    {{ $t('verbs.update') }}
                </UButton>
            </div>
        </div>
    </div>
    <UModal v-model="removeAccountPopup">
        <div class="flex flex-col justify-center items-center p-4">
            <div class="flex flex-col justify-center items-center space-y-4">
                <h2 class="text-center"> {{ $t('account.informations.deleteAccount.title') }} </h2>
                <p class="text-center"> {{ $t('account.informations.deleteAccount.description') }} </p>
            </div>
            <div class="flex h-fit w-full px-2 pb-4 pt-8">
                <span class="h-0.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full" />
            </div>
            <div class="flex w-full h-fit justify-between">
                <UButton variant="ghost" color="gray" @click="removeAccountPopup = false">
                    {{ $t('verbs.cancel') }}
                </UButton>
                <UButton color="red" variant="solid" @click="deleteAccount" leading icon="i-heroicons-trash">
                    {{ $t('verbs.delete') }}
                </UButton>
            </div>
        </div>
    </UModal>
    <UModal v-model="removeInfosPopup">
        <div class="flex flex-col justify-center items-center p-4">
            <div class="flex flex-col justify-center items-center space-y-4">
                <h2 class="text-center"> {{ $t('account.informations.deleteInfos.title') }} </h2>
                <p class="text-center"> {{ $t('account.informations.deleteInfos.description') }} </p>
            </div>
            <UAlert v-show="deleteInfosError" @close="deleteInfosError = null" :title="deleteInfosError ?? ''"
                variant="subtle" color="red" class="show-down mt-4" icon="i-heroicons-exclamation-triangle"
                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
            />
            <UAlert v-show="deleteInfosSuccess" @close="deleteInfosSuccess = null" :title="deleteInfosSuccess ?? ''"
                variant="subtle" color="green" class="show-down mt-4" icon="i-heroicons-information-circle"
                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'green', variant: 'ghost', padded: false }"
            />
            <div class="flex h-fit w-full px-2 pb-4 pt-8">
                <span class="h-0.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full" />
            </div>
            <div class="flex w-full h-fit justify-between">
                <UButton variant="ghost" color="gray" @click="removeInfosPopup = false">
                    {{ $t('verbs.cancel') }}
                </UButton>
                <UButton color="red" variant="solid" @click="deleteInfos" leading icon="i-heroicons-trash" :loading="deleteInfosButtonLoading" :disabled="deleteInfosButtonDisabled">
                    {{ $t('verbs.delete') }}
                </UButton>
            </div>
        </div>
    </UModal>
</template>

<script lang="ts" setup>
import { object, string, boolean, type InferType } from 'yup';
const { t } = useI18n();

const form = ref<any>(null);
const userInformationsSchema = object({
    lastName: string().required(t('account.cart.informations.specifyLastName')),
    firstName: string().required(t('account.cart.informations.specifyFirstName')),
    email: string().email().required(t('account.cart.informations.specifyEmail')),
    phone: string().required(t('account.cart.informations.specifyPhone')),
    address: string().required(t('account.cart.informations.specifyAddress')),
    city: string().required(t('account.cart.informations.specifyCity')),
    postalCode: string().required(t('account.cart.informations.specifyPostalCode')),
    country: string().required(t('account.cart.informations.specifyCountry'))
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
    country: ''
});
const baseUserInformationsState = ref<UserInformations>({ ...userInformationsState.value });

const removeAccountPopup = ref(false);
const removeInfosPopup = ref(false);
const updateButtonDisabled = ref(false);
const updateButtonLoading = ref(false);

const isUserInfosModified = computed(() => {
    return JSON.stringify(userInformationsState.value) !== JSON.stringify(baseUserInformationsState.value);
});

async function deleteAccount() {
    const res = await API.RequestLogged(ROUTES.USER.DELETE());
    if (res.error) {
        console.error('Error deleting user : ', res.message);
    } else {
        User.Forget();
    }
}

const deleteInfosError = ref<string | null>(null);
const deleteInfosSuccess = ref<string | null>(null);
const deleteInfosButtonDisabled = ref(false);
const deleteInfosButtonLoading = ref(false);

async function deleteInfos() {
    deleteInfosButtonDisabled.value = true;
    deleteInfosButtonLoading.value = true;
    const res = await API.RequestLogged(ROUTES.USER.INFOS.DELETE());
    if (res.error) {
        console.error('Error deleting user informations : ', res.message);
        deleteInfosError.value = res.message;
        setTimeout(() => { deleteInfosError.value = null; }, 4000);
    } else {
        deleteInfosSuccess.value = res.message;
        setTimeout(() => { deleteInfosSuccess.value = null; }, 2000);
        setTimeout(() => { removeInfosPopup.value = false; }, 2500);
        await fetchInfos();
    }
    deleteInfosButtonDisabled.value = false;
    deleteInfosButtonLoading.value = false;
}

const updateError = ref<string | null>(null);
const updateSuccess = ref<string | null>(null);
async function updateInfos() {
    updateButtonLoading.value = true;
    updateButtonDisabled.value = true;
    const res = await API.RequestLogged(ROUTES.USER.INFOS.UPDATE(userInformationsState.value));
    if (res.error) {
        console.error('Error updating user informations : ', res.message);
        updateError.value = res.message;
        setTimeout(() => { updateError.value = null; }, 4000);
    } else {
        updateSuccess.value = res.message;
        setTimeout(() => { updateSuccess.value = null; }, 2000);
        await fetchInfos();
    }
    updateButtonLoading.value = false;
    updateButtonDisabled.value = false;
}

async function fetchInfos() {
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
                country: res.data.country
            };
        } else {
            userInformationsState.value = {
                lastName: '',
                firstName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                country: ''
            };
        }
        baseUserInformationsState.value = { ...userInformationsState.value };
    }
}

onMounted(async () => {
    if (!import.meta.client) return;

    // If user is connected, try to fill its informations
    if (User.Current) {
        await fetchInfos();
    }
});

</script>
