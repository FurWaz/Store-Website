<template>
    <div class="flex flex-col grow justify-start items-center">
        <div class="show-down flex space-x-4 justify-evenly items-center card p-4 w-fit h-fit">
            <div class="flex w-fit h-full justify-center items-center">
                <UIcon name="i-heroicons-user" class="w-12 h-12" />
            </div>
            <div class="flex flex-col w-fit h-full justify-center items-start">
                <h3> {{ User.Current?.pseudo ?? '- - - - - - -' }} </h3>
            </div>
        </div>
        <div class="flex grow justify-center items-center">
            <div class="show-up flex flex-col space-y-8 w-fit px-4">
                <UButton class="w-full justify-between space-x-2" variant="ghost" icon="i-heroicons-chevron-right" to="/account/cart?step=view"
                    trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.cart.title') }}</p>
                        <p class="text-sm">{{ $t('account.cart.description') }}</p>
                    </div>
                </UButton>
                <UButton class="w-full justify-between space-x-2" variant="ghost" icon="i-heroicons-chevron-right" to="/account/informations"
                    trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.informations.title') }}</p>
                        <p class="text-sm">{{ $t('account.informations.description') }}</p>
                    </div>
                </UButton>
                <UButton class="w-full justify-between space-x-2" variant="ghost" icon="i-heroicons-chevron-right" to="/account/orders" trailing disabled>
                    <div>
                        <p class="text-slate-500 dark:text-slate-400 font-semibold">{{ $t('account.orders.title') }}</p>
                        <p class="text-slate-500 dark:text-slate-400 text-sm">{{ $t('account.orders.description') }}</p>
                    </div>
                </UButton>
            </div>
        </div>
        <div class="show-up flex h-fit w-full justify-center items-center">
            <UButton variant="solid" icon="i-heroicons-arrow-left-start-on-rectangle" @click="User.Forget()">
                {{ $t('verbs.logout') }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>