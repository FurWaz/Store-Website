<template>
    <div class="flex flex-col w-full h-fit">
        <div class="show-up flex w-full h-fit p-20 justify-center items-center space-x-8">
            <IconCard class="w-32 h-32" />
            <h1 class="text-6xl font-bold"> FurWaz Store </h1>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCard from '@/components/cards/IconCard.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        IconCard,
    }
});
</script>
