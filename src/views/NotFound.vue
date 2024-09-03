<template>
    <div class="flex flex-col w-full h-full">
        <div class="show-up flex flex-col w-full h-fit p-12 justify-center items-center space-y-2 md:space-y-4">
            <IconCard class="w-20 h-20 md:w-32 md:h-32" :clickable="false" />
            <h1 class="text-center text-3xl md:text-4xl lg:text-5xl font-bold">Woops !</h1>
            <p class="text-center text-2xl md:text-3xl lg:text-4xl font-semibold">
                Page non trouvée !
            </p>
        </div>
        <div class="flex w-full h-full justify-center items-center">
            <ButtonView to="/" class="show-down">
                <p class="whitespace-nowrap font-semibold px-1">Revenir à l'accueil</p>
            </ButtonView>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCard from '@/components/cards/IconCard.vue';
import ButtonView from '../components/inputs/ButtonView.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        IconCard,
        ButtonView
    }
});
</script>
