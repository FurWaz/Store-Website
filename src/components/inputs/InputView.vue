<template>
    <input :value="value" :type="type" :name="name" :placeholder="placeholder" :autocomplete="autocomplete"
        class="flex max-w-full min-w-0 text-md font-semibold bg-slate-600 py-1 px-2 rounded-md border-2 border-transparent hover:border-slate-500 outline-none focus:outline-orange-500 transition-all" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputView',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        value: {
            type: String,
            default: ''
        }
    }
});
</script>
