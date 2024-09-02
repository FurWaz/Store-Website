<template>
    <div class="flex w-full h-full ">
        <RouterView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
    name: 'App',
    components: {
        RouterView
    }
});
</script>
