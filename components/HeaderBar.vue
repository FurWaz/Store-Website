<template>
    <div class="z-50 sticky top-0 left-0 w-full h-fit p-2">
        <div class="flex flex-col bg-slate-50 dark:bg-slate-700 rounded-md shadow-md border border-slate-200 dark:border-slate-600 p-2">
            <div class="hidden md:flex justify-between items-center space-x-16">
                <NuxtLink class="flex justify-start items-center w-fit space-x-2" to="/">
                    <FwIcon class="h-8 w-8" />
                    <p class="text-md font-semibold"> {{ $t('store.title') }} </p>
                </NuxtLink>
                <div class="flex w-full space-x-8 justify-start items-center overflow-auto">
                    <UButton icon="i-heroicons-home" to="/" variant="outline">
                        {{ $t('home.name') }}
                    </UButton>
                    <UButton icon="i-heroicons-shopping-bag" to="/products" variant="outline">
                        {{ $t('products.name') }}
                    </UButton>
                    <!-- <UButton icon="i-heroicons-information-circle" to="/about" variant="outline">
                        {{ $t('about.name') }}
                    </UButton> -->
                </div>
                <div class="flex justify-end items-center space-x-4">
                    <ThemeSwitcher class="hidden lg:flex min-w-fit"/>
                    <LangSwitcher class="hidden lg:flex min-w-fit"/>
                    <div v-show="user" class="flex justify-center items-center w-fit h-fit space-x-4">
                        <UButton to="/account" icon="i-heroicons-user">
                            {{ $t('account.name') }}
                        </UButton>
                    </div>
                    <div v-show="!user" class="flex justify-center items-center w-fit h-fit space-x-4">
                        <UButton variant="solid" @click="login">
                            {{ $t('verbs.login') }}
                        </UButton>
                    </div>
                </div>
            </div>
            <div class="flex md:hidden justify-between items-center">
                <NuxtLink v-if="$route.fullPath === '/'" class="flex justify-start items-center w-12" to="/">
                    <FwIcon class="h-8 w-8" />
                </NuxtLink>
                <div v-else class="flex justify-start items-center w-12">
                    <UButton icon="i-heroicons-arrow-left" variant="ghost" color="white" @click="$router.back()"/>
                </div>
                <div>
                    <p class="show-up text-md font-semibold"> {{ $t('store.title') }} </p>
                </div>
                <div class="flex justify-end items-center w-12">
                    <button class="flex w-fit h-fit" @click="toggleMobileHeader">
                        <UIcon name="i-heroicons-bars-3" class="h-8 w-8" />
                    </button>
                </div>
            </div>
            <div ref="mobileHeader" class="flex w-full h-fit overflow-hidden transition-all ease-custom duration-custom" style="max-height: 0px;">
                <div class="flex flex-col h-fit p-1 w-full">
                    <div class="flex flex-col w-fit h-fit py-2 justify-center items-center space-y-4 mx-auto">
                        <UButton class="w-full justify-between" icon="i-heroicons-home" to="/" variant="outline">
                            {{ $t('home.name') }}
                        </UButton>
                        <UButton class="w-full justify-between" icon="i-heroicons-shopping-bag" to="/products" variant="outline">
                            {{ $t('products.name') }}
                        </UButton>
                        <!-- <UButton class="w-full justify-between" icon="i-heroicons-information-circle" to="/about" variant="outline">
                            {{ $t('about.name') }}
                        </UButton> -->
                    </div>
                    <div class="flex py-2.5">
                        <span class="flex w-full h-0.5 bg-slate-200 dark:bg-slate-600 rounded-full" />
                    </div>
                    <div class="flex flex-col w-full h-fit space-y-2.5">
                        <div class="flex justify-between items-center w-full h-fit">
                            <ThemeSwitcher />
                            <LangSwitcher />
                        </div>
                        <div v-show="User.Current" class="flex justify-between items-center w-full h-fit">
                            <UButton @click="() => { User.Forget() }" variant="ghost">
                                {{ $t('verbs.logout') }}
                            </UButton>
                            <UButton to="/account" icon="i-heroicons-user">
                                {{ $t('account.name') }}
                            </UButton>
                        </div>
                        <div v-show="!User.Current" class="flex justify-end items-center w-full h-fit">
                            <UButton @click="login">
                                {{ $t('verbs.login') }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const { t } = useI18n();

const user = ref<any>(User.Current);

const mobileHeader = ref<HTMLElement | null>(null);
function toggleMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    if (mobileHeader.value.style.maxHeight === '0px') {
        openMobileHeader();
    } else {
        closeMobileHeader();
    }
}
function openMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    const child = mobileHeader.value.firstElementChild;
    if (!child) return;

    const childHeight = child.getBoundingClientRect().height;
    mobileHeader.value.style.maxHeight = `${childHeight}px`;
}
function closeMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    mobileHeader.value.style.maxHeight = '0px';
}

function login() {
    const portal = new FurWazPortal();
    portal.on('success', async (data) => {
        const new_user = new User({ ...data.user, token: data.token });
        await new_user.fetchInformations();
        new_user.save();
        user.value = user;
    });
    portal.on('error', (error) => {
        console.error('Failed to login user :', error);
    });
    portal.on('ready', () => {
        portal.open();
    });
}

watchEffect(() => {
    if (!window) return;

    if (window.innerWidth >= 768) {
        closeMobileHeader();
    }
});

watch(() => router.currentRoute.value, () => {
    closeMobileHeader();
});
</script>
