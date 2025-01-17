<template>
    <div>
        <NuxtRouteAnnouncer />
        
    </div>
    <div class="flex flex-col bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-50 min-h-screen max-h-screen">
        <HeaderBar />
        <NuxtPage class="pt-4 p-2" />
    </div>
</template>

<script setup lang="ts">
import '~/assets/style.css';
</script>