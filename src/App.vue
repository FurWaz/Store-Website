<template>
    <div class="flex w-full h-full ">
        <RouterView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { API } from './scripts/API';

export default defineComponent({
    name: 'App',
    components: {
        RouterView
    },
    setup() {
        API.Setup(import.meta.env.VITE_API_URL);
        return {};
    }
});
</script>
