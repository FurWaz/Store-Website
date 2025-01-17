<script setup lang="ts">
const { t } = useI18n();
import type { NuxtError } from '#app'

defineProps({
    error: Object as () => NuxtError
})

</script>

<template>
    <div class="flex flex-col bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-50 min-h-screen justify-evenly items-center">
        <div class="show-up flex flex-col space-y-4 w-fit h-fit justify-center items-center">
            <FwIcon class="show-up w-28 h-28" />
            <h2 class="text-center">{{ t('error.title', {code: error?.statusCode ?? '404'}) }}</h2>
            <h3 class="text-center">{{ t(`error.${error?.statusCode ?? 'unknown'}`) }}</h3>
        </div>
        <UButton icon="i-heroicons-chevron-left" class="show-down w-fit" @click="$router.go(-1)">
            {{ t('verbs.back') }}
        </UButton>
    </div>
</template>
