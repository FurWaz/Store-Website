<template>
    <div class="flex flex-col w-full h-full">
        <HeaderView />
        <RouterView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import HeaderView from './components/HeaderView.vue';
import { API } from './scripts/API';

export default defineComponent({
    name: 'App',
    components: {
        RouterView,
        HeaderView
    },
    setup() {
        API.Setup(import.meta.env.VITE_API_URL);
        return {};
    }
});
</script>
