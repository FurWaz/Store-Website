<template>
    <input :value="value_str" :type="type" :name="name" :placeholder="placeholder_str" :autocomplete="autocomplete"
        class="flex max-w-full min-w-0 text-md font-semibold bg-slate-600 py-1 px-2 rounded-md border-2 border-transparent hover:border-slate-500 outline-none focus:outline-orange-500 transition-all" />
</template>

<script lang="ts">
import Lang from '@/scripts/Lang';
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
    },
    setup() {
        return {
            value_str: '',
            placeholder_str: ''
        };
    },
    async mounted() {
        this.updateStrings();
    },
    watch: {
        value() {
            this.updateStrings();
        },
        placeholder() {
            this.updateStrings();
        }
    },
    methods: {
        async updateStrings() {
            this.value_str = this.value.indexOf('::') === -1 ? this.value : await Lang.GetTextAsync(
                Lang.CreateTranslationContext(this.value.split('::')[0], this.value.split('::')[1])
            );
            this.placeholder_str = this.placeholder.indexOf('::') === -1 ? this.placeholder : await Lang.GetTextAsync(
                Lang.CreateTranslationContext(this.placeholder.split('::')[0], this.placeholder.split('::')[1])
            );
            this.$forceUpdate();
        }
    }
});
</script>
