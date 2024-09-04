<template>
    <span v-if="!loading">
        <span v-for="line in text.split('\n')" :key="line">
            {{ line }} <br>
        </span>
    </span>
    <span v-else class="flex w-16 h-3 rounded-2xl animate-text-loading" />
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import Lang from '@/scripts/Lang';

export default defineComponent({
    name: "GetText",
    props: {
        context: {
            type: [Object, String],
            required: false
        },
        file: {
            type: String,
            required: false
        },
        code: {
            type: String,
            required: false
        },
        format: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    data() {
        return {
            text: "",
            loading: false,
            translationContext: null as any
        };
    },
    watch: {
        context: {
            deep: true,
            handler() { this.translationContext = this.context; this.loadTranslation(); }
        },
        file: {
            deep: true,
            handler() { this.createContextFromProps(); this.loadTranslation(); }
        },
        code: {
            deep: true,
            handler() { this.createContextFromProps(); this.loadTranslation(); }
        }

    },
    mounted() {
        if (!this.context) {
            this.createContextFromProps();
        }
        else {
            this.translationContext = this.context;
        }

        Lang.registerOnLanguageChange(() => this.loadTranslation());
        this.loadTranslation();
    },
    methods: {
        loadTranslation() {
            this.loading = true;
            Lang.GetTextAsync(this.translationContext).then(text => {
                if (!text) return;
                this.text = text;
                this.loading = false;
            });
        },
        createContextFromProps() {
            if (this.file && this.code) {
                this.translationContext = Lang.CreateTranslationContext(this.file, this.code, this.format);
            }
            else {
                console.error("GetText component must have a context prop or a file and code prop.");
            }
        }
    }
});
</script>

<style scoped>
@keyframes animate-text-loading {
    0% {
        background-image: linear-gradient(90deg, #ffffff80, #ffffff60, #ffffff30, #ffffff30, #ffffff30, #ffffff30);
    }

    20% {
        background-image: linear-gradient(90deg, #ffffff60, #ffffff80, #ffffff60, #ffffff30, #ffffff30, #ffffff30);
    }

    40% {
        background-image: linear-gradient(90deg, #ffffff30, #ffffff60, #ffffff80, #ffffff60, #ffffff30, #ffffff30);
    }

    60% {
        background-image: linear-gradient(90deg, #ffffff30, #ffffff30, #ffffff60, #ffffff80, #ffffff60, #ffffff30);
    }

    80% {
        background-image: linear-gradient(90deg, #ffffff30, #ffffff30, #ffffff30, #ffffff60, #ffffff80, #ffffff60);
    }

    100% {
        background-image: linear-gradient(90deg, #ffffff30, #ffffff30, #ffffff30, #ffffff30, #ffffff60, #ffffff80);
    }
}

.animate-text-loading {
    animation: animate-text-loading 0.6s alternate infinite;
    transition: background-image 1s;
}
</style>