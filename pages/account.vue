<template>
    <NuxtPage />
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `${t('store.title')} - ${t('account.title')}`,
    description: `${t('account.description')}`,
    ogTitle: `${t('store.title')} - ${t('account.title')}`,
    ogDescription: `${t('account.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://store.furwaz.com' + route.fullPath
});

definePageMeta({
    middleware: 'auth'
});

</script>