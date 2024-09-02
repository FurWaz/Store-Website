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

import User from '@/scripts/User';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';

export default defineComponent({
    name: 'HomeView',
    components: {
        IconCard,
    },
    async mounted() {
        // Example of user login
        if (!User.CurrentUser) {
            console.log("User is not logged in, logging in");

            console.log("Getting portal token from API");
            const portalRes = await API.Request(ROUTES.AUTH.GENERATE);
            if (portalRes.error) {
                console.error("Failed to get portal token :", portalRes.message);
                return;
            }

            console.log("Got portal token :", portalRes.data);

            console.log("Opening portal login page");
            window.open(`https://furwaz.fr/portal?token=${portalRes.data}`, "_blank");

            console.log("Waiting for user to login ...");
            const userLoginRes = await API.Request(ROUTES.AUTH.TOKEN(portalRes.data));
            if (userLoginRes.error) {
                console.error("Failed to login user :", userLoginRes.message);
                return;
            }

            console.log("User logged in :", userLoginRes.data);
            const user = new User({ ...userLoginRes.data.user, token: userLoginRes.data.token });
            user.save();
        }
        else {
            console.log("User is logged in");
        }
    }
});
</script>
