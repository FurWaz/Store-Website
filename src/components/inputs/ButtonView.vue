<template>
    <div class="flex">
        <component :is="to ? 'RouterLink' : 'button'" :disabled="(disabled || m_disabled)" :to="to" @click="handleClick"
            class="flex w-full h-full relative py-1 px-2 rounded-md bg-slate-600 border-2 border-transparent" :class="(disabled || m_disabled)
                ? 'opacity-70'
                : 'hover:border-slate-500 outline-none focus:outline-orange-500 transition-all'
                ">
            <div v-show="loading || m_loading"
                class="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-md overflow-hidden">
                <div class="flex grow h-full w-full justify-center items-center bg-slate-200 dark:bg-slate-600">
                    <LoadingIcon class="w-6 h-6" />
                </div>
            </div>
            <div class="flex space-x-2 justify-center items-center w-full h-fit">
                <slot />
            </div>
        </component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoadingIcon from '@/components/cards/LoadingIcon.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        LoadingIcon
    },
    props: {
        to: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props) {
        return {
            m_disabled: props.disabled,
            m_loading: props.loading
        };
    },
    watch: {
        disabled(disabled: boolean) {
            this.setDisabled(disabled);
        },
        loading(loading: boolean) {
            this.setLoading(loading);
        }
    },
    methods: {
        handleClick(ev: Event) {
            ev.stopPropagation();
            if (this.disabled || this.loading || this.m_disabled || this.m_loading) {
                return;
            }
            this.$emit('click', ev, this);
        },
        setLoading(loading: boolean) {
            this.m_loading = loading;
            this.$forceUpdate();
        },
        setDisabled(disabled: boolean) {
            this.m_disabled = disabled;
            this.$forceUpdate();
        }
    }
});
</script>
