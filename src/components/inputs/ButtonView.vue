<template>
    <component :is="to ? 'RouterLink' : 'button'" :to="to"
        class="p-1 rounded-md bg-slate-600 border-2 border-transparent hover:border-slate-500 outline-none focus:outline-orange-500 transition-all">
        <div class="flex space-x-2 justify-center items-center w-full h-fit">
            <slot />
        </div>
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeView',
    props: {
        to: {
            type: String,
            required: false
        }
    },
    components: {

    }
});
</script>